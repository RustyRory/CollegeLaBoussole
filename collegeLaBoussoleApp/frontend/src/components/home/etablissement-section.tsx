import Link from "next/link";
import { Users, Building2, Banknote } from "lucide-react";

const ITEMS = [
  {
    icon: Users,
    title: "Notre équipe bénévole",
    text: "Des professionnels de l'éducation, de la santé et du social mobilisés autour d'un projet commun.",
    link: { label: "En savoir plus →", href: "/college" },
  },
  {
    icon: Building2,
    title: "Les locaux de l'établissement",
    text: "Un espace pensé pour l'apprentissage actif : salle de sport, jardin, atelier et salle de réunion.",
    link: { label: "En savoir plus →", href: "/college" },
  },
  {
    icon: Banknote,
    title: "Des frais de scolarité adaptés",
    text: "De 0 à 480 €/mois. Entrée selon vos revenus. L'excellence éducative sans barrière financière.",
    link: { label: "Voir les tarifs →", href: "/college" },
  },
];

export default function EtablissementSection() {
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image + badge */}
        <div className="relative">
          <div className="rounded-2xl aspect-[4/5] bg-[#C8B09A]" />
          <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-3 shadow-sm border border-[#1C1410]/8">
            <p className="text-[10px] font-semibold text-[#C85A2A] uppercase tracking-widest">
              Ouverture
            </p>
            <p className="fraunces text-2xl leading-none mt-0.5">Sept.</p>
            <p className="text-xs text-[#1C1410]/40 mt-1">2026 — Angers, 49</p>
          </div>
        </div>

        {/* Content */}
        <div className="pt-2">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            Équipes, locaux, direction...
          </p>
          <h2 className="fraunces text-4xl md:text-5xl mb-4">
            Un établissement structuré pour{" "}
            <em className="text-[#C85A2A]">votre apprentissage</em>
          </h2>
          <p className="text-sm text-[#1C1410]/60 leading-relaxed mb-8">
            La Boussole, c'est une équipe engagée, des locaux adaptés et une
            structure associative solide au service de chaque élève.
          </p>

          <div className="flex flex-col">
            {ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex gap-4 py-5 ${i !== 0 ? "border-t border-[#1C1410]/10" : ""}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C85A2A]/10 text-[#C85A2A] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-semibold text-sm text-[#1C1410]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#1C1410]/60 leading-relaxed">
                      {item.text}
                    </p>
                    <Link
                      href={item.link.href}
                      className="text-xs font-medium text-[#C85A2A] hover:underline mt-1"
                    >
                      {item.link.label}
                    </Link>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-[#1C1410]/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
