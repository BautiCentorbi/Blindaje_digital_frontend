export const visitsMock = [
  {
    id: "visit-001",
    visitorName: "Carlos Gómez",
    residentName: "María López",
    status: "pending" as "pending" | "approved" | "checked_in",
    expectedTime: "20:40",
  },
  {
    id: "visit-002",
    visitorName: "Lucía Herrera",
    residentName: "Familia Torres",
    status: "approved" as "pending" | "approved" | "checked_in",
    expectedTime: "21:10",
  },
  {
    id: "visit-003",
    visitorName: "Proveedor GasAndes",
    residentName: "Casa 18",
    status: "checked_in" as "pending" | "approved" | "checked_in",
    expectedTime: "19:55",
  },
];