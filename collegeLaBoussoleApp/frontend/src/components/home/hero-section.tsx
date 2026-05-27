import Link from "next/link";
import { Compass } from "lucide-react";

const TICKER_ITEMS = [
  "Sociales",
  "Hébertisme",
  "Frais adaptés",
  "Bioremediation scolaire",
  "Bienveillance",
  "Ouverture 2027",
  "Association",
  "Hors-contrat",
  "Anjou",
  "Pédagogie vivante",
];

export default function HeroSection() {
  return (
    <>
      <section className="px-6 pt-16 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#1C1410]/12 bg-white/60 px-1 pr-4 py-1 mb-10">
          <div className="w-7 h-7 rounded-full bg-[#C85A2A] flex items-center justify-center shrink-0">
            <Compass size={14} className="text-white" strokeWidth={2} />
          </div>
          <span className="text-xs text-[#1C1410]/70 font-medium">
            Collège hors-contrat · Ouverture Septembre 2027 · Angers
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl mx-auto">
          Un collège à taille humaine, qui redonne du sens à{" "}
          <em className="text-[#C85A2A]">l'apprentissage.</em>
        </h1>

        <p className="text-base md:text-lg text-[#1C1410]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Une pédagogie ancrée dans le vivant, le corps et la bienveillance. Des
          frais adaptés à vos revenus. Une éducation accessible à toutes les
          familles de l'Anjou.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link
            href="/college"
            className="inline-flex items-center gap-2 rounded-full bg-[#C85A2A] px-6 py-3 text-sm font-medium text-white hover:bg-[#B04E24] transition-colors"
          >
            Découvrir l'établissement →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#1C1410]/30 px-6 py-3 text-sm font-medium hover:border-[#1C1410] transition-colors"
          >
            Entrons en contact →
          </Link>
        </div>
      </section>

      {/* Ticker vert */}
      <div className="bg-[#1E3A2F] py-3 overflow-hidden">
        <div className="ticker-track flex gap-12 w-max">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-sm text-white/50 whitespace-nowrap shrink-0"
            >
              {item} <span className="text-[#C85A2A]">•</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
