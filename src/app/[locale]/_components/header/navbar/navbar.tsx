import getCart from "@/api/cart/get-cart";
import getCategories from "@/api/categories/get-categories";
import getSession from "@/lib/get-session";
import { getLocale } from "next-intl/server";
import { cookies, headers } from "next/headers";
import CartPopover from "../cart-popover";
import LanguagesToggle from "../languages-toggle";
import SearchHeader from "../search-header";
import UserMenu from "../user-menu";
import WishlistLink from "../wishlist-link";
import LoginButton from "./login-button";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import NavLinks from "./nav-links";
import getSaleCategories from "@/api/sale/get-sale-categories";

const Navbar = async () => {
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const sessionApi = getSession();
  const locale = await getLocale();
  const cookieStore = await cookies();
  const categoriesApi = getCategories(locale, request);
  const salesApi = getSaleCategories(locale, request);
  const [session, categories, sales] = await Promise.all([
    sessionApi,
    categoriesApi,
    salesApi,
  ]);
  const user_token = cookieStore.get("x-user-session")?.value || "";
  const isLoggedIn = Boolean(session && session.user);
  const token = isLoggedIn ? session?.user?.access_token || "" : user_token;
  const response = await getCart(token, locale, isLoggedIn, request);
  return (
    <header className="sticky inset-s-0 top-0 z-50 w-full">
      {/* Main Header with Glassmorphism Effect */}
      <div className="bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-100/80 shadow-sm shadow-gray-200/50">
        <div className="max-w-screen-3xl mx-auto px-3 md:px-6 lg:px-8">
          {/* Top Row: Logo, Search, Actions */}
          <div className="flex items-center h-16 lg:h-18 gap-2 md:gap-4">
            {/* Left Section: Mobile Menu & Logo — same width as right section */}
            <div className="flex items-center gap-1 md:gap-2 w-auto md:min-w-[180px] lg:min-w-[200px] shrink-0">
              <MobileMenu
                categories={categories}
                cartResponse={response}
                session={session}
                userToken={token}
                isLoggedIn={isLoggedIn}
                sales={sales}
              />
              <Logo />
            </div>

            {/* Center Section: Search Bar — takes all remaining space */}
            <div className="hidden md:flex flex-1 px-4 md:items-center justify-center">
              <SearchHeader />
            </div>

            {/* Right Section: User Actions — same width as left section */}
            <div className="flex items-center gap-0.5 md:gap-1 ms-auto shrink-0 md:min-w-[180px] lg:min-w-[200px] justify-end">
              {/* Mobile Search Button */}
              <div className="md:hidden">
                <SearchHeader isMobile />
              </div>

              {session?.user ? (
                <UserMenu session={session} userToken={user_token} />
              ) : (
                <LoginButton />
              )}
              <WishlistLink session={session} />
              <CartPopover
                cartResponse={response}
                userToken={token}
                isLoggedIn={isLoggedIn}
              />
              <LanguagesToggle />
            </div>
          </div>

          {/* Bottom Row: Navigation Links (Hidden on mobile/tablet) */}
          <div className="hidden lg:flex items-center justify-center h-12 border-t border-gray-100/60">
            <NavLinks categories={categories} sales={sales} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
