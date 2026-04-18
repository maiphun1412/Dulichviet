import HeaderTop from "@/components/HeaderTop";
import MainHeader from "@/components/MainHeader";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Eye } from "lucide-react";
import {
  formatFlightDetailDate,
  getFlightPostBySlug,
  getFlightPosts,
} from "@/lib/flight-posts";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function FlightPostDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const article = await getFlightPostBySlug(slug);

  if (!article) {
    return (
      <main className="min-h-screen bg-white text-[#333]">
        <HeaderTop />
        <MainHeader />
        <div className="mx-auto max-w-[1400px] px-5 py-20 text-[24px] lg:px-8">
          Không tìm thấy bài viết.
        </div>
        <FloatingContact />
        <Footer />
      </main>
    );
  }

  const allPosts = await getFlightPosts();
  const relatedList = allPosts
    .filter((item) => item.slug !== article.slug)
    .slice(0, 9);

  return (
    <main className="min-h-screen bg-white text-[#333]">
      <HeaderTop />
      <MainHeader />

      <section className="bg-[#eef1f4]">
        <div className="mx-auto max-w-[1400px] px-5 py-4 text-[15px] text-[#777] lg:px-8">
          Trang Chủ &gt; Vé máy bay &gt; {article.title}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-8">
        <div className="max-w-[1320px]">
          <h1 className="mb-4 text-[31px] font-bold leading-[1.35] text-[#222]">
            {article.title}
          </h1>

          <p className="border-b border-[#dddddd] pb-5 text-[18px] leading-[1.7] text-[#444]">
            {article.excerpt}
          </p>

          <div
            className="flight-post-content pt-7 text-[18px] leading-[1.8] text-[#333]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-10 text-right text-[18px] italic text-[#333]">
            {formatFlightDetailDate(article.publishedAt)}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 text-[17px] text-[#333]">
            <span className="font-semibold">Đánh giá:</span>
            <span className="text-[#f3b300]">★ ★ ★ ★ ★</span>
            <span>
              <strong>{Number(article.rating ?? 0).toFixed(2)}/5</strong> trong{" "}
              {article.totalRatings ?? 0} Đánh giá
            </span>
            <span className="flex items-center gap-1">
              <Eye size={17} />
              {article.views.toLocaleString("vi-VN")}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-10 text-[18px] text-[#1d5fa8]">
            {article.contact?.facebook && (
              <a
                href={`https://${article.contact.facebook}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:opacity-85"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2b8ee6] text-[24px] text-white">
                  f
                </span>
                <span>{article.contact.facebook}</span>
              </a>
            )}

            {article.contact?.email && (
              <a
                href={`mailto:${article.contact.email}`}
                className="flex items-center gap-3 hover:opacity-85"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#43c3f4] text-[22px] text-white">
                  ✉
                </span>
                <span>{article.contact.email}</span>
              </a>
            )}
          </div>

          <div className="mt-12 border-t border-[#dddddd] pt-8">
            <h2 className="mb-6 text-[27px] font-bold uppercase text-[#222]">
              Tin liên quan
            </h2>

            <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedList.map((item) => (
                <Link
                  key={item.id}
                  href={`/ve-may-bay/${item.slug}`}
                  className="text-[17px] leading-[1.6] text-[#222] hover:text-[#1560aa]"
                >
                  • {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FloatingContact />
      <Footer />
    </main>
  );
}