import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import { Input } from "./ui/input";
import { NavItems } from "./NavItems";
import { SearchIcon } from "lucide-react";
import { MainNav } from "./Categories";
import { SearchSuggestion } from "./SearchSuggestion";
import { useEffect, useRef, useState } from "react";
import { useSearchSuggestion } from "./hooks/useData";
import { useOnClickOutside } from "./hooks/use-on-click-outside.ts";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, refetch, isLoading } = useSearchSuggestion(searchQuery);

  const handleOpen = () => {
    refetch();
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [searchQuery]);

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => close());

  return (
    <div className="bg-primary sticky z-50 top-0 inset-x-0 ">
      <header className="relative bg-primary w-full">
        <MaxWidthWrapper>
          <div className="flex items-center h-20 gap-7 ">
            <div className="ml-4 flex lg:ml-0">
              <Link href="/">
                <Icons.logo className="h-16 w-72" />
              </Link>
            </div>
            <div className="w-full relative" ref={navRef}>
              <Input
                placeholder="Search for products..."
                className="w-full rounded-lg h-10 ps-10"
                onClick={() => handleOpen()}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="absolute inset-y-0 start-0 my-auto ms-3 w-5 h-5 text-slate-500" />
              <SearchSuggestion
                open={open}
                data={data}
                isLoading={isLoading}
                close={close}
              />
            </div>
            <NavItems />
          </div>
          
        </MaxWidthWrapper>
        <MainNav />
      </header>
    </div>
  );
};
