import { Coins, Heart, Users, MapPin } from "lucide-react";

type Variant = "light" | "dark" | "accent" | "cream";

const VALEURS: {
  icon: React.ElementType;
  title: string;
  description: string;
  variant: Variant;
}[] = [
  {
    icon: Coins,
    title: "L'excellence accessible pour tous",
    description:
      "Une pédagogie de qualité ne devrait pas dépendre du revenu familial. Nos frais s'adaptent à vos moyens.",
    variant: "light",
  },
  {
    icon: Heart,
    title: "La bienveillance radicale pour tous",
    description:
      "Chaque élève est accueilli dans sa singularité. Pas de compétition, mais de la coopération.",
    variant: "dark",
  },
  {
    icon: Users,
    title: "La mixité sociale et l'inclusivité",
    description:
      "Enfants de cadres et d'ouvriers ensemble. La diversité sociale comme richesse pédagogique.",
    variant: "accent",
  },
  {
    icon: MapPin,
    title: "L'ancrage territorial fort pour le collège",
    description:
      "Enracinés dans l'Anjou, en lien avec les acteurs locaux, les producteurs, les artisans.",
    variant: "light",
  },
];

const STYLES: Record<
  Variant,
  { card: string; icon: string; title: string; text: string }
> = {
  light: {
    card: "bg-white border border-[#1C1410]/8",
    icon: "bg-[#C85A2A]/10 text-[#C85A2A]",
    title: "text-[#1C1410]",
    text: "text-[#1C1410]/60",
  },
  dark: {
    card: "bg-[#1E3A2F]",
    icon: "bg-white/10 text-white/70",
    title: "text-white",
    text: "text-white/60",
  },
  accent: {
    card: "bg-[#C85A2A]",
    icon: "bg-white/15 text-white",
    title: "text-white",
    text: "text-white/70",
  },
  cream: {
    card: "bg-[#F5F0E8] border border-[#1C1410]/8",
    icon: "bg-[#C85A2A]/10 text-[#C85A2A]",
    title: "text-[#1C1410]",
    text: "text-[#1C1410]/60",
  },
};

export default function ValeursSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            Nos engagements
          </p>
          <h2 className="fraunces text-4xl md:text-5xl">
            Des valeurs fortes qui nous guident{" "}
            <em className="text-[#C85A2A]">et vous accompagnent</em>
          </h2>
          <p className="mt-4 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
            La Boussole est une association à mission sociale. Chaque décision,
            chaque euro, chaque choix pédagogique s'inscrit dans nos valeurs
            fondatrices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALEURS.map((valeur, i) => {
            const Icon = valeur.icon;
            const s = STYLES[valeur.variant];
            return (
              <div
                key={i}
                className={`${s.card} rounded-2xl p-6 flex flex-col gap-4`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.icon}`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className={`font-semibold text-sm ${s.title}`}>
                    {valeur.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${s.text}`}>
                    {valeur.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
