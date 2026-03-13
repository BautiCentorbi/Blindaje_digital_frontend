"use client";

import { useMemo, useState } from "react";
import { tasksMock } from "@/lib/mocks/tasks.mock";
import { TasksToolbar } from "./tasks-toolbar";
import { TasksList } from "./tasks-list";
import { CreateTaskModal, type NewTaskInput } from "./create-task-modal";
import { TaskDetailModal } from "./task-detail-modal";
import type { TaskItem } from "./task-card";

type TaskFilter = "all" | "pending" | "in_progress" | "completed";

export function GuardTasksView() {
  const [tasks, setTasks] = useState<TaskItem[]>(tasksMock);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") return tasks;
    return tasks.filter((task) => task.status === activeFilter);
  }, [tasks, activeFilter]);

  const counts = useMemo(
    () => ({
      all: tasks.length,
      pending: tasks.filter((task) => task.status === "pending").length,
      in_progress: tasks.filter((task) => task.status === "in_progress").length,
      completed: tasks.filter((task) => task.status === "completed").length,
    }),
    [tasks]
  );

  function handleStart(taskId: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, status: "in_progress" } : task
      )
    );
  }

  function handleComplete(taskId: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task
      )
    );
  }

  function handleView(taskId: string) {
    setSelectedTaskId(taskId);
    setIsDetailModalOpen(true);
  }

  function handleCreateTask(input: NewTaskInput) {
    const newTask: TaskItem = {
      id: `task-${crypto.randomUUID()}`,
      title: input.title,
      location: input.location,
      priority: input.priority,
      dueTime: input.dueTime,
      status: "pending",
    };

    setTasks((current) => [newTask, ...current]);
    setSelectedTaskId(newTask.id);
    setActiveFilter("all");
  }

  const selectedTask =
    tasks.find((task) => task.id === selectedTaskId) ?? null;

  return (
    <>
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#6D28D9]">Módulo operativo</p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#18181b]">
            Tareas del guardia
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[#666670]">
            Seguimiento de tareas asignadas, control de prioridad y cambio de
            estado operativo durante el turno.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <TasksToolbar
              activeFilter={activeFilter}
              onChangeFilter={setActiveFilter}
              onCreateTask={() => setIsCreateModalOpen(true)}
              counts={counts}
            />

            <TasksList
              tasks={filteredTasks}
              activeFilter={activeFilter}
              onStart={handleStart}
              onComplete={handleComplete}
              onView={handleView}
            />
          </div>

          <aside className="space-y-4">
            <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-medium text-[#6D28D9]">Resumen</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
                Estado de tareas
              </h3>

              <div className="mt-5 grid gap-3">
                <SummaryItem label="Total" value={counts.all} />
                <SummaryItem label="Pendientes" value={counts.pending} />
                <SummaryItem label="En progreso" value={counts.in_progress} />
                <SummaryItem label="Completadas" value={counts.completed} />
              </div>
            </div>

            <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-medium text-[#6D28D9]">
                Acciones rápidas
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
                Operación del turno
              </h3>

              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[#6D28D9] px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
                >
                  Crear nueva tarea
                </button>

                <div className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
                    Nota
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#666670]">
                    Las tareas completadas se agrupan al final cuando el filtro
                    está en “Todas”, para priorizar la lectura operativa.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CreateTaskModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
      />

      <TaskDetailModal
        open={isDetailModalOpen}
        task={selectedTask}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
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