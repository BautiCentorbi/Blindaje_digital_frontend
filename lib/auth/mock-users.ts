import { AuthUser } from "./auth-types";

export const mockUsers: AuthUser[] = [
  {
    id: "guard-001",
    name: "Juan Pérez",
    email: "guardia@blindaje.com",
    password: "123456",
    role: "guard",
    propertyId: "prop-001",
    shift: "Guardia Nocturna",
    status: "active",
  },
  {
    id: "resident-001",
    name: "María López",
    email: "residente@blindaje.com",
    password: "123456",
    role: "resident",
    propertyId: "prop-001",
    status: "active",
  },
  {
    id: "admin-local-001",
    name: "Carlos Medina",
    email: "admin@blindaje.com",
    password: "123456",
    role: "admin_local",
    propertyId: "prop-001",
    status: "active",
  },
  {
    id: "admin-global-001",
    name: "Super Admin",
    email: "global@blindaje.com",
    password: "123456",
    role: "admin_global",
    status: "active",
  },
];