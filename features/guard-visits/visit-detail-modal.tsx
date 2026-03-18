"use client";

import { X } from "lucide-react";
import type { VisitItem } from "@/lib/mocks/visits.mock";
import { VisitStatusBadge } from "./visit-status-badge";

type VisitDetailModalProps = {
  open: boolean;
  visit: VisitItem | null;
  onClose: () => void;
};

export function VisitDetailModal({
  open,
  visit,
  onClose,
}: VisitDetailModalProps) {
  if (!open || !visit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18181b]/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6D28D9]">Detalle de visita</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
              {visit.visitorName}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e4e4ea] bg-white text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4">
          <VisitStatusBadge status={visit.status} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <DetailRow label="Documento" value={visit.documentId} />
          <DetailRow label="Residente" value={visit.residentName} />
          <DetailRow label="Destino" value={visit.destination} />
          <DetailRow label="Horario" value={visit.expectedTime} />
          <DetailRow
            label="Hora de ingreso"
            value={visit.horaIngreso ?? "Sin registro"}
          />
          <DetailRow
            label="Hora de salida"
            value={visit.horaSalida ?? "Sin registro"}
          />
          <DetailRow label="Patente" value={visit.vehiclePlate ?? "Sin registro"} />
          <DetailRow label="Notas" value={visit.notes ?? "Sin notas"} />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-[#1f1f24]">{value}</p>
    </div>
  );
}
