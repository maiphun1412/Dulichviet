import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export type TourItem = {
  id: string;
  slug: string;
  title: string;
  image: string;
  departure: string;
  duration: string;
  date: string;
  seats: number;
  price: string;
  countdown: string;
  section: string;
  serviceType?: string;
  active: boolean;
};

export type ItineraryDay = {
  day: string;
  title: string;
  meals: string;
  content: string;
};

export type DepartureItem = {
  id: number;
  date: string;
  airline: string;
  price: string;
  seats: string;
  status: "Liên hệ" | "Book";
};

export type RelatedTour = {
  id: number;
  title: string;
  image: string;
  departure: string;
  slug?: string;
};

export type TourDetail = TourItem & {
  code: string;
  departureDates: string;
  transport: string;
  startFrom: string;
  overviewText: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  notes: string[];
  departures: DepartureItem[];
  relatedTours: RelatedTour[];
  itinerary: ItineraryDay[];
};

export async function getToursBySection(section: string): Promise<TourItem[]> {
  try {
    const q = query(
      collection(db, "tours"),
      where("section", "==", section),
      where("active", "==", true)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        slug: String(data.slug ?? docSnap.id),
        title: String(data.title ?? ""),
        image: String(data.image ?? data.picture ?? ""),
        departure: String(data.departure ?? ""),
        duration: String(data.duration ?? ""),
        date: String(data.date ?? ""),
        seats: Number(data.seats ?? 0),
        price: String(data.price ?? ""),
        countdown: String(data.countdown ?? ""),
        section: String(data.section ?? ""),
        serviceType: String(data.serviceType ?? ""),
        active: Boolean(data.active ?? false),
      };
    });
  } catch (error) {
    console.error("Lỗi lấy tours:", error);
    return [];
  }
}

export async function getTourBySlug(slug: string): Promise<TourDetail | null> {
  try {
    const q = query(collection(db, "tours"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    const data = docSnap.data();

    return {
      id: docSnap.id,
      slug: String(data.slug ?? docSnap.id),
      title: String(data.title ?? ""),
      image: String(data.image ?? data.picture ?? ""),
      departure: String(data.departure ?? ""),
      duration: String(data.duration ?? ""),
      date: String(data.date ?? ""),
      seats: Number(data.seats ?? 0),
      price: String(data.price ?? ""),
      countdown: String(data.countdown ?? ""),
      section: String(data.section ?? ""),
      serviceType: String(data.serviceType ?? ""),
      active: Boolean(data.active ?? false),

      code: String(data.code ?? ""),
      departureDates: String(data.departureDates ?? ""),
      transport: String(data.transport ?? ""),
      startFrom: String(data.startFrom ?? data.departure ?? ""),
      overviewText: String(data.overviewText ?? ""),

      highlights: Array.isArray(data.highlights)
        ? data.highlights.map(String)
        : [],

      includes: Array.isArray(data.includes)
        ? data.includes.map(String)
        : [],

      excludes: Array.isArray(data.excludes)
        ? data.excludes.map(String)
        : [],

      notes: Array.isArray(data.notes)
        ? data.notes.map(String)
        : [],

      departures: Array.isArray(data.departures)
        ? data.departures.map((item) => ({
            id: Number(item?.id ?? 0),
            date: String(item?.date ?? ""),
            airline: String(item?.airline ?? ""),
            price: String(item?.price ?? ""),
            seats: String(item?.seats ?? ""),
            status: item?.status === "Liên hệ" ? "Liên hệ" : "Book",
          }))
        : [],

      relatedTours: Array.isArray(data.relatedTours)
        ? data.relatedTours.map((item) => ({
            id: Number(item?.id ?? 0),
            title: String(item?.title ?? ""),
            image: String(item?.image ?? ""),
            departure: String(item?.departure ?? ""),
            slug: item?.slug ? String(item.slug) : undefined,
          }))
        : [],

      itinerary: Array.isArray(data.itinerary)
        ? data.itinerary.map((item) => ({
            day: String(item?.day ?? ""),
            title: String(item?.title ?? ""),
            meals: String(item?.meals ?? ""),
            content: String(item?.content ?? ""),
          }))
        : [],
    };
  } catch (error) {
    console.error("Lỗi lấy tour theo slug:", error);
    return null;
  }
}

export async function getToursBySectionAndService(
  section: string,
  serviceType?: string
): Promise<TourItem[]> {
  try {
    const q = serviceType
      ? query(
          collection(db, "tours"),
          where("section", "==", section),
          where("serviceType", "==", serviceType),
          where("active", "==", true)
        )
      : query(
          collection(db, "tours"),
          where("section", "==", section),
          where("active", "==", true)
        );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        slug: String(data.slug ?? docSnap.id),
        title: String(data.title ?? ""),
        image: String(data.image ?? data.picture ?? ""),
        departure: String(data.departure ?? ""),
        duration: String(data.duration ?? ""),
        date: String(data.date ?? ""),
        seats: Number(data.seats ?? 0),
        price: String(data.price ?? ""),
        countdown: String(data.countdown ?? ""),
        section: String(data.section ?? ""),
        serviceType: String(data.serviceType ?? ""),
        active: Boolean(data.active ?? false),
      };
    });
  } catch (error) {
    console.error("Lỗi lấy tours theo section + service:", error);
    return [];
  }
}