import Link from "next/link";
import { Users, Heart } from "lucide-react";

export default function AudienceCards() {
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Famille */}
        <div className="rounded-2xl overflow-hidden bg-white border border-[#1C1410]/8 flex flex-col shadow-sm">
          <div className="aspect-[4/3] bg-[#C8B09A]" />
          <div className="p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C85A2A]/10 text-[#C85A2A] flex items-center justify-center shrink-0">
              <Users size={18} strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-lg text-[#1C1410]">
              Vous êtes une famille ?
            </h3>
            <p className="text-sm text-[#1C1410]/60 leading-relaxed">
              Découvrez comment rejoindre La Boussole si vous avez un enfant
              d'âge collégien et souhaitez une alternative au système classique.
            </p>
            <Link
              href="/college"
              className="text-sm font-medium text-[#C85A2A] hover:underline"
            >
              En savoir plus →
            </Link>
          </div>
        </div>

        {/* Donateur */}
        <div className="rounded-2xl overflow-hidden bg-[#1E3A2F] flex flex-col shadow-sm">
          <div className="aspect-[4/3] bg-[#2A4A3A]" />
          <div className="p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
              <Heart size={18} strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-lg text-white">
              Vous êtes un donateur ?
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Apprenez comment soutenir La Boussole à travers vos dons, en tant
              que particulier ou en tant qu'entreprise.
            </p>
            <Link
              href="/don"
              className="text-sm font-medium text-[#C85A2A] hover:underline"
            >
              En savoir plus →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
