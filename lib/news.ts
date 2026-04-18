import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export type NewsPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  subCategory?: string;
  image: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  views: number;
  rating?: number;
  totalRatings?: number;
  active: boolean;
  featured?: boolean;
  relatedNews?: string[];
  contact?: {
    facebook?: string;
    email?: string;
  };
};

export async function getNewsPosts(): Promise<NewsPost[]> {
  try {
    const q = query(collection(db, "news_posts"), where("active", "==", true));
    const snapshot = await getDocs(q);

    const items = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        title: String(data.title ?? ""),
        slug: String(data.slug ?? docSnap.id),
        category: String(data.category ?? ""),
        subCategory: data.subCategory ? String(data.subCategory) : undefined,
        image: String(data.image ?? ""),
        excerpt: String(data.excerpt ?? ""),
        content: String(data.content ?? ""),
        publishedAt: String(data.publishedAt ?? ""),
        views: Number(data.views ?? 0),
        rating: Number(data.rating ?? 0),
        totalRatings: Number(data.totalRatings ?? 0),
        active: Boolean(data.active ?? false),
        featured: Boolean(data.featured ?? false),
        relatedNews: Array.isArray(data.relatedNews)
          ? data.relatedNews.map(String)
          : [],
        contact: data.contact
          ? {
              facebook: data.contact.facebook
                ? String(data.contact.facebook)
                : undefined,
              email: data.contact.email ? String(data.contact.email) : undefined,
            }
          : undefined,
      };
    });

    return items.sort((a, b) => {
      const aTime = new Date(a.publishedAt).getTime();
      const bTime = new Date(b.publishedAt).getTime();
      return bTime - aTime;
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách tin tức:", error);
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  try {
    const q = query(collection(db, "news_posts"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    const data = docSnap.data();

    return {
      id: docSnap.id,
      title: String(data.title ?? ""),
      slug: String(data.slug ?? docSnap.id),
      category: String(data.category ?? ""),
      subCategory: data.subCategory ? String(data.subCategory) : undefined,
      image: String(data.image ?? ""),
      excerpt: String(data.excerpt ?? ""),
      content: String(data.content ?? ""),
      publishedAt: String(data.publishedAt ?? ""),
      views: Number(data.views ?? 0),
      rating: Number(data.rating ?? 0),
      totalRatings: Number(data.totalRatings ?? 0),
      active: Boolean(data.active ?? false),
      featured: Boolean(data.featured ?? false),
      relatedNews: Array.isArray(data.relatedNews)
        ? data.relatedNews.map(String)
        : [],
      contact: data.contact
        ? {
            facebook: data.contact.facebook
              ? String(data.contact.facebook)
              : undefined,
            email: data.contact.email ? String(data.contact.email) : undefined,
          }
        : undefined,
    };
  } catch (error) {
    console.error("Lỗi lấy tin tức theo slug:", error);
    return null;
  }
}

export function formatNewsDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}