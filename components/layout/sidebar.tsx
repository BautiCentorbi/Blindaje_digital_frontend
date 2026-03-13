"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { navigation } from "@/lib/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <aside className="hidden h-screen overflow-hidden border-r border-[#e7e7ee] bg-white lg:sticky lg:top-0 lg:flex lg:flex-col">
      {" "}
      <div className="flex h-20 items-center border-b border-[#eeeeF4] px-6">
        <Link href="/guardia" className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex items-center gap-"
          >
            <div className="flex h-24 w-24 items-center justify-center">
              <Image
                src="/logos/BDigital-Logo_Symbol-Purple.webp"
                width={540}
                height={540}
                alt="Logo"
                className="w-14 h-14"
              />
            </div>

            <div>
              <Image
                src="/logos/BDigital-Logo_Text.webp"
                width={540}
                height={540}
                alt="Logo"
                className="h-14 w-auto"
              />
            </div>
          </motion.div>
        </Link>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5">
        {" "}
        <div className="mb-3 px-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8b8b97]">
            Navegación
          </p>
        </div>
        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative block rounded-2xl"
              >
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.18 }}
                  className={[
                    "flex items-center justify-between rounded-2xl px-3 py-3 transition",
                    isActive
                      ? "bg-violet-50 text-[#1f1f24]"
                      : "text-[#5f5f69] hover:bg-[#f7f7fa] hover:text-[#1f1f24]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "flex h-10 w-10 items-center justify-center rounded-xl transition",
                        isActive
                          ? "bg-[#6D28D9] text-white shadow-md shadow-violet-500/20"
                          : "bg-[#f3f3f7] text-[#6a6a75]",
                      ].join(" ")}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <span className="text-sm font-medium">{item.label}</span>
                  </div>

                  <ChevronRight
                    className={[
                      "h-4 w-4 transition",
                      isActive
                        ? "translate-x-0 text-[#6D28D9]"
                        : "text-[#a1a1ac]",
                    ].join(" ")}
                  />
                </motion.div>

                {isActive ? (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-2 h-[calc(100%-16px)] w-1 rounded-full bg-[#6D28D9]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-[#eeeeF4] p-4">
        <div className="rounded-3xl bg-[#fafafe] p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8d8d98]">
            Sesión actual
          </p>

          <p className="mt-2 text-sm font-medium text-[#202028]">
            {user?.name ?? "Usuario"}
          </p>

          <p className="mt-1 text-sm text-[#676772]">
            {user?.shift ?? "Sin turno asignado"}
          </p>

          <div className="mt-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            {user?.status === "active" ? "En servicio" : "Inactivo"}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#e4e4ea] bg-white px-3 py-2.5 text-sm font-medium text-[#4f4f59] transition hover:border-violet-200 hover:text-[#6D28D9]"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  );
}
