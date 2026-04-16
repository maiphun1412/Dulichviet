import Link from "next/link";
import { CalendarDays, Clock3, Users } from "lucide-react";
import type { TourItem } from "../lib/tours";

type DomesticTourCardProps = {
  tour: TourItem;
};

export default function DomesticTourCard({ tour }: DomesticTourCardProps) {
  return (
    <Link href={`/tour/${tour.slug}`} className="block">
      <div className="overflow-hidden border border-[#d8d8d8] bg-white">
        <div className="group relative">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-[228px] w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 bg-black/52 px-4 py-2 text-[13px] font-semibold text-white transition-opacity duration-300 group-hover:opacity-0">
            {tour.departure}
          </div>

          <div className="absolute inset-0 bg-black/45 px-4 py-4 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="text-[13px] font-medium leading-[20px]">
              <div>Lịch trình {tour.duration}</div>
              <div>Hằng ngày Di chuyển Xe du lịch đời mới</div>
              <div>Nghiệm một ngày thư giãn và đậm chất miền</div>
              <div className="pt-1 font-semibold">Xem thêm +</div>
            </div>

            <div className="absolute bottom-0 left-0 bg-black/55 px-4 py-2 text-[13px] font-semibold text-white">
              {tour.departure}
            </div>
          </div>
        </div>

        <div className="bg-[#f3f3f3] px-4 pb-4 pt-3">
          <h3 className="min-h-[58px] text-[16px] font-medium uppercase leading-[1.35] text-[#333]">
            {tour.title}
          </h3>

          <div className="mt-3 space-y-1.5 text-[13px] text-[#444]">
            <div className="flex items-center gap-2">
              <Clock3 size={15} strokeWidth={2} />
              <span>{tour.duration}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={15} strokeWidth={2} />
              <span>{tour.date}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Users size={15} strokeWidth={2} />
                <span>Còn {tour.seats} chỗ</span>
              </div>

              <span className="whitespace-nowrap text-[18px] font-medium text-[#ef1a76]">
                {tour.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}