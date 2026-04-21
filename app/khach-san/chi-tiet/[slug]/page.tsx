"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { AlertCircle, MapPin, Star } from "lucide-react";

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
          size={12}
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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-[7px] text-[13px] font-medium text-[#555]">
      {children}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-[36px] rounded-[5px] border border-[#d9d9d9] bg-white px-3 text-[10px] text-[#222] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#ec008c] focus:shadow-[0_0_0_3px_rgba(236,0,140,0.08)] ${props.className || ""}`}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`rounded-[5px] border border-[#d9d9d9] bg-white px-3 py-2 text-[10px] text-[#222] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#ec008c] focus:shadow-[0_0_0_3px_rgba(236,0,140,0.08)] ${props.className || ""}`}
    />
  );
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

  const roomPrice = useMemo(
    () => getRoomPriceNumber(selectedRoom || undefined),
    [selectedRoom]
  );
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

    alert("Đã nhận thông tin đặt phòng.");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
         <HeaderTop />
        <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-10 text-[16px] text-[#666]">
          Đang tải thông tin đặt phòng...
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-10">
          <div className="text-[24px] font-bold text-[#222]">
            Không tìm thấy khách sạn
          </div>
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
    <div className="min-h-screen bg-[#fafafa] text-[#222]">
      <MainHeader />

      <main>
        <section className="border-t border-[#e5e5e5] bg-[#f1f3f5] py-[12px]">
          <div className="mx-auto max-w-[1180px] px-4 text-[12px] text-[#7b7b7b]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-[6px]">&gt;</span>
            <span>Đặt Khách Sạn</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
            <form
              onSubmit={handleSubmit}
              className="rounded-[8px] border border-[#dddddd] bg-white px-5 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            >
              <div>
                <h2 className="text-[13px] font-bold text-[#ec008c]">
                  Thông tin người đặt
                </h2>
                <p className="mt-1 text-[12px] text-[#777]">
                  Vui lòng điền đầy đủ thông tin
                </p>
              </div>

              <div className="mt-5 grid grid-cols-[90px_1fr] gap-x-3 gap-y-3">
                <FieldLabel>Giới tính</FieldLabel>

                <div className="flex items-center gap-5 pt-[4px]">
                  <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#333]">
                    <input
                      type="radio"
                      name="gender"
                      checked={form.gender === "Nam"}
                      onChange={() => handleChange("gender", "Nam")}
                      className="h-[14px] w-[16px] accent-[#ec008c]"
                    />
                    <span>Nam</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#333]">
                    <input
                      type="radio"
                      name="gender"
                      checked={form.gender === "Nữ"}
                      onChange={() => handleChange("gender", "Nữ")}
                      className="h-[14px] w-[16px] accent-[#ec008c]"
                    />
                    <span>Nữ</span>
                  </label>
                </div>

                <FieldLabel>Họ và tên</FieldLabel>
                <TextInput
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />

                <FieldLabel>Điện thoại</FieldLabel>
                <TextInput
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />

                <FieldLabel>Email</FieldLabel>
                <TextInput
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />

                <FieldLabel>Ghi chú</FieldLabel>
                <TextArea
                  value={form.note}
                  onChange={(e) => handleChange("note", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="mt-7">
                <h3 className="text-[15px] font-bold text-[#ec008c]">
                  Phương thức thanh toán
                </h3>

                <div className="mt-3 space-y-3">
                  <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#333]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={form.paymentMethod === "VNPAY"}
                      onChange={() => handleChange("paymentMethod", "VNPAY")}
                      className="h-[14px] w-[16px] accent-[#ec008c]"
                    />
                    <span>Thanh toán qua VNPAY</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#333]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={form.paymentMethod === "MOMO"}
                      onChange={() => handleChange("paymentMethod", "MOMO")}
                      className="h-[16px] w-[16px] accent-[#ec008c]"
                    />
                    <span>Thanh toán qua ví MOMO</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="h-[50px] min-w-[210px] rounded-[6px] bg-[#d61d8c] px-8 text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(214,29,140,0.2)] transition hover:translate-y-[-1px] hover:bg-[#c0177e]"
                >
                  ĐẶT PHÒNG
                </button>
              </div>
            </form>

            <aside className="h-fit rounded-[8px] border border-[#dddddd] bg-white p-4 shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
              <h3 className="text-[15px] font-bold leading-[1.35] text-[#ec008c]">
                {selectedRoom?.name || hotel.name}
              </h3>

              <div className="mt-2">
                <HotelStars count={hotel.stars} />
              </div>

              <div className="mt-2 flex items-start gap-2 text-[12px] leading-5 text-[#666]">
                <MapPin size={13} className="mt-[3px] shrink-0" />
                <span>{getDisplayLocation(hotel)}</span>
              </div>

              <div className="mt-4 space-y-2 text-[13px] leading-5 text-[#333]">
                <div>Thứ 3, 28/04/2026 → Thứ 5, 30/04/2026 - 2 đêm</div>
                <div>
                  {selectedRoom?.name || "1 Phòng Suite Deluxe"} - Không bao gồm ăn sáng
                </div>
                <div>2 người lớn - 0 trẻ em</div>

                <div className="flex items-center gap-2 text-[#7b7b7b]">
                  <AlertCircle size={14} />
                  <span>Không hoàn huỷ hoặc thay đổi</span>
                </div>
              </div>

              <div className="mt-5 border-t border-[#e3e3e3] pt-4">
                <div className="grid grid-cols-[90px_1fr_68px] overflow-hidden rounded-[6px] border border-[#d9d9d9]">
                  <div className="flex items-center bg-[#fafafa] px-3 text-[10px] font-semibold text-[#333]">
                    Mã giảm giá
                  </div>

                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Mã giảm giá"
                    className="h-[36px] border-x border-[#d9d9d9] px-3 text-[10px] outline-none placeholder:text-[#999]"
                  />

                  <button
                    type="button"
                    className="bg-[#ec008c] text-[10px] font-bold text-white transition hover:bg-[#d1007c]"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t border-[#e3e3e3] pt-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[14px] font-bold text-[#222]">
                      Tổng tiền
                    </div>
                    <div className="mt-1 text-[12px] italic text-[#8a8a8a]">
                      Giá đã bao gồm thuế phí
                    </div>
                  </div>

                  <div className="text-right text-[13px] font-extrabold text-[#ec008c]">
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