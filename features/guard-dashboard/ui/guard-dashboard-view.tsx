import { currentShiftMock } from "@/lib/mocks/shift.mock";
import { tasksMock } from "@/lib/mocks/tasks.mock";
import { roundsMock } from "@/lib/mocks/rounds.mock";
import { visitsMock } from "@/lib/mocks/visits.mock";
import { recentActivityMock } from "@/lib/mocks/activity.mock";
import { ShiftSummaryCard } from "./shift-summary-card";
import { TasksPreviewCard } from "./tasks-preview-card";
import { RoundsPreviewCard } from "./rounds-preview-card";
import { VisitsPreviewCard } from "./visits-preview-card";
import { RecentActivityCard } from "./recent-activity-card";

export function GuardDashboardView() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-[#6D28D9]">Panel operativo</p>
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#18181b]">
          Vista general del guardia
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-[#666670]">
          Resumen del turno actual, tareas activas, estado de rondas, visitas del
          día y actividad operativa reciente.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <ShiftSummaryCard shift={currentShiftMock} />
        <RecentActivityCard items={recentActivityMock} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <TasksPreviewCard tasks={tasksMock} />
        <RoundsPreviewCard rounds={roundsMock} />
        <VisitsPreviewCard visits={visitsMock} />
      </div>
    </section>
  );
}