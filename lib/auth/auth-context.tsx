"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { SessionUser } from "./auth-types";
import { authenticateUser } from "./auth-utils";
import {
  clearSession,
  getSession,
  saveSession,
  subscribeToSessionChange,
} from "./auth-storage";

interface AuthContextValue {
  user: SessionUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<SessionUser | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function subscribeToHydrationState() {
  return () => {};
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(
    subscribeToSessionChange,
    getSession,
    () => null,
  );
  const isHydrated = useSyncExternalStore(
    subscribeToHydrationState,
    () => true,
    () => false,
  );
  const isLoading = !isHydrated;

  async function login(email: string, password: string) {
    const authenticatedUser = authenticateUser(email, password);

    if (!authenticatedUser) {
      return null;
    }

    saveSession(authenticatedUser);
    return authenticatedUser;
  }

  function logout() {
    clearSession();
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}

