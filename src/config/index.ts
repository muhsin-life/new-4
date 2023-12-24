import { Icons } from "@/components/Icons";

export const NAVBAR_ITEMS = [
  {
    label: "Arabic",
    value: "current_lang" as const,
    icon: Icons.aeFlag,
  },
  {
    label: "Log in",
    value: "account" as const,
    icon: Icons.account,
  },
  {
    label: "Wishlist",
    value: "wishlist" as const,
    icon: Icons.wishlist,
  },
  {
    label: "Cart",
    value: "cart" as const,
    icon: Icons.cart,
  },
];

export const CATGEORY_ITEMS = ["BRANDS", "OFFERS", "HEALTH PACKAGES"];

export const SORT_BY_ITEMS = [
  { id: 1, slug: "popularity", label: "Most Popular" },
  { id: 2, slug: "most-rated", label: "Most Rated" },
  { id: 3, slug: "price-asc", label: "Price: Low to High" },
  { id: 4, slug: "price-desc", label: "Price: High to Low" },
];

export const LIST_VIEW_TYPES = [
  { id: 1, slug: "list", label: "View by row" },
  { id: 2, slug: "cols", label: "View by cols" },
];


export const FALLBACK_SETTINGS = {
  desktop: {
    row: 1,
    column: 1,
  },
  mobile: {
    row: 1,
    column: 1,
  },
  autoplay: false,
  background_color:"white"
};
