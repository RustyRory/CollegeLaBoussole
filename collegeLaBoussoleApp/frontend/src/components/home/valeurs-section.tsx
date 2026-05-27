import { Star, Heart, Plus, Shield } from "lucide-react";

const VALUES = [
  {
    icon: Star,
    title: "L'excellence accessible",
    text: "Une pédagogie de qualité ne devrait pas dépendre du niveau familial. Nos frais s'adaptent à vos moyens, jusqu'à 0 €/mois.",
    dark: false,
  },
  {
    icon: Heart,
    title: "La bienveillance radicale",
    text: "Chaque élève est accueilli dans sa singularité. Pas de compétition, mais de la coopération. Pas de jugement, mais de l'accompagnement.",
    dark: false,
  },
  {
    icon: Plus,
    title: "La mixité sociale",
    text: "Enfants de cadres et enfants d'ouvriers, ensemble dans la même classe. La diversité sociale comme richesse pédagogique.",
    dark: false,
  },
  {
    icon: Shield,
    title: "L'ancrage territorial",
    text: "Enracinés dans l'Anjou, en lien avec les acteurs locaux, les producteurs, les artisans. Apprendre là où l'on vit.",
    dark: false,
  },
];

export default function ValeursSection() {
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
          Nos engagements
        </p>
        <h2 className="fraunces text-4xl md:text-5xl">
          Des valeurs fortes qui nous guident et{" "}
          <em className="text-[#C85A2A]">vous accompagnent</em>
        </h2>
        <p className="mt-4 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
          La Boussole est une association à mission sociale. Chaque décision,
          chaque euro, chaque choix pédagogique s'inscrit dans nos valeurs
          fondatrices.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {VALUES.map((v) => {
          const Icon = v.icon;
          return (
            <div
              key={v.title}
              className={`rounded-2xl p-6 flex flex-col gap-4 ${
                v.dark
                  ? "bg-[#1E3A2F] text-white"
                  : "bg-white border border-[#1C1410]/8 text-[#1C1410]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  v.dark
                    ? "bg-white/10 text-white/60"
                    : "bg-[#C85A2A]/10 text-[#C85A2A]"
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">{v.title}</h3>
                <p
                  className={`text-sm leading-relaxed ${
                    v.dark ? "text-white/60" : "text-[#1C1410]/60"
                  }`}
                >
                  {v.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
