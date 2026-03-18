"use client";

import { X, ScanFace, ScanText, CarFront } from "lucide-react";
import type { DetectionItem } from "@/lib/mocks/detections.mock";

type DetectionsModalProps = {
  open: boolean;
  detections: DetectionItem[];
  onClose: () => void;
  onReview: (detectionId: string) => void;
};

export function DetectionsModal({
  open,
  detections,
  onClose,
  onReview,
}: DetectionsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18181b]/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6D28D9]">
              Registro automático
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
              OCR · LPR · Facial
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#666670]">
              Historial operativo de arribos detectados, denegaciones e ingresos
              automáticos para propietarios.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e4e4ea] bg-white text-[#4f4f59]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {detections.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#dcdce5] bg-[#fafafe] p-8 text-center text-sm text-[#666670]">
              No hay eventos automáticos registrados.
            </div>
          ) : (
            detections.map((detection) => (
              <button
                key={detection.id}
                type="button"
                onClick={() => onReview(detection.id)}
                className="flex w-full items-start justify-between rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4 text-left transition hover:border-violet-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-[#6D28D9]">
                    <DetectionIcon type={detection.type} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#1f1f24]">
                      {detection.title}
                    </p>
                    <p className="mt-1 text-sm text-[#666670]">
                      {detection.previewLabel}
                    </p>
                    <p className="mt-2 text-xs text-[#8a8a95]">
                      {detection.source} · {detection.detectedAt}
                    </p>
                  </div>
                </div>

                <span className={getDetectionStatusClass(detection.status)}>
                  {getDetectionStatusLabel(detection.status)}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function DetectionIcon({ type }: { type: DetectionItem["type"] }) {
  if (type === "ocr") return <ScanText className="h-5 w-5" />;
  if (type === "lpr") return <CarFront className="h-5 w-5" />;
  return <ScanFace className="h-5 w-5" />;
}

function getDetectionStatusClass(status: DetectionItem["status"]) {
  if (status === "pending_review") {
    return "rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700";
  }

  if (status === "approved") {
    return "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700";
  }

  return "rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700";
}

function getDetectionStatusLabel(status: DetectionItem["status"]) {
  if (status === "pending_review") return "Pendiente";
  if (status === "approved") return "Aprobada";
  return "Denegada";
}
