"use client";

import Link from "next/link";
import {
  Building2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Search,
  Plane,
  Hotel,
  FileText,
  User,
  Pencil,
} from "lucide-react";

import HeaderTop from "@/components/HeaderTop";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";

const topTabs = [
  {
    title: "Tour TRONG NƯỚC",
    icon: <Search size={20} />,
    href: "/",
    highlightClass: "text-[#111]",
  },
  {
    title: "Tour NƯỚC NGOÀI",
    icon: <Search size={20} />,
    href: "/",
    highlightClass: "text-[#1f4ea3]",
  },
  {
    title: "Dịch vụ làm VISA",
    icon: <FileText size={20} />,
    href: "/dich-vu-visa",
    highlightClass: "text-[#c63da4]",
  },
  {
    title: "VÉ MÁY BAY GIÁ RẺ",
    icon: <Plane size={20} />,
    href: "/ve-may-bay",
    highlightClass: "text-[#19a7d8]",
  },
  {
    title: "ĐẶT KHÁCH SẠN",
    icon: <Hotel size={20} />,
    href: "/khach-san",
    highlightClass: "text-[#66bfb6]",
  },
];

const footerColumns = [
  {
    title: "Trong nước",
    items: [
      "Du lịch Nam Du",
      "Du lịch Miền tây",
      "Du lịch Côn Đảo",
      "Du lịch Đà Nẵng",
      "Du lịch Hạ Long",
      "Du lịch Đà Lạt",
      "Du lịch Nha Trang",
      "Du lịch Sapa",
      "Du lịch Phú Quốc",
      "Du lịch Phan Thiết",
    ],
  },
  {
    title: "Châu Á",
    items: [
      "Du lịch Nhật Bản",
      "Du lịch Trung Quốc",
      "Du lịch Malaysia",
      "Du lịch Dubai",
      "Du lịch Hàn Quốc",
      "Du lịch Tây Tạng",
      "Du lịch Đài Loan",
      "Du lịch Singapore",
      "Du lịch Indonesia",
      "Du lịch Thái Lan",
    ],
  },
  {
    title: "Châu Âu - Úc - Mỹ",
    items: [
      "Du lịch Châu Âu",
      "Du lịch Đức",
      "Du lịch Thụy Sĩ",
      "Du lịch Anh",
      "Du lịch Luxembourg",
      "Du lịch Mỹ",
      "Du lịch Thổ Nhĩ Kỳ",
      "Du lịch Bỉ",
      "Du lịch Nga",
      "Du lịch Pháp",
    ],
  },
];

export default function LienHePage() {
  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#222]">
      <HeaderTop />
      <MainHeader />

      <main>
        <section className="bg-[#eef1f5]">
          <div className="mx-auto max-w-[1240px] px-4 py-3 text-[14px] text-[#7a8797]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-1">{">"}</span>
            <span>Liên Hệ</span>
          </div>
        </section>

        <section className="border-b border-[#e4e4e4] bg-[#eef1f5]">
          <div className="mx-auto max-w-[1240px] px-4 py-9">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              {topTabs.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex h-[82px] items-center gap-4 border border-[#dedede] bg-white px-5 text-left shadow-sm transition hover:-translate-y-[1px]"
                >
                  <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#f6f6f6] text-[#555]">
                    {item.icon}
                  </div>
                  <span className={`text-[16px] font-medium ${item.highlightClass}`}>
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-10">
          <h1 className="mb-7 text-[34px] font-bold text-[#1d3557]">
            Thông tin liên hệ
          </h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="bg-[#f1f1f1] p-7">
              <p className="mb-6 text-[15px] leading-[1.9] text-[#444]">
                Nếu quý khách có thắc mắc hay đóng góp xin vui lòng điền vào Form
                dưới đây và gửi cho chúng tôi. Xin chân thành cảm ơn!
              </p>

              <div className="mb-5">
                <label className="mb-2 block text-[15px] text-[#333]">
                  Loại dịch vụ
                </label>
                <div className="relative">
                  <select className="h-[42px] w-full appearance-none border border-[#d5d5d5] bg-white px-4 pr-10 text-[15px] text-[#444] outline-none">
                    <option>Liên hệ thông tin Tour Trong Nước</option>
                    <option>Liên hệ thông tin Tour Nước Ngoài</option>
                    <option>Liên hệ dịch vụ Visa</option>
                    <option>Liên hệ vé máy bay</option>
                    <option>Liên hệ khách sạn</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#888]">
                    ▼
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-[15px] text-[#333]">
                  Họ tên (*)
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]"
                  />
                  <input
                    type="text"
                    className="h-[42px] w-full border border-[#d5d5d5] bg-white pl-11 pr-4 text-[15px] outline-none"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-[15px] text-[#333]">
                  Tên công ty
                </label>
                <div className="relative">
                  <Building2
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]"
                  />
                  <input
                    type="text"
                    className="h-[42px] w-full border border-[#d5d5d5] bg-white pl-11 pr-4 text-[15px] outline-none"
                  />
                </div>
              </div>

              <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[15px] text-[#333]">
                    Email (*)
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]"
                    />
                    <input
                      type="email"
                      className="h-[42px] w-full border border-[#d5d5d5] bg-white pl-11 pr-4 text-[15px] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[15px] text-[#333]">
                    Điện thoại (*)
                  </label>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]"
                    />
                    <input
                      type="text"
                      className="h-[42px] w-full border border-[#d5d5d5] bg-white pl-11 pr-4 text-[15px] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-[15px] text-[#333]">
                  Tiêu đề (*)
                </label>
                <div className="relative">
                  <Pencil
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]"
                  />
                  <input
                    type="text"
                    className="h-[42px] w-full border border-[#d5d5d5] bg-white pl-11 pr-4 text-[15px] outline-none"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-[15px] text-[#333]">
                  Nội dung (*)
                </label>
                <div className="relative">
                  <Pencil
                    size={16}
                    className="absolute left-4 top-4 text-[#999]"
                  />
                  <textarea className="h-[130px] w-full resize-none border border-[#d5d5d5] bg-white pl-11 pr-4 pt-3 text-[15px] outline-none" />
                </div>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="flex h-[74px] w-full max-w-[302px] items-center justify-between border border-[#d5d5d5] bg-white px-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-[2px] h-[28px] w-[28px] border border-[#555] bg-white" />
                    <div className="text-[14px] leading-[1.25] text-[#333]">
                      <div>Tôi không phải là người máy</div>
                      <div className="mt-1 text-[11px] text-[#888]">
                        reCAPTCHA
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#888]">reCAPTCHA</div>
                </div>

                <button
                  type="button"
                  className="h-[46px] w-full max-w-[210px] bg-[#ec008c] text-[16px] font-bold uppercase text-white transition hover:bg-[#d6007f]"
                >
                  Gửi
                </button>
              </div>
            </div>

            <div className="pt-1">
              <div className="border-b border-[#d9d9d9] pb-6">
                <h2 className="mb-3 text-[16px] font-bold uppercase text-[#ec008c]">
                  Công ty cổ phần truyền thông du lịch việt
                </h2>

                <div className="space-y-2 text-[15px] text-[#333]">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="mt-[3px] text-[#999]" />
                    <span>
                      Địa chỉ: 217 Bis Nguyễn Thị Minh Khai, Phường Cầu Ông
                      Lãnh, TP. Hồ Chí Minh
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={16} className="mt-[3px] text-[#999]" />
                    <span>Điện thoại: 1900 1177</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={16} className="mt-[3px] text-[#999]" />
                    <span>Email: info@dulichviet.com.vn</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-[#d9d9d9] py-6">
                <h2 className="mb-3 text-[16px] font-bold uppercase text-[#ec008c]">
                  Chi nhánh Hà Nội
                </h2>

                <div className="space-y-2 text-[15px] text-[#333]">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="mt-[3px] text-[#999]" />
                    <span>
                      Địa chỉ: Tầng 3, số 243 Xã Đàn, P. Đống Đa, TP. Hà Nội
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={16} className="mt-[3px] text-[#999]" />
                    <span>Điện thoại: (024) 3512 3388</span>
                  </div>
                </div>
              </div>

              <div className="py-6">
                <h2 className="mb-3 text-[16px] font-bold uppercase text-[#ec008c]">
                  Bạn cần trợ giúp?
                </h2>

                <div className="space-y-2 text-[15px] text-[#333]">
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="mt-[3px] text-[#999]" />
                    <span>
                      <strong>Hotline</strong> 1900 1177
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={16} className="mt-[3px] text-[#999]" />
                    <span>
                      <strong>Email:</strong> info@dulichviet.com.vn
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3 size={16} className="mt-[3px] text-[#999]" />
                    <span>Từ 8h30 - 18h hàng ngày</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 pb-10">
          <div className="mt-2 h-[3px] w-full bg-[#e71b8c]" />

          <div className="grid gap-8 py-8 md:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-[24px] font-bold text-[#222]">
                  {col.title}
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-[#444]">
                  {col.items.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}