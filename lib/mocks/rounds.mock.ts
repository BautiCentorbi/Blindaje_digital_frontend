export type CheckpointStatus = "pending" | "completed";
export type RoundStatus = "scheduled" | "active" | "completed";

export type IncidentType =
  | "lighting_issue"
  | "open_access"
  | "unknown_person"
  | "suspicious_vehicle"
  | "camera_offline"
  | "obstruction"
  | "other";

export type RoundCheckpoint = {
  id: string;
  name: string;
  status: CheckpointStatus;
  checkedAt: string | null;
  x: number;
  y: number;
  incidents: IncidentType[];
  evidenceCount: number;
};

export type RoundItem = {
  id: string;
  name: string;
  status: RoundStatus;
  scheduledStart: string;
  startWindowBeforeMinutes: number;
  startWindowAfterMinutes: number;
  startedAt: string | null;
  finishedAt: string | null;
  generalObservations: string;
  checkpoints: RoundCheckpoint[];
};

export const roundsMock: RoundItem[] = [
  {
    id: "round-001",
    name: "Ronda perimetral nocturna",
    status: "active",
    scheduledStart: "20:00",
    startWindowBeforeMinutes: 10,
    startWindowAfterMinutes: 25,
    startedAt: "20:12",
    finishedAt: null,
    generalObservations: "",
    checkpoints: [
      {
        id: "cp-001",
        name: "Acceso Norte",
        status: "completed",
        checkedAt: "20:14",
        x: 18,
        y: 20,
        incidents: [],
        evidenceCount: 0,
      },
      {
        id: "cp-002",
        name: "Garita Oeste",
        status: "completed",
        checkedAt: "20:18",
        x: 28,
        y: 56,
        incidents: ["lighting_issue"],
        evidenceCount: 1,
      },
      {
        id: "cp-003",
        name: "Perímetro Sur",
        status: "pending",
        checkedAt: null,
        x: 56,
        y: 78,
        incidents: [],
        evidenceCount: 0,
      },
      {
        id: "cp-004",
        name: "Garita Este",
        status: "pending",
        checkedAt: null,
        x: 78,
        y: 34,
        incidents: [],
        evidenceCount: 0,
      },
    ],
  },
  {
    id: "round-002",
    name: "Ronda interior sector B",
    status: "scheduled",
    scheduledStart: "21:30",
    startWindowBeforeMinutes: 10,
    startWindowAfterMinutes: 20,
    startedAt: null,
    finishedAt: null,
    generalObservations: "",
    checkpoints: [
      {
        id: "cp-005",
        name: "Pasillo central",
        status: "pending",
        checkedAt: null,
        x: 20,
        y: 24,
        incidents: [],
        evidenceCount: 0,
      },
      {
        id: "cp-006",
        name: "SUM",
        status: "pending",
        checkedAt: null,
        x: 46,
        y: 48,
        incidents: [],
        evidenceCount: 0,
      },
      {
        id: "cp-007",
        name: "Cocheras",
        status: "pending",
        checkedAt: null,
        x: 74,
        y: 70,
        incidents: [],
        evidenceCount: 0,
      },
    ],
  },
  {
    id: "round-003",
    name: "Ronda administrativa de cierre",
    status: "completed",
    scheduledStart: "19:00",
    startWindowBeforeMinutes: 10,
    startWindowAfterMinutes: 20,
    startedAt: "19:10",
    finishedAt: "19:32",
    generalObservations: "Cierre sin novedades críticas.",
    checkpoints: [
      {
        id: "cp-008",
        name: "Administración",
        status: "completed",
        checkedAt: "19:15",
        x: 24,
        y: 18,
        incidents: [],
        evidenceCount: 0,
      },
      {
        id: "cp-009",
        name: "Depósito",
        status: "completed",
        checkedAt: "19:22",
        x: 52,
        y: 42,
        incidents: [],
        evidenceCount: 0,
      },
      {
        id: "cp-010",
        name: "Ingreso de servicios",
        status: "completed",
        checkedAt: "19:30",
        x: 78,
        y: 66,
        incidents: [],
        evidenceCount: 0,
      },
    ],
  },
];
