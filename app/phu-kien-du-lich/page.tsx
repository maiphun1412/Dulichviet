"use client";
import { auth } from "@/lib/firebase";
import { addToCart } from "@/lib/cart";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import {
  formatAccessoryPrice,
  getAccessoryPageData,
  getTravelAccessories,
  type AccessoryPageData,
  type TravelAccessoryItem,
} from "@/lib/accessory-data";
import HeaderTop from "@/components/HeaderTop";

function ProductCard({ item }: { item: TravelAccessoryItem }) {
  const router = useRouter();

  async function handleAddToCart() {
    const cartItem = {
      productId: item.id,
      slug: item.slug,
      title: item.title,
      brand: item.brand,
      price: item.price,
      oldPrice: item.oldPrice ?? 0,
      quantity: 1,
      image: item.mainImage || item.thumbnails?.[0] || "/placeholder.png",
      color: item.colors?.[0] || "",
      size: item.sizes?.[0] || "",
    };

    try {
      await addToCart(cartItem, auth.currentUser?.uid ?? null);
      router.push("/gio-hang");
    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng:", error);
    }
  }

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#ececec] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
      <Link href={`/phu-kien-du-lich/${item.slug}`} className="block">
        <div className="relative h-[280px] w-full bg-white">
          {item.discountPercent > 0 ? (
            <div className="absolute left-3 top-3 z-10 rounded-[6px] bg-[#ff4d4f] px-3 py-2 text-[13px] font-bold text-white">
              SALE {item.discountPercent}%
            </div>
          ) : null}

          <Image
            src={item.mainImage || item.thumbnails?.[0] || "/placeholder.png"}
            alt={item.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-6 transition duration-300 hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="px-5 pb-5">
        <div className="text-[14px] text-[#6d7c93]">{item.brand}</div>

        <Link href={`/phu-kien-du-lich/${item.slug}`} className="block">
          <h3 className="mt-1 min-h-[52px] text-[16px] leading-[1.45] text-[#243b63] hover:text-[#ec008c]">
            {item.title}
          </h3>
        </Link>

        <div className="mt-5 flex items-end gap-3">
          <span className="text-[18px] font-bold text-[#ff4d4f]">
            {formatAccessoryPrice(item.price)}
          </span>

          {item.oldPrice > 0 ? (
            <span className="text-[14px] text-[#9aa6b2] line-through">
              {formatAccessoryPrice(item.oldPrice)}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-5 flex h-[44px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#2f66e0] text-[15px] font-semibold text-white transition hover:bg-[#2454bf]"
        >
          <ShoppingCart size={16} />
          Thêm vào giỏ
        </button>

        {item.couponCode && item.couponPrice > 0 ? (
          <div className="mt-3 flex items-center gap-2 rounded-[6px] bg-[#f4f1ed] px-4 py-3 text-[11px] text-[#9c5a16]">
            <Tag size={11} className="text-[#f0a01f]" />
            <span>
              Nhập mã <strong>{item.couponCode}</strong> còn{" "}
              <strong>{formatAccessoryPrice(item.couponPrice)}</strong>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function TravelAccessoryPage() {
  const [pageData, setPageData] = useState<AccessoryPageData | null>(null);
  const [products, setProducts] = useState<TravelAccessoryItem[]>([]);
  const [loading, setLoading] = useState(true);
const router = useRouter();
  const [activeTab, setActiveTab] = useState("Vali");
  const [brandFilter, setBrandFilter] = useState("Tất cả");
  const [sizeFilter, setSizeFilter] = useState("Tất cả");
  const [priceFilter, setPriceFilter] = useState("Tất cả");
  const [sortOption, setSortOption] = useState("Mặc định");

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);

        const [pageRes, productRes] = await Promise.all([
          getAccessoryPageData(),
          getTravelAccessories(),
        ]);

        if (!mounted) return;

        setPageData(pageRes);
        setProducts(productRes);
      } catch (error) {
        console.error("Lỗi tải trang phụ kiện du lịch:", error);
        if (!mounted) return;
        setPageData(null);
        setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeTab === "Vali") {
      result = result.filter((item) => item.category === "vali");
    }

    if (brandFilter !== "Tất cả") {
      result = result.filter((item) => item.brand === brandFilter);
    }

    if (sizeFilter !== "Tất cả") {
      result = result.filter((item) =>
        item.sizes?.some((size) => size.toLowerCase().includes(sizeFilter.toLowerCase()))
      );
    }

    if (priceFilter !== "Tất cả") {
      result = result.filter((item) => {
        if (priceFilter === "Dưới 1 triệu") return item.price < 1000000;
        if (priceFilter === "1 - 2 triệu") {
          return item.price >= 1000000 && item.price <= 2000000;
        }
        if (priceFilter === "Trên 2 triệu") return item.price > 2000000;
        return true;
      });
    }

    if (sortOption === "Giá tăng dần") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Giá giảm dần") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Mới nhất") {
      result.sort((a, b) => b.sortOrder - a.sortOrder);
    } else {
      result.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    return result;
  }, [products, activeTab, brandFilter, sizeFilter, priceFilter, sortOption]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
         
        <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-10 text-[#666]">
          Đang tải phụ kiện du lịch...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#222]">
       <HeaderTop />
      <MainHeader />

      <main>
        <section className="bg-[#eef1f5]">
          <div className="mx-auto max-w-[1180px] px-4 py-3 text-[14px] text-[#7e8a98]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-1">{">"}</span>
            <span>{pageData?.breadcrumbTitle || "Travel Shop"}</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-6">
          <div className="flex flex-wrap gap-3">
            {(pageData?.tabs || ["Vali", "Mỹ phẩm"]).map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`h-[40px] rounded-full border px-6 text-[16px] font-medium transition ${
                    active
                      ? "border-[#c63aa1] bg-[#c63aa1] text-white"
                      : "border-[#c63aa1] bg-white text-[#243b63]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-[16px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center gap-4">
                <label className="min-w-[74px] text-[15px] font-semibold text-[#243b63]">
                  Thương hiệu:
                </label>
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  className="h-[42px] w-full rounded-[8px] border border-[#d7e0ea] px-4 text-[15px] outline-none"
                >
                  {(pageData?.filterOptions.brands || ["Tất cả"]).map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="min-w-[60px] text-[15px] font-semibold text-[#243b63]">
                  Kích thước:
                </label>
                <select
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(e.target.value)}
                  className="h-[42px] w-full rounded-[8px] border border-[#d7e0ea] px-4 text-[15px] outline-none"
                >
                  {(pageData?.filterOptions.sizes || ["Tất cả"]).map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="min-w-[30px] text-[15px] font-semibold text-[#243b63]">
                  Giá:
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="h-[42px] w-full rounded-[8px] border border-[#d7e0ea] px-4 text-[15px] outline-none"
                >
                  {(pageData?.filterOptions.prices || ["Tất cả"]).map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="min-w-[55px] text-[15px] font-semibold text-[#243b63]">
                  Sắp xếp:
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="h-[42px] w-full rounded-[8px] border border-[#d7e0ea] px-4 text-[15px] outline-none"
                >
                  {(pageData?.filterOptions.sortOptions || ["Mặc định"]).map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}