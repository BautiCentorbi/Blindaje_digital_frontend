"use client";

import type { GuardLogFilter } from "@/lib/mocks/log.mock";

type LogToolbarProps = {
  activeFilter: GuardLogFilter;
  counts: Record<GuardLogFilter, number>;
  onChangeFilter: (filter: GuardLogFilter) => void;
};

const filters: { value: GuardLogFilter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "operations", label: "Operaciones" },
  { value: "visits", label: "Visitas" },
  { value: "rounds", label: "Rondas" },
  { value: "tasks", label: "Tareas" },
  { value: "detections", label: "Detecciones" },
];

export function LogToolbar({
  activeFilter,
  counts,
  onChangeFilter,
}: LogToolbarProps) {
  return (
    <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-4 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm font-medium text-[#1f1f24]">
            Filtros de actividad
          </p>
          <p className="text-xs uppercase tracking-[0.14em] text-[#8b8b97]">
            Lectura compacta de eventos
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => onChangeFilter(filter.value)}
                className={[
                  "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "border-violet-200 bg-violet-50 text-[#6D28D9]"
                    : "border-[#e4e4ea] bg-white text-[#4f4f59] hover:border-violet-200 hover:text-[#6D28D9]",
                ].join(" ")}
              >
                <span>{filter.label}</span>
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-xs",
                    isActive
                      ? "bg-white text-[#6D28D9]"
                      : "bg-[#f4f4f8] text-[#6d6d77]",
                  ].join(" ")}
                >
                  {counts[filter.value]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
