import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export type CartItem = {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  slug?: string;
  brand?: string;
  oldPrice?: number;
  color?: string;
  size?: string;
};

type CartDoc = {
  id: string;
  ownerType: "user" | "guest";
  ownerId: string;
  items: CartItem[];
  createdAt: number;
  updatedAt: number;
};

const GUEST_TOKEN_KEY = "dulichviet_guest_token";

function emitCartUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart-updated"));
  }
}

export function getGuestToken() {
  if (typeof window === "undefined") return "";

  let token = localStorage.getItem(GUEST_TOKEN_KEY);

  if (!token) {
    token = `guest_${crypto.randomUUID()}`;
    localStorage.setItem(GUEST_TOKEN_KEY, token);
  }

  return token;
}

export function getCartId(userUid?: string | null) {
  if (userUid) return `user_${userUid}`;
  return getGuestToken();
}

export async function ensureCartExists(userUid?: string | null) {
  const cartId = getCartId(userUid);
  const ref = doc(db, "carts", cartId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const payload: CartDoc = {
      id: cartId,
      ownerType: userUid ? "user" : "guest",
      ownerId: userUid ?? cartId,
      items: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await setDoc(ref, payload);
  }

  return cartId;
}

export async function getCart(userUid?: string | null): Promise<CartItem[]> {
  const cartId = getCartId(userUid);
  const ref = doc(db, "carts", cartId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      id: cartId,
      ownerType: userUid ? "user" : "guest",
      ownerId: userUid ?? cartId,
      items: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return [];
  }

  const data = snap.data();
  return Array.isArray(data.items) ? data.items : [];
}

export async function addToCart(item: CartItem, userUid?: string | null) {
  const cartId = getCartId(userUid);
  const ref = doc(db, "carts", cartId);
  const snap = await getDoc(ref);

  let items: CartItem[] = [];

  if (snap.exists()) {
    items = Array.isArray(snap.data().items) ? snap.data().items : [];
  }

  const foundIndex = items.findIndex((x) => x.productId === item.productId);

  if (foundIndex >= 0) {
    items[foundIndex] = {
      ...items[foundIndex],
      quantity: items[foundIndex].quantity + item.quantity,
    };
  } else {
    items.push(item);
  }
console.log("ADD TO CART =>", {
  cartId,
  userUid,
  item,
  items,
});
  await setDoc(
    ref,
    {
      id: cartId,
      ownerType: userUid ? "user" : "guest",
      ownerId: userUid ?? cartId,
      items,
      updatedAt: Date.now(),
      createdAt: snap.exists()
        ? snap.data().createdAt ?? Date.now()
        : Date.now(),
    },
    { merge: true }
  );
console.log("CART SAVED:", cartId);
  emitCartUpdated();
  return items;
}

export async function updateCartItems(
  items: CartItem[],
  userUid?: string | null
) {
  const cartId = getCartId(userUid);
  const ref = doc(db, "carts", cartId);

  await setDoc(
    ref,
    {
      id: cartId,
      ownerType: userUid ? "user" : "guest",
      ownerId: userUid ?? cartId,
      items,
      updatedAt: Date.now(),
    },
    { merge: true }
  );

  emitCartUpdated();
}

export async function getCartCount(userUid?: string | null) {
  const items = await getCart(userUid);
  return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
}

export async function mergeGuestCartToUser(userUid: string) {
  const guestCartId = getGuestToken();

  if (!guestCartId) return [];

  const userCartId = `user_${userUid}`;

  if (guestCartId === userCartId) {
    return getCart(userUid);
  }

  const guestRef = doc(db, "carts", guestCartId);
  const userRef = doc(db, "carts", userCartId);

  const [guestSnap, userSnap] = await Promise.all([
    getDoc(guestRef),
    getDoc(userRef),
  ]);

  const guestItems: CartItem[] =
    guestSnap.exists() && Array.isArray(guestSnap.data().items)
      ? guestSnap.data().items
      : [];

  const userItems: CartItem[] =
    userSnap.exists() && Array.isArray(userSnap.data().items)
      ? userSnap.data().items
      : [];

  if (guestItems.length === 0 && userSnap.exists()) {
    return userItems;
  }

  const merged = [...userItems];

  guestItems.forEach((guestItem) => {
    const idx = merged.findIndex((x) => x.productId === guestItem.productId);

    if (idx >= 0) {
      merged[idx] = {
        ...merged[idx],
        quantity: merged[idx].quantity + guestItem.quantity,
      };
    } else {
      merged.push(guestItem);
    }
  });

  await setDoc(
    userRef,
    {
      id: userCartId,
      ownerType: "user",
      ownerId: userUid,
      items: merged,
      updatedAt: Date.now(),
      createdAt: userSnap.exists()
        ? userSnap.data().createdAt ?? Date.now()
        : Date.now(),
    },
    { merge: true }
  );

  if (guestSnap.exists()) {
    await updateDoc(guestRef, {
      items: [],
      updatedAt: Date.now(),
    });
  }

  emitCartUpdated();
  return merged;
}