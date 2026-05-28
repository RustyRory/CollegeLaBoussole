import {
  Leaf,
  Brain,
  Users,
  Award,
  CalendarClock,
  Banknote,
} from "lucide-react";

const ITEMS = [
  {
    icon: Award,
    title: "Évaluation bienveillante",
    description:
      "Pas de notation chiffrée stressante. Des portfolios de compétences et des évaluations formatives qui guident l'élève sans le sanctionner.",
  },
  {
    icon: Banknote,
    title: "Frais adaptés au revenu",
    description:
      "De 0 € à 280 €/mois selon votre quotient familial. Le premier collège hors-contrat accessible à toutes les familles de l'Anjou.",
  },
  {
    icon: Leaf,
    title: "Ancrage dans le vivant",
    description:
      "Potager, ateliers, sorties terrain. L'apprentissage sort des murs de la classe pour s'ancrer dans le réel et le territoire.",
  },
  {
    icon: Users,
    title: "15 élèves maximum par classe",
    description:
      "Un enseignant connaît chaque élève par cœur. Ses forces, ses fragilités, ses passions — un suivi vraiment individualisé.",
  },
  {
    icon: CalendarClock,
    title: "Emploi du temps flexible",
    description:
      "Des blocs d'apprentissage longs qui permettent l'immersion réelle. Pas de sonneries toutes les 55 minutes qui brisent la concentration.",
  },
  {
    icon: Brain,
    title: "Remédiation scolaire intégrée",
    description:
      "Chaque élève bénéficie d'un accompagnement ciblé pour combler ses lacunes, sans jugement, à son rythme et avec les outils adaptés.",
  },
];

export default function DifferenciateursSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            Nos plus values
          </p>
          <h2 className="fraunces text-4xl md:text-5xl max-w-3xl mx-auto">
            Concrètement, qu'est-ce qui nous différencie des{" "}
            <em className="text-[#C85A2A]">autres collèges</em>
          </h2>
          <p className="mt-5 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
            Pas de compétition. Pas de notes punitives. Pas d'élèves invisibles.
            Une éducation qui respecte chaque être dans sa singularité.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-[#1C1410]/8 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C85A2A]/10 text-[#C85A2A] flex items-center justify-center shrink-0">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-semibold text-sm text-[#1C1410]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#1C1410]/60 leading-relaxed">
                    {item.description}
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
