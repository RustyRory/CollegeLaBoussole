import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto bg-[#1E3A2F] rounded-3xl px-8 md:px-16 py-16 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">
          Discutons ensemble
        </p>
        <h2 className="fraunces text-4xl md:text-5xl text-white mb-2 leading-tight">
          Maintenant que vous nous connaissez,{" "}
          <em className="text-[#C85A2A]">avançons ensemble.</em>
        </h2>
        <p className="mt-4 text-base text-white/50 max-w-md mx-auto leading-relaxed mb-8">
          Que vous soyez une famille, un donateur ou un partenaire, La Boussole
          a besoin de vous pour exister.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#C85A2A] px-6 py-3 text-sm font-medium text-white hover:bg-[#B04E24] transition-colors"
          >
            Nous contacter →
          </Link>
          <Link
            href="/don"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:border-white/60 transition-colors"
          >
            Faire un don à La Boussole
          </Link>
        </div>
      </div>
    </section>
  );
}
