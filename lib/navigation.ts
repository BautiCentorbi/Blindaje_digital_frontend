import {
  LayoutDashboard,
  ClipboardList,
  ShieldCheck,
  UserRound,
  BookText,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    label: "Panel",
    href: "/guardia",
    icon: LayoutDashboard,
  },
  {
    label: "Tareas",
    href: "/guardia/tareas",
    icon: ClipboardList,
  },
  {
    label: "Rondas",
    href: "/guardia/rondas",
    icon: ShieldCheck,
  },
  {
    label: "Visitas",
    href: "/guardia/visitas",
    icon: UserRound,
  },
  {
    label: "Bitácora",
    href: "/guardia/bitacora",
    icon: BookText,
  },
  {
    label: "Ajustes",
    href: "/ajustes",
    icon: Settings,
  },
];