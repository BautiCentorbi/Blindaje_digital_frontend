type TaskPriority = "high" | "medium" | "low";

export function TaskPriorityBadge({
  priority,
}: {
  priority: TaskPriority;
}) {
  const styles =
    priority === "high"
      ? "border-red-200 bg-red-50 text-red-700"
      : priority === "medium"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  const label =
    priority === "high" ? "Alta" : priority === "medium" ? "Media" : "Baja";

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