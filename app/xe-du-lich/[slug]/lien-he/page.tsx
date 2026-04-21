"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { getVisaPosts, type VisaPostItem } from "@/lib/visa-data";
import { Mail, Phone, Smartphone, CalendarDays  } from "lucide-react";

type ContactFormState = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  request: string;
  source: string;
};

const initialForm: ContactFormState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  startDate: "",
  endDate: "",
  pickupLocation: "",
  dropoffLocation: "",
  request: "",
  source: "",
};

export default function VisaContactPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [posts, setPosts] = useState<VisaPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState<ContactFormState>(initialForm);

  useEffect(() => {
    let mounted = true;

    async function loadPosts() {
      try {
        setIsLoading(true);
        const data = await getVisaPosts();

        if (!mounted) return;
        setPosts(data);
      } catch (error) {
        console.error("Lỗi tải trang liên hệ visa:", error);
        if (!mounted) return;
        setPosts([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadPosts();

    return () => {
      mounted = false;
    };
  }, []);

  const post = useMemo(() => {
    return posts.find((item) => item.slug === slug) || null;
  }, [posts, slug]);

  useEffect(() => {
    if (!post) return;

    setForm((prev) => ({
      ...prev,
      request: `Xe Vip Ferrari F430 cho thuê tại Sài Gòn: ${post.title}`,
    }));
  }, [post]);

  function updateField(field: keyof ContactFormState, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Form tư vấn visa:", {
      slug,
      post,
      form,
    });

    alert("Đã nhận thông tin tư vấn. Mày có thể nối tiếp API/Firebase sau.");
  }

  return (
    <div className="min-h-screen bg-white text-[#222]">
      <MainHeader />

      <main>
        {/* Breadcrumb */}
        <section className="border-y border-[#e6e6e6] bg-[#f2f4f6] py-[10px]">
          <div className="mx-auto max-w-[1100px] px-4 text-[13px] text-[#7b7b7b]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-[6px]">&gt;</span>
            <span>Liên Hệ Tư Vấn Visa</span>
          </div>
        </section>

        {/* Banner riêng */}
        <section className="bg-white">
          <div className="h-[340px] w-full overflow-hidden">
            <img
              src="/visa/visa.webp"
              alt="Banner visa"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Form riêng */}
        <section className="bg-white pb-10">
          <div className="mx-auto -mt-[130px] max-w-[1100px] px-4">
  {isLoading ? (
    <div className="relative z-10 border border-[#d9d9d9] bg-white p-8 text-[18px] text-[#666] shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
      Đang tải dữ liệu...
    </div>
  ) : (

   <div className="border border-[#d9d9d9] bg-white">
  <div className="grid grid-cols-1 lg:grid-cols-[540px_1fr]">
    {/* Cột trái */}
    <div className="bg-white px-10 pb-10 pt-8">
      <div className="text-center text-[18px] font-bold leading-[1.35] text-[#ec008c]">
        {post?.title || "Dịch vụ thuê xe Mercedes S500 VIP tại TPHCM và Hà Nội"}
      </div>

      <h1 className="mt-3 text-center text-[28px] font-bold leading-none text-[#2a2a2a] md:text-[32px]">
        YÊU CẦU THUÊ XE
      </h1>

      <div className="mt-6 flex flex-col items-center">
        <div className="flex items-center gap-3 text-[16px] text-[#333]">
          <Mail size={16} className="text-[#ec008c]" />
          <span>thuexe@dulichviet.com.vn</span>
        </div>

        <div className="mt-2 flex items-center gap-3 text-[16px] text-[#333]">
          <Phone size={16} className="text-[#ec008c]" />
          <span>028.7305.6789 - Ext: 555</span>
        </div>

        <div className="mt-8 flex min-h-[62px] min-w-[280px] items-center justify-center gap-4 rounded-[4px] border border-[#ec008c] bg-white px-6">
          <Smartphone size={32} className="text-[#333]" />
          <span className="text-[28px] font-semibold text-[#24364a] md:text-[32px]">
            0902.976.588
          </span>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <img
          src="/trangchu/4.jpg"
          alt="Xe du lịch liên hệ"
          width={420}
          height={260}
          className="h-auto w-full max-w-[420px] object-contain"
        />
      </div>
    </div>

    {/* Cột phải */}
    <div className="border-l border-[#e5e5e5] bg-white px-7 pb-10 pt-8">
      <div className="mb-4 text-[14px] text-[#666]">
        Dấu <span className="text-[#ec008c]">*</span> là thông tin bắt buộc
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          placeholder="Họ tên (*)"
          className="h-[48px] w-full border border-[#d8d8d8] bg-white px-4 text-[12px] text-[#222] outline-none placeholder:text-[#999]"
        />

        <input
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="Email (*)"
          className="h-[48px] w-full border border-[#d8d8d8] bg-white px-4 text-[12px] text-[#222] outline-none placeholder:text-[#999]"
        />

        <input
          type="text"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="Số điện thoại"
          className="h-[48px] w-full border border-[#d8d8d8] bg-white px-4 text-[12px] text-[#222] outline-none placeholder:text-[#999]"
        />

        <input
          type="text"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          placeholder="Địa chỉ (*)"
          className="h-[48px] w-full border border-[#d8d8d8] bg-white px-4 text-[12px] text-[#222] outline-none placeholder:text-[#999]"
        />

        <div className="relative">
          <input
            type="text"
            value={form.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
            placeholder="Nhập ngày đi"
            className="h-[48px] w-full border border-[#d8d8d8] bg-white px-4 pr-10 text-[12px] text-[#222] outline-none placeholder:text-[#999]"
          />
          <CalendarDays
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555]"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            value={form.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
            placeholder="Nhập ngày về"
            className="h-[48px] w-full border border-[#d8d8d8] bg-white px-4 pr-10 text-[12px] text-[#222] outline-none placeholder:text-[#999]"
          />
          <CalendarDays
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555]"
          />
        </div>

        <input
          type="text"
          value={form.pickupLocation}
          onChange={(e) => updateField("pickupLocation", e.target.value)}
          placeholder="Nhập điểm nhận đi"
          className="h-[48px] w-full border border-[#d8d8d8] bg-white px-4 text-[12px] text-[#222] outline-none placeholder:text-[#999]"
        />

        <input
          type="text"
          value={form.dropoffLocation}
          onChange={(e) => updateField("dropoffLocation", e.target.value)}
          placeholder="Nhập điểm đến"
          className="h-[48px] w-full border border-[#d8d8d8] bg-white px-4 text-[12px] text-[#222] outline-none placeholder:text-[#999]"
        />

        <textarea
          rows={4}
          value={form.request}
          onChange={(e) => updateField("request", e.target.value)}
          placeholder="Yêu cầu (*)"
          className="w-full resize-none border border-[#d8d8d8] bg-white px-4 py-3 text-[12px] text-[#222] outline-none placeholder:text-[#999]"
        />

        <input
          type="text"
          value={form.source}
          onChange={(e) => updateField("source", e.target.value)}
          placeholder="Bạn biết thông tin qua"
          className="h-[48px] w-full border border-[#d8d8d8] bg-white px-4 text-[12px] text-[#222] outline-none placeholder:text-[#999]"
        />

        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex min-h-[78px] w-full max-w-[270px] items-center border border-[#d8d8d8] bg-white px-3">
            <div className="h-7 w-7 border border-[#777]" />
            <div className="ml-3 text-[13px] leading-[1.2] text-[#333]">
              Tôi không phải là người máy
            </div>
            <div className="ml-auto text-[11px] text-[#777]">
              reCAPTCHA
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex h-[48px] min-w-[180px] items-center justify-center rounded-[4px] bg-[#ec008c] px-8 text-[18px] font-semibold text-white transition hover:bg-[#d1007c]"
          >
            Gửi
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
    
  )}
</div>
        </section>
      </main>

      <Footer />
    </div>
  );
}