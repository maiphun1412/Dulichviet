import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function registerWithEmail(
  email: string,
  password: string,
  phone?: string
) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const user = cred.user;

  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      email: user.email ?? email,
      phone: phone ?? "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { merge: true }
  );

  return user;
}

export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export function watchAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function getUserProfile(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}