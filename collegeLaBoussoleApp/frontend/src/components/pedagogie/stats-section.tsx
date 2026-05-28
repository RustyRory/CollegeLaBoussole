const STATS = [
  {
    number: "0 → 600€",
    label: "Frais de scolarité",
    sublabel: "/mois",
    description:
      "Calculés selon votre quotient familial. L'excellence éducative sans barrière financière — de 0 à 600 €/mois selon vos revenus.",
  },
  {
    number: "20",
    label: "Élèves maximum",
    sublabel: "par classe",
    description:
      "Des groupes à taille humaine pour un accompagnement individualisé et une ambiance de travail sereine et bienveillante.",
  },
  {
    number: "4",
    label: "Axes pédagogiques",
    sublabel: "complémentaires",
    description:
      "Le vivant, le mouvement, la remédiation et la bienveillance. Quatre piliers qui fondent notre approche et guident chaque journée.",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white px-6 py-20 mt-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            En quelques mots
          </p>
          <h2 className="fraunces text-4xl md:text-5xl max-w-2xl mx-auto leading-tight">
            Quelques mots & chiffres pour vous décrire{" "}
            <em className="text-[#C85A2A]">notre établissement scolaire</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="border border-[#1C1410]/8 rounded-2xl p-8 flex flex-col gap-3"
            >
              <div className="flex items-baseline gap-1">
                <span className="fraunces text-5xl text-[#C85A2A]">
                  {stat.number}
                </span>
                <span className="text-xs text-[#1C1410]/50 font-medium">
                  {stat.sublabel}
                </span>
              </div>
              <h3 className="font-semibold text-sm text-[#1C1410]">
                {stat.label}
              </h3>
              <p className="text-sm text-[#1C1410]/60 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
