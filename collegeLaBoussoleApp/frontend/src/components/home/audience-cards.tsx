"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Heart } from "lucide-react";
import { publicFetch } from "@/lib/api";

type Card = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  theme: string;
};
type SiteConfig = { audienceCards: Card[] };

const FALLBACK: Card[] = [
  {
    title: "Vous êtes une famille ?",
    description:
      "Découvrez comment rejoindre La Boussole si vous avez un enfant d'âge collégien et souhaitez une alternative au système classique.",
    ctaLabel: "En savoir plus →",
    ctaHref: "/college",
    imageUrl: "",
    theme: "light",
  },
  {
    title: "Vous êtes un donateur ?",
    description:
      "Apprenez comment soutenir La Boussole à travers vos dons, en tant que particulier ou en tant qu'entreprise.",
    ctaLabel: "En savoir plus →",
    ctaHref: "/don",
    imageUrl: "",
    theme: "dark",
  },
];

const ICONS = [Users, Heart];

export default function AudienceCards() {
  const [cards, setCards] = useState<Card[]>(FALLBACK);

  useEffect(() => {
    publicFetch<SiteConfig>("/site-config")
      .then((data) => {
        if (data.audienceCards?.length) setCards(data.audienceCards);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, idx) => {
          const isDark = card.theme === "dark";
          const Icon = ICONS[idx % ICONS.length];
          return (
            <div
              key={idx}
              className={`rounded-2xl overflow-hidden flex flex-col shadow-sm ${isDark ? "bg-[#1E3A2F]" : "bg-white border border-[#1C1410]/8"}`}
            >
              <div
                className={`relative aspect-[4/3] ${isDark ? "bg-[#2A4A3A]" : "bg-[#C8B09A]"}`}
              >
                {card.imageUrl && (
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDark ? "bg-white/10 text-white" : "bg-[#C85A2A]/10 text-[#C85A2A]"}`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <h3
                  className={`font-semibold text-lg ${isDark ? "text-white" : "text-[#1C1410]"}`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-[#1C1410]/60"}`}
                >
                  {card.description}
                </p>
                <Link
                  href={card.ctaHref}
                  className="text-sm font-medium text-[#C85A2A] hover:underline"
                >
                  {card.ctaLabel}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
