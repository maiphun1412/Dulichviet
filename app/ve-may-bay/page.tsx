import HeaderTop from "@/components/HeaderTop";
import MainHeader from "@/components/MainHeader";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import FlightSearchBox from "@/components/flight/FlightSearchBox";
import Link from "next/link";
import { CalendarDays, Eye } from "lucide-react";
import { formatFlightPostDate, getFlightPosts } from "@/lib/flight-posts";

export default async function FlightPostListPage() {
  const posts = await getFlightPosts();
  const featuredPosts = posts.slice(0, 3);
  const otherPosts = posts.slice(3);

  return (
    <main className="min-h-screen bg-white text-[#333]">
      <HeaderTop />
      <MainHeader />

      <section className="relative h-[330px] overflow-hidden md:h-[360px] lg:h-[390px]">
        <img
          src="/banner-flight.png"
          alt="Vé máy bay"
          className="h-full w-full object-cover"
        />

        <FlightSearchBox embedded />
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14 lg:px-8">
        <h1 className="mb-4 text-[31px] font-bold text-[#1560aa]">Vé máy bay</h1>

        <div className="mb-5 flex flex-wrap items-center gap-3 text-[15px] text-[#333]">
          <div className="italic text-[#555]">Cập nhật ngày: 31/01/2024</div>
          <div className="font-semibold">Đánh giá:</div>
          <div className="text-[#f3b300]">★ ★ ★ ★ ★</div>
          <div>
            <span className="font-semibold">5/5</span> trong 1967 Đánh giá
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>149,058</span>
          </div>
        </div>

        <div className="max-w-[1320px] text-[18px] leading-[1.75] text-[#333]">
          <p>
            <strong>Phòng Vé máy bay công ty Du Lịch Việt</strong> là một trong
            những đại lý được ủy quyền của nhiều hãng hàng không trong nước và
            quốc tế. Quý khách có thể <strong>đặt vé máy bay giá rẻ trực tuyến
            đơn giản, an toàn, tiết kiệm</strong> ngay tại Website Du Lịch Việt.
            Đồng thời cũng có thể <strong>so sánh vé máy bay nội địa, quốc tế
            trực tiếp từ các hãng hàng không</strong> đồng thời thường xuyên cập
            nhật khuyến mãi, ưu đãi lớn - Dịch vụ tin cậy, hỗ trợ 24/7.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-10 text-[18px] text-[#1d5fa8]">
          <a
            href="https://facebook.com/vemaybaygiare.dulichviet"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:opacity-85"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2b8ee6] text-[24px] text-white">
              f
            </span>
            <span>facebook.com/vemaybaygiare.dulichviet</span>
          </a>

          <a
            href="mailto:phongve@dulichviet.com.vn"
            className="flex items-center gap-3 hover:opacity-85"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#43c3f4] text-[22px] text-white">
              ✉
            </span>
            <span>phongve@dulichviet.com.vn</span>
          </a>
        </div>

        {featuredPosts.length > 0 && (
          <div className="mt-10 border-t border-[#dddddd] pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 xl:grid-cols-3">
              {featuredPosts.map((item) => (
                <article key={item.id}>
                  <Link href={`/ve-may-bay/${item.slug}`} className="block">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-[290px] w-full object-cover"
                    />
                  </Link>

                  <Link
                    href={`/ve-may-bay/${item.slug}`}
                    className="mt-4 block text-[21px] font-medium leading-[1.4] text-[#222] hover:text-[#1560aa]"
                  >
                    {item.title}
                  </Link>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-[14px] text-[#909090]">
                    <div className="flex items-center gap-1">
                      <CalendarDays size={15} />
                      <span>{formatFlightPostDate(item.publishedAt)}</span>
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
          </div>
        )}

        {otherPosts.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 xl:grid-cols-3">
            {otherPosts.map((item) => (
              <article key={item.id}>
                <Link href={`/ve-may-bay/${item.slug}`} className="block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[290px] w-full object-cover"
                  />
                </Link>

                <Link
                  href={`/ve-may-bay/${item.slug}`}
                  className="mt-4 block text-[21px] font-medium leading-[1.4] text-[#222] hover:text-[#1560aa]"
                >
                  {item.title}
                </Link>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-[14px] text-[#909090]">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={15} />
                    <span>{formatFlightPostDate(item.publishedAt)}</span>
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
        )}

        <div className="mt-12 text-center">
          <button
            type="button"
            className="inline-flex h-[58px] min-w-[275px] items-center justify-center bg-[#e1168c] px-10 text-[18px] font-medium uppercase text-white transition hover:bg-[#c9147a]"
          >
            XEM NHIỀU HƠN
          </button>
        </div>
      </section>

      <FloatingContact />
      <Footer />
    </main>
  );
}