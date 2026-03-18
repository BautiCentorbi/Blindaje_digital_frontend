"use client";

import { useMemo, useState } from "react";
import {
  visitsMock,
  type VisitItem,
  type VisitStatus,
} from "@/lib/mocks/visits.mock";
import {
  detectionsMock,
  type DetectionItem,
} from "@/lib/mocks/detections.mock";
import {
  ManualEntryModal,
  type ManualEntryPayload,
} from "./manual-entry-modal";
import { DetectionsModal } from "./detections-modal";
import { VisitsToolbar } from "./visits-toolbar";
import { VisitsList } from "./visits-list";
import { VisitDetailModal } from "./visit-detail-modal";
import { DetectionReviewModal } from "./detection-review-modal";

type VisitFilter = "all" | "pending" | "active" | "checked_out" | "rejected";

function isActiveVisit(status: VisitStatus) {
  return status === "approved" || status === "checked_in";
}

function getCurrentHourMinute() {
  return new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function GuardVisitsView() {
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  const [isDetectionsModalOpen, setIsDetectionsModalOpen] = useState(false);
  const [visits, setVisits] = useState<VisitItem[]>(visitsMock);
  const [detections, setDetections] = useState<DetectionItem[]>(detectionsMock);
  const [activeFilter, setActiveFilter] = useState<VisitFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);
  const [selectedDetectionId, setSelectedDetectionId] = useState<string | null>(
    null,
  );
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  const searchedVisits = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) return visits;

    return visits.filter((visit) => {
      const haystack = [
        visit.visitorName,
        visit.residentName,
        visit.documentId,
        visit.vehiclePlate ?? "",
        visit.destination,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [visits, searchTerm]);

  const residentOptions = [
    { id: "resident-001", label: "María López · Casa 14" },
    { id: "resident-002", label: "Familia Torres · Casa 22" },
    { id: "resident-003", label: "Laura Díaz · Casa 7" },
    { id: "resident-004", label: "Casa 18 · Unidad principal" },
  ];

  const filteredVisits = useMemo(() => {
    if (activeFilter === "all") return searchedVisits;
    if (activeFilter === "active") {
      return searchedVisits.filter((visit) => isActiveVisit(visit.status));
    }
    return searchedVisits.filter((visit) => visit.status === activeFilter);
  }, [searchedVisits, activeFilter]);

  const counts = useMemo(
    () => ({
      all: visits.length,
      pending: visits.filter((visit) => visit.status === "pending").length,
      active: visits.filter((visit) => isActiveVisit(visit.status)).length,
      checked_out: visits.filter((visit) => visit.status === "checked_out")
        .length,
      rejected: visits.filter((visit) => visit.status === "rejected").length,
    }),
    [visits],
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

  function handleManualEntrySubmit(payload: ManualEntryPayload) {
    const newVisit: VisitItem = {
      id: `visit-${crypto.randomUUID()}`,
      visitorName: `${payload.firstName} ${payload.lastName}`.trim(),
      documentId: payload.documentId,
      residentName: payload.residentLabel,
      destination: payload.residentLabel.split("·")[1]?.trim() ?? "Sin destino",
      expectedTime: getCurrentHourMinute(),
      vehiclePlate: payload.vehiclePlate,
      notes:
        payload.companions.length > 0
          ? `${payload.companions.length} acompañante(s)`
          : "Ingreso manual",
      status: "pending",
    };

    setVisits((current) => [newVisit, ...current]);
    setIsManualEntryOpen(false);
  }

  function handleApprove(visitId: string) {
    updateVisitStatus(visitId, "approved");
  }

  function handleReject(visitId: string) {
    updateVisitStatus(visitId, "rejected");
  }

  function handleCheckIn(visitId: string) {
    updateVisitStatus(visitId, "checked_in");
  }

  function handleCheckOut(visitId: string) {
    updateVisitStatus(visitId, "checked_out");
  }

  function handleView(visitId: string) {
    setSelectedVisitId(visitId);
    setIsVisitModalOpen(true);
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

  const selectedVisit =
    visits.find((visit) => visit.id === selectedVisitId) ?? null;

  const selectedDetection =
    detections.find((detection) => detection.id === selectedDetectionId) ??
    null;
  const nextPendingDetection = pendingDetections[0] ?? null;
  const autoDetectionReview =
    !isManualEntryOpen &&
    !isVisitModalOpen &&
    !isDetectionsModalOpen &&
    !selectedDetectionId
      ? nextPendingDetection
      : null;
  const detectionInReview = selectedDetection ?? autoDetectionReview;
  const suggestedVisit = detectionInReview?.suggestedVisitId
    ? (visits.find(
        (visit) => visit.id === detectionInReview.suggestedVisitId,
      ) ?? null)
    : null;
  const requiresDetectionDecision =
    detectionInReview?.status === "pending_review" && !selectedDetectionId;

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#6D28D9]">
              Módulo operativo
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#18181b]">
              Visitas y accesos
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[#666670]">
              Bandeja operativa de ingresos con revisión manual y soporte futuro
              para OCR, LPR y validación facial asistida.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsManualEntryOpen(true)}
              className="rounded-2xl bg-[#6D28D9] px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Nuevo ingreso
            </button>

            <button
              type="button"
              onClick={() => setIsDetectionsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-medium text-[#6D28D9] transition hover:bg-violet-100"
            >
              Registro automático
              <span className="rounded-full bg-white px-2 py-0.5 text-xs">
                {pendingDetections.length}
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            <VisitsToolbar
              activeFilter={activeFilter}
              searchTerm={searchTerm}
              onChangeFilter={setActiveFilter}
              onChangeSearch={setSearchTerm}
              counts={counts}
            />

            <VisitsList
              visits={filteredVisits}
              activeFilter={activeFilter}
              onApprove={handleApprove}
              onReject={handleReject}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              onView={handleView}
            />
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-medium text-[#6D28D9]">Resumen</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
                Estado operativo
              </h3>

              <div className="mt-5 grid gap-3">
                <SummaryItem label="Total" value={counts.all} />
                <SummaryItem label="Pendientes" value={counts.pending} />
                <SummaryItem label="Activas" value={counts.active} />
                <SummaryItem label="Finalizadas" value={counts.checked_out} />
              </div>
            </div>

            <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-medium text-[#6D28D9]">Criterio UI</p>
              <p className="mt-3 text-sm leading-6 text-[#666670]">
                Cada detección automática se eleva como revisión obligatoria.
                El registro conserva aprobaciones, denegaciones e ingresos
                automáticos de propietarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      <VisitDetailModal
        open={isVisitModalOpen}
        visit={selectedVisit}
        onClose={() => setIsVisitModalOpen(false)}
      />

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

      <ManualEntryModal
        open={isManualEntryOpen}
        residents={residentOptions}
        onClose={() => setIsManualEntryOpen(false)}
        onSubmit={handleManualEntrySubmit}
      />
    </>
  );
}

function SummaryItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
        {value}
      </p>
    </div>
  );
}
