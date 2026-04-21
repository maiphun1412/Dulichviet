"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import HeaderTop from "../../components/HeaderTop";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import FloatingContact from "../../components/FloatingContact";
import { getToursBySection, type TourItem } from "../../lib/tours";
import { useRouter } from "next/navigation";

type MainCategory = {
  id: number;
  label: string;
  highlight?: string;
  icon: string;
  highlightColor?: string;
  type: "toggle" | "link";
  value?: "domestic" | "international";
  href?: string;
};

type TopOption = {
  label: string;
  value: string;
};

const mainCategories: MainCategory[] = [
  {
    id: 1,
    label: "Tour TRONG NƯỚC",
    highlight: "TRONG NƯỚC",
    icon: "/trangchu/icon1.png",
    type: "toggle",
    value: "domestic",
  },
  {
    id: 2,
    label: "Tour NƯỚC NGOÀI",
    highlight: "NƯỚC NGOÀI",
    icon: "/trangchu/icon2.png",
    highlightColor: "text-[#1f4ea3]",
    type: "toggle",
    value: "international",
  },
  {
    id: 3,
    label: "Dịch vụ làm VISA",
    highlight: "VISA",
    icon: "/trangchu/icon3.png",
    highlightColor: "text-[#c63da4]",
    type: "link",
    href: "/dich-vu-visa",
  },
  {
    id: 4,
    label: "VÉ MÁY BAY GIÁ RẺ",
    highlight: "VÉ MÁY BAY GIÁ RẺ",
    icon: "/trangchu/icon4.png",
    highlightColor: "text-[#19a7d8]",
    type: "link",
    href: "/ve-may-bay",
  },
  {
    id: 5,
    label: "ĐẶT KHÁCH SẠN",
    highlight: "ĐẶT KHÁCH SẠN",
    icon: "/trangchu/icon5.png",
    highlightColor: "text-[#66bfb6]",
    type: "link",
    href: "/khach-san",
  },
];

const domesticTopDestinations: TopOption[] = [
  { label: "Trong Nước", value: "trong-nuoc" },
  { label: "Miền Bắc", value: "mien-bac" },
  { label: "Đà Nẵng", value: "da-nang" },
  { label: "Nha Trang", value: "nha-trang" },
  { label: "Phú Quốc", value: "phu-quoc" },
];

const internationalTopDestinations: TopOption[] = [
  { label: "Nước Ngoài", value: "nuoc-ngoai" },
  { label: "Hàn Quốc", value: "han-quoc" },
  { label: "Châu Âu", value: "chau-au" },
  { label: "Jerusalem", value: "jerusalem" },
  { label: "Fatima", value: "fatima" },
];

const topDepartureOptions: TopOption[] = [
  { label: "Tất cả nơi khởi hành", value: "all" },
  { label: "Hồ Chí Minh", value: "hcm" },
  { label: "Hà Nội", value: "hn" },
  { label: "Cần Thơ", value: "ct" },
  { label: "Đà Nẵng", value: "dn" },
];

type FilterOption = {
  label: string;
  value: string;
};

const departureOptions: FilterOption[] = [
  { label: "Nơi khởi hành", value: "" },
  { label: "Hồ Chí Minh", value: "Từ Hồ Chí Minh" },
  { label: "Hà Nội", value: "Từ Hà Nội" },
  { label: "Đà Nẵng", value: "Từ Đà Nẵng" },
  { label: "Cần Thơ", value: "Từ Cần Thơ" },
];

const destinationOptions: FilterOption[] = [
  { label: "Điểm đến", value: "" },
  { label: "Mỹ", value: "my" },
  { label: "Canada", value: "canada" },
  { label: "Trung Quốc", value: "trung-quoc" },
  { label: "Đài Loan", value: "dai-loan" },
  { label: "Nhật Bản", value: "nhat-ban" },
  { label: "Hàn Quốc", value: "han-quoc" },
  { label: "Singapore", value: "singapore" },
  { label: "Châu Âu", value: "chau-au" },
];

const subNavItems = [
  {
    id: 1,
    title: "Tour Doanh Nghiệp",
    icon: "/trangchu/sub1.png",
    href: "/tour-doanh-nghiep",
  },
  {
    id: 2,
    title: "Du lịch Hành Hương",
    icon: "/trangchu/sub2.png",
    href: "/du-lich-hanh-huong",
  },
  {
    id: 3,
    title: "Tour Hè 2026",
    icon: "/trangchu/sub5.png",
    href: "/tour-he-2026",
  },
  {
    id: 4,
    title: "Tour Lễ 30/4",
    icon: "/trangchu/sub6.png",
    href: "/tour-le-30-4",
  },
];

function formatTourPrice(price: string) {
  return price || "Liên hệ";
}

function splitDepartureDates(dates?: string) {
  if (!dates) return [];
  return dates
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function detectRegion(tour: TourItem) {
  const text = `${tour.title} ${tour.slug}`.toLowerCase();

  if (
    text.includes("my") ||
    text.includes("usa") ||
    text.includes("chau-au") ||
    text.includes("châu âu") ||
    text.includes("duc") ||
    text.includes("phap") ||
    text.includes("y") ||
    text.includes("thuy-si") ||
    text.includes("uc") ||
    text.includes("canada")
  ) {
    return "au-uc-my";
  }

  return "chau-a";
}

export default function TourHe2026Page() {
      const router = useRouter();

  const [activeTourTab, setActiveTourTab] = useState<"domestic" | "international" | null>(null);
  const [topDestination, setTopDestination] = useState("");
  const [topDeparture, setTopDeparture] = useState("all");
  const [topDepartureDate, setTopDepartureDate] = useState("");

    const handleMainCategoryClick = (item: MainCategory) => {
    if (item.type === "toggle" && item.value) {
      const value = item.value as "domestic" | "international";
      setActiveTourTab((prev) => (prev === value ? null : value));
      setTopDestination("");
      setTopDeparture("all");
      setTopDepartureDate("");
      return;
    }

    if (item.type === "link" && item.href) {
      router.push(item.href);
    }
  };

  const topDestinationOptions =
    activeTourTab === "international"
      ? internationalTopDestinations
      : domesticTopDestinations;

  const [tours, setTours] = useState<TourItem[]>([]);
  const [loadingTours, setLoadingTours] = useState(true);

  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      setLoadingTours(true);
      const data = await getToursBySection("tour-he-2026");
      setTours(data);
      setLoadingTours(false);
    };

    fetchTours();
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const title = tour.title.toLowerCase().trim();
      const slug = tour.slug.toLowerCase().trim();
      const dep = tour.departure.toLowerCase().trim();
      const date = tour.date.toLowerCase().trim();

      const matchDestination = destination
        ? title.includes(destination.toLowerCase()) ||
          slug.includes(destination.toLowerCase())
        : true;

      const matchDeparture = departure
        ? dep.includes(departure.toLowerCase())
        : true;

      const matchDate = departureDate
        ? date.includes(departureDate.toLowerCase())
        : true;

      return matchDestination && matchDeparture && matchDate;
    });
  }, [tours, destination, departure, departureDate]);

  const auUcMyTours = filteredTours.filter(
    (tour) => detectRegion(tour) === "au-uc-my"
  );
  const chauATours = filteredTours.filter(
    (tour) => detectRegion(tour) === "chau-a"
  );

  return (
    <main className="min-h-screen bg-[#f3f3f3] text-[#333]">
      <HeaderTop />
      <MainHeader />

      <section className="bg-[#eef0f3]">
        <div className="mx-auto max-w-[1220px] px-4 py-4">
          <div className="mb-5 text-[14px] text-[#8a8a8a]">
            Trang Chủ &gt; Du Lịch Hè
          </div>

          {/* top tabs */}
          <section className="relative">
  {activeTourTab && (
    <button
      type="button"
      aria-label="Đóng khung tìm kiếm"
      onClick={() => setActiveTourTab(null)}
      className="fixed inset-0 z-30 bg-black/45"
    />
  )}

  <div className="relative z-40 mb-8">
    <div className="overflow-x-auto">
      <div className="grid min-w-[1180px] grid-cols-5 gap-4">
        {mainCategories.map((item) => {
          const before = item.label.replace(item.highlight || "", "").trim();

          const isActive =
            (item.value === "domestic" && activeTourTab === "domestic") ||
            (item.value === "international" && activeTourTab === "international");

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleMainCategoryClick(item)}
              className={`relative flex h-[82px] items-center gap-4 border bg-white px-5 text-left shadow-sm transition hover:-translate-y-0.5 ${
                isActive ? "border-white" : "border-[#dedede]"
              }`}
            >
              {isActive && item.type === "toggle" && (
                <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-l-[13px] border-r-[13px] border-t-[11px] border-l-transparent border-r-transparent border-t-white" />
              )}

              <img
                src={item.icon}
                alt={item.label}
                className="h-[40px] w-[40px] object-contain"
              />

              <div className="text-[16px] text-[#333]">
                {before ? (
                  <>
                    <span>{before} </span>
                    <span className={item.highlightColor || "text-[#222] font-semibold"}>
                      {item.highlight}
                    </span>
                  </>
                ) : (
                  <span className={item.highlightColor || "text-[#222] font-semibold"}>
                    {item.highlight}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>

    {activeTourTab && (
      <div className="mt-5 bg-white px-5 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <div className="grid min-w-[1180px] grid-cols-[1.2fr_1.2fr_1.2fr_auto] gap-1">
          <div>
            <label className="mb-2 block text-[15px] font-semibold text-[#2b2b2b]">
              Điểm đến
            </label>
            <select
              value={topDestination}
              onChange={(e) => setTopDestination(e.target.value)}
              className="h-[40px] w-full border border-[#cfcfcf] bg-white px-3 text-[15px] text-[#555] outline-none"
            >
              <option value="" disabled>
                Bạn muốn đến đâu?
              </option>
              {topDestinationOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[15px] font-semibold text-[#2b2b2b]">
              Nơi khởi hành
            </label>
            <select
              value={topDeparture}
              onChange={(e) => setTopDeparture(e.target.value)}
              className="h-[40px] w-full border border-[#cfcfcf] bg-white px-3 text-[15px] text-[#555] outline-none"
            >
              {topDepartureOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[15px] font-semibold text-[#2b2b2b]">
              Ngày khởi hành
            </label>
            <input
              type="date"
              value={topDepartureDate}
              onChange={(e) => setTopDepartureDate(e.target.value)}
              className="h-[40px] w-full border border-[#cfcfcf] bg-white px-3 text-[15px] text-[#555] outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              className="flex h-[40px] items-center gap-2 bg-[#ea1d8f] px-6 text-[16px] font-bold text-white transition hover:bg-[#d1147f]"
            >
              <span>⌕</span>
              <span>TÌM KIẾM</span>
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</section>

          {/* sub nav */}
          <div className="mb-10 border-y border-[#dfdfdf] bg-white">
            <div className="grid grid-cols-2 gap-6 px-6 py-7 text-center md:grid-cols-4">
              {subNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex flex-col items-center gap-3"
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-[44px] w-[44px] object-contain"
                  />
                  <span className="text-[15px] font-semibold text-[#333]">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* intro */}
          <div className="mb-8 border-b border-[#dfdfdf] pb-7">
            <h1 className="mb-4 text-center text-[22px] font-bold uppercase text-[#0e58a8]">
              Du lịch hè
            </h1>

            <div className="mb-5 flex flex-wrap items-center gap-2 text-[15px] text-[#333]">
              <span className="font-semibold">Đánh giá:</span>
              <span className="text-[#f4b400]">★★★★★</span>
              <span className="font-semibold">5/5</span>
              <span>trong 1450 Đánh giá</span>
              <span>👁 87,705</span>
            </div>

            <p className="mb-4 text-[16px] leading-[1.9] text-[#333]">
              Đặt <strong className="text-[#0e58a8]">tour du lịch hè 2026</strong>{" "}
              trong nước,{" "}
              <strong className="text-[#0e58a8]">du lịch hè 2026</strong> nước ngoài
              ngay hôm nay để nhận được nhiều ưu đãi tốt cho chuyến{" "}
              <strong className="text-[#0e58a8]">tour du lịch mùa Hè</strong> của
              gia đình thêm phần ý nghĩa.
            </p>

            <p className="text-[16px] leading-[1.9] text-[#333]">
              Chào hè 2026, với nhiều ưu đãi hấp dẫn dành cho các quý khách hàng đăng
              ký sớm các <strong className="text-[#0e58a8]">tour du lịch Hè 2026</strong>.
              Nhanh tay book để có cơ hội sở hữu một chuyến{" "}
              <strong className="text-[#0e58a8]">tour du lịch hè 2026 giá rẻ</strong>
              với nhiều trải nghiệm thú vị cùng gia đình nhé.
            </p>

            <div className="mt-5 text-right">
              <button className="text-[14px] text-[#ea1d8f] hover:underline">
                Xem thêm »
              </button>
            </div>
          </div>

          {/* result count */}
          {loadingTours ? (
            <div className="py-10 text-center text-[15px] text-[#666]">
              Đang tải tour...
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="py-10 text-center text-[15px] text-[#666]">
              Không có tour phù hợp.
            </div>
          ) : (
            <>
              {/* section 1 */}
              <div className="mb-10">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[18px] font-bold uppercase text-[#0e58a8]">
                    Tour du lịch hè âu - úc - mỹ
                  </h2>
                  <button className="text-[14px] text-[#ea1d8f] hover:underline">
                    ✎ Xem tất cả
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  {auUcMyTours.map((tour) => {
                    const dates = splitDepartureDates(
                      (tour as TourItem & { departureDates?: string }).departureDates
                    );

                    return (
                      <article
                        key={tour.id}
                        className="overflow-hidden border border-[#d9d9d9] bg-white"
                      >
                        <Link href={`/tour/${tour.slug}`} className="block">
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="h-[250px] w-full object-cover"
                          />
                        </Link>

                        <div className="p-4">
                          <Link href={`/tour/${tour.slug}`} className="block">
                            <h3 className="mb-3 line-clamp-2 text-[16px] font-bold uppercase leading-[1.45] text-[#222] hover:text-[#ea1d8f]">
                              {tour.title}
                            </h3>
                          </Link>

                          <div className="space-y-2 text-[14px] text-[#333]">
                            <div>🪪 Mã tour: <strong>{tour.id}</strong></div>
                            <div>
                              📍 Khởi hành:{" "}
                              <strong className="text-[#ea1d8f]">{tour.departure}</strong>
                            </div>
                            <div>⏱ Thời gian: <strong>{tour.duration}</strong></div>
                          </div>

                          <div className="mt-4">
                            <div className="mb-2 text-[14px] font-semibold">
                              🛫 Ngày khởi hành:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {dates.map((date, index) => (
                                <span
                                  key={index}
                                  className="inline-flex rounded-[4px] border border-[#ea1d8f] px-3 py-1 text-[14px] text-[#ea1d8f]"
                                >
                                  {date}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-5">
                            <Link
                              href={`/tour/${tour.slug}`}
                              className="inline-flex h-[46px] items-center justify-center rounded-[10px] bg-[#c43b9e] px-8 text-[16px] font-semibold text-white transition hover:bg-[#af2f8a]"
                            >
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* section 2 */}
              <div className="mb-10">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[18px] font-bold uppercase text-[#0e58a8]">
                    Tour du lịch hè - châu á
                  </h2>
                  <button className="text-[14px] text-[#ea1d8f] hover:underline">
                    ✎ Xem tất cả
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  {chauATours.map((tour) => {
                    const dates = splitDepartureDates(
                      (tour as TourItem & { departureDates?: string }).departureDates
                    );

                    return (
                      <article
                        key={tour.id}
                        className="overflow-hidden border border-[#d9d9d9] bg-white"
                      >
                        <Link href={`/tour/${tour.slug}`} className="block">
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="h-[250px] w-full object-cover"
                          />
                        </Link>

                        <div className="p-4">
                          <Link href={`/tour/${tour.slug}`} className="block">
                            <h3 className="mb-3 line-clamp-2 text-[16px] font-bold uppercase leading-[1.45] text-[#222] hover:text-[#ea1d8f]">
                              {tour.title}
                            </h3>
                          </Link>

                          <div className="space-y-2 text-[14px] text-[#333]">
                            <div>🪪 Mã tour: <strong>{tour.id}</strong></div>
                            <div>
                              📍 Khởi hành:{" "}
                              <strong className="text-[#ea1d8f]">{tour.departure}</strong>
                            </div>
                            <div>⏱ Thời gian: <strong>{tour.duration}</strong></div>
                          </div>

                          <div className="mt-4">
                            <div className="mb-2 text-[14px] font-semibold">
                              🛫 Ngày khởi hành:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {dates.map((date, index) => (
                                <span
                                  key={index}
                                  className="inline-flex rounded-[4px] border border-[#ea1d8f] px-3 py-1 text-[14px] text-[#ea1d8f]"
                                >
                                  {date}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-5">
                            <Link
                              href={`/tour/${tour.slug}`}
                              className="inline-flex h-[46px] items-center justify-center rounded-[10px] bg-[#c43b9e] px-8 text-[16px] font-semibold text-white transition hover:bg-[#af2f8a]"
                            >
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* right side filter like sample lower area if needed later */}
          <div className="hidden" />
        </div>
      </section>

      <FloatingContact />
      <Footer />
    </main>
  );
}