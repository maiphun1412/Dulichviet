"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Benefit = {
  title: string;
  content: string;
};

type GiftCard = {
  id: number;
  code: string;
  title: string;
  description: string;
  image: string;
  bannerImage: string;
  amountLabel: string;
  expireText: string;
  applyText: string;
  benefits: Benefit[];
};

const giftCards: GiftCard[] = [
  {
    id: 1,
    code: "DLV2026",
    title: "Séc Xanh Quà Tặng — Green Gift",
    description:
      "Séc ưu đãi tặng kèm khi khách hàng tham gia chương trình hoặc sử dụng dịch vụ.",
    image: "/images/sec-xanh/sec-xanh-card-pink.png",
    bannerImage: "/images/sec-xanh/sec-xanh-banner-gold.png",
    amountLabel: "10.000.000 VND",
    expireText: "Hạn sử dụng 12 tháng kể từ ngày phát hành",
    applyText: "Áp dụng toàn bộ dịch vụ trong hệ sinh thái Du Lịch Việt",
    benefits: [
      {
        title: "VISA",
        content:
          "Tặng Séc Xanh 50% phí dịch vụ làm Visa tối đa 500.000VND.",
      },
      {
        title: "VÉ MÁY BAY",
        content:
          "Tặng Séc Xanh 50.000VND/khách/đơn hàng khi đặt vé máy bay. Ưu đãi trên giá vé, không áp dụng cho thuế, phí sân bay và phụ thu.",
      },
      {
        title: "TOUR QUỐC TẾ",
        content:
          "Tặng Séc Xanh 2.000.000VND cho tuyến Châu Âu, Úc, Mỹ. Tặng ký trước ngày khởi hành từ 5 - 3 tháng. Tặng Séc 1.000.000VND cho tuyến Đông Bắc Á (Hàn Quốc, Nhật Bản).",
      },
      {
        title: "TOUR NỘI ĐỊA",
        content:
          "Tặng Séc Xanh 100.000VND - 300.000VND cho các tour du lịch trong nước.",
      },
      {
        title: "COMBO HÀ NỘI - PHÚ QUỐC",
        content:
          "Tặng Séc Xanh 200.000VND - 300.000VND/khách áp dụng khi mua combo vé máy bay + khách sạn tuyến Hà Nội - Phú Quốc.",
      },
      {
        title: "KHÁCH SẠN",
        content:
          "Tặng Séc Xanh 8% tối đa 1.500.000 VND/đơn hàng khi đặt phòng khách sạn qua Du Lịch Việt.",
      },
      {
        title: "VALI DU LỊCH",
        content:
          "Tặng Séc Xanh 15% tối đa 500.000 VND khi mua vali trực tuyến tại mục Phụ Kiện Du Lịch.",
      },
      {
        title: "TOUR KHÁCH ĐOÀN",
        content:
          "Tặng Séc Xanh 3.000.000VND - 10.000.000VND cho đối tác doanh nghiệp. Mức ưu đãi phụ thuộc quy mô và giá trị đoàn.",
      },
    ],
  },
];

const domesticLinks = [
  "Du lịch Nam Du",
  "Du lịch Miền tây",
  "Du lịch Côn Đảo",
  "Du lịch Đà Nẵng",
  "Du lịch Đà Lạt",
  "Du lịch Nha Trang",
  "Du lịch Sapa",
  "Du lịch Phú Quốc",
];

const asiaLinks = [
  "Du lịch Nhật Bản",
  "Du lịch Trung Quốc",
  "Du lịch Malaysia",
  "Du lịch Dubai",
  "Du lịch Hàn Quốc",
  "Du lịch Đài Loan",
  "Du lịch Singapore",
];

const euLinks = [
  "Du lịch Châu Âu",
  "Du lịch Đức",
  "Du lịch Thụy Sĩ",
  "Du lịch Anh",
  "Du lịch Mỹ",
  "Du lịch Thổ Nhĩ Kỳ",
  "Du lịch Bỉ",
  "Du lịch Nga",
];

export default function SecXanhPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string>("");

  const selectedCard = useMemo(
    () => giftCards.find((item) => item.id === selectedId) ?? null,
    [selectedId]
  );

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(""), 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };
const banners = [
  "/images/sec-xanh/1.webp",
  "/images/sec-xanh/2.webp",
 
];

const [current, setCurrent] = useState(0);

const nextBanner = () => {
  setCurrent((prev) => (prev + 1) % banners.length);
};

const prevBanner = () => {
  setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
};

const getPrevIndex = () => {
  return (current - 1 + banners.length) % banners.length;
};

const getNextIndex = () => {
  return (current + 1) % banners.length;
};

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#173b2f]">
      {/* TOP BAR */}
      <div className="bg-[#e50087] text-white">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-2 text-sm">
          <div className="font-semibold">
            Hotline: <span className="text-xl text-yellow-300">1900 1177</span>
          </div>

          <div className="flex items-center gap-5 text-[14px]">
            <span>Phiếu góp ý</span>
            <span>Tài khoản</span>
            <span>Giỏ hàng</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-[56px] w-[190px]">
              <Image
                src="/images/sec-xanh/logo-dulichviet.png"
                alt="Du Lịch Việt"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-[15px] font-medium text-[#30363c] lg:flex">
            <a href="#">TOUR</a>
            <a href="#">VÉ MÁY BAY</a>
            <a href="#">KHÁCH SẠN</a>
            <a href="#">DỊCH VỤ VISA</a>
            <a href="#">THUÊ XE</a>
            <a href="#">PHỤ KIỆN DU LỊCH</a>
            <a href="#" className="text-[#173b2f]">
              SÉC XANH
            </a>
            <a href="#">TIN TỨC</a>
          </nav>

          <button className="text-3xl text-[#4d4d4d]">☰</button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#09663a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(90deg,#0a6a3e_0%,#0b6e43_40%,#10673f_100%)]" />
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-14 lg:py-16">
          <div className="relative z-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#9ff1c0]">
              Hệ sinh thái xanh
            </p>

            <h1 className="text-5xl font-black uppercase leading-none text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.22)] md:text-7xl">
              Séc Xanh
            </h1>

            <h2 className="mt-3 text-2xl font-bold uppercase text-[#ffe37d] md:text-4xl">
              Du lịch thông minh
            </h2>

            <p className="mt-5 max-w-[520px] text-[18px] leading-8 text-white/90">
              Séc Xanh là đơn vị giá trị tiêu dùng được thiết kế dành riêng
              trong Hệ Sinh Thái Xanh của Du Lịch Việt.
            </p>

            <div className="mt-8 flex flex-wrap gap-8 text-white">
              <div>
                <div className="text-4xl font-extrabold">2.300+</div>
                <div className="mt-1 text-sm uppercase tracking-[0.12em] text-white/70">
                  Lượt mua
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold">4.9★</div>
                <div className="mt-1 text-sm uppercase tracking-[0.12em] text-white/70">
                  Đánh giá
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold">12T</div>
                <div className="mt-1 text-sm uppercase tracking-[0.12em] text-white/70">
                  Hiệu lực
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative mx-auto h-[280px] w-full max-w-[520px] md:h-[360px]">
              <Image
                src="/images/sec-xanh/sec-xanh-hero.png"
                alt="Séc Xanh"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white">
  <div className="mx-auto max-w-[1180px] px-4 py-10 md:py-14">
    <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#35b46d]">
      Hệ sinh thái xanh
    </p>

    <h2 className="text-4xl font-extrabold text-[#0d5435]">
      Séc Xanh là gì?
    </h2>

    <p className="mt-5 max-w-[1100px] text-[18px] leading-8 text-[#364a42]">
      Séc Xanh định vị là một “giá trị tiêu dùng” đặc biệt được thiết kế dành
      riêng trong Hệ Sinh Thái Xanh của Du Lịch Việt. Giải pháp này cho phép
      khách hàng thanh toán và sử dụng linh hoạt nhiều dịch vụ cho mọi hành
      trình. Thay vì phải lựa chọn riêng lẻ từng dịch vụ như tour, khách sạn,
      vé máy bay,... Séc Xanh đóng vai trò là “cầu nối giá trị”, mang đến
      trải nghiệm liền mạch, tiện lợi và tiết kiệm chi phí hơn.
    </p>
  </div>
</section>

      {/* TAB + BANNER */}
<section className="mx-auto max-w-[1180px] px-4">
  <div className="mb-4 flex items-center gap-3">
    <span className="text-xl">🎁</span>
    <div>
      <div className="text-[28px] font-bold text-[#173b2f]">
        Quà Tặng Xanh
      </div>
      <div className="inline-flex rounded-full bg-[#0d5b39] px-4 py-1 text-sm font-semibold text-white">
        Green Gift
      </div>
    </div>
  </div>

  <div className="mb-10 h-[3px] w-full bg-[#d7e7dc]">
    <div className="h-full w-[180px] bg-[#2ec97d]" />
  </div>

  <div className="relative mx-auto mb-10 h-[220px] w-full max-w-[1120px] md:h-[290px]">
    {/* Nút trái */}
    <button
      onClick={prevBanner}
      className="absolute left-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-4xl text-[#5f5f5f] shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition hover:bg-white"
    >
      ‹
    </button>

    {/* Nút phải */}
    <button
      onClick={nextBanner}
      className="absolute right-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-4xl text-[#5f5f5f] shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition hover:bg-white"
    >
      ›
    </button>

    {/* Ảnh bên trái */}
    <div className="absolute left-0 top-1/2 z-0 h-[86%] w-[22%] -translate-y-1/2 overflow-hidden rounded-[22px] opacity-55 blur-[2px]">
      <Image
        src={banners[getPrevIndex()]}
        alt="Banner trước"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(70,55,20,0.22)]" />
    </div>

    {/* Ảnh chính giữa */}
    <div className="absolute left-1/2 top-1/2 z-10 h-full w-[68%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all duration-500">
      <Image
        key={banners[current]}
        src={banners[current]}
        alt="Banner Séc Xanh"
        fill
        className="object-cover"
      />
    </div>

    {/* Ảnh bên phải */}
    <div className="absolute right-0 top-1/2 z-0 h-[86%] w-[22%] -translate-y-1/2 overflow-hidden rounded-[22px] opacity-55 blur-[2px]">
      <Image
        src={banners[getNextIndex()]}
        alt="Banner sau"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(70,55,20,0.22)]" />
    </div>
  </div>
</section>

      {/* DETAIL CARD */}
      <section className="mx-auto max-w-[1180px] px-4 py-8 md:py-10">
        <div className="grid gap-6 rounded-[30px] border border-[#cfe2d7] bg-[#eef6f1] p-4 md:grid-cols-[320px_1fr] md:p-6">
          <div>
            <div className="relative h-[280px] overflow-hidden rounded-[22px] bg-[#ed0f7a] shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
              <Image
                src={giftCards[0].image}
                alt={giftCards[0].title}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-5">
              <h3 className="text-[24px] font-extrabold leading-8 text-[#0c5434]">
                {giftCards[0].title}
              </h3>

              <p className="mt-3 text-[17px] leading-8 text-[#50655c]">
                {giftCards[0].description}
              </p>

              <div className="mt-5 rounded-[18px] border border-dashed border-[#39c172] bg-white p-4">
                <div className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#2f9960]">
                  Mã Séc Gift
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[36px] font-black tracking-[0.08em] text-[#0f5334]">
                    {giftCards[0].code}
                  </span>

                  <button
                    onClick={() => handleCopy(giftCards[0].code)}
                    className="rounded-xl bg-[#2fbe68] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#25a95a]"
                  >
                    {copiedCode === giftCards[0].code ? "Đã sao chép" : "Sao chép"}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setSelectedId(giftCards[0].id)}
                className="mt-5 rounded-2xl border border-[#0f6841] bg-white px-6 py-3 text-[17px] font-semibold text-[#0f6841] transition hover:bg-[#0f6841] hover:text-white"
              >
                Xem chi tiết
              </button>
            </div>
          </div>

          <div>
            <div className="mb-4 border-b border-[#cfe0d6] pb-3">
              <h3 className="text-[28px] font-bold text-[#204635]">Ưu đãi áp dụng</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {giftCards[0].benefits.map((benefit, index) => (
                <div
                  key={`${benefit.title}-${index}`}
                  className="min-h-[145px] rounded-[16px] border border-[#c9ddd1] bg-[#f4faf6] p-4"
                >
                  <h4 className="text-[24px] font-extrabold uppercase text-[#173b2f]">
                    {benefit.title}
                  </h4>
                  <p className="mt-2 text-[16px] leading-7 text-[#4d6259]">
                    {benefit.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GUIDE */}
      <section className="mx-auto max-w-[1180px] px-4 pb-8">
        <div className="rounded-[28px] border border-[#d8e8dd] bg-[#eff8f2] p-6 md:p-8">
          <h3 className="text-[30px] font-bold text-[#174936]">
            Cách sử dụng Séc Gift
          </h3>

          <div className="mt-6 grid gap-5 md:grid-cols-4">
            {[
              "Sao chép mã từ Séc Gift",
              "Chọn tour hoặc dịch vụ muốn đặt",
              "Dán mã tại ô “Mã giảm giá” khi thanh toán",
              "Xác nhận và hưởng ưu đãi ngay!",
            ].map((step, index) => (
              <div key={step} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f6841] font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-[16px] leading-7 text-[#476057]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER LINKS */}
      <section className="mx-auto max-w-[1180px] px-4 pb-14">
        <div className="mb-7 h-[3px] w-full bg-[#ef1b8d]" />

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h4 className="mb-4 text-[26px] font-extrabold text-[#173b2f]">
              Trong nước
            </h4>
            <div className="space-y-2 text-[17px] text-[#445a52]">
              {domesticLinks.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-[26px] font-extrabold text-[#173b2f]">
              Châu Á
            </h4>
            <div className="space-y-2 text-[17px] text-[#445a52]">
              {asiaLinks.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-[26px] font-extrabold text-[#173b2f]">
              Châu Âu - Úc - Mỹ
            </h4>
            <div className="space-y-2 text-[17px] text-[#445a52]">
              {euLinks.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POPUP */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(8,26,16,0.45)] p-4 backdrop-blur-[3px]">
          <div className="relative max-h-[88vh] w-full max-w-[760px] overflow-hidden rounded-[28px] bg-white shadow-[0_22px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-start justify-between bg-[#0f6841] px-8 py-6 text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  Green Gift · Du Lịch Việt
                </p>
                <h3 className="mt-2 text-[28px] font-extrabold">
                  Séc Xanh Quà Tặng
                </h3>
              </div>

              <button
                onClick={() => setSelectedId(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-3xl leading-none transition hover:bg-white/25"
              >
                ×
              </button>
            </div>

            <div className="max-h-[calc(88vh-96px)] overflow-y-auto px-7 py-7">
              <div className="rounded-[22px] bg-[linear-gradient(135deg,#0d6b3f_0%,#0a5b36_100%)] p-6 text-white">
                <div className="grid gap-5 md:grid-cols-[160px_1fr] md:items-center">
                  <div className="text-[54px] font-black tracking-[0.05em] text-[#f2dc7a]">
                    {selectedCard.code}
                  </div>

                  <div>
                    <p className="text-lg leading-8 text-white/85">
                      {selectedCard.expireText}
                    </p>
                    <p className="mt-1 text-lg leading-8 text-white/85">
                      {selectedCard.applyText}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 border-b border-[#d5e4da] pb-3">
                <h4 className="text-[28px] font-bold text-[#1a4735]">
                  Ưu đãi áp dụng
                </h4>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {selectedCard.benefits.map((benefit, index) => (
                  <div
                    key={`${benefit.title}-popup-${index}`}
                    className="rounded-[16px] border border-[#d4e1d8] bg-[#f4faf6] p-4"
                  >
                    <h5 className="text-[22px] font-extrabold uppercase text-[#173b2f]">
                      {benefit.title}
                    </h5>
                    <p className="mt-2 text-[16px] leading-7 text-[#4d6259]">
                      {benefit.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedId(null)}
            className="absolute inset-0 -z-10 cursor-default"
            aria-label="Đóng popup"
          />
        </div>
      )}
    </main>
  );
}