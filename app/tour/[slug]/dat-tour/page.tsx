import HeaderTop from "@/components/HeaderTop";
import MainHeader from "@/components/MainHeader";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import TourBookingContent from "@/components/tour-detail/TourBookingContent";
import { getTourBySlug } from "@/lib/tours";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TourBookingPage({ params }: PageProps) {
  const { slug } = await params;

  const tour = await getTourBySlug(slug);

  if (!tour) {
    return (
      <main className="min-h-screen bg-white text-[#333]">
        <HeaderTop />
        <MainHeader />
        <div className="mx-auto max-w-[1400px] px-4 py-16 text-[22px]">
          Không tìm thấy tour.
        </div>
        <FloatingContact />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#333]">
      <HeaderTop />
      <MainHeader />
      <TourBookingContent tour={tour} />
      <FloatingContact />
      <Footer />
    </main>
  );
}