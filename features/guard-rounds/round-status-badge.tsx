import type { RoundStatus } from "@/lib/mocks/rounds.mock";

export function RoundStatusBadge({ status }: { status: RoundStatus }) {
  const styles =
    status === "active"
      ? "border-violet-200 bg-violet-50 text-violet-700"
      : status === "scheduled"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  const label =
    status === "active"
      ? "Activa"
      : status === "scheduled"
      ? "Programada"
      : "Finalizada";

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
