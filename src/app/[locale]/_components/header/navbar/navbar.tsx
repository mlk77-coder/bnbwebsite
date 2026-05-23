import { getCart } from '@/features/cart';
import { getCategories } from '@/features/categories';
import { getProfile } from '@/features/profile';
import getSession from '@/lib/get-session';
import { getLocale, getTranslations } from 'next-intl/server';
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
import { getNavSaleCategories } from '@/features/sale/lib/nav-sale-categories';
import { Category } from '@/types/categories';

const toClientCategory = (category: Category): Category => ({
  ...category,
  parent: null,
  subcategories: (category.subcategories ?? []).map(toClientCategory),
});

const Navbar = async () => {
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  const sessionApi = getSession();
  const locale = await getLocale();
  const t = await getTranslations();
  const cookieStore = await cookies();

  const categoriesApi = getCategories(locale, request);
  const [session, categories] = await Promise.all([sessionApi, categoriesApi]);
  const navCategories = categories.map(toClientCategory);
  const mobileMenuLabels = {
    openMenu: t('open-menu'),
    signIn: t('sign-in'),
    sale: t('sale'),
    allSale: t('all-sale'),
    newArrivals: t('new-arrivals'),
    contactUs: t('contact-us.title'),
    allCategoryById: Object.fromEntries(
      navCategories.map(category => [
        category.id,
        t('all-category', { category: category.name }),
      ])
    ),
  };
  const sales = getNavSaleCategories(locale);

  const user_token = cookieStore.get('x-user-session')?.value || '';
  const isLoggedIn = Boolean(session && session.user);
  const token = isLoggedIn ? session?.user?.access_token || '' : user_token;
  const [response, profileResponse] = await Promise.all([
    getCart(token, locale, isLoggedIn, request),
    isLoggedIn && token
      ? getProfile(locale, token, request)
      : Promise.resolve(null),
  ]);
  const profile = profileResponse?.ok ? profileResponse.data.data : null;
  return (
    <header className='font-body sticky inset-s-0 top-0 z-50 w-full'>
      {/* Main Header with Glassmorphism Effect */}
      <div className='w-full border-b border-gray-100/80 bg-white/80 shadow-sm shadow-gray-200/50 backdrop-blur-xl backdrop-saturate-150'>
        <div className='max-w-screen-3xl mx-auto w-full px-2.5 md:px-4 lg:px-6 xl:px-24'>
          {/* Top Row: Logo, Search, Actions */}
          <div className='flex h-14 items-center gap-2 md:gap-4'>
            {/* Left Section: Mobile Menu & Logo — same width as right section */}
            <div className='flex w-auto shrink-0 items-center gap-1 md:min-w-[180px] md:gap-2 lg:min-w-[200px]'>
              <MobileMenu
                categories={navCategories}
                cartResponse={response}
                session={session}
                userToken={token}
                isLoggedIn={isLoggedIn}
                sales={sales}
                labels={mobileMenuLabels}
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
                <UserMenu
                  session={session}
                  userToken={user_token}
                  profileAvatar={profile?.avatar || undefined}
                  profileName={profile?.name || undefined}
                  profileEmail={profile?.email || undefined}
                />
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
            <NavLinks categories={navCategories} sales={sales} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
