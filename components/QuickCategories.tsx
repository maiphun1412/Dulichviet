"use client";

import { useState } from "react";
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

type SubCategory = {
  id: number;
  label: string;
  icon: string;
  active?: boolean;
  href?: string;
};

type Option = {
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

const subCategories: SubCategory[] = [
  {
    id: 1,
    label: "Tour Doanh Nghiệp",
    icon: "/trangchu/sub1.png",
    href: "/tour-doanh-nghiep",
  },
  {
    id: 2,
    label: "Du lịch hành hương",
    icon: "/trangchu/sub2.png",
    href: "/du-lich-hanh-huong",
  },
  {
    id: 5,
    label: "Tour Hè 2026",
    icon: "/trangchu/sub5.png",
    href: "/tour-he-2026",
    active: true,
  },
  {
    id: 6,
    label: "Tour lễ 30-4",
    icon: "/trangchu/sub6.png",
    href: "/tour-le-30-4",
  },
];

const domesticDestinations: Option[] = [
  { label: "Trong Nước", value: "trong-nuoc" },
  { label: "Miền Bắc", value: "mien-bac" },
  { label: "Hà Nội", value: "ha-noi" },
  { label: "Bắc Kạn", value: "bac-kan" },
  { label: "Hạ Long", value: "ha-long" },
  { label: "Đà Nẵng", value: "da-nang" },
  { label: "Nha Trang", value: "nha-trang" },
  { label: "Phú Quốc", value: "phu-quoc" },
];

const internationalDestinations: Option[] = [
  { label: "Nước Ngoài", value: "nuoc-ngoai" },
  { label: "Nhật Bản", value: "nhat-ban" },
  { label: "Hàn Quốc", value: "han-quoc" },
  { label: "Thái Lan", value: "thai-lan" },
  { label: "Singapore", value: "singapore" },
  { label: "Trung Quốc", value: "trung-quoc" },
  { label: "Châu Âu", value: "chau-au" },
];

const departureOptions: Option[] = [
  { label: "Tất cả nơi khởi hành", value: "all" },
  { label: "Hồ Chí Minh", value: "hcm" },
  { label: "Hà Nội", value: "hn" },
  { label: "Cần Thơ", value: "ct" },
  { label: "Đà Nẵng", value: "dn" },
];

export default function QuickCategories() {
  const router = useRouter();

  const [activeTourTab, setActiveTourTab] = useState<
    "domestic" | "international" | null
  >(null);
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("all");
  const [departureDate, setDepartureDate] = useState("");

  const handleMainCategoryClick = (item: MainCategory) => {
    if (item.type === "toggle" && item.value) {
      const value = item.value as "domestic" | "international";
      setActiveTourTab((prev) => (prev === value ? null : value));
      setDestination("");
      setDeparture("all");
      setDepartureDate("");
      return;
    }

    if (item.type === "link" && item.href) {
      router.push(item.href);
    }
  };

  const destinationOptions =
    activeTourTab === "international"
      ? internationalDestinations
      : domesticDestinations;

  return (
    <section className="relative bg-[#eef0f3]">
      {activeTourTab && (
        <button
          type="button"
          aria-label="Đóng khung tìm kiếm"
          onClick={() => setActiveTourTab(null)}
          className="fixed inset-0 z-30 bg-black/45"
        />
      )}

      <div className="relative z-40 mx-auto max-w-[1400px] px-4 pt-6 lg:px-8">
        <div className="overflow-x-auto">
          <div className="grid min-w-[1180px] grid-cols-5 gap-5">
            {mainCategories.map((item) => {
              const before = item.label.replace(item.highlight || "", "").trim();

              const isActive =
                (item.value === "domestic" && activeTourTab === "domestic") ||
                (item.value === "international" &&
                  activeTourTab === "international");

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMainCategoryClick(item)}
                  className={`relative flex h-[80px] items-center gap-4 border bg-white px-6 text-left shadow-sm transition hover:-translate-y-0.5 ${
                    isActive ? "border-white" : "border-[#dedede]"
                  }`}
                >
                  {isActive && item.type === "toggle" && (
                    <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-l-[14px] border-r-[14px] border-t-[12px] border-l-transparent border-r-transparent border-t-white" />
                  )}

                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-[44px] w-[44px] object-contain"
                    />
                  </div>

                  <div className="min-w-0 text-[16px] leading-[1.35] text-[#4a4a4a]">
                    {before ? (
                      <>
                        <span>{before} </span>
                        <span className={item.highlightColor || "text-[#222]"}>
                          {item.highlight}
                        </span>
                      </>
                    ) : (
                      <span className={item.highlightColor || "text-[#222]"}>
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
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-[40px] w-full border border-[#cfcfcf] bg-white px-3 text-[15px] text-[#555] outline-none"
                >
                  <option value="" disabled>
                    Bạn muốn đến đâu?
                  </option>
                  {destinationOptions.map((item) => (
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
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="h-[40px] w-full border border-[#cfcfcf] bg-white px-3 text-[15px] text-[#555] outline-none"
                >
                  {departureOptions.map((item) => (
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
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
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

      <div className="relative z-40 border-t border-[#e2e2e2] bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
          <div className="overflow-x-auto">
            <div className="grid min-w-[900px] grid-cols-4 justify-items-center">
              {subCategories.map((item) => (
                <button
  key={item.id}
  type="button"
  onClick={() => {
    if (item.href) router.push(item.href);
  }}
  className="flex flex-col items-center justify-start gap-3 px-3 text-center"
>
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="h-[50px] w-[50px] object-contain"
                  />
                  <span
                    className={`text-[14px] font-semibold leading-[1.3] ${
                      item.active ? "text-[#e91e8f]" : "text-[#444]"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}