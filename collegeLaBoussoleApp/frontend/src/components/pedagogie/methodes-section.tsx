"use client";

import { useState } from "react";
import {
  Clock, Leaf, CalendarClock, Users, Sparkles,
  Layers, MapPin, Wrench, Sprout,
  MessageCircle, ShieldCheck, Star,
  Palette, UtensilsCrossed, Hammer,
} from "lucide-react";

const TABS: {
  icon: React.ElementType;
  label: string;
  title: string;
  body: string;
  bullets: { icon: React.ElementType; text: string }[];
}[] = [
  {
    icon: Leaf,
    label: "Qu'est-ce que la pédagogie vivante ?",
    title: "La pédagogie vivante, c'est quoi ?",
    body: "Nous croyons que le corps et l'esprit ne font qu'un dans l'apprentissage. Un élève qui bouge, qui touche, qui expérimente retient mieux et apprend avec plaisir. Apprendre par l'expérience directe, le mouvement et le contact avec le réel. Chaque discipline s'ancre dans des situations concrètes et significatives pour l'élève.",
    bullets: [
      { icon: Layers,  text: "Apprentissage par projets interdisciplinaires" },
      { icon: MapPin,  text: "Sorties terrain régulières en Anjou" },
      { icon: Wrench,  text: "Ateliers pratiques hebdomadaires" },
      { icon: Sprout,  text: "Potager pédagogique et sciences du vivant" },
    ],
  },
  {
    icon: CalendarClock,
    label: "Emploi du temps type d'un élève",
    title: "Une journée bien rythmée",
    body: "Le rythme scolaire est pensé pour respecter les cycles d'attention et d'énergie de l'élève. Chaque journée alterne temps d'enseignement structuré, moments de pratique et temps de mouvement pour favoriser un engagement durable.",
    bullets: [
      { icon: Clock, text: "8h30 — Accueil et temps calme" },
      { icon: Clock, text: "9h00 — Enseignements disciplinaires" },
      { icon: Clock, text: "11h30 — Atelier pratique ou hébertisme" },
      { icon: Clock, text: "14h00 — Projets interdisciplinaires" },
      { icon: Clock, text: "16h00 — Bilan de journée et autonomie" },
    ],
  },
  {
    icon: Users,
    label: "La sélection manuelle",
    title: "Une admission centrée sur le projet de l'élève",
    body: "Nous ne sélectionnons pas sur les notes. Nous accueillons des élèves de tous niveaux, en veillant à construire une classe diverse, équilibrée et bienveillante. La rencontre avec la famille et l'élève est au cœur du processus d'admission.",
    bullets: [
      { icon: MessageCircle, text: "Entretien avec la famille et l'élève" },
      { icon: ShieldCheck,   text: "Aucun critère académique éliminatoire" },
      { icon: Users,         text: "Diversité sociale et scolaire recherchée" },
      { icon: Star,          text: "Accompagnement personnalisé dès l'admission" },
    ],
  },
  {
    icon: Sparkles,
    label: "Les activités extra-scolaires",
    title: "Apprendre au-delà des cours",
    body: "Les activités extra-scolaires ne sont pas un bonus — elles font partie intégrante de notre projet pédagogique. Elles développent la curiosité, l'autonomie, la créativité et le sens des responsabilités.",
    bullets: [
      { icon: Palette,          text: "Ateliers arts plastiques et expression" },
      { icon: Sprout,           text: "Jardinage et entretien du potager" },
      { icon: UtensilsCrossed,  text: "Cuisine et éducation alimentaire" },
      { icon: Hammer,           text: "Fabrication, bricolage et découverte des métiers" },
    ],
  },
];

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
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {TABS.map((t, i) => {
          const Icon = t.icon;
          return (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors border ${
                activeTab === i
                  ? "bg-[#1E3A2F] text-white border-[#1E3A2F]"
                  : "bg-white text-[#1C1410] border-[#1C1410]/20 hover:border-[#1E3A2F] hover:text-[#1E3A2F]"
              }`}
            >
              <Icon size={13} strokeWidth={2} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Card contenu */}
      <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-[#1C1410]/8 bg-white md:h-[420px]">
        {/* Texte */}
        <div className="p-8 md:p-10 flex flex-col gap-4">
          <h3 className="fraunces text-2xl md:text-3xl">
            {tab.title}
          </h3>
          <p className="text-sm text-[#1C1410]/60 leading-relaxed">
            {tab.body}
          </p>
          <ul className="space-y-2">
            {tab.bullets.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.text} className="flex items-start gap-2.5">
                  <Icon
                    size={14}
                    className="text-[#C85A2A] shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <span className="text-sm text-[#1C1410]/80">{b.text}</span>
                </li>
              );
            })}
          </ul>

          
        </div>

        {/* Image */}
        <div className="bg-[#C8B09A] relative min-h-[280px] md:min-h-0">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-[#1E3A2F] rounded-xl px-4 py-3">
              <p className="text-sm text-white/80 leading-relaxed italic">
                « L'enfant retrouve le sens d'apprendre par le réel, le corps et
                la bienveillance. »
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
