"use client";

import { X } from "lucide-react";
import { TaskPriorityBadge } from "./task-priority-badge";
import { TaskStatusBadge } from "./task-status-badge";
import type { TaskItem } from "./task-card";

type TaskDetailModalProps = {
  open: boolean;
  task: TaskItem | null;
  onClose: () => void;
};

export function TaskDetailModal({
  open,
  task,
  onClose,
}: TaskDetailModalProps) {
  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18181b]/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6D28D9]">Detalle de tarea</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
              {task.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#666670]">
              Información operativa de la tarea seleccionada.
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
          <TaskPriorityBadge priority={task.priority} />
          <TaskStatusBadge status={task.status} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <DetailRow label="Ubicación" value={task.location} />
          <DetailRow label="Horario límite" value={task.dueTime} />
          <DetailRow
            label="Prioridad"
            value={
              task.priority === "high"
                ? "Alta"
                : task.priority === "medium"
                ? "Media"
                : "Baja"
            }
          />
          <DetailRow
            label="Estado"
            value={
              task.status === "pending"
                ? "Pendiente"
                : task.status === "in_progress"
                ? "En progreso"
                : "Completada"
            }
          />
        </div>

        <div className="mt-6 rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
            Observación
          </p>
          <p className="mt-2 text-sm leading-6 text-[#666670]">
            Esta tarea forma parte del flujo operativo del turno actual. Más
            adelante acá podés incluir observaciones, evidencia, timestamps y
            trazabilidad completa.
          </p>
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