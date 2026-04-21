"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "TOUR", href: "/" },
  { label: "VÉ MÁY BAY", href: "/ve-may-bay" },
  { label: "KHÁCH SẠN", href: "/khach-san" },
  { label: "DỊCH VỤ VISA", href: "/dich-vu-visa" },
  { label: "THUÊ XE", href: "/xe-du-lich" },
  { label: "PHỤ KIỆN DU LỊCH", href: "/phu-kien-du-lich" },
  { label: "SÉC XANH", href: "/sec-xanh" },
  { label: "TIN TỨC", href: "/tin-tuc" },
];

const tourGroups = [
  {
    title: "Du lịch trong nước",
    items: ["Du lịch Miền Bắc", "Du lịch Miền Trung", "Du lịch Miền Nam"],
  },
  {
    title: "Du lịch nước ngoài",
    items: ["Tour Châu Á", "Tour Châu Âu", "Tour Úc - Mỹ"],
  },
  {
    title: "Du lịch khách đoàn",
    items: ["Tour doanh nghiệp", "Team Building", "Gala Dinner"],
  },
  {
    title: "Du lịch tự chọn",
    items: ["Tour Free & Easy", "Combo du lịch", "Vé tham quan"],
  },
  {
    title: "Du lịch hành hương",
    items: ["Hành hương trong nước", "Hành hương nước ngoài"],
  },
];

const northTours = [
  "Du lịch Hà Nội",
  "Du lịch Bắc Kạn",
  "Du lịch Bắc Ninh",
  "Du lịch Đông Bắc",
  "Du lịch Điện Biên",
  "Du lịch Hạ Long",
  "Du lịch Hà Giang",
  "Du lịch Lai Châu",
  "Du lịch Lạng Sơn",
  "Du lịch Mộc Châu",
  "Du lịch Mai Châu",
  "Du lịch Thanh Hóa",
  "Du lịch Ninh Bình",
  "Du lịch Phú Thọ",
  "Du lịch Sapa",
  "Du lịch Tây Bắc",
];

const holidayTours = [
  "Tour lễ 2/9",
  "Tour du lịch mùa Thu",
  "Tour du lịch mùa lúa chín",
  "Tour du lịch mùa hoa Tam Giác Mạch",
  "Tour bay Vietnam Airlines",
  "Tour khám phá mùa hoa",
  "Tour du lịch Hành Hương",
  "Tour Noel - Tết Dương Lịch",
  "Tour du lịch Tết Nguyên Đán",
  "Tour du lịch lễ 30/4 - 1/5",
  "Tour pháo hoa Đà Nẵng",
  "Tour Xe Giá Sốc",
];

const quickMenuLinks = [
  { label: "Tổ chức Teambuilding", href: "/tour-doanh-nghiep" },
  { label: "Tour khách đoàn", href: "/tour-doanh-nghiep" },
  { label: "Tour chuyên đề", href: "/tour-he-2026" },
  { label: "Tour gia đình", href: "/tour-he-2026" },
  { label: "Tour mới lạ", href: "/tour-he-2026" },
  { label: "Tổng quan Cty", href: "/tong-quan" },
  { label: "Thông tin liên hệ", href: "/lien-he" },
  
  { label: "Tuyển dụng Du Lịch", href: "/tin-tuc" },
  { label: "Giới thiệu", href: "/tong-quan" },
];

export default function MainHeader() {
  const pathname = usePathname();

  const [showTourMenu, setShowTourMenu] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [activeGroup, setActiveGroup] = useState("Du lịch trong nước");

  const quickMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        quickMenuRef.current &&
        !quickMenuRef.current.contains(event.target as Node)
      ) {
        setShowQuickMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/ve-may-bay") {
      return pathname === "/ve-may-bay" || pathname.startsWith("/ve-may-bay/");
    }
    if (href === "/khach-san") {
      return pathname === "/khach-san" || pathname.startsWith("/khach-san/");
    }
    if (href === "/tin-tuc") {
      return pathname === "/tin-tuc" || pathname.startsWith("/tin-tuc/");
    }
    if (href === "/dich-vu-visa") {
      return pathname === "/dich-vu-visa" || pathname.startsWith("/dich-vu-visa/");
    }
    if (href === "/xe-du-lich") {
      return pathname === "/xe-du-lich" || pathname.startsWith("/xe-du-lich/");
    }
    if (href === "/phu-kien-du-lich") {
      return pathname === "/phu-kien-du-lich" || pathname.startsWith("/phu-kien-du-lich/");
    }
    if (href === "/sec-xanh") {
      return pathname === "/sec-xanh" || pathname.startsWith("/sec-xanh/");
    }
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href;
  };

  return (
    <header className="relative bg-white">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <div className="flex h-[96px] items-center justify-between gap-6">
          <Link href="/" className="shrink-0">
            <img
              src="/trangchu/logo.png"
              alt="Du Lịch Việt"
              className="h-[43px] w-auto object-contain lg:h-[56px]"
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-9 lg:flex">
            {navItems.map((item) => {
              const isTour = item.label === "TOUR";

              if (isTour) {
                return (
                  <div
                    key={item.label}
                    className="relative h-full"
                    onMouseEnter={() => setShowTourMenu(true)}
                    onMouseLeave={() => setShowTourMenu(false)}
                  >
                    <Link
                      href={item.href}
                      className={`flex h-[96px] items-center whitespace-nowrap text-[15px] font-medium transition ${
                        isActive(item.href)
                          ? "text-[#f0178d]"
                          : "text-[#4d4d4d] hover:text-[#f0178d]"
                      }`}
                    >
                      {item.label}
                    </Link>

                    {showTourMenu && (
                      <div className="absolute left-1/2 top-full z-40 w-[860px] -translate-x-1/2 border border-[#ececec] bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.15)]">
                        <div className="grid grid-cols-[240px_1fr] gap-6">
                          <div className="border-r border-[#ededed] pr-4">
                            {tourGroups.map((group) => (
                              <button
                                key={group.title}
                                type="button"
                                onMouseEnter={() => setActiveGroup(group.title)}
                                className={`block w-full px-3 py-3 text-left text-[15px] font-medium transition ${
                                  activeGroup === group.title
                                    ? "bg-[#fdf0f7] text-[#f0178d]"
                                    : "text-[#4d4d4d] hover:bg-[#fafafa]"
                                }`}
                              >
                                {group.title}
                              </button>
                            ))}
                          </div>

                          <div>
                            {activeGroup === "Du lịch trong nước" && (
                              <div className="grid grid-cols-3 gap-6">
                                <div>
                                  <div className="mb-3 text-[15px] font-bold text-[#f0178d]">
                                    Miền Bắc
                                  </div>
                                  <div className="space-y-2">
                                    {northTours.map((item) => (
                                      <div
                                        key={item}
                                        className="text-[14px] text-[#4d4d4d]"
                                      >
                                        {item}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <div className="mb-3 text-[15px] font-bold text-[#f0178d]">
                                    Dịp lễ - mùa
                                  </div>
                                  <div className="space-y-2">
                                    {holidayTours.map((item) => (
                                      <div
                                        key={item}
                                        className="text-[14px] text-[#4d4d4d]"
                                      >
                                        {item}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <div className="mb-3 text-[15px] font-bold text-[#f0178d]">
                                    Nổi bật
                                  </div>
                                  <div className="space-y-2 text-[14px] text-[#4d4d4d]">
                                    <div>Du lịch Phú Quốc</div>
                                    <div>Du lịch Đà Lạt</div>
                                    <div>Du lịch Đà Nẵng</div>
                                    <div>Du lịch Nha Trang</div>
                                    <div>Du lịch Côn Đảo</div>
                                    <div>Du lịch Miền Tây</div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {activeGroup !== "Du lịch trong nước" && (
                              <div className="grid grid-cols-2 gap-4">
                                {tourGroups
                                  .find((group) => group.title === activeGroup)
                                  ?.items.map((item) => (
                                    <div
                                      key={item}
                                      className="rounded-[6px] border border-[#efefef] px-4 py-3 text-[14px] text-[#4d4d4d]"
                                    >
                                      {item}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`whitespace-nowrap text-[15px] font-medium transition ${
                    isActive(item.href)
                      ? "text-[#f0178d]"
                      : "text-[#4d4d4d] hover:text-[#f0178d]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div ref={quickMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setShowQuickMenu((prev) => !prev)}
              className="flex h-12 w-12 shrink-0 items-center justify-center text-[#666]"
            >
              <Menu size={42} strokeWidth={1.8} />
            </button>

            {showQuickMenu && (
              <div className="absolute right-0 top-[56px] z-50 w-[250px] overflow-hidden bg-[#7d7d7d] text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                {quickMenuLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setShowQuickMenu(false)}
                    className="block px-5 py-3 text-[15px] transition hover:bg-[#6c6c6c]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}