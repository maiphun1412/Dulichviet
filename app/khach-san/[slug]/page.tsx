"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Bath,
  Building2,
  Phone,
  PlaneTakeoff,
  Star,
  Tag,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";

import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import {
  formatHotelPrice,
  getHotelBySlug,
  type HotelItem,
  type HotelRelatedItem,
  type HotelRoom,
} from "@/lib/hotel-data";
import HeaderTop from "@/components/HeaderTop";

type TabKey = "overview" | "detail" | "policy" | "note";

function StarRating({
  value,
  max = 5,
  size = 15,
}: {
  value: number;
  max?: number;
  size?: number;
}) {
  const fullStars = Math.floor(value);

  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: max }).map((_, index) => {
        const active = index < fullStars;
        return (
          <Star
            key={index}
            size={size}
            className={
              active
                ? "fill-[#f5b301] text-[#f5b301]"
                : "fill-[#e5e7eb] text-[#d1d5db]"
            }
          />
        );
      })}
    </div>
  );
}

function HotelSidebar({
  hotel,
  onContact,
}: {
  hotel: HotelItem;
  onContact: () => void;
}) {
  const amenityItems = hotel.amenities?.slice(0, 4) || [];

  return (
    <aside className="w-full lg:w-[346px]">
      <div className="bg-[#f3f3f3] px-[28px] py-[18px]">
        <div className="mb-[10px] flex items-center">
          <div className="flex w-[112px] items-center gap-[8px] text-[14px] text-[#2f2f2f]">
            <Star size={14} className="fill-black text-black" />
            <span className="leading-none">Số sao</span>
          </div>

          <StarRating value={hotel.stars || 0} size={14} />
        </div>

        <div className="mb-[12px]">
          <div className="mb-[8px] flex items-center gap-[8px] text-[14px] text-[#2f2f2f]">
            <Building2 size={14} className="text-black" />
            <span>Trang thiết bị khách sạn</span>
          </div>

          <div className="space-y-[6px] pl-[23px] text-[13px] text-[#333]">
            {amenityItems.map((item) => {
              const lower = item.toLowerCase();

              let Icon = Wifi;
              if (lower.includes("bữa sáng") || lower.includes("ăn sáng")) {
                Icon = UtensilsCrossed;
              } else if (lower.includes("spa") || lower.includes("bồn tắm")) {
                Icon = Bath;
              } else if (
                lower.includes("sân bay") ||
                lower.includes("đưa đón")
              ) {
                Icon = PlaneTakeoff;
              } else if (lower.includes("wifi")) {
                Icon = Wifi;
              }

              return (
                <div
                  key={item}
                  className="flex items-center gap-[7px] leading-none"
                >
                  <Icon size={13} className="text-black" />
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-[12px] flex items-center">
          <div className="flex w-[112px] items-center gap-[8px] text-[14px] text-[#2f2f2f]">
            <Tag size={14} className="fill-black text-black" />
            <span className="leading-none">Giá từ</span>
          </div>

          <div className="text-[14px] leading-none text-[#3b3b3b]">
            {hotel.contactText || formatHotelPrice(hotel.priceFrom)}
          </div>
        </div>

 <Link
  href={`/khach-san/lien-he-khach-san/${hotel.slug}`}
  className="flex h-[36px] w-full items-center justify-center bg-[#e3138d] text-[15px] font-normal uppercase text-white transition hover:bg-[#cc0f7d]"
>
  LIÊN HỆ
</Link>
      </div>

      <div className="pt-[16px] text-[13px] leading-[1.75] text-[#555]">
        <div className="flex items-start gap-[8px]">
          <Phone size={13} className="mt-[4px] shrink-0 text-[#e3138d]" />
          <p>
            <span className="text-[#e3138d]">Tp. HCM:</span> (028) 7305 6789 -
            HOTLINE: 0902.976.588
          </p>
        </div>

        <div className="flex items-start gap-[8px]">
          <Phone size={13} className="mt-[4px] shrink-0 text-[#e3138d]" />
          <p>
            <span className="text-[#e3138d]">Hà Nội:</span> (024) 3512 3388 -
            HOTLINE: 0932.659.588
          </p>
        </div>
      </div>
    </aside>
  );
}

function RoomCard({
  room,
  hotelSlug,
}: {
  room: HotelRoom;
  hotelSlug: string;
}) {
  return (
    <div className="grid gap-5 rounded-[8px] bg-white p-4 lg:grid-cols-[250px_1fr_280px]">
      <div className="overflow-hidden rounded-[4px]">
        <Image
          src={room.image}
          alt={room.name}
          width={320}
          height={220}
          className="h-full w-full object-cover"
        />
      </div>

      <div>
        <h3 className="mb-3 text-[16px] font-bold uppercase text-[#333] underline">
          {room.name}
        </h3>

        <ul className="list-disc space-y-1.5 pl-5 text-[13px] leading-6 text-[#444]">
          {room.shortName ? <li>{room.shortName}</li> : null}
          {room.bedText ? <li>{room.bedText}</li> : null}
          {room.areaText ? <li>{room.areaText}</li> : null}
          {room.guestText ? <li>{room.guestText}</li> : null}
          {room.childPolicyText ? <li>{room.childPolicyText}</li> : null}
          <li>Trả ngay, thanh toán sau</li>
        </ul>
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <div className="mb-2 text-[15px] font-bold text-[#333]">
            • Giá phòng:
          </div>

          <div className="space-y-1.5 text-[13px] leading-6 text-[#444]">
            {room.prices.bb ? <div>BB – {room.prices.bb}</div> : null}
            {room.prices.bbvs ? <div>BBVS – {room.prices.bbvs}</div> : null}
            {room.prices.fb ? <div>FB – {room.prices.fb}</div> : null}
            {room.prices.fbvs ? <div>FBVS – {room.prices.fbvs}</div> : null}
          </div>
        </div>

<Link
  href={`/lien-he-khach-san/${hotelSlug}`}
  className="mt-4 flex h-[42px] items-center justify-center bg-[#ec008c] text-[15px] font-semibold text-white transition hover:bg-[#d1007c]"
>
  LIÊN HỆ
</Link>
      </div>
    </div>
  );
}

function RelatedHotelCard({ item }: { item: HotelRelatedItem }) {
  const href = `/khach-san/${item.id}`;

  return (
    <Link href={href} className="group block overflow-hidden">
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="mb-1 flex justify-center">
            <StarRating value={item.stars || 0} size={14} />
          </div>

          <div className="line-clamp-2 text-center text-[15px] font-extrabold uppercase leading-[1.2] text-white">
            {item.name}
          </div>

          <div className="mt-1 text-center text-[14px] text-white">
            Giá từ:{" "}
            <span className="text-[18px] font-extrabold text-[#ffe000]">
              {formatHotelPrice(item.priceFrom)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HotelDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [hotel, setHotel] = useState<HotelItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  useEffect(() => {
    let mounted = true;

    async function fetchHotel() {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await getHotelBySlug(slug);

        if (!mounted) return;
        setHotel(data);
      } catch (error) {
        console.error("Lỗi tải chi tiết khách sạn:", error);
        if (!mounted) return;
        setHotel(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchHotel();

    return () => {
      mounted = false;
    };
  }, [slug]);
const router = useRouter();
  const heroImage = useMemo(() => {
    if (!hotel) return "";
    return hotel.heroImages?.[0] || hotel.thumbnail || "";
  }, [hotel]);

  const tabClass = (key: TabKey) =>
    activeTab === key
      ? "border border-[#e3138d] bg-white text-[#444]"
      : "border border-transparent bg-transparent text-[#555]";

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
         <HeaderTop />
        
        <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-16 text-center text-[18px] text-[#666]">
          Đang tải dữ liệu khách sạn...
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-16 text-center">
          <h1 className="text-[28px] font-bold text-[#333]">
            Không tìm thấy khách sạn
          </h1>
          <Link
            href="/khach-san"
            className="mt-4 inline-block text-[15px] font-semibold text-[#e3138d]"
          >
            Quay lại danh sách khách sạn
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#222]">
      <MainHeader />

      <section className="border-t border-[#e5e7eb] bg-[#f5f6f8] py-3">
        <div className="mx-auto max-w-[1180px] px-4 text-[13px] text-[#777]">
          <Link href="/" className="hover:text-[#e5007d]">
            Trang Chủ
          </Link>
          <span className="mx-2">&gt;</span>
          <Link href="/khach-san" className="hover:text-[#e5007d]">
            Khách Sạn
          </Link>
          <span className="mx-2">&gt;</span>
          <span>{hotel.name}</span>
        </div>
      </section>

      <main className="mx-auto max-w-[1180px] px-4 py-10">
        <div className="mb-5 border-b border-[#e7e7e7] pb-5">
          <h1 className="text-[24px] font-bold uppercase text-[#2f2f2f]">
            {hotel.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[14px]">
            <span className="font-semibold">Đánh giá:</span>
            <StarRating value={hotel.ratingScore || 0} size={15} />
            <span className="font-semibold">
              {hotel.ratingText || `${hotel.ratingScore}/5`}
            </span>
            <span>trong</span>
            <span className="font-semibold">{hotel.reviewCount}</span>
            <span>Đánh giá</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_346px]">
          <div>
            <div className="overflow-hidden rounded-[6px] border border-[#e8e8e8]">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={hotel.name}
                  width={920}
                  height={540}
                  priority
                  className="h-auto w-full object-cover"
                />
              ) : (
                <div className="flex h-[420px] items-center justify-center bg-[#f3f4f6] text-[#888]">
                  Không có ảnh khách sạn
                </div>
              )}
            </div>
          </div>

          <HotelSidebar
  hotel={hotel}
  onContact={() => router.push(`/lien-he-khach-san/${hotel.slug}`)}
/>
        </div>

        {hotel.shortDescription ? (
          <div className="mt-8 rounded-[6px] bg-[#f1f3f5] px-5 py-4 text-[14px] italic font-semibold leading-8 text-[#333]">
            {hotel.shortDescription}
          </div>
        ) : null}

        <div className="mt-8">
          <div className="flex justify-center">
            <div className="flex flex-wrap items-end text-[14px] font-medium uppercase">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`px-5 py-[11px] transition ${tabClass("overview")}`}
              >
                {hotel.tabs?.overview || "Tổng quan"}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("detail")}
                className={`px-5 py-[11px] transition ${tabClass("detail")}`}
              >
                {hotel.tabs?.detail || "Chi tiết khách sạn"}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("policy")}
                className={`px-5 py-[11px] transition ${tabClass("policy")}`}
              >
                {hotel.tabs?.policy || "Chính sách"}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("note")}
                className={`px-5 py-[11px] transition ${tabClass("note")}`}
              >
                {hotel.tabs?.note || "Ghi chú"}
              </button>
            </div>
          </div>

          <div className="bg-[#f5f5f5] p-6 md:p-8">
            {activeTab === "overview" && (
              <div className="hotel-detail-html text-[14px] leading-8 text-[#3f3f3f]">
                {hotel.overviewHtml ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: hotel.overviewHtml }}
                  />
                ) : (
                  <div>{hotel.locationText || "Chưa có nội dung tổng quan."}</div>
                )}
              </div>
            )}

            {activeTab === "detail" && (
              <div className="space-y-4">
                {hotel.hotelDetailHtml ? (
                  <div
                    className="hotel-detail-html text-[14px] leading-8 text-[#3f3f3f]"
                    dangerouslySetInnerHTML={{ __html: hotel.hotelDetailHtml }}
                  />
                ) : null}

               {hotel.rooms?.map((room) => (
  <RoomCard key={room.id} room={room} hotelSlug={hotel.slug} />
))}
              </div>
            )}

            {activeTab === "policy" && (
              <div className="text-[14px] leading-7 text-[#3f3f3f]">
                {hotel.extraGuestPolicy?.rows?.length ? (
                  <>
                    <p className="mb-3">
                      Áp dụng: {hotel.extraGuestPolicy.appliedFrom} đến{" "}
                      {hotel.extraGuestPolicy.appliedTo}
                    </p>

                    <div className="mb-5 overflow-x-auto">
                      <table className="w-full min-w-[700px] border-collapse text-left text-[13px]">
                        <thead>
                          <tr className="bg-white">
                            <th className="border border-[#9f9f9f] px-3 py-3">
                              THÊM NGƯỜI
                            </th>
                            <th className="border border-[#9f9f9f] px-3 py-3">
                              BB
                            </th>
                            <th className="border border-[#9f9f9f] px-3 py-3">
                              BBVS
                            </th>
                            <th className="border border-[#9f9f9f] px-3 py-3">
                              FB
                            </th>
                            <th className="border border-[#9f9f9f] px-3 py-3">
                              FBVS
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {hotel.extraGuestPolicy.rows.map((row, index) => (
                            <tr key={`${row.label}-${index}`}>
                              <td className="border border-[#9f9f9f] px-3 py-3">
                                {row.label}
                              </td>
                              <td className="border border-[#9f9f9f] px-3 py-3">
                                {row.bb || ""}
                              </td>
                              <td className="border border-[#9f9f9f] px-3 py-3">
                                {row.bbvs || ""}
                              </td>
                              <td className="border border-[#9f9f9f] px-3 py-3">
                                {row.fb || ""}
                              </td>
                              <td className="border border-[#9f9f9f] px-3 py-3">
                                {row.fbvs || ""}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : null}

                {hotel.checkInOutPolicy?.length ? (
                  <div className="mb-5">
                    <p className="mb-2 font-bold">GIỜ NHẬN &amp; TRẢ PHÒNG:</p>
                    <ul className="list-disc space-y-1 pl-6">
                      {hotel.checkInOutPolicy.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {hotel.cancelPolicy?.length ? (
                  <div className="mb-5">
                    <p className="mb-2 font-bold">HỦY / PHẠT:</p>
                    <ul className="list-disc space-y-1 pl-6">
                      {hotel.cancelPolicy.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {hotel.otherPolicy?.length ? (
                  <div className="mb-5">
                    <p className="mb-2 font-bold">QUY ĐỊNH KHÁC:</p>
                    <ul className="list-disc space-y-1 pl-6">
                      {hotel.otherPolicy.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {hotel.policyNotesHtml ? (
                  <div
                    className="hotel-detail-html"
                    dangerouslySetInnerHTML={{ __html: hotel.policyNotesHtml }}
                  />
                ) : null}
              </div>
            )}

            {activeTab === "note" && (
              <div className="hotel-detail-html text-[14px] leading-8 text-[#3f3f3f]">
                {hotel.noteHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: hotel.noteHtml }} />
                ) : (
                  <div>Chưa có ghi chú.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {hotel.relatedHotels?.length ? (
          <section className="mt-12">
            <h2 className="mb-6 text-[28px] font-bold text-[#2f2f2f]">
              Khách sạn liên quan
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {hotel.relatedHotels.map((item) => (
                <RelatedHotelCard key={`${item.id}-${item.name}`} item={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}