"use client";

import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import NavSubMenu from "./nav-sub-menu";
import { Category } from "@/types/categories";
import { FC } from "react";
import ClientLink from "@/components/client-link";
import { useLocale, useTranslations } from "next-intl";
import { getLangDir } from "rtl-detect";
import SaleSubMenu from "./sale-sub-menu";
import { usePathname, Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, Flame, Sparkles } from "lucide-react";

type PropsType = {
  categories: Category[];
  sales: Category[];
};

const NavLinks: FC<PropsType> = ({ categories, sales }) => {
  const [openCategory, setOpenCategory] = useState<string>("");
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const dir = getLangDir(locale);

  const handleLinkClick = () => {
    setOpenCategory("");
  };

  useEffect(() => {
    if (openCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCategory]);

  return (
    <NavigationMenu
      value={openCategory}
      onValueChange={(value) => {
        if (value === openCategory) setOpenCategory("");
        else setOpenCategory(value);
      }}
      className="flex justify-center items-center w-full overflow-visible"
    >
      <NavigationMenuList dir={dir} className="gap-1">
        {/* New Arrivals Link */}
        <NavigationMenuItem className="group/item">
          <Link
            href="/new-arrivals"
            className={cn(
              "relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700",
              "hover:text-gray-900 transition-all duration-300",
              "rounded-lg hover:bg-gray-50/80",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            )}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t("new-arrivals")}</span>
          </Link>
        </NavigationMenuItem>

        {/* Sale Link - Special styling */}
        {sales.length > 0 && (
          <NavigationMenuItem
            value="SALE"
            className="group/item"
          >
            <NavigationMenuTrigger asChild>
              <span role="button" className="cursor-pointer">
                <ClientLink
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium",
                    "text-red-600 hover:text-red-700 transition-all duration-300",
                    "rounded-lg hover:bg-red-50/80",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200",
                    "group-data-[state=open]/item:bg-red-50/80"
                  )}
                  href={`/sale`}
                  slug="sale"
                  activeClassName="text-red-600"
                  onClick={handleLinkClick}
                >
                  <Flame className="w-4 h-4" />
                  <span className="uppercase tracking-wide">{t("sale")}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60 group-data-[state=open]/item:rotate-180 transition-transform duration-200" />
                </ClientLink>
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-screen left-0 right-0">
              <SaleSubMenu sales={sales} onLinkClick={handleLinkClick} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* Category Links */}
        {categories.map((category) => (
          <NavigationMenuItem
            key={category.id}
            value={category.slug}
            className="group/item"
          >
            <NavigationMenuTrigger asChild>
              <span role="button" className="cursor-pointer">
                <ClientLink
                  className={cn(
                    "relative flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700",
                    "hover:text-gray-900 transition-all duration-300",
                    "rounded-lg hover:bg-gray-50/80",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                    "group-data-[state=open]/item:bg-gray-50/80",
                    pathname.includes("sale/") && "pointer-events-none opacity-60"
                  )}
                  href={`/category/${category.slug}`}
                  slug={category.slug}
                  activeClassName="text-primary font-semibold"
                  onClick={handleLinkClick}
                >
                  <span>{category.name}</span>
                  {category.sub_categories?.length > 0 && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-50 group-data-[state=open]/item:rotate-180 transition-transform duration-200" />
                  )}
                </ClientLink>
              </span>
            </NavigationMenuTrigger>
            {category.sub_categories?.length > 0 && (
              <NavigationMenuContent className="w-screen left-0 right-0">
                <NavSubMenu 
                  category={category} 
                  onLinkClick={handleLinkClick} 
                />
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;
