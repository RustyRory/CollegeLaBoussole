const PARTNERS = [
  "Fondation pour l'École",
  "IRESA Anjou",
  "À deux mains",
  "Mairie d'Angers",
  "Maine-et-Loire ESS",
  "CNESCA",
];

export default function PartenairesSection() {
  return (
    <section className="py-16 border-t border-[#1C1410]/10">
      <div className="text-center mb-10 px-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
          Des acteurs qui nous accompagnent
        </p>
        <h2 className="fraunces text-4xl md:text-5xl">
          Nos partenaires <em className="text-[#C85A2A]">et labels</em>
        </h2>
      </div>

      <div className="overflow-hidden">
        <div className="ticker-track-slow flex gap-4 w-max">
          {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map(
            (partner, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-[#1C1410]/8 px-8 py-5 flex items-center justify-center shrink-0 shadow-sm"
                style={{ minWidth: "200px" }}
              >
                <span className="text-sm text-[#1C1410]/60 whitespace-nowrap font-medium">
                  {partner}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
