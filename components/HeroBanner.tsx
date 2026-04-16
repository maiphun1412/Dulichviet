"use client";

import { useEffect, useState } from "react";

const banners = [
  "/trangchu/banner1.png",
  "/trangchu/banner2.png",
  "/trangchu/banner3.png",
  "/trangchu/banner4.png",
  "/trangchu/banner5.png",
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="bg-[#f3f3f3]">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative h-[280px] overflow-hidden md:h-[420px] lg:h-[470px]">
          {banners.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`banner-${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 z-10 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center bg-white/25 text-[44px] font-light leading-none text-white transition hover:bg-white/45"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 z-10 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center bg-white/25 text-[44px] font-light leading-none text-white transition hover:bg-white/45"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-[12px] w-[12px] rounded-full border border-white transition ${
                  index === current ? "bg-[#f0168d]" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}