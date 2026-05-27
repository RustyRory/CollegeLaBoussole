"use client";

import { useState } from "react";
import FaqItem from "@/components/home/faq-item";

const FAQ_ITEMS = [
  {
    question: "Qu'est-ce qu'un collège hors-contrat ?",
    answer:
      "Un collège hors-contrat est un établissement privé qui n'a pas passé de contrat avec l'État. Il est libre de définir ses méthodes pédagogiques tout en respectant les objectifs généraux de l'éducation nationale. Le financement repose uniquement sur les frais de scolarité et les dons.",
  },
  {
    question: "Comment sont calculés les frais de scolarité ?",
    answer:
      "Les frais sont calculés selon le quotient familial de votre foyer, de 0 à 600 €/mois. L'objectif : que chaque famille puisse accéder à l'établissement quelle que soit sa situation financière.",
  },
  {
    question: "Le collège est-il ouvert aux élèves en difficulté scolaire ?",
    answer:
      "Oui. La Boussole accueille tous les profils, y compris les élèves en difficulté. Notre pédagogie différenciée et l'accompagnement individualisé permettent à chaque élève de progresser à son rythme.",
  },
  {
    question: "Les dons sont-ils défiscalisables ?",
    answer:
      "Oui. La Boussole est une association reconnue d'intérêt général. Vos dons ouvrent droit à une réduction d'impôt de 66 % du montant versé, dans la limite de 20 % de votre revenu imposable.",
  },
  {
    question: "Quand et où ouvre le collège ?",
    answer:
      "Le Collège La Boussole est prévu d'ouvrir en septembre 2026 à Angers (Maine-et-Loire, 49). Les inscriptions pour la première promotion seront ouvertes prochainement.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-16 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
          Trouvez un établissement réellement adapté à vos besoins
        </p>
        <h2 className="fraunces text-4xl md:text-5xl">
          Vous avez des questions ?
          <br />
          <em className="text-[#C85A2A]">Nous vous répondons.</em>
        </h2>
        <p className="mt-4 text-base text-[#1C1410]/60 leading-relaxed">
          Les réponses aux questions les plus fréquentes des familles et
          donateurs.
        </p>
      </div>

      <div>
        {FAQ_ITEMS.map((item, i) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
        <div className="border-t border-[#1C1410]/10" />
      </div>
    </section>
  );
}
