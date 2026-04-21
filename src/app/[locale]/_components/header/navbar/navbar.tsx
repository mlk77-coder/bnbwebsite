import getCart from '@/api/cart/get-cart';
// import getCategories from '@/api/categories/get-categories';
// import getSaleCategories from '@/api/sale/get-sale-categories';
import getSession from '@/lib/get-session';
import { getLocale } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import CartPopover from '../cart/cart-popover';
import LanguagesToggle from '../i18n/languages-toggle';
import SearchHeader from '../search/search-header';
import UserMenu from '../account/user-menu';
import WishlistLink from '../account/wishlist-link';
import LoginButton from '../account/login-button';
import Logo from './logo';
import MobileMenu from './mobile-menu';
import NavLinks from './nav-links';
import {
  DUMMY_HEADER_CATEGORIES,
  DUMMY_SALE_CATEGORIES,
} from '../data/dummy-nav-categories';

const Navbar = async () => {
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const sessionApi = getSession();
  const locale = await getLocale();
  const cookieStore = await cookies();

  // const categoriesApi = getCategories(locale, request);
  // const salesApi = getSaleCategories(locale, request);
  // const [session, categories, sales] = await Promise.all([
  //   sessionApi,
  //   categoriesApi,
  //   salesApi,
  // ]);

  const session = await sessionApi;
  const categories = DUMMY_HEADER_CATEGORIES;
  const sales = DUMMY_SALE_CATEGORIES;

  const user_token = cookieStore.get('x-user-session')?.value || '';
  const isLoggedIn = Boolean(session && session.user);
  const token = isLoggedIn ? session?.user?.access_token || '' : user_token;
  const response = await getCart(token, locale, isLoggedIn, request);
  return (
    <header className='sticky inset-s-0 top-0 z-50 w-full font-body'>
      {/* Main Header with Glassmorphism Effect */}
      <div className='border-b border-gray-100/80 bg-white/80 shadow-sm shadow-gray-200/50 backdrop-blur-xl backdrop-saturate-150 w-full'>
        <div className='px-2.5 md:px-4 lg:px-6 xl:px-24 mx-auto max-w-screen-3xl w-full'>
          {/* Top Row: Logo, Search, Actions */}
          <div className='flex h-14 items-center gap-2 md:gap-4'>
            {/* Left Section: Mobile Menu & Logo — same width as right section */}
            <div className='flex w-auto shrink-0 items-center gap-1 md:min-w-[180px] md:gap-2 lg:min-w-[200px]'>
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
            <div className='hidden flex-1 justify-center px-4 md:flex md:items-center'>
              <SearchHeader />
            </div>

            {/* Right Section: User Actions — same width as left section */}
            <div className='ms-auto flex shrink-0 items-center justify-end gap-0.5 md:min-w-[180px] md:gap-1 lg:min-w-[200px]'>
              {/* Mobile Search Button */}
              <div className='md:hidden'>
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
          <div className='hidden h-10 items-center justify-center border-t border-gray-100/80 lg:flex'>
            <NavLinks categories={categories} sales={sales} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
