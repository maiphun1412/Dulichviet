"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import TourCard from "./TourCard";
import DomesticTourCard from "./DomesticTourCard";
import type { TourItem } from "../lib/tours";

type TourSectionProps = {
  title: string;
  tours: TourItem[];
  className?: string;
  variant?: "lastMinute" | "domestic";
  showViewAll?: boolean;
};

export default function TourSection({
  title,
  tours,
  className = "",
  variant = "lastMinute",
}: TourSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={className}>
      <SectionHeader title={title} />

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          className="absolute left-2 top-[155px] z-10 flex h-[54px] w-[36px] -translate-y-1/2 items-center justify-center bg-white/70 text-[#666] shadow-sm transition hover:bg-white"
          aria-label="Lướt trái"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          className="absolute right-2 top-[155px] z-10 flex h-[54px] w-[36px] -translate-y-1/2 items-center justify-center bg-white/70 text-[#666] shadow-sm transition hover:bg-white"
          aria-label="Lướt phải"
        >
          <ChevronRight size={28} />
        </button>

        <div
          ref={scrollRef}
          className="hide-scrollbar overflow-x-auto scroll-smooth"
        >
          <div className="flex gap-[10px]">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="w-[356px] min-w-[356px] shrink-0"
              >
                {variant === "domestic" ? (
                  <DomesticTourCard tour={tour} />
                ) : (
                  <TourCard tour={tour} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}