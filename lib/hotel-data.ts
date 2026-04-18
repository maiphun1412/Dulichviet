import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export type HotelRoom = {
  id: string;
  name: string;
  shortName?: string;
  image: string;
  areaText: string;
  bedText: string;
  guestText: string;
  childPolicyText?: string;
  priceLabel: string;
  prices: {
    bb?: string;
    bbvs?: string;
    fb?: string;
    fbvs?: string;
  };
};

export type HotelPolicyRow = {
  label: string;
  bb?: string;
  bbvs?: string;
  fb?: string;
  fbvs?: string;
};

export type HotelRelatedItem = {
  id: string;
  name: string;
  image: string;
  priceFrom: string;
  stars: number;
};

export type HotelItem = {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  address: string;
  thumbnail: string;
  heroImages: string[];
  stars: number;
  ratingText: string;
  ratingScore: number;
  reviewCount: number;
  soldCount?: number;
  tagLine?: string;
  locationText: string;
  roomTypeText: string;
  mealPlanText?: string;
  freebies?: string[];
  priceFrom: string;
  contactText?: string;
  categoryTags: string[];
  searchKeywords: string[];
  isFeatured: boolean;
  isPromotion: boolean;
  shortDescription: string;
  overviewHtml: string;
  hotelDetailHtml: string;
  policyNotesHtml: string;
  noteHtml: string;
  amenities: string[];
  tabs: {
    overview: string;
    detail: string;
    policy: string;
    note: string;
  };
  rooms: HotelRoom[];
  extraGuestPolicy: {
    appliedFrom: string;
    appliedTo: string;
    rows: HotelPolicyRow[];
  };
  checkInOutPolicy: string[];
  cancelPolicy: string[];
  otherPolicy: string[];
  relatedHotels: HotelRelatedItem[];
  active: boolean;
  createdAt: number;
  updatedAt: number;
};

function mapHotel(docId: string, data: Record<string, unknown>): HotelItem {
  return {
    id: docId,
    slug: String(data.slug ?? ""),
    name: String(data.name ?? ""),
    city: String(data.city ?? ""),
    country: String(data.country ?? ""),
    address: String(data.address ?? ""),
    thumbnail: String(data.thumbnail ?? ""),
    heroImages: Array.isArray(data.heroImages)
      ? data.heroImages.map((item) => String(item))
      : [],
    stars: Number(data.stars ?? 0),
    ratingText: String(data.ratingText ?? ""),
    ratingScore: Number(data.ratingScore ?? 0),
    reviewCount: Number(data.reviewCount ?? 0),
    soldCount: data.soldCount !== undefined ? Number(data.soldCount) : undefined,
    tagLine: data.tagLine ? String(data.tagLine) : undefined,
    locationText: String(data.locationText ?? ""),
    roomTypeText: String(data.roomTypeText ?? ""),
    mealPlanText: data.mealPlanText ? String(data.mealPlanText) : undefined,
    freebies: Array.isArray(data.freebies)
      ? data.freebies.map((item) => String(item))
      : [],
    priceFrom: String(data.priceFrom ?? "0"),
    contactText: data.contactText ? String(data.contactText) : undefined,
    categoryTags: Array.isArray(data.categoryTags)
      ? data.categoryTags.map((item) => String(item))
      : [],
    searchKeywords: Array.isArray(data.searchKeywords)
      ? data.searchKeywords.map((item) => String(item))
      : [],
    isFeatured: Boolean(data.isFeatured ?? false),
    isPromotion: Boolean(data.isPromotion ?? false),
    shortDescription: String(data.shortDescription ?? ""),
    overviewHtml: String(data.overviewHtml ?? ""),
    hotelDetailHtml: String(data.hotelDetailHtml ?? ""),
    policyNotesHtml: String(data.policyNotesHtml ?? ""),
    noteHtml: String(data.noteHtml ?? ""),
    amenities: Array.isArray(data.amenities)
      ? data.amenities.map((item) => String(item))
      : [],
    tabs:
      typeof data.tabs === "object" && data.tabs !== null
        ? {
            overview: String((data.tabs as Record<string, unknown>).overview ?? "TỔNG QUAN"),
            detail: String((data.tabs as Record<string, unknown>).detail ?? "CHI TIẾT KHÁCH SẠN"),
            policy: String((data.tabs as Record<string, unknown>).policy ?? "CHÍNH SÁCH"),
            note: String((data.tabs as Record<string, unknown>).note ?? "GHI CHÚ"),
          }
        : {
            overview: "TỔNG QUAN",
            detail: "CHI TIẾT KHÁCH SẠN",
            policy: "CHÍNH SÁCH",
            note: "GHI CHÚ",
          },
    rooms: Array.isArray(data.rooms)
      ? data.rooms.map((room) => {
          const value = room as Record<string, unknown>;
          return {
            id: String(value.id ?? ""),
            name: String(value.name ?? ""),
            shortName: value.shortName ? String(value.shortName) : undefined,
            image: String(value.image ?? ""),
            areaText: String(value.areaText ?? ""),
            bedText: String(value.bedText ?? ""),
            guestText: String(value.guestText ?? ""),
            childPolicyText: value.childPolicyText
              ? String(value.childPolicyText)
              : undefined,
            priceLabel: String(value.priceLabel ?? ""),
            prices:
              typeof value.prices === "object" && value.prices !== null
                ? {
                    bb: (value.prices as Record<string, unknown>).bb
                      ? String((value.prices as Record<string, unknown>).bb)
                      : undefined,
                    bbvs: (value.prices as Record<string, unknown>).bbvs
                      ? String((value.prices as Record<string, unknown>).bbvs)
                      : undefined,
                    fb: (value.prices as Record<string, unknown>).fb
                      ? String((value.prices as Record<string, unknown>).fb)
                      : undefined,
                    fbvs: (value.prices as Record<string, unknown>).fbvs
                      ? String((value.prices as Record<string, unknown>).fbvs)
                      : undefined,
                  }
                : {},
          };
        })
      : [],
    extraGuestPolicy:
      typeof data.extraGuestPolicy === "object" && data.extraGuestPolicy !== null
        ? {
            appliedFrom: String(
              (data.extraGuestPolicy as Record<string, unknown>).appliedFrom ?? ""
            ),
            appliedTo: String(
              (data.extraGuestPolicy as Record<string, unknown>).appliedTo ?? ""
            ),
            rows: Array.isArray(
              (data.extraGuestPolicy as Record<string, unknown>).rows
            )
              ? ((data.extraGuestPolicy as Record<string, unknown>).rows as unknown[]).map(
                  (row) => {
                    const value = row as Record<string, unknown>;
                    return {
                      label: String(value.label ?? ""),
                      bb: value.bb ? String(value.bb) : undefined,
                      bbvs: value.bbvs ? String(value.bbvs) : undefined,
                      fb: value.fb ? String(value.fb) : undefined,
                      fbvs: value.fbvs ? String(value.fbvs) : undefined,
                    };
                  }
                )
              : [],
          }
        : {
            appliedFrom: "",
            appliedTo: "",
            rows: [],
          },
    checkInOutPolicy: Array.isArray(data.checkInOutPolicy)
      ? data.checkInOutPolicy.map((item) => String(item))
      : [],
    cancelPolicy: Array.isArray(data.cancelPolicy)
      ? data.cancelPolicy.map((item) => String(item))
      : [],
    otherPolicy: Array.isArray(data.otherPolicy)
      ? data.otherPolicy.map((item) => String(item))
      : [],
    relatedHotels: Array.isArray(data.relatedHotels)
      ? data.relatedHotels.map((item) => {
          const value = item as Record<string, unknown>;
          return {
            id: String(value.id ?? ""),
            name: String(value.name ?? ""),
            image: String(value.image ?? ""),
            priceFrom: String(value.priceFrom ?? "0"),
            stars: Number(value.stars ?? 0),
          };
        })
      : [],
    active: Boolean(data.active ?? true),
    createdAt: Number(data.createdAt ?? 0),
    updatedAt: Number(data.updatedAt ?? 0),
  };
}

export async function getAllHotels() {
  try {
    const snapshot = await getDocs(collection(db, "hotel_items"));

    const items: HotelItem[] = snapshot.docs.map((docSnap) =>
      mapHotel(docSnap.id, docSnap.data())
    );

    return items.sort((a, b) => Number(a.priceFrom) - Number(b.priceFrom));
  } catch (error) {
    console.error("Lỗi getAllHotels:", error);
    return [];
  }
}

export async function getFeaturedHotels() {
  try {
    const q = query(
      collection(db, "hotel_items"),
      where("active", "==", true),
      where("isFeatured", "==", true)
    );

    const snapshot = await getDocs(q);

    const items: HotelItem[] = snapshot.docs.map((docSnap) =>
      mapHotel(docSnap.id, docSnap.data())
    );

    return items.sort((a, b) => Number(a.priceFrom) - Number(b.priceFrom));
  } catch (error) {
    console.error("Lỗi getFeaturedHotels:", error);
    return [];
  }
}

export async function getPromotionHotels() {
  try {
    const q = query(
      collection(db, "hotel_items"),
      where("active", "==", true),
      where("isPromotion", "==", true)
    );

    const snapshot = await getDocs(q);

    const items: HotelItem[] = snapshot.docs.map((docSnap) =>
      mapHotel(docSnap.id, docSnap.data())
    );

    return items.sort((a, b) => Number(a.priceFrom) - Number(b.priceFrom));
  } catch (error) {
    console.error("Lỗi getPromotionHotels:", error);
    return [];
  }
}

export async function getHotelsByCity(city: string) {
  try {
    const q = query(
      collection(db, "hotel_items"),
      where("active", "==", true),
      where("city", "==", city)
    );

    const snapshot = await getDocs(q);

    const items: HotelItem[] = snapshot.docs.map((docSnap) =>
      mapHotel(docSnap.id, docSnap.data())
    );

    return items.sort((a, b) => Number(a.priceFrom) - Number(b.priceFrom));
  } catch (error) {
    console.error("Lỗi getHotelsByCity:", error);
    return [];
  }
}

export async function getHotelBySlug(slug: string) {
  try {
    const q = query(collection(db, "hotel_items"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    return mapHotel(docSnap.id, docSnap.data());
  } catch (error) {
    console.error("Lỗi getHotelBySlug:", error);
    return null;
  }
}

export async function getHotelById(id: string) {
  try {
    const docRef = doc(db, "hotel_items", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return mapHotel(snapshot.id, snapshot.data() as Record<string, unknown>);
  } catch (error) {
    console.error("Lỗi getHotelById:", error);
    return null;
  }
}

export function formatHotelPrice(price: string | number) {
  const value = typeof price === "string" ? Number(price) : price;
  return `${value.toLocaleString("vi-VN")} VNĐ`;
}

export function renderStars(count: number) {
  return "★".repeat(count);
}