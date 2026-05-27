"use client";

import { useState } from "react";
import Link from "next/link";

const ITEMS = [
  {
    title: "Élément 1 de la pédagogie vivante",
    content: (
      <div className="space-y-3">
        <p>
          Apprendre par l'expérience directe, le mouvement et le contact avec le
          réel. Chaque élève s'inscrit dans des situations concrètes et
          significatives pour l'élève.
        </p>
        <ul className="space-y-1 ml-2">
          <li>• Apprentissage par projets interdisciplinaires</li>
          <li>• Sorties terrain régulières en Anjou</li>
          <li>• Ateliers pratiques hebdomadaires</li>
        </ul>
      </div>
    ),
  },
  {
    title: "L'hébertisme et le mouvement",
    content: (
      <p>
        La méthode naturelle d'Hébert place le corps au cœur de l'apprentissage.
        Escalade, équilibre, course, portés — le mouvement comme vecteur de
        confiance en soi.
      </p>
    ),
  },
  {
    title: "La remédiation scolaire",
    content: (
      <p>
        Chaque élève bénéficie d'un suivi individualisé pour combler ses lacunes
        sans jugement, à son rythme et avec les outils adaptés à son profil
        d'apprentissage.
      </p>
    ),
  },
  {
    title: "Les activités extra-scolaires",
    content: (
      <p>
        Ateliers arts, jardinage, cuisine, fabrication — des temps de pratique
        qui développent la curiosité, l'autonomie et le sens de l'initiative.
      </p>
    ),
  },
];

export default function PedagogieSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
          Des méthodes d'apprentissage pour tous
        </p>
        <h2 className="fraunces text-4xl md:text-5xl">
          Découvrez notre pédagogie
          <br />
          ancrée dans{" "}
          <em className="text-[#C85A2A]">l'action et le vivant</em>
        </h2>
        <p className="mt-4 text-base text-[#1C1410]/60 max-w-xl leading-relaxed">
          À La Boussole, chaque élève apprend à son rythme, avec son corps,
          dans un cadre structuré et bienveillant.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Accordion */}
        <div className="flex flex-col">
          {ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.title} className="border-t border-[#1C1410]/10">
                <button
                  onClick={() => setOpenIndex(i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                >
                  <span className="text-sm font-semibold">{item.title}</span>
                  <span
                    className={`text-lg shrink-0 transition-colors duration-200 ${
                      isOpen ? "text-[#C85A2A]" : "text-[#1C1410]/40"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.3s ease",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div className="pb-5 text-sm text-[#1C1410]/60 leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="border-t border-[#1C1410]/10 pt-6">
            <Link
              href="/pedagogie"
              className="inline-flex items-center gap-2 rounded-full bg-[#C85A2A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#B04E24] transition-colors"
            >
              Explorer la pédagogie →
            </Link>
          </div>
        </div>

        {/* Image card with quote */}
        <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#C8B09A] relative">
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
