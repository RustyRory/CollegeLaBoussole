import StatCard from "@/components/home/stat-card";

const HELLO_ASSO_URL = "https://www.helloasso.com";

const PROJECTS = [
  {
    icon: "📚",
    title: "Ressources pédagogiques",
    description:
      "Financement de matériel, livres et outils numériques pour enrichir les apprentissages.",
    goal: "5 000 €",
  },
  {
    icon: "🌿",
    title: "Aménagement extérieur",
    description:
      "Création d'un espace vert pédagogique où les élèves expérimentent et cultivent.",
    goal: "8 000 €",
  },
  {
    icon: "🎨",
    title: "Ateliers artistiques",
    description:
      "Interventions d'artistes et achat de matériel pour les activités créatives.",
    goal: "3 000 €",
  },
];

const FISCAL_STEPS = [
  {
    step: "1",
    label: "Vous faites un don",
    description: "Via HelloAsso, en toute sécurité.",
  },
  {
    step: "2",
    label: "Vous recevez un reçu fiscal",
    description: "Automatiquement envoyé par email après votre don.",
  },
  {
    step: "3",
    label: "Vous déduisez 66%",
    description:
      "Un don de 100 € ne vous coûte réellement que 34 € après réduction d'impôt.",
  },
];

export default function DonPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans">
      {/* 1. HERO */}
      <section className="px-6 py-20 max-w-5xl mx-auto w-full text-center">
        <span className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-4 block">
          Soutenir le collège
        </span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl mx-auto">
          Vous souhaitez contribuer à un projet éducatif engagé ?
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
          Le Collège La Boussole est porté par une association à but non
          lucratif. Vos dons financent directement les projets pédagogiques et
          permettent d'ouvrir le collège en septembre 2026.
        </p>
        <a
          href={HELLO_ASSO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-green-800 px-10 py-3 text-base font-semibold text-white hover:bg-green-900 transition-colors"
        >
          Faire un don via HelloAsso
        </a>
      </section>

      {/* 2. STATS */}
      <section className="py-16 px-6 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10">
            De nombreux donateurs font déjà partie de l'aventure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard number="99%" label="Taux de réussite" description="" />
            <StatCard
              number="25M+"
              label="Heures de cours"
              description="Dispensées par nos professeurs."
            />
            <StatCard
              number="150+"
              label="Donateurs"
              description="Qui soutiennent déjà le projet."
            />
            <StatCard
              number="75%"
              label="Objectif atteint"
              description="Sur la première levée de fonds."
            />
          </div>
        </div>
      </section>

      {/* 3. PROJETS FINANCÉS */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Les projets que vous financez
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
          Chaque don contribue concrètement à la vie du collège et à
          l'épanouissement des élèves.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="flex flex-col p-6 border border-gray-200 rounded-2xl bg-white shadow-sm"
            >
              <span className="text-4xl mb-4">{project.icon}</span>
              <h3 className="font-semibold text-zinc-800 mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4 flex-1">
                {project.description}
              </p>
              <p className="text-sm font-semibold text-green-800">
                Objectif : {project.goal}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. AVANTAGES FISCAUX */}
      <section className="py-20 px-6 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Une éducation hors-norme, une réduction d'impôt concrète
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            En tant qu'association loi 1901, vos dons ouvrent droit à une
            réduction d'impôt de <strong>66%</strong> du montant versé.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FISCAL_STEPS.map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-green-800 text-white flex items-center justify-center text-lg font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-zinc-800 mb-2">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA FINAL */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-green-50 rounded-3xl p-12">
          <h2 className="text-2xl font-bold mb-4">
            Faites un don et permettez à La Boussole de se développer !
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Chaque contribution, quelle que soit sa taille, nous rapproche de
            l'ouverture du collège en septembre 2026.
          </p>
          <a
            href={HELLO_ASSO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-green-800 px-10 py-3 text-base font-semibold text-white hover:bg-green-900 transition-colors"
          >
            Faire un don via HelloAsso
          </a>
          <p className="text-xs text-gray-400 mt-4">
            Vous recevrez un reçu fiscal par email. Don déductible à 66% de
            l'impôt sur le revenu.
          </p>
        </div>
      </section>
    </div>
  );
}
