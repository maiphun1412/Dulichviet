"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

const navItems = [
  { label: "TOUR", href: "/" },
  { label: "VÉ MÁY BAY", href: "/ve-may-bay" },
  { label: "KHÁCH SẠN", href: "/khach-san" },
  { label: "DỊCH VỤ VISA", href: "#" },
  { label: "THUÊ XE", href: "#" },
  { label: "PHỤ KIỆN DU LỊCH", href: "#" },
  { label: "SỨC XANH", href: "#" },
  { label: "TIN TỨC", href: "/tin-tuc" },
];

export default function MainHeader() {
  const pathname = usePathname();

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
   

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href;
  };

  return (
    <header className="bg-white">
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
            {navItems.map((item) => (
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
            ))}
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