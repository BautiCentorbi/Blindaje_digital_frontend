"use client";

import type { RoundStatus } from "@/lib/mocks/rounds.mock";

type RoundFilter = "all" | RoundStatus;

type RoundsToolbarProps = {
  activeFilter: RoundFilter;
  onChangeFilter: (filter: RoundFilter) => void;
  counts: Record<RoundFilter, number>;
};

const filters: { value: RoundFilter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "scheduled", label: "Programadas" },
  { value: "active", label: "Activas" },
  { value: "completed", label: "Finalizadas" },
];

export function RoundsToolbar({
  activeFilter,
  onChangeFilter,
  counts,
}: RoundsToolbarProps) {
  return (
    <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-4 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
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
  );
}
