"use client";

import { TaskCard, TaskItem } from "./task-card";

type TaskFilter = "all" | "pending" | "in_progress" | "completed";

type TasksListProps = {
  tasks: TaskItem[];
  activeFilter: TaskFilter;
  onStart: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  onView: (taskId: string) => void;
};

export function TasksList({
  tasks,
  activeFilter,
  onStart,
  onComplete,
  onView,
}: TasksListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-[#dcdce5] bg-white p-10 text-center">
        <p className="text-base font-medium text-[#1f1f24]">
          No hay tareas para este filtro
        </p>
        <p className="mt-2 text-sm text-[#666670]">
          Probá cambiando el estado seleccionado.
        </p>
      </div>
    );
  }

  if (activeFilter === "all") {
    const activeTasks = tasks.filter((task) => task.status !== "completed");
    const completedTasks = tasks.filter((task) => task.status === "completed");

    return (
      <div className="space-y-6">
        {activeTasks.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {activeTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStart={onStart}
                onComplete={onComplete}
                onView={onView}
              />
            ))}
          </div>
        ) : null}

        {completedTasks.length > 0 ? (
          <>
            <CompletedSeparator />

            <div className="grid gap-4 xl:grid-cols-2">
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStart={onStart}
                  onComplete={onComplete}
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
    <div className="grid gap-4 xl:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStart={onStart}
          onComplete={onComplete}
          onView={onView}
        />
      ))}
    </div>
  );
}

function CompletedSeparator() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 border-t border-dashed border-[#d9d9e3]" />
      <span className="rounded-full border border-[#e7e7ee] bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        Completadas
      </span>
      <div className="h-px flex-1 border-t border-dashed border-[#d9d9e3]" />
    </div>
  );
}