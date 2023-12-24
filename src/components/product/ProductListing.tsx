import { useEffect, useState } from "react";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { Product } from "@/types/products";
import ImageSlider from "../ImageSlider";
import { ProductSliderSkeleton } from "../ProductSkeleton";
import { getPriceDataByLocale } from "@/helpers/general";
import { useRouter } from "next/router";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const { locale } = useRouter();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductSliderSkeleton />;

  const validUrls =
    product.images.gallery_images && product.images.gallery_images.length > 0
      ? product.images.gallery_images.map(({ image }) => image)
      : [product.images.featured_image];

  const priceData = getPriceDataByLocale(locale as locale, product.prices);

  const availabilityData =
    product.availability_new && product.availability_new?.length > 0
      ? {
          label: product.availability_new[0].slot.shipment_label,
          timeLabel: product.availability_new[0].slot.time_label as string,
        }
      : { label: "standard", timeLabel: "IN 1 - 2 DAYS" };

  if (isVisible && product) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group/main ", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/product/${product.id}`}
      >
        <div className="flex flex-col w-full border p-2 rounded-xl">
          <ImageSlider urls={validUrls} />

          <h3 className="mt-4 font-semibold text-sm text-gray-700 line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center gap-3 mt-1 line-clamp-1">
            <p className=" font-medium  text-red-600">
              {formatPrice(priceData?.price.offer_price || "")}
            </p>
            <p className=" font-medium text-sm text-blue-600 line-through">
              {formatPrice(priceData?.price.regular_price || "")}
            </p>
          </div>
          <div className="flex items-center gap-1.5 mt-1  line-clamp-1">
            {product.categories?.map((cat) => (
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  " text-xs py-0.5 h-7"
                )}
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="mt-2 flex lg:flex-row items-center justify-between flex-col lg:gap-0 gap-1">
            <div className="flex items-center gap-2 line-clamp-1">
              <Image
                loading="eager"
                src={`https://www.lifepharmacy.com/images/${availabilityData.label}-nr.svg`}
                alt="delivery-img"
                width={25}
                height={25}
              />
              <p className="text-xs ">{availabilityData.timeLabel}</p>
            </div>
            <Button size={"sm"} className="lg:w-fit w-full">
              <ShoppingCart className="w-4 h-4 me-2" /> ADD
            </Button>
          </div>
        </div>
      </Link>
    );
  }
};

export default ProductListing;
