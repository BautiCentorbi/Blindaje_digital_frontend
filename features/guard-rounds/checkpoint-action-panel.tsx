import type { IncidentType, RoundItem } from "@/lib/mocks/rounds.mock";
import { CheckpointIncidentsSelector } from "./checkpoint-incident-selector";
import { CheckpointEvidencePanel } from "./checkpoint-evidence-panel";


type CheckpointActionPanelProps = {
  round: RoundItem;
  currentCheckpointId: string | null;
  distanceToCurrent: number | null;
  canMarkCheckpoint: boolean;
  canStartRound: boolean;
  startMessage: string;
  onStartRound: () => void;
  onMarkCheckpoint: () => void;
  onToggleIncident: (incident: IncidentType) => void;
  onAddEvidence: () => void;
};


export function CheckpointActionPanel({
  round,
  currentCheckpointId,
  distanceToCurrent,
  canMarkCheckpoint,
  canStartRound,
  startMessage,
  onStartRound,
  onMarkCheckpoint,
  onToggleIncident,
  onAddEvidence,
}: CheckpointActionPanelProps) {
  const currentCheckpoint =
    round.checkpoints.find((checkpoint) => checkpoint.id === currentCheckpointId) ?? null;

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
        <p className="text-sm font-medium text-[#6D28D9]">Checkpoint actual</p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
          {currentCheckpoint ? currentCheckpoint.name : "Ronda completada"}
        </h3>

        {round.status === "scheduled" ? (
          <>
            <p className="mt-3 text-sm leading-6 text-[#666670]">{startMessage}</p>

            <button
              type="button"
              onClick={onStartRound}
              disabled={!canStartRound}
              className="mt-4 rounded-2xl bg-[#6D28D9] px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Iniciar ronda
            </button>
          </>
        ) : currentCheckpoint ? (
          <>
            <div className="mt-4 rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4 text-sm text-[#4f4f59]">
              Distancia simulada al checkpoint:{" "}
              <span className="font-semibold text-[#1f1f24]">
                {distanceToCurrent !== null ? `${distanceToCurrent}px` : "-"}
              </span>
            </div>

            <button
              type="button"
              onClick={onMarkCheckpoint}
              disabled={!canMarkCheckpoint}
              className="mt-4 rounded-2xl bg-[#6D28D9] px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Marcar checkpoint
            </button>

            {!canMarkCheckpoint ? (
              <p className="mt-3 text-sm text-red-600">
                Estás fuera del radio permitido para registrar este checkpoint.
              </p>
            ) : null}
          </>
        ) : (
          <p className="mt-3 text-sm leading-6 text-[#666670]">
            Ya no quedan checkpoints pendientes en esta ronda.
          </p>
        )}
      </div>

      {currentCheckpoint && round.status === "active" ? (
        <>
          <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
            <CheckpointIncidentsSelector
              selected={currentCheckpoint.incidents}
              onToggle={onToggleIncident}
            />
          </div>

          <CheckpointEvidencePanel
            evidenceCount={currentCheckpoint.evidenceCount}
            onAddEvidence={onAddEvidence}
          />
        </>
      ) : null}
    </div>
  );
}
