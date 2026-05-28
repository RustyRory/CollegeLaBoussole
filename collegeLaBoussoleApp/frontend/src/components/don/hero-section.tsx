import Link from "next/link";
import { Heart } from "lucide-react";

const HELLO_ASSO_URL = "https://www.helloasso.com";


export default function HeroSection() {
  return (
    <section className="pt-16 text-center">
      <div className="px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#1C1410]/12 bg-white/60 px-1 pr-4 py-1 mb-10">
          <div className="w-7 h-7 rounded-full bg-[#1E3A2F] flex items-center justify-center shrink-0">
            <Heart size={13} className="text-white" strokeWidth={2} />
          </div>
          <span className="text-xs text-[#1C1410]/70 font-medium">
            Collège en recherche de donations pour se développer
          </span>
        </div>

        {/* Titre */}
        <h1 className="fraunces text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl mx-auto leading-tight">
          Vous souhaitez contribuer à un{" "}
          <em className="text-[#C85A2A]">projet éducatif engagé</em>
        </h1>

        {/* Accroche */}
        <p className="text-base md:text-lg text-[#1C1410]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Votre don finance directement l'accès à une éducation de qualité pour
          des enfants qui en auraient été privés. Un geste solidaire,
          défiscalisable à 66 %.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <a
            href={HELLO_ASSO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#C85A2A] px-6 py-3 text-sm font-medium text-white hover:bg-[#B04E24] transition-colors"
          >
            Faire un don en ligne →
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#1C1410]/30 px-6 py-3 text-sm font-medium text-[#1C1410] hover:border-[#1C1410] transition-colors"
          >
            Nous contacter →
          </Link>
        </div>
      </div>

      {/* Photo de groupe */}
      <div className="w-full mt-14 px-6 md:px-32">
        <div className="bg-white rounded-3xl p-3 shadow-sm border border-[#1C1410]/8">
          <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/4]">
            <img
              src="/images/don/groupe.jpg"
              alt="L'ensemble des membres du Collège La Boussole"
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute bottom-4 left-4 text-xs text-white/70 font-medium">
              L'équipe et les membres du Collège La Boussole
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
