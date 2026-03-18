"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  detectionsMock,
  type DetectionItem,
} from "@/lib/mocks/detections.mock";
import {
  visitsMock,
  type VisitItem,
  type VisitStatus,
} from "@/lib/mocks/visits.mock";
import { DetectionReviewModal } from "./detection-review-modal";
import { DetectionsModal } from "./detections-modal";

type GuardVisitsContextValue = {
  visits: VisitItem[];
  pendingDetectionsCount: number;
  openDetectionsModal: () => void;
  approveVisit: (visitId: string) => void;
  rejectVisit: (visitId: string) => void;
  checkInVisit: (visitId: string) => void;
  checkOutVisit: (visitId: string) => void;
  addManualVisit: (visit: VisitItem) => void;
};

const GuardVisitsContext = createContext<GuardVisitsContextValue | undefined>(
  undefined,
);

function getCurrentHourMinute() {
  return new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function GuardVisitsProvider({ children }: { children: ReactNode }) {
  const [visits, setVisits] = useState<VisitItem[]>(visitsMock);
  const [detections, setDetections] = useState<DetectionItem[]>(detectionsMock);
  const [isDetectionsModalOpen, setIsDetectionsModalOpen] = useState(false);
  const [selectedDetectionId, setSelectedDetectionId] = useState<string | null>(
    null,
  );

  const pendingDetections = useMemo(
    () => detections.filter((detection) => detection.status === "pending_review"),
    [detections],
  );

  const orderedDetections = useMemo(
    () =>
      [...detections].sort((left, right) => {
        if (left.status === right.status) {
          return right.detectedAt.localeCompare(left.detectedAt);
        }

        if (left.status === "pending_review") return -1;
        if (right.status === "pending_review") return 1;
        if (left.status === "approved") return -1;
        if (right.status === "approved") return 1;
        return 0;
      }),
    [detections],
  );

  function updateVisitStatus(visitId: string, status: VisitStatus) {
    setVisits((current) =>
      current.map((visit) =>
        visit.id === visitId
          ? {
              ...visit,
              status,
              horaIngreso:
                status === "checked_in"
                  ? visit.horaIngreso ?? getCurrentHourMinute()
                  : visit.horaIngreso,
              horaSalida:
                status === "checked_out"
                  ? getCurrentHourMinute()
                  : status === "checked_in"
                    ? undefined
                    : visit.horaSalida,
            }
          : visit,
      ),
    );
  }

  function handleReviewDetection(detectionId: string) {
    setIsDetectionsModalOpen(false);
    setSelectedDetectionId(detectionId);
  }

  function handleApproveDetection(detectionId: string, visitId?: string) {
    setDetections((current) =>
      current.map((detection) =>
        detection.id === detectionId
          ? { ...detection, status: "approved" }
          : detection,
      ),
    );

    if (visitId) {
      updateVisitStatus(visitId, "checked_in");
    }

    setSelectedDetectionId(null);
  }

  function handleRejectDetection(detectionId: string) {
    setDetections((current) =>
      current.map((detection) =>
        detection.id === detectionId
          ? { ...detection, status: "rejected" }
          : detection,
      ),
    );

    setSelectedDetectionId(null);
  }

  function addManualVisit(visit: VisitItem) {
    setVisits((current) => [visit, ...current]);
  }

  const selectedDetection =
    detections.find((detection) => detection.id === selectedDetectionId) ??
    null;
  const detectionInReview = selectedDetection ?? pendingDetections[0] ?? null;
  const suggestedVisit = detectionInReview?.suggestedVisitId
    ? (visits.find((visit) => visit.id === detectionInReview.suggestedVisitId) ??
      null)
    : null;
  const requiresDetectionDecision =
    detectionInReview?.status === "pending_review" && !selectedDetectionId;

  const value = useMemo(
    () => ({
      visits,
      pendingDetectionsCount: pendingDetections.length,
      openDetectionsModal: () => setIsDetectionsModalOpen(true),
      approveVisit: (visitId: string) => updateVisitStatus(visitId, "approved"),
      rejectVisit: (visitId: string) => updateVisitStatus(visitId, "rejected"),
      checkInVisit: (visitId: string) => updateVisitStatus(visitId, "checked_in"),
      checkOutVisit: (visitId: string) =>
        updateVisitStatus(visitId, "checked_out"),
      addManualVisit,
    }),
    [visits, pendingDetections.length],
  );

  return (
    <GuardVisitsContext.Provider value={value}>
      {children}

      <DetectionReviewModal
        open={Boolean(detectionInReview)}
        detection={detectionInReview}
        suggestedVisit={suggestedVisit}
        onClose={() => setSelectedDetectionId(null)}
        onApprove={handleApproveDetection}
        onReject={handleRejectDetection}
        requireDecision={requiresDetectionDecision}
      />

      <DetectionsModal
        open={isDetectionsModalOpen}
        detections={orderedDetections}
        onClose={() => setIsDetectionsModalOpen(false)}
        onReview={handleReviewDetection}
      />
    </GuardVisitsContext.Provider>
  );
}

export function useGuardVisits() {
  const context = useContext(GuardVisitsContext);

  if (!context) {
    throw new Error("useGuardVisits debe usarse dentro de GuardVisitsProvider");
  }

  return context;
}
