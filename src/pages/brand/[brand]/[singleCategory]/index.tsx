import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductListingPage } from "@/components/ProductPageListing";
import { useBrandProductListing } from "@/components/hooks/useData";
import getBrandProductListing from "@/helpers/api/getBrandProductListing";
import { BrandProListingProps } from "@/types/brand-product-listing";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import React, { useState } from "react";

interface PageProps {
  brand: string;
  singleCategory: string;
  filterQueryString: string;
}

export default function BrandCategoryProductsListing({
  brand,
  singleCategory,
  filterQueryString,
}: PageProps) {
  const router = useRouter();

  const [query, setQuery] = useState(filterQueryString);

  const { data, refetch } = useBrandProductListing(
    brand,
    singleCategory,
    query,
    router.locale as locale
  );

  const brandProData = data?.data;

  return (
    <div>
      <MaxWidthWrapper>
        <div className="flex flex-col">
          <ProductListingPage
            pageType="brand"
            pageName={"Brand"}
            data={{
              products: brandProData?.products,
              categories: brandProData?.categories,
              breadCrumbs: {
                segments: [
                  {
                    title: "Home",
                    href: "/",
                  },
                  {
                    title: "Brands",
                    href: "/brands",
                  },
                  {
                    title: brandProData?.brand_details.name || "Brand",
                    href: `/brands/${brandProData?.brand_details.slug}`,
                  },
                  {
                    title: brandProData?.brand_details.name || "Brand",
                    href: `/brands/${brandProData?.brand_details.slug}`,
                  },
                ],
              },
              imageBannerUrl: brandProData?.brand_details.images.banner,
              description: brandProData?.brand_details.short_description,
              heading: brandProData?.brand_details.name,
            }}
            queryProps={{ query, setQuery }}
            refetch={refetch}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
  locale,
}) => {
  const queryClient = new QueryClient();

  const brandParams = params?.brand as string;
  const singleCategoryParams = params?.singleCategory as string;

  const { brand, singleCategory, ...rest } = query;

  await queryClient.fetchQuery({
    queryKey: ["get-brand-product-listing", brandParams, singleCategoryParams],
    queryFn: async () => {
      const data = await getBrandProductListing({
        brand: brandParams,
        filters: stringify({ category_slug: singleCategoryParams, ...rest }),
        locale: locale as locale,
      });
      return data as BrandProListingProps;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      brand: brandParams,
      singleCategory: singleCategoryParams,
      filterQueryString: stringify({ ...rest }),
    },
  };
};
