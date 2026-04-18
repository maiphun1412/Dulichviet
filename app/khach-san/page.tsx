"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MapPin, Users, CalendarDays, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import {
  getFeaturedHotels,
  getPromotionHotels,
  type HotelItem,
  formatHotelPrice,
} from "@/lib/hotel-data";

function HotelStars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`text-[16px] leading-none ${
            index < count ? "text-[#f6b400]" : "text-[#d1d5db]"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function HotelCard({
  hotel,
  priority = false,
}: {
  hotel: HotelItem;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/khach-san/${hotel.slug}`}
      className="group block min-w-[320px] max-w-[320px] overflow-hidden rounded-[2px] bg-white"
    >
      <div className="relative h-[218px] w-full overflow-hidden">
        <Image
          src={hotel.thumbnail}
          alt={hotel.name}
          fill
          priority={priority}
          sizes="320px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-x-0 bottom-0 h-[84px] bg-gradient-to-t from-[rgba(0,0,0,0.78)] via-[rgba(0,0,0,0.45)] to-transparent" />

        <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
          <div className="mb-2 flex justify-center">
            <HotelStars count={hotel.stars} />
          </div>

          <h3 className="line-clamp-1 text-center text-[17px] font-extrabold uppercase leading-[1.15] text-white">
            {hotel.name}
          </h3>

          <div className="mt-2 text-center text-[15px] leading-none text-white/85">
            Giá từ{" "}
            <span className="text-[18px] font-extrabold text-[#ffd400]">
              {hotel.contactText
                ? hotel.contactText
                : formatHotelPrice(hotel.priceFrom)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SectionRow({
  title,
  hotels,
  viewAllHref = "/khach-san/tim-kiem",
}: {
  title: string;
  hotels: HotelItem[];
  viewAllHref?: string;
}) {
  if (!hotels.length) return null;

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[28px] font-semibold leading-none text-[#222]">
          {title}
        </h2>

        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-[15px] text-[#666] transition hover:text-[#e5007d]"
        >
          <span className="text-[#e5007d]">◩</span>
          <span>Xem tất cả</span>
        </Link>
      </div>

      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max gap-4">
          {hotels.map((hotel, index) => (
            <HotelCard key={hotel.id} hotel={hotel} priority={index < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

const destinationOptions = [
  "Phan Thiết - Việt Nam",
  "Nha Trang - Việt Nam",
  "Đà Lạt - Việt Nam",
  "Phú Quốc - Việt Nam",
  "Đà Nẵng - Việt Nam",
  "Vũng Tàu - Việt Nam",
];

export default function HotelLandingPage() {
  const [promotionHotels, setPromotionHotels] = useState<HotelItem[]>([]);
  const [featuredHotels, setFeaturedHotels] = useState<HotelItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [destination, setDestination] = useState("Phan Thiết - Việt Nam");
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [checkIn, setCheckIn] = useState("2026-04-27");
  const [checkOut, setCheckOut] = useState("2026-04-29");

  const router = useRouter();

  const handleSearchRoom = () => {
    const params = new URLSearchParams();

    params.set("destination", destination);
    params.set("checkIn", checkIn);
    params.set("checkOut", checkOut);
    params.set("adults", String(adults));
    params.set("rooms", String(rooms));

    router.push(`/khach-san/tim-kiem?${params.toString()}`);
  };

  useEffect(() => {
    let mounted = true;

    async function loadHotels() {
      try {
        setIsLoading(true);

        const [promotionData, featuredData] = await Promise.all([
          getPromotionHotels(),
          getFeaturedHotels(),
        ]);

        if (!mounted) return;

        setPromotionHotels(promotionData);
        setFeaturedHotels(featuredData);
      } catch (error) {
        console.error("Lỗi tải dữ liệu khách sạn:", error);

        if (!mounted) return;
        setPromotionHotels([]);
        setFeaturedHotels([]);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadHotels();

    return () => {
      mounted = false;
    };
  }, []);

  const totalReview = useMemo(() => {
    const all = [...promotionHotels, ...featuredHotels];
    return all.reduce((sum, item) => sum + (item.reviewCount || 0), 0);
  }, [promotionHotels, featuredHotels]);

  return (
    <div className="min-h-screen bg-white text-[#222]">
      <MainHeader />

      <main>
        <section className="relative h-[430px] w-full overflow-hidden">
          <img
            src="/hotel-banner.png"
            alt="Banner khách sạn"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[rgba(8,30,78,0.24)]" />

          <div className="absolute inset-0 hidden lg:block">
            <div className="absolute right-[24px] top-[82px] w-[672px]">
              <h2 className="mb-[16px] text-center text-[32px] font-extrabold leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                Trải nghiệm kỳ nghỉ tuyệt vời
              </h2>

              <div className="grid grid-cols-[1.1fr_0.76fr] gap-x-[14px] gap-y-[12px]">
                <div className="relative">
                  <MapPin
                    size={20}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#6b6b6b]"
                  />
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="h-[60px] w-full appearance-none rounded-[4px] bg-white pl-12 pr-10 text-[16px] font-medium text-[#444] shadow-[0_2px_8px_rgba(0,0,0,0.08)] outline-none"
                  >
                    {destinationOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7b7b7b]"
                  />
                </div>

                <div className="relative">
                  <Users
                    size={20}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#6b6b6b]"
                  />
                  <div className="grid h-[60px] grid-cols-2 rounded-[4px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="appearance-none bg-transparent pl-12 pr-3 text-[14px] font-medium text-[#444] outline-none"
                    >
                      <option value={1}>1 người lớn</option>
                      <option value={2}>2 người lớn</option>
                      <option value={3}>3 người lớn</option>
                      <option value={4}>4 người lớn</option>
                    </select>

                    <select
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      className="appearance-none bg-transparent px-3 text-[14px] font-medium text-[#444] outline-none"
                    >
                      <option value={1}>1 phòng</option>
                      <option value={2}>2 phòng</option>
                      <option value={3}>3 phòng</option>
                      <option value={4}>4 phòng</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-[14px]">
                  <div className="relative">
                    <CalendarDays
                      size={18}
                      strokeWidth={2}
                      className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#6b6b6b]"
                    />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="h-[58px] w-full rounded-[4px] bg-white pl-12 pr-4 text-[15px] font-medium text-[#444] shadow-[0_2px_8px_rgba(0,0,0,0.08)] outline-none"
                    />
                  </div>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      strokeWidth={2}
                      className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#6b6b6b]"
                    />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="h-[58px] w-full rounded-[4px] bg-white pl-12 pr-4 text-[15px] font-medium text-[#444] shadow-[0_2px_8px_rgba(0,0,0,0.08)] outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSearchRoom}
                  className="h-[58px] rounded-[4px] bg-[#ec008c] text-[18px] font-bold text-white transition hover:bg-[#d6007f]"
                >
                  Tìm phòng
                </button>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-4 bottom-4 lg:hidden">
            <div className="rounded-[8px] bg-white/95 p-4 shadow-lg backdrop-blur">
              <h2 className="mb-4 text-center text-[24px] font-extrabold text-[#222]">
                Trải nghiệm kỳ nghỉ tuyệt vời
              </h2>

              <div className="space-y-3">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-[48px] w-full rounded-[6px] border border-[#ddd] px-3 text-[15px] outline-none"
                >
                  {destinationOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="h-[48px] rounded-[6px] border border-[#ddd] px-3 text-[15px] outline-none"
                  >
                    <option value={1}>1 người lớn</option>
                    <option value={2}>2 người lớn</option>
                    <option value={3}>3 người lớn</option>
                    <option value={4}>4 người lớn</option>
                  </select>

                  <select
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="h-[48px] rounded-[6px] border border-[#ddd] px-3 text-[15px] outline-none"
                  >
                    <option value={1}>1 phòng</option>
                    <option value={2}>2 phòng</option>
                    <option value={3}>3 phòng</option>
                    <option value={4}>4 phòng</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="h-[48px] rounded-[6px] border border-[#ddd] px-3 text-[15px] outline-none"
                  />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="h-[48px] rounded-[6px] border border-[#ddd] px-3 text-[15px] outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSearchRoom}
                  className="h-[50px] w-full rounded-[6px] bg-[#ec008c] text-[17px] font-bold text-white"
                >
                  Tìm phòng
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-10">
          <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-[#666]">
            <span>Tổng khách sạn nổi bật: {featuredHotels.length}</span>
            <span>Khuyến mãi: {promotionHotels.length}</span>
            <span>Tổng đánh giá: {totalReview}</span>
          </div>

          {isLoading ? (
            <div className="py-10 text-[18px] text-[#666]">
              Đang tải dữ liệu...
            </div>
          ) : (
            <>
              <SectionRow title="Khách sạn khuyến mãi" hotels={promotionHotels} />
              <SectionRow title="Khách sạn nổi bật" hotels={featuredHotels} />
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}