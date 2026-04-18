"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BedDouble,
  CalendarDays,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react";

import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import {
  formatHotelPrice,
  getAllHotels,
  type HotelItem as BaseHotelItem,
} from "@/lib/hotel-data";

type HotelItem = BaseHotelItem & {
  addressText?: string;
  area?: string;
  city?: string;
};

function HotelStars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={15}
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

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getDisplayLocation(hotel: HotelItem) {
  if (hotel.addressText?.trim()) return hotel.addressText;
  const parts = [hotel.area, hotel.city].filter(Boolean);
  return parts.length ? parts.join(", ") : "Đang cập nhật";
}

function getDisplayArea(hotel: HotelItem) {
  return hotel.area?.trim() || hotel.city?.trim() || "Khác";
}

function getRoomTitle(hotel: HotelItem) {
  if (hotel.rooms?.length) {
    return hotel.rooms[0]?.name || "Phòng đang cập nhật";
  }
  return "Phòng đang cập nhật";
}

function getRoomSubText(hotel: HotelItem) {
  if (hotel.contactText) return "Liên hệ để biết chi tiết";
  return "Gồm ăn sáng";
}

function getReviewLabel(score?: number) {
  const value = Number(score || 0);
  if (value >= 9) return "Trên cả tuyệt vời";
  if (value >= 8) return "Xuất sắc";
  if (value >= 7) return "Rất tốt";
  if (value >= 6) return "Hài lòng";
  return "Đánh giá";
}

function getTopAmenities(hotel: HotelItem) {
  return (hotel.amenities || []).slice(0, 5);
}

export default function HotelSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allHotels, setAllHotels] = useState<HotelItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [destination, setDestination] = useState(
  searchParams.get("destination") || "Nha Trang"
);
  const [checkIn, setCheckIn] = useState(
    searchParams.get("checkIn") || "2026-04-27"
  );
  const [checkOut, setCheckOut] = useState(
    searchParams.get("checkOut") || "2026-04-29"
  );
  const [adults, setAdults] = useState(
    Number(searchParams.get("adults") || 2)
  );
  const [rooms, setRooms] = useState(Number(searchParams.get("rooms") || 1));

  const [hotelKeyword, setHotelKeyword] = useState("");
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedReviewLevels, setSelectedReviewLevels] = useState<string[]>(
    []
  );
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadHotels() {
      try {
        setIsLoading(true);
        const data = (await getAllHotels()) as HotelItem[];

        if (!mounted) return;
        setAllHotels(data);
      } catch (error) {
        console.error("Lỗi tải danh sách khách sạn:", error);
        if (!mounted) return;
        setAllHotels([]);
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
const filteredByDestination = useMemo(() => {
  const destinationText = normalizeText(destination);

  if (!destinationText) return allHotels;

  const destinationCore = destinationText.split("-")[0].trim();

  return allHotels.filter((hotel) => {
    const haystack = normalizeText(
      [hotel.name, hotel.city, hotel.area, hotel.addressText]
        .filter(Boolean)
        .join(" ")
    );

    return (
      haystack.includes(destinationText) ||
      haystack.includes(destinationCore)
    );
  });
}, [allHotels, destination]);

  const areaOptions = useMemo(() => {
    const uniqueAreas = Array.from(
      new Set(filteredByDestination.map((hotel) => getDisplayArea(hotel)))
    );
    return uniqueAreas.sort((a, b) => a.localeCompare(b, "vi"));
  }, [filteredByDestination]);

  const filteredHotels = useMemo(() => {
    const keyword = normalizeText(hotelKeyword);

    return filteredByDestination.filter((hotel) => {
      const matchKeyword =
        !keyword ||
        normalizeText(hotel.name).includes(keyword) ||
        normalizeText(hotel.addressText || "").includes(keyword) ||
        normalizeText(hotel.area || "").includes(keyword) ||
        normalizeText(hotel.city || "").includes(keyword);

      const matchStars =
        selectedStars.length === 0 || selectedStars.includes(hotel.stars || 0);

      const reviewScore = Number(hotel.ratingScore || 0);
      const matchReview =
        selectedReviewLevels.length === 0 ||
        selectedReviewLevels.some((level) => {
          if (level === "9+") return reviewScore >= 9;
          if (level === "8+") return reviewScore >= 8 && reviewScore < 9;
          if (level === "7+") return reviewScore >= 7 && reviewScore < 8;
          if (level === "6+") return reviewScore >= 6 && reviewScore < 7;
          return false;
        });

      const area = getDisplayArea(hotel);
      const matchArea =
        selectedAreas.length === 0 || selectedAreas.includes(area);

      return matchKeyword && matchStars && matchReview && matchArea;
    });
  }, [
    filteredByDestination,
    hotelKeyword,
    selectedStars,
    selectedReviewLevels,
    selectedAreas,
  ]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    params.set("destination", destination);
    params.set("checkIn", checkIn);
    params.set("checkOut", checkOut);
    params.set("adults", String(adults));
    params.set("rooms", String(rooms));

    router.push(`/khach-san/tim-kiem?${params.toString()}`);
  };

  const toggleStar = (value: number) => {
    setSelectedStars((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value].sort((a, b) => b - a)
    );
  };

  const toggleReviewLevel = (value: string) => {
    setSelectedReviewLevels((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleArea = (value: string) => {
    setSelectedAreas((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

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
            <span>Tìm Kiếm Khách Sạn</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-4">
          <div className="rounded-[4px] bg-[#f1f1f1] p-[12px]">
            <div className="grid gap-[10px] lg:grid-cols-[1.2fr_0.92fr_0.92fr_0.92fr_0.72fr]">
              <div className="flex h-[54px] items-center gap-3 rounded-[4px] bg-white px-4">
                <MapPin size={18} className="text-[#666]" />
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Bạn muốn đi đâu?"
                  className="w-full border-0 bg-transparent text-[15px] text-[#333] outline-none"
                />
              </div>

              <div className="flex h-[54px] items-center gap-3 rounded-[4px] bg-white px-4 text-[#444]">
                <CalendarDays size={18} className="text-[#666]" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border-0 bg-transparent text-[15px] font-medium outline-none"
                />
              </div>

              <div className="flex h-[54px] items-center gap-3 rounded-[4px] bg-white px-4 text-[#444]">
                <CalendarDays size={18} className="text-[#666]" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border-0 bg-transparent text-[15px] font-medium outline-none"
                />
              </div>

              <div className="flex h-[54px] items-center gap-3 rounded-[4px] bg-white px-4 text-[#444]">
                <Users size={18} className="text-[#666]" />
                <div className="grid w-full grid-cols-2 gap-2">
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="border-0 bg-transparent text-[15px] font-medium outline-none"
                  >
                    <option value={1}>1 người lớn</option>
                    <option value={2}>2 người lớn</option>
                    <option value={3}>3 người lớn</option>
                    <option value={4}>4 người lớn</option>
                  </select>

                  <select
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="border-0 bg-transparent text-[15px] font-medium outline-none"
                  >
                    <option value={1}>1 phòng</option>
                    <option value={2}>2 phòng</option>
                    <option value={3}>3 phòng</option>
                    <option value={4}>4 phòng</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="h-[54px] rounded-[4px] bg-[#ec008c] text-[18px] font-bold text-white transition hover:bg-[#d1007c]"
              >
                Tìm phòng
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[250px_1fr]">
            <aside className="border border-[#dddddd] bg-[#f7f7f7] p-3">
              <div className="relative">
                <input
                  value={hotelKeyword}
                  onChange={(e) => setHotelKeyword(e.target.value)}
                  placeholder="Nhập tên khách sạn"
                  className="h-[38px] w-full rounded-[3px] border border-[#d9d9d9] bg-white px-3 pr-10 text-[14px] outline-none focus:border-[#ec008c]"
                />
                <Search
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777]"
                />
              </div>

              <div className="mt-5 border-t border-[#e4e4e4] pt-4">
                <h3 className="mb-3 text-[15px] font-bold text-[#333]">
                  Hạng sao
                </h3>

                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label
                      key={star}
                      className="flex cursor-pointer items-center gap-2 text-[14px] text-[#444]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStars.includes(star)}
                        onChange={() => toggleStar(star)}
                        className="h-[16px] w-[16px]"
                      />
                      <div className="flex items-center gap-[2px]">
                        {Array.from({ length: star }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={14}
                            className="fill-[#f6b400] text-[#f6b400]"
                          />
                        ))}
                      </div>
                    </label>
                  ))}

                  <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#444]">
                    <input
                      type="checkbox"
                      checked={selectedStars.length === 0}
                      onChange={() => setSelectedStars([])}
                      className="h-[16px] w-[16px]"
                    />
                    <span>Chưa xếp hạng</span>
                  </label>
                </div>
              </div>

              <div className="mt-5 border-t border-[#e4e4e4] pt-4">
                <h3 className="mb-3 text-[15px] font-bold text-[#333]">
                  Đánh giá của khách hàng
                </h3>

                <div className="space-y-2">
                  <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#444]">
                    <input
                      type="checkbox"
                      checked={selectedReviewLevels.includes("9+")}
                      onChange={() => toggleReviewLevel("9+")}
                      className="h-[16px] w-[16px]"
                    />
                    <span>9+ Trên cả tuyệt vời</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#444]">
                    <input
                      type="checkbox"
                      checked={selectedReviewLevels.includes("8+")}
                      onChange={() => toggleReviewLevel("8+")}
                      className="h-[16px] w-[16px]"
                    />
                    <span>8+ Xuất sắc</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#444]">
                    <input
                      type="checkbox"
                      checked={selectedReviewLevels.includes("7+")}
                      onChange={() => toggleReviewLevel("7+")}
                      className="h-[16px] w-[16px]"
                    />
                    <span>7+ Rất tốt</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#444]">
                    <input
                      type="checkbox"
                      checked={selectedReviewLevels.includes("6+")}
                      onChange={() => toggleReviewLevel("6+")}
                      className="h-[16px] w-[16px]"
                    />
                    <span>6+ Hài lòng</span>
                  </label>
                </div>
              </div>

              <div className="mt-5 border-t border-[#e4e4e4] pt-4">
                <h3 className="mb-3 text-[15px] font-bold text-[#333]">
                  Khu vực
                </h3>

                <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
                  {areaOptions.map((area) => (
                    <label
                      key={area}
                      className="flex cursor-pointer items-center gap-2 text-[14px] text-[#444]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes(area)}
                        onChange={() => toggleArea(area)}
                        className="h-[16px] w-[16px]"
                      />
                      <span>{area}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            <section>
              {isLoading ? (
                <div className="rounded-[4px] border border-[#dddddd] bg-white p-8 text-center text-[16px] text-[#666]">
                  Đang tải dữ liệu...
                </div>
              ) : filteredHotels.length === 0 ? (
                <div className="rounded-[4px] border border-[#dddddd] bg-white p-8 text-center text-[16px] text-[#666]">
                  Không tìm thấy khách sạn phù hợp.
                </div>
              ) : (
                <div className="space-y-[16px]">
                  {filteredHotels.map((hotel) => (
                    <Link
                      key={hotel.id}
                     href={`/khach-san/chi-tiet/${hotel.slug}`}
                      className="grid gap-4 border border-[#d6d6d6] bg-white p-[10px] transition hover:shadow-sm lg:grid-cols-[215px_1fr_170px]"
                    >
                      <div className="relative h-[145px] overflow-hidden">
                        <Image
                          src={hotel.thumbnail}
                          alt={hotel.name}
                          fill
                          sizes="215px"
                          className="object-cover"
                        />

                        <div className="absolute left-0 top-0 bg-[#ec008c] px-2 py-[4px] text-[12px] font-semibold text-white">
                          Miễn phí bữa sáng
                        </div>
                      </div>

                      <div>
                        <h2 className="text-[22px] font-semibold leading-[1.15] text-[#222]">
                          {hotel.name}
                        </h2>

                        <div className="mt-[8px] flex flex-wrap items-center gap-2 text-[14px]">
                          <HotelStars count={hotel.stars} />

                          <span className="rounded bg-[#8bc34a] px-[6px] py-[1px] text-[13px] font-semibold text-white">
                            {hotel.ratingScore || 8.5}
                          </span>

                          <span className="text-[14px] text-[#8bc34a]">
                            {hotel.ratingText || getReviewLabel(hotel.ratingScore)}
                          </span>

                          <span className="text-[#777]">
                            | {hotel.reviewCount || 0} đánh giá
                          </span>
                        </div>

                        <div className="mt-[6px] text-[14px] text-[#ec008c]">
                          {getDisplayLocation(hotel)}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {getTopAmenities(hotel).map((item) => (
                            <span
                              key={item}
                              className="rounded-[4px] border border-[#d8d8d8] bg-white px-[10px] py-[6px] text-[13px] text-[#555]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right">
                          <div className="text-[22px] font-bold text-[#ec008c]">
                            {hotel.contactText || formatHotelPrice(hotel.priceFrom)}
                          </div>
                        </div>

                        <div className="w-full rounded-[4px] bg-[#eef2f6] px-3 py-3 text-left">
                          <div className="line-clamp-1 text-[13px] font-bold text-[#114a8b]">
                            {getRoomTitle(hotel)}
                          </div>

                          <div className="mt-1 flex items-center gap-1 text-[13px] text-[#444]">
                            <BedDouble size={13} />
                            <span>{getRoomSubText(hotel)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}