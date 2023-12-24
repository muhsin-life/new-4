export interface CategoryProps {
    success: boolean;
    message: string;
    data:    CategoryData;
}

export interface CategoryData {
    categories: Category[];
}

export interface Category {
    name:          string;
    id?:            string;
    images?:        CategoryImages;
    slug:          string;
    seo?:           SEO;
    children?:      Category[];
    product_count?: number;
    count?:number
}

export interface CategoryImages {
    logo:   null | string;
    banner: null | string;
}

export interface SEO {
    seo_title:          null | string;
    seo_description:    null | string;
    seo_title_ar:       null | string;
    seo_description_ar: null | string;
}
