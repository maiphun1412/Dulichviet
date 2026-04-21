"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import { formatAccessoryPrice } from "../../lib/accessory-data";
import HeaderTop from "@/components/HeaderTop";

type CartItem = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  price: number;
  oldPrice: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
};

type CheckoutForm = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  note: string;
};

const CART_KEY = "travel_accessory_cart";

const initialForm: CheckoutForm = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  district: "",
  note: "",
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [paymentMethod, setPaymentMethod] = useState("payoo");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed: CartItem[] = raw ? JSON.parse(raw) : [];
      setCartItems(parsed);
    } catch (error) {
      console.error("Lỗi đọc giỏ hàng:", error);
      setCartItems([]);
    }
  }, []);

  function updateField<K extends keyof CheckoutForm>(
    key: K,
    value: CheckoutForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const shippingFee = 0;
  const discount = 0;
  const total = subtotal + shippingFee - discount;

  function handlePlaceOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.district.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    alert("Đặt hàng thành công!");
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
            <span>Thanh Toán</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            <form
              onSubmit={handlePlaceOrder}
              className="rounded-[16px] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
            >
              <h1 className="text-[28px] font-bold text-[#243b63]">
                Thông tin giao hàng
              </h1>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[16px] font-medium text-[#243b63]">
                    Họ và tên <span className="text-[#ff4d4f]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className="h-[46px] w-full rounded-[8px] border border-[#dce3ec] px-4 text-[15px] outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[16px] font-medium text-[#243b63]">
                    Số điện thoại <span className="text-[#ff4d4f]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="h-[46px] w-full rounded-[8px] border border-[#dce3ec] px-4 text-[15px] outline-none"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-[16px] font-medium text-[#243b63]">
                  Email <span className="text-[#ff4d4f]">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="h-[46px] w-full rounded-[8px] border border-[#dce3ec] px-4 text-[15px] outline-none"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-[16px] font-medium text-[#243b63]">
                  Địa chỉ <span className="text-[#ff4d4f]">*</span>
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="Số nhà, tên đường"
                  className="h-[46px] w-full rounded-[8px] border border-[#dce3ec] px-4 text-[15px] outline-none placeholder:text-[#9aa6b2]"
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[16px] font-medium text-[#243b63]">
                    Tỉnh/Thành phố <span className="text-[#ff4d4f]">*</span>
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className="h-[46px] w-full rounded-[8px] border border-[#dce3ec] px-4 text-[15px] outline-none"
                  >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    <option value="TP.HCM">TP.HCM</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[16px] font-medium text-[#243b63]">
                    Quận/Huyện <span className="text-[#ff4d4f]">*</span>
                  </label>
                  <select
                    value={form.district}
                    onChange={(e) => updateField("district", e.target.value)}
                    className="h-[46px] w-full rounded-[8px] border border-[#dce3ec] px-4 text-[15px] outline-none"
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    <option value="Quận 1">Quận 1</option>
                    <option value="Quận 3">Quận 3</option>
                    <option value="Bình Thạnh">Bình Thạnh</option>
                    <option value="Thủ Đức">Thủ Đức</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-[16px] font-medium text-[#243b63]">
                  Ghi chú đơn hàng
                </label>
                <textarea
                  rows={4}
                  value={form.note}
                  onChange={(e) => updateField("note", e.target.value)}
                  placeholder="Ghi chú về đơn hàng..."
                  className="w-full resize-none rounded-[8px] border border-[#dce3ec] px-4 py-3 text-[15px] outline-none placeholder:text-[#9aa6b2]"
                />
              </div>

              <div className="mt-7">
                <h2 className="text-[24px] font-bold text-[#243b63]">
                  Phương thức thanh toán
                </h2>

                <label className="mt-5 flex cursor-pointer items-center gap-4 rounded-[12px] border-2 border-[#2f66e0] bg-[#f8fbff] p-4">
                  <input
                    type="radio"
                    checked={paymentMethod === "payoo"}
                    onChange={() => setPaymentMethod("payoo")}
                    className="hidden"
                  />

                  <div className="flex h-[64px] w-[96px] items-center justify-center rounded-[10px] bg-white text-[20px] font-bold text-[#1673c7] shadow-[0_0_0_1px_#dce3ec_inset]">
                    Payoo
                  </div>

                  <div className="flex-1">
                    <div className="text-[18px] font-semibold text-[#243b63]">
                      Thanh toán PAYOO
                    </div>
                    <div className="mt-2 text-[15px] leading-7 text-[#6d7c93]">
                      Thanh toán bằng thẻ ATM/Visa/Master/JCB/Amex/QR Code/Trả góp
                    </div>
                    <div className="text-[14px] text-[#6d7c93]">
                      (Cards Payment with ATM/Visa/Master/JCB/Amex/QR Code/Installment Payment)
                    </div>
                  </div>
                </label>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                <Link
                  href="/gio-hang"
                  className="flex h-[48px] items-center justify-center rounded-[8px] border border-[#dce3ec] bg-white text-[17px] font-semibold text-[#243b63]"
                >
                  ← Quay lại
                </Link>

                <button
                  type="submit"
                  className="flex h-[48px] items-center justify-center rounded-[8px] bg-[#2f66e0] text-[17px] font-semibold text-white"
                >
                  ✓ Đặt hàng
                </button>
              </div>
            </form>

            <aside className="rounded-[16px] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <h2 className="text-[22px] font-bold text-[#243b63]">
                Đơn hàng của bạn
              </h2>

              <div className="mt-5 rounded-[10px] border border-[#edf1f5] p-4">
                <div className="mb-4 text-[16px] font-semibold text-[#2f66e0]">
                  MIA SHOP
                </div>

                <div className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-[15px] text-[#6d7c93]">
                      Chưa có sản phẩm trong giỏ hàng.
                    </div>
                  ) : (
                    cartItems.map((item, index) => (
                      <div
                        key={`${item.id}-${item.color}-${item.size}-${index}`}
                        className="flex gap-3 border-b border-[#edf1f5] pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="relative h-[62px] w-[62px] overflow-hidden rounded-[8px] border border-[#dce3ec] bg-white">
                          <Image
                            src={item.image || "/placeholder.png"}
                            alt={item.title}
                            fill
                            unoptimized
                            sizes="62px"
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="text-[16px] font-medium leading-[1.45] text-[#243b63]">
                            {item.title}
                          </div>
                          <div className="mt-1 text-[13px] text-[#9aa6b2]">
                            {item.quantity} × {formatAccessoryPrice(item.price)}
                          </div>
                        </div>

                        <div className="text-[16px] font-semibold text-[#243b63]">
                          {formatAccessoryPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-[#edf1f5] pt-6 text-[16px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#4c5d77]">Tạm tính:</span>
                  <span className="text-[#243b63]">
                    {formatAccessoryPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#4c5d77]">Phí vận chuyển:</span>
                  <span className="text-[#243b63]">Miễn phí</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#4c5d77]">Giảm giá:</span>
                  <span className="text-[#ff4d4f]">
                    {formatAccessoryPrice(discount)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#edf1f5] pt-6">
                <span className="text-[22px] font-bold text-[#243b63]">
                  Tổng cộng:
                </span>
                <span className="text-[22px] font-bold text-[#ff4d4f]">
                  {formatAccessoryPrice(total)}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-[10px] bg-[#f5fbf7] px-4 py-4 text-[15px] text-[#4c5d77]">
                <ShieldCheck size={18} className="text-[#15a05a]" />
                Thông tin của bạn được bảo mật tuyệt đối
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}