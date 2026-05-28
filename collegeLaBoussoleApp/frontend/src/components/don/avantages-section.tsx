import { Percent, Building2, FileCheck } from "lucide-react";

const AVANTAGES = [
  {
    icon: Percent,
    title: "Réduction d'impôt sur le revenu",
    description:
      "66 % du montant du don déduit de votre impôt, dans la limite de 20 % du revenu imposable. Un don de 300 € ne vous coûte que 102 €.",
  },
  {
    icon: Building2,
    title: "Mécénat d'entreprise",
    description:
      "Les entreprises bénéficient d'une réduction d'IS de 60 % (dans la limite de 0,5 % du CA HT). Un levier RSE puissant et mesurable.",
  },
  {
    icon: FileCheck,
    title: "Reçu fiscal automatique",
    description:
      "Vous recevez un reçu fiscal CERFA dès validation de votre don via HelloAsso, valable pour votre déclaration de revenus.",
  },
];

export default function AvantagesSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            Des avantages pour vous
          </p>
          <h2 className="fraunces text-4xl md:text-5xl">
            De nombreux avantages à soutenir{" "}
            <em className="text-[#C85A2A]">une structure engagée</em>
          </h2>
          <p className="mt-4 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
            Donner à La Boussole, c'est à la fois soutenir un projet éducatif
            et bénéficier d'avantages fiscaux concrets.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {AVANTAGES.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="bg-white border border-[#1C1410]/8 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C85A2A]/10 text-[#C85A2A] flex items-center justify-center shrink-0">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-semibold text-sm text-[#1C1410]">
                    {a.title}
                  </h3>
                  <p className="text-sm text-[#1C1410]/60 leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
