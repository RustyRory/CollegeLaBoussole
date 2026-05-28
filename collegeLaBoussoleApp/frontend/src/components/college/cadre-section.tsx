"use client";

import { useState } from "react";
import {
  MapPin, LayoutGrid, Leaf, Bus,
  Bike, TreePine, BookOpen, Palette,
  Sprout, Activity, Flag, Car, Accessibility, Move,
} from "lucide-react";
import Link from "next/link";

const TABS: {
  icon: React.ElementType;
  label: string;
  title: string;
  body: string;
  bullets: { icon: React.ElementType; text: string }[];
}[] = [
  {
    icon: MapPin,
    label: "Où se situe l'établissement ?",
    title: "Un emplacement idéal au cœur de l'Anjou",
    body: "Le Collège La Boussole s'installe à Angers, ville dynamique et accessible, au carrefour des transports en commun et à proximité des espaces naturels qui alimentent notre pédagogie du vivant.",
    bullets: [
      { icon: MapPin,  text: "Situé à Angers (Maine-et-Loire, 49)" },
      { icon: Bus,     text: "Proche du réseau de bus et tramway" },
      { icon: Bike,    text: "Accès vélo sécurisé" },
      { icon: TreePine, text: "Environnement calme et végétalisé" },
    ],
  },
  {
    icon: LayoutGrid,
    label: "Les salles de cours & activités",
    title: "Des espaces pensés pour apprendre autrement",
    body: "Nos salles sont modulables par design : le mobilier se déplace, les murs s'effacent. Chaque configuration de classe soutient un mode d'apprentissage différent — travail en groupe, en atelier ou en autonomie.",
    bullets: [
      { icon: Move,      text: "Mobilier ergonomique déplaçable" },
      { icon: LayoutGrid, text: "Salles polyvalentes pour les ateliers pratiques" },
      { icon: BookOpen,  text: "Espace bibliothèque et ressources" },
      { icon: Palette,   text: "Atelier de fabrication et arts plastiques" },
    ],
  },
  {
    icon: Leaf,
    label: "Les espaces extérieurs",
    title: "Un terrain vert pour apprendre dehors",
    body: "L'extérieur fait partie de l'école. Le terrain comprend un jardin pédagogique, des zones de mouvement et des espaces de repos à l'ombre. Apprendre dehors est une pratique quotidienne, pas une exception.",
    bullets: [
      { icon: Sprout,   text: "Potager pédagogique et compostage" },
      { icon: Activity, text: "Zone hébertisme et parcours moteur" },
      { icon: Leaf,     text: "Espaces de pause ombragés" },
      { icon: Flag,     text: "Terrain multi-activités" },
    ],
  },
  {
    icon: Bus,
    label: "L'accessibilité & transports",
    title: "Un lieu facile d'accès pour toutes les familles",
    body: "Nous avons veillé à choisir un site accessible à pied, en vélo, en bus ou en voiture depuis les principaux quartiers d'Angers. Aucune famille ne doit être freinée par la distance ou les transports.",
    bullets: [
      { icon: Bus,           text: "Arrêt de bus à 3 minutes à pied" },
      { icon: Bike,          text: "Stationnement vélos sécurisé" },
      { icon: Car,           text: "Parking visiteurs disponible" },
      { icon: Accessibility, text: "Accessibilité PMR garantie" },
    ],
  },
];

export default function CadreSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      {/* En-tête */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
          Un établissement agréable et sécurisé
        </p>
        <h2 className="fraunces text-4xl md:text-5xl">
          Un cadre sain et chaleureux pour{" "}
          <em className="text-[#C85A2A]">étudier en toute sécurité</em>
        </h2>
        <p className="mt-4 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
          Des locaux pensés pour le bien-être, le mouvement et la concentration.
          Un lieu où les élèves ont envie de venir chaque matin.
        </p>
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

      {/* Contenu */}
      <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-[#1C1410]/8 bg-white md:h-[420px]">
        {/* Texte */}
        <div className="p-8 md:p-10 flex flex-col gap-4">
          <h3 className="fraunces text-2xl md:text-3xl">{tab.title}</h3>
          <p className="text-sm text-[#1C1410]/60 leading-relaxed">{tab.body}</p>
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

        {/* Image placeholder */}
        <div className="bg-[#C8B09A] relative min-h-[280px] md:min-h-0">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-[#1E3A2F] rounded-xl px-4 py-3">
              <p className="text-sm text-white/80 leading-relaxed italic">
                « Un espace pensé pour vivre et apprendre, pas seulement pour
                s'asseoir. »
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
