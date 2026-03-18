"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle2, XCircle } from "lucide-react";
import type { DetectionItem } from "@/lib/mocks/detections.mock";
import type { VisitItem } from "@/lib/mocks/visits.mock";

type DetectionReviewModalProps = {
  open: boolean;
  detection: DetectionItem | null;
  suggestedVisit: VisitItem | null;
  onClose: () => void;
  onApprove: (detectionId: string, visitId?: string) => void;
  onReject: (detectionId: string) => void;
  requireDecision?: boolean;
};

export function DetectionReviewModal({
  open,
  detection,
  suggestedVisit,
  onClose,
  onApprove,
  onReject,
  requireDecision = false,
}: DetectionReviewModalProps) {
  const [isEntered, setIsEntered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (!open || !detection) return;

    const frameId = window.requestAnimationFrame(() => {
      setIsEntered(true);
    });

    if (!requireDecision) {
      return () => window.cancelAnimationFrame(frameId);
    }

    const timeoutId = window.setTimeout(() => {
      setIsMinimized(true);
    }, 15000);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [open, detection, requireDecision]);

  if (!open || !detection) return null;

  const title =
    detection.targetType === "resident"
      ? "Residente identificado"
      : detection.targetType === "authorized_visit"
        ? "Visita autorizada encontrada"
        : "Detección sin coincidencia";

  const description =
    detection.targetType === "resident"
      ? "Se detectó una coincidencia con un residente registrado. No requiere autorización manual."
      : detection.targetType === "authorized_visit"
        ? "Se encontró una coincidencia con una visita autorizada para hoy."
        : "No se encontró una coincidencia directa. Requiere validación manual.";

  const hasAuthorizedMatch =
    suggestedVisit &&
    (suggestedVisit.status === "approved" ||
      suggestedVisit.status === "pending");
  const primaryActionLabel =
    detection.targetType === "resident" ? "Abrir barrera" : "Validar ingreso";
  const wrapperClassName = requireDecision
    ? "fixed bottom-4 right-4 z-50 flex w-[min(560px,calc(100vw-2rem))] justify-end"
    : "fixed inset-0 z-50 flex items-center justify-center bg-[#18181b]/40 p-4 backdrop-blur-sm";
  const panelClassName = [
    requireDecision
      ? "w-full rounded-[30px] border border-amber-300 bg-white shadow-[0_28px_90px_-28px_rgba(0,0,0,0.42)] ring-1 ring-amber-200"
      : "w-full max-w-2xl rounded-[28px] border border-[#e7e7ee] bg-white shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)]",
    isMinimized ? "p-4" : "p-6",
    "transition-all duration-300 ease-out",
    isEntered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
  ].join(" ");

  return (
    <div className={wrapperClassName}>
      <div
        className={panelClassName}
        style={requireDecision ? { animation: "pulse 1.1s ease-out 1" } : undefined}
      >
        {requireDecision && isMinimized ? (
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                Revisión obligatoria
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-[#18181b]">
                {title}
              </p>
              <p className="mt-1 truncate text-xs text-[#666670]">
                {detection.source} · {detection.detectedAt}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="rounded-2xl border border-amber-200 bg-white px-3 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-50"
            >
              Expandir
            </button>

            <button
              type="button"
              onClick={() => onReject(detection.id)}
              className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
            >
              Rechazar
            </button>

            <button
              type="button"
              onClick={() => onApprove(detection.id, suggestedVisit?.id)}
              className="rounded-2xl bg-[#6D28D9] px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              {primaryActionLabel}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#6D28D9]">
                  {hasAuthorizedMatch
                    ? "Detección automática · Visita autorizada"
                    : "Revisión automática"}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#666670]">
                  {description}
                </p>
                {requireDecision ? (
                  <p className="mt-3 rounded-2xl border border-amber-300 bg-[linear-gradient(180deg,#fff8e8_0%,#fff1c8_100%)] px-3 py-2 text-sm font-medium text-amber-900">
                    Esta detección requiere revisión inmediata del guardia antes de
                    continuar.
                  </p>
                ) : null}
              </div>

              {!requireDecision ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e4e4ea] bg-white text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <DetailRow label="Tipo" value={detection.type.toUpperCase()} />
              <DetailRow label="Valor detectado" value={detection.detectedValue} />
              <DetailRow label="Fuente" value={detection.source} />
              <DetailRow label="Confianza" value={`${detection.confidence}%`} />
            </div>

            <div
              className={[
                "mt-6 rounded-2xl p-4",
                requireDecision
                  ? "border border-amber-100 bg-[#fffaf0]"
                  : "border border-[#efeff4] bg-[#fafafe]",
              ].join(" ")}
            >
              <p className="text-sm font-medium text-[#1f1f24]">
                Coincidencia sugerida
              </p>

              {suggestedVisit ? (
                <div className="mt-3 space-y-1 text-sm text-[#4f4f59]">
                  <p>Visitante: {suggestedVisit.visitorName}</p>
                  <p>Residente: {suggestedVisit.residentName}</p>
                  <p>Destino: {suggestedVisit.destination}</p>
                  <p>Horario: {suggestedVisit.expectedTime}</p>
                  <p>Hora de ingreso: {suggestedVisit.horaIngreso ?? "Sin registro"}</p>
                  <p>Hora de salida: {suggestedVisit.horaSalida ?? "Sin registro"}</p>
                  <p>DNI: {suggestedVisit.documentId}</p>
                  <p>Patente: {suggestedVisit.vehiclePlate ?? "Sin registro"}</p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-[#666670]">
                  No se encontró una coincidencia directa. Requiere validación
                  manual.
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              {!requireDecision ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-2xl border border-[#e4e4ea] bg-white px-4 py-3 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
                >
                  Cerrar
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => onReject(detection.id)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
              >
                <XCircle className="h-4 w-4" />
                Rechazar
              </button>

              <button
                type="button"
                onClick={() => onApprove(detection.id, suggestedVisit?.id)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6D28D9] px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                {primaryActionLabel}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#efeff4] bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-[#1f1f24]">{value}</p>
    </div>
  );
}
