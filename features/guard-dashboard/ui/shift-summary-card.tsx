type ShiftSummaryCardProps = {
  shift: {
    id: string;
    guardName: string;
    roleLabel: string;
    shiftName: string;
    schedule: string;
    property: string;
    startedAt: string;
    status: "active" | "inactive";
  };
};

export function ShiftSummaryCard({ shift }: ShiftSummaryCardProps) {
  return (
    <article className="rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#6D28D9]">Turno actual</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
            {shift.shiftName}
          </h3>
          <p className="mt-2 text-sm text-[#666670]">{shift.property}</p>
        </div>

        <div
          className={[
            "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium",
            shift.status === "active"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border border-zinc-200 bg-zinc-50 text-zinc-700",
          ].join(" ")}
        >
          {shift.status === "active" ? "En servicio" : "Inactivo"}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InfoItem label="Guardia" value={shift.guardName} />
        <InfoItem label="Rol" value={shift.roleLabel} />
        <InfoItem label="Horario" value={shift.schedule} />
        <InfoItem label="Inicio" value={shift.startedAt} />
      </div>
    </article>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-[#1f1f24]">{value}</p>
    </div>
  );
}