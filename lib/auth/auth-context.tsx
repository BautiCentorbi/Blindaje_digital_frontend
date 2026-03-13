"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SessionUser } from "./auth-types";
import { authenticateUser } from "./auth-utils";
import { clearSession, getSession, saveSession } from "./auth-storage";

interface AuthContextValue {
  user: SessionUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<SessionUser | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    setUser(session);
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const authenticatedUser = authenticateUser(email, password);

    if (!authenticatedUser) {
      return null;
    }

    saveSession(authenticatedUser);
    setUser(authenticatedUser);

    return authenticatedUser;
  }

  function logout() {
    clearSession();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading]
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