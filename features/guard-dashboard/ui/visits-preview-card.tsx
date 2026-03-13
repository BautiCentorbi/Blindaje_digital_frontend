import Link from "next/link";

type Visit = {
  id: string;
  visitorName: string;
  residentName: string;
  status: "pending" | "approved" | "checked_in";
  expectedTime: string;
};

export function VisitsPreviewCard({ visits }: { visits: Visit[] }) {
  return (
    <article className="rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#6D28D9]">Visitas</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
            Ingresos del día
          </h3>
        </div>

        <Link
          href="/guardia/visitas"
          className="text-sm font-medium text-[#6D28D9] transition hover:text-violet-800"
        >
          Ver visitas
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#1f1f24]">
                  {visit.visitorName}
                </p>
                <p className="mt-1 text-sm text-[#666670]">
                  Autoriza: {visit.residentName}
                </p>
              </div>

              <span className={getVisitStatusClass(visit.status)}>
                {getVisitStatusLabel(visit.status)}
              </span>
            </div>

            <div className="mt-3 text-xs text-[#7b7b86]">
              Horario estimado: {visit.expectedTime}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function getVisitStatusClass(status: Visit["status"]) {
  if (status === "pending") {
    return "rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700";
  }

  if (status === "approved") {
    return "rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700";
  }

  return "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700";
}

function getVisitStatusLabel(status: Visit["status"]) {
  if (status === "pending") return "Pendiente";
  if (status === "approved") return "Autorizada";
  return "En sitio";
}