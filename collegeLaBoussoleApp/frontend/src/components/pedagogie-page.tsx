import HeroSection from "@/components/pedagogie/hero-section";
import StatsSection from "@/components/pedagogie/stats-section";
import MethodesSection from "@/components/pedagogie/methodes-section";
import DifferenciateursSection from "@/components/pedagogie/differenciateurs-section";
import FaqSection from "@/components/pedagogie/faq-section";
import CtaSection from "@/components/pedagogie/cta-section";

export default function PedagogiePage() {
  return (
    <main className="bg-[#F5F0E8] text-[#1C1410]">
      <HeroSection />
      <StatsSection />
      <MethodesSection />
      <DifferenciateursSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
