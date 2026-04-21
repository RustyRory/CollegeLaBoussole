import StatCard from "@/components/home/stat-card";

const VALUES = [
  {
    icon: "🌱",
    title: "Ancrage dans le réel",
    description:
      "Des apprentissages connectés au monde, à la nature et aux enjeux contemporains.",
  },
  {
    icon: "🤝",
    title: "Bienveillance",
    description:
      "Un cadre sécurisant où chaque élève est respecté et accompagné à son rythme.",
  },
  {
    icon: "💡",
    title: "Curiosité & créativité",
    description:
      "Des méthodes pédagogiques qui stimulent l'envie d'apprendre et d'expérimenter.",
  },
  {
    icon: "🏫",
    title: "Communauté",
    description:
      "Une école à taille humaine qui rassemble élèves, familles et enseignants.",
  },
];

const TEAM = [
  { name: "Marie Dupont", role: "Directrice pédagogique" },
  { name: "Jean Martin", role: "Enseignant — Lettres & Histoire" },
  { name: "Sophie Bernard", role: "Enseignante — Sciences" },
  { name: "Lucas Moreau", role: "Responsable vie scolaire" },
];

export default function CollegePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans">
      {/* 1. HERO */}
      <section className="px-6 py-20 max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <span className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-4 block">
            Le collège
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Une pédagogie ancrée dans l'action et le vivant.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Le Collège La Boussole est un établissement à taille humaine qui
            redonne du sens à l'apprentissage en plaçant l'élève au cœur de son
            parcours éducatif.
          </p>
        </div>
        <div className="w-full md:w-1/2 aspect-video bg-amber-100 rounded-3xl flex items-center justify-center shrink-0">
          <span className="text-amber-600 text-5xl">🖼️</span>
        </div>
      </section>

      {/* 2. HISTOIRE & PROJET */}
      <section className="bg-[#FAF7F2] py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-white rounded-3xl flex items-center justify-center shadow-sm">
            <span className="text-gray-400 text-5xl">🖼️</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Notre histoire & notre projet éducatif
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Né de la volonté de familles et d'enseignants engagés, le Collège
              La Boussole est porté par une association dont l'objectif est
              l'ouverture en septembre 2026.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Notre projet éducatif s'articule autour d'une conviction : chaque
              enfant apprend mieux quand il comprend le sens de ce qu'il fait.
              Nous développons des pratiques pédagogiques innovantes, ancrées
              dans le concret.
            </p>
            <a
              href="#"
              className="text-green-800 font-semibold hover:underline"
            >
              Lire le projet éducatif complet →
            </a>
          </div>
        </div>
      </section>

      {/* 3. VALEURS */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Nos valeurs & engagements
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
          Ces valeurs guident chacune de nos décisions pédagogiques et
          organisationnelles.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-2xl bg-white shadow-sm"
            >
              <span className="text-4xl mb-4">{value.icon}</span>
              <h3 className="font-semibold text-zinc-800 mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray-500">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. STATS */}
      <section className="py-20 px-6 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Le collège en chiffres</h2>
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

      {/* 5. ÉQUIPE */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          L'équipe pédagogique & administrative
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
          Des professionnels passionnés et engagés autour d'un projet commun.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-2xl bg-white shadow-sm"
            >
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <span className="text-3xl">🖼️</span>
              </div>
              <h3 className="font-semibold text-zinc-800">{member.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PARTENAIRES */}
      <section className="py-12 px-6 bg-gray-50 border-y border-gray-100 text-center">
        <h3 className="text-lg font-semibold mb-8">Nos partenariats</h3>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="w-24 h-24 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm"
            >
              <span className="text-gray-400">🖼️</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-green-50 rounded-3xl p-12">
          <h2 className="text-2xl font-bold mb-4">
            Vous souhaitez contribuer à ce projet ?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Rejoignez la communauté du Collège La Boussole en tant que famille,
            enseignant ou donateur.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-green-800 px-8 py-2.5 text-sm font-medium text-white hover:bg-green-900 transition-colors"
            >
              Nous contacter
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-green-800 px-8 py-2.5 text-sm font-medium text-green-800 hover:bg-green-50 transition-colors"
            >
              Faire un don
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
