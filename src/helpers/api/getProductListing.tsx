import axios from "axios";

interface ProductListingProps {
  locale: locale;
  filters: string;
}

export default async function getProductListing({
  locale,
  filters,
}: ProductListingProps) {
  const api = `https://${
    process.env.NEXT_PUBLIC_API_ENDPOINT
  }/api/web/products?${`${filters}&`}type=cols&skip=$0&take=40&channel=web&new_method=true&lang=${locale}`;

  const { data } = await axios.get(api);

  return data;
}
