const SECTIONS = [
  {
    title: "1. Éditeur du site",
    content: [
      "Le site collegelaboussole.org est édité par l'association **Collège La Boussole**, association loi 1901.",
      "**Siège social :** 12 rue de l'École, 75000 Paris",
      "**Email :** contact@collegelaboussole.org",
      "**Téléphone :** 01 23 45 67 89",
      "**Directeur de la publication :** [Nom du directeur]",
    ],
  },
  {
    title: "2. Hébergement",
    content: [
      "Le site est hébergé sur un serveur privé virtuel (VPS).",
      "**Hébergeur :** [Nom de l'hébergeur]",
      "**Adresse :** [Adresse de l'hébergeur]",
    ],
  },
  {
    title: "3. Propriété intellectuelle",
    content: [
      "L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes) sont la propriété exclusive de l'association Collège La Boussole ou de leurs auteurs respectifs.",
      "Toute reproduction, distribution, modification ou utilisation de ces contenus, sans autorisation écrite préalable, est strictement interdite.",
    ],
  },
  {
    title: "4. Données personnelles & RGPD",
    content: [
      "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles :",
      "- **Droit d'accès** : obtenir une copie de vos données",
      "- **Droit de rectification** : corriger des données inexactes",
      "- **Droit à l'effacement** : demander la suppression de vos données",
      "- **Droit d'opposition** : vous opposer au traitement de vos données",
      "Pour exercer ces droits, contactez-nous à : contact@collegelaboussole.org",
      "Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre à vos demandes et ne sont jamais transmises à des tiers.",
    ],
  },
  {
    title: "5. Cookies",
    content: [
      "Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de traçage n'est utilisé sans votre consentement.",
      "Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies.",
    ],
  },
  {
    title: "6. Responsabilité",
    content: [
      "L'association Collège La Boussole s'efforce de maintenir les informations de ce site à jour et exactes. Toutefois, elle ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées.",
      "L'association décline toute responsabilité pour tout dommage résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder.",
    ],
  },
  {
    title: "7. Liens hypertextes",
    content: [
      "Ce site peut contenir des liens vers des sites tiers. L'association Collège La Boussole n'est pas responsable du contenu de ces sites externes et ne peut être tenue responsable des dommages résultant de leur consultation.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans">
      <section className="px-6 py-20 max-w-3xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-2">Mentions légales</h1>
        <p className="text-gray-500 mb-12">Dernière mise à jour : avril 2026</p>

        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold text-zinc-800 mb-4">
                {section.title}
              </h2>
              <div className="flex flex-col gap-3">
                {section.content.map((line, i) => (
                  <p
                    key={i}
                    className="text-gray-600 leading-relaxed text-sm"
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/^- /, ""),
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
