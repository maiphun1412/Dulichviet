"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../../lib/firebase";
import { addToCart } from "../../../lib/cart";
import { useParams, useRouter  } from "next/navigation";
import {
  ArrowRightLeft,
  ShieldCheck,
  ShoppingCart,
  Truck,
  X,
  Zap,
} from "lucide-react";

import MainHeader from "../../../components/MainHeader";
import Footer from "../../../components/Footer";
import {
  buildAccessoryTechnicalSpecs,
  formatAccessoryPrice,
  getAccessoryBySlug,
  getRelatedAccessories,
  type TravelAccessoryItem,
  type AccessorySpecRow,
} from "../../../lib/accessory-data";
import HeaderTop from "@/components/HeaderTop";

type TabKey = "description" | "technical";


function RelatedProductCard({ item }: { item: TravelAccessoryItem }) {
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
            className="object-contain p-6"
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
      </div>
    </div>
  );
}

export default function AccessoryDetailPage() {
  const params = useParams<{ slug: string | string[] }>();
  const router = useRouter();
  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug || "";

  const [product, setProduct] = useState<TravelAccessoryItem | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<TravelAccessoryItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [showAddedModal, setShowAddedModal] = useState(false);
const [addedItem, setAddedItem] = useState<{
  productId: string;
  slug?: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  brand?: string;
  oldPrice?: number;
  color?: string;
  size?: string;
} | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);

        const [productRes, relatedRes] = await Promise.all([
          getAccessoryBySlug(slug),
          getRelatedAccessories(slug, 3),
        ]);

        if (!mounted) return;

        setProduct(productRes);
        setRelatedProducts(relatedRes);

        if (productRes) {
          setSelectedImage(
            productRes.mainImage ||
              productRes.thumbnails?.[0] ||
              "/placeholder.png"
          );
          setSelectedColor(productRes.colors?.[0] || "");
          setSelectedSize(productRes.sizes?.[0] || "");
        }
      } catch (error) {
        console.error("Lỗi tải chi tiết sản phẩm:", error);
        if (!mounted) return;
        setProduct(null);
        setRelatedProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (slug) {
      loadData();
    }

    return () => {
      mounted = false;
    };
  }, [slug]);

  const galleryImages = useMemo(() => {
    if (!product) return [];

    const all = [
      product.mainImage,
      ...(product.thumbnails || []),
      ...(product.gallery || []),
    ].filter(Boolean) as string[];

    return Array.from(new Set(all));
  }, [product]);

  const technicalSpecs = useMemo<AccessorySpecRow[]>(() => {
    if (!product) return [];
    return buildAccessoryTechnicalSpecs(product);
  }, [product]);

async function handleAddToCart() {
  if (!product) return;

  const cartItem = {
    productId: product.id,
    slug: product.slug,
    title: product.title,
    image:
      selectedImage ||
      product.mainImage ||
      product.thumbnails?.[0] ||
      "/placeholder.png",
    price: product.price,
    quantity,
    brand: product.brand,
    oldPrice: product.oldPrice,
    color: selectedColor,
    size: selectedSize,
  };

  try {
    await addToCart(cartItem, auth.currentUser?.uid ?? null);

    setAddedItem(cartItem);
    setShowAddedModal(true);
  } catch (error) {
    console.error("Lỗi thêm vào giỏ hàng:", error);
  }
}

  async function handleBuyNow() {
  if (!product) return;

  const cartItem = {
    productId: product.id,
    slug: product.slug,
    title: product.title,
    image:
      selectedImage ||
      product.mainImage ||
      product.thumbnails?.[0] ||
      "/placeholder.png",
    price: product.price,
    quantity,
    brand: product.brand,
    oldPrice: product.oldPrice,
    color: selectedColor,
    size: selectedSize,
  };

  try {
    await addToCart(cartItem, auth.currentUser?.uid ?? null);
    router.push("/thanh-toan");
  } catch (error) {
    console.error("Lỗi mua ngay:", error);
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
         <HeaderTop />
        <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-10 text-[#666]">
          Đang tải chi tiết sản phẩm...
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
  <div className="min-h-screen bg-[#fafafa] text-[#222]">
    <HeaderTop />
    <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-10">
          <h1 className="text-[32px] font-bold text-[#243b63]">
            Không tìm thấy sản phẩm
          </h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#222]">
      <MainHeader />

      <main>
        <section className="bg-[#eef1f5]">
          <div className="mx-auto max-w-[1180px] px-4 py-3 text-[14px] text-[#7e8a98]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-1">{">"}</span>
            <span>Chi Tiết Sản Phẩm</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-4">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="h-[40px] rounded-full border border-[#c63aa1] bg-[#c63aa1] px-6 text-[16px] font-medium text-white"
            >
              Vali
            </button>
            <button
              type="button"
              className="h-[40px] rounded-full border border-[#c63aa1] bg-white px-6 text-[16px] font-medium text-[#243b63]"
            >
              Mỹ phẩm
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 pb-10">
          <div className="rounded-[16px] bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_500px]">
              <div>
                <div className="relative overflow-hidden rounded-[12px] border border-[#dce3ec] bg-white">
                  {product.discountPercent > 0 ? (
                    <div className="absolute left-4 top-4 z-10 rounded-[6px] bg-[#ff4d4f] px-3 py-2 text-[13px] font-bold text-white">
                      SALE
                    </div>
                  ) : null}

                  <div className="relative h-[500px] w-full">
                    <Image
                      src={selectedImage || "/placeholder.png"}
                      alt={product.title}
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain p-6"
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-3">
                  {galleryImages.slice(0, 4).map((image: string, index: number) => {
                    const active = selectedImage === image;

                    return (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        className={`relative h-[110px] overflow-hidden rounded-[8px] border bg-white ${
                          active
                            ? "border-[#2f66e0]"
                            : "border-[#dce3ec] hover:border-[#9fb8f0]"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.title}-${index + 1}`}
                          fill
                          unoptimized
                          sizes="160px"
                          className="object-contain p-3"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h1 className="text-[28px] font-bold leading-[1.3] text-[#243b63]">
                  {product.title}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-[15px]">
                  <span className="font-medium text-[#2f66e0]">
                    {product.brand}
                  </span>
                  <span className="text-[#9aa6b2]">|</span>
                  <span className="text-[#6d7c93]">Mã: {product.sku}</span>
                  <span className="text-[#1ca64c]">{product.stockStatus}</span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="text-[20px] font-bold text-[#ff4d4f]">
                    {formatAccessoryPrice(product.price)}
                  </span>

                  {product.oldPrice > 0 ? (
                    <span className="text-[15px] text-[#9aa6b2] line-through">
                      {formatAccessoryPrice(product.oldPrice)}
                    </span>
                  ) : null}

                  {product.discountPercent > 0 ? (
                    <span className="rounded-[6px] bg-[#ff4d4f] px-3 py-1 text-[13px] font-bold text-white">
                      -{product.discountPercent}%
                    </span>
                  ) : null}
                </div>

                <p className="mt-6 text-[16px] leading-8 text-[#6d7c93]">
                  {product.description}
                </p>

                <div className="mt-7">
                  <div className="text-[16px] font-semibold text-[#243b63]">
                    Màu sắc:
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {product.colors.map((color: string) => {
                      const active = selectedColor === color;
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`rounded-[8px] border px-4 py-3 text-[15px] ${
                            active
                              ? "border-[#2f66e0] text-[#243b63]"
                              : "border-[#dce3ec] text-[#243b63]"
                          }`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-7">
                  <div className="text-[16px] font-semibold text-[#243b63]">
                    Kích thước:
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {product.sizes.map((size: string) => {
                      const active = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-[8px] border px-4 py-3 text-[15px] ${
                            active
                              ? "border-[#2f66e0] text-[#243b63]"
                              : "border-[#dce3ec] text-[#243b63]"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-7">
                  <div className="text-[16px] font-semibold text-[#243b63]">
                    Số lượng:
                  </div>

                  <div className="mt-3 inline-flex h-[38px] items-center overflow-hidden rounded-[8px] border border-[#dce3ec]">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="flex h-full w-[38px] items-center justify-center text-[20px] text-[#5d6b80]"
                    >
                      -
                    </button>

                    <div className="flex h-full min-w-[40px] items-center justify-center border-x border-[#dce3ec] px-3 text-[16px] text-[#243b63]">
                      {quantity}
                    </div>

                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="flex h-full w-[38px] items-center justify-center text-[20px] text-[#5d6b80]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex h-[48px] items-center justify-center gap-2 rounded-[8px] bg-[#2f66e0] text-[17px] font-semibold text-white transition hover:bg-[#2454bf]"
                  >
                    <ShoppingCart size={18} />
                    Thêm vào giỏ hàng
                  </button>

<button
  type="button"
  onClick={handleBuyNow}
  className="flex h-[48px] items-center justify-center gap-2 rounded-[8px] border border-[#dce3ec] bg-white text-[17px] font-semibold text-[#243b63] transition hover:border-[#b8c8df]"
>
  <Zap size={18} />
  Mua ngay
</button>
                </div>

                {product.couponCode && product.couponPrice > 0 ? (
                  <div className="mt-4 flex items-center justify-center rounded-[8px] bg-[#f4f1ed] px-4 py-4 text-[15px] text-[#9c5a16]">
                    Nhập mã <strong className="mx-1">{product.couponCode}</strong>
                    chỉ còn
                    <strong className="ml-1">
                      {formatAccessoryPrice(product.couponPrice)}
                    </strong>
                  </div>
                ) : null}

                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#edf1f5] pt-5">
                  <div className="flex items-center justify-center gap-2 text-[15px] font-medium text-[#243b63]">
                    <ShieldCheck size={18} className="text-[#2f66e0]" />
                    Bảo hành
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[15px] font-medium text-[#243b63]">
                    <Truck size={18} className="text-[#2f66e0]" />
                    Vận chuyển
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[15px] font-medium text-[#243b63]">
                    <ArrowRightLeft size={18} className="text-[#2f66e0]" />
                    Đổi trả
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-[12px] bg-white">
              <div className="flex gap-6 border-b border-[#dce3ec] px-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("description")}
                  className={`border-b-[2px] px-4 py-4 text-[16px] font-medium ${
                    activeTab === "description"
                      ? "border-[#2f66e0] text-[#2f66e0]"
                      : "border-transparent text-[#6d7c93]"
                  }`}
                >
                  Mô tả
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("technical")}
                  className={`border-b-[2px] px-4 py-4 text-[16px] font-medium ${
                    activeTab === "technical"
                      ? "border-[#2f66e0] text-[#2f66e0]"
                      : "border-transparent text-[#6d7c93]"
                  }`}
                >
                  Thông số kỹ thuật
                </button>
              </div>

              <div className="px-4 py-6">
                {activeTab === "description" ? (
                  <div>
                    {product.detailHtml ? (
                      <div
                        className="
                          text-[16px] leading-8 text-[#243b63]
                          [&_p]:mb-5
                          [&_img]:mb-4 [&_img]:w-full
                          [&_h2]:mt-6 [&_h2]:mb-4 [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:text-[#243b63]
                          [&_h3]:mt-5 [&_h3]:mb-3 [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:text-[#243b63]
                        "
                        dangerouslySetInnerHTML={{ __html: product.detailHtml }}
                      />
                    ) : (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {product.gallery.map((image: string, index: number) => (
                          <div
                            key={`${image}-${index}`}
                            className="relative h-[520px] overflow-hidden rounded-[8px] border border-[#e8edf3]"
                          >
                            <Image
                              src={image}
                              alt={`${product.title}-gallery-${index + 1}`}
                              fill
                              unoptimized
                              sizes="50vw"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-[8px] border border-[#e7edf4]">
                    {technicalSpecs.map((spec: AccessorySpecRow, index: number) => (
                      <div
                        key={`${spec.label}-${index}`}
                        className="grid grid-cols-[180px_1fr] border-b border-[#e7edf4] last:border-b-0"
                      >
                        <div className="bg-white px-4 py-4 text-[16px] font-medium text-[#243b63]">
                          {spec.label}:
                        </div>

                        <div className="bg-white px-4 py-4 text-[16px] text-[#4c5d77]">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {relatedProducts.length > 0 ? (
              <div className="mt-10">
                <h2 className="text-[24px] font-bold text-[#243b63]">
                  Sản phẩm liên quan
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {relatedProducts.map((item) => (
                    <RelatedProductCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      {showAddedModal && addedItem ? (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-[520px] rounded-[18px] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <button
              type="button"
              onClick={() => setShowAddedModal(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f5f8] text-[#6d7c93]"
            >
              <X size={20} />
            </button>

            <div className="mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#20c47a] text-[38px] font-bold text-white">
              ✓
            </div>

            <h3 className="mt-5 text-center text-[22px] font-bold text-[#243b63]">
              Đã thêm vào giỏ hàng!
            </h3>

            <div className="mt-6 rounded-[10px] border border-[#dce3ec] bg-[#f9fbfd] p-4">
              <div className="flex gap-4">
                <div className="relative h-[98px] w-[98px] overflow-hidden rounded-[8px] border border-[#dce3ec] bg-white">
                  <Image
                    src={addedItem.image || "/placeholder.png"}
                    alt={addedItem.title}
                    fill
                    unoptimized
                    sizes="100px"
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1">
                  <div className="text-[14px] text-[#6d7c93]">{addedItem.brand}</div>
                  <div className="mt-1 text-[18px] font-semibold leading-[1.4] text-[#243b63]">
                    {addedItem.title}
                  </div>

                  <div className="mt-2 text-[14px] text-[#6d7c93]">
                    {addedItem.color ? `Màu: ${addedItem.color}` : ""}
                    {addedItem.color && addedItem.size ? " | " : ""}
                    {addedItem.size ? `Size: ${addedItem.size}` : ""}
                  </div>

                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-[18px] font-bold text-[#ff4d4f]">
                      {formatAccessoryPrice(addedItem.price)}
                    </span>

                    {(addedItem.oldPrice ?? 0) > 0 ? (
  <span className="text-[14px] text-[#9aa6b2] line-through">
    {formatAccessoryPrice(addedItem.oldPrice ?? 0)}
  </span>
) : null}
                  </div>

                  <div className="mt-3 text-[15px] text-[#4c5d77]">
                    Số lượng: {addedItem.quantity}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setShowAddedModal(false)}
                className="flex h-[56px] items-center justify-center rounded-[10px] border border-[#dce3ec] bg-white text-[18px] font-semibold text-[#6d7c93]"
              >
                ← Tiếp tục mua sắm
              </button>

              <Link
                href="/gio-hang"
                className="flex h-[56px] items-center justify-center gap-2 rounded-[10px] bg-[#f44336] text-[18px] font-semibold text-white"
              >
                <ShoppingCart size={18} />
                Vào giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}