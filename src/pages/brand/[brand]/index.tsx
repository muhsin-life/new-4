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
  filterQueryString: string;
}

export default function BrandProductsListing({
  brand,
  filterQueryString,
}: PageProps) {
  const router = useRouter();

  const [query, setQuery] = useState(filterQueryString);

  const { data, refetch } = useBrandProductListing(
    brand,
    "",
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
                    href: "#",
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

  const { brand, ...rest } = query;

  await queryClient.fetchQuery({
    queryKey: ["get-brand-product-listing", brandParams, ""],
    queryFn: async () => {
      const data = await getBrandProductListing({
        brand: brandParams,
        filters: stringify({ ...rest }),
        locale: locale as locale,
      });
      return data as BrandProListingProps;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      brand: brandParams,
      filterQueryString: stringify({ ...rest }),
    },
  };
};
