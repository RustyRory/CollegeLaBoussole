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
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
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
    },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
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
    openingHours: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model<ISiteConfig>("SiteConfig", SiteConfigSchema);
