import type { VisitStatus } from "@/lib/mocks/visits.mock";

export function VisitStatusBadge({ status }: { status: VisitStatus }) {
  const styles =
    status === "pending"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : status === "approved"
      ? "border-violet-200 bg-violet-50 text-violet-700"
      : status === "checked_in"
      ? "border-sky-200 bg-sky-50 text-sky-700"
      : status === "checked_out"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-red-200 bg-red-50 text-red-700";

  const label =
    status === "pending"
      ? "Pendiente"
      : status === "approved"
      ? "Autorizada"
      : status === "checked_in"
      ? "En sitio"
      : status === "checked_out"
      ? "Finalizada"
      : "Rechazada";

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