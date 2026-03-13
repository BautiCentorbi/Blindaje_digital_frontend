"use client";

import { useMemo, useState } from "react";
import { roundsMock, type RoundItem, type RoundStatus } from "@/lib/mocks/rounds.mock";
import { RoundsToolbar } from "./rounds-toolbar";
import { RoundsList } from "./rounds-list";
import { RoundDetailModal } from "./round-detail-modal";

type RoundFilter = "all" | RoundStatus;

export function GuardRoundsView() {
  const [rounds] = useState<RoundItem[]>(roundsMock);
  const [activeFilter, setActiveFilter] = useState<RoundFilter>("all");
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredRounds = useMemo(() => {
    if (activeFilter === "all") return rounds;
    return rounds.filter((round) => round.status === activeFilter);
  }, [rounds, activeFilter]);

  const counts = useMemo(
    () => ({
      all: rounds.length,
      scheduled: rounds.filter((round) => round.status === "scheduled").length,
      active: rounds.filter((round) => round.status === "active").length,
      completed: rounds.filter((round) => round.status === "completed").length,
    }),
    [rounds]
  );

  const currentMinutes = useMemo(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }, []);

  function handleView(roundId: string) {
    setSelectedRoundId(roundId);
    setIsDetailModalOpen(true);
  }

  const selectedRound =
    rounds.find((round) => round.id === selectedRoundId) ?? null;

  const totalCheckpoints = rounds.reduce(
    (acc, round) => acc + round.checkpoints.length,
    0
  );

  const completedCheckpoints = rounds.reduce(
    (acc, round) =>
      acc +
      round.checkpoints.filter((checkpoint) => checkpoint.status === "completed").length,
    0
  );

  return (
    <>
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#6D28D9]">Módulo operativo</p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#18181b]">
            Rondas del guardia
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[#666670]">
            Selección de rondas disponibles, control por horario y acceso a la
            ejecución operativa individual de cada recorrido.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <RoundsToolbar
              activeFilter={activeFilter}
              onChangeFilter={setActiveFilter}
              counts={counts}
            />

            <RoundsList
              rounds={filteredRounds}
              activeFilter={activeFilter}
              currentMinutes={currentMinutes}
              onView={handleView}
            />
          </div>

          <aside className="space-y-4">
            <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-medium text-[#6D28D9]">Resumen</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
                Estado de rondas
              </h3>

              <div className="mt-5 grid gap-3">
                <SummaryItem label="Total" value={counts.all} />
                <SummaryItem label="Programadas" value={counts.scheduled} />
                <SummaryItem label="Activas" value={counts.active} />
                <SummaryItem label="Finalizadas" value={counts.completed} />
              </div>
            </div>

            <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-medium text-[#6D28D9]">Cobertura</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
                Checkpoints
              </h3>

              <div className="mt-4 rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#666670]">Avance total</span>
                  <span className="font-medium text-[#1f1f24]">
                    {completedCheckpoints}/{totalCheckpoints}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-[#ececf3]">
                  <div
                    className="h-2 rounded-full bg-[#6D28D9]"
                    style={{
                      width: `${
                        totalCheckpoints > 0
                          ? Math.round((completedCheckpoints / totalCheckpoints) * 100)
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
                  Nota
                </p>
                <p className="mt-2 text-sm leading-6 text-[#666670]">
                  La ejecución real de checkpoints, GPS, anomalías y cierre se
                  realiza únicamente dentro de la ronda individual.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <RoundDetailModal
        open={isDetailModalOpen}
        round={selectedRound}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
        {value}
      </p>
    </div>
  );
}
