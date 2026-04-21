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
import { Hotel, Car, Globe, Plane } from "lucide-react";

function FooterFeatures() {
  const featureBoxes = [
    {
      title: "KHÁCH SẠN",
      desc: "Khách sạn tốt nhất tại các địa điểm du lịch nổi tiếng.",
      icon: Hotel,
      bg: "bg-[#e45198]",
    },
    {
      title: "THUÊ XE",
      desc: "Dịch vụ thuê xe giá tốt từ các nhà xe uy tín và chu đáo",
      icon: Car,
      bg: "bg-[#106db8]",
    },
    {
      title: "VISA",
      desc: "Dịch vụ Visa nhanh, rẻ. Visa trọn gói, thủ tục đơn giản",
      icon: Globe,
      bg: "bg-[#e28733]",
    },
    {
      title: "VÉ MÁY BAY",
      desc: "Vé máy bay giá rẻ nhất, nhiều khuyến mãi hấp dẫn",
      icon: Plane,
      bg: "bg-[#1f9fbe]",
    },
  ];

  return (
    <section className="bg-[#efefef] py-6">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureBoxes.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href="#"
                className={`flex min-h-[120px] items-center gap-5 rounded-[4px] px-6 py-5 text-white ${item.bg}`}
              >
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[6px] bg-white/20">
                  <Icon size={32} strokeWidth={2.5} />
                </div>

                <div>
                  <h3 className="mb-1 text-[17px] font-bold uppercase">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.4] text-white/90">
                    {item.desc}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
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

       <FooterFeatures />
    <FloatingContact />
    <Footer />
    </main>
  );
}