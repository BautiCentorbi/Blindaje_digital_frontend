"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  roundsMock,
  type IncidentType,
  type RoundCheckpoint,
  type RoundItem,
} from "@/lib/mocks/rounds.mock";
import { RoundMapMock } from "./round-map-mock";
import { CheckpointActionPanel } from "./checkpoint-action-panel";
import { RoundFinalizationPanel } from "./round-finalization-panel";
import { RoundStatusBadge } from "./round-status-badge";
import { RoundPositionSimulatorDock } from "./round-position-simulator-dock";

function parseTimeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function getDistance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.round(Math.hypot(a.x - b.x, a.y - b.y));
}

export function RoundExecutionView({ roundId }: { roundId: string }) {
  const initialRound = roundsMock.find((item) => item.id === roundId) ?? null;

  const [round, setRound] = useState<RoundItem | null>(initialRound);
  const [simulatedPosition, setSimulatedPosition] = useState({ x: 10, y: 10 });

  if (!round) {
    return (
      <section className="space-y-4">
        <p className="text-sm font-medium text-[#6D28D9]">Rondas</p>
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#18181b]">
          Ronda no encontrada
        </h2>
        <Link
          href="/guardia/rondas"
          className="inline-flex items-center gap-2 rounded-2xl border border-[#e4e4ea] bg-white px-4 py-3 text-sm font-medium text-[#4f4f59]"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a rondas
        </Link>
      </section>
    );
  }

  const currentCheckpoint =
    round.checkpoints.find((checkpoint) => checkpoint.status === "pending") ??
    null;

  const distanceToCurrent = currentCheckpoint
    ? getDistance(simulatedPosition, {
        x: currentCheckpoint.x,
        y: currentCheckpoint.y,
      })
    : null;

  const allowedDistance = 8;

  const canMarkCheckpoint =
    round.status === "active" &&
    currentCheckpoint !== null &&
    distanceToCurrent !== null &&
    distanceToCurrent <= allowedDistance;

  const allCompleted = round.checkpoints.every(
    (checkpoint) => checkpoint.status === "completed",
  );

  const currentMinutes = getCurrentMinutes();
  const scheduledMinutes = parseTimeToMinutes(round.scheduledStart);
  const minStart = scheduledMinutes - round.startWindowBeforeMinutes;
  const maxStart = scheduledMinutes + round.startWindowAfterMinutes;

  const canStartRound =
    round.status === "scheduled" &&
    currentMinutes >= minStart &&
    currentMinutes <= maxStart;

  const startMessage =
    round.status !== "scheduled"
      ? "La ronda ya fue iniciada."
      : currentMinutes < minStart
        ? `Disponible más cerca del horario programado (${round.scheduledStart}).`
        : currentMinutes > maxStart
          ? "La ventana permitida para iniciar esta ronda ya expiró."
          : "La ronda está habilitada para comenzar.";

  function getCurrentTime() {
    return new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  function handleStartRound() {
    if (!canStartRound) return;

    setRound((current) =>
      current
        ? {
            ...current,
            status: "active",
            startedAt: getCurrentTime(),
          }
        : current,
    );
  }

  function handleMoveToCheckpoint(checkpointId: string) {
    setRound((current) => {
      if (!current) return current;

      const checkpoint = current.checkpoints.find(
        (cp) => cp.id === checkpointId,
      );
      if (!checkpoint) return current;

      setSimulatedPosition({
        x: checkpoint.x,
        y: checkpoint.y,
      });

      return current;
    });
  }

  function handleMoveFarAway() {
    setSimulatedPosition({ x: 8, y: 88 });
  }

  function handleToggleIncident(incident: IncidentType) {
    if (!currentCheckpoint) return;

    setRound((current) => {
      if (!current) return current;

      const updated = current.checkpoints.map((checkpoint) => {
        if (checkpoint.id !== currentCheckpoint.id) return checkpoint;

        const alreadySelected = checkpoint.incidents.includes(incident);

        return {
          ...checkpoint,
          incidents: alreadySelected
            ? checkpoint.incidents.filter((item) => item !== incident)
            : [...checkpoint.incidents, incident],
        };
      });

      return {
        ...current,
        checkpoints: updated,
      };
    });
  }

  function handleAddEvidence() {
    if (!currentCheckpoint) return;

    setRound((current) => {
      if (!current) return current;

      const updated = current.checkpoints.map((checkpoint) => {
        if (checkpoint.id !== currentCheckpoint.id) return checkpoint;

        return {
          ...checkpoint,
          evidenceCount: checkpoint.evidenceCount + 1,
        };
      });

      return {
        ...current,
        checkpoints: updated,
      };
    });
  }

  function handleMarkCheckpoint() {
    if (!currentCheckpoint || !canMarkCheckpoint) return;

    setRound((current) => {
      if (!current) return current;

      const updated: RoundCheckpoint[] = current.checkpoints.map(
        (checkpoint) => {
          if (checkpoint.id !== currentCheckpoint.id) return checkpoint;

          const updatedCheckpoint: RoundCheckpoint = {
            ...checkpoint,
            status: "completed",
            checkedAt: getCurrentTime(),
          };

          return updatedCheckpoint;
        },
      );

      return {
        ...current,
        checkpoints: updated,
      };
    });
  }

  function handleFinishRound() {
    if (!allCompleted) return;

    setRound((current) =>
      current
        ? {
            ...current,
            status: "completed",
            finishedAt: getCurrentTime(),
          }
        : current,
    );
  }

  function handleObservationsChange(value: string) {
    setRound((current) =>
      current
        ? {
            ...current,
            generalObservations: value,
          }
        : current,
    );
  }

  const total = round.checkpoints.length;
  const completed = round.checkpoints.filter(
    (cp) => cp.status === "completed",
  ).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="space-y-6 pb-44 lg:pb-24">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/guardia/rondas"
          className="inline-flex items-center gap-2 rounded-2xl border border-[#e4e4ea] bg-white px-4 py-2.5 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>

        <RoundStatusBadge status={round.status} />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-[#6D28D9]">Ejecución de ronda</p>
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#18181b]">
          {round.name}
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-[#666670]">
          Flujo operativo de recorrido con validación horaria, simulación de
          posición, checkpoints secuenciales, anomalías y cierre final.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
        <div className="grid gap-4 md:grid-cols-4">
          <InfoBox label="Horario programado" value={round.scheduledStart} />
          <InfoBox label="Inicio real" value={round.startedAt ?? "Pendiente"} />
          <InfoBox label="Fin real" value={round.finishedAt ?? "Pendiente"} />
          <InfoBox label="Progreso" value={`${progress}%`} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <RoundMapMock
            round={round}
            simulatedPosition={simulatedPosition}
            currentCheckpointId={currentCheckpoint?.id ?? null}
          />

          <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
            <p className="text-sm font-medium text-[#6D28D9]">
              Control de proximidad
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
              Verificación GPS simulada
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#666670]">
              El simulador permanece visible como una herramienta flotante
              durante toda la ejecución de la ronda, para agilizar el registro
              de checkpoints.
            </p>

            <div className="mt-4 rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-[#666670]">
                  Distancia al checkpoint actual
                </span>
                <span className="font-medium text-[#1f1f24]">
                  {distanceToCurrent !== null
                    ? `${distanceToCurrent}px`
                    : "Sin dato"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <CheckpointActionPanel
            round={round}
            currentCheckpointId={currentCheckpoint?.id ?? null}
            distanceToCurrent={distanceToCurrent}
            canMarkCheckpoint={canMarkCheckpoint}
            canStartRound={canStartRound}
            startMessage={startMessage}
            onStartRound={handleStartRound}
            onMarkCheckpoint={handleMarkCheckpoint}
            onToggleIncident={handleToggleIncident}
            onAddEvidence={handleAddEvidence}
          />

          {allCompleted && round.status !== "completed" ? (
            <RoundFinalizationPanel
              observations={round.generalObservations}
              onChangeObservations={handleObservationsChange}
              onFinish={handleFinishRound}
            />
          ) : null}

          {round.status === "completed" ? (
            <div className="rounded-[28px] border border-emerald-200 bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
              <p className="text-sm font-medium text-emerald-700">
                Ronda finalizada
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
                Recorrido cerrado
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#666670]">
                {round.generalObservations ||
                  "Sin observaciones generales registradas."}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <RoundPositionSimulatorDock
        checkpoints={round.checkpoints}
        simulatedPosition={simulatedPosition}
        currentCheckpointId={currentCheckpoint?.id ?? null}
        distanceToCurrent={distanceToCurrent}
        canMarkCheckpoint={canMarkCheckpoint}
        onMoveToCheckpoint={handleMoveToCheckpoint}
        onMoveFarAway={handleMoveFarAway}
      />
    </section>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#efeff4] bg-[#fafafe] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-[#1f1f24]">{value}</p>
    </div>
  );
}
