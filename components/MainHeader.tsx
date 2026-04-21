"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

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

const centralTours = [
  "Du lịch Đà Nẵng",
  "Du lịch Bình Thuận",
  "Du lịch Buôn Ma Thuột",
  "Du lịch Kon Tum",
  "Du lịch Đà Lạt",
  "Du lịch Đảo Bình Ba",
  "Du lịch Đảo Bình Hưng",
  "Du lịch Hội An",
  "Du lịch Huế",
  "Du lịch Nha Trang",
  "Du lịch Ninh Chữ",
  "Du lịch Ninh Thuận",
  "Du lịch Phan Thiết",
  "Du lịch Phú Yên",
  "Du lịch Quy Nhơn",
  "Du lịch Quảng Bình",
  "Du lịch Quảng Nam",
  "Du lịch Quảng Ngãi",
  "Du lịch Bình Định",
  "Du lịch Tây Nguyên",
];

const southTours = [
  "Du lịch Tây Ninh",
  "Du lịch Phú Quốc",
  "Du lịch An Giang",
  "Du lịch Bạc Liêu",
  "Du lịch Bến Tre",
  "Du lịch Cà Mau",
  "Du lịch Cần Thơ",
  "Du lịch Côn Đảo",
  "Du lịch Châu Đốc",
  "Du lịch Đồng Tháp",
  "Du lịch Hà Tiên",
  "Du lịch Kiên Giang",
  "Du lịch Long An",
  "Du lịch Nam Du",
  "Du lịch Miền Tây",
  "Du lịch Sóc Trăng",
  "Du lịch Tiền Giang",
  "Du lịch Vũng Tàu",
  "Du lịch Sài Gòn",
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

export default function MainHeader() {
  const pathname = usePathname();
  const [showTourMenu, setShowTourMenu] = useState(false);
  const [activeGroup, setActiveGroup] = useState("Du lịch trong nước");

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

          <button
            type="button"
            className="flex h-12 w-12 shrink-0 items-center justify-center text-[#666]"
          >
            <Menu size={42} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}