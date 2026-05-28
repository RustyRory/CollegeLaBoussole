const HELLO_ASSO_URL = "https://www.helloasso.com";

const PALIERS = [
  {
    amount: "100 €",
    label: "don unique",
    description:
      "Finance les fournitures scolaires d'un élève pour un trimestre entier.",
    populaire: false,
    variant: "light" as const,
  },
  {
    amount: "250 €",
    label: "don unique",
    description:
      "Couvre un mois de scolarité pour un élève issu d'une famille modeste.",
    populaire: true,
    variant: "dark" as const,
  },
  {
    amount: "500 €",
    label: "don unique",
    description:
      "Participe à l'aménagement des locaux : mobilier, équipements sportifs, jardin.",
    populaire: false,
    variant: "light" as const,
  },
  {
    amount: "1 000 €",
    label: "don unique",
    description:
      "Finance une année de scolarité complète pour un enfant de famille sans ressources.",
    populaire: false,
    variant: "accent" as const,
  },
];

export default function PaliersSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            Nous investissons pour nos élèves
          </p>
          <h2 className="fraunces text-4xl md:text-5xl">
            Concrètement, que{" "}
            <em className="text-[#C85A2A]">financent vos dons ?</em>
          </h2>
          <p className="mt-4 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
            Chaque euro donné a un impact direct et traçable sur la vie d'un
            élève ou le développement de l'établissement.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {PALIERS.map((palier) => {
            const isDark = palier.variant === "dark";
            const isAccent = palier.variant === "accent";
            const bg = isDark
              ? "bg-[#1E3A2F]"
              : isAccent
              ? "bg-[#C85A2A]"
              : "bg-white border border-[#1C1410]/8";
            const textTitle = isDark || isAccent ? "text-white" : "text-[#1C1410]";
            const textBody = isDark || isAccent ? "text-white/70" : "text-[#1C1410]/60";
            const textLabel = isDark || isAccent ? "text-white/50" : "text-[#1C1410]/40";
            const amountColor = isDark
              ? "text-[#C85A2A]"
              : isAccent
              ? "text-white"
              : "text-[#C85A2A]";
            const btnClass = isDark
              ? "bg-[#C85A2A] text-white hover:bg-[#B04E24]"
              : isAccent
              ? "bg-white text-[#C85A2A] hover:bg-white/90"
              : "bg-[#1E3A2F] text-white hover:bg-[#1E3A2F]/90";

            return (
              <div
                key={palier.amount}
                className={`relative ${bg} rounded-2xl p-6 flex flex-col gap-4`}
              >
                {palier.populaire && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C85A2A] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
                <div>
                  <span className={`fraunces text-4xl font-medium ${amountColor}`}>
                    {palier.amount}
                  </span>
                  <p className={`text-xs mt-0.5 ${textLabel}`}>{palier.label}</p>
                </div>
                <p className={`text-sm leading-relaxed flex-1 ${textBody}`}>
                  {palier.description}
                </p>
                <a
                  href={HELLO_ASSO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${btnClass}`}
                >
                  Donner {palier.amount} →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
