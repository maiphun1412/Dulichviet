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

const buildTourHref = (keyword: string) =>
  `/tour-theo-menu?keyword=${encodeURIComponent(keyword)}`;

const tourGroups = [
  {
    title: "Du lịch trong nước",
    items: [
      { label: "Du lịch Miền Bắc", href: buildTourHref("Miền Bắc") },
      { label: "Du lịch Miền Trung", href: buildTourHref("Miền Trung") },
      { label: "Du lịch Miền Nam", href: buildTourHref("Miền Nam") },
    ],
  },
  {
    title: "Du lịch nước ngoài",
    items: [
      { label: "Tour Châu Á", href: buildTourHref("Châu Á") },
      { label: "Tour Châu Âu", href: buildTourHref("Châu Âu") },
      { label: "Tour Úc - Mỹ", href: buildTourHref("Úc") },
    ],
  },
  {
    title: "Du lịch khách đoàn",
    items: [
      { label: "Tour doanh nghiệp", href: "/tour-doanh-nghiep" },
      { label: "Team Building", href: buildTourHref("Team Building") },
      { label: "Gala Dinner", href: buildTourHref("Gala Dinner") },
    ],
  },
  {
    title: "Du lịch tự chọn",
    items: [
      { label: "Tour Free & Easy", href: buildTourHref("Free & Easy") },
      { label: "Combo du lịch", href: buildTourHref("Combo") },
      { label: "Vé tham quan", href: buildTourHref("Vé tham quan") },
    ],
  },
  {
    title: "Du lịch hành hương",
    items: [
      { label: "Hành hương trong nước", href: "/du-lich-hanh-huong" },
      { label: "Hành hương nước ngoài", href: buildTourHref("Hành Hương") },
    ],
  },
];

const northTours = [
  { label: "Du lịch Hà Nội", href: buildTourHref("Hà Nội") },
  { label: "Du lịch Bắc Kạn", href: buildTourHref("Bắc Kạn") },
  { label: "Du lịch Bắc Ninh", href: buildTourHref("Bắc Ninh") },
  { label: "Du lịch Đông Bắc", href: buildTourHref("Đông Bắc") },
  { label: "Du lịch Điện Biên", href: buildTourHref("Điện Biên") },
  { label: "Du lịch Hạ Long", href: buildTourHref("Hạ Long") },
  { label: "Du lịch Hà Giang", href: buildTourHref("Hà Giang") },
  { label: "Du lịch Lai Châu", href: buildTourHref("Lai Châu") },
  { label: "Du lịch Lạng Sơn", href: buildTourHref("Lạng Sơn") },
  { label: "Du lịch Mộc Châu", href: buildTourHref("Mộc Châu") },
  { label: "Du lịch Mai Châu", href: buildTourHref("Mai Châu") },
  { label: "Du lịch Thanh Hóa", href: buildTourHref("Thanh Hóa") },
  { label: "Du lịch Ninh Bình", href: buildTourHref("Ninh Bình") },
  { label: "Du lịch Phú Thọ", href: buildTourHref("Phú Thọ") },
  { label: "Du lịch Sapa", href: buildTourHref("Sapa") },
  { label: "Du lịch Tây Bắc", href: buildTourHref("Tây Bắc") },
];

const holidayTours = [
  { label: "Tour lễ 2/9", href: buildTourHref("lễ 2/9") },
  { label: "Tour du lịch mùa Thu", href: buildTourHref("mùa Thu") },
  { label: "Tour du lịch mùa lúa chín", href: buildTourHref("mùa lúa chín") },
  { label: "Tour du lịch mùa hoa Tam Giác Mạch", href: buildTourHref("Tam Giác Mạch") },
  { label: "Tour bay Vietnam Airlines", href: buildTourHref("Vietnam Airlines") },
  { label: "Tour khám phá mùa hoa", href: buildTourHref("mùa hoa") },
  { label: "Tour du lịch Hành Hương", href: "/du-lich-hanh-huong" },
  { label: "Tour Noel - Tết Dương Lịch", href: buildTourHref("Noel") },
  { label: "Tour du lịch Tết Nguyên Đán", href: buildTourHref("Tết Nguyên Đán") },
  { label: "Tour du lịch lễ 30/4 - 1/5", href: "/tour-le-30-4" },
  { label: "Tour pháo hoa Đà Nẵng", href: buildTourHref("pháo hoa Đà Nẵng") },
  { label: "Tour Xe Giá Sốc", href: buildTourHref("Giá Sốc") },
];

const featuredTours = [
  { label: "Du lịch Phú Quốc", href: buildTourHref("Phú Quốc") },
  { label: "Du lịch Đà Lạt", href: buildTourHref("Đà Lạt") },
  { label: "Du lịch Đà Nẵng", href: buildTourHref("Đà Nẵng") },
  { label: "Du lịch Nha Trang", href: buildTourHref("Nha Trang") },
  { label: "Du lịch Côn Đảo", href: buildTourHref("Côn Đảo") },
  { label: "Du lịch Miền Tây", href: buildTourHref("Miền Tây") },
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
                                      <Link
                                        key={item.label}
                                        href={item.href}
                                        className="block text-[14px] text-[#4d4d4d] transition hover:text-[#f0178d]"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <div className="mb-3 text-[15px] font-bold text-[#f0178d]">
                                    Dịp lễ - mùa
                                  </div>
                                  <div className="space-y-2">
                                    {holidayTours.map((item) => (
                                      <Link
                                        key={item.label}
                                        href={item.href}
                                        className="block text-[14px] text-[#4d4d4d] transition hover:text-[#f0178d]"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <div className="mb-3 text-[15px] font-bold text-[#f0178d]">
                                    Nổi bật
                                  </div>
                                  <div className="space-y-2">
                                    {featuredTours.map((item) => (
                                      <Link
                                        key={item.label}
                                        href={item.href}
                                        className="block text-[14px] text-[#4d4d4d] transition hover:text-[#f0178d]"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {activeGroup !== "Du lịch trong nước" && (
                              <div className="grid grid-cols-2 gap-4">
                                {tourGroups
                                  .find((group) => group.title === activeGroup)
                                  ?.items.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      className="rounded-[6px] border border-[#efefef] px-4 py-3 text-[14px] text-[#4d4d4d] transition hover:border-[#f7c4df] hover:text-[#f0178d]"
                                    >
                                      {item.label}
                                    </Link>
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