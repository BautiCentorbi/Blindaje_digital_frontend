"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, DoorOpen, DoorClosed, Eye, XCircle } from "lucide-react";
import type { VisitItem } from "@/lib/mocks/visits.mock";
import { VisitStatusBadge } from "./visit-status-badge";

type VisitCardProps = {
  visit: VisitItem;
  onApprove: (visitId: string) => void;
  onReject: (visitId: string) => void;
  onCheckIn: (visitId: string) => void;
  onCheckOut: (visitId: string) => void;
  onView: (visitId: string) => void;
};

export function VisitCard({
  visit,
  onApprove,
  onReject,
  onCheckIn,
  onCheckOut,
  onView,
}: VisitCardProps) {
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    if (visit.status !== "checked_in" || !visit.horaIngreso) return;

    const intervalId = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, [visit.status, visit.horaIngreso]);

  const permanencia = useMemo(() => {
    if (visit.status !== "checked_in" || !visit.horaIngreso) return null;
    return formatElapsedTime(visit.horaIngreso, currentTime);
  }, [currentTime, visit.horaIngreso, visit.status]);

  return (
    <article className="rounded-[24px] border border-[#e7e7ee] bg-white p-4 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[#18181b]">
            {visit.visitorName}
          </h3>
          <p className="mt-1 text-sm text-[#666670]">
            {visit.residentName} · {visit.destination}
          </p>
        </div>

        <VisitStatusBadge status={visit.status} />
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#666670]">
        <span>DNI: {visit.documentId}</span>
        <span>Hora: {visit.expectedTime}</span>
        <span>Patente: {visit.vehiclePlate ?? "—"}</span>
      </div>

      {visit.status === "checked_in" && visit.horaIngreso ? (
        <div className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-3 py-2 text-sm text-emerald-900">
          <p className="font-medium">En el predio desde las {visit.horaIngreso}</p>
          <p className="mt-1 text-emerald-800/80">
            Tiempo en propiedad: {permanencia ?? "Calculando..."}
          </p>
        </div>
      ) : null}

      {visit.status === "checked_out" && visit.horaIngreso && visit.horaSalida ? (
        <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800">
          <p>
            <span className="font-medium">Ingreso:</span> {visit.horaIngreso}
          </p>
          <p className="mt-1">
            <span className="font-medium">Salida:</span> {visit.horaSalida}
          </p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onView(visit.id)}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#e4e4ea] bg-white px-3 py-2 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
        >
          <Eye className="h-4 w-4" />
          Detalle
        </button>

        {visit.status === "pending" ? (
          <>
            <button
              type="button"
              onClick={() => onApprove(visit.id)}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#6D28D9] px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              Autorizar
            </button>

            <button
              type="button"
              onClick={() => onReject(visit.id)}
              className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
            >
              <XCircle className="h-4 w-4" />
              Rechazar
            </button>
          </>
        ) : null}

        {visit.status === "approved" ? (
          <button
            type="button"
            onClick={() => onCheckIn(visit.id)}
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            <DoorOpen className="h-4 w-4" />
            Validar ingreso
          </button>
        ) : null}

        {visit.status === "checked_in" ? (
          <button
            type="button"
            onClick={() => onCheckOut(visit.id)}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <DoorClosed className="h-4 w-4" />
            Registrar salida
          </button>
        ) : null}
      </div>
    </article>
  );
}

function formatElapsedTime(horaIngreso: string, now: number) {
  const [hours, minutes] = horaIngreso.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  const ingreso = new Date(now);
  ingreso.setHours(hours, minutes, 0, 0);

  if (ingreso.getTime() > now) {
    ingreso.setDate(ingreso.getDate() - 1);
  }

  const diffInMinutes = Math.max(
    0,
    Math.floor((now - ingreso.getTime()) / 60_000),
  );
  const elapsedHours = Math.floor(diffInMinutes / 60);
  const elapsedMinutes = diffInMinutes % 60;

  if (elapsedHours === 0) {
    return `${elapsedMinutes} min`;
  }

  if (elapsedMinutes === 0) {
    return `${elapsedHours} h`;
  }

  return `${elapsedHours} h ${elapsedMinutes} min`;
}
