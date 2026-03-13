import Link from "next/link";
import {
  ClipboardList,
  ShieldCheck,
  UserRound,
  BookText,
  Siren,
  TriangleAlert,
} from "lucide-react";
import { currentShiftMock } from "@/lib/mocks/shift.mock";

export function GuardMobileHomeView() {
  return (
    <section className="space-y-5">
      <div className="rounded-[28px] border border-[#e7e7ee] bg-white p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#6D28D9]">Guardia activo</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181b]">
              {currentShiftMock.guardName}
            </h2>
            <p className="mt-2 text-sm text-[#666670]">
              {currentShiftMock.shiftName} · {currentShiftMock.schedule}
            </p>
            <p className="mt-1 text-sm text-[#666670]">
              {currentShiftMock.property}
            </p>
          </div>

          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
            En servicio
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MobileActionTile
          href="/guardia/tareas"
          label="Tareas"
          description="Pendientes y activas"
          icon={ClipboardList}
          featured
        />

        <MobileActionTile
          href="/guardia/rondas"
          label="Rondas"
          description="Control operativo"
          icon={ShieldCheck}
          featured
        />

        <MobileActionTile
          href="/guardia/visitas"
          label="Visitas"
          description="Validaciones"
          icon={UserRound}
        />

        <MobileActionTile
          href="/guardia/bitacora"
          label="Bitácora"
          description="Eventos recientes"
          icon={BookText}
        />

        <MobileActionTile
          href="/guardia/novedades"
          label="Novedades"
          description="Registrar evento"
          icon={TriangleAlert}
        />

        <MobileActionTile
          href="/guardia/emergencias"
          label="Emergencias"
          description="Acción rápida"
          icon={Siren}
          danger
        />
      </div>
    </section>
  );
}

type MobileActionTileProps = {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  featured?: boolean;
  danger?: boolean;
};

function MobileActionTile({
  href,
  label,
  description,
  icon: Icon,
  featured,
  danger,
}: MobileActionTileProps) {
  return (
    <Link
      href={href}
      className={[
        "rounded-[28px] border p-5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)] transition active:scale-[0.99]",
        danger
          ? "border-red-200 bg-red-50"
          : featured
          ? "border-violet-200 bg-violet-50"
          : "border-[#e7e7ee] bg-white",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-12 w-12 items-center justify-center rounded-2xl",
          danger
            ? "bg-red-100 text-red-700"
            : featured
            ? "bg-[#6D28D9] text-white"
            : "bg-[#f3f3f7] text-[#6a6a75]",
        ].join(" ")}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="mt-5">
        <p className="text-base font-semibold tracking-[-0.02em] text-[#18181b]">
          {label}
        </p>
        <p className="mt-1 text-sm leading-5 text-[#666670]">{description}</p>
      </div>
    </Link>
  );
}