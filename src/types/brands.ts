export interface BrandsProps {
    success: boolean;
    message: string;
    data:    BrandsData;
}

export interface BrandsData {
    brands: Brand[];
}

export interface Brand {
    _id:                  string;
    id:                   string;
    name:                 string;
    active:               boolean;
    updated_at:           Date;
    created_at:           Date;
    slug:                 string;
    description:          string;
    description_ar:       null;
    images:               BrandImages;
    name_ar:              null;
    seo:                  BrandSEO;
    featured:             boolean;
    short_description:    string;
    short_description_ar: null;
    visibility:           number;
    brand_url:            string;
}

export interface BrandImages {
    logo:   string;
    banner: null | string;
}

export interface BrandSEO {
    seo_title:          null | string;
    seo_description:    null | string;
    seo_title_ar:       null;
    seo_description_ar: null;
}
