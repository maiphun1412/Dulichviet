import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type VisaPriceRow = {
  visaType: string;
  duration: string;
  originalPrice: string;
  salePrice: string;
};

export type VisaPriceGroup = {
  title: string;
  rows: VisaPriceRow[];
};

export type VisaStat = {
  label: string;
  value: string;
};

export type VisaServicePage = {
  id: string;
  slug: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  searchPlaceholder: string;
  searchTags: string[];
  stats: VisaStat[];
  introTitle: string;
  introRating: number;
  introRatingText: string;
  introViews: string;
  introParagraphs: string[];
  ctaText: string;
  priceTableTitle: string;
  priceGroups: VisaPriceGroup[];
  priceTableFooter: string;
  hotSectionTitle: string;
  asiaSectionTitle: string;
  africaSectionTitle: string;
  active: boolean;
  updatedAt?: string;
};

export type VisaPostItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  region: string;
  country: string;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  viewCount: number;
  tagLabel: string;
  excerpt: string;
  isHot: boolean;
  showOnHome: boolean;
  sortOrder: number;
  active: boolean;
  contentHtml: string;
};

function mapVisaServicePage(data: any): VisaServicePage {
  return {
    id: data?.id || "main",
    slug: data?.slug || "lam-visa",
    title: data?.title || "Làm Visa",
    heroTitle: data?.heroTitle || "",
    heroSubtitle: data?.heroSubtitle || "",
    heroImage: data?.heroImage || "",
    searchPlaceholder: data?.searchPlaceholder || "Bạn muốn làm visa đi đâu?",
    searchTags: Array.isArray(data?.searchTags) ? data.searchTags : [],
    stats: Array.isArray(data?.stats) ? data.stats : [],
    introTitle: data?.introTitle || "Làm Visa",
    introRating: Number(data?.introRating || 5),
    introRatingText: data?.introRatingText || "",
    introViews: data?.introViews || "",
    introParagraphs: Array.isArray(data?.introParagraphs)
      ? data.introParagraphs
      : [],
    ctaText: data?.ctaText || "Kiểm tra visa online",
    priceTableTitle: data?.priceTableTitle || "Bảng giá làm visa",
    priceGroups: Array.isArray(data?.priceGroups) ? data.priceGroups : [],
    priceTableFooter: data?.priceTableFooter || "",
    hotSectionTitle: data?.hotSectionTitle || "Visa Hot",
    asiaSectionTitle: data?.asiaSectionTitle || "Visa Châu Á",
    africaSectionTitle: data?.africaSectionTitle || "Visa Châu Phi",
    active: Boolean(data?.active),
    updatedAt: data?.updatedAt || "",
  };
}

function mapVisaPost(id: string, data: any): VisaPostItem {
  return {
    id,
    slug: data?.slug || id,
    title: data?.title || "",
    category: data?.category || "",
    region: data?.region || "",
    country: data?.country || "",
    thumbnail: data?.thumbnail || "",
    rating: Number(data?.rating || 0),
    reviewCount: Number(data?.reviewCount || 0),
    viewCount: Number(data?.viewCount || 0),
    tagLabel: data?.tagLabel || "",
    excerpt: data?.excerpt || "",
    isHot: Boolean(data?.isHot),
    showOnHome: Boolean(data?.showOnHome),
    sortOrder: Number(data?.sortOrder || 999),
    active: Boolean(data?.active),
    contentHtml: data?.contentHtml || "",
  };
}

export async function getVisaServicePage() {
  try {
    const snap = await getDoc(doc(db, "visa_service_pages", "main"));
    if (!snap.exists()) return null;
    return mapVisaServicePage(snap.data());
  } catch (error) {
    console.error("Lỗi getVisaServicePage:", error);
    return null;
  }
}

export async function getVisaPosts() {
  try {
    const snap = await getDocs(collection(db, "visa_posts"));

    return snap.docs
      .map((docSnap) => mapVisaPost(docSnap.id, docSnap.data()))
      .filter((item) => item.active)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error("Lỗi getVisaPosts:", error);
    return [];
  }
}
export async function getVisaPostBySlug(slug: string) {
  const posts = await getVisaPosts();
  return posts.find((item) => item.slug === slug) || null;
}

export async function getRelatedVisaPosts(
  currentSlug: string,
  limit = 4
): Promise<VisaPostItem[]> {
  const posts = await getVisaPosts();

  return posts
    .filter((item) => item.slug !== currentSlug && item.showOnHome)
    .slice(0, limit);
}

export function getVisaContactHref(slug: string) {
  return `/dich-vu-visa/${slug}/lien-he`;
}