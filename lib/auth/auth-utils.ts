import { mockUsers } from "./mock-users";
import { SessionUser, UserRole } from "./auth-types";

export function authenticateUser(email: string, password: string): SessionUser | null {
  const normalizedEmail = email.trim().toLowerCase();

  const user = mockUsers.find(
    (item) =>
      item.email.toLowerCase() === normalizedEmail &&
      item.password === password
  );

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    propertyId: user.propertyId,
    shift: user.shift,
    status: user.status,
  };
}

export function getDefaultRouteByRole(role: UserRole): string {
  switch (role) {
    case "guard":
      return "/guardia";
    case "resident":
      return "/residentes";
    case "admin_local":
      return "/dashboard";
    case "admin_global":
      return "/dashboard";
    default:
      return "/login";
  }
}
