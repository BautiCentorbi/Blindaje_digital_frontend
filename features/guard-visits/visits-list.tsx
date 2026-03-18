"use client";

import type { VisitItem } from "@/lib/mocks/visits.mock";
import { VisitCard } from "./visit-card";

type VisitFilter = "all" | "pending" | "active" | "checked_out" | "rejected";

type VisitsListProps = {
  visits: VisitItem[];
  activeFilter: VisitFilter;
  onApprove: (visitId: string) => void;
  onReject: (visitId: string) => void;
  onCheckIn: (visitId: string) => void;
  onCheckOut: (visitId: string) => void;
  onView: (visitId: string) => void;
};

export function VisitsList({
  visits,
  activeFilter,
  onApprove,
  onReject,
  onCheckIn,
  onCheckOut,
  onView,
}: VisitsListProps) {
  if (visits.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-[#dcdce5] bg-white p-10 text-center">
        <p className="text-base font-medium text-[#1f1f24]">
          No hay visitas para este filtro
        </p>
        <p className="mt-2 text-sm text-[#666670]">
          Probá cambiando el filtro o la búsqueda.
        </p>
      </div>
    );
  }

  if (activeFilter === "all") {
    const openVisits = visits.filter(
      (visit) => visit.status !== "checked_out" && visit.status !== "rejected",
    );
    const closedVisits = visits.filter(
      (visit) => visit.status === "checked_out" || visit.status === "rejected",
    );

    return (
      <div className="space-y-6">
        {openVisits.length > 0 ? (
          <div className="grid gap-3">
            {openVisits.map((visit) => (
              <VisitCard
                key={visit.id}
                visit={visit}
                onApprove={onApprove}
                onReject={onReject}
                onCheckIn={onCheckIn}
                onCheckOut={onCheckOut}
                onView={onView}
              />
            ))}
          </div>
        ) : null}

        {closedVisits.length > 0 ? (
          <>
            <ClosedSeparator />
            <div className="grid gap-3">
              {closedVisits.map((visit) => (
                <VisitCard
                  key={visit.id}
                  visit={visit}
                  onApprove={onApprove}
                  onReject={onReject}
                  onCheckIn={onCheckIn}
                  onCheckOut={onCheckOut}
                  onView={onView}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {visits.map((visit) => (
        <VisitCard
          key={visit.id}
          visit={visit}
          onApprove={onApprove}
          onReject={onReject}
          onCheckIn={onCheckIn}
          onCheckOut={onCheckOut}
          onView={onView}
        />
      ))}
    </div>
  );
}

function ClosedSeparator() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 border-t border-dashed border-[#d9d9e3]" />
      <span className="rounded-full border border-[#e7e7ee] bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        Cerradas
      </span>
      <div className="h-px flex-1 border-t border-dashed border-[#d9d9e3]" />
    </div>
  );
}
