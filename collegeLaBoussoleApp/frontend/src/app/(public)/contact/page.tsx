import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Contact — Collège La Boussole",
  description:
    "Contactez le Collège La Boussole. Nous répondrons à votre demande au plus vite.",
};

const INFO_CARDS = [
  {
    icon: "📍",
    label: "Adresse",
    value: "12 rue de l'École, 75000 Paris",
  },
  {
    icon: "📞",
    label: "Téléphone",
    value: "01 23 45 67 89",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "contact@laboussole.fr",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans">
      {/* HERO */}
      <section className="px-6 py-20 max-w-5xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl mx-auto">
          Contactez-nous, nous répondrons à votre demande au plus vite&nbsp;!
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Une question sur les inscriptions, la pédagogie ou la vie
          scolaire&nbsp;? Notre équipe est là pour vous aider.
        </p>
      </section>

      {/* FORM + INFO */}
      <section className="px-6 pb-20 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Infos de contact */}
          <div className="flex flex-col gap-6">
            {INFO_CARDS.map((card) => (
              <div
                key={card.label}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <span className="text-2xl">{card.icon}</span>
                <div>
                  <p className="font-semibold text-zinc-800">{card.label}</p>
                  <p className="text-sm text-gray-500">{card.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-green-50 rounded-3xl p-12">
          <h2 className="text-2xl font-bold mb-2">
            Maintenant que vous nous connaissez, avançons ensemble.
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Rejoignez la communauté du Collège La Boussole.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-green-800 px-8 py-2.5 text-sm font-medium text-white hover:bg-green-900 transition-colors"
          >
            S&apos;inscrire
          </a>
        </div>
      </section>
    </div>
  );
}
