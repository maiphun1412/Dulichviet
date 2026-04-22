"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";

import HeaderTop from "@/components/HeaderTop";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import { db } from "@/lib/firebase";
import type { TourItem } from "@/lib/tours";

function parseTourDate(dateStr: string) {
  if (!dateStr) return null;

  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);

  if (!day || !month || !year) return null;

  const date = new Date(year, month - 1, day, 23, 59, 59);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default function TourTheoMenuPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword")?.trim() || "";

  const [tours, setTours] = useState<TourItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "tours"),
          where("active", "==", true)
        );

        const snapshot = await getDocs(q);

        const items: TourItem[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();

          return {
            id: docSnap.id,
            slug: String(data.slug ?? docSnap.id),
            title: String(data.title ?? ""),
            image: String(data.image ?? data.picture ?? ""),
            departure: String(data.departure ?? ""),
            duration: String(data.duration ?? ""),
            date: String(data.date ?? ""),
            seats: Number(data.seats ?? 0),
            price: String(data.price ?? ""),
            countdown: String(data.countdown ?? ""),
            section: String(data.section ?? ""),
            serviceType: String(data.serviceType ?? ""),
            active: Boolean(data.active ?? false),
          };
        });

        setTours(items);
      } catch (error) {
        console.error("Lỗi lấy tour theo menu:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const filteredTours = useMemo(() => {
    const lowerKeyword = keyword.toLowerCase();
    const now = Date.now();

    return tours.filter((tour) => {
      const tourDate = parseTourDate(tour.date);
      const notExpired = tourDate ? tourDate.getTime() >= now : true;

      const text = [
        tour.title,
        tour.departure,
        tour.duration,
        tour.date,
        tour.section,
        tour.serviceType || "",
        tour.slug,
      ]
        .join(" ")
        .toLowerCase();

      return notExpired && text.includes(lowerKeyword);
    });
  }, [tours, keyword]);

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#222]">
      <HeaderTop />
      <MainHeader />

      <main>
        <section className="bg-[#eef1f5]">
          <div className="mx-auto max-w-[1240px] px-4 py-3 text-[14px] text-[#7a8797]">
            <Link href="/" className="hover:text-[#ec008c]">
              Trang Chủ
            </Link>
            <span className="mx-1">{">"}</span>
            <span>Kết quả tour</span>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-10">
          <h1 className="text-[28px] font-bold text-[#1d3557]">
            {keyword ? `Kết quả cho: ${keyword}` : "Danh sách tour"}
          </h1>

          {loading ? (
            <div className="mt-8 text-[16px] text-[#666]">Đang tải tour...</div>
          ) : filteredTours.length === 0 ? (
            <div className="mt-8 rounded-[8px] border border-[#e4e4e4] bg-white p-8 text-[16px] text-[#666]">
              Chưa có tour phù hợp hoặc tour đã hết hạn.
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}