import { SessionUser } from "./auth-types";

const SESSION_KEY = "blindaje-digital-session";
const SESSION_EVENT = "blindaje-digital-session-change";
let cachedSessionRaw: string | null | undefined;
let cachedSessionValue: SessionUser | null = null;

function notifySessionChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function saveSession(user: SessionUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  notifySessionChange();
}

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(SESSION_KEY);

  if (raw === cachedSessionRaw) {
    return cachedSessionValue;
  }

  if (!raw) {
    cachedSessionRaw = raw;
    cachedSessionValue = null;
    return null;
  }

  try {
    cachedSessionRaw = raw;
    cachedSessionValue = JSON.parse(raw) as SessionUser;
    return cachedSessionValue;
  } catch {
    cachedSessionRaw = raw;
    cachedSessionValue = null;
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  notifySessionChange();
}

export function subscribeToSessionChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === SESSION_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(SESSION_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(SESSION_EVENT, callback);
  };
}
