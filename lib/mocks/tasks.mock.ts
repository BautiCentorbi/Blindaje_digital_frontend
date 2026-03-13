export const tasksMock = [
  {
    id: "task-001",
    title: "Verificar portón norte",
    location: "Acceso Norte",
    priority: "high" as "high" | "medium" | "low",
    status: "pending" as "pending" | "in_progress" | "completed",
    dueTime: "20:30",
  },
  {
    id: "task-002",
    title: "Registrar relevo de proveedor",
    location: "Ingreso de servicios",
    priority: "medium" as "high" | "medium" | "low",
    status: "in_progress" as "pending" | "in_progress" | "completed",
    dueTime: "21:00",
  },
  {
    id: "task-003",
    title: "Control de iluminación perimetral",
    location: "Perímetro Este",
    priority: "low" as "high" | "medium" | "low",
    status: "pending" as "pending" | "in_progress" | "completed",
    dueTime: "22:15",
  },
];