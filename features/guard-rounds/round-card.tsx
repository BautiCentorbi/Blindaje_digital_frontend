"use client";

import Link from "next/link";
import { Eye, ArrowRight } from "lucide-react";
import type { RoundItem } from "@/lib/mocks/rounds.mock";
import { RoundStatusBadge } from "./round-status-badge";

type RoundCardProps = {
  round: RoundItem;
  canOpenExecution: boolean;
  availabilityLabel: string;
  onView: (roundId: string) => void;
};

export function RoundCard({
  round,
  canOpenExecution,
  availabilityLabel,
  onView,
}: RoundCardProps) {
  const completedPoints = round.checkpoints.filter(
    (checkpoint) => checkpoint.status === "completed"
  ).length;

  const totalPoints = round.checkpoints.length;
  const progress =
    totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  return (
    <article className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-[-0.02em] text-[#18181b]">
            {round.name}
          </h3>
          <p className="mt-1 text-sm text-[#666670]">
            Horario programado: {round.scheduledStart}
          </p>
        </div>

        <RoundStatusBadge status={round.status} />
      </div>

      <div className="mt-4 rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-[#666670]">Progreso</span>
          <span className="font-medium text-[#1f1f24]">
            {completedPoints}/{totalPoints}
          </span>
        </div>

        <div className="h-2 rounded-full bg-[#ececf3]">
          <div
            className="h-2 rounded-full bg-[#6D28D9] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-[#666670]">{availabilityLabel}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onView(round.id)}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#e4e4ea] bg-white px-3 py-2 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
        >
          <Eye className="h-4 w-4" />
          Ver detalle
        </button>

        <Link
          href={`/guardia/rondas/${round.id}`}
          aria-disabled={!canOpenExecution}
          className={[
            "inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition",
            canOpenExecution
              ? "bg-[#6D28D9] text-white hover:bg-violet-700"
              : "pointer-events-none bg-[#e9e9ef] text-[#8a8a95]",
          ].join(" ")}
        >
          <ArrowRight className="h-4 w-4" />
          Ejecutar ronda
        </Link>
      </div>
    </article>
  );
}
