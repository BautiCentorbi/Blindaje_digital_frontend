"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, LocateFixed } from "lucide-react";
import type { RoundCheckpoint } from "@/lib/mocks/rounds.mock";

type RoundPositionSimulatorDockProps = {
  checkpoints: RoundCheckpoint[];
  simulatedPosition: { x: number; y: number };
  currentCheckpointId: string | null;
  distanceToCurrent: number | null;
  canMarkCheckpoint: boolean;
  onMoveToCheckpoint: (checkpointId: string) => void;
  onMoveFarAway: () => void;
};

export function RoundPositionSimulatorDock({
  checkpoints,
  simulatedPosition,
  currentCheckpointId,
  distanceToCurrent,
  canMarkCheckpoint,
  onMoveToCheckpoint,
  onMoveFarAway,
}: RoundPositionSimulatorDockProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const currentCheckpoint =
    checkpoints.find((checkpoint) => checkpoint.id === currentCheckpointId) ?? null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 lg:left-auto lg:right-6 lg:w-[360px]">
      <div className="overflow-hidden rounded-[28px] border border-[#e7e7ee] bg-white/95 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4 border-b border-[#efeff4] px-4 py-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#6D28D9]">Simulador GPS</p>
            <p className="mt-1 truncate text-sm text-[#666670]">
              {currentCheckpoint
                ? `Checkpoint actual: ${currentCheckpoint.name}`
                : "Sin checkpoint pendiente"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#e4e4ea] bg-white text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
            aria-label={isExpanded ? "Colapsar simulador" : "Expandir simulador"}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <DockInfo
              label="Posición"
              value={`X ${simulatedPosition.x}% · Y ${simulatedPosition.y}%`}
            />
            <DockInfo
              label="Distancia"
              value={
                distanceToCurrent !== null ? `${distanceToCurrent}px` : "Sin dato"
              }
              tone={canMarkCheckpoint ? "success" : "default"}
            />
          </div>

          <div className="mt-3">
            <span
              className={[
                "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                canMarkCheckpoint
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50 text-amber-700",
              ].join(" ")}
            >
              {canMarkCheckpoint ? "Dentro de rango" : "Fuera de rango"}
            </span>
          </div>
        </div>

        {isExpanded ? (
          <div className="border-t border-[#efeff4] px-4 py-4">
            <div className="flex flex-wrap gap-2">
              {currentCheckpoint ? (
                <button
                  type="button"
                  onClick={() => onMoveToCheckpoint(currentCheckpoint.id)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#6D28D9] px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
                >
                  <LocateFixed className="h-4 w-4" />
                  Ir al actual
                </button>
              ) : null}

              <button
                type="button"
                onClick={onMoveFarAway}
                className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
              >
                Simular lejos
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
                Mover a checkpoint
              </p>

              <div className="grid gap-2">
                {checkpoints.map((checkpoint) => {
                  const isCurrent = checkpoint.id === currentCheckpointId;

                  return (
                    <button
                      key={checkpoint.id}
                      type="button"
                      onClick={() => onMoveToCheckpoint(checkpoint.id)}
                      className={[
                        "flex items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm font-medium transition",
                        isCurrent
                          ? "border-violet-200 bg-violet-50 text-[#6D28D9]"
                          : "border-[#e4e4ea] bg-white text-[#4f4f59] hover:border-violet-200 hover:text-[#6D28D9]",
                      ].join(" ")}
                    >
                      <span>{checkpoint.name}</span>

                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[11px]",
                          checkpoint.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-[#f4f4f8] text-[#6d6d77]",
                        ].join(" ")}
                      >
                        {checkpoint.status === "completed" ? "OK" : "Pendiente"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DockInfo({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "success";
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-3",
        tone === "success"
          ? "border-emerald-200 bg-emerald-50"
          : "border-[#efeff4] bg-[#fafafe]",
      ].join(" ")}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-[#1f1f24]">{value}</p>
    </div>
  );
}
