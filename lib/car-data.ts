import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type CarSpec = {
  brand: string;
  model: string;
  seats: number;
  year: string;
  colors: string[];
  priceFrom: string;
};

export type CarPriceRow = {
  label: string;
  price: string;
};

export type CarServicePage = {
  id: string;
  slug: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  introHtml: string;
  bookingTitle: string;
  bookingNote: string;
  vehicleCollectionHtml: string;
  active: boolean;
  updatedAt?: string;
};

export type CarPostItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  brand: string;
  seats: number;
  year: string;
  thumbnail: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  viewCount: number;
  excerpt: string;
  shortDescription: string;
  specs: CarSpec;
  detailHtml: string;
  priceTableHtml: string;
  isHot: boolean;
  showOnHome: boolean;
  sortOrder: number;
  active: boolean;
};

function mapCarServicePage(data: any): CarServicePage {
  return {
    id: data?.id || "main",
    slug: data?.slug || "xe-du-lich",
    title: data?.title || "Xe du lịch",
    heroTitle: data?.heroTitle || "",
    heroSubtitle: data?.heroSubtitle || "",
    heroImage: data?.heroImage || "",
    introHtml: data?.introHtml || "",
    bookingTitle: data?.bookingTitle || "Thuê xe trực tuyến",
    bookingNote: data?.bookingNote || "",
    vehicleCollectionHtml: data?.vehicleCollectionHtml || "",
    active: Boolean(data?.active),
    updatedAt: data?.updatedAt || "",
  };
}

function mapCarPost(id: string, data: any): CarPostItem {
  return {
    id,
    slug: data?.slug || id,
    title: data?.title || "",
    category: data?.category || "",
    brand: data?.brand || "",
    seats: Number(data?.seats || 0),
    year: data?.year || "",
    thumbnail: data?.thumbnail || "",
    gallery: Array.isArray(data?.gallery) ? data.gallery : [],
    rating: Number(data?.rating || 0),
    reviewCount: Number(data?.reviewCount || 0),
    viewCount: Number(data?.viewCount || 0),
    excerpt: data?.excerpt || "",
    shortDescription: data?.shortDescription || "",
    specs: {
      brand: data?.specs?.brand || "",
      model: data?.specs?.model || "",
      seats: Number(data?.specs?.seats || 0),
      year: data?.specs?.year || "",
      colors: Array.isArray(data?.specs?.colors) ? data.specs.colors : [],
      priceFrom: data?.specs?.priceFrom || "Liên hệ",
    },
    detailHtml: data?.detailHtml || "",
    priceTableHtml: data?.priceTableHtml || "",
    isHot: Boolean(data?.isHot),
    showOnHome: Boolean(data?.showOnHome),
    sortOrder: Number(data?.sortOrder || 999),
    active: Boolean(data?.active),
  };
}

export async function getCarServicePage() {
  try {
    const snap = await getDoc(doc(db, "car_service_pages", "main"));
    if (!snap.exists()) return null;
    return mapCarServicePage(snap.data());
  } catch (error) {
    console.error("Lỗi getCarServicePage:", error);
    return null;
  }
}

export async function getCarPosts() {
  try {
    const snap = await getDocs(collection(db, "car_posts"));

    return snap.docs
      .map((docSnap) => mapCarPost(docSnap.id, docSnap.data()))
      .filter((item) => item.active)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error("Lỗi getCarPosts:", error);
    return [];
  }
}

export async function getCarPostBySlug(slug: string) {
  const posts = await getCarPosts();
  return posts.find((item) => item.slug === slug) || null;
}

export async function getRelatedCarPosts(currentSlug: string, limit = 6) {
  const posts = await getCarPosts();

  return posts
    .filter((item) => item.slug !== currentSlug && item.showOnHome)
    .slice(0, limit);
}