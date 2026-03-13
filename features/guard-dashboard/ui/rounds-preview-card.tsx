import Link from "next/link";

type Round = {
  id: string;
  name: string;
  status: "scheduled" | "active" | "completed";
  completedPoints: number;
  totalPoints: number;
  nextCheckpoint: string;
  startedAt: string;
};

export function RoundsPreviewCard({ rounds }: { rounds: Round[] }) {
  return (
    <article className="rounded-[28px] border border-[#e7e7ee] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#6D28D9]">Rondas</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
            Estado operativo
          </h3>
        </div>

        <Link
          href="/guardia/rondas"
          className="text-sm font-medium text-[#6D28D9] transition hover:text-violet-800"
        >
          Ver rondas
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {rounds.map((round) => {
          const progress = Math.round(
            (round.completedPoints / round.totalPoints) * 100
          );

          return (
            <div
              key={round.id}
              className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#1f1f24]">{round.name}</p>
                  <p className="mt-1 text-sm text-[#666670]">
                    Próximo checkpoint: {round.nextCheckpoint}
                  </p>
                </div>

                <span className={getRoundStatusClass(round.status)}>
                  {getRoundStatusLabel(round.status)}
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-[#7b7b86]">
                  <span>
                    {round.completedPoints}/{round.totalPoints} puntos
                  </span>
                  <span>{progress}%</span>
                </div>

                <div className="h-2 rounded-full bg-[#ececf3]">
                  <div
                    className="h-2 rounded-full bg-[#6D28D9]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function getRoundStatusClass(status: Round["status"]) {
  if (status === "active") {
    return "rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700";
  }

  if (status === "scheduled") {
    return "rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700";
  }

  return "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700";
}

function getRoundStatusLabel(status: Round["status"]) {
  if (status === "active") return "Activa";
  if (status === "scheduled") return "Programada";
  return "Finalizada";
}