import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  getActiveSessionId,
  getGuestToken,
  setActiveSessionId,
} from "./chat-session";

export type ChatSession = {
  sessionId: string;
  guestToken: string;
  title: string;
  lastMessage: string;
  createdAt: number;
  updatedAt: number;
  isClosed: boolean;
};

export type ChatMessage = {
  id?: string;
  role: "bot" | "user";
  type: "text" | "image" | "file" | "video";
  text?: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: number;
};

export async function ensureChatSession() {
  const existingSessionId = getActiveSessionId();
  const guestToken = getGuestToken();

  if (existingSessionId) {
    const sessionRef = doc(db, "chat_sessions", existingSessionId);
    const sessionSnap = await getDoc(sessionRef);

    if (sessionSnap.exists()) {
      return existingSessionId;
    }
  }

  const newSessionId = `sess_${crypto.randomUUID()}`;
  const welcomeMessage = "Xin Chào Quý Khách! Du Lịch Việt sẵn sàng hỗ trợ ạ.";

  await setDoc(doc(db, "chat_sessions", newSessionId), {
    sessionId: newSessionId,
    guestToken,
    title: "Hội thoại mới",
    lastMessage: welcomeMessage,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isClosed: false,
    createdAtServer: serverTimestamp(),
    updatedAtServer: serverTimestamp(),
  });

  await addDoc(collection(db, "chat_sessions", newSessionId, "messages"), {
    role: "bot",
    type: "text",
    text: welcomeMessage,
    createdAt: Date.now(),
    createdAtServer: serverTimestamp(),
  });

  setActiveSessionId(newSessionId);
  return newSessionId;
}

export async function getMessages(sessionId: string): Promise<ChatMessage[]> {
  const q = query(
    collection(db, "chat_sessions", sessionId, "messages"),
    orderBy("createdAt", "asc")
  );

  const snap = await getDocs(q);

  return snap.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<ChatMessage, "id">),
  }));
}

export async function sendTextMessage(sessionId: string, text: string) {
  const trimmed = text.trim();
  if (!trimmed) return;

  await addDoc(collection(db, "chat_sessions", sessionId, "messages"), {
    role: "user",
    type: "text",
    text: trimmed,
    createdAt: Date.now(),
    createdAtServer: serverTimestamp(),
  });

  await updateDoc(doc(db, "chat_sessions", sessionId), {
    lastMessage: trimmed,
    updatedAt: Date.now(),
    updatedAtServer: serverTimestamp(),
  });
}

export async function sendBotMessage(sessionId: string, text: string) {
  await addDoc(collection(db, "chat_sessions", sessionId, "messages"), {
    role: "bot",
    type: "text",
    text,
    createdAt: Date.now(),
    createdAtServer: serverTimestamp(),
  });

  await updateDoc(doc(db, "chat_sessions", sessionId), {
    lastMessage: text,
    updatedAt: Date.now(),
    updatedAtServer: serverTimestamp(),
  });
}

export async function getSessionsByGuestToken(): Promise<ChatSession[]> {
  const guestToken = getGuestToken();

  const q = query(
    collection(db, "chat_sessions"),
    where("guestToken", "==", guestToken)
  );

  const snap = await getDocs(q);

  return snap.docs
    .map((docSnap) => docSnap.data() as ChatSession)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function createNewChatSession() {
  const guestToken = getGuestToken();
  const newSessionId = `sess_${crypto.randomUUID()}`;
  const welcomeMessage = "Xin Chào Quý Khách! Du Lịch Việt sẵn sàng hỗ trợ ạ.";

  await setDoc(doc(db, "chat_sessions", newSessionId), {
    sessionId: newSessionId,
    guestToken,
    title: "Hội thoại mới",
    lastMessage: welcomeMessage,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isClosed: false,
    createdAtServer: serverTimestamp(),
    updatedAtServer: serverTimestamp(),
  });

  await addDoc(collection(db, "chat_sessions", newSessionId, "messages"), {
    role: "bot",
    type: "text",
    text: welcomeMessage,
    createdAt: Date.now(),
    createdAtServer: serverTimestamp(),
  });

  setActiveSessionId(newSessionId);
  return newSessionId;
}
