import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type AccessorySpecRow = {
  label: string;
  value: string;
};

export type TravelAccessoryItem = {
  id: string;
  title: string;
  slug: string;
  brand: string;
  category: string;
  subCategory: string;
  sku: string;
  stockStatus: string;
  price: number;
  oldPrice: number;
  discountPercent: number;
  couponCode: string;
  couponPrice: number;
  description: string;
  shortDescription: string;
  colors: string[];
  sizes: string[];
  material: string;
  dimensions: string;
  capacity: string;
  wheels: string;
  lock: string;
  handle: string;
  warranty: string;
  active: boolean;
  sortOrder: number;
  mainImage: string;
  thumbnails: string[];
  gallery: string[];
  detailHtml: string;
  technicalSpecs: AccessorySpecRow[];
};

export type AccessoryFilterOptions = {
  brands: string[];
  sizes: string[];
  prices: string[];
  sortOptions: string[];
};

export type AccessoryPageData = {
  id: string;
  slug: string;
  title: string;
  breadcrumbTitle: string;
  tabs: string[];
  filterOptions: AccessoryFilterOptions;
  active: boolean;
  updatedAt?: string;
};

function mapAccessoryItem(id: string, data: any): TravelAccessoryItem {
  return {
    id,
    title: data?.title || "",
    slug: data?.slug || id,
    brand: data?.brand || "",
    category: data?.category || "",
    subCategory: data?.subCategory || "",
    sku: data?.sku || "",
    stockStatus: data?.stockStatus || "Còn hàng",
    price: Number(data?.price || 0),
    oldPrice: Number(data?.oldPrice || 0),
    discountPercent: Number(data?.discountPercent || 0),
    couponCode: data?.couponCode || "",
    couponPrice: Number(data?.couponPrice || 0),
    description: data?.description || "",
    shortDescription: data?.shortDescription || "",
    colors: Array.isArray(data?.colors) ? data.colors : [],
    sizes: Array.isArray(data?.sizes) ? data.sizes : [],
    material: data?.material || "",
    dimensions: data?.dimensions || "",
    capacity: data?.capacity || "",
    wheels: data?.wheels || "",
    lock: data?.lock || "",
    handle: data?.handle || "",
    warranty: data?.warranty || "",
    active: Boolean(data?.active),
    sortOrder: Number(data?.sortOrder || 999),
    mainImage: data?.mainImage || "",
    thumbnails: Array.isArray(data?.thumbnails) ? data.thumbnails : [],
    gallery: Array.isArray(data?.gallery) ? data.gallery : [],
    detailHtml: data?.detailHtml || "",
    technicalSpecs: Array.isArray(data?.technicalSpecs)
      ? data.technicalSpecs.map((item: any) => ({
          label: item?.label || "",
          value: item?.value || "",
        }))
      : [],
  };
}

function mapAccessoryPageData(data: any): AccessoryPageData {
  return {
    id: data?.id || "main",
    slug: data?.slug || "phu-kien-du-lich",
    title: data?.title || "Travel Shop",
    breadcrumbTitle: data?.breadcrumbTitle || "Travel Shop",
    tabs: Array.isArray(data?.tabs) ? data.tabs : ["Vali", "Mỹ phẩm"],
    filterOptions: {
      brands: Array.isArray(data?.filterOptions?.brands)
        ? data.filterOptions.brands
        : ["Tất cả"],
      sizes: Array.isArray(data?.filterOptions?.sizes)
        ? data.filterOptions.sizes
        : ["Tất cả"],
      prices: Array.isArray(data?.filterOptions?.prices)
        ? data.filterOptions.prices
        : ["Tất cả"],
      sortOptions: Array.isArray(data?.filterOptions?.sortOptions)
        ? data.filterOptions.sortOptions
        : ["Mặc định"],
    },
    active: Boolean(data?.active),
    updatedAt: data?.updatedAt || "",
  };
}

export async function getAccessoryPageData(): Promise<AccessoryPageData | null> {
  try {
    const snap = await getDoc(doc(db, "travel_accessory_pages", "main"));
    if (!snap.exists()) return null;
    return mapAccessoryPageData(snap.data());
  } catch (error) {
    console.error("Lỗi getAccessoryPageData:", error);
    return null;
  }
}

export async function getTravelAccessories(): Promise<TravelAccessoryItem[]> {
  try {
    const snap = await getDocs(collection(db, "travel_accessories"));

    return snap.docs
      .map((docSnap) => mapAccessoryItem(docSnap.id, docSnap.data()))
      .filter((item) => item.active)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error("Lỗi getTravelAccessories:", error);
    return [];
  }
}

export async function getAccessoryBySlug(
  slug: string
): Promise<TravelAccessoryItem | null> {
  const items = await getTravelAccessories();
  return items.find((item) => item.slug === slug) || null;
}

export async function getRelatedAccessories(
  currentSlug: string,
  limit = 4
): Promise<TravelAccessoryItem[]> {
  const items = await getTravelAccessories();

  return items.filter((item) => item.slug !== currentSlug).slice(0, limit);
}

export function formatAccessoryPrice(value: number): string {
  return `${value.toLocaleString("vi-VN")} ₫`;
}

export function buildAccessoryTechnicalSpecs(
  item: TravelAccessoryItem
): AccessorySpecRow[] {
  if (item.technicalSpecs?.length) return item.technicalSpecs;

  return [
    { label: "Chất liệu", value: item.material || "-" },
    { label: "Kích thước (DxRxC)", value: item.dimensions || "-" },
    { label: "Dung tích", value: item.capacity || "-" },
    { label: "Bánh xe", value: item.wheels || "-" },
    { label: "Khóa", value: item.lock || "-" },
    { label: "Dây kéo", value: item.handle || "-" },
    { label: "Bảo hành", value: item.warranty || "-" },
  ];
}