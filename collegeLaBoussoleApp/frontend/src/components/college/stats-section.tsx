const STATS = [
  {
    number: "500 m²",
    label: "Salles modulables",
    sublabel: "d'espaces d'apprentissage",
    description:
      "Mobilier ergonomique déplaçable. Chaque disposition soutient un type d'apprentissage différent : travail en groupe, en îlots, ou en cercle.",
  },
  {
    number: "15",
    label: "Élèves maximum",
    sublabel: "par classe",
    description:
      "Des groupes à taille humaine pour un accompagnement individualisé, une attention réelle de chaque enseignant et une ambiance sereine.",
  },
  {
    number: "2 500 m²",
    label: "Espaces extérieurs",
    sublabel: "de terrain",
    description:
      "Un terrain vert pour les cours en plein air, le potager pédagogique, les ateliers pratiques et les moments de vie collective.",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white px-6 py-20 mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            En quelques mots
          </p>
          <h2 className="fraunces text-4xl md:text-5xl max-w-2xl mx-auto leading-tight">
            Quelques mots & chiffres pour vous décrire{" "}
            <em className="text-[#C85A2A]">notre établissement scolaire</em>
          </h2>
          <p className="mt-5 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
            Une équipe pluridisciplinaire réunie autour d'une conviction : chaque
            enfant peut trouver sa voie d'apprentissage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="border border-[#1C1410]/8 rounded-2xl p-8 flex flex-col gap-3"
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
                <span className="text-xs text-[#1C1410]/50 font-medium">
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
