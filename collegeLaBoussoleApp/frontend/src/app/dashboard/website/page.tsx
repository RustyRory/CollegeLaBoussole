"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import { apiFetch } from "@/lib/api";
import { ImageUpload } from "@/components/ui/image-upload";

// ── Types ─────────────────────────────────────────────────────────────────────

type Photo = {
  _id?: string;
  url: string;
  alt: string;
  caption: string;
  category: string;
};
type Partner = { _id?: string; name: string; logoUrl: string; website: string };
type TeamMember = {
  _id?: string;
  name: string;
  role: string;
  comite: string;
  quote: string;
  photoUrl: string;
};
type FaqItem = { _id?: string; question: string; answer: string };
type DonationTier = {
  _id?: string;
  amount: string;
  label: string;
  description: string;
  populaire: boolean;
  variant: string;
};
type DonChiffre = { _id?: string; number: string; label: string };
type AudienceCard = {
  _id?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  theme: string;
};

type SiteConfig = {
  name: string;
  tagline: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    fax: string;
    mapEmbedUrl: string;
    availability: string;
    responseTime: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
  helloAssoUrl: string;
  etablissementImageUrl: string;
  pedagogieImageUrl: string;
  photos: Photo[];
  partners: Partner[];
  team: TeamMember[];
  faqItems: FaqItem[];
  donationTiers: DonationTier[];
  donChiffres: DonChiffre[];
  audienceCards: AudienceCard[];
  openingHours: string;
};

// ── Defaults ──────────────────────────────────────────────────────────────────

const defaultConfig: SiteConfig = {
  name: "",
  tagline: "",
  openingHours: "",
  helloAssoUrl: "",
  etablissementImageUrl: "",
  pedagogieImageUrl: "",
  address: { street: "", city: "", postalCode: "", country: "France" },
  contact: {
    phone: "",
    email: "",
    fax: "",
    mapEmbedUrl: "",
    availability: "",
    responseTime: "",
  },
  socialLinks: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  },
  photos: [],
  partners: [],
  team: [],
  faqItems: [],
  donationTiers: [],
  donChiffres: [],
  audienceCards: [],
};

const emptyPhoto: Photo = { url: "", alt: "", caption: "", category: "" };
const emptyPartner: Partner = { name: "", logoUrl: "", website: "" };
const emptyTeam: TeamMember = {
  name: "",
  role: "",
  comite: "",
  quote: "",
  photoUrl: "",
};
const emptyFaq: FaqItem = { question: "", answer: "" };
const emptyTier: DonationTier = {
  amount: "",
  label: "don unique",
  description: "",
  populaire: false,
  variant: "light",
};
const emptyChiffre: DonChiffre = { number: "", label: "" };
const emptyCard: AudienceCard = {
  title: "",
  description: "",
  ctaLabel: "En savoir plus →",
  ctaHref: "",
  imageUrl: "",
  theme: "light",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WebsitePage() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [modal, setModal] = useState<
    null | "photo" | "partner" | "team" | "faq" | "tier" | "chiffre" | "card"
  >(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [photoForm, setPhotoForm] = useState<Photo>(emptyPhoto);
  const [partnerForm, setPartnerForm] = useState<Partner>(emptyPartner);
  const [teamForm, setTeamForm] = useState<TeamMember>(emptyTeam);
  const [faqForm, setFaqForm] = useState<FaqItem>(emptyFaq);
  const [tierForm, setTierForm] = useState<DonationTier>(emptyTier);
  const [chiffreForm, setChiffreForm] = useState<DonChiffre>(emptyChiffre);
  const [cardForm, setCardForm] = useState<AudienceCard>(emptyCard);

  useEffect(() => {
    apiFetch<SiteConfig>("/site-config").then((data) => {
      setConfig({ ...defaultConfig, ...data });
    });
  }, []);

  function set<K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function setNested<K extends keyof SiteConfig>(
    section: K,
    field: string,
    value: string,
  ) {
    setConfig((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as object), [field]: value },
    }));
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      await apiFetch("/site-config", { method: "PUT", body: config });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  // ── Generic list helpers ────────────────────────────────────────────────────

  function openAdd(
    type: typeof modal,
    emptyVal: object,
    setter: (v: never) => void,
  ) {
    setter(emptyVal as never);
    setEditIndex(null);
    setModal(type);
  }

  function openEdit<T>(
    type: typeof modal,
    index: number,
    item: T,
    setter: (v: T) => void,
  ) {
    setter({ ...item });
    setEditIndex(index);
    setModal(type);
  }

  function saveItem<T>(key: keyof SiteConfig, form: T) {
    const list = [...(config[key] as T[])];
    if (editIndex !== null) list[editIndex] = form;
    else list.push(form);
    set(key, list as SiteConfig[typeof key]);
    setModal(null);
  }

  function removeItem<T>(key: keyof SiteConfig, index: number) {
    set(
      key,
      (config[key] as T[]).filter(
        (_, i) => i !== index,
      ) as SiteConfig[typeof key],
    );
  }

  // ── Render helpers ──────────────────────────────────────────────────────────

  const SaveBar = () => (
    <div className="flex items-center gap-2">
      {saved && <span className="text-sm text-green-600">Enregistré ✓</span>}
      {error && <span className="text-sm text-red-600">{error}</span>}
      <Button onClick={save} disabled={saving}>
        {saving ? "Enregistrement…" : "Enregistrer"}
      </Button>
    </div>
  );

  return (
    <>
      <SiteHeader title="Site web">
        <SaveBar />
      </SiteHeader>

      <main className="flex-1 p-4">
        <Tabs defaultValue="general">
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="address">Adresse</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="team">Équipe</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="don">Dons</TabsTrigger>
            <TabsTrigger value="partners">Partenaires</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>

          {/* ── Général ── */}
          <TabsContent value="general">
            <div className="max-w-xl">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="site-name">Nom du collège</FieldLabel>
                  <Input
                    id="site-name"
                    value={config.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="site-tagline">
                    Slogan / description courte
                  </FieldLabel>
                  <Input
                    id="site-tagline"
                    value={config.tagline}
                    onChange={(e) => set("tagline", e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="site-hours">
                    Horaires d'ouverture
                  </FieldLabel>
                  <Input
                    id="site-hours"
                    value={config.openingHours}
                    onChange={(e) => set("openingHours", e.target.value)}
                    placeholder="Ex : Lun–Ven 8h–17h"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="hello-asso">
                    Lien HelloAsso (dons)
                  </FieldLabel>
                  <Input
                    id="hello-asso"
                    type="url"
                    value={config.helloAssoUrl}
                    onChange={(e) => set("helloAssoUrl", e.target.value)}
                    placeholder="https://www.helloasso.com/…"
                  />
                </Field>
                <ImageUpload
                  label="Photo — section Établissement (accueil)"
                  value={config.etablissementImageUrl}
                  onChange={(url) => set("etablissementImageUrl", url)}
                  aspectClass="aspect-[4/5] max-w-xs"
                />
                <ImageUpload
                  label="Photo — section Pédagogie (accueil)"
                  value={config.pedagogieImageUrl}
                  onChange={(url) => set("pedagogieImageUrl", url)}
                  aspectClass="aspect-[3/4] max-w-xs"
                />
              </FieldGroup>
            </div>
          </TabsContent>

          {/* ── Adresse ── */}
          <TabsContent value="address">
            <div className="max-w-xl">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="addr-street">Rue / voie</FieldLabel>
                  <Input
                    id="addr-street"
                    value={config.address.street}
                    onChange={(e) =>
                      setNested("address", "street", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="addr-city">Ville</FieldLabel>
                  <Input
                    id="addr-city"
                    value={config.address.city}
                    onChange={(e) =>
                      setNested("address", "city", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="addr-postal">Code postal</FieldLabel>
                  <Input
                    id="addr-postal"
                    value={config.address.postalCode}
                    onChange={(e) =>
                      setNested("address", "postalCode", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="addr-country">Pays</FieldLabel>
                  <Input
                    id="addr-country"
                    value={config.address.country}
                    onChange={(e) =>
                      setNested("address", "country", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="addr-map">
                    URL d'embed Google Maps
                  </FieldLabel>
                  <Input
                    id="addr-map"
                    value={config.contact.mapEmbedUrl}
                    onChange={(e) =>
                      setNested("contact", "mapEmbedUrl", e.target.value)
                    }
                    placeholder="https://maps.google.com/…"
                  />
                </Field>
              </FieldGroup>
            </div>
          </TabsContent>

          {/* ── Contact ── */}
          <TabsContent value="contact">
            <div className="max-w-xl">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="ct-phone">Téléphone</FieldLabel>
                  <Input
                    id="ct-phone"
                    type="tel"
                    value={config.contact.phone}
                    onChange={(e) =>
                      setNested("contact", "phone", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="ct-email">Email de contact</FieldLabel>
                  <Input
                    id="ct-email"
                    type="email"
                    value={config.contact.email}
                    onChange={(e) =>
                      setNested("contact", "email", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="ct-fax">Fax</FieldLabel>
                  <Input
                    id="ct-fax"
                    value={config.contact.fax}
                    onChange={(e) =>
                      setNested("contact", "fax", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="ct-availability">
                    Disponibilités
                  </FieldLabel>
                  <Input
                    id="ct-availability"
                    value={config.contact.availability}
                    onChange={(e) =>
                      setNested("contact", "availability", e.target.value)
                    }
                    placeholder="Ex : Lun – Ven : 9h – 18h"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="ct-response">
                    Délai de réponse
                  </FieldLabel>
                  <Input
                    id="ct-response"
                    value={config.contact.responseTime}
                    onChange={(e) =>
                      setNested("contact", "responseTime", e.target.value)
                    }
                    placeholder="Ex : Réponse sous 48 h ouvrées"
                  />
                </Field>
              </FieldGroup>
            </div>
          </TabsContent>

          {/* ── Réseaux sociaux ── */}
          <TabsContent value="social">
            <div className="max-w-xl">
              <FieldGroup>
                {(
                  [
                    "facebook",
                    "instagram",
                    "twitter",
                    "linkedin",
                    "youtube",
                  ] as const
                ).map((key) => (
                  <Field key={key}>
                    <FieldLabel htmlFor={`social-${key}`}>
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace("twitter", "X (Twitter)")}
                    </FieldLabel>
                    <Input
                      id={`social-${key}`}
                      type="url"
                      value={config.socialLinks[key]}
                      onChange={(e) =>
                        setNested("socialLinks", key, e.target.value)
                      }
                      placeholder={`https://${key}.com/…`}
                    />
                  </Field>
                ))}
              </FieldGroup>
            </div>
          </TabsContent>

          {/* ── Audience ── */}
          <TabsContent value="audience">
            <ListSection
              label="cards audience"
              count={config.audienceCards.length}
              onAdd={() => openAdd("card", emptyCard, setCardForm)}
            >
              {config.audienceCards.map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-zinc-900 dark:text-white truncate">
                        {card.title || "(sans titre)"}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5 truncate">
                        {card.description}
                      </p>
                      <div className="mt-1 flex gap-2 text-xs text-zinc-400">
                        <span className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                          {card.theme}
                        </span>
                        <span>{card.ctaHref}</span>
                      </div>
                    </div>
                    <RowActions
                      onEdit={() => openEdit("card", i, card, setCardForm)}
                      onRemove={() => removeItem("audienceCards", i)}
                    />
                  </div>
                </div>
              ))}
            </ListSection>
          </TabsContent>

          {/* ── Équipe ── */}
          <TabsContent value="team">
            <ListSection
              label="membres"
              count={config.team.length}
              onAdd={() => openAdd("team", emptyTeam, setTeamForm)}
            >
              {config.team.map((member, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <div className="flex items-start gap-3">
                    {member.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="h-12 w-12 rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-zinc-900 dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-xs text-[#C85A2A] font-medium mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5 truncate">
                        {member.comite}
                      </p>
                    </div>
                    <RowActions
                      onEdit={() => openEdit("team", i, member, setTeamForm)}
                      onRemove={() => removeItem("team", i)}
                    />
                  </div>
                </div>
              ))}
            </ListSection>
          </TabsContent>

          {/* ── FAQ ── */}
          <TabsContent value="faq">
            <ListSection
              label="questions"
              count={config.faqItems.length}
              onAdd={() => openAdd("faq", emptyFaq, setFaqForm)}
            >
              {config.faqItems.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-zinc-900 dark:text-white">
                        {item.question}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                        {item.answer}
                      </p>
                    </div>
                    <RowActions
                      onEdit={() => openEdit("faq", i, item, setFaqForm)}
                      onRemove={() => removeItem("faqItems", i)}
                    />
                  </div>
                </div>
              ))}
            </ListSection>
          </TabsContent>

          {/* ── Dons ── */}
          <TabsContent value="don">
            <div className="space-y-8">
              {/* Paliers */}
              <ListSection
                label="paliers"
                count={config.donationTiers.length}
                onAdd={() => openAdd("tier", emptyTier, setTierForm)}
                title="Paliers de don"
              >
                {config.donationTiers.map((tier, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm text-zinc-900 dark:text-white">
                          {tier.amount}{" "}
                          <span className="text-zinc-400 font-normal">
                            — {tier.label}
                          </span>
                          {tier.populaire && (
                            <span className="ml-2 text-xs bg-[#C85A2A] text-white px-2 py-0.5 rounded-full">
                              Populaire
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">
                          {tier.description}
                        </p>
                      </div>
                      <RowActions
                        onEdit={() => openEdit("tier", i, tier, setTierForm)}
                        onRemove={() => removeItem("donationTiers", i)}
                      />
                    </div>
                  </div>
                ))}
              </ListSection>

              {/* Chiffres clés */}
              <ListSection
                label="chiffres"
                count={config.donChiffres.length}
                onAdd={() => openAdd("chiffre", emptyChiffre, setChiffreForm)}
                title="Chiffres clés (section impact)"
              >
                {config.donChiffres.map((c, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-sm text-zinc-900 dark:text-white">
                        <span className="text-[#C85A2A] font-bold">
                          {c.number}
                        </span>
                        <span className="text-zinc-500 ml-2">{c.label}</span>
                      </p>
                      <RowActions
                        onEdit={() => openEdit("chiffre", i, c, setChiffreForm)}
                        onRemove={() => removeItem("donChiffres", i)}
                      />
                    </div>
                  </div>
                ))}
              </ListSection>
            </div>
          </TabsContent>

          {/* ── Partenaires ── */}
          <TabsContent value="partners">
            <ListSection
              label="partenaires"
              count={config.partners.length}
              onAdd={() => openAdd("partner", emptyPartner, setPartnerForm)}
            >
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                <table className="w-full text-sm">
                  <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-zinc-500">
                        Nom
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-zinc-500">
                        Site web
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-zinc-500">
                        Logo
                      </th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {config.partners.map((p, i) => (
                      <tr
                        key={i}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      >
                        <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                          {p.name}
                        </td>
                        <td className="px-4 py-3 text-zinc-500">
                          {p.website ? (
                            <a
                              href={p.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-zinc-900 dark:hover:text-white"
                            >
                              {p.website}
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {p.logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.logoUrl}
                              alt={p.name}
                              className="h-8 w-auto object-contain"
                            />
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <RowActions
                            onEdit={() =>
                              openEdit("partner", i, p, setPartnerForm)
                            }
                            onRemove={() => removeItem("partners", i)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ListSection>
          </TabsContent>

          {/* ── Photos ── */}
          <TabsContent value="photos">
            <ListSection
              label="photos"
              count={config.photos.length}
              onAdd={() => openAdd("photo", emptyPhoto, setPhotoForm)}
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {config.photos.map((photo, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
                  >
                    {photo.url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className="mb-3 h-32 w-full rounded-lg object-cover"
                      />
                    )}
                    <p className="mb-1 text-sm font-medium text-zinc-900 dark:text-white">
                      {photo.alt || "(sans titre)"}
                    </p>
                    {photo.caption && (
                      <p className="mb-1 text-xs text-zinc-500">
                        {photo.caption}
                      </p>
                    )}
                    {photo.category && (
                      <span className="inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {photo.category}
                      </span>
                    )}
                    <div className="mt-3">
                      <RowActions
                        onEdit={() => openEdit("photo", i, photo, setPhotoForm)}
                        onRemove={() => removeItem("photos", i)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ListSection>
          </TabsContent>
        </Tabs>
      </main>

      {/* ── Modals ── */}

      <Modal
        open={modal === "photo"}
        onClose={() => setModal(null)}
        title={editIndex !== null ? "Modifier la photo" : "Ajouter une photo"}
      >
        <FieldGroup>
          <ImageUpload
            label="Image"
            value={photoForm.url}
            onChange={(url) => setPhotoForm({ ...photoForm, url })}
            aspectClass="aspect-video"
          />
          <Field>
            <FieldLabel>Titre / texte alternatif</FieldLabel>
            <Input
              value={photoForm.alt}
              onChange={(e) =>
                setPhotoForm({ ...photoForm, alt: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel>Légende</FieldLabel>
            <Input
              value={photoForm.caption}
              onChange={(e) =>
                setPhotoForm({ ...photoForm, caption: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel>Catégorie</FieldLabel>
            <Input
              value={photoForm.category}
              onChange={(e) =>
                setPhotoForm({ ...photoForm, category: e.target.value })
              }
              placeholder="accueil, galerie, équipe…"
            />
          </Field>
          <Button onClick={() => saveItem("photos", photoForm)}>
            {editIndex !== null ? "Enregistrer" : "Ajouter"}
          </Button>
        </FieldGroup>
      </Modal>

      <Modal
        open={modal === "partner"}
        onClose={() => setModal(null)}
        title={
          editIndex !== null
            ? "Modifier le partenaire"
            : "Ajouter un partenaire"
        }
      >
        <FieldGroup>
          <Field>
            <FieldLabel>Nom</FieldLabel>
            <Input
              value={partnerForm.name}
              onChange={(e) =>
                setPartnerForm({ ...partnerForm, name: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel>URL du logo</FieldLabel>
            <Input
              type="url"
              value={partnerForm.logoUrl}
              onChange={(e) =>
                setPartnerForm({ ...partnerForm, logoUrl: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel>Site web</FieldLabel>
            <Input
              type="url"
              value={partnerForm.website}
              onChange={(e) =>
                setPartnerForm({ ...partnerForm, website: e.target.value })
              }
              placeholder="https://…"
            />
          </Field>
          <Button onClick={() => saveItem("partners", partnerForm)}>
            {editIndex !== null ? "Enregistrer" : "Ajouter"}
          </Button>
        </FieldGroup>
      </Modal>

      <Modal
        open={modal === "team"}
        onClose={() => setModal(null)}
        title={editIndex !== null ? "Modifier le membre" : "Ajouter un membre"}
        className="max-w-lg"
      >
        <FieldGroup>
          <Field>
            <FieldLabel>Nom</FieldLabel>
            <Input
              value={teamForm.name}
              onChange={(e) =>
                setTeamForm({ ...teamForm, name: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel>Rôle / titre</FieldLabel>
            <Input
              value={teamForm.role}
              onChange={(e) =>
                setTeamForm({ ...teamForm, role: e.target.value })
              }
              placeholder="Directrice, Secrétaire…"
            />
          </Field>
          <Field>
            <FieldLabel>Comité / mission</FieldLabel>
            <Input
              value={teamForm.comite}
              onChange={(e) =>
                setTeamForm({ ...teamForm, comite: e.target.value })
              }
              placeholder="Comité pédagogique · Enseignement"
            />
          </Field>
          <Field>
            <FieldLabel>Citation</FieldLabel>
            <Input
              value={teamForm.quote}
              onChange={(e) =>
                setTeamForm({ ...teamForm, quote: e.target.value })
              }
            />
          </Field>
          <ImageUpload
            label="Photo du membre"
            value={teamForm.photoUrl}
            onChange={(url) => setTeamForm({ ...teamForm, photoUrl: url })}
            aspectClass="aspect-square max-w-[180px]"
          />
          <Button onClick={() => saveItem("team", teamForm)}>
            {editIndex !== null ? "Enregistrer" : "Ajouter"}
          </Button>
        </FieldGroup>
      </Modal>

      <Modal
        open={modal === "faq"}
        onClose={() => setModal(null)}
        title={
          editIndex !== null ? "Modifier la question" : "Ajouter une question"
        }
        className="max-w-lg"
      >
        <FieldGroup>
          <Field>
            <FieldLabel>Question</FieldLabel>
            <Input
              value={faqForm.question}
              onChange={(e) =>
                setFaqForm({ ...faqForm, question: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel>Réponse</FieldLabel>
            <textarea
              value={faqForm.answer}
              onChange={(e) =>
                setFaqForm({ ...faqForm, answer: e.target.value })
              }
              rows={5}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
            />
          </Field>
          <Button onClick={() => saveItem("faqItems", faqForm)}>
            {editIndex !== null ? "Enregistrer" : "Ajouter"}
          </Button>
        </FieldGroup>
      </Modal>

      <Modal
        open={modal === "tier"}
        onClose={() => setModal(null)}
        title={editIndex !== null ? "Modifier le palier" : "Ajouter un palier"}
        className="max-w-lg"
      >
        <FieldGroup>
          <Field>
            <FieldLabel>Montant</FieldLabel>
            <Input
              value={tierForm.amount}
              onChange={(e) =>
                setTierForm({ ...tierForm, amount: e.target.value })
              }
              placeholder="250 €"
            />
          </Field>
          <Field>
            <FieldLabel>Label</FieldLabel>
            <Input
              value={tierForm.label}
              onChange={(e) =>
                setTierForm({ ...tierForm, label: e.target.value })
              }
              placeholder="don unique"
            />
          </Field>
          <Field>
            <FieldLabel>Description</FieldLabel>
            <textarea
              value={tierForm.description}
              onChange={(e) =>
                setTierForm({ ...tierForm, description: e.target.value })
              }
              rows={3}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
            />
          </Field>
          <Field>
            <FieldLabel>Style</FieldLabel>
            <select
              value={tierForm.variant}
              onChange={(e) =>
                setTierForm({ ...tierForm, variant: e.target.value })
              }
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
            >
              <option value="light">Clair (blanc)</option>
              <option value="dark">Sombre (vert)</option>
              <option value="accent">Accent (orange)</option>
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={tierForm.populaire}
              onChange={(e) =>
                setTierForm({ ...tierForm, populaire: e.target.checked })
              }
            />
            Marquer comme populaire
          </label>
          <Button onClick={() => saveItem("donationTiers", tierForm)}>
            {editIndex !== null ? "Enregistrer" : "Ajouter"}
          </Button>
        </FieldGroup>
      </Modal>

      <Modal
        open={modal === "chiffre"}
        onClose={() => setModal(null)}
        title={
          editIndex !== null ? "Modifier le chiffre" : "Ajouter un chiffre"
        }
      >
        <FieldGroup>
          <Field>
            <FieldLabel>Chiffre / valeur</FieldLabel>
            <Input
              value={chiffreForm.number}
              onChange={(e) =>
                setChiffreForm({ ...chiffreForm, number: e.target.value })
              }
              placeholder="66 %, 150+, 2027…"
            />
          </Field>
          <Field>
            <FieldLabel>Label</FieldLabel>
            <Input
              value={chiffreForm.label}
              onChange={(e) =>
                setChiffreForm({ ...chiffreForm, label: e.target.value })
              }
              placeholder="De réduction d'impôt"
            />
          </Field>
          <Button onClick={() => saveItem("donChiffres", chiffreForm)}>
            {editIndex !== null ? "Enregistrer" : "Ajouter"}
          </Button>
        </FieldGroup>
      </Modal>

      <Modal
        open={modal === "card"}
        onClose={() => setModal(null)}
        title={
          editIndex !== null
            ? "Modifier la carte"
            : "Ajouter une carte audience"
        }
        className="max-w-lg"
      >
        <FieldGroup>
          <Field>
            <FieldLabel>Titre</FieldLabel>
            <Input
              value={cardForm.title}
              onChange={(e) =>
                setCardForm({ ...cardForm, title: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel>Description</FieldLabel>
            <textarea
              value={cardForm.description}
              onChange={(e) =>
                setCardForm({ ...cardForm, description: e.target.value })
              }
              rows={3}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
            />
          </Field>
          <Field>
            <FieldLabel>Texte du lien</FieldLabel>
            <Input
              value={cardForm.ctaLabel}
              onChange={(e) =>
                setCardForm({ ...cardForm, ctaLabel: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel>URL du lien</FieldLabel>
            <Input
              value={cardForm.ctaHref}
              onChange={(e) =>
                setCardForm({ ...cardForm, ctaHref: e.target.value })
              }
              placeholder="/college"
            />
          </Field>
          <ImageUpload
            label="Image de la carte"
            value={cardForm.imageUrl}
            onChange={(url) => setCardForm({ ...cardForm, imageUrl: url })}
            aspectClass="aspect-[4/3]"
          />
          <Field>
            <FieldLabel>Thème</FieldLabel>
            <select
              value={cardForm.theme}
              onChange={(e) =>
                setCardForm({ ...cardForm, theme: e.target.value })
              }
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
            >
              <option value="light">Clair (blanc)</option>
              <option value="dark">Sombre (vert)</option>
            </select>
          </Field>
          <Button onClick={() => saveItem("audienceCards", cardForm)}>
            {editIndex !== null ? "Enregistrer" : "Ajouter"}
          </Button>
        </FieldGroup>
      </Modal>
    </>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ListSection({
  title,
  label,
  count,
  onAdd,
  children,
}: {
  title?: string;
  label: string;
  count: number;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      {title && (
        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
          {title}
        </h3>
      )}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          {count} {label}
        </p>
        <Button onClick={onAdd}>+ Ajouter</Button>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function RowActions({
  onEdit,
  onRemove,
}: {
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <button
        onClick={onEdit}
        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
      >
        Modifier
      </button>
      <button
        onClick={onRemove}
        className="text-xs text-red-500 hover:text-red-700"
      >
        Supprimer
      </button>
    </div>
  );
}
