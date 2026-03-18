"use client";

import { useMemo, useState } from "react";
import { type VisitItem, type VisitStatus } from "@/lib/mocks/visits.mock";
import {
  ManualEntryModal,
  type ManualEntryPayload,
} from "./manual-entry-modal";
import { VisitsToolbar } from "./visits-toolbar";
import { VisitsList } from "./visits-list";
import { VisitDetailModal } from "./visit-detail-modal";
import { useGuardVisits } from "./guard-visits-provider";

type VisitFilter = "all" | "pending" | "active" | "checked_out" | "rejected";

function isActiveVisit(status: VisitStatus) {
  return status === "approved" || status === "checked_in";
}

function getCurrentHourMinute() {
  return new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function GuardVisitsView() {
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<VisitFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const {
    visits,
    pendingDetectionsCount,
    openDetectionsModal,
    approveVisit,
    rejectVisit,
    checkInVisit,
    checkOutVisit,
    addManualVisit,
  } = useGuardVisits();

  const searchedVisits = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) return visits;

    return visits.filter((visit) => {
      const haystack = [
        visit.visitorName,
        visit.residentName,
        visit.documentId,
        visit.vehiclePlate ?? "",
        visit.destination,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [visits, searchTerm]);

  const residentOptions = [
    { id: "resident-001", label: "María López · Casa 14" },
    { id: "resident-002", label: "Familia Torres · Casa 22" },
    { id: "resident-003", label: "Laura Díaz · Casa 7" },
    { id: "resident-004", label: "Casa 18 · Unidad principal" },
  ];

  const filteredVisits = useMemo(() => {
    if (activeFilter === "all") return searchedVisits;
    if (activeFilter === "active") {
      return searchedVisits.filter((visit) => isActiveVisit(visit.status));
    }
    return searchedVisits.filter((visit) => visit.status === activeFilter);
  }, [searchedVisits, activeFilter]);

  const counts = useMemo(
    () => ({
      all: visits.length,
      pending: visits.filter((visit) => visit.status === "pending").length,
      active: visits.filter((visit) => isActiveVisit(visit.status)).length,
      checked_out: visits.filter((visit) => visit.status === "checked_out")
        .length,
      rejected: visits.filter((visit) => visit.status === "rejected").length,
    }),
    [visits],
  );

  function handleManualEntrySubmit(payload: ManualEntryPayload) {
    const newVisit: VisitItem = {
      id: `visit-${crypto.randomUUID()}`,
      visitorName: `${payload.firstName} ${payload.lastName}`.trim(),
      documentId: payload.documentId,
      residentName: payload.residentLabel,
      destination: payload.residentLabel.split("·")[1]?.trim() ?? "Sin destino",
      expectedTime: getCurrentHourMinute(),
      vehiclePlate: payload.vehiclePlate,
      notes:
        payload.companions.length > 0
          ? `${payload.companions.length} acompañante(s)`
          : "Ingreso manual",
      status: "pending",
    };

    addManualVisit(newVisit);
    setIsManualEntryOpen(false);
  }

  function handleView(visitId: string) {
    setSelectedVisitId(visitId);
    setIsVisitModalOpen(true);
  }

  const selectedVisit =
    visits.find((visit) => visit.id === selectedVisitId) ?? null;

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#6D28D9]">
              Módulo operativo
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#18181b]">
              Visitas y accesos
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[#666670]">
              Bandeja operativa de ingresos con revisión manual y soporte futuro
              para OCR, LPR y validación facial asistida.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsManualEntryOpen(true)}
              className="rounded-2xl bg-[#6D28D9] px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Nuevo ingreso
            </button>

            <button
              type="button"
              onClick={openDetectionsModal}
              className="inline-flex items-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-medium text-[#6D28D9] transition hover:bg-violet-100"
            >
              Registro automático
              <span className="rounded-full bg-white px-2 py-0.5 text-xs">
                {pendingDetectionsCount}
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            <VisitsToolbar
              activeFilter={activeFilter}
              searchTerm={searchTerm}
              onChangeFilter={setActiveFilter}
              onChangeSearch={setSearchTerm}
              counts={counts}
            />

            <VisitsList
              visits={filteredVisits}
              activeFilter={activeFilter}
              onApprove={approveVisit}
              onReject={rejectVisit}
              onCheckIn={checkInVisit}
              onCheckOut={checkOutVisit}
              onView={handleView}
            />
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-medium text-[#6D28D9]">Resumen</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
                Estado operativo
              </h3>

              <div className="mt-5 grid gap-3">
                <SummaryItem label="Total" value={counts.all} />
                <SummaryItem label="Pendientes" value={counts.pending} />
                <SummaryItem label="Activas" value={counts.active} />
                <SummaryItem label="Finalizadas" value={counts.checked_out} />
              </div>
            </div>

            <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-medium text-[#6D28D9]">Criterio UI</p>
              <p className="mt-3 text-sm leading-6 text-[#666670]">
                Las detecciones automáticas siguen activas en toda la app. El
                guardia puede revisar, aprobar o rechazar ingresos desde
                cualquier módulo del turno.
              </p>
            </div>
          </div>
        </div>
      </section>

      <VisitDetailModal
        open={isVisitModalOpen}
        visit={selectedVisit}
        onClose={() => setIsVisitModalOpen(false)}
      />

      <ManualEntryModal
        open={isManualEntryOpen}
        residents={residentOptions}
        onClose={() => setIsManualEntryOpen(false)}
        onSubmit={handleManualEntrySubmit}
      />
    </>
  );
}

function SummaryItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
        {value}
      </p>
    </div>
  );
}
