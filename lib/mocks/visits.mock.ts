export type VisitStatus =
  | "pending"
  | "approved"
  | "checked_in"
  | "checked_out"
  | "rejected";

export type VisitItem = {
  id: string;
  visitorName: string;
  documentId: string;
  residentName: string;
  destination: string;
  expectedTime: string;
  horaIngreso?: string;
  horaSalida?: string;
  vehiclePlate?: string;
  notes?: string;
  status: VisitStatus;
};

export const visitsMock: VisitItem[] = [
  {
    id: "visit-001",
    visitorName: "Carlos Gómez",
    documentId: "32145678",
    residentName: "María López",
    destination: "Casa 14",
    expectedTime: "20:40",
    vehiclePlate: "AB123CD",
    notes: "Visita social",
    status: "pending",
  },
  {
    id: "visit-002",
    visitorName: "Lucía Herrera",
    documentId: "29888776",
    residentName: "Familia Torres",
    destination: "Casa 22",
    expectedTime: "21:10",
    notes: "Cena",
    status: "approved",
  },
  {
    id: "visit-003",
    visitorName: "Proveedor GasAndes",
    documentId: "30555111",
    residentName: "Casa 18",
    destination: "Casa 18",
    expectedTime: "19:55",
    horaIngreso: "20:02",
    vehiclePlate: "AE456FG",
    notes: "Mantenimiento",
    status: "checked_in",
  },
  {
    id: "visit-004",
    visitorName: "Javier Ruiz",
    documentId: "28777111",
    residentName: "Laura Díaz",
    destination: "Casa 7",
    expectedTime: "18:20",
    horaIngreso: "18:27",
    horaSalida: "19:11",
    notes: "Entrega",
    status: "checked_out",
  },
];
