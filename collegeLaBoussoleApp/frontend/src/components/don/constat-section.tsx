export default function ConstatSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
          Le constat social
        </p>
        <h2 className="fraunces text-4xl md:text-5xl leading-tight mb-6">
          De nombreux élèves n'ont pas la possibilité d'avoir des études{" "}
          <em className="text-[#C85A2A]">adaptées à leur fonctionnement</em>
        </h2>
        <p className="text-base text-[#1C1410]/60 leading-relaxed">
          Le système scolaire traditionnel ne laisse pas de place à tous les
          profils d'apprentissage. Des milliers d'élèves traversent leur
          scolarité sans jamais trouver un cadre qui leur corresponde vraiment —
          non par manque de capacités, mais par manque d'alternatives
          accessibles. La Boussole est née de ce constat.
        </p>
      </div>
    </section>
  );
}
