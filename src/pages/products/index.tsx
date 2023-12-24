import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductListingPage } from "@/components/ProductPageListing";
import { useProductListing } from "@/components/hooks/useData";
import getProductListing from "@/helpers/api/getProductListing";
import { BrandProListingProps } from "@/types/brand-product-listing";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import React, { useState } from "react";

interface PageProps {
  filters: string;
}

export default function ProductsListing({ filters }: PageProps) {
  const router = useRouter();

  const {categories, brands, collections} = router.query

  const [query, setQuery] = useState(filters);

  const { data, refetch } = useProductListing(filters, locale as locale);

  // const getProductsType = () => {
  //   if(brands){
  //     return "brands"
  //   }
  //   else if(categories){
  //     return "categories"
  //   }
  // }
  const products = data?.data;

  const filterType = categories ? 'categories' : brands ? 'brands' : collections ? 'collections' : 'collections';

  return (
    <div>
      <MaxWidthWrapper>
        <div className="flex flex-col">
          <ProductListingPage
            pageType="products"
            pageName={"Products"}
            data={{
              products: products?.products,
              breadCrumbs: {
                segments: [
                  {
                    title: "Home",
                    href: "/",
                  },
                  {
                    title: "Products",
                    href: "/products",
                  },
                  //   {
                  //     title: brandProData?.brand_details.name || "Brand",
                  //     href: `/brands/${brandProData?.brand_details.slug}`,
                  //   },
                  //   {
                  //     title: brandProData?.brand_details.name || "Brand",
                  //     href: `/brands/${brandProData?.brand_details.slug}`,
                  //   },
                ],
              },
              imageBannerUrl: products?.filters[filterType][0].images.banner
              description: products?.filters?[filterType].short_description,
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
  query,
  locale,
}) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["get-product-listing", stringify({ ...query })],
    queryFn: async () => {
      const data = await getProductListing({
        filters: stringify({ ...query }),
        locale: locale as locale,
      });
      return data as BrandProListingProps;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      filters: stringify({ ...query }),
    },
  };
};
