import type { RoundItem } from "@/lib/mocks/rounds.mock";

type RoundMapMockProps = {
  round: RoundItem;
  simulatedPosition: { x: number; y: number };
  currentCheckpointId: string | null;
};

export function RoundMapMock({
  round,
  simulatedPosition,
  currentCheckpointId,
}: RoundMapMockProps) {
  return (
    <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="mb-4">
        <p className="text-sm font-medium text-[#6D28D9]">Mapa operativo</p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
          Vista mock del recorrido
        </h3>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[#ececf3] bg-[linear-gradient(180deg,#fafafe_0%,#f3f3f9_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(109,40,217,0.06),transparent_18%),radial-gradient(circle_at_80%_60%,rgba(109,40,217,0.08),transparent_18%)]" />

        {round.checkpoints.map((checkpoint) => {
          const isCurrent = checkpoint.id === currentCheckpointId;

          return (
            <div
              key={checkpoint.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${checkpoint.x}%`,
                top: `${checkpoint.y}%`,
              }}
            >
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-semibold shadow-sm",
                  checkpoint.status === "completed"
                    ? "border-emerald-300 bg-emerald-100 text-emerald-700"
                    : isCurrent
                    ? "border-violet-400 bg-violet-100 text-violet-700"
                    : "border-[#d9d9e3] bg-white text-[#686873]",
                ].join(" ")}
              >
                {checkpoint.status === "completed" ? "✓" : ""}
              </div>

              <div className="mt-2 min-w-[96px] -translate-x-1/3 rounded-xl border border-[#ececf3] bg-white/90 px-2 py-1 text-center text-[11px] font-medium text-[#4f4f59] backdrop-blur">
                {checkpoint.name}
              </div>
            </div>
          );
        })}

        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${simulatedPosition.x}%`,
            top: `${simulatedPosition.y}%`,
          }}
        >
          <div className="relative flex h-5 w-5 items-center justify-center">
            <span className="absolute h-10 w-10 rounded-full bg-violet-400/15" />
            <span className="absolute h-6 w-6 rounded-full bg-violet-500/25" />
            <span className="relative h-4 w-4 rounded-full border-2 border-white bg-[#6D28D9]" />
          </div>
        </div>
      </div>
    </div>
  );
}
