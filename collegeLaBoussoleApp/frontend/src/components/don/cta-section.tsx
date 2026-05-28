import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto bg-[#1E3A2F] rounded-3xl px-8 md:px-16 py-16 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">
          Discutons ensemble
        </p>
        <h2 className="fraunces text-4xl md:text-5xl text-white mb-2 leading-tight">
          Vous préférez nous contacter{" "}
          <em className="text-[#C85A2A]">avant de donner ?</em>
        </h2>
        <p className="mt-4 text-base text-white/50 max-w-md mx-auto leading-relaxed mb-8">
          Nous sommes disponibles pour répondre à toutes vos questions sur notre
          projet, l'utilisation des fonds ou les aspects fiscaux.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-[#C85A2A] px-6 py-3 text-sm font-medium text-white hover:bg-[#B04E24] transition-colors"
        >
          Nous contacter →
        </Link>
      </div>
    </section>
  );
}
