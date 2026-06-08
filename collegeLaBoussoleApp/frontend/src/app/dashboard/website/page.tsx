"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import { apiFetch } from "@/lib/api";

type Photo = {
  _id?: string;
  url: string;
  alt: string;
  caption: string;
  category: string;
};

type Partner = {
  _id?: string;
  name: string;
  logoUrl: string;
  website: string;
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
  contact: { phone: string; email: string; fax: string; mapEmbedUrl: string };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
  photos: Photo[];
  partners: Partner[];
  openingHours: string;
};

const defaultConfig: SiteConfig = {
  name: "",
  tagline: "",
  address: { street: "", city: "", postalCode: "", country: "France" },
  contact: { phone: "", email: "", fax: "", mapEmbedUrl: "" },
  socialLinks: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  },
  photos: [],
  partners: [],
  openingHours: "",
};

const emptyPhoto: Photo = { url: "", alt: "", caption: "", category: "" };
const emptyPartner: Partner = { name: "", logoUrl: "", website: "" };

export default function WebsitePage() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [photoModal, setPhotoModal] = useState(false);
  const [photoForm, setPhotoForm] = useState<Photo>(emptyPhoto);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  const [partnerModal, setPartnerModal] = useState(false);
  const [partnerForm, setPartnerForm] = useState<Partner>(emptyPartner);
  const [partnerIndex, setPartnerIndex] = useState<number | null>(null);

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

  // Photos
  function openAddPhoto() {
    setPhotoForm(emptyPhoto);
    setPhotoIndex(null);
    setPhotoModal(true);
  }

  function openEditPhoto(i: number) {
    setPhotoForm({ ...config.photos[i] });
    setPhotoIndex(i);
    setPhotoModal(true);
  }

  function savePhoto() {
    const updated = [...config.photos];
    if (photoIndex !== null) {
      updated[photoIndex] = photoForm;
    } else {
      updated.push(photoForm);
    }
    set("photos", updated);
    setPhotoModal(false);
  }

  function removePhoto(i: number) {
    set(
      "photos",
      config.photos.filter((_, idx) => idx !== i),
    );
  }

  // Partners
  function openAddPartner() {
    setPartnerForm(emptyPartner);
    setPartnerIndex(null);
    setPartnerModal(true);
  }

  function openEditPartner(i: number) {
    setPartnerForm({ ...config.partners[i] });
    setPartnerIndex(i);
    setPartnerModal(true);
  }

  function savePartner() {
    const updated = [...config.partners];
    if (partnerIndex !== null) {
      updated[partnerIndex] = partnerForm;
    } else {
      updated.push(partnerForm);
    }
    set("partners", updated);
    setPartnerModal(false);
  }

  function removePartner(i: number) {
    set(
      "partners",
      config.partners.filter((_, idx) => idx !== i),
    );
  }

  return (
    <>
      <SiteHeader title="Site web">
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-sm text-green-600">Enregistré ✓</span>
          )}
          {error && <span className="text-sm text-red-600">{error}</span>}
          <Button onClick={save} disabled={saving}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
        </div>
      </SiteHeader>

      <main className="flex-1 p-4">
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="address">Adresse</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="partners">Partenaires</TabsTrigger>
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
              </FieldGroup>
            </div>
          </TabsContent>

          {/* ── Réseaux sociaux ── */}
          <TabsContent value="social">
            <div className="max-w-xl">
              <FieldGroup>
                {(
                  [
                    ["facebook", "Facebook"],
                    ["instagram", "Instagram"],
                    ["twitter", "X (Twitter)"],
                    ["linkedin", "LinkedIn"],
                    ["youtube", "YouTube"],
                  ] as const
                ).map(([key, label]) => (
                  <Field key={key}>
                    <FieldLabel htmlFor={`social-${key}`}>{label}</FieldLabel>
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

          {/* ── Photos ── */}
          <TabsContent value="photos">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                {config.photos.length} photo(s)
              </p>
              <Button onClick={openAddPhoto}>+ Ajouter une photo</Button>
            </div>

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
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openEditPhoto(i)}
                      className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => removePhoto(i)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── Partenaires ── */}
          <TabsContent value="partners">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                {config.partners.length} partenaire(s)
              </p>
              <Button onClick={openAddPartner}>+ Ajouter un partenaire</Button>
            </div>

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
                  {config.partners.map((partner, i) => (
                    <tr
                      key={i}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                        {partner.name}
                      </td>
                      <td className="px-4 py-3 text-zinc-500">
                        {partner.website ? (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-zinc-900 dark:hover:text-white"
                          >
                            {partner.website}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {partner.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={partner.logoUrl}
                            alt={partner.name}
                            className="h-8 w-auto object-contain"
                          />
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditPartner(i)}
                            className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => removePartner(i)}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Modal photo */}
      <Modal
        open={photoModal}
        onClose={() => setPhotoModal(false)}
        title={photoIndex !== null ? "Modifier la photo" : "Ajouter une photo"}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="ph-url">URL de l'image</FieldLabel>
            <Input
              id="ph-url"
              type="url"
              value={photoForm.url}
              onChange={(e) =>
                setPhotoForm({ ...photoForm, url: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="ph-alt">Titre / texte alternatif</FieldLabel>
            <Input
              id="ph-alt"
              value={photoForm.alt}
              onChange={(e) =>
                setPhotoForm({ ...photoForm, alt: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="ph-caption">Légende</FieldLabel>
            <Input
              id="ph-caption"
              value={photoForm.caption}
              onChange={(e) =>
                setPhotoForm({ ...photoForm, caption: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="ph-cat">Catégorie</FieldLabel>
            <Input
              id="ph-cat"
              value={photoForm.category}
              onChange={(e) =>
                setPhotoForm({ ...photoForm, category: e.target.value })
              }
              placeholder="Ex : accueil, galerie, équipe…"
            />
          </Field>
          <Button onClick={savePhoto}>
            {photoIndex !== null ? "Enregistrer" : "Ajouter"}
          </Button>
        </FieldGroup>
      </Modal>

      {/* Modal partenaire */}
      <Modal
        open={partnerModal}
        onClose={() => setPartnerModal(false)}
        title={
          partnerIndex !== null
            ? "Modifier le partenaire"
            : "Ajouter un partenaire"
        }
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="pt-name">Nom</FieldLabel>
            <Input
              id="pt-name"
              value={partnerForm.name}
              onChange={(e) =>
                setPartnerForm({ ...partnerForm, name: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="pt-logo">URL du logo</FieldLabel>
            <Input
              id="pt-logo"
              type="url"
              value={partnerForm.logoUrl}
              onChange={(e) =>
                setPartnerForm({ ...partnerForm, logoUrl: e.target.value })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="pt-web">Site web</FieldLabel>
            <Input
              id="pt-web"
              type="url"
              value={partnerForm.website}
              onChange={(e) =>
                setPartnerForm({ ...partnerForm, website: e.target.value })
              }
              placeholder="https://…"
            />
          </Field>
          <Button onClick={savePartner}>
            {partnerIndex !== null ? "Enregistrer" : "Ajouter"}
          </Button>
        </FieldGroup>
      </Modal>
    </>
  );
}
