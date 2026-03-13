import Link from "next/link";

type Task = {
  id: string;
  title: string;
  location: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  dueTime: string;
};

export function TasksPreviewCard({ tasks }: { tasks: Task[] }) {
  return (
    <article className="rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#6D28D9]">Tareas</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
            Pendientes del turno
          </h3>
        </div>

        <Link
          href="/guardia/tareas"
          className="text-sm font-medium text-[#6D28D9] transition hover:text-violet-800"
        >
          Ver todas
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#1f1f24]">{task.title}</p>
                <p className="mt-1 text-sm text-[#666670]">{task.location}</p>
              </div>

              <span className={getPriorityClass(task.priority)}>
                {getPriorityLabel(task.priority)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-[#7b7b86]">
              <span>{getStatusLabel(task.status)}</span>
              <span>Vence {task.dueTime}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function getPriorityClass(priority: Task["priority"]) {
  if (priority === "high") {
    return "rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700";
  }

  if (priority === "medium") {
    return "rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700";
  }

  return "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700";
}

function getPriorityLabel(priority: Task["priority"]) {
  if (priority === "high") return "Alta";
  if (priority === "medium") return "Media";
  return "Baja";
}

function getStatusLabel(status: Task["status"]) {
  if (status === "pending") return "Pendiente";
  if (status === "in_progress") return "En progreso";
  return "Completada";
}