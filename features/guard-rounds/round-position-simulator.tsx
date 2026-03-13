import type { RoundCheckpoint } from "@/lib/mocks/rounds.mock";

type RoundPositionSimulatorProps = {
  checkpoints: RoundCheckpoint[];
  simulatedPosition: { x: number; y: number };
  onMoveToCheckpoint: (checkpointId: string) => void;
  onMoveFarAway: () => void;
};

export function RoundPositionSimulator({
  checkpoints,
  simulatedPosition,
  onMoveToCheckpoint,
  onMoveFarAway,
}: RoundPositionSimulatorProps) {
  return (
    <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <p className="text-sm font-medium text-[#6D28D9]">Simulador GPS</p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
        Posición del guardia
      </h3>

      <div className="mt-4 rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4 text-sm text-[#4f4f59]">
        Posición simulada actual: X {simulatedPosition.x}% · Y {simulatedPosition.y}%
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {checkpoints.map((checkpoint) => (
          <button
            key={checkpoint.id}
            type="button"
            onClick={() => onMoveToCheckpoint(checkpoint.id)}
            className="rounded-2xl border border-[#e4e4ea] bg-white px-3 py-2 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
          >
            Ir a {checkpoint.name}
          </button>
        ))}

        <button
          type="button"
          onClick={onMoveFarAway}
          className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
        >
          Simular lejos
        </button>
      </div>
    </div>
  );
}
