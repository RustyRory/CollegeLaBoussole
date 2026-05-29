import HeroSection from "@/components/contact/hero-section";
import FormSection from "@/components/contact/form-section";
import InfoSection from "@/components/contact/info-section";
import CtaSection from "@/components/contact/cta-section";

export default function ContactPage() {
  return (
    <main className="bg-[#F5F0E8] text-[#1C1410]">
      <HeroSection />
      <FormSection />
      <InfoSection />
      <CtaSection />
    </main>
  );
}
