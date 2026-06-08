"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { publicFetch } from "@/lib/api";

type TeamMember = {
  name: string;
  role: string;
  comite: string;
  quote: string;
  photoUrl: string;
};
type SiteConfig = { team: TeamMember[] };

const FALLBACK: TeamMember[] = [
  {
    name: "Alice de Kergorlay",
    role: "Directrice",
    comite: "Directrice pédagogique",
    quote:
      "Chaque enfant a sa clé. Notre mission est de la trouver avec lui. C'est ça la Boussole.",
    photoUrl: "",
  },
  {
    name: "Membre de l'équipe",
    role: "Secrétaire",
    comite: "Comité immobilier · Locaux & infrastructure",
    quote:
      "Un espace pensé pour vivre et apprendre, pas seulement pour s'asseoir.",
    photoUrl: "",
  },
  {
    name: "Membre de l'équipe",
    role: "Chargée de communication",
    comite: "Comité communication · Levée de fonds & comm.",
    quote:
      "Faire connaître La Boussole à toutes les familles de l'Anjou. Les aider à s'orienter.",
    photoUrl: "",
  },
  {
    name: "Membre de l'équipe",
    role: "Directeur d'établissement",
    comite: "Comité social & RH · Vie associative",
    quote:
      "Une structure humaine et bienveillante, pour les élèves comme pour l'équipe.",
    photoUrl: "",
  },
];

const BG_COLORS = [
  "bg-[#C8B09A]",
  "bg-[#1E3A2F]/20",
  "bg-[#C85A2A]/15",
  "bg-[#F5F0E8]",
];

export default function EquipeSection() {
  const [team, setTeam] = useState<TeamMember[]>(FALLBACK);

  useEffect(() => {
    publicFetch<SiteConfig>("/site-config")
      .then((data) => {
        if (data.team?.length) setTeam(data.team);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-[#F5F0E8] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C85A2A] mb-4">
            Des profils variés pour vous accompagner
          </p>
          <h2 className="fraunces text-4xl md:text-5xl">
            Découvrez qui se cache{" "}
            <em className="text-[#C85A2A]">derrière La Boussole</em>
          </h2>
          <p className="mt-4 text-base text-[#1C1410]/60 max-w-2xl mx-auto leading-relaxed">
            Une équipe pluridisciplinaire réunie autour d'une conviction :
            chaque enfant peut trouver sa voie d'apprentissage.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {team.map((member, idx) => (
            <div
              key={member.name + member.role + idx}
              className="bg-white border border-[#1C1410]/8 rounded-2xl overflow-hidden flex flex-col"
            >
              <div
                className={`relative h-48 ${!member.photoUrl ? BG_COLORS[idx % BG_COLORS.length] : ""}`}
              >
                {member.photoUrl && (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#C85A2A]">
                    {member.role}
                  </p>
                  <h3 className="font-semibold text-sm text-[#1C1410] mt-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#1C1410]/50 mt-0.5">
                    {member.comite}
                  </p>
                </div>

                <blockquote className="mt-auto border-t border-[#1C1410]/8 pt-3">
                  <p className="text-xs text-[#1C1410]/60 leading-relaxed italic">
                    « {member.quote} »
                  </p>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
