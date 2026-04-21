"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Car,
  CirclePlus,
  Eye,
  Menu,
  Star,
  Users,
} from "lucide-react";

import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import {
  getCarPosts,
  getCarServicePage,
  type CarPostItem,
  type CarServicePage,
} from "@/lib/car-data";

function StarRating({
  rating,
  reviewCount,
  viewCount,
}: {
  rating: number;
  reviewCount: number;
  viewCount: number;
}) {
  const filledStars = Math.round(rating);

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-[15px] text-[#333]">
      <span className="font-medium">Đánh giá:</span>

      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={15}
            className={
              index < filledStars
                ? "fill-[#f4b000] text-[#f4b000]"
                : "fill-[#d8d8d8] text-[#d8d8d8]"
            }
          />
        ))}
      </div>

      <span>
        <strong>{rating.toFixed(2)}</strong>/5 trong {reviewCount} Đánh giá
      </span>

      <span className="flex items-center gap-1 text-[#555]">
        <Eye size={15} />
        {viewCount.toLocaleString("vi-VN")}
      </span>
    </div>
  );
}

function CarCard({ item }: { item: CarPostItem }) {
  return (
    <div className="overflow-hidden border border-[#d9d9d9] bg-white">
      <Link href={`/xe-du-lich/${item.slug}`} className="block">
        <div className="relative h-[230px] w-full bg-[#f3f3f3]">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="relative">
        <Link
          href={`/xe-du-lich/${item.slug}/lien-he`}
          className="absolute right-0 top-[-34px] inline-flex h-[34px] min-w-[112px] items-center justify-center bg-[#ec008c] px-5 text-[15px] font-medium text-white"
        >
          LIÊN HỆ
        </Link>
      </div>

      <div className="px-4 pb-4 pt-3">
        <Link href={`/xe-du-lich/${item.slug}`} className="block">
          <h3 className="line-clamp-2 min-h-[56px] text-[16px] font-medium uppercase leading-[1.4] text-[#2d2d2d] hover:text-[#ec008c]">
            {item.title}
          </h3>
        </Link>

        <div className="mx-auto mt-3 h-[2px] w-[34px] bg-[#ec008c]" />

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[#666]">
          <span className="flex items-center gap-1">
            <CirclePlus size={14} />
            <span className="max-w-[74px] truncate">{item.brand}</span>
          </span>

          <span className="flex items-center gap-1">
            <Car size={14} />
            <span>{item.year || 0}</span>
          </span>

          <span className="flex items-center gap-1">
            <Users size={14} />
            <span>{item.seats} Chỗ</span>
          </span>

          <Link
            href={`/xe-du-lich/${item.slug}`}
            className="flex items-center gap-1 hover:text-[#ec008c]"
          >
            <CirclePlus size={14} />
            <span>Chi tiết</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function XeDuLichPage() {
  const [pageData, setPageData] = useState<CarServicePage | null>(null);
  const [posts, setPosts] = useState<CarPostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);

        const [pageRes, postsRes] = await Promise.all([
          getCarServicePage(),
          getCarPosts(),
        ]);

        if (!mounted) return;

        setPageData(pageRes);
        setPosts(postsRes);
      } catch (error) {
        console.error("Lỗi tải trang xe du lịch:", error);
        if (!mounted) return;
        setPageData(null);
        setPosts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const featuredRating = useMemo(() => {
    if (!posts.length) return { rating: 4.93, reviewCount: 715, viewCount: 54575 };

    const hotPost =
      posts.find((item) => item.isHot) ||
      posts.find((item) => item.showOnHome) ||
      posts[0];

    return {
      rating: hotPost?.rating || 4.93,
      reviewCount: hotPost?.reviewCount || 715,
      viewCount: hotPost?.viewCount || 54575,
    };
  }, [posts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="mx-auto max-w-[1180px] px-4 py-10 text-[16px] text-[#666]">
          Đang tải dữ liệu xe du lịch...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#222]">
      <MainHeader />

      <main>
        {/* Banner */}
        <section className="relative h-[380px] w-full overflow-hidden bg-[#f3f3f3] md:h-[530px]">
          <Image
            src={
              pageData?.heroImage ||
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop"
            }
            alt={pageData?.title || "Xe du lịch"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </section>

        {/* Breadcrumb */}
        <section className="bg-[#eef1f4]">
          <div className="mx-auto max-w-[1180px] px-4 py-3 text-[14px] text-[#7a7a7a]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-1">{">"}</span>
            <span>Xe Du Lịch</span>
          </div>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-[1180px] px-4 py-10">
          <h1 className="text-[28px] font-semibold leading-tight text-[#1565c0] md:text-[46px]">
            {pageData?.title || "Xe du lịch"}
          </h1>

          <StarRating
            rating={featuredRating.rating}
            reviewCount={featuredRating.reviewCount}
            viewCount={featuredRating.viewCount}
          />

          <div className="mt-7 text-[17px] leading-8 text-[#222]">
            {pageData?.introHtml ? (
              <div
                dangerouslySetInnerHTML={{ __html: pageData.introHtml }}
                className="[&>p]:mb-4 [&_strong]:font-semibold [&_a]:text-[#1565c0]"
              />
            ) : (
              <p>
                <strong>Xe du lịch</strong> – Phòng vận chuyển công ty Du Lịch
                Việt cung cấp và mang đến cho quý khách dịch vụ thuê xe du lịch,
                thuê xe dịch vụ với giá cực tốt.
              </p>
            )}
          </div>

          {/* Form thuê xe */}
          <div className="mt-8 border border-[#d7d7d7] bg-white px-5 py-6 md:px-8">
            <h2 className="text-center text-[24px] font-semibold uppercase text-[#ec008c]">
              {pageData?.bookingTitle || "Thuê xe trực tuyến"}
            </h2>

            <div className="mt-5 text-[15px] text-[#555]">
              {pageData?.bookingNote ? (
                <div
                  dangerouslySetInnerHTML={{ __html: pageData.bookingNote }}
                />
              ) : (
                <span>Dấu * là thông tin bắt buộc</span>
              )}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[15px] font-medium text-[#333]">
                  Nhập ngày đi <span className="text-[#ec008c]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="h-[44px] w-full border border-[#d9d9d9] px-3 outline-none focus:border-[#ec008c]"
                  />
                  <CalendarDays
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[#333]">
                  Nhập ngày về <span className="text-[#ec008c]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="h-[44px] w-full border border-[#d9d9d9] px-3 outline-none focus:border-[#ec008c]"
                  />
                  <CalendarDays
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[#333]">
                  Nhập điểm nhận đi <span className="text-[#ec008c]">*</span>
                </label>
                <input className="h-[44px] w-full border border-[#d9d9d9] px-3 outline-none focus:border-[#ec008c]" />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[#333]">
                  Nhập điểm đến <span className="text-[#ec008c]">*</span>
                </label>
                <input className="h-[44px] w-full border border-[#d9d9d9] px-3 outline-none focus:border-[#ec008c]" />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[#333]">
                  Họ Tên <span className="text-[#ec008c]">*</span>
                </label>
                <input className="h-[44px] w-full border border-[#d9d9d9] px-3 outline-none focus:border-[#ec008c]" />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[#333]">
                  Email <span className="text-[#ec008c]">*</span>
                </label>
                <input className="h-[44px] w-full border border-[#d9d9d9] px-3 outline-none focus:border-[#ec008c]" />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[#333]">
                  Điện thoại <span className="text-[#ec008c]">*</span>
                </label>
                <input className="h-[44px] w-full border border-[#d9d9d9] px-3 outline-none focus:border-[#ec008c]" />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[#333]">
                  Chọn loại dịch vụ xe <span className="text-[#ec008c]">*</span>
                </label>
                <select className="h-[44px] w-full border border-[#d9d9d9] bg-white px-3 outline-none focus:border-[#ec008c]">
                  <option>Chọn dịch vụ</option>
                  <option>Thuê xe 4 chỗ</option>
                  <option>Thuê xe 7 chỗ</option>
                  <option>Thuê xe 16 chỗ</option>
                  <option>Thuê xe 24 chỗ</option>
                  <option>Thuê xe 29 chỗ</option>
                  <option>Thuê xe 35 chỗ</option>
                  <option>Thuê xe 45 chỗ</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-[15px] font-medium text-[#333]">
                Thêm thông tin và Yêu cầu khác
              </label>
              <textarea className="min-h-[110px] w-full border border-[#d9d9d9] px-3 py-3 outline-none focus:border-[#ec008c]" />
            </div>

            <div className="mt-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex h-[70px] w-[270px] items-center gap-3 border border-[#d9d9d9] px-4">
                <div className="h-[28px] w-[28px] border border-[#999] bg-white" />
                <div className="text-[14px] leading-[1.3] text-[#333]">
                  Tôi không phải là người máy
                  <div className="mt-1 text-[11px] text-[#777]">
                    reCAPTCHA
                  </div>
                </div>
              </div>

              <button className="h-[44px] w-full bg-[#d91a8b] px-8 text-[18px] font-medium text-white transition hover:bg-[#bf1378] md:w-[375px]">
                THUÊ XE NHANH
              </button>
            </div>
          </div>

          {/* Ảnh dàn xe + mô tả */}
          <div className="mt-10 border-t border-[#d8d8d8] pt-8">
            <div className="mx-auto max-w-[520px]">
              <div className="relative h-[170px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1400&auto=format&fit=crop"
                  alt="Bộ sưu tập xe du lịch"
                  fill
                  sizes="520px"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-5 text-[17px] leading-8 text-[#222]">
              {pageData?.vehicleCollectionHtml ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: pageData.vehicleCollectionHtml,
                  }}
                  className="[&>p]:mb-4 [&_strong]:font-semibold"
                />
              ) : (
                <p>
                  Để có thể lựa chọn cho mình dịch vụ thuê xe giá rẻ, thuê xe 20
                  chỗ, thuê xe 24 chỗ, thuê xe 29 chỗ, thuê xe 35 chỗ, thuê xe 39
                  chỗ, thuê xe 45 chỗ; quý khách có thể tham khảo thêm thông tin
                  các loại xe du lịch.
                </p>
              )}
            </div>
          </div>

          {/* Grid bài xe */}
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((item) => (
              <CarCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}