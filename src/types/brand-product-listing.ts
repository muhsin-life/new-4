import { Category } from "./categories";
import { CountryCode, Currency, PricePrice, Product } from "./products";

export interface BrandProListingProps {
  success: boolean;
  message: string;
  data: BrandProListingData;
}

export interface BrandProListingData {
  brand_details: BrandProListingDetails;
  categories: Category[];
  products: Product[];
}

export interface BrandProListingDetails {
  _id: string;
  id: string;
  name: string;
  active: boolean;
  updated_at: Date;
  created_at: Date;
  slug: string;
  description: string;
  description_ar: null;
  images: BrandDetailsImages;
  name_ar: null;
  seo: SEO;
  featured: boolean;
  short_description: string;
  short_description_ar: null;
  visibility: number;
  brand_url: string;
}

export interface BrandDetailsImages {
  logo: null | string;
  banner: null | string;
}

export interface SEO {
  seo_title: null | string;
  seo_description: null | string;
  seo_title_ar: null | string;
  seo_description_ar: null | string;
}




export interface Availability {
  instant: Express;
  express: Express;
  standard: Express;
}

export interface Express {
  is_available: boolean;
  qty: number;
  store_code: string | null;
}

export interface Brand {
  _id: string;
  id: string;
  name: string;
  active: boolean;
  updated_at: Date;
  created_at: Date;
  slug: string;
  description: null | string;
  description_ar: null;
  images: BrandDetailsImages;
  name_ar: null;
  seo: SEO;
  featured: boolean;
  short_description?: string;
  short_description_ar?: null;
  brand_url?: string;
}

