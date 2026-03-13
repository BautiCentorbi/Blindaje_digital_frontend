type TaskStatus = "pending" | "in_progress" | "completed";

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const styles =
    status === "pending"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : status === "in_progress"
      ? "border-violet-200 bg-violet-50 text-violet-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  const label =
    status === "pending"
      ? "Pendiente"
      : status === "in_progress"
      ? "En progreso"
      : "Completada";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        styles,
      ].join(" ")}
    >
      {label}
    </span>
  );
}