import { Content } from "@/types/page";
import Link from "next/link";
import { useProducts } from "./hooks/useData";
import { Product } from "@/types/products";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ArrowLeft, ArrowRight, ArrowRightIcon } from "lucide-react";
import ProductListing from "./product/ProductListing";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ProductSliderSkeleton } from "./ProductSkeleton";

interface ProductGridProps {
  contentData: Content;
  supportedDeviceTypes: SupportedDeviceType[] | null;
}

export const ProductGrid = ({
  contentData,
  supportedDeviceTypes,
}: ProductGridProps) => {
  const sectionTitle = contentData.section_title;
  const showSectionTitle = contentData?.settings?.show_section_title ?? true;
  const slug = contentData.section_data_object?.slug;
  const type_key = contentData.section_data_object?.type_key;
  const type_value = contentData.section_data_object?.type_value;

  const generatePath = () => {
    switch (type_key) {
      case "page":
        return `/${slug}`;
      case "category":
        return `/products?categories=${slug}`;
      case "collection":
        return `/products?collections=${slug}`;
      case "brand":
        return `/products?brands=${slug}`;
      case "link":
        return type_value ?? "#";
      case "product":
        return `/product/${slug}`;
      case "clinic-appointment-screen":
        return "/medical-centre";
      default:
        return "#";
    }
  };

  const getSlugFromTypeKey = () => {
    switch (type_key) {
      case "collection":
        return "collections";
      case "category":
        return "categories";
      case "brand":
        return "brands";
    }
  };

  const { data, isLoading } = useProducts(
    getSlugFromTypeKey() as string,
    slug as string
  );

  const productsData = data?.data.products;

  let map: (Product | null)[] = [];
  if (productsData && productsData.length) {
    map = productsData;
  }

  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === map.length,
  });

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-9 w-9 z-10 place-items-center rounded-full border-2 bg-primary border-zinc-300 text-white";
  const inactiveStyles = "hidden ";

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex + 6);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex + 6 === map.length,
      });
    });
  }, [swiper, map.length]);

  const getResponsiveStyleOptions = () => {
    if (supportedDeviceTypes === null || supportedDeviceTypes.length === 2) {
      return "block";
    } else if (supportedDeviceTypes.includes("mobile")) {
      return "sm:hidden block";
    } else if (supportedDeviceTypes.includes("desktop")) {
      return " block";
    }
  };

  return (
    <section
      className={cn(
        " relative overflow-hidden w-full py-5",
        getResponsiveStyleOptions()
      )}
    >
      <MaxWidthWrapper>
        {showSectionTitle ? (
          <div className="flex items-center gap-4 w-full">
            <div className=" flex-1 space-y-1">
              <h2 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
                {sectionTitle}
              </h2>
              <p className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Explore all the Products
              </p>
            </div>

            <Link
              href={generatePath()}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "hidden sm:flex",
                })
              )}
            >
              View all products
              <ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </MaxWidthWrapper>
      {isLoading ? (
        <MaxWidthWrapper className="flex gap-3 overflow-x-auto mt-6">
          {Array(6).fill(<ProductSliderSkeleton />)}
        </MaxWidthWrapper>
      ) : (
        <div className="relative max-w-[1500px] mx-auto">
          <div className="transition">
            <button
              onClick={(e) => {
                e.preventDefault();
                swiper?.slideNext();
              }}
              className={cn(activeStyles, "right-1 transition", {
                [inactiveStyles]: slideConfig.isEnd,
                "hover:bg-primary-300 text-white opacity-100":
                  !slideConfig.isEnd,
              })}
              aria-label="next image"
            >
              <ArrowRight className="h-5 w-5 " />{" "}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                swiper?.slidePrev();
              }}
              className={cn(activeStyles, "left-1 transition", {
                [inactiveStyles]: slideConfig.isBeginning,
                "hover:bg-primary-300 text-white  opacity-100":
                  !slideConfig.isBeginning,
              })}
              aria-label="previous image"
            >
              <ArrowLeft className="h-5 w-5 " />{" "}
            </button>
          </div>
          <MaxWidthWrapper>
            <div className="mt-6 flex items-center w-full">
              <Swiper
                pagination={{
                  dynamicBullets: true,
                  renderBullet: (_, className) => {
                    return `<span class="rounded-full transition ${className}"></span>`;
                  },
                }}
                onSwiper={(swiper) => setSwiper(swiper)}
                modules={[Pagination]}
                className="h-full w-full"
                slidesPerView={2.1}
                breakpoints={{
                  991: {
                    slidesPerView: 6,
                  },
                  767: {
                    slidesPerView: 4,
                  },
                  575: {
                    slidesPerView: 3.5,
                  },
                  400: {
                    slidesPerView: 3,
                    spaceBetween: 4,
                  },
                }}
                spaceBetween={20}
              >
                {" "}
                {map.map((product, i) => (
                  <SwiperSlide
                    key={product?._id}
                    className="-z-10 relative h-full w-full"
                  >
                    <ProductListing
                      key={`product-${i}`}
                      product={product}
                      index={i}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </MaxWidthWrapper>
        </div>
      )}
    </section>
  );
};
