"use client";

import { X } from "lucide-react";
import type { RoundItem } from "@/lib/mocks/rounds.mock";
import { RoundStatusBadge } from "./round-status-badge";

type RoundDetailModalProps = {
  open: boolean;
  round: RoundItem | null;
  onClose: () => void;
};

export function RoundDetailModal({
  open,
  round,
  onClose,
}: RoundDetailModalProps) {
  if (!open || !round) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18181b]/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6D28D9]">Detalle de ronda</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
              {round.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#666670]">
              Información operativa, estado y checkpoints de la ronda seleccionada.
            </p>
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

        <div className="mt-6 flex flex-wrap gap-2">
          <RoundStatusBadge status={round.status} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <DetailRow label="Inicio" value={round.startedAt ?? "Pendiente"} />
          <DetailRow label="Fin" value={round.finishedAt ?? "Pendiente"} />
          <DetailRow
            label="Checkpoints"
            value={`${round.checkpoints.filter((cp) => cp.status === "completed").length}/${round.checkpoints.length}`}
          />
        </div>

        <div className="mt-6 rounded-[24px] border border-[#efeff4] bg-[#fafafe] p-4">
          <p className="text-sm font-medium text-[#1f1f24]">Checkpoints</p>

          <div className="mt-4 space-y-3">
            {round.checkpoints.map((checkpoint) => (
              <div
                key={checkpoint.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-[#ececf3] bg-white p-4"
              >
                <div>
                  <p className="text-sm font-medium text-[#1f1f24]">
                    {checkpoint.name}
                  </p>
                  <p className="mt-1 text-xs text-[#7b7b86]">
                    {checkpoint.checkedAt
                      ? `Registrado a las ${checkpoint.checkedAt}`
                      : "Aún no registrado"}
                  </p>
                </div>

                <span
                  className={[
                    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                    checkpoint.status === "completed"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-amber-200 bg-amber-50 text-amber-700",
                  ].join(" ")}
                >
                  {checkpoint.status === "completed" ? "Completado" : "Pendiente"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-[#1f1f24]">{value}</p>
    </div>
  );
}
