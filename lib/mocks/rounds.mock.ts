export const roundsMock = [
  {
    id: "round-001",
    name: "Ronda perimetral nocturna",
    status: "active" as "scheduled" | "active" | "completed",
    completedPoints: 4,
    totalPoints: 8,
    nextCheckpoint: "Garita Este",
    startedAt: "20:12",
  },
  {
    id: "round-002",
    name: "Ronda interior sector B",
    status: "scheduled" as "scheduled" | "active" | "completed",
    completedPoints: 0,
    totalPoints: 5,
    nextCheckpoint: "Inicio pendiente",
    startedAt: "-",
  },
];