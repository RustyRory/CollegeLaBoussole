import Link from "next/link";

const HELLO_ASSO_URL = "https://www.helloasso.com";

const CHIFFRES = [
  { number: "150+", label: "Familles déjà engagées" },
  { number: "66 %", label: "De réduction d'impôt" },
  { number: "0 €", label: "De salaires versés" },
  { number: "2027", label: "Ouverture prévue" },
];

export default function PourquoiSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            Pourquoi avons-nous besoin de dons ?
          </p>
          <h2 className="fraunces text-4xl md:text-5xl leading-tight">
            Une structure basée sur du bénévolat, qui{" "}
            <em className="text-[#C85A2A]">manque encore de fonds</em>
          </h2>
          <p className="mt-4 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
            Développer un établissement scolaire est un investissement très
            important. Notre structure, gérée par une association et
            fonctionnant majoritairement avec des bénévoles, est en recherche
            de fonds pour financer les locaux, le matériel pédagogique et les
            premières années de fonctionnement.
          </p>
          
        </div>

        {/* Chiffres clés */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CHIFFRES.map((c) => (
            <div
              key={c.label}
              className="bg-white border border-[#1C1410]/8 rounded-2xl p-6 flex flex-col gap-1"
            >
              <span className="fraunces text-4xl text-[#C85A2A]">{c.number}</span>
              <span className="text-sm text-[#1C1410]/60">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
