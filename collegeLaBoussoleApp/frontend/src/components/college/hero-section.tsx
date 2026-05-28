import Link from "next/link";
import { Building2 } from "lucide-react";
import PhotoCarousel from "@/components/college/photo-carousel";

export default function HeroSection() {
  return (
    <section className="pt-16 text-center">
      <div className="px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#1C1410]/12 bg-white/60 px-1 pr-4 py-1 mb-10">
          <div className="w-7 h-7 rounded-full bg-[#1E3A2F] flex items-center justify-center shrink-0">
            <Building2 size={13} className="text-white" strokeWidth={2} />
          </div>
          <span className="text-xs text-[#1C1410]/70 font-medium">
            Collège général adapté · Hors-contrat · Angers
          </span>
        </div>

        {/* Titre */}
        <h1 className="fraunces text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl mx-auto leading-tight">
          Un établissement chaleureux et pensé pour le{" "}
          <em className="text-[#C85A2A]">bien-être des élèves.</em>
        </h1>

        {/* Accroche */}
        <p className="text-base md:text-lg text-[#1C1410]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Une pédagogie ancrée dans le vivant, le corps et la bienveillance. Des
          frais adaptés à vos revenus. Une éducation accessible à toutes les
          familles de l'Anjou.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/pedagogie"
            className="inline-flex items-center gap-2 rounded-full bg-[#C85A2A] px-6 py-3 text-sm font-medium text-white hover:bg-[#B04E24] transition-colors"
          >
            Notre pédagogie orientée réel →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#1C1410]/30 px-6 py-3 text-sm font-medium text-[#1C1410] hover:border-[#1C1410] transition-colors"
          >
            Entrons en contact →
          </Link>
        </div>
      </div>

      {/* Carousel pleine largeur */}
      <PhotoCarousel />
    </section>
  );
}
