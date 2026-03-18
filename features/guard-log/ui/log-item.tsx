"use client";

import {
  AlertTriangle,
  BookText,
  ClipboardList,
  MapPinned,
  Radar,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type {
  GuardLogItem,
  GuardLogPriority,
  GuardLogSourceType,
} from "@/lib/mocks/log.mock";

type LogItemProps = {
  item: GuardLogItem;
  isLast: boolean;
  onOpenDetail: (itemId: string) => void;
};

const sourceConfig: Record<
  GuardLogSourceType,
  {
    icon: typeof ClipboardList;
    badgeClassName: string;
  }
> = {
  task: {
    icon: ClipboardList,
    badgeClassName: "border-sky-200 bg-sky-50 text-sky-700",
  },
  round: {
    icon: ShieldCheck,
    badgeClassName: "border-violet-200 bg-violet-50 text-violet-700",
  },
  checkpoint: {
    icon: MapPinned,
    badgeClassName: "border-amber-200 bg-amber-50 text-amber-700",
  },
  visit: {
    icon: UserRound,
    badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  detection: {
    icon: Radar,
    badgeClassName: "border-rose-200 bg-rose-50 text-rose-700",
  },
  manual_entry: {
    icon: BookText,
    badgeClassName: "border-slate-200 bg-slate-50 text-slate-700",
  },
};

const priorityConfig: Record<
  GuardLogPriority,
  {
    containerClassName: string;
    accentClassName: string;
    labelClassName: string;
    label: string;
  }
> = {
  low: {
    containerClassName: "border-l-emerald-300 hover:border-emerald-300",
    accentClassName: "bg-emerald-500",
    labelClassName: "border-emerald-200 bg-emerald-50 text-emerald-700",
    label: "Prioridad baja",
  },
  medium: {
    containerClassName: "border-l-amber-300 hover:border-amber-300",
    accentClassName: "bg-amber-500",
    labelClassName: "border-amber-200 bg-amber-50 text-amber-700",
    label: "Prioridad media",
  },
  high: {
    containerClassName: "border-l-rose-300 hover:border-rose-300",
    accentClassName: "bg-rose-500",
    labelClassName: "border-rose-200 bg-rose-50 text-rose-700",
    label: "Prioridad alta",
  },
};

export function LogItem({ item, isLast, onOpenDetail }: LogItemProps) {
  const config = sourceConfig[item.sourceType];
  const priority = priorityConfig[item.priority];
  const Icon = config.icon;

  return (
    <article className="relative pl-8">
      {!isLast ? (
        <div className="absolute left-[11px] top-9 h-[calc(100%+0.75rem)] w-px bg-[#e7e7ee]" />
      ) : null}

      <div className="absolute left-0 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-[#6D28D9]">
        <Icon className="h-3.5 w-3.5" />
      </div>

      <div
        className={[
          "rounded-[24px] border border-[#ececf3] border-l-4 bg-[#fcfcfe] p-4 transition",
          priority.containerClassName,
        ].join(" ")}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={[
                  "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em]",
                  config.badgeClassName,
                ].join(" ")}
              >
                {item.sourceLabel}
              </span>
              <span
                className={[
                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em]",
                  priority.labelClassName,
                ].join(" ")}
              >
                <AlertTriangle className="h-3 w-3" />
                {priority.label}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#8b8b97]">
                {item.timeLabel}
              </span>
              <span className="text-xs text-[#8b8b97]">{item.reference}</span>
            </div>

            <div>
              <h3 className="text-base font-semibold tracking-[-0.02em] text-[#18181b]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#666670]">
                {item.summary}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenDetail(item.id)}
            className="inline-flex items-center justify-center rounded-2xl border border-[#dddde6] bg-white px-3 py-2 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
          >
            Ver detalle
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <CompactMeta accentClassName={priority.accentClassName} label={item.statusLabel} />
          <CompactMeta label={item.location} />
          <CompactMeta label={item.actor} />
        </div>
      </div>
    </article>
  );
}

function CompactMeta({
  accentClassName,
  label,
}: {
  accentClassName?: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#e7e7ee] bg-white px-3 py-1 text-xs text-[#666670]">
      {accentClassName ? (
        <span className={["h-2 w-2 rounded-full", accentClassName].join(" ")} />
      ) : null}
      {label}
    </span>
  );
}
