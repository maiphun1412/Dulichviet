"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Search, Star } from "lucide-react";

import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import {
  getVisaPosts,
  getVisaServicePage,
  type VisaPostItem,
  type VisaServicePage,
} from "@/lib/visa-data";

function VisaStars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={15}
          className={
            index < count
              ? "fill-[#f4b000] text-[#f4b000]"
              : "fill-[#d9d9d9] text-[#d9d9d9]"
          }
        />
      ))}
    </div>
  );
}

function SectionTitle({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-[29px] font-semibold leading-none text-[#222]">
        {title}
      </h2>

      {href ? (
        <Link
          href={href}
          className="text-[14px] font-normal text-[#ec008c] hover:underline"
        >
          <span className="inline-flex items-center gap-1">
            <span className="text-[12px]">◱</span>
            <span>Xem tất cả</span>
          </span>
        </Link>
      ) : null}
    </div>
  );
}

function VisaCard({ post }: { post: VisaPostItem }) {
  return (
    <Link
  href={`/dich-vu-visa/${post.slug}`}
  className="group block w-[334px] min-w-[334px] overflow-hidden border border-[#dddddd] bg-white"
>
      <div className="relative h-[232px] w-full overflow-hidden bg-[#f3f3f3]">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          sizes="334px"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />

        <div className="absolute left-0 top-[12px] bg-[rgba(0,0,0,0.48)] px-[10px] py-[6px] text-[13px] leading-none text-white">
          {post.tagLabel || post.region}
        </div>
      </div>

      <div className="min-h-[118px] px-[12px] pb-[12px] pt-[10px]">
        <h3 className="line-clamp-2 text-[16px] font-normal leading-[1.35] text-[#222]">
          {post.title}
        </h3>

        <div className="mt-3 text-[15px] font-semibold text-black">Liên hệ</div>
      </div>
    </Link>
  );
}
function PriceTable({ pageData }: { pageData: VisaServicePage }) {
  return (
    <section className="mx-auto max-w-[1085px] px-4 py-6">
      <h2 className="mb-3 text-[15px] font-semibold text-[#222]">
        {pageData.priceTableTitle}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] table-fixed border-collapse border border-[#8a8a8a] text-left">
          <thead>
            <tr>
              <th className="w-[38%] border border-[#8a8a8a] px-3 py-3 text-[15px] font-semibold text-[#222]">
                Loại visa
              </th>
              <th className="w-[37%] border border-[#8a8a8a] px-3 py-3 text-[15px] font-semibold text-[#222]">
                Thời hạn
              </th>
              <th className="w-[12%] border border-[#8a8a8a] px-3 py-3 text-[15px] font-semibold text-[#222]">
                Giá gốc
              </th>
              <th className="w-[13%] border border-[#8a8a8a] px-3 py-3 text-[15px] font-semibold text-[#222]">
                Giá ưu đãi
              </th>
            </tr>
          </thead>

          <tbody>
            {pageData.priceGroups.map((group) => (
              <Fragment key={group.title}>
                <tr>
                  <td
                    colSpan={4}
                    className="border border-[#8a8a8a] px-3 py-3 text-[16px] font-bold uppercase text-[#ec008c]"
                  >
                    {group.title}
                  </td>
                </tr>

                {group.rows.map((row, index) => (
                  <tr key={`${group.title}-${index}`}>
                    <td className="border border-[#8a8a8a] px-3 py-2 text-[12px] leading-6 text-[#444]">
                      <Link
                        href={`/dich-vu-visa/${encodeURIComponent(
                          row.visaType
                            .toLowerCase()
                            .replace(/[()]/g, "")
                            .replace(/\s+/g, "-")
                        )}`}
                        className="underline hover:text-[#ec008c]"
                      >
                        {row.visaType}
                      </Link>
                    </td>

                    <td className="border border-[#8a8a8a] px-3 py-2 text-[12px] leading-6 text-[#444]">
                      {row.duration}
                    </td>

                    <td className="border border-[#8a8a8a] px-3 py-2 text-[12px] leading-6 text-[#444]">
                      <span className="underline">{row.originalPrice}</span>
                    </td>

                    <td className="border border-[#8a8a8a] px-3 py-2 text-[12px] font-bold leading-6 text-black">
                      {row.salePrice}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}

            <tr>
              <td
                colSpan={4}
                className="border border-[#8a8a8a] px-3 py-5 text-center text-[12px] text-[#555]"
              >
                {pageData.priceTableFooter}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function VisaServicePage() {
  const [pageData, setPageData] = useState<VisaServicePage | null>(null);
  const [posts, setPosts] = useState<VisaPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);

        const [pageRes, postsRes] = await Promise.all([
          getVisaServicePage(),
          getVisaPosts(),
        ]);

        if (!mounted) return;
        setPageData(pageRes);
        setPosts(postsRes);
      } catch (error) {
        console.error("Lỗi tải trang visa:", error);

        if (!mounted) return;
        setPageData(null);
        setPosts([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const hotPosts = useMemo(
    () => posts.filter((item) => item.isHot && item.showOnHome).slice(0, 8),
    [posts]
  );

  const asiaPosts = useMemo(
    () =>
      posts
        .filter(
          (item) =>
            item.showOnHome &&
            (item.region === "Visa Châu Á" || item.category === "Visa Châu Á")
        )
        .slice(0, 8),
    [posts]
  );

  const africaPosts = useMemo(
    () =>
      posts
        .filter(
          (item) =>
            item.showOnHome &&
            (item.region === "Visa Châu Phi" ||
              item.category === "Visa Châu Phi")
        )
        .slice(0, 8),
    [posts]
  );

const handleSearch = () => {
  const keyword = searchText.trim();

  if (!keyword) return;

  window.location.href = `/dich-vu-visa/tim-kiem?q=${encodeURIComponent(keyword)}`;
};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="mx-auto max-w-[1085px] px-4 py-10 text-[18px] text-[#666]">
          Đang tải dữ liệu visa...
        </div>
        <Footer />
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="mx-auto max-w-[1085px] px-4 py-10">
          <div className="text-[28px] font-bold text-[#222]">
            Không có dữ liệu trang visa
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#222]">
      <MainHeader />

      <main className="overflow-hidden">
        {/* HERO */}
        <section className="relative h-[490px] w-full overflow-visible">
          <Image
            src={pageData.heroImage}
            alt={pageData.heroTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[rgba(0,0,0,0.30)]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto w-full max-w-[1200px] px-4 text-center">
              <h1 className="mx-auto max-w-[860px] text-[29px] font-extrabold leading-[1.2] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.28)] md:text-[33px]">
                {pageData.heroTitle}
              </h1>

              <p className="mx-auto mt-[10px] max-w-[920px] text-[15px] font-semibold text-white">
                {pageData.heroSubtitle}
              </p>
            </div>
          </div>

          {/* SEARCH BOX ĐÈ XUỐNG */}
          <div className="absolute bottom-0 left-1/2 z-20 w-full max-w-[720px] -translate-x-1/2 translate-y-1/2 px-4">
            <div className="rounded-[2px] bg-[#f3f3f3] p-[18px] shadow-[0_8px_22px_rgba(0,0,0,0.14)]">
              <div className="grid grid-cols-[1fr_56px] overflow-hidden border border-[#cfcfcf] bg-white">
                <input
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleSearch();
  }}
  placeholder={pageData.searchPlaceholder}
  className="h-[46px] px-[16px] text-[15px] text-[#222] outline-none placeholder:text-[#9b9b9b]"
/>

                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex items-center justify-center bg-[#ec008c] text-white transition hover:bg-[#d1007c]"
                >
                  <Search size={25} strokeWidth={2.3} />
                </button>
              </div>

              <div className="mt-[12px] flex flex-wrap items-center gap-x-[18px] gap-y-[8px] text-[14px] text-[#555]">
                {pageData.searchTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchText(tag)}
                    className="transition hover:text-[#ec008c]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-[#cc1b8d] pb-[26px] pt-[74px] text-white">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-y-8 px-4 text-center md:grid-cols-4">
            {pageData.stats.map((item) => (
              <div key={item.label}>
                <div className="text-[13px] font-normal">{item.label}</div>
                <div className="mt-[8px] text-[35px] font-extrabold leading-none md:text-[37px]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BẢNG GIÁ */}
        <PriceTable pageData={pageData} />

        {/* TIN VISA HOT */}
        <section className="mx-auto max-w-[1085px] px-4 pb-6 pt-1">
          <SectionTitle title={pageData.hotSectionTitle} />

          <div className="overflow-x-auto overflow-y-hidden pb-3">
            <div className="flex min-w-max gap-4">
              {hotPosts.map((post) => (
                <VisaCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* BREADCRUMB */}
        <section className="mt-2 border-y border-[#e5e5e5] bg-[#f2f4f6] py-[10px]">
          <div className="mx-auto max-w-[1085px] px-4 text-[13px] text-[#7a7a7a]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-[5px]">&gt;</span>
            <span>Làm Visa</span>
          </div>
        </section>

        {/* INTRO */}
        <section className="mx-auto max-w-[1085px] px-4 py-10">
          <h2 className="text-[30px] font-semibold leading-none text-[#1565c0]">
            {pageData.introTitle}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[16px] text-[#333]">
            <span>Đánh giá:</span>
            <VisaStars count={pageData.introRating} />
            <span>{pageData.introRatingText}</span>

            <span className="flex items-center gap-1 text-[#444]">
              <Eye size={16} />
              <span>{pageData.introViews}</span>
            </span>
          </div>

          <div className="mt-5 space-y-5 text-[17px] leading-8 text-[#333]">
            {pageData.introParagraphs.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="inline-flex h-[40px] items-center justify-center rounded-full bg-[#ec008c] px-10 text-[16px] font-medium text-white transition hover:bg-[#d1007c]"
            >
              {pageData.ctaText}
            </button>
          </div>
        </section>

        {/* VISA CHÂU Á */}
        <section className="mx-auto max-w-[1085px] px-4 py-2">
          <SectionTitle title={pageData.asiaSectionTitle} href="/dich-vu-visa" />

          <div className="overflow-x-auto overflow-y-hidden pb-3">
            <div className="flex min-w-max gap-4">
              {asiaPosts.map((post) => (
                <VisaCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* VISA CHÂU PHI */}
        <section className="mx-auto max-w-[1085px] px-4 pb-10 pt-6">
          <SectionTitle
            title={pageData.africaSectionTitle}
            href="/dich-vu-visa"
          />

          <div className="overflow-x-auto overflow-y-hidden pb-3">
            <div className="flex min-w-max gap-4">
              {africaPosts.map((post) => (
                <VisaCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}