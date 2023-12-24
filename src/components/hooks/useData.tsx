import getBrandProductListing from "@/helpers/api/getBrandProductListing";
import getPageData from "@/helpers/api/getHomepageData";
import getProductListing from "@/helpers/api/getProductListing";
import getProducts from "@/helpers/api/getProductsData";
import { BrandProListingProps } from "@/types/brand-product-listing";
import { BrandsProps } from "@/types/brands";
import { CategoryProps } from "@/types/categories";
import { PageProps } from "@/types/page";
import { ProductProps } from "@/types/products";
import { SearchSuggestionProps } from "@/types/searchSuggestions";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";

export const useProducts = (type_key: string, slug: string) => {
  const { locale } = useRouter();

  return useQuery({
    queryKey: ["get-products", slug],
    queryFn: async () =>
      (await getProducts(type_key, slug, locale as locale)) as ProductProps,
  });
};

export const useCategories = () => {
  const { locale } = useRouter();
  return useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://prodapp.lifepharmacy.com/api/web/categories?lang=${locale}`
      );

      return data as CategoryProps;
    },
  });
};

export const useBrands = () => {
  const { locale } = useRouter();
  return useQuery({
    queryKey: ["get-brands"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://prodapp.lifepharmacy.com/api/web/brands?lang=${locale}`
      );

      return data as BrandsProps;
    },
    enabled: false,
  });
};

export const useSearchSuggestion = (query: string) => {
  const { locale } = useRouter();
  return useQuery({
    queryKey: [`get-search-suggestions`, query],
    queryFn: async () => {
      const headers = {
        "X-Algolia-API-Key": "c54c5f0fc2e6bd0c3b97cfa5b3580705",
        "X-Algolia-Application-Id": "WHCXS2GWOG",
        "Content-Type": "application/json",
      };

      const requestBody = {
        requests: [
          {
            indexName: "products",
            params: `query=${query}`,
            hitsPerPage: 8,
          },
          {
            indexName: "products_query_suggestions",
            params: `query=${query}`,
          },

          {
            indexName: "brands",
            params: `query=${query}`,
            hitsPerPage: 10,
          },
          {
            indexName: "categories",
            params: `query=${query}`,
            hitsPerPage: 6,
          },
        ],
        strategy: "none",
      };

      var requestOptions: AxiosRequestConfig = {
        method: "POST",
        headers,
      };

      const { data } = await axios.post(
        `https://WHCXS2GWOG-dsn.algolia.net/1/indexes/*/queries?lang=${locale}`,
        JSON.stringify(requestBody),
        requestOptions
      );

      return data as SearchSuggestionProps;
    },
    staleTime: 1000,
    enabled: false,
  });
};

export const getPagesData = (locale: locale, pageName: string) => {
  return useQuery({
    queryKey: ["get-page-data", locale, pageName],
    queryFn: async () => {
      const data = await getPageData(locale, pageName);
      return data as PageProps;
    },
  });
};

export const useBrandProductListing = (
  brand: string,
  singleCategory: string,
  filters: string,
  locale: locale
) => {
  return useQuery({
    queryKey: ["get-brand-product-listing", brand, singleCategory],
    queryFn: async () => {
      const data = await getBrandProductListing({ brand, locale, filters });
      return data as BrandProListingProps;
    },
  });
};

export const useProductListing = (filters: string, locale: locale) => {
  return useQuery({
    queryKey: ["get-product-listing", filters],
    queryFn: async () => {
      const data = await getProductListing({ locale, filters });
      return data as ProductProps
    },
  });
};
