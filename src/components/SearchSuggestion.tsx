import { SearchSuggestionProps } from "@/types/searchSuggestions";
import { Button } from "./ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPriceDataByLocale } from "@/helpers/general";
import { useRouter } from "next/router";

interface searchSuggestionProps {
  open: boolean;
  data?: SearchSuggestionProps;
  isLoading: boolean;
  close: () => void;
}

export const SearchSuggestion = ({
  open,
  data,
  isLoading,
  close,
}: searchSuggestionProps) => {
  const { locale } = useRouter();

  return open ? (
    <div
      className={cn(
        "absolute inset-x-0 top-full text-sm text-muted-foreground z-50",
        {
          "animate-in fade-in-10 slide-in-from-top-5": open,
        }
      )}
    >
      <div
        className="absolute inset-0 top-1/2 bg-white shadow rounded-b-xl"
        aria-hidden="true"
      />

      <div className="relative bg-white p-4 overflow-y-auto h-[calc(100vh-100px)]">
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h6 className=" font-medium text-primary text-base">
                Trending Searches
              </h6>
              <div className="flex items-center gap-2 line-clamp-1">
                {data?.results[1].hits.map((suggestion) => (
                  <Button
                    variant={"secondary"}
                    size={"sm"}
                    className="h-8 text-sm"
                  >
                    <TrendingUp className="h-5 w-5 me-2 text-slate-400" />
                    {suggestion.query}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h6 className=" font-medium text-primary text-base">
                Trending Categories
              </h6>
              <div className="grid grid-cols-2 items-center gap-2 ">
                {data?.results[3].hits.map((suggestion) => (
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className=" text-sm gap-5 justify-start flex h-16 p-3"
                  >
                    <Image
                      src={
                        suggestion.images?.logo ??
                        "/images/default-product-image.png"
                      }
                      height={40}
                      width={40}
                      alt={suggestion.name || "cat-image"}
                      className="rounded-full"
                    />
                    {suggestion.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h6 className=" font-medium text-primary text-base">
                Trending Brands
              </h6>
              <div className="flex gap-3 line-clamp-1 ">
                {data?.results[2].hits.map((suggestion) => (
                  <Link
                    href={`/brand/${suggestion.slug}`}
                    className=" bg-white flex-shrink-0 border border-muted rounded-xl hover:shadow transition mb-0.5"
                  >
                    <Image
                      src={
                        suggestion.images?.logo ??
                        "/images/default-product-image.png"
                      }
                      height={80}
                      width={80}
                      alt={suggestion.name || "cat-image"}
                      className="rounded-xl"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h6 className=" font-medium text-primary text-base">Products</h6>
              <div className="flex flex-col gap-1 ">
                {data?.results[0].hits.map((suggestion) => {
                  const priceData = getPriceDataByLocale(
                    locale as locale,
                    suggestion.prices
                  );
                  return (
                    <div className="">
                      <Link
                        href={`/brand/${suggestion.slug}`}
                        className=" bg-white flex gap-2 items-center hover:bg-slate-50 rounded-xl p-1"
                      >
                        <Image
                          src={
                            suggestion.images?.featured_image ??
                            "/images/default-product-image.png"
                          }
                          height={55}
                          width={55}
                          alt={suggestion.name || "cat-image"}
                          className="rounded-xl border border-slate-200"
                        />
                        <div className="flex flex-col gap-1">
                          <h6 className="font-medium text-black line-clamp-2">
                            {suggestion.title}
                          </h6>
                          <div className="flex items-center gap-3 mt-1 line-clamp-1">
                            {priceData?.price.offer_price !==
                            priceData?.price.regular_price ? (
                              <>
                                <p className=" font-medium  text-red-600">
                                  {formatPrice(
                                    priceData?.price.offer_price || ""
                                  )}
                                </p>
                                <p className=" font-medium text-sm text-blue-600 line-through">
                                  {formatPrice(
                                    priceData?.price.regular_price || ""
                                  )}
                                </p>
                              </>
                            ) : (
                              <p className=" font-medium text-sm text-blue-600 ">
                                {formatPrice(
                                  priceData?.price.regular_price || ""
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};
