"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import HeaderTop from "../../components/HeaderTop";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import FloatingContact from "../../components/FloatingContact";
import {
  getToursBySectionAndService,
  type TourItem,
} from "../../lib/tours";

type FilterOption = {
  label: string;
  value: string;
};

type ServiceItem = {
  id: number;
  title: string;
  icon: string;
  serviceType?: string;
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
  { label: "Thái Lan", value: "thai-lan" },
  { label: "Singapore", value: "singapore" },
  { label: "Hàn Quốc", value: "han-quoc" },
  { label: "Nhật Bản", value: "nhat-ban" },
  { label: "Đà Lạt", value: "da-lat" },
  { label: "Đà Nẵng", value: "da-nang" },
  { label: "Phú Quốc", value: "phu-quoc" },
];

const serviceItems: ServiceItem[] = [
  {
    id: 1,
    title: "Tổ chức sự kiện/Hội nghị",
    icon: "/trangchu/sub1.png",
    serviceType: "su-kien-hoi-nghi",
  },
  {
    id: 2,
    title: "Tour MICE",
    icon: "/trangchu/sub2.png",
    serviceType: "tour-mice",
  },
  {
    id: 3,
    title: "Tổ chức Teambuilding",
    icon: "/trangchu/sub3.png",
    serviceType: "teambuilding",
  },
  {
    id: 4,
    title: "Tour gia đình",
    icon: "/trangchu/sub4.png",
    serviceType: "tour-gia-dinh",
  },
  {
    id: 5,
    title: "Tour MICE AI",
    icon: "/trangchu/sub5.png",
    serviceType: "tour-mice-ai",
  },
];

const bannerImages = [
  "/trangchu/tour/banner-cat-2.jpg",
  "/trangchu/tour/banner-festivan-2.webp",
  "/trangchu/tour/SLIDE-TEAMBUILDING-scaled.jpg",
];

function formatTourPrice(price: string) {
  return price || "Liên hệ";
}

export default function TourDoanhNghiepPage() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);

  const [activeService, setActiveService] = useState<string | undefined>(
    undefined
  );
  const [tours, setTours] = useState<TourItem[]>([]);
  const [loadingTours, setLoadingTours] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      setLoadingTours(true);
      const data = await getToursBySectionAndService(
        "tour-doanh-nghiep",
        activeService
      );
      setTours(data);
      setLoadingTours(false);
    };

    fetchTours();
  }, [activeService]);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const normalizedDeparture = tour.departure.toLowerCase().trim();
      const normalizedTitle = tour.title.toLowerCase().trim();
      const normalizedSlug = tour.slug.toLowerCase().trim();
      const normalizedDate = tour.date.toLowerCase().trim();

      const matchDeparture = departure
        ? normalizedDeparture.includes(departure.toLowerCase())
        : true;

      const matchDestination = destination
        ? normalizedTitle.includes(destination.toLowerCase()) ||
          normalizedSlug.includes(destination.toLowerCase())
        : true;

      const matchTime = time
        ? normalizedDate.includes(time.toLowerCase())
        : true;

      return matchDeparture && matchDestination && matchTime;
    });
  }, [tours, departure, destination, time]);

  return (
    <main className="min-h-screen bg-[#f3f3f3] text-[#333]">
      <HeaderTop />
      <MainHeader />

      {/* Banner */}
      <section className="bg-white">
        <div className="w-full">
          <div className="relative h-[320px] w-full overflow-hidden md:h-[470px] lg:h-[560px]">
            {bannerImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Du lịch khách đoàn ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  index === currentBanner ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            <button
              type="button"
              onClick={() =>
                setCurrentBanner(
                  (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
                )
              }
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 text-[22px] text-[#444] shadow transition hover:bg-white"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentBanner((prev) => (prev + 1) % bannerImages.length)
              }
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 text-[22px] text-[#444] shadow transition hover:bg-white"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentBanner(index)}
                  className={`h-3 w-3 rounded-full border border-white transition ${
                    index === currentBanner
                      ? "bg-[#ea1d8f]"
                      : "bg-white/70 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb + form */}
      <section className="bg-[#efefef] pb-4 pt-3">
        <div className="mx-auto max-w-[1080px] px-4">
          <div className="mb-3 text-[14px] text-[#8a8a8a]">
            Trang Chủ &gt; Du lịch Khách Đoàn
          </div>

          <div className="border border-[#d9d9d9] bg-white">
            <div className="bg-[#8f8f8f] py-3 text-center text-[15px] font-bold uppercase text-white">
              Tìm tour khách đoàn
            </div>

            <div className="grid grid-cols-1 gap-3 px-4 py-6 md:grid-cols-[1fr_1fr_1fr_0.95fr_0.95fr]">
              <select
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="h-[42px] border border-[#d6d6d6] px-3 text-[15px] outline-none"
              >
                {departureOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="h-[42px] border border-[#d6d6d6] px-3 text-[15px] outline-none"
              >
                {destinationOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Chọn thời gian"
                className="h-[42px] border border-[#d6d6d6] px-3 text-[15px] outline-none"
              />

              <button
                type="button"
                className="h-[42px] bg-[#ea1d8f] px-4 text-[15px] font-bold text-white transition hover:bg-[#d1147f]"
              >
                MỞ RỘNG
              </button>

              <button
                type="button"
                className="flex h-[42px] items-center justify-center gap-2 bg-[#ea1d8f] px-4 text-[15px] font-bold text-white transition hover:bg-[#d1147f]"
              >
                <span>⌕</span>
                <span>TÌM KIẾM</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services row */}
      <section className="border-y border-[#dfdfdf] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-6">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-5">
            {serviceItems.map((item) => {
              const isActive = activeService === item.serviceType;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setActiveService((prev) =>
                      prev === item.serviceType ? undefined : item.serviceType
                    )
                  }
                  className={`flex flex-col items-center gap-3 transition ${
                    isActive ? "opacity-100" : "opacity-90 hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-[44px] w-[44px] object-contain"
                  />
                  <span
                    className={`text-[15px] ${
                      isActive
                        ? "font-semibold text-[#ea1d8f]"
                        : "text-[#3e3e3e]"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-4 py-8">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#e4e4e4] pb-6 md:flex-row md:items-start">
            <div>
              <h1 className="mb-3 text-[22px] font-semibold text-[#005ca9]">
                Du lịch Khách Đoàn
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-[15px] text-[#444]">
                <span>Đánh giá:</span>
                <span className="text-[#f4b400]">★★★★★</span>
                <span className="font-semibold">5/5</span>
                <span>trong 2833 Đánh giá</span>
                <span>👁 55,446</span>
              </div>
            </div>

            <button
              type="button"
              className="h-[42px] rounded-[6px] bg-[#ea1d8f] px-8 text-[15px] font-bold text-white transition hover:bg-[#d1147f]"
            >
              LIÊN HỆ
            </button>
          </div>

          <div className="mb-10 border-b border-[#ededed] pb-8">
            <div className="mb-4 flex items-center justify-between">
              <div />
              <button
                type="button"
                className="text-[14px] text-[#ea1d8f] hover:underline"
              >
                Xem thêm »
              </button>
            </div>

            <p className="text-[15px] leading-[1.8] text-[#4a4a4a]">
              Du lịch khách đoàn là lựa chọn phù hợp cho doanh nghiệp, tổ chức,
              trường học hoặc nhóm bạn đông người muốn có hành trình riêng,
              linh hoạt theo nhu cầu. Chúng tôi hỗ trợ thiết kế tour trọn gói,
              tổ chức team building, gala dinner, hội nghị, hội thảo và các hoạt
              động gắn kết tập thể với chi phí tối ưu.
            </p>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="bg-[#2f67d7] px-2 py-1 text-[18px] font-bold uppercase text-white">
              TOUR KHÁCH ĐOÀN ĐI NƯỚC NGOÀI
            </h2>

            <button
              type="button"
              className="text-[14px] text-[#2f67d7] hover:text-[#ea1d8f]"
            >
              ✎ Xem tất cả
            </button>
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {filteredTours.map((tour) => (
                <article
                  key={tour.id}
                  className="overflow-hidden border border-[#d9d9d9] bg-white"
                >
                  <Link href={`/tour/${tour.slug}`} className="block">
                    <div className="relative h-[190px] w-full overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/45 px-2 py-1 text-[13px] font-medium text-white">
                        {tour.departure}
                      </div>
                    </div>
                  </Link>

                  <div className="p-3">
                    <Link href={`/tour/${tour.slug}`} className="block">
                      <h3 className="min-h-[56px] text-[16px] font-semibold leading-[1.45] text-[#333] hover:text-[#ea1d8f]">
                        {tour.title}
                      </h3>
                    </Link>

                    <div className="mt-3 space-y-1 text-[14px] text-[#4a4a4a]">
                      <div className="flex items-center gap-2">
                        <span>◔</span>
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👥</span>
                        <span>Du lịch Khách Đoàn</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>🗓</span>
                        <span>Theo yêu cầu</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <Link
                        href={`/tour/${tour.slug}`}
                        className="inline-flex h-[34px] items-center justify-center rounded-[4px] bg-[#1687e0] px-4 text-[14px] font-semibold text-white transition hover:bg-[#0f74c5]"
                      >
                        Xem chi tiết
                      </Link>

                      <div className="text-right text-[16px] font-bold text-[#f01472]">
                        {formatTourPrice(tour.price)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <FloatingContact />
      <Footer />
    </main>
  );
}