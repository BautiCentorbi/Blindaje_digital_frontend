"use client";

import { useState } from "react";
import { X } from "lucide-react";

type TaskPriority = "high" | "medium" | "low";

export type NewTaskInput = {
  title: string;
  location: string;
  priority: TaskPriority;
  dueTime: string;
};

type CreateTaskModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: NewTaskInput) => void;
};

export function CreateTaskModal({
  open,
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueTime, setDueTime] = useState("");

  if (!open) return null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !location.trim() || !dueTime.trim()) return;

    onSubmit({
      title: title.trim(),
      location: location.trim(),
      priority,
      dueTime: dueTime.trim(),
    });

    setTitle("");
    setLocation("");
    setPriority("medium");
    setDueTime("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18181b]/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6D28D9]">Nueva tarea</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
              Registrar tarea operativa
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#666670]">
              Creá una tarea manual para el turno actual.
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#2f2f37]">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Verificar acceso peatonal"
              className="h-12 w-full rounded-2xl border border-[#dddde6] bg-white px-4 text-sm text-[#1f1f24] outline-none transition placeholder:text-[#9b9ba5] focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#2f2f37]">
              Ubicación
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej: Acceso Norte"
              className="h-12 w-full rounded-2xl border border-[#dddde6] bg-white px-4 text-sm text-[#1f1f24] outline-none transition placeholder:text-[#9b9ba5] focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2f2f37]">
                Prioridad
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="h-12 w-full rounded-2xl border border-[#dddde6] bg-white px-4 text-sm text-[#1f1f24] outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              >
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2f2f37]">
                Horario límite
              </label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="h-12 w-full rounded-2xl border border-[#dddde6] bg-white px-4 text-sm text-[#1f1f24] outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-[#e4e4ea] bg-white px-4 py-3 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-[#6D28D9] px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Crear tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}