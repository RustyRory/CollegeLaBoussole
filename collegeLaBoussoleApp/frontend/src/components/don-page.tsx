import HeroSection from "@/components/don/hero-section";
import ConstatSection from "@/components/don/constat-section";
import ImpactSection from "@/components/don/impact-section";
import PourquoiSection from "@/components/don/pourquoi-section";
import PaliersSection from "@/components/don/paliers-section";
import AvantagesSection from "@/components/don/avantages-section";
import CtaSection from "@/components/don/cta-section";

export default function DonPage() {
  return (
    <main className="bg-[#F5F0E8] text-[#1C1410]">
      <HeroSection />
      <ConstatSection />
      <ImpactSection />
      <PourquoiSection />
      <PaliersSection />
      <AvantagesSection />
      <CtaSection />
    </main>
  );
}
