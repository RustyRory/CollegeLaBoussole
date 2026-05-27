import HeroSection from "@/components/home/hero-section";
import AudienceCards from "@/components/home/audience-cards";
import PedagogieSection from "@/components/home/pedagogie-section";
import ValeursSection from "@/components/home/valeurs-section";
import EtablissementSection from "@/components/home/etablissement-section";
import PartenairesSection from "@/components/home/partenaires-section";
import FaqSection from "@/components/home/faq-section";
import CtaSection from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <main className="bg-[#F5F0E8] text-[#1C1410]">
      <HeroSection />
      <AudienceCards />
      <PedagogieSection />
      <ValeursSection />
      <EtablissementSection />
      <PartenairesSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
