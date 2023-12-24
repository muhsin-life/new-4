import axios from "axios";

interface brandProductListingProps {
  brand: string;
  locale: locale;
  filters: string;
}

export default async function getBrandProductListing({
  brand,
  locale,
  filters,
}: brandProductListingProps) {
  const apiUrl = `https://${
    process.env.NEXT_PUBLIC_API_ENDPOINT
  }/api/web/brands/details/${brand}?${
    filters + "&"
  }take=40&new_method=true&lang=${locale}`;

  console.log(apiUrl);
  

  const { data } = await axios.get(apiUrl);

  return data;
}
