"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Star } from "lucide-react";
import { useParams } from "next/navigation";

import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { getVisaPosts, type VisaPostItem } from "@/lib/visa-data";
import HeaderTop from "@/components/HeaderTop";

function RatingStars({ value }: { value: number }) {
  const rounded = Math.round(value);

  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={16}
          className={
            index < rounded
              ? "fill-[#f2b01e] text-[#f2b01e]"
              : "fill-[#d9d9d9] text-[#d9d9d9]"
          }
        />
      ))}
    </div>
  );
}
function VisaContactBox({ post }: { post: VisaPostItem }) {
  return (
    <section className="mt-8 border border-[#d9d9d9] bg-white">
      <div className="px-4 py-4 text-[14px] leading-[1.65] text-[#222]">
        Hãy chuẩn bị{" "}
        <Link href="/dich-vu-visa" className="font-semibold text-[#1d71b8]">
          Visa {post.country || post.region || "du lịch"}
        </Link>{" "}
        và lịch trình tham dự ngay hôm nay cùng{" "}
        <Link href="/" className="font-semibold text-[#ec008c]">
          Du Lịch Việt
        </Link>{" "}
        để có mặt đúng thời điểm.
      </div>

      <div className="px-4 pb-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[#d9d9d9] text-left">
            <thead>
              <tr className="bg-[#fafafa]">
                <th className="border border-[#d9d9d9] px-4 py-3 text-[14px] font-semibold text-[#333]">
                  Visa
                </th>
                <th className="border border-[#d9d9d9] px-4 py-3 text-[14px] font-semibold text-[#333]">
                  Loại Visa
                </th>
                <th className="border border-[#d9d9d9] px-4 py-3 text-[14px] font-semibold text-[#333]">
                  Thời gian làm
                </th>
                <th className="border border-[#d9d9d9] px-4 py-3 text-[14px] font-semibold text-[#333]">
                  Giá khu vực phía nam
                </th>
                <th className="border border-[#d9d9d9] px-4 py-3 text-[14px] font-semibold text-[#333]">
                  Giá khu vực phía bắc
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-[#d9d9d9] px-4 py-3 text-[12px] text-[#222]">
                  {post.title}
                </td>
                <td className="border border-[#d9d9d9] px-4 py-3 text-[12px] text-[#222]">
                  {post.category || ""}
                </td>
                <td className="border border-[#d9d9d9] px-4 py-3 text-[12px] text-[#222]">
                  Liên hệ
                </td>
                <td className="border border-[#d9d9d9] px-4 py-3 text-[12px] font-medium text-[#ec008c]">
                  LIÊN HỆ
                </td>
                <td className="border border-[#d9d9d9] px-4 py-3 text-[12px] font-medium text-[#ec008c]">
                  LIÊN HỆ
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between bg-[#fafafa] px-4 py-5">
          <div className="text-[20px] font-bold text-[#ec008c]">Liên hệ</div>

          <Link
  href={`/dich-vu-visa/${post.slug}/lien-he`}
  className="inline-flex h-[40px] min-w-[130px] items-center justify-center rounded-[4px] bg-[#ec008c] px-6 text-[14px] font-semibold text-white transition hover:bg-[#d1007c]"
>
  LIÊN HỆ
</Link>
        </div>
      </div>
    </section>
  );
}

export default function VisaPostDetailPage() {
  const params = useParams<{ slug: string }>();
const slug = params?.slug ?? "";

  const [posts, setPosts] = useState<VisaPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  let mounted = true;

  async function loadPosts() {
    try {
      setIsLoading(true);
      const data = await getVisaPosts();

      console.log("slug hien tai:", slug);
      console.log("visa posts load duoc:", data);

      if (!mounted) return;
      setPosts(data);
    } catch (error) {
      console.error("Lỗi tải chi tiết visa post:", error);

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
}, [slug]);

  const post = useMemo(() => {
  const found = posts.find((item) => item.slug === slug) || null;
  console.log("slug can tim:", slug);
  console.log("post tim duoc:", found);
  return found;
}, [posts, slug]);

  return (
    <div className="min-h-screen bg-white text-[#222]">
      <HeaderTop />
      <MainHeader />

      <main>
        <section className="border-y border-[#e6e6e6] bg-[#f2f4f6] py-[10px]">
          <div className="mx-auto max-w-[1100px] px-4 text-[13px] text-[#7b7b7b]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-[6px]">&gt;</span>
            <Link href="/dich-vu-visa" className="hover:text-[#ec008c]">
              {post?.region || "Visa"}
            </Link>
            <span className="mx-[6px]">&gt;</span>
            <span>{post?.title || "Chi tiết visa"}</span>
          </div>
        </section>

        <article className="mx-auto max-w-[1100px] px-4 py-10">
          {isLoading ? (
            <div className="text-[18px] text-[#666]">Đang tải bài viết...</div>
          ) : !post ? (
            <div className="text-[18px] text-[#666]">
              Không tìm thấy bài viết.
            </div>
          ) : (
            <div className="mx-auto max-w-[1060px]">
              <h1 className="text-[28px] font-semibold leading-[1.35] text-[#222]">
                {post.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-[16px] text-[#333]">
                <span>Đánh giá:</span>

                <RatingStars value={post.rating || 0} />

                <span>
                  <strong className="font-semibold">
                    {(post.rating || 0).toFixed(2)}
                  </strong>
                  /5 trong {post.reviewCount || 0} Đánh giá
                </span>

                <span className="flex items-center gap-1 text-[#444]">
                  <Eye size={16} />
                  <span>{post.viewCount || 0}</span>
                </span>
              </div>

              <div className="mt-6 border-t border-[#dddddd]" />

              {post.thumbnail ? (
                <div className="my-6 flex justify-center">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={760}
                    height={430}
                    className="h-auto max-w-full object-cover"
                  />
                </div>
              ) : null}

              <div
                className="visa-post-content text-[17px] leading-[1.75] text-[#222]"
                dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
              />
              <VisaContactBox post={post} />
            </div>
          )}
        </article>
      </main>

      <Footer />

      <style jsx global>{`
  .visa-post-content {
    word-break: break-word;
    color: #222;
  }

  .visa-post-content h1,
  .visa-post-content h2,
  .visa-post-content h3,
  .visa-post-content h4 {
    color: #1d71b8;
    font-weight: 700;
    line-height: 1.3;
    margin-top: 14px;
    margin-bottom: 5px;
  }

  .visa-post-content h1 {
    font-size: 20px;
  }

  .visa-post-content h2 {
    font-size: 14px;
  }

  .visa-post-content h3 {
    font-size: 13.5px;
  }

  .visa-post-content h4 {
    font-size: 13px;
  }

  .visa-post-content p {
    margin: 5px 0;
    font-size: 13px;
    line-height: 1.55;
  }

  .visa-post-content ul,
  .visa-post-content ol {
    margin: 5px 0 8px 16px;
    padding-left: 14px;
  }

  .visa-post-content li {
    margin: 2px 0;
    font-size: 13px;
    line-height: 1.55;
  }

  .visa-post-content a {
    color: #1d71b8;
    text-decoration: none;
  }

  .visa-post-content a:hover {
    text-decoration: underline;
  }

  .visa-post-content img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 10px auto;
  }

  .visa-post-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 12px;
  }

  .visa-post-content th,
  .visa-post-content td {
    padding: 6px 8px;
    text-align: left;
    vertical-align: top;
    font-size: 13px;
    line-height: 1.5;
    border: none;
  }

  .visa-post-content th {
    font-weight: 700;
    color: #333;
    border-bottom: 1px solid #d9d9d9;
  }

  .visa-post-content strong,
  .visa-post-content b {
    font-weight: 700;
  }

  .visa-post-content blockquote {
    margin: 10px 0;
    padding-left: 10px;
    border-left: 3px solid #e5e5e5;
    color: #444;
  }

  @media (max-width: 768px) {
    .visa-post-content h1 {
      font-size: 18px;
    }

    .visa-post-content h2 {
      font-size: 14px;
    }

    .visa-post-content p,
    .visa-post-content li,
    .visa-post-content th,
    .visa-post-content td {
      font-size: 12.5px;
      line-height: 1.5;
    }
  }
`}</style>
    </div>
  );
}