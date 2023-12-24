import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React from "react";
import { useRouter } from "next/router";
import { Label } from "./ui/label";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Category } from "@/types/categories";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  brandCatData?: Category[];
  page_type: "brand" | "products" | "category";
  onCategoryItemClick :(brandCatSlug: string) => void
}

export const Sidebar = ({
  className,
  brandCatData,
  page_type,
  onCategoryItemClick
}: SidebarProps) => {
  const getSidebarByPageType = () => {
    switch (page_type) {
      case "brand":
        return <BrandSideBar brandCatData={brandCatData as Category[]} onCategoryItemClick={onCategoryItemClick}/>;
      case "category":
        return <CategoriesSidebar />;
    }
  };

  return <div className={cn("pb-12", className)}>{getSidebarByPageType()}</div>;
};

export const BrandSideBar = ({
  brandCatData,
  onCategoryItemClick
}: {
  brandCatData: Category[];
  onCategoryItemClick :(brandCatSlug: string) => void
}) => {
  const { push, query, pathname, asPath } = useRouter();
  const activeItem = query?.singleCategory ?? "";

  return (
    <div className="space-y-4 py-4">
      <div className="py-2 gap-1.5 flex flex-col">
        <h2 className="mb-2 text-xl font-semibold tracking-tight">Category</h2>
        <div className="space-y-1">
          {brandCatData.map((category) => (
            <Link
              href={`/brand/${query?.brand}/${category.slug}`}
              onClick={()=>onCategoryItemClick(category.slug)}
              shallow={true}
              className={cn(
                buttonVariants({
                  variant: activeItem === category.slug ? "secondary" : "ghost",
                }),
                "w-full justify-between"
              )}
            >
              {category.name}
              <div className="rounded-xl px-2 h-5 bg-primary-foreground border text-xs text-balck leading-5">
                {category.count}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CategoriesSidebar = () => {
  const { push, query, pathname, asPath } = useRouter();

  const id = React.useId();
  const [isPending, startTransition] = React.useTransition();
  const active = query?.active ?? "true";

  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 500,
  ]);

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(query?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [query]
  );

  return (
    <div className="col-span-3">
      {/* <Sheet>
                <SheetTrigger asChild>
                  <Button
                    aria-label="Filter products"
                    size="sm"
                    disabled={isPending}
                  >
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                  <SheetHeader className="px-1">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <Separator /> */}
      <div className="flex flex-1 flex-col gap-5 overflow-hidden p-1">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <Label htmlFor={`active-${id}`}>Active stores</Label>
            <CardDescription>
              Only show products from stores that are connected to Stripe
            </CardDescription>
          </div>
          <Switch
            id={`active-${id}`}
            checked={active === "true"}
            onCheckedChange={(value) =>
              startTransition(() => {
                push(
                  `${pathname}?${createQueryString({
                    active: value ? "true" : "false",
                  })}`
                );
              })
            }
            disabled={isPending}
          />
        </div>
        <Card className="space-y-4 rounded-lg p-3">
          <h3 className="text-sm font-medium tracking-wide text-foreground">
            Price range ($)
          </h3>
          <Slider
            variant="range"
            thickness="thin"
            defaultValue={[0, 500]}
            max={500}
            step={100}
            value={priceRange}
            onValueChange={(value: typeof priceRange) => setPriceRange(value)}
          />
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => {
                const value = Number(e.target.value);
                setPriceRange([value, priceRange[1]]);
              }}
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              inputMode="numeric"
              min={priceRange[0]}
              max={500}
              value={priceRange[1]}
              onChange={(e) => {
                const value = Number(e.target.value);
                setPriceRange([priceRange[0], value]);
              }}
            />
          </div>
        </Card>

        <Card className="space-y-4 overflow-hidden rounded-lg py-3 pl-3">
          <div className="flex gap-2 pr-3">
            <h3 className="flex-1 text-sm font-medium tracking-wide text-foreground">
              Stores
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  startTransition(() => {
                    push(
                      `${pathname}?${createQueryString({
                        store_page: Number("1") - 1,
                      })}`
                    );
                  });
                }}
                disabled={Number("1") === 1 || isPending}
              >
                <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Previous store page</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  startTransition(() => {
                    push(
                      `${pathname}?${createQueryString({
                        store_page: Number("1") + 1,
                      })}`
                    );
                  });
                }}
                disabled={Number("1") === 1 || isPending}
              >
                <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Next store page</span>
              </Button>
            </div>
          </div>
          <ScrollArea className="h-full pb-12">
            <div className="space-y-4">
              <div key={""} className="flex items-center space-x-2">
                <Checkbox
                  id={`${id}-store`}
                  checked={false}
                  // onCheckedChange={(value) => {
                  //   if (value) {
                  //     setStoreIds([...(storeIds ?? []), store.id]);
                  //   } else {
                  //     setStoreIds(
                  //       storeIds?.filter((id) => id !== store.id) ??
                  //         null
                  //     );
                  //   }
                  // }}
                />
                {/* <Label
                              htmlFor={`${id}-store-${store.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {`${truncate(store.name, 20)} (${
                                store.productCount
                              })`}
                            </Label> */}
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>
      {/* <div>
                    <Separator className="my-4" />
                    <SheetFooter>
                      <Button
                        aria-label="Clear filters"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          startTransition(() => {
                            // router.push(
                            //   `${pathname}?${createQueryString({
                            //     price_range: 0 - 100,
                            //     store_ids: null,
                            //     categories: null,
                            //     subcategories: null,
                            //     active: "true",
                            //   })}`,
                            //   {
                            //     scroll: false,
                            //   }
                            // );

                            setPriceRange([0, 100]);
                            // setSelectedCategories(null);
                            // setSelectedSubcategories(null);
                            // setStoreIds(null);
                          });
                        }}
                        disabled={isPending}
                      >
                        Clear Filters
                      </Button>
                    </SheetFooter>
                  </div>
                </SheetContent>
              </Sheet> */}
    </div>
  );
};
