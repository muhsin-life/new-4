import { PricePrice } from "./products";

export interface SearchSuggestionProps {
    results: SearchResult[];
}

export interface SearchResult {
    hits: Hit[];
    nbHits: number;
    page: number;
    nbPages: number;
    hitsPerPage: number;
    exhaustiveNbHits: boolean;
    exhaustiveTypo: boolean;
    exhaustive: Exhaustive;
    query: string;
    params: string;
    index: string;
    renderingContent: RenderingContent;
    extensions: Extensions;
    processingTimeMS: number;
    processingTimingsMS: ProcessingTimingsMS;
    serverTimeMS: number;
}

export interface Exhaustive {
    nbHits: boolean;
    typo: boolean;
}

export interface Extensions {
    queryCategorization: RenderingContent;
}

export interface RenderingContent {
}

export interface Hit {
    _id?: string;
    id?: string;
    title?: string;
    inventory?: HitInventory;
    is_taxable?: boolean;
    sku?: number;
    active?: boolean;
    category?: any[] | CategoryCategory | null;
    brand?: HitBrand | null;
    price?: number;
    description?: null | string;
    short_description?: null | string;
    images?: HitImages;
    updated_at?: number;
    created_at?: number;
    categories?: HitCategoryClass[];
    collection?: Collection | null;
    collections?: Collection[];
    description_ar?: null | string;
    options?: Option[];
    seo?: BrandSEO;
    short_description_ar?: null | string;
    tags?: null;
    title_ar?: string;
    ranking?: number;
    rankings?: number;
    slug?: string;
    filter_price?: number;
    out_of_stock?: boolean;
    is_express_disabled?: boolean;
    is_instant_disabled?: boolean;
    max_salable_qty?: number | null;
    sale_price?: number;
    tax_rate?: string;
    unit?: string;
    unitprice?: number;
    vat_p?: number;
    min_cart_value?: number;
    min_salable_qty?: number;
    availability?: Availability;
    ax_price_without_vat?: null;
    popularity?: number;
    pre_order?: boolean;
    type?: string;
    hide_from_search?: boolean;
    standard_only?: boolean;
    wh_type?: null | string;
    disable_intl?: boolean;
    label?: Label | null;
    offers?: null;
    prices: PriceElement[];
    rating?: number;
    vat_percentage?: number;
    maximum_salable_qty?: number;
    search_offer?: SearchOffer | null;
    product_url?: string;
    oos?: boolean;
    _tags?: string[];
    objectID: string;
    _highlightResult: HighlightResult;
    markup_price?: null;
    nb_words?: number;
    products?: Products;
    query?: string;
    name?: string;
    name_ar?: null | string;
    featured?: boolean;
    visibility?: number;
    brand_url?: string;
    parent_id?: string;
    short_title?: null;
    short_title_ar?: null;
}

export interface HighlightResult {
    title?: ID;
    inventory?: HighlightResultInventory;
    brand?: HighlightResultBrand;
    description?: ID;
    short_description?: ID;
    categories?: HighlightResultCategory[];
    description_ar?: ID;
    title_ar?: ID;
    query?: ID;
    _id?: ID;
    id?: ID;
    name?: ID;
    updated_at?: ID;
    created_at?: ID;
    images?: HighlightResultImages;
    seo?: HighlightResultSEO;
    slug?: ID;
    visibility?: ID;
    brand_url?: ID;
    _tags?: ID[];
    parent_id?: ID;
    name_ar?: ID;
}

export interface ID {
    value: string;
    matchLevel: MatchLevel;
    matchedWords: any[];
}

export enum MatchLevel {
    None = "none",
}

export interface HighlightResultBrand {
    name: ID;
    description: ID;
}

export interface HighlightResultCategory {
    name: ID;
    description?: ID;
    name_ar: ID;
}

export interface HighlightResultImages {
    logo: ID | null;
    banner?: ID | null;
}

export interface HighlightResultInventory {
    sku: ID;
}

export interface HighlightResultSEO {
    seo_title: ID;
    seo_description: ID;
}

export interface Availability {
    instant: Express;
    express: Express;
    standard: Express;
}

export interface Express {
    is_available: boolean;
    qty: number;
    store_code: null | string;
}

export interface HitBrand {
    _id: string;
    id: string;
    name: string;
    active: boolean;
    updated_at: Date;
    created_at: Date;
    description: string;
    description_ar: null;
    images: BrandImages;
    name_ar: null;
    seo: BrandSEO;
    slug: string;
    featured: boolean;
    short_description: string;
    short_description_ar: null;
    brand_url: string;
    visibility?: number;
}

export interface BrandImages {
    logo: string;
    banner: null | string;
}

export interface BrandSEO {
    seo_title: null | string;
    seo_description: null | string;
    seo_title_ar: null | string;
    seo_description_ar: null | string;
}

export interface HitCategoryClass {
    _id: string;
    id: string;
    name: string;
    active: boolean;
    parent_id: string;
    updated_at: Date;
    created_at: Date;
    description: null | string;
    description_ar: null;
    images: BrandImages;
    name_ar: string;
    seo: BrandSEO;
    slug: string;
    short_description?: string;
    short_description_ar?: null;
    short_title?: null;
    short_title_ar?: null;
}

export interface CategoryCategory {
    _id: string;
    id: string;
    name: string;
    active: boolean;
    parent_id: string;
    updated_at: Date;
    created_at: Date;
    description: null;
    description_ar: null;
    images: BrandImages;
    name_ar: null;
    seo: BrandSEO;
}

export interface Collection {
    _id: string;
    id: string;
    name: string;
    name_ar: null;
    active: boolean;
    images: HighlightResultImages;
    seo: BrandSEO;
    parent_id: null | string;
    updated_at: Date;
    created_at: Date;
    slug?: string;
    type?: null;
    description?: null;
}

export interface HitImages {
    featured_image?: string;
    other_images?: any[];
    gallery_images?: GalleryImage[];
    logo?: string;
    banner?: null | string;
}

export interface GalleryImage {
    image: string;
    thumbnail: string;
    medium: string;
    full: string;
}

export interface HitInventory {
    sku: string;
    quantity: null;
    upc: null | string;
}

export interface Label {
    _id: string;
    id: string;
    label_text: string;
    sub_label_text: null;
    icon_type: string;
    color_code: string;
    active: boolean;
    visibility: null;
    seo: BrandSEO;
    updated_at: Date;
    created_at: Date;
}

export interface Option {
    key: string;
    value: string;
    order: number;
}

export interface PriceElement {
    country_code: CountryCode;
    currency: Currency;
    price: PricePrice;
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



export interface Products {
    exact_nb_hits: number;
    facets: Facets;
}

export interface Facets {
    exact_matches: RenderingContent;
    analytics: RenderingContent;
}

export interface SearchOffer {
    type: string;
    label: string;
    prices: PriceElement[];
}

export interface ProcessingTimingsMS {
    _request: Request;
    afterFetch?: AfterFetch;
    extensions: number;
    extractDocsToPromote?: number;
    total: number;
}

export interface Request {
    roundTrip: number;
}

export interface AfterFetch {
    format: Format;
    total: number;
}

export interface Format {
    highlighting: number;
    total: number;
}
