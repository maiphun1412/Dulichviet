"use client";

import { Eye, Star } from "lucide-react";
import Link from "next/link";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";

const destinations = {
  "Trong nước": [
    "Du lịch Nam Du",
    "Du lịch Miền Tây",
    "Du lịch Côn Đảo",
    "Du lịch Đà Nẵng",
    "Du lịch Hạ Long",
    "Du lịch Quy Nhơn",
    "Du lịch Đà Lạt",
    "Du lịch Nha Trang",
    "Du lịch Sapa",
    "Du lịch Phú Quốc",
    "Du lịch Phan Thiết",
    "Du lịch Huế",
  ],
  "Châu Á": [
    "Du lịch Nhật Bản",
    "Du lịch Trung Quốc",
    "Du lịch Malaysia",
    "Du lịch Dubai",
    "Du lịch Thái Lan",
    "Du lịch Trương Gia Giới",
    "Du lịch Hàn Quốc",
    "Du lịch Tây Tạng",
    "Du lịch Đài Loan",
    "Du lịch Singapore",
    "Du lịch Indonesia",
    "Du lịch Phượng Hoàng Cổ Trấn",
  ],
  "Châu Âu - Úc - Mỹ": [
    "Du lịch Châu Âu",
    "Du lịch Đức",
    "Du lịch Thụy Sĩ",
    "Du lịch Anh",
    "Du lịch luxembourg",
    "Du lịch Hà Lan",
    "Du lịch Mỹ",
    "Du lịch Thổ Nhĩ Kỳ",
    "Du lịch Bỉ",
    "Du lịch Nga",
    "Du lịch Pháp",
    "Du lịch Ý",
  ],
};

function RatingStars() {
  return (
    <div className="flex items-center gap-[2px]">
      <Star size={15} className="fill-[#f5b301] text-[#f5b301]" />
      <Star size={15} className="fill-[#f5b301] text-[#f5b301]" />
      <Star size={15} className="fill-[#f5b301] text-[#f5b301]" />
      <Star size={15} className="fill-[#f5b301] text-[#f5b301]" />
      <Star size={15} className="fill-[#d9d9d9] text-[#d9d9d9]" />
    </div>
  );
}

export default function KiemTraVisaPage() {
  return (
    <div className="min-h-screen bg-white text-[#222]">
      <MainHeader />

      <main>
        {/* breadcrumb */}
        <section className="border-y border-[#e6e6e6] bg-[#f2f4f6] py-[10px]">
          <div className="mx-auto max-w-[1100px] px-4 text-[13px] text-[#7b7b7b]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-[6px]">&gt;</span>
            <span>Kiểm Tra Hồ Sơ Visa Nhật Bản Online</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-4 py-8">
          <h1 className="text-[26px] font-semibold leading-[1.35] text-[#222]">
            Kiểm tra hồ sơ visa Nhật Bản online
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[15px] text-[#333]">
            <span>Đánh giá:</span>
            <RatingStars />
            <span>
              <strong>4.34</strong>/5 trong 5 Đánh giá
            </span>
            <span className="flex items-center gap-1 text-[#444]">
              <Eye size={16} />
              <span>1,684</span>
            </span>
          </div>

          <div className="mt-6 border-t border-[#dddddd]" />

          {/* form chọn visa */}
          <div className="mx-auto mt-12 max-w-[760px]">
            <div className="grid items-center gap-4 md:grid-cols-[180px_1fr]">
              <label className="text-right text-[16px] text-[#333]">
                Bạn đang cần visa nào?
              </label>

              <select className="h-[42px] w-full border border-[#d5d5d5] bg-white px-4 text-[15px] text-[#333] outline-none">
                <option>Chọn loại visa</option>
                <option>Visa Nhật Bản</option>
                <option>Visa Hàn Quốc</option>
                <option>Visa Đài Loan</option>
                <option>Visa Châu Âu</option>
                <option>Visa Mỹ</option>
              </select>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        footer {
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
}