const STATS = [
  {
    number: "66 %",
    label: "Défiscalisable",
    sublabel: "de réduction d'impôt",
    description:
      "Un don de 300 € ne vous coûte réellement que 102 € après déduction fiscale sur votre déclaration de revenus.",
  },
  {
    number: "100 %",
    label: "Bénévoles",
    sublabel: "au sein de l'équipe",
    description:
      "La Boussole fonctionne entièrement grâce à l'engagement bénévole de ses membres. Vos dons financent les projets, pas les salaires.",
  },
  {
    number: "2027",
    label: "Ouverture prévue",
    sublabel: "en septembre",
    description:
      "Chaque don nous rapproche concrètement de l'ouverture du collège à Angers pour la rentrée de septembre 2027.",
  },
];

export default function ImpactSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            Notre réponse à cette problématique
          </p>
          <h2 className="fraunces text-4xl md:text-5xl">
            Une éducation basée sur une{" "}
            <em className="text-[#C85A2A]">pédagogie douce et adaptative</em>
          </h2>
          <p className="mt-4 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
            La Boussole propose une alternative concrète : une école pensée pour
            accueillir tous les profils, financée par la solidarité collective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-[#1C1410]/8 rounded-2xl p-8 flex flex-col gap-3"
            >
              <div className="flex items-baseline gap-1">
                <span className="fraunces text-4xl text-[#C85A2A]">
                  {stat.number}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#1C1410]">
                  {stat.label}
                </h3>
                <span className="text-xs text-[#1C1410]/50">
                  {stat.sublabel}
                </span>
              </div>
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
