export type UserRole = "guard" | "resident" | "admin_local" | "admin_global";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  propertyId?: string;
  shift?: string;
  status?: "active" | "inactive";
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  propertyId?: string;
  shift?: string;
  status?: "active" | "inactive";
}