"use client";

import { Bell, Search, Menu, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function getPageTitle(pathname: string) {
  if (pathname === "/guardia") return "Panel";
  if (pathname.startsWith("/guardia/tareas")) return "Tareas";
  if (pathname.startsWith("/guardia/rondas")) return "Rondas";
  if (pathname.startsWith("/guardia/visitas")) return "Visitas";
  if (pathname.startsWith("/guardia/bitacora")) return "Bitácora";
  if (pathname.startsWith("/ajustes")) return "Ajustes";
  return "Blindaje Digital";
}

function getPageDescription(pathname: string) {
  if (pathname === "/guardia") return "Resumen operativo del turno actual.";
  if (pathname.startsWith("/guardia/tareas"))
    return "Seguimiento y gestión de tareas asignadas.";
  if (pathname.startsWith("/guardia/rondas"))
    return "Control y ejecución de rondas operativas.";
  if (pathname.startsWith("/guardia/visitas"))
    return "Validación y seguimiento de visitas.";
  if (pathname.startsWith("/guardia/bitacora"))
    return "Registro cronológico de eventos y novedades.";
  if (pathname.startsWith("/ajustes")) return "Configuración general del sistema.";
  return "Plataforma de gestión operativa.";
}

export function Topbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[#e8e8ef]/80 bg-[#f4f4f6]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e5e5ec] bg-white text-[#4e4e58] shadow-sm lg:hidden"
            aria-label="Abrir navegación"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <motion.h1
              key={pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="truncate text-2xl font-semibold tracking-[-0.03em] text-[#18181b]"
            >
              {getPageTitle(pathname)}
            </motion.h1>
            <p className="truncate text-sm text-[#666670]">
              {getPageDescription(pathname)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-[#e4e4ea] bg-white px-3 sm:flex">
            <Search className="h-4 w-4 text-[#8a8a95]" />
            <input
              type="text"
              placeholder="Buscar..."
              className="h-11 w-44 bg-transparent text-sm outline-none placeholder:text-[#9d9da7]"
            />
          </div>

          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e4e4ea] bg-white text-[#4c4c56] transition hover:border-violet-200 hover:text-[#6D28D9]"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#6D28D9]" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-3 rounded-2xl border border-[#e4e4ea] bg-white px-3 py-2.5 transition hover:border-violet-200"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-sm font-semibold text-[#6D28D9]">
              BC
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-[#212129]">Bautista</p>
              <p className="text-xs text-[#74747f]">Administrador</p>
            </div>

            <ChevronDown className="hidden h-4 w-4 text-[#8a8a95] sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}