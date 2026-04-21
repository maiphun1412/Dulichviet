"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, ShoppingBag, Ticket, Trash2 } from "lucide-react";

import HeaderTop from "@/components/HeaderTop";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import { formatAccessoryPrice } from "../../lib/accessory-data";
import {
  getCart,
  updateCartItems,
  type CartItem as FirebaseCartItem,
} from "../../lib/cart";
import { auth } from "../../lib/firebase";

type CartItem = FirebaseCartItem & {
  brand?: string;
  oldPrice?: number;
  color?: string;
  size?: string;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(true);

  const getCurrentUserUid = () => auth.currentUser?.uid ?? null;

  async function loadCart() {
    try {
      setLoading(true);
      const rawItems = await getCart(getCurrentUserUid());

      const normalized: CartItem[] = rawItems.map((item) => ({
        ...item,
        brand: (item as CartItem).brand ?? "Phụ kiện du lịch",
        oldPrice: (item as CartItem).oldPrice ?? 0,
        color: (item as CartItem).color ?? "",
        size: (item as CartItem).size ?? "",
        slug: item.slug ?? "",
      }));

      setCartItems(normalized);
    } catch (error) {
      console.error("Lỗi đọc giỏ hàng:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function saveCart(nextCart: CartItem[]) {
    setCartItems(nextCart);
    await updateCartItems(nextCart, getCurrentUserUid());
  }

  async function handleDecrease(index: number) {
    const nextCart = [...cartItems];
    if (nextCart[index].quantity > 1) {
      nextCart[index] = {
        ...nextCart[index],
        quantity: nextCart[index].quantity - 1,
      };
      await saveCart(nextCart);
    }
  }

  async function handleIncrease(index: number) {
    const nextCart = [...cartItems];
    nextCart[index] = {
      ...nextCart[index],
      quantity: nextCart[index].quantity + 1,
    };
    await saveCart(nextCart);
  }

  async function handleRemove(index: number) {
    const nextCart = cartItems.filter((_, i) => i !== index);
    await saveCart(nextCart);
  }

  useEffect(() => {
    loadCart();

    const handleCartUpdated = async () => {
      await loadCart();
    };

    window.addEventListener("cart-updated", handleCartUpdated);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
    };
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const discount = 0;
  const total = subtotal - discount;

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
            <span>Thanh Toán</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-8">
          <h1 className="text-[28px] font-bold text-[#243b63]">
            Giỏ hàng của bạn
          </h1>

          <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-[16px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <div className="mb-5 hidden grid-cols-[1.6fr_0.8fr_0.8fr_1fr] gap-4 px-3 text-[18px] font-semibold text-[#243b63] md:grid">
                <div>Sản phẩm</div>
                <div>Đơn giá</div>
                <div>Số lượng</div>
                <div>Thành tiền</div>
              </div>

              <div className="overflow-hidden rounded-[12px] border border-[#edf1f5]">
                <div className="flex flex-wrap items-center gap-4 border-b border-[#edf1f5] bg-[#f9fbfd] px-5 py-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#2f66e0] px-4 py-2 text-[15px] font-semibold text-white">
                    <ShoppingBag size={16} />
                    MIA Shop
                  </div>

                  <div className="text-[14px] text-[#6d7c93]">
                    Phí ship tính khi thanh toán
                  </div>
                </div>

                {loading ? (
                  <div className="px-6 py-14 text-center">
                    <div className="text-[18px] font-semibold text-[#243b63]">
                      Đang tải giỏ hàng...
                    </div>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="px-6 py-14 text-center">
                    <div className="text-[18px] font-semibold text-[#243b63]">
                      Giỏ hàng đang trống
                    </div>
                    <div className="mt-2 text-[15px] text-[#6d7c93]">
                      Hãy thêm sản phẩm từ trang phụ kiện du lịch.
                    </div>
                    <Link
                      href="/phu-kien-du-lich"
                      className="mt-6 inline-flex h-[46px] items-center justify-center rounded-[8px] bg-[#2f66e0] px-6 text-[16px] font-semibold text-white"
                    >
                      Tiếp tục mua sắm
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="hidden grid-cols-[1.6fr_0.8fr_0.8fr_1fr_48px] gap-4 border-b border-[#edf1f5] bg-white px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.03em] text-[#9aa6b2] md:grid">
                      <div>Sản phẩm</div>
                      <div>Đơn giá</div>
                      <div>Số lượng</div>
                      <div>Thành tiền</div>
                      <div />
                    </div>

                    {cartItems.map((item, index) => (
                      <div
                        key={`${item.productId}-${item.color}-${item.size}-${index}`}
                        className="border-b border-[#edf1f5] px-5 py-5 last:border-b-0"
                      >
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.6fr_0.8fr_0.8fr_1fr_48px] md:items-center">
                          <div className="flex gap-4">
                            <div className="relative h-[92px] w-[92px] overflow-hidden rounded-[8px] border border-[#dce3ec] bg-white">
                              <Image
                                src={item.image || "/placeholder.png"}
                                alt={item.title}
                                fill
                                unoptimized
                                sizes="100px"
                                className="object-contain p-2"
                              />
                            </div>

                            <div className="flex-1">
                              <Link
                                href={
                                  item.slug
                                    ? `/phu-kien-du-lich/${item.slug}`
                                    : "/phu-kien-du-lich"
                                }
                                className="text-[18px] font-semibold leading-[1.45] text-[#243b63] hover:text-[#ec008c]"
                              >
                                {item.title}
                              </Link>

                              <div className="mt-2 text-[14px] text-[#6d7c93]">
                                {item.brand}
                                {item.size ? `  Size: ${item.size}` : ""}
                              </div>

                              {item.color ? (
                                <div className="mt-2 text-[14px] text-[#6d7c93]">
                                  Màu: {item.color}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div>
                            <div className="text-[15px] font-semibold text-[#243b63] md:hidden">
                              Đơn giá
                            </div>
                            <div className="mt-1 text-[16px] font-bold text-[#243b63]">
                              {formatAccessoryPrice(item.price)}
                            </div>
                            {(item.oldPrice ?? 0) > 0 ? (
                              <div className="mt-1 text-[14px] text-[#9aa6b2] line-through">
                                {formatAccessoryPrice(item.oldPrice ?? 0)}
                              </div>
                            ) : null}
                          </div>

                          <div>
                            <div className="text-[15px] font-semibold text-[#243b63] md:hidden">
                              Số lượng
                            </div>
                            <div className="mt-1 inline-flex h-[36px] items-center overflow-hidden rounded-[8px] border border-[#dce3ec]">
                              <button
                                type="button"
                                onClick={() => handleDecrease(index)}
                                className="flex h-full w-[34px] items-center justify-center text-[18px] text-[#5d6b80]"
                              >
                                -
                              </button>
                              <div className="flex h-full min-w-[36px] items-center justify-center border-x border-[#dce3ec] px-3 text-[15px] text-[#243b63]">
                                {item.quantity}
                              </div>
                              <button
                                type="button"
                                onClick={() => handleIncrease(index)}
                                className="flex h-full w-[34px] items-center justify-center text-[18px] text-[#5d6b80]"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div>
                            <div className="text-[15px] font-semibold text-[#243b63] md:hidden">
                              Thành tiền
                            </div>
                            <div className="mt-1 text-[18px] font-bold text-[#d96447]">
                              {formatAccessoryPrice(item.price * item.quantity)}
                            </div>
                          </div>

                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => handleRemove(index)}
                              className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] text-[#9aa6b2] transition hover:bg-[#f5f7fa] hover:text-[#e15c5c]"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end border-t border-[#edf1f5] px-5 py-4 text-[16px] text-[#6d7c93]">
                      <span className="mr-3">Tổng MIA Shop:</span>
                      <strong className="text-[18px] text-[#243b63]">
                        {formatAccessoryPrice(subtotal)}
                      </strong>
                    </div>
                  </>
                )}
              </div>
            </div>

            <aside className="rounded-[16px] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <h2 className="text-[22px] font-bold text-[#243b63]">
                Tóm tắt đơn hàng
              </h2>

              <div className="mt-6 space-y-4 border-b border-[#edf1f5] pb-6 text-[16px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#4c5d77]">Tạm tính:</span>
                  <span className="text-[#243b63]">
                    {formatAccessoryPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#4c5d77]">Giảm giá:</span>
                  <span className="text-[#ff4d4f]">
                    {formatAccessoryPrice(0)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#4c5d77]">Phí vận chuyển:</span>
                  <span className="text-[#243b63]">Tính khi thanh toán</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-[18px] font-semibold text-[#243b63]">
                  Tổng cộng:
                </span>
                <span className="text-[20px] font-bold text-[#ff4d4f]">
                  {formatAccessoryPrice(total)}
                </span>
              </div>

              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Nhập mã giảm giá"
                  className="h-[42px] flex-1 rounded-[8px] border border-[#dce3ec] px-4 text-[15px] outline-none"
                />
                <button
                  type="button"
                  className="h-[42px] rounded-[8px] bg-[#2f66e0] px-5 text-[15px] font-semibold text-white"
                >
                  Áp dụng
                </button>
              </div>

              <Link
                href="/thanh-toan"
                className="mt-5 flex h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#2f66e0] text-[18px] font-semibold text-white"
              >
                <CreditCard size={18} />
                Thanh toán
              </Link>

              <Link
                href="/phu-kien-du-lich"
                className="mt-3 flex h-[48px] w-full items-center justify-center rounded-[8px] border border-[#dce3ec] bg-white text-[17px] font-semibold text-[#243b63]"
              >
                ← Tiếp tục mua sắm
              </Link>

              <div className="mt-5 border-t border-[#edf1f5] pt-5">
                <div className="text-[15px] text-[#6d7c93]">
                  Phương thức thanh toán:
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[8px] bg-[#d81b60] text-[12px] font-bold text-white">
                    Mo
                  </div>
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[8px] bg-[#ffffff] text-[11px] font-bold text-[#2f66e0] shadow-[0_0_0_1px_#dce3ec_inset]">
                    VNP
                  </div>
                  <div className="flex h-[38px] items-center rounded-[8px] bg-[#f9fbfd] px-3 text-[13px] text-[#6d7c93]">
                    <Ticket size={14} className="mr-2" />
                    Bảo mật thanh toán
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}