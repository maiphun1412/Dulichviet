"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Mail, Smartphone } from "lucide-react";

import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { getHotelBySlug, type HotelItem } from "@/lib/hotel-data";

type ContactFormState = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  request: string;
  source: string;
};

const initialForm: ContactFormState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  request: "",
  source: "",
};

export default function HotelContactPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [hotel, setHotel] = useState<HotelItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ContactFormState>(initialForm);

  useEffect(() => {
    let mounted = true;

    async function loadHotel() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getHotelBySlug(slug);

        if (!mounted) return;

        if (!data) {
          setHotel(null);
          return;
        }

        setHotel(data);
        setForm((prev) => ({
          ...prev,
          request: `Tôi muốn được tư vấn và báo giá khách sạn ${data.name}.`,
        }));
      } catch (error) {
        console.error("Lỗi tải khách sạn:", error);
        if (!mounted) return;
        setHotel(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadHotel();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Hotel contact submit:", {
      hotelSlug: hotel?.slug,
      hotelName: hotel?.name,
      ...form,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-16 text-center text-[18px] text-[#666]">
          Đang tải thông tin khách sạn...
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-16 text-center">
          <h1 className="text-[28px] font-bold text-[#333]">
            Không tìm thấy thông tin khách sạn
          </h1>
          <Link
            href="/khach-san"
            className="mt-4 inline-block text-[15px] font-semibold text-[#ec008c]"
          >
            Quay lại danh sách khách sạn
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      <main className="bg-white">
        <section className="relative">
          <div className="relative h-[360px] w-full overflow-hidden sm:h-[390px] lg:h-[420px]">
            <Image
              src="/images/hotels/contact-hotel-bg.jpg"
              alt="Liên hệ đặt phòng"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1180px] px-4">
            <div className="relative mx-auto -mt-[260px] w-full max-w-[980px] scale-[0.9] origin-top border border-[#d9d9d9] bg-[rgba(255,255,255,0.9)] px-5 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-[0.95fr_1.05fr]">
                <div className="flex flex-col items-center text-center">
                  <h2 className="max-w-[520px] text-[13px] font-semibold uppercase leading-[1.3] text-[#ec008c] lg:text-[20px]">
                    {hotel.name}
                  </h2>

                  <h1 className="mt-3 text-[30px] font-bold uppercase leading-[1.1] tracking-[-1px] text-[#202020] max-[1024px]:text-[42px] max-[640px]:text-[34px]">
                    LIÊN HỆ ĐẶT PHÒNG
                  </h1>

                  <div className="mt-4 flex items-center gap-2 text-[14px] text-[#444] lg:text-[15px]">
                    <Mail size={16} className="text-[#ec008c]" />
                    <a
                      href="mailto:khachsan@dulichviet.com.vn"
                      className="hover:text-[#ec008c]"
                    >
                      khachsan@dulichviet.com.vn
                    </a>
                  </div>

                  <div className="mt-6">
                    <div className="inline-flex min-h-[90px] min-w-[260px] items-center gap-4 rounded-[4px] border border-[#ec008c] bg-white px-5 py-3">
                      <Smartphone
                        size={36}
                        strokeWidth={2.1}
                        className="text-[#333]"
                      />
                      <div className="text-left text-[18px] font-semibold leading-[1.18] tracking-[-0.3px] text-[#2d2d2d] max-[640px]:text-[24px]">
                        <div>
                          <a href="tel:0909502588" className="hover:text-[#ec008c]">
                            0909.502.588
                          </a>
                        </div>
                        <div>
                          <a href="tel:0944242705" className="hover:text-[#ec008c]">
                            0944.242.705
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Image
                      src="/images/hotels/contact-hotel-illustration.png"
                      alt="Liên hệ đặt phòng"
                      width={360}
                      height={250}
                      priority
                      className="h-auto w-full max-w-[280px] object-contain"
                    />
                  </div>
                </div>

                <div className="mx-auto w-full max-w-[520px] pt-1">
                  <div className="mb-4 text-[12px] text-[#555]">
                    Dấu <span className="text-[#ec008c]">*</span> là thông tin bắt buộc
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="mb-[7px] block text-[14px] font-semibold text-[#333]">
                        Họ tên <span className="text-[#ec008c]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className="h-[36px] w-full border border-[#d8d8d8] bg-white px-3 text-[14px] text-[#222] outline-none transition focus:border-[#ec008c]"
                      />
                    </div>

                    <div>
                      <label className="mb-[7px] block text-[14px] font-semibold text-[#333]">
                        Email <span className="text-[#ec008c]">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="h-[36px] w-full border border-[#d8d8d8] bg-white px-3 text-[14px] text-[#222] outline-none transition focus:border-[#ec008c]"
                      />
                    </div>

                    <div>
                      <label className="mb-[7px] block text-[14px] font-semibold text-[#333]">
                        Số điện thoại <span className="text-[#ec008c]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="h-[36px] w-full border border-[#d8d8d8] bg-white px-3 text-[14px] text-[#222] outline-none transition focus:border-[#ec008c]"
                      />
                    </div>

                    <div>
                      <label className="mb-[7px] block text-[14px] font-semibold text-[#333]">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className="h-[36px] w-full border border-[#d8d8d8] bg-white px-3 text-[14px] text-[#222] outline-none transition focus:border-[#ec008c]"
                      />
                    </div>

                    <div>
                      <label className="mb-[7px] block text-[14px] font-semibold text-[#333]">
                        Yêu cầu <span className="text-[#ec008c]">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={form.request}
                        onChange={(e) => handleChange("request", e.target.value)}
                        className="h-[90px] w-full resize-none border border-[#d8d8d8] bg-white px-3 py-2.5 text-[14px] text-[#222] outline-none transition focus:border-[#ec008c]"
                      />
                    </div>

                    <div>
                      <label className="mb-[7px] block text-[14px] font-semibold text-[#333]">
                        Bạn biết thông tin qua
                      </label>
                      <input
                        type="text"
                        value={form.source}
                        onChange={(e) => handleChange("source", e.target.value)}
                        className="h-[36px] w-full border border-[#d8d8d8] bg-white px-3 text-[14px] text-[#222] outline-none transition focus:border-[#ec008c]"
                      />
                    </div>

                    <div className="grid grid-cols-1 items-end gap-4 pt-2 sm:grid-cols-[290px_170px] sm:justify-between">
                      <div className="flex h-[72px] w-full max-w-[290px] items-center justify-between border border-[#d3d3d3] bg-[#f9f9f9] px-3">
                        <div className="flex items-center gap-3">
                          <div className="h-[26px] w-[26px] border border-[#7a7a7a] bg-white" />
                          <div className="text-[11px] leading-[1.1] text-[#333]">
                            <div>Tôi không phải là người máy</div>
                            
                          </div>
                        </div>

                        <div className="text-right text-[9px] leading-[1.15] text-[#777]">
                          <div className="text-[11px] font-semibold">reCAPTCHA</div>
                          <div>Quyền riêng tư - Điều khoản</div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="h-[38px] w-full max-w-[170px] justify-self-start bg-[#ec008c] text-[20px] font-semibold text-white transition hover:bg-[#d6007f]"
                      >
                        Gửi
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[260px] sm:h-[300px] lg:h-[330px]" />
        </section>
      </main>

      <Footer />
    </div>
  );
}