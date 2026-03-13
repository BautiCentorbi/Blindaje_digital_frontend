"use client";

import type { RoundItem, RoundStatus } from "@/lib/mocks/rounds.mock";
import { RoundCard } from "./round-card";

type RoundFilter = "all" | RoundStatus;

type RoundsListProps = {
  rounds: RoundItem[];
  activeFilter: RoundFilter;
  currentMinutes: number;
  onView: (roundId: string) => void;
};

function parseTimeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function getRoundAvailability(round: RoundItem, currentMinutes: number) {
  if (round.status === "completed") {
    return {
      canOpenExecution: true,
      label: "Ronda finalizada. Disponible para revisión.",
    };
  }

  if (round.status === "active") {
    return {
      canOpenExecution: true,
      label: "Ronda en curso. Continuá la ejecución desde su vista operativa.",
    };
  }

  const scheduledMinutes = parseTimeToMinutes(round.scheduledStart);
  const minStart = scheduledMinutes - round.startWindowBeforeMinutes;
  const maxStart = scheduledMinutes + round.startWindowAfterMinutes;

  if (currentMinutes < minStart) {
    return {
      canOpenExecution: false,
      label: `Disponible más cerca de las ${round.scheduledStart}.`,
    };
  }

  if (currentMinutes > maxStart) {
    return {
      canOpenExecution: true,
      label: "Ventana horaria vencida. Revisá la ronda para gestionar el caso.",
    };
  }

  return {
    canOpenExecution: true,
    label: "Disponible para iniciar dentro de la ventana horaria.",
  };
}

export function RoundsList({
  rounds,
  activeFilter,
  currentMinutes,
  onView,
}: RoundsListProps) {
  if (rounds.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-[#dcdce5] bg-white p-10 text-center">
        <p className="text-base font-medium text-[#1f1f24]">
          No hay rondas para este filtro
        </p>
        <p className="mt-2 text-sm text-[#666670]">
          Probá cambiando el estado seleccionado.
        </p>
      </div>
    );
  }

  if (activeFilter === "all") {
    const operational = rounds.filter((round) => round.status !== "completed");
    const completed = rounds.filter((round) => round.status === "completed");

    return (
      <div className="space-y-6">
        {operational.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {operational.map((round) => {
              const availability = getRoundAvailability(round, currentMinutes);

              return (
                <RoundCard
                  key={round.id}
                  round={round}
                  canOpenExecution={availability.canOpenExecution}
                  availabilityLabel={availability.label}
                  onView={onView}
                />
              );
            })}
          </div>
        ) : null}

        {completed.length > 0 ? (
          <>
            <CompletedSeparator />

            <div className="grid gap-4 xl:grid-cols-2">
              {completed.map((round) => {
                const availability = getRoundAvailability(round, currentMinutes);

                return (
                  <RoundCard
                    key={round.id}
                    round={round}
                    canOpenExecution={availability.canOpenExecution}
                    availabilityLabel={availability.label}
                    onView={onView}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {rounds.map((round) => {
        const availability = getRoundAvailability(round, currentMinutes);

        return (
          <RoundCard
            key={round.id}
            round={round}
            canOpenExecution={availability.canOpenExecution}
            availabilityLabel={availability.label}
            onView={onView}
          />
        );
      })}
    </div>
  );
}

function CompletedSeparator() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 border-t border-dashed border-[#d9d9e3]" />
      <span className="rounded-full border border-[#e7e7ee] bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        Finalizadas
      </span>
      <div className="h-px flex-1 border-t border-dashed border-[#d9d9e3]" />
    </div>
  );
}
