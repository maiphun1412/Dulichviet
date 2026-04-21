"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, FileText, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import type { User as FirebaseUser } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import AuthModal from "./AuthModal";
import { auth, db } from "../lib/firebase";
import { logoutUser, watchAuth } from "../lib/auth";
import {
  ensureCartExists,
  getCartCount,
  mergeGuestCartToUser,
} from "../lib/cart";

type SearchResultItem = {
  id: string;
  title: string;
  slug: string;
  type: "tour" | "news";
  image?: string;
  excerpt?: string;
  meta?: string;
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function HeaderTop() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [authReady, setAuthReady] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [allResults, setAllResults] = useState<SearchResultItem[]>([]);
  const [loadingSearchData, setLoadingSearchData] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  const refreshCartCount = useCallback(async (userUid?: string | null) => {
    try {
      const uid = userUid ?? auth.currentUser?.uid ?? null;
      await ensureCartExists(uid);
      const count = await getCartCount(uid);
      setCartCount(count);
    } catch (error) {
      console.error("Lỗi cập nhật số lượng giỏ hàng:", error);
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    const unsub = watchAuth(async (user) => {
      try {
        setCurrentUser(user);

        if (user) {
          await ensureCartExists(null);
          await mergeGuestCartToUser(user.uid);
          await refreshCartCount(user.uid);
        } else {
          await ensureCartExists(null);
          await refreshCartCount(null);
        }
      } catch (error) {
        console.error("Lỗi theo dõi đăng nhập:", error);
      } finally {
        setAuthReady(true);
      }
    });

    return () => unsub();
  }, [refreshCartCount]);

  useEffect(() => {
    const handleCartUpdated = () => {
      refreshCartCount(auth.currentUser?.uid ?? null);
    };

    window.addEventListener("cart-updated", handleCartUpdated);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
    };
  }, [refreshCartCount]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchBoxRef.current) return;
      if (!searchBoxRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadSearchData = useCallback(async () => {
    if (allResults.length > 0 || loadingSearchData) return;

    try {
      setLoadingSearchData(true);

      const [tourSnap, newsSnap] = await Promise.all([
        getDocs(query(collection(db, "tours"), where("active", "==", true))),
        getDocs(query(collection(db, "news_posts"), where("active", "==", true))),
      ]);

      const tours: SearchResultItem[] = tourSnap.docs.map((docSnap) => {
        const data = docSnap.data();

        return {
          id: docSnap.id,
          title: String(data.title ?? ""),
          slug: String(data.slug ?? docSnap.id),
          type: "tour",
          image: String(data.image ?? data.picture ?? ""),
          excerpt: String(data.overviewText ?? ""),
          meta: String(data.departure ?? data.section ?? ""),
        };
      });

      const news: SearchResultItem[] = newsSnap.docs.map((docSnap) => {
        const data = docSnap.data();

        return {
          id: docSnap.id,
          title: String(data.title ?? ""),
          slug: String(data.slug ?? docSnap.id),
          type: "news",
          image: String(data.image ?? ""),
          excerpt: String(data.excerpt ?? ""),
          meta: String(data.category ?? ""),
        };
      });

      setAllResults([...tours, ...news]);
    } catch (error) {
      console.error("Lỗi tải dữ liệu tìm kiếm:", error);
    } finally {
      setLoadingSearchData(false);
    }
  }, [allResults.length, loadingSearchData]);

  const filteredResults = useMemo(() => {
    const normalizedKeyword = normalizeText(keyword);

    if (!normalizedKeyword) return [];

    return allResults
      .filter((item) => {
        const title = normalizeText(item.title);
        const excerpt = normalizeText(item.excerpt ?? "");
        const meta = normalizeText(item.meta ?? "");
        return (
          title.includes(normalizedKeyword) ||
          excerpt.includes(normalizedKeyword) ||
          meta.includes(normalizedKeyword)
        );
      })
      .sort((a, b) => {
        const aTitle = normalizeText(a.title);
        const bTitle = normalizeText(b.title);
        const aStarts = aTitle.startsWith(normalizedKeyword) ? 0 : 1;
        const bStarts = bTitle.startsWith(normalizedKeyword) ? 0 : 1;
        if (aStarts !== bStarts) return aStarts - bStarts;
        return a.title.localeCompare(b.title, "vi");
      });
  }, [allResults, keyword]);

  const suggestionResults = useMemo(() => filteredResults.slice(0, 8), [filteredResults]);

  const handleKeywordChange = async (value: string) => {
    setKeyword(value);

    if (!value.trim()) {
      setDropdownOpen(false);
      return;
    }

    await loadSearchData();
    setDropdownOpen(true);
  };

  const handleSubmitSearch = async () => {
    if (!keyword.trim()) return;
    await loadSearchData();
    setDropdownOpen(false);
    setPopupOpen(true);
  };

  const handlePickSuggestion = (title: string) => {
    setKeyword(title);
    setDropdownOpen(false);
    setPopupOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      await refreshCartCount(null);
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return (
    <>
      <div className="bg-[linear-gradient(90deg,#f4008f_0%,#c92bbd_100%)] text-white">
        <div className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-[15px] font-semibold">Hotline:</span>
            <span className="text-[18px] font-extrabold tracking-tight text-[#fff35c]">
              1900 1177
            </span>
            <ChevronDown size={16} strokeWidth={2.5} />
          </div>

          <div ref={searchBoxRef} className="mx-6 hidden max-w-[670px] flex-1 md:block">
            <div className="relative">
              <div className="flex h-[48px] items-center rounded-[4px] bg-white px-4 text-[#555] shadow-sm">
                <button
                  type="button"
                  onClick={handleSubmitSearch}
                  className="mr-3 shrink-0 text-[#666]"
                  aria-label="Tìm kiếm"
                >
                  <Search size={22} />
                </button>

                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => handleKeywordChange(e.target.value)}
                  onFocus={() => {
                    if (keyword.trim()) setDropdownOpen(true);
                    loadSearchData();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmitSearch();
                    }
                  }}
                  placeholder="Bạn muốn đi du lịch ở đâu?"
                  className="w-full border-none bg-transparent text-[17px] text-[#4b5563] outline-none placeholder:text-[#7b7b7b]"
                />

                {keyword ? (
                  <button
                    type="button"
                    onClick={() => {
                      setKeyword("");
                      setDropdownOpen(false);
                    }}
                    className="ml-3 shrink-0 text-[#666]"
                    aria-label="Xóa từ khóa"
                  >
                    <X size={22} />
                  </button>
                ) : null}
              </div>

              {dropdownOpen && keyword.trim() ? (
                <div className="absolute left-0 right-0 top-[54px] z-[100] overflow-hidden rounded-[4px] border border-[#e5e5e5] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.18)]">
                  {loadingSearchData ? (
                    <div className="px-4 py-4 text-[15px] text-[#666]">
                      Đang tải gợi ý...
                    </div>
                  ) : suggestionResults.length > 0 ? (
                    <div className="max-h-[360px] overflow-y-auto">
                      {suggestionResults.map((item) => (
                        <button
                          key={`${item.type}-${item.id}`}
                          type="button"
                          onClick={() => handlePickSuggestion(item.title)}
                          className="block w-full border-b border-[#f0f0f0] px-4 py-4 text-left text-[15px] text-[#333] transition hover:bg-[#f7f7f7] last:border-b-0"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-4 text-[15px] text-[#666]">
                      Không có gợi ý phù hợp.
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/phieu-gop-y"
              className="flex items-center gap-2 text-[16px] font-medium text-white"
            >
              <FileText size={18} />
              <span>Phiếu góp ý</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="text-white transition hover:opacity-90"
              aria-label="Mở đăng nhập"
            >
              <User size={18} />
            </button>

            <div className="relative">
              <Link href="/gio-hang" className="text-white">
                <ShoppingCart size={19} />
              </Link>
              <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#fff200] px-1 text-[11px] font-extrabold text-[#c91f97]">
                {cartCount}
              </span>
            </div>

            {authReady &&
              (currentUser ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-[14px] font-semibold text-white transition hover:opacity-90"
                >
                  Đăng xuất
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  className="text-[14px] font-semibold text-white transition hover:opacity-90"
                >
                  Đăng nhập
                </button>
              ))}
          </div>
        </div>
      </div>

      {popupOpen ? (
        <div className="fixed inset-0 z-[999] flex items-start justify-center bg-black/35 px-4 pt-20">
          <div className="relative max-h-[78vh] w-full max-w-[820px] overflow-hidden rounded-[8px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              className="absolute right-4 top-4 z-10 text-[#355548] transition hover:opacity-70"
              aria-label="Đóng"
            >
              <X size={24} />
            </button>

            <div className="border-b border-[#ececec] px-6 py-5">
              <h3 className="text-[18px] font-bold text-[#244436]">
                Kết quả cho: "{keyword}"
              </h3>
              <div className="mt-1 text-[14px] text-[#7a7a7a]">
                Tìm thấy {filteredResults.length} kết quả phù hợp
              </div>
            </div>

            <div className="max-h-[calc(78vh-88px)] overflow-y-auto px-6 py-4">
              {filteredResults.length > 0 ? (
                <div className="space-y-4">
                  {filteredResults.map((item) => (
                    <Link
                      key={`${item.type}-${item.id}-popup`}
                      href={item.type === "tour" ? `/tour/${item.slug}` : `/tin-tuc/${item.slug}`}
                      onClick={() => setPopupOpen(false)}
                      className="block rounded-[8px] border border-[#ececec] p-4 transition hover:bg-[#fafafa]"
                    >
                      <div className="text-[22px] font-semibold leading-[1.45] text-[#1c36c7]">
                        {item.title}
                      </div>

                      <div className="mt-2 text-[14px] text-[#4f4f4f]">
                        {item.type === "tour" ? "Tour Du Lịch Việt" : "Tin tức Du Lịch Việt"}
                        {item.meta ? ` • ${item.meta}` : ""}
                      </div>

                      {item.excerpt ? (
                        <div className="mt-2 text-[15px] leading-7 text-[#444]">
                          {item.excerpt}
                        </div>
                      ) : null}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-[16px] text-[#666]">
                  Không tìm thấy kết quả phù hợp.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={async () => {
          setTimeout(async () => {
            await refreshCartCount(auth.currentUser?.uid ?? null);
          }, 200);
        }}
      />
    </>
  );
}