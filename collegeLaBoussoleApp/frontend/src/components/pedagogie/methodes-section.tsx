"use client";

import { useState } from "react";
import { Check, Clock, Circle } from "lucide-react";

type BulletType = "check" | "clock" | "dot";

const TABS: {
  label: string;
  title: string;
  body: string;
  bulletType: BulletType;
  bullets: string[];
}[] = [
  {
    label: "Qu'est-ce que la pédagogie vivante ?",
    title: "La pédagogie vivante, c'est quoi ?",
    bulletType: "check",
    body: "Nous croyons que le corps et l'esprit ne font qu'un dans l'apprentissage. Un élève qui bouge, qui touche, qui expérimente retient mieux et apprend avec plaisir. Apprendre par l'expérience directe, le mouvement et le contact avec le réel. Chaque discipline s'ancre dans des situations concrètes et significatives pour l'élève.",
    bullets: [
      "Apprentissage par projets interdisciplinaires",
      "Sorties terrain régulières en Anjou",
      "Ateliers pratiques hebdomadaires",
      "Potager pédagogique et sciences du vivant",
    ],
  },
  {
    label: "Emploi du temps type d'un élève",
    title: "Une journée bien rythmée",
    bulletType: "clock",
    body: "Le rythme scolaire est pensé pour respecter les cycles d'attention et d'énergie de l'élève. Chaque journée alterne temps d'enseignement structuré, moments de pratique et temps de mouvement pour favoriser un engagement durable.",
    bullets: [
      "8h30 — Accueil et temps calme",
      "9h00 — Enseignements disciplinaires",
      "11h30 — Atelier pratique ou hébertisme",
      "14h00 — Projets interdisciplinaires",
      "16h00 — Bilan de journée et autonomie",
    ],
  },
  {
    label: "La sélection manuelle",
    title: "Une admission centrée sur le projet de l'élève",
    bulletType: "dot",
    body: "Nous ne sélectionnons pas sur les notes. Nous accueillons des élèves de tous niveaux, en veillant à construire une classe diverse, équilibrée et bienveillante. La rencontre avec la famille et l'élève est au cœur du processus d'admission.",
    bullets: [
      "Entretien avec la famille et l'élève",
      "Aucun critère académique éliminatoire",
      "Diversité sociale et scolaire recherchée",
      "Accompagnement personnalisé dès l'admission",
    ],
  },
  {
    label: "Les activités extra-scolaires",
    title: "Apprendre au-delà des cours",
    bulletType: "dot",
    body: "Les activités extra-scolaires ne sont pas un bonus — elles font partie intégrante de notre projet pédagogique. Elles développent la curiosité, l'autonomie, la créativité et le sens des responsabilités.",
    bullets: [
      "Ateliers arts plastiques et expression",
      "Jardinage et entretien du potager",
      "Cuisine et éducation alimentaire",
      "Fabrication, bricolage et découverte des métiers",
    ],
  },
];

function BulletIcon({ type }: { type: BulletType }) {
  if (type === "check")
    return <Check size={14} className="text-[#C85A2A] shrink-0 mt-0.5" strokeWidth={2.5} />;
  if (type === "clock")
    return <Clock size={14} className="text-[#C85A2A] shrink-0 mt-0.5" strokeWidth={2} />;
  return <Circle size={6} className="text-[#C85A2A] shrink-0 mt-1.5 fill-[#C85A2A]" />;
}

export default function MethodesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      {/* En-tête */}
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
          Notre approche
        </p>
        <h2 className="fraunces text-4xl md:text-5xl max-w-xl mx-auto">
          Comment travaillons nous avec les élèves à{" "}
          <em className="text-[#C85A2A]">La Boussole</em>
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
              activeTab === i
                ? "bg-[#C85A2A] text-white border-[#C85A2A]"
                : "bg-white text-[#1C1410] border-[#1C1410]/20 hover:border-[#C85A2A] hover:text-[#C85A2A]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Card contenu — hauteur fixe pour tous les onglets */}
      <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-[#1C1410]/8 bg-white h-[480px]">
        {/* Texte */}
        <div className="p-8 md:p-10 flex flex-col gap-4 overflow-hidden">
          <h3 className="fraunces text-2xl md:text-3xl shrink-0">{tab.title}</h3>
          <p className="text-sm text-[#1C1410]/60 leading-relaxed shrink-0">{tab.body}</p>
          <ul className="space-y-2 flex-1">
            {tab.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <BulletIcon type={tab.bulletType} />
                <span className="text-sm text-[#1C1410]/80">{b}</span>
              </li>
            ))}
          </ul>

          {/* Boutons */}
          <div className="flex flex-wrap gap-2 pt-2 shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#C85A2A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#B04E24] transition-colors"
            >
              Entrons en contact →
            </a>
            <a
              href="/college"
              className="inline-flex items-center gap-2 rounded-full border border-[#1C1410]/20 px-5 py-2.5 text-sm font-medium text-[#1C1410] hover:border-[#1C1410]/50 transition-colors"
            >
              Présentation de l'établissement
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="bg-[#C8B09A] relative h-full">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-[#1E3A2F] rounded-xl px-4 py-3">
              <p className="text-sm text-white/80 leading-relaxed italic">
                « L'enfant retrouve le sens d'apprendre par le réel, le corps
                et la bienveillance. »
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
