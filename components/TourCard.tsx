"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import type { TourItem } from "../lib/tours";

type TourCardProps = {
  tour: TourItem;
};

function parseVietnameseDate(dateStr: string): Date | null {
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

function formatCountdown(targetDate: Date | null): string | null {
  if (!targetDate) return null;

  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) return null;

  const totalSeconds = Math.floor(distance / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => String(num).padStart(2, "0");

  return `Còn ${days} ngày ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function TourCard({ tour }: TourCardProps) {
  const targetDate = useMemo(() => parseVietnameseDate(tour.date), [tour.date]);
  const [countdown, setCountdown] = useState<string | null>(
    formatCountdown(targetDate)
  );

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(formatCountdown(targetDate));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Link href={`/tour/${tour.slug}`} className="block">
      <div className="overflow-hidden border border-[#d9d9d9] bg-white">
        <div className="relative">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-[220px] w-full object-cover"
          />

          {countdown && (
            <div className="absolute bottom-0 left-0 bg-[#ec1796] px-3 py-2 text-[13px] font-bold leading-none text-white">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px]">◉</span>
                <span>{countdown}</span>
              </div>
            </div>
          )}

          <div className="absolute bottom-0 right-0 bg-black/50 px-3 py-2 text-[13px] font-semibold leading-none text-white">
            <div className="flex items-center gap-1.5">
              <MapPin size={13} strokeWidth={2.2} />
              <span>{tour.departure}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f7f7f7] px-4 pb-4 pt-3">
          <h3 className="min-h-[74px] text-[16px] font-medium uppercase leading-[1.35] text-[#2e2e2e]">
            {tour.title}
          </h3>

          <div className="mt-3 space-y-1.5 text-[13px] text-[#333]">
            <div className="flex items-center gap-2">
              <Clock3 size={15} strokeWidth={2} />
              <span>Lịch trình: {tour.duration}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={15} strokeWidth={2} />
              <span>Khởi hành: {tour.date}</span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[13px] text-[#333]">
                <Users size={15} strokeWidth={2} />
                <span>Số chỗ còn nhận: {tour.seats}</span>
              </div>

              <div className="text-[18px] font-extrabold text-[#ec157a]">
                {tour.price}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}