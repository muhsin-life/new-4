import { Content } from "@/types/page";
import { PriceElement } from "@/types/products";

export const getCountryCodeFromLocale = (locale: locale) => {
  return locale.split("-")[0];
};

export const getPriceDataByLocale = (
  locale: locale,
  prices: PriceElement[]
) => {
  return prices.find(
    (price) => price.country_code === getCountryCodeFromLocale(locale)
  );
};

export const generatePagesStaticPaths = (contents: Content[]) => {
  return [
    ...new Set(
      contents
        .filter((page) =>
          ["dynamic_grid", "dynamic_slider_grid", "product_grid"].includes(
            page.section_type
          )
        )
        .flatMap(
          (content) =>
            content.section_data_array &&
            content.section_data_array?.map((section) =>
              section.type_key && section.type_key === "page"
                ? section.slug
                : ""
            )
        )
    ),
  ]
    .filter((slug) => !["", null].includes(slug))
    .map((path) => {
      return {
        params: {
          pages: path as string,
        },
      };
    });
};
