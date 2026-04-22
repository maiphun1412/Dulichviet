const CHAT_GUEST_TOKEN_KEY = "dulichviet_chat_guest_token";
const CHAT_ACTIVE_SESSION_KEY = "dulichviet_active_chat_session";

export function getGuestToken() {
  if (typeof window === "undefined") return "";

  let token = localStorage.getItem(CHAT_GUEST_TOKEN_KEY);
  if (!token) {
    token = `guest_${crypto.randomUUID()}`;
    localStorage.setItem(CHAT_GUEST_TOKEN_KEY, token);
  }
  return token;
}

export function getActiveSessionId() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(CHAT_ACTIVE_SESSION_KEY) || "";
}

export function setActiveSessionId(sessionId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAT_ACTIVE_SESSION_KEY, sessionId);
}

export function clearActiveSessionId() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHAT_ACTIVE_SESSION_KEY);
}