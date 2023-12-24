export interface ProductProps {
    success: boolean;
    message: string;
    data:    Data;
}

export interface Data {
    products:      Product[];
    total_count:   number;
    brands:        BrandElement[];
    filters:       Filters;
    seo:           SEO;
    model_details: ModelDetails;
}

export interface BrandElement {
    _id:                   string;
    id:                    string;
    name:                  string;
    name_ar:               null | string;
    description:           null | string;
    description_ar:        null;
    active:                boolean;
    images:                BrandImages;
    seo:                   SEO;
    updated_at:            Date;
    created_at:            Date;
    slug:                  string;
    visibility?:           number;
    brand_url?:            string;
    featured?:             boolean;
    short_description?:    null | string;
    short_description_ar?: null;
    parent_id?:            string;
    short_title?:          null;
    short_title_ar?:       null;
}

export interface BrandImages {
    logo:   null | string;
    banner: null | string;
}

export interface SEO {
    seo_title:          null | string;
    seo_description:    null | string;
    seo_title_ar:       null | string;
    seo_description_ar: null | string;
}

export interface Filters {
    collections: CollectionElement[];
    categories?: CollectionElement[];
    brands?: CollectionElement[];
}

export interface CollectionElement {
    _id:         string;
    id:          string;
    name:        string;
    images:      BrandImages;
    slug:        string;
    description: null;
}

export interface ModelDetails {
    short_description: null;
    description:       null;
}


export interface Product {
    _id:                  string;
    id:                   string;
    title:                string;
    inventory:            Inventory;
    is_taxable:           boolean;
    sku:                  string;
    active:               boolean;
    category:             any[] | CategoryClass | null;
    brand:                PurpleBrand;
    price:                string;
    description:          string;
    short_description:    string;
    images:               ProductImages;
    updated_at:           Date;
    created_at:           Date;
    categories:           BrandElement[] | null;
    ranking:              number;
    rankings:             number;
    slug:                 string;
    filter_price:         number;
    collections:          ProductCollection[];
    description_ar:       string;
    max_salable_qty:      null | string;
    options:              Option[];
    seo:                  SEO;
    short_description_ar: string;
    tags:                 null;
    title_ar:             string;
    collection?:          ProductCollection | null;
    out_of_stock:         boolean;
    sale_price:           number;
    tax_rate:             string;
    unit:                 string;
    unitprice:            number;
    vat_p:                number;
    is_express_disabled:  boolean;
    is_instant_disabled:  boolean;
    min_cart_value:       number;
    min_salable_qty:      number;
    availability:         Availability;
    ax_price_without_vat: null;
    popularity:           number;
    hide_from_search:     boolean;
    pre_order:            boolean;
    type:                 string;
    standard_only:        boolean;
    wh_type:              null | string;
    disable_intl?:        boolean;
    label:                null;
    offers:               Offers | null;
    prices:               PriceElement[];
    qty:                  number;
    availability_new?:     AvailabilityNew[];
    in_stock:             number;
    rating:               string;
    vat_percentage:       number;
    maximum_salable_qty:  number;
    search_offer:         null;
    product_url:          string;
    oos:                  boolean;
    weight?:              number;
}

export interface Availability {
    instant:  Express;
    express:  Express;
    standard: Express;
}

export interface Express {
    is_available: boolean;
    qty:          number;
    store_code:   null | string;
}

export interface AvailabilityNew {
    slot:       Slot;
    store_code: string;
    qty:        number;
}

export interface Slot {
    id:                number;
    geofence_id:       number;
    slot_meta_id:      number;
    active:            boolean;
    active_from:       null;
    active_till:       null;
    created_at:        null;
    updated_at:        Date;
    fees:              string;
    title:             string;
    subtitle:          string;
    label:             null | string;
    in_minutes:        number;
    selected:          null;
    unavailable_text:  null;
    created_by:        number;
    shipment_label:    string;
    surcharge:         string;
    min_cart_total:    string;
    time:              string;
    time_label:        string;
    self_pickup_label: string;
}

export interface PurpleBrand {
    _id:                   string;
    id:                    string;
    name:                  string;
    active:                boolean;
    updated_at:            Date;
    created_at:            Date;
    description:           null | string;
    description_ar:        null;
    images:                BrandImages;
    name_ar:               null;
    seo:                   SEO;
    slug:                  string;
    featured:              boolean;
    short_description?:    string;
    short_description_ar?: null;
    visibility?:           number;
    brand_url:             string;
}

export interface CategoryClass {
    _id:            string;
    id:             string;
    name:           string;
    active:         boolean;
    parent_id:      string;
    updated_at:     Date;
    created_at:     Date;
    description:    null;
    description_ar: null;
    images:         BrandImages;
    name_ar:        null;
    seo:            SEO;
}

export interface ProductCollection {
    _id?:         string;
    id:           string;
    name:         string;
    name_ar?:     null;
    active?:      boolean;
    images?:      BrandImages;
    seo?:         SEO;
    parent_id?:   null | string;
    updated_at?:  Date;
    created_at?:  Date;
    slug?:        string;
    type?:        null;
    description?: null;
}

export interface ProductImages {
    featured_image: string;
    other_images:   any[];
    gallery_images?: GalleryImage[];
}

export interface GalleryImage {
    image:     string;
    thumbnail: string;
    medium:    string;
    full:      string;
}

export interface Inventory {
    sku:      string;
    quantity: null;
    upc:      null | string;
}

export interface Offers {
    id:                   string;
    start_at:             Date;
    end_at:               Date;
    is_special:           string;
    test_text_do_not_use: string;
    exclude:              boolean;
    type:                 string;
    value:                number;
    offer_amount:         string;
    deleted_at:           null;
}

export interface Option {
    key:   string;
    value: string;
    order: number;
}

export interface PriceElement {
    country_code: CountryCode;
    currency:     Currency;
    price:        PricePrice;
}

export enum CountryCode {
    AE = "ae",
    Om = "om",
    Sa = "sa",
}

export enum Currency {
    Aed = "AED",
    OMR = "OMR",
    Sar = "SAR",
}

export interface PricePrice {
    offer_price:   number;
    regular_price: number;
    member_price:  number;
}
