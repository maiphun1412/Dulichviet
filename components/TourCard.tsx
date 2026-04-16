import Link from "next/link";
import { CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import type { TourItem } from "../lib/tours";

type TourCardProps = {
  tour: TourItem;
};

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link href={`/tour/${tour.slug}`} className="block">
      <div className="overflow-hidden border border-[#d9d9d9] bg-white">
        <div className="relative">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-[220px] w-full object-cover"
          />

          <div className="absolute bottom-0 left-0 bg-[#ec1796] px-3 py-2 text-[13px] font-bold leading-none text-white">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px]">◉</span>
              <span>{tour.countdown}</span>
            </div>
          </div>

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