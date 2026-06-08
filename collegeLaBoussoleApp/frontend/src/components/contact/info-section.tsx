"use client";

import { useEffect, useState } from "react";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { publicFetch } from "@/lib/api";

type SiteConfig = {
  address: { street: string; city: string; postalCode: string };
  contact: {
    phone: string;
    email: string;
    availability: string;
    responseTime: string;
  };
};

export default function InfoSection() {
  const [data, setData] = useState<SiteConfig | null>(null);

  useEffect(() => {
    publicFetch<SiteConfig>("/site-config")
      .then(setData)
      .catch(() => {});
  }, []);

  const address = data?.address;
  const contact = data?.contact;

  const INFO = [
    {
      icon: MapPin,
      label: "Adresse",
      lines:
        address?.city || address?.street
          ? [
              [address.city, address.postalCode].filter(Boolean).join(" "),
              address.street,
            ].filter(Boolean)
          : ["Angers (49)", "01 rue de la Boussole - Belle-Beille"],
    },
    {
      icon: Mail,
      label: "Email",
      lines: [contact?.email || "contact@laboussole-college.fr"],
    },
    {
      icon: Phone,
      label: "Téléphone",
      lines: [contact?.phone || "06 99 78 70 25"],
    },
    {
      icon: Clock,
      label: "Disponibilités",
      lines: [
        contact?.availability || "Lun – Ven : 9h – 18h",
        contact?.responseTime || "Réponse sous 48 h ouvrées",
      ].filter(Boolean),
    },
  ];

  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1C1410]/50 mb-6">
          Retrouvez-nous ici
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {INFO.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-white border border-[#1C1410]/8 rounded-2xl p-5 flex flex-col gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#F5F0E8] text-[#C85A2A] flex items-center justify-center shrink-0">
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1C1410]/40 uppercase tracking-wide mb-1">
                    {item.label}
                  </p>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-sm text-[#1C1410] leading-snug">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
