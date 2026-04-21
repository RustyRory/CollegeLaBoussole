import StatCard from "@/components/home/stat-card";

const METHODS = [
  {
    icon: "🌿",
    title: "Apprentissage par le vivant",
    description:
      "Les élèves apprennent en faisant, en observant et en expérimentant le monde qui les entoure.",
  },
  {
    icon: "🎯",
    title: "Projets interdisciplinaires",
    description:
      "Des projets qui relient les matières entre elles pour donner du sens aux apprentissages.",
  },
  {
    icon: "🧠",
    title: "Différenciation pédagogique",
    description:
      "Chaque élève progresse à son rythme grâce à un accompagnement personnalisé.",
  },
  {
    icon: "🤲",
    title: "Coopération & entraide",
    description:
      "Le travail en groupe et l'entraide sont au cœur de notre culture de classe.",
  },
];

const FEATURES = [
  {
    title: "Un cadre bienveillant et stimulant",
    description:
      "Nos salles de classe sont pensées pour favoriser la concentration, la créativité et les échanges. Chaque espace est adapté au type d'activité.",
  },
  {
    title: "Des enseignants formés à nos méthodes",
    description:
      "Notre équipe pédagogique est formée en continu aux pratiques innovantes et à la gestion de classe bienveillante.",
  },
  {
    title: "Une évaluation repensée",
    description:
      "Nous privilégions l'évaluation formative qui guide l'élève dans sa progression, plutôt que la seule note chiffrée.",
  },
];

export default function PedagogiePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans">
      {/* 1. HERO */}
      <section className="px-6 py-20 max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <span className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-4 block">
            Pédagogie
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Une pédagogie innovante pour les élèves d'aujourd'hui.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Nous croyons qu'apprendre doit avoir du sens. Notre approche
            pédagogique place l'élève en situation active, ancre les savoirs
            dans le réel et valorise la curiosité.
          </p>
        </div>
        <div className="w-full md:w-1/2 aspect-video bg-amber-100 rounded-3xl flex items-center justify-center shrink-0">
          <span className="text-amber-600 text-5xl">🖼️</span>
        </div>
      </section>

      {/* 2. MÉTHODES */}
      <section className="bg-[#FAF7F2] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Comment travaillons-nous avec les élèves ?
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Des pratiques éprouvées et innovantes qui font la différence.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {METHODS.map((method) => (
              <div
                key={method.title}
                className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm"
              >
                <span className="text-4xl mb-4">{method.icon}</span>
                <h3 className="font-semibold text-zinc-800 mb-2">
                  {method.title}
                </h3>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. APPROCHE DÉTAILLÉE */}
      <section className="py-20 px-6 max-w-5xl mx-auto flex flex-col gap-16">
        {FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="w-full md:w-1/2 aspect-video bg-amber-100 rounded-3xl flex items-center justify-center shrink-0">
              <span className="text-amber-600 text-4xl">🖼️</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 4. STATS */}
      <section className="py-20 px-6 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            Des résultats qui parlent d'eux-mêmes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard number="99%" label="Taux de réussite" description="" />
            <StatCard
              number="25M+"
              label="Heures de cours"
              description="Dispensées par nos professeurs."
            />
            <StatCard
              number="180+"
              label="Élèves accompagnés"
              description="Depuis la création de l'établissement."
            />
            <StatCard
              number="75%"
              label="Mention Bien ou +"
              description="Obtenues par nos élèves au brevet."
            />
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-green-50 rounded-3xl p-12">
          <h2 className="text-2xl font-bold mb-4">
            Vous voulez en savoir plus sur notre pédagogie ?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Contactez-nous pour échanger avec notre équipe ou visiter
            l'établissement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-green-800 px-8 py-2.5 text-sm font-medium text-white hover:bg-green-900 transition-colors"
            >
              Nous contacter
            </a>
            <a
              href="/college"
              className="inline-flex items-center justify-center rounded-md border border-green-800 px-8 py-2.5 text-sm font-medium text-green-800 hover:bg-green-50 transition-colors"
            >
              Le collège
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
