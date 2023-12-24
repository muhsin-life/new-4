export interface PageProps {
  success: boolean;
  message: string;
  data: PageData;
}

export interface PageData {
  _id: string;
  content: Content[];
  type: string;
  id: string;
  slug: string;
  status: boolean;
  platform: null;
  title: string;
  version: number;
  updated_at: Date;
  created_at: Date;
  seo: any[];
  variants: Variants;
  dark_header: boolean;
  index: boolean;
  status_label: string;
}

export interface Content {
  section_type: SectionType;
  section_title: string;
  order_id: number;
  is_enabled: boolean;
  settings: Settings | null;
  min_version: number;
  is_section_visible: boolean;
  filters: Filters | null;
  section_data_object: SectionDataObject | null;
  section_data_array: SectionDataArray[] | null;
}

export interface Filters {
  category: string;
}

export interface SectionDataArray {
  id: string;
  title: string;
  type_key: SectionDataArrayTypeKey | null;
  type_value: null | string;
  is_parent_or_child: null;
  lower_price_limit: null;
  max_price_limit?: null;
  start_at: null | string;
  end_at: null;
  content?: null;
  is_enabled: boolean;
  is_tracking_enabled?: null;
  personalized_feed_data?: SectionDataArrayPersonalizedFeedDatum[] | null;
  same_window?: boolean;
  slug: null | string;
  mobile: SectionDataArrayDesktop;
  desktop: SectionDataArrayDesktop;
  max_price_imit?: null;
}

export interface SectionDataArrayDesktop {
  image_url: null | string;
  height: number | null;
  width: number | null;
  is_enabled: boolean;
}

export interface SectionDataArrayPersonalizedFeedDatum {
  type_key: PersonalizedFeedDatumTypeKey | null;
  type_value: null | string;
  title?: string;
  image?: string;
}



export enum PersonalizedFeedDatumTypeKey {
  Page = "page",
  RecentlyPurchased = "recently-purchased",
  RecentlyViewedCategory1 = "recently-viewed-category-1",
  RecentlyViewedCategory2 = "recently-viewed-category-2",
  RecentlyViewedProduct1 = "recently-viewed-product-1",
}

export enum SectionDataArrayTypeKey {
  Brand = "brand",
  Category = "category",
  ClinicAppointmentScreen = "clinic-appointment-screen",
  Collection = "collection",
  Link = "link",
  Page = "page",
  Product = "product",
  Screen = "screen",
  TestBookingScreen = "test-booking-screen",
}

export interface SectionDataObject {
  id: string;
  title?: string;
  type_key?: SectionDataArrayTypeKey;
  type_value?: string;
  is_parent_or_child?: null;
  lower_price_limit?: null;
  max_price_limit?: null;
  start_at?: null;
  end_at?: null;
  content?: null;
  is_enabled?: boolean;
  is_tracking_enabled?: null;
  personalized_feed_data?: SectionDataObjectPersonalizedFeedDatum[] | null;
  same_window?: boolean;
  slug?: string;
  mobile?: SectionDataArrayDesktop;
  desktop?: SectionDataArrayDesktop;
  max_price_imit?: null;
}

export interface SectionDataObjectPersonalizedFeedDatum {
  type_key: null;
  type_value: null;
}

export enum SectionType {
  Blog = "blog",
  DynamicGrid = "dynamic_grid",
  DynamicSliderGrid = "dynamic_slider_grid",
  Gap = "gap",
  PersonalizedSlider = "personalized_slider",
  ProductGrid = "product_grid",
}

export interface Settings {
  background_color: string;
  hide_in_desktop_web?: boolean;
  hide_in_mobile_web?: boolean;
  full_width?: boolean;
  background_type?: BackgroundType;
  background_value?: string;
  hide_in_app?: boolean;
  start_at?: string | null;
  end_at?: null;
  mobile: SettingsDesktop;
  desktop: SettingsDesktop;
  product_grid_style: ProductGridStyle | null;
  show_section_title?: boolean;
  navigation?: boolean;
  autoplay?: boolean;
  show_pagination?: boolean;
  title_position?: string;
}

export enum BackgroundType {
  Color = "color",
}

export interface SettingsDesktop {
  row: number | null;
  column: number | null;
  height: number | null;
  width: number | null;
}

export enum ProductGridStyle {
  The1RowScroll = "1-row-scroll",
  The3ColNoScroll = "3-col-no-scroll",
}

export interface Variants {
  "sa-en": Sa;
  "sa-ar": Sa;
}

export interface Sa {
  enabled: boolean;
  source: string;
  page_id: string;
}
