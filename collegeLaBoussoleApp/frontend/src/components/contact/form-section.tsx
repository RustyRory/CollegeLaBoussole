"use client";

import { useState } from "react";

const CONTACTS = [
  "Direction",
  "Équipe pédagogique",
  "Service des inscriptions",
  "Association",
];

const SUBJECTS = [
  "Inscription d'un élève",
  "Don ou mécénat",
  "Partenariat",
  "Question générale",
  "Autre",
];

type FormState = {
  prenom: string;
  nom: string;
  email: string;
  contact: string;
  sujet: string;
  message: string;
  rgpd: boolean;
  noMarketing: boolean;
};

const INITIAL: FormState = {
  prenom: "",
  nom: "",
  email: "",
  contact: "",
  sujet: "",
  message: "",
  rgpd: false,
  noMarketing: false,
};

export default function FormSection() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  function set(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#1C1410]/15 bg-[#F5F0E8]/50 px-4 py-3 text-sm text-[#1C1410] placeholder:text-[#1C1410]/30 outline-none focus:border-[#1C1410]/40 focus:ring-0 transition-colors";

  const selectClass =
    "w-full rounded-xl border border-[#1C1410]/15 bg-[#F5F0E8]/50 px-4 py-3 text-sm text-[#1C1410] outline-none focus:border-[#1C1410]/40 transition-colors appearance-none cursor-pointer";

  return (
    <section className="px-6 pb-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#1C1410]/8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="fraunces text-3xl md:text-4xl leading-tight">
              Envoyez-nous <em className="text-[#C85A2A]">un message</em>
            </h2>
            <p className="mt-2 text-sm text-[#1C1410]/50 leading-relaxed">
              Nous lisons chaque message et vous répondons personnellement sous
              48 h.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Prénom / Nom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1C1410]/60">
                  Prénom <span className="text-[#C85A2A]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Prénom"
                  required
                  value={form.prenom}
                  onChange={(e) => set("prenom", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1C1410]/60">
                  Nom <span className="text-[#C85A2A]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nom"
                  required
                  value={form.nom}
                  onChange={(e) => set("nom", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1C1410]/60">
                Email <span className="text-[#C85A2A]">*</span>
              </label>
              <input
                type="email"
                placeholder="contact@exemple.fr"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Selects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1C1410]/60">
                  Qui souhaitez-vous contacter ?{" "}
                  <span className="text-[#C85A2A]">*</span>
                </label>
                <select
                  required
                  value={form.contact}
                  onChange={(e) => set("contact", e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Sélectionnez
                  </option>
                  {CONTACTS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1C1410]/60">
                  Comment vous aider ? <span className="text-[#C85A2A]">*</span>
                </label>
                <select
                  required
                  value={form.sujet}
                  onChange={(e) => set("sujet", e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Sélectionnez
                  </option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1C1410]/60">
                Votre message ?
              </label>
              <textarea
                rows={5}
                placeholder="Exprimez plus en détails vos questions et ou besoins ici…"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.rgpd}
                  onChange={(e) => set("rgpd", e.target.checked)}
                  className="mt-0.5 shrink-0 accent-[#C85A2A]"
                />
                <span className="text-xs text-[#1C1410]/50 leading-relaxed">
                  En vous inscrivant, vous confirmez que vous acceptez le
                  traitement de vos données personnelles comme décrit dans notre{" "}
                  <a
                    href="/politique-confidentialite"
                    className="underline hover:text-[#C85A2A] transition-colors"
                  >
                    politique de confidentialité
                  </a>
                  .
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.noMarketing}
                  onChange={(e) => set("noMarketing", e.target.checked)}
                  className="mt-0.5 shrink-0 accent-[#C85A2A]"
                />
                <span className="text-xs text-[#1C1410]/50 leading-relaxed">
                  Je ne souhaite pas recevoir de communication marketing sur les
                  produits, services et actualités de La Boussole.
                </span>
              </label>
            </div>

            {/* Feedback */}
            {status === "success" && (
              <p className="rounded-xl bg-[#1E3A2F]/10 px-4 py-3 text-sm text-[#1E3A2F]">
                Votre message a bien été envoyé. Nous vous répondrons sous 48 h.
              </p>
            )}
            {status === "error" && (
              <p className="rounded-xl bg-[#C85A2A]/10 px-4 py-3 text-sm text-[#C85A2A]">
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-[#C85A2A] px-6 py-3.5 text-sm font-medium text-white hover:bg-[#B04E24] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading"
                ? "Envoi en cours…"
                : "→ Envoyer votre message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
