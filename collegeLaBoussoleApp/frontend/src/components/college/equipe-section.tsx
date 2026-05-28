const TEAM = [
  {
    name: "Alice de Kergorlay",
    role: "Directrice",
    comite: "Directrice pédagogique",
    quote:
      "Chaque enfant a sa clé. Notre mission est de la trouver avec lui. C'est ça la Boussole.",
    bgColor: "bg-[#C8B09A]",
  },
  {
    name: "Membre de l'équipe",
    role: "Secrétaire",
    comite: "Comité immobilier · Locaux & infrastructure",
    quote:
      "Un espace pensé pour vivre et apprendre, pas seulement pour s'asseoir.",
    bgColor: "bg-[#1E3A2F]/20",
  },
  {
    name: "Membre de l'équipe",
    role: "Chargée de communication",
    comite: "Comité communication · Levée de fonds & comm.",
    quote:
      "Faire connaître La Boussole à toutes les familles de l'Anjou. Les aider à s'orienter.",
    bgColor: "bg-[#C85A2A]/15",
  },
  {
    name: "Membre de l'équipe",
    role: "Directeur d'établissement",
    comite: "Comité social & RH · Vie associative",
    quote:
      "Une structure humaine et bienveillante, pour les élèves comme pour l'équipe.",
    bgColor: "bg-[#F5F0E8]",
  },
];

export default function EquipeSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            Des profils variés pour vous accompagner
          </p>
          <h2 className="fraunces text-4xl md:text-5xl">
            Découvrez qui se cache{" "}
            <em className="text-[#C85A2A]">derrière La Boussole</em>
          </h2>
          <p className="mt-4 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
            Une équipe pluridisciplinaire réunie autour d'une conviction :
            chaque enfant peut trouver sa voie d'apprentissage.
          </p>
        </div>

        {/* Grille équipe */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {TEAM.map((member) => (
            <div
              key={member.name + member.role}
              className="bg-white border border-[#1C1410]/8 rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Photo placeholder */}
              <div className={`${member.bgColor} h-48`} />

              {/* Infos */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#C85A2A]">
                    {member.role}
                  </p>
                  <h3 className="font-semibold text-sm text-[#1C1410] mt-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#1C1410]/50 mt-0.5">
                    {member.comite}
                  </p>
                </div>

                {/* Citation */}
                <blockquote className="mt-auto border-t border-[#1C1410]/8 pt-3">
                  <p className="text-xs text-[#1C1410]/60 leading-relaxed italic">
                    « {member.quote} »
                  </p>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
