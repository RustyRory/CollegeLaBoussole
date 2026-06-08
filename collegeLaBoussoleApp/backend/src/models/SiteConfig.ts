import mongoose, { Document, Schema } from "mongoose";

export interface ISiteConfig extends Document {
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
  photos: Array<{
    url: string;
    alt: string;
    caption: string;
    category: string;
  }>;
  partners: Array<{
    name: string;
    logoUrl: string;
    website: string;
  }>;
  team: Array<{
    name: string;
    role: string;
    comite: string;
    quote: string;
    photoUrl: string;
  }>;
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
  donationTiers: Array<{
    amount: string;
    label: string;
    description: string;
    populaire: boolean;
    variant: string;
  }>;
  donChiffres: Array<{
    number: string;
    label: string;
  }>;
  audienceCards: Array<{
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    imageUrl: string;
    theme: string;
  }>;
  openingHours: string;
}

const SiteConfigSchema = new Schema<ISiteConfig>(
  {
    name: { type: String, default: "Collège La Boussole" },
    tagline: { type: String, default: "" },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "France" },
    },
    contact: {
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      fax: { type: String, default: "" },
      mapEmbedUrl: { type: String, default: "" },
      availability: { type: String, default: "" },
      responseTime: { type: String, default: "" },
    },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    helloAssoUrl: { type: String, default: "" },
    etablissementImageUrl: { type: String, default: "" },
    pedagogieImageUrl: { type: String, default: "" },
    photos: [
      {
        url: { type: String, default: "" },
        alt: { type: String, default: "" },
        caption: { type: String, default: "" },
        category: { type: String, default: "" },
      },
    ],
    partners: [
      {
        name: { type: String, default: "" },
        logoUrl: { type: String, default: "" },
        website: { type: String, default: "" },
      },
    ],
    team: [
      {
        name: { type: String, default: "" },
        role: { type: String, default: "" },
        comite: { type: String, default: "" },
        quote: { type: String, default: "" },
        photoUrl: { type: String, default: "" },
      },
    ],
    faqItems: [
      {
        question: { type: String, default: "" },
        answer: { type: String, default: "" },
      },
    ],
    donationTiers: [
      {
        amount: { type: String, default: "" },
        label: { type: String, default: "" },
        description: { type: String, default: "" },
        populaire: { type: Boolean, default: false },
        variant: { type: String, default: "light" },
      },
    ],
    donChiffres: [
      {
        number: { type: String, default: "" },
        label: { type: String, default: "" },
      },
    ],
    audienceCards: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        ctaLabel: { type: String, default: "" },
        ctaHref: { type: String, default: "" },
        imageUrl: { type: String, default: "" },
        theme: { type: String, default: "light" },
      },
    ],
    openingHours: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model<ISiteConfig>("SiteConfig", SiteConfigSchema);
