"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FetcherResponse } from "@/lib/fetcher";
import { GetCartResponse } from "@/types/cart";
import { Category } from "@/types/categories";
import { X, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import CartPopover from "../cart/cart-popover";
import SearchHeader from "../search/search-header";
import Logo from "./logo";
import MenuBottomLinks from "./menu-bottom-links";
import MobileCategories from "./mobile-categories";
import MobileMenuHeader from "./mobile-menu-header";
import { CustomSession } from "@/lib/auth-options";

type PropsType = {
  categories: Category[];
  sales: Category[];
  cartResponse: FetcherResponse<GetCartResponse>;
  userToken: string;
  isLoggedIn: boolean;
  session: CustomSession | null;
  labels?: {
    openMenu: string;
    signIn: string;
    sale: string;
    allSale: string;
    newArrivals: string;
    contactUs: string;
    allCategoryById: Record<number, string>;
  };
};

const MobileMenu: FC<PropsType> = ({
  categories,
  cartResponse,
  userToken,
  isLoggedIn,
  session,
  sales,
  labels,
}) => {
  const t = useTranslations();
  const tA11y = useTranslations("accessibility");
  const menuLabels = labels ?? {
    openMenu: t("open-menu"),
    signIn: t("sign-in"),
    sale: t("sale"),
    allSale: t("all-sale"),
    newArrivals: t("new-arrivals"),
    contactUs: t("contact-us.title"),
    allCategoryById: {},
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="lg:hidden group relative hover:bg-gray-100/80 transition-all duration-300"
          variant="ghost"
          size="icon"
          aria-label={menuLabels.openMenu}
        >
          <Menu className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
        </Button>
      </SheetTrigger>
      <SheetContent
        overlay={false}
        hiddenCloseButton
        className="px-0 max-h-screen py-0 overflow-y-auto data-[state=closed]:duration-0 bg-white"
        side="left"
      >
        {/* Modern Mobile Menu Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-gray-100">
          <div className="flex h-16 px-4 justify-between gap-3 items-center">
            <div className="flex justify-start gap-3 items-center">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100/80 transition-colors"
                >
                  <span className="sr-only">{tA11y("close-menu")}</span>
                  <X className="w-5 h-5 text-gray-700" />
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <span>
                  <Logo />
                </span>
              </SheetClose>
            </div>
            <div className="flex justify-end items-center gap-1">
              <SearchHeader isMobile />
              <CartPopover
                insideSheet
                cartResponse={cartResponse}
                userToken={userToken}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </div>
        </div>

        {/* User Header Section */}
        <div className="px-4 py-4 bg-linear-to-br from-primary/5 to-transparent">
          <MobileMenuHeader
            session={session}
            userToken={userToken}
            signInLabel={menuLabels.signIn}
          />
        </div>

        <Separator className="opacity-50" />

        {/* Categories Section */}
        <div className="py-2">
          <MobileCategories categories={categories} sales={sales} labels={menuLabels} />
        </div>

        <Separator className="opacity-50" />

        {/* Bottom Links */}
        <div className="py-4 px-4">
          <MenuBottomLinks labels={menuLabels} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
