"use client";

type VisitFilter = "all" | "pending" | "active" | "checked_out" | "rejected";

type VisitsToolbarProps = {
  activeFilter: VisitFilter;
  searchTerm: string;
  onChangeFilter: (filter: VisitFilter) => void;
  onChangeSearch: (value: string) => void;
  counts: Record<VisitFilter, number>;
};

const filters: { value: VisitFilter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendientes" },
  { value: "active", label: "Activas" },
  { value: "checked_out", label: "Finalizadas" },
  { value: "rejected", label: "Rechazadas" },
];

export function VisitsToolbar({
  activeFilter,
  searchTerm,
  onChangeFilter,
  onChangeSearch,
  counts,
}: VisitsToolbarProps) {
  return (
    <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-4 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onChangeSearch(e.target.value)}
          placeholder="Buscar por visitante, residente, DNI o patente..."
          className="h-12 w-full rounded-2xl border border-[#dddde6] bg-white px-4 text-sm text-[#1f1f24] outline-none transition placeholder:text-[#9b9ba5] focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
        />

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