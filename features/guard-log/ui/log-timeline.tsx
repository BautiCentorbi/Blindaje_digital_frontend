"use client";

import type { GuardLogFilter, GuardLogItem } from "@/lib/mocks/log.mock";
import { LogItem } from "./log-item";

type LogTimelineProps = {
  activeFilter: GuardLogFilter;
  groups: {
    dateKey: string;
    dateLabel: string;
    items: GuardLogItem[];
  }[];
  onOpenDetail: (itemId: string) => void;
};

const emptyStateByFilter: Record<GuardLogFilter, { title: string; message: string }> = {
  all: {
    title: "No hay movimientos cargados",
    message: "Cuando se registren novedades del turno, la bitácora operativa va a mostrarlas acá.",
  },
  operations: {
    title: "No hay novedades operativas",
    message: "Los asientos manuales y observaciones de puesto aparecerán en este filtro.",
  },
  visits: {
    title: "No hay eventos de visitas",
    message: "Aprobaciones, rechazos, ingresos y egresos van a quedar agrupados en esta vista.",
  },
  rounds: {
    title: "No hay actividad de rondas",
    message: "Las rondas activas y sus checkpoints se mostrarán acá cuando exista movimiento operativo.",
  },
  tasks: {
    title: "No hay cambios de tareas",
    message: "Las tareas iniciadas o completadas del turno se reflejarán en esta línea.",
  },
  detections: {
    title: "No hay detecciones automáticas",
    message: "Las lecturas OCR, LPR y faciales aparecerán acá cuando el sistema registre nuevos eventos.",
  },
};

export function LogTimeline({
  activeFilter,
  groups,
  onOpenDetail,
}: LogTimelineProps) {
  if (groups.length === 0) {
    const emptyState = emptyStateByFilter[activeFilter];

    return (
      <div className="rounded-[28px] border border-dashed border-[#dcdce5] bg-white p-10 text-center">
        <p className="text-base font-medium text-[#1f1f24]">
          {emptyState.title}
        </p>
        <p className="mt-2 text-sm text-[#666670]">{emptyState.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <section
          key={group.dateKey}
          className="rounded-[28px] border border-[#e7e7ee] bg-white p-4 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)] sm:p-5"
        >
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[#6D28D9]">
              {group.dateLabel}
            </span>
            <div className="h-px flex-1 bg-[#ececf3]" />
          </div>

          <div className="mt-4 space-y-3">
            {group.items.map((item, index) => (
              <LogItem
                key={item.id}
                item={item}
                isLast={index === group.items.length - 1}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
