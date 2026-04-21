"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { getVisaPosts, type VisaPostItem } from "@/lib/visa-data";

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

export default function VisaSearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q")?.trim() || "";

  const [posts, setPosts] = useState<VisaPostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const data = await getVisaPosts();

        if (!mounted) return;
        setPosts(data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu tìm kiếm visa:", error);
        if (!mounted) return;
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

  const filteredPosts = useMemo(() => {
    if (!keyword) return posts;

    const normalizedKeyword = normalizeText(keyword);
    const normalizedKeywordSlug = normalizedKeyword.replace(/\s+/g, "-");

    return posts.filter((item) => {
      const title = normalizeText(item.title || "");
      const slug = normalizeText(item.slug || "");
      const category = normalizeText(item.category || "");
      const region = normalizeText(item.region || "");
      const country = normalizeText(item.country || "");
      const excerpt = normalizeText(item.excerpt || "");
      const tagLabel = normalizeText(item.tagLabel || "");

      return (
        title.includes(normalizedKeyword) ||
        slug.includes(normalizedKeywordSlug) ||
        category.includes(normalizedKeyword) ||
        region.includes(normalizedKeyword) ||
        country.includes(normalizedKeyword) ||
        excerpt.includes(normalizedKeyword) ||
        tagLabel.includes(normalizedKeyword)
      );
    });
  }, [posts, keyword]);

  return (
    <div className="min-h-screen bg-white text-[#222]">
      <MainHeader />

      <main className="mx-auto max-w-[1180px] px-4 py-8">
        <div className="mb-6">
          <h1 className="text-[30px] font-semibold leading-tight text-[#222]">
            Kết quả tìm kiếm visa
          </h1>

          <p className="mt-2 text-[15px] text-[#666]">
            Từ khóa:
            <span className="ml-1 font-semibold text-[#ec008c]">
              {keyword || "Tất cả"}
            </span>
          </p>
        </div>

        {loading ? (
          <div className="rounded-[8px] border border-[#e5e5e5] bg-[#fafafa] px-5 py-6 text-[15px] text-[#666]">
            Đang tải dữ liệu...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-[8px] border border-[#e5e5e5] bg-[#fafafa] px-5 py-6 text-[15px] text-[#666]">
            Không tìm thấy bài viết phù hợp với từ khóa{" "}
            <span className="font-semibold text-[#ec008c]">
              "{keyword}"
            </span>
            .
          </div>
        ) : (
          <>
            <div className="mb-5 text-[15px] text-[#666]">
              Tìm thấy{" "}
              <span className="font-semibold text-[#222]">
                {filteredPosts.length}
              </span>{" "}
              kết quả
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/dich-vu-visa/${post.slug}`}
                  className="block overflow-hidden border border-[#dcdcdc] bg-white transition hover:shadow-md"
                >
                  <div className="relative h-[190px] w-full bg-[#f3f3f3]">
                    <Image
                      src={post.thumbnail || "/images/placeholder.png"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="px-3 pb-4 pt-3">
                    <h2 className="line-clamp-2 min-h-[56px] text-[16px] leading-[1.45] text-[#333]">
                      {post.title}
                    </h2>

                    <div className="mt-3 text-[15px] font-semibold text-[#ec008c]">
                      Liên hệ
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}