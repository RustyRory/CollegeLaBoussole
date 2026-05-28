import HeroSection from "@/components/college/hero-section";
import StatsSection from "@/components/college/stats-section";
import EquipeSection from "@/components/college/equipe-section";
import CadreSection from "@/components/college/cadre-section";
import ValeursSection from "@/components/college/valeurs-section";
import TarifsSection from "@/components/college/tarifs-section";
import FaqSection from "@/components/college/faq-section";
import CtaSection from "@/components/college/cta-section";

export default function CollegePage() {
  return (
    <main className="bg-[#F5F0E8] text-[#1C1410]">
      <HeroSection />
      <StatsSection />
      <EquipeSection />
      <CadreSection />
      <ValeursSection />
      <TarifsSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
