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
  { label: "Bạn muốn đến đâu?", value: "" },
  { label: "Miền Tây", value: "mien-tay" },
  { label: "Đà Nẵng", value: "da-nang" },
  { label: "Hội An", value: "hoi-an" },
  { label: "Huế", value: "hue" },
  { label: "Phú Quốc", value: "phu-quoc" },
  { label: "Nha Trang", value: "nha-trang" },
  { label: "Đà Lạt", value: "da-lat" },
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
    .slice(0, 5);
}

export default function TourLe304Page() {
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
      const data = await getToursBySection("tour-le-30-4");
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

  return (
    <main className="min-h-screen bg-[#f3f3f3] text-[#333]">
      <HeaderTop />
      <MainHeader />

      <section className="bg-[#eef0f3]">
        <div className="w-full">
          <img
            src="/trangchu/banner1.png"
            alt="Tour lễ 30/4"
            className="h-[220px] w-full object-cover md:h-[280px]"
          />
        </div>

        <div className="mx-auto max-w-[1220px] px-4 py-4">
          <div className="mb-5 text-[14px] text-[#8a8a8a]">
            Trang Chủ &gt; Du Lịch Trong Nước &gt; Chùm Tour Nghỉ Lễ &gt; Tour Lễ
            30/4 - 1/5
          </div>

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

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="mb-6 border-b border-[#dfdfdf] pb-7">
                <h1 className="mb-4 text-center text-[22px] font-bold uppercase text-[#0e58a8]">
                  Tour lễ 30/4 - 1/5
                </h1>

                <div className="mb-5 flex flex-wrap items-center gap-2 text-[15px] text-[#333]">
                  <span className="font-semibold">Đánh giá:</span>
                  <span className="text-[#f4b400]">★★★★★</span>
                  <span className="font-semibold">4.94/5</span>
                  <span>trong 410 Đánh giá</span>
                  <span>👁 24,142</span>
                </div>

                <p className="mb-5 text-[16px] leading-[1.9] text-[#333]">
                  Năm nay, do dịp Giỗ Tổ Hùng Vương và ngày 30/4 - Quốc tế lao
                  động 1/5 trùng nhau nên người lao động cả nước được nghỉ liên
                  tục trong 5 ngày, khoảng thời gian thật lý tưởng để bạn lên
                  lịch trình cho những chuyến du ngoạn dù lên rừng, hay xuống
                  biển, giúp gắn kết tình cảm gia đình, bạn bè, người thân.
                </p>

                <p className="mb-5 text-[16px] leading-[1.9] text-[#333]">
                  Nào, cùng Du Lịch Việt điểm danh những điểm đến không thể bỏ
                  qua khắp ba miền.
                </p>

                <p className="mb-5 text-[16px] font-semibold text-[#0e58a8]">
                  Tour du lịch 30/4 và 01/5 và khám phá núi non hùng vĩ của Đông –
                  Tây Bắc
                </p>

                <p className="mb-5 text-[16px] leading-[1.9] text-[#333]">
                  Sapa là tên gọi quá quen thuộc với những tín đồ yêu du lịch.
                  Dù đến Sapa “n” lần, bạn vẫn tìm thấy những trải nghiệm mới lạ
                  của thị trấn mù sương. Thay vì ở trong thị trấn sầm uất tấp
                  nập, nếu muốn “đổi gió”, hãy đi vào các bản làng như Cát Cát,
                  Tả Phìn, Tả Van, Lao Chải..., trải nghiệm ngủ homestay để tận
                  hưởng thiên nhiên, hòa mình và hiểu thêm về cuộc sống của
                  người dân bản địa.
                </p>

                <p className="mb-5 text-[16px] font-semibold text-[#0e58a8]">
                  Du lịch lễ 30/4 - Vi vu biển đảo cực chill
                </p>

                <p className="mb-5 text-[16px] leading-[1.9] text-[#333]">
                  Những bãi biển miền Trung, miền Nam luôn làm “níu lòng” du
                  khách bởi những bãi biển xanh, cát trắng.
                </p>

                <p className="mb-5 text-[16px] leading-[1.9] text-[#333]">
                  Tour du lịch 30/4 đến Đà Nẵng, Quy Nhơn, Phú Yên, tới Nha
                  Trang, Phú Quốc, Côn Đảo, du khách đều có thể thỏa sức hòa
                  mình với những bãi biển đẹp hoang sơ, với làn nước trong vắt,
                  khám phá các hòn đảo lớn nhỏ, và thưởng thức những đặc sản
                  tươi ngon từ biển khơi.
                </p>

                <p className="mb-3 text-[16px] font-semibold text-[#111]">
                  Tham khảo các chùm tour lễ 30/4 & 1/5 mà chúng tôi đang mở bán
                  dưới đây nhé
                </p>

                <p className="text-[15px] text-[#0e58a8]">
                  TAG: tour 30/4 và 1/5 2024, tour lễ 30/4, tour du lịch 30/4 và
                  01/5, du lịch 30/4, tour 30/4, du lịch lễ 30/4, tour du lịch
                  30/4
                </p>
              </div>

              <div className="mb-4 text-[18px] font-semibold text-[#111]">
                Chúng tôi tìm thấy{" "}
                <span className="font-bold text-[#ea1d8f]">
                  {filteredTours.length}
                </span>{" "}
                chương trình tour cho quý khách
              </div>

              {loadingTours ? (
                <div className="py-10 text-center text-[15px] text-[#666]">
                  Đang tải tour...
                </div>
              ) : filteredTours.length === 0 ? (
                <div className="py-10 text-center text-[15px] text-[#666]">
                  Không có tour phù hợp.
                </div>
              ) : (
                <div className="space-y-5">
                  {filteredTours.map((tour) => {
                    const dates = splitDepartureDates(
                      (tour as TourItem & { departureDates?: string }).departureDates
                    );

                    return (
                      <article
                        key={tour.id}
                        className="grid grid-cols-1 gap-5 border border-[#dfdfdf] bg-white p-4 md:grid-cols-[330px_1fr]"
                      >
                        <Link href={`/tour/${tour.slug}`} className="block">
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="h-[220px] w-full object-cover"
                          />
                        </Link>

                        <div>
                          <Link href={`/tour/${tour.slug}`} className="block">
                            <h2 className="mb-3 text-[18px] font-bold uppercase leading-[1.5] text-[#222] hover:text-[#ea1d8f]">
                              {tour.title}
                            </h2>
                          </Link>

                          <div className="mb-3 grid grid-cols-1 gap-x-6 gap-y-3 text-[14px] text-[#333] md:grid-cols-2">
                            <div className="flex items-center gap-2">
                              <span>🪪</span>
                              <span>
                                Mã tour: <strong>{tour.id}</strong>
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span>📍</span>
                              <span>
                                Khởi hành:{" "}
                                <strong className="text-[#0e58a8]">
                                  {tour.departure}
                                </strong>
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span>🕒</span>
                              <span>
                                Thời gian: <strong>{tour.duration}</strong>
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span>✈️</span>
                              <span>
                                Phương tiện: <strong>Xe, Máy bay</strong>
                              </span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="mb-2 flex items-center gap-2 text-[14px] font-semibold text-[#222]">
                              <span>🛫</span>
                              <span>Ngày khởi hành:</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {dates.length > 0 ? (
                                dates.map((date, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex h-[32px] items-center justify-center rounded-[4px] border border-[#ea1d8f] px-3 text-[14px] text-[#ea1d8f]"
                                  >
                                    {date}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[14px] text-[#777]">
                                  Theo yêu cầu
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                            <div>
                              <div className="text-[15px] text-[#444]">
                                Giá từ:
                              </div>
                              <div className="text-[22px] font-bold text-red-600">
                                {formatTourPrice(tour.price)}
                              </div>
                            </div>

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
              )}
            </div>

            <aside className="h-fit bg-[#efefef] p-4">
              <h3 className="mb-5 text-center text-[17px] font-bold uppercase text-[#222]">
                Lọc tour theo
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-[15px] font-semibold text-[#222]">
                    Bạn muốn đến đâu?
                  </label>
                  <div className="relative">
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="h-[42px] w-full border border-[#cfcfcf] bg-white px-3 text-[15px] text-[#666] outline-none"
                    >
                      {destinationOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      📍
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[15px] font-semibold text-[#222]">
                    Nơi khởi hành
                  </label>
                  <div className="relative">
                    <select
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className="h-[42px] w-full border border-[#cfcfcf] bg-white px-3 text-[15px] text-[#666] outline-none"
                    >
                      {departureOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      📍
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[15px] font-semibold text-[#222]">
                    Ngày khởi hành
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      placeholder="Ngày khởi hành"
                      className="h-[42px] w-full border border-[#cfcfcf] bg-white px-3 text-[15px] text-[#666] outline-none"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      🗓
                    </span>
                  </div>
                </div>

                <button className="h-[46px] w-full rounded-[4px] bg-[#ea1d8f] text-[18px] font-semibold text-white transition hover:bg-[#d1147f]">
                  Tìm kiếm
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FloatingContact />
      <Footer />
    </main>
  );
}