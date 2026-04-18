import HeaderTop from "@/components/HeaderTop";
import MainHeader from "@/components/MainHeader";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Eye, CalendarDays } from "lucide-react";
import { formatNewsDate, getNewsPosts } from "@/lib/news";

export default async function NewsListPage() {
  const newsList = await getNewsPosts();

  return (
    <main className="min-h-screen bg-white text-[#333]">
      <HeaderTop />
      <MainHeader />

      <section className="bg-[#eef1f4]">
        <div className="mx-auto max-w-[1400px] px-5 py-4 text-[15px] text-[#777] lg:px-8">
          Trang Chủ &gt; Tin Tức
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-8">
        <h1 className="mb-4 text-[30px] font-bold text-[#1560aa]">Tin tức</h1>

        <div className="mb-5 flex flex-wrap items-center gap-3 text-[15px] text-[#333]">
          <div className="font-semibold">Đánh giá:</div>
          <div className="text-[#f3b300]">★ ★ ★ ★ ★</div>
          <div>
            <span className="font-semibold">4.93/5</span> trong 1597 Đánh giá
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>158,205</span>
          </div>
        </div>

        <div className="mb-6 max-w-[1300px] text-[18px] leading-[1.7] text-[#444]">
          <span className="font-bold text-[#1560aa]">Tin tức Du lịch</span> - Tin
          tức Du lịch 2026 cung cấp các <em>thông tin Du lịch Việt Nam, Thông
          tin Du lịch Thế Giới</em>, các Sự kiện Du lịch diễn ra trong ngày.
          Thông qua các bài viết được cập nhật liên tục, du khách có thể nắm
          bắt thêm được nhiều thông tin hữu ích về du lịch.
          <div className="italic">Thông tin Du lịch Việt Nam, Thông tin Du lịch Thế Giới</div>
        </div>

        <div className="border-t border-[#dddddd] pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {newsList.map((item) => (
              <article key={item.id} className="group">
                <Link href={`/tin-tuc/${item.slug}`} className="block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[290px] w-full object-cover transition duration-300 group-hover:opacity-95"
                  />
                </Link>

                <Link
                  href={`/tin-tuc/${item.slug}`}
                  className="mt-4 block text-[22px] font-medium leading-[1.35] text-[#1f1f1f] transition hover:text-[#1560aa]"
                >
                  {item.title}
                </Link>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-[14px] text-[#909090]">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={15} />
                    <span>{formatNewsDate(item.publishedAt)}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Eye size={15} />
                    <span>{item.views.toLocaleString("vi-VN")}</span>
                  </div>
                </div>

                <p className="mt-4 line-clamp-3 text-[17px] leading-[1.75] text-[#444]">
                  {item.excerpt}
                </p>
              </article>
            ))}
          </div>

          {newsList.length > 0 && (
            <div className="mt-12 text-center">
              <button
                type="button"
                className="inline-flex h-[58px] min-w-[275px] items-center justify-center bg-[#e1168c] px-10 text-[18px] font-medium uppercase text-white transition hover:bg-[#c9147a]"
              >
                XEM NHIỀU HƠN
              </button>
            </div>
          )}
        </div>
      </section>

      <FloatingContact />
      <Footer />
    </main>
  );
}