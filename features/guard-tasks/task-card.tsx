"use client";

import { Play, CheckCircle2, Eye } from "lucide-react";
import { TaskPriorityBadge } from "./task-priority-badge";
import { TaskStatusBadge } from "./task-status-badge";

export type TaskItem = {
  id: string;
  title: string;
  location: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  dueTime: string;
};

type TaskCardProps = {
  task: TaskItem;
  onStart: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  onView: (taskId: string) => void;
};

export function TaskCard({
  task,
  onStart,
  onComplete,
  onView,
}: TaskCardProps) {
  return (
    <article className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-[-0.02em] text-[#18181b]">
            {task.title}
          </h3>
          <p className="mt-1 text-sm text-[#666670]">{task.location}</p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <TaskPriorityBadge priority={task.priority} />
          <TaskStatusBadge status={task.status} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-[#7b7b86]">Horario límite</span>
          <span className="font-medium text-[#1f1f24]">{task.dueTime}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onView(task.id)}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#e4e4ea] bg-white px-3 py-2 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
        >
          <Eye className="h-4 w-4" />
          Ver detalle
        </button>

        {task.status === "pending" ? (
          <button
            type="button"
            onClick={() => onStart(task.id)}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#6D28D9] px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            <Play className="h-4 w-4" />
            Iniciar
          </button>
        ) : null}

        {task.status === "in_progress" ? (
          <button
            type="button"
            onClick={() => onComplete(task.id)}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <CheckCircle2 className="h-4 w-4" />
            Completar
          </button>
        ) : null}
      </div>
    </article>
  );
}