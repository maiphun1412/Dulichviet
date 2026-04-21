"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { MapPin, Star } from "lucide-react";

import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import {
  getHotelBySlug,
  formatHotelPrice,
  type HotelItem as BaseHotelItem,
} from "@/lib/hotel-data";
import HeaderTop from "@/components/HeaderTop";

type HotelRoom = {
  id: string;
  name: string;
  image?: string;
  shortName?: string;
  areaText?: string;
  bedText?: string;
  guestText?: string;
  childPolicyText?: string;
  priceLabel?: string;
  prices?: {
    bb?: string;
    bbvs?: string;
    fb?: string;
    fbvs?: string;
  };
};

type HotelItem = BaseHotelItem & {
  city?: string;
  area?: string;
  addressText?: string;
  ratingScore?: number;
  ratingText?: string;
  reviewCount?: number;
  rooms?: HotelRoom[];
};

type BookingForm = {
  gender: "Nam" | "Nữ";
  fullName: string;
  phone: string;
  email: string;
  note: string;
  paymentMethod: "VNPAY" | "MOMO";
};

function HotelStars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          className={
            index < count
              ? "fill-[#f6b400] text-[#f6b400]"
              : "fill-[#d9d9d9] text-[#d9d9d9]"
          }
        />
      ))}
    </div>
  );
}

function getDisplayLocation(hotel: HotelItem) {
  if (hotel.addressText?.trim()) return hotel.addressText;
  return [hotel.area, hotel.city].filter(Boolean).join(", ");
}

function getRoomPriceNumber(room?: HotelRoom) {
  if (!room?.prices) return 0;

  const raw =
    room.prices.bb ||
    room.prices.bbvs ||
    room.prices.fb ||
    room.prices.fbvs ||
    "";

  const num = Number(String(raw).replace(/[^\d]/g, ""));
  return Number.isNaN(num) ? 0 : num;
}

function getRoomPriceText(room?: HotelRoom) {
  if (!room) return "Liên hệ";
  const num = getRoomPriceNumber(room);
  if (!num) return "Liên hệ";
  return formatHotelPrice(num);
}

export default function HotelBookingPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const roomId = searchParams.get("roomId") || "";

  const [hotel, setHotel] = useState<HotelItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [coupon, setCoupon] = useState("");

  const [form, setForm] = useState<BookingForm>({
    gender: "Nam",
    fullName: "",
    phone: "",
    email: "",
    note: "",
    paymentMethod: "VNPAY",
  });

  useEffect(() => {
    let mounted = true;

    async function loadHotel() {
      try {
        setIsLoading(true);
        const data = await getHotelBySlug(slug || "");

        if (!mounted) return;
        setHotel((data as HotelItem) || null);
      } catch (error) {
        console.error("Lỗi tải trang đặt phòng:", error);
        if (!mounted) return;
        setHotel(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    if (slug) loadHotel();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const selectedRoom = useMemo(() => {
    if (!hotel?.rooms?.length) return null;
    return hotel.rooms.find((room) => room.id === roomId) || hotel.rooms[0];
  }, [hotel, roomId]);

  const roomPrice = useMemo(() => getRoomPriceNumber(selectedRoom || undefined), [selectedRoom]);
  const totalPrice = useMemo(() => roomPrice * 2 || roomPrice, [roomPrice]);

  const handleChange = (field: keyof BookingForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("BOOKING SUBMIT", {
      hotelSlug: hotel?.slug,
      hotelName: hotel?.name,
      roomId: selectedRoom?.id,
      roomName: selectedRoom?.name,
      coupon,
      totalPrice,
      ...form,
    });

    alert("Đã nhận thông tin đặt phòng. Bước sau nối API/Firebase nha.");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
         <HeaderTop />
        <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-10 text-[18px] text-[#666]">
          Đang tải thông tin đặt phòng...
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-10">
          <div className="text-[28px] font-bold text-[#222]">Không tìm thấy khách sạn</div>
          <Link
            href="/khach-san/tim-kiem"
            className="mt-4 inline-block text-[#ec008c]"
          >
            Quay lại trang tìm kiếm
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#222]">
      <MainHeader />

      <main>
        <section className="border-t border-[#e5e5e5] bg-[#f1f3f5] py-[12px]">
          <div className="mx-auto max-w-[1180px] px-4 text-[13px] text-[#7b7b7b]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-[6px]">&gt;</span>
            <span>Đặt Khách Sạn</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_350px]">
            {/* LEFT FORM */}
            <form
              onSubmit={handleSubmit}
              className="rounded-[4px] border border-[#cfcfcf] bg-white px-[16px] py-[14px]"
            >
              <h2 className="text-[18px] font-bold text-[#ec008c]">
                Thông tin người đặt
              </h2>
              <p className="mt-1 text-[13px] text-[#666]">
                Vui lòng điền đầy đủ thông tin
              </p>

              <div className="mt-5 grid grid-cols-[90px_1fr] items-center gap-x-3 gap-y-3">
                <div className="text-[15px] text-[#444]">Giới tính</div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-[15px] text-[#444]">
                    <input
                      type="radio"
                      name="gender"
                      checked={form.gender === "Nam"}
                      onChange={() => handleChange("gender", "Nam")}
                      className="h-[20px] w-[20px] accent-[#ec008c]"
                    />
                    <span>Nam</span>
                  </label>

                  <label className="flex items-center gap-2 text-[15px] text-[#444]">
                    <input
                      type="radio"
                      name="gender"
                      checked={form.gender === "Nữ"}
                      onChange={() => handleChange("gender", "Nữ")}
                      className="h-[20px] w-[20px] accent-[#ec008c]"
                    />
                    <span>Nữ</span>
                  </label>
                </div>

                <div className="text-[15px] text-[#444]">Họ và tên</div>
                <input
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="h-[32px] rounded-[2px] border border-[#cfcfcf] px-3 text-[14px] outline-none focus:border-[#ec008c]"
                />

                <div className="text-[15px] text-[#444]">Điện thoại</div>
                <input
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="h-[32px] rounded-[2px] border border-[#cfcfcf] px-3 text-[14px] outline-none focus:border-[#ec008c]"
                />

                <div className="text-[15px] text-[#444]">Email</div>
                <input
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="h-[32px] rounded-[2px] border border-[#cfcfcf] px-3 text-[14px] outline-none focus:border-[#ec008c]"
                />

                <div className="self-start pt-2 text-[15px] text-[#444]">Ghi chú</div>
                <textarea
                  value={form.note}
                  onChange={(e) => handleChange("note", e.target.value)}
                  rows={4}
                  className="rounded-[2px] border border-[#cfcfcf] px-3 py-2 text-[14px] outline-none focus:border-[#ec008c]"
                />
              </div>

              <div className="mt-5">
                <h3 className="text-[16px] font-bold text-[#ec008c]">
                  Phương thức thanh toán
                </h3>

                <div className="mt-4 space-y-3">
                  <label className="flex items-center gap-2 text-[15px] text-[#444]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={form.paymentMethod === "VNPAY"}
                      onChange={() => handleChange("paymentMethod", "VNPAY")}
                      className="h-[18px] w-[18px] accent-[#ec008c]"
                    />
                    <span>Thanh toán qua VNPAY</span>
                  </label>

                  <label className="flex items-center gap-2 text-[15px] text-[#444]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={form.paymentMethod === "MOMO"}
                      onChange={() => handleChange("paymentMethod", "MOMO")}
                      className="h-[18px] w-[18px] accent-[#ec008c]"
                    />
                    <span>Thanh toán qua ví MOMO</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="h-[52px] w-[210px] rounded-[4px] bg-[#d61d8c] text-[18px] font-bold text-white transition hover:bg-[#c0177e]"
                >
                  ĐẶT PHÒNG
                </button>
              </div>
            </form>

            {/* RIGHT SUMMARY */}
            <aside className="rounded-[6px] border border-[#d6d6d6] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <h3 className="text-[18px] font-bold leading-[1.25] text-[#ec008c]">
                {selectedRoom?.name || hotel.name}
              </h3>

              <div className="mt-2">
                <HotelStars count={hotel.stars} />
              </div>

              <div className="mt-2 flex items-start gap-2 text-[14px] leading-6 text-[#666]">
                <MapPin size={14} className="mt-[4px] shrink-0" />
                <span>{getDisplayLocation(hotel)}</span>
              </div>

              <div className="mt-3 space-y-2 text-[15px] text-[#444]">
                <div>Thứ 3, 28/04/2026 → Thứ 5, 30/04/2026 - 2 đêm</div>
                <div>{selectedRoom?.name || "1 Phòng Suite Deluxe"} - Không bao gồm ăn sáng</div>
                <div>2 người lớn - 0 trẻ em</div>
                <div className="text-[#777]">! Không hoàn huỷ hoặc thay đổi</div>
              </div>

              <div className="mt-5 border-t border-[#d7d7d7] pt-4">
                <div className="grid grid-cols-[88px_1fr_60px] overflow-hidden rounded-[2px] border border-[#d7d7d7]">
                  <div className="flex items-center px-3 text-[15px] font-bold text-[#333]">
                    Mã giảm giá
                  </div>
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Mã giảm giá"
                    className="h-[38px] border-l border-r border-[#d7d7d7] px-3 text-[14px] outline-none"
                  />
                  <button
                    type="button"
                    className="bg-[#ec008c] text-[14px] font-bold text-white"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>

              <div className="mt-7 border-t border-[#d7d7d7] pt-5">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[16px] font-bold text-[#222]">Tổng tiền</div>
                    <div className="mt-1 text-[14px] italic text-[#888]">
                      Giá đã bao gồm thuế phí
                    </div>
                  </div>

                  <div className="text-[18px] font-bold text-[#ec008c]">
                    {formatHotelPrice(totalPrice)}
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