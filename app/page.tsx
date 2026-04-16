"use client";

import { useEffect, useState } from "react";
import HeaderTop from "../components/HeaderTop";
import MainHeader from "../components/MainHeader";
import HeroBanner from "../components/HeroBanner";
import QuickCategories from "../components/QuickCategories";
import TourSection from "../components/TourSection";
import FloatingContact from "../components/FloatingContact";
import { getToursBySection, type TourItem } from "../lib/tours";
import Footer from "../components/Footer";

export default function HomePage() {
  const [lastMinuteTours, setLastMinuteTours] = useState<TourItem[]>([]);
  const [domesticTours, setDomesticTours] = useState<TourItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const last = await getToursBySection("tour-gio-chot");
      const domestic = await getToursBySection("tour-trong-nuoc");

      setLastMinuteTours(last);
      setDomesticTours(domestic);
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-[#1f2937]">
      <HeaderTop />
      <MainHeader />
      <HeroBanner />
      <QuickCategories />

      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-6 lg:px-8">
        <TourSection title="TOUR GIỜ CHÓT" tours={lastMinuteTours} />
        <TourSection
          title="TOUR TRONG NƯỚC"
          tours={domesticTours}
          className="mt-8"
          variant="domestic"
          showViewAll
        />
      </div>

      <FloatingContact />
      <Footer />
    </main>
  );
}