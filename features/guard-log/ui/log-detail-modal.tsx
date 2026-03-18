"use client";

import { ArrowRight, X } from "lucide-react";
import type { GuardLogItem } from "@/lib/mocks/log.mock";

type LogDetailModalProps = {
  open: boolean;
  item: GuardLogItem | null;
  onClose: () => void;
};

function getContextAction(item: GuardLogItem) {
  if (item.sourceType === "visit") {
    return {
      label: "Ver visita",
      handler: () => console.log("Abrir visita", item.reference),
    };
  }

  if (item.sourceType === "round") {
    return {
      label: "Continuar ronda",
      handler: () => console.log("Continuar ronda", item.reference),
    };
  }

  if (item.sourceType === "task") {
    return {
      label: "Ver tarea",
      handler: () => console.log("Abrir tarea", item.reference),
    };
  }

  return null;
}

export function LogDetailModal({
  open,
  item,
  onClose,
}: LogDetailModalProps) {
  if (!open || !item) return null;

  const contextAction = getContextAction(item);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18181b]/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6D28D9]">
              Detalle de bitácora
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#666670]">
              Evento registrado en la línea operativa del turno actual.
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

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DetailRow label="Origen" value={item.sourceLabel} />
          <DetailRow label="Hora" value={item.timeLabel} />
          <DetailRow label="Ubicación" value={item.location} />
          <DetailRow label="Responsable" value={item.actor} />
        </div>

        <div className="mt-6 rounded-[24px] border border-[#efeff4] bg-[#fafafe] p-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
            Resumen operativo
          </p>
          <p className="mt-2 text-sm leading-6 text-[#666670]">
            {item.summary}
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {item.details.map((detail) => (
            <DetailRow
              key={`${item.id}-${detail.label}`}
              label={detail.label}
              value={detail.value}
            />
          ))}
        </div>

        {item.note ? (
          <div className="mt-6 rounded-[24px] border border-[#efeff4] bg-[#fafafe] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
              Nota
            </p>
            <p className="mt-2 text-sm leading-6 text-[#666670]">{item.note}</p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-2xl border border-[#e4e4ea] bg-white px-4 py-3 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
          >
            Cerrar
          </button>

          {contextAction ? (
            <button
              type="button"
              onClick={contextAction.handler}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6D28D9] px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              {contextAction.label}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : null}
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
