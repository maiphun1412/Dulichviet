import HeaderTop from "@/components/HeaderTop";
import MainHeader from "@/components/MainHeader";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import FeedbackFormContent from "@/components/FeedbackFormContent";

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-white text-[#333]">
      <HeaderTop />
      <MainHeader />
      <FeedbackFormContent />
      <FloatingContact />
      <Footer />
    </main>
  );
}