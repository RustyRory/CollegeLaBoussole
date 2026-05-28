"use client";

import { useState } from "react";
import Link from "next/link";

function calculateMonthlyFee(qf: number): number {
  return Math.round(qf * 0.064);
}

export default function TarifsSection() {
  const [qf, setQf] = useState(2500);
  const monthlyCost = calculateMonthlyFee(qf);

  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            Des études pour tous
          </p>
          <h2 className="fraunces text-4xl md:text-5xl">
            Des frais de scolarité qui{" "}
            <em className="text-[#C85A2A]">s'adaptent à vos revenus</em>
          </h2>
          <p className="mt-4 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
            Un modèle solidaire où chaque famille contribue selon ses moyens.
            L'excellence éducative ne devrait pas dépendre du revenu familial.
          </p>
        </div>

        {/* Card blanche */}
        <div className="bg-white rounded-2xl p-8 md:p-10">
          
          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            {/* Texte + CTAs */}
            <div className="flex flex-col gap-6">
              <h3 className="fraunces text-2xl md:text-3xl mb-8">
                Comment sont calculés vos frais ?
              </h3>
              <p className="text-sm text-[#1C1410]/60 leading-relaxed">
                Le modèle économique de La Boussole repose sur la solidarité :
                ceux qui peuvent plus contribuent pour ceux qui peuvent moins. Les
                frais sont calculés à partir de votre quotient familial (revenus
                nets ÷ parts fiscales). Un entretien confidentiel avec la direction
                permet de définir ensemble votre contribution.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#1C1410]/30 px-6 py-3 text-sm font-medium text-[#1C1410] hover:border-[#1C1410] transition-colors"
                >
                  Demander une grille tarifaire
                </Link>
              </div>
            </div>

            {/* Card simulateur verte */}
            <div className="bg-[#1E3A2F] rounded-2xl p-8 flex flex-col gap-6">
              <p className="text-sm font-semibold text-white">
                Simulez ici le coût de la scolarité de votre enfant
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white/70">
                    Quel est votre quotient familial ?
                  </label>
                  <span className="fraunces text-lg text-white font-medium">
                    {qf.toLocaleString("fr-FR")} €
                  </span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={50}
                  value={qf}
                  onChange={(e) => setQf(Number(e.target.value))}
                  className="w-full accent-[#C85A2A] cursor-pointer"
                />

                <div className="flex justify-between text-xs text-white/40">
                  <span>0 €</span>
                  <span>5 000 €</span>
                </div>
              </div>

              {/* Résultat en beige */}
              <div className="bg-[#F5F0E8] rounded-xl p-6">
                <p className="text-xs text-[#1C1410]/50 mb-1">
                  Avec {qf.toLocaleString("fr-FR")} € de quotient familial, vos
                  frais de scolarité s'élèvent à :
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="fraunces text-4xl text-[#C85A2A]">
                    {monthlyCost}
                  </span>
                  <span className="text-sm text-[#1C1410]/60 font-medium">
                    € / mois
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/40 leading-relaxed">
                Cette simulation est indicative. Le montant final est défini lors
                d'un entretien confidentiel avec la direction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
