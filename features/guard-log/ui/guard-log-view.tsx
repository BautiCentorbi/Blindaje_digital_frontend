"use client";

import { useMemo, useState } from "react";
import {
  guardLogMock,
  type GuardLogFilter,
  type GuardLogItem,
} from "@/lib/mocks/log.mock";
import { LogDetailModal } from "./log-detail-modal";
import { LogTimeline } from "./log-timeline";
import { LogToolbar } from "./log-toolbar";

type TimelineGroup = {
  dateKey: string;
  dateLabel: string;
  items: GuardLogItem[];
};

function getDateLabel(dateKey: string) {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const target = new Date(`${dateKey}T12:00:00`);
  const diffInDays = Math.round(
    (today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays === 0) return "Hoy";
  if (diffInDays === 1) return "Ayer";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(target);
}

function getEventTimestamp(item: GuardLogItem) {
  return new Date(`${item.dateKey}T${item.timeLabel}:00`).getTime();
}

export function GuardLogView() {
  const [items] = useState<GuardLogItem[]>(guardLogMock);
  const [activeFilter, setActiveFilter] = useState<GuardLogFilter>("all");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const orderedItems = useMemo(
    () => [...items].sort((left, right) => getEventTimestamp(right) - getEventTimestamp(left)),
    [items],
  );

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return orderedItems;
    return orderedItems.filter((item) => item.category === activeFilter);
  }, [activeFilter, orderedItems]);

  const counts = useMemo(
    () => ({
      all: items.length,
      operations: items.filter((item) => item.category === "operations").length,
      visits: items.filter((item) => item.category === "visits").length,
      rounds: items.filter((item) => item.category === "rounds").length,
      tasks: items.filter((item) => item.category === "tasks").length,
      detections: items.filter((item) => item.category === "detections").length,
    }),
    [items],
  );

  const timelineGroups = useMemo(() => {
    return filteredItems.reduce<TimelineGroup[]>((groups, item) => {
      const currentGroup = groups.at(-1);

      if (currentGroup?.dateKey === item.dateKey) {
        currentGroup.items.push(item);
        return groups;
      }

      groups.push({
        dateKey: item.dateKey,
        dateLabel: getDateLabel(item.dateKey),
        items: [item],
      });

      return groups;
    }, []);
  }, [filteredItems]);

  function handleOpenDetail(itemId: string) {
    setSelectedItemId(itemId);
  }

  function handleCloseDetail() {
    setSelectedItemId(null);
  }

  const selectedItem =
    orderedItems.find((item) => item.id === selectedItemId) ?? null;

  return (
    <>
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#6D28D9]">Módulo operativo</p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#18181b]">
            Bitácora del guardia
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-[#666670]">
            Línea de tiempo compacta con los últimos movimientos del turno:
            tareas, rondas, checkpoints, visitas, detecciones y registros
            manuales.
          </p>
        </div>

        <LogToolbar
          activeFilter={activeFilter}
          counts={counts}
          onChangeFilter={setActiveFilter}
        />

        <LogTimeline
          activeFilter={activeFilter}
          groups={timelineGroups}
          onOpenDetail={handleOpenDetail}
        />

        <div className="rounded-[24px] border border-[#ececf3] bg-white/90 p-4 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-[#1f1f24]">
              Lectura operativa del turno
            </p>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
              {filteredItems.length} evento(s) visibles
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#666670]">
            La bitácora prioriza continuidad y contexto rápido. Cada evento
            muestra origen, hora, prioridad y un acceso corto al detalle
            operativo.
          </p>
        </div>
      </section>

      <LogDetailModal
        item={selectedItem}
        open={Boolean(selectedItem)}
        onClose={handleCloseDetail}
      />
    </>
  );
}
