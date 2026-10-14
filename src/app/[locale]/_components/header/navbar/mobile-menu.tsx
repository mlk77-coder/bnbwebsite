'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FetcherResponse } from '@/lib/fetcher';
import { GetCartResponse } from '@/types/cart';
import { Category } from '@/types/categories';
import { X, Menu } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';
import { getLangDir } from 'rtl-detect';
import CartPopover from '../cart/cart-popover';
import SearchHeader from '../search/search-header';
import Logo from './logo';
import MenuBottomLinks from './menu-bottom-links';
import MobileCategories from './mobile-categories';
import MobileMenuHeader from './mobile-menu-header';
import { CustomSession } from '@/lib/auth-options';

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
  const locale = useLocale();
  const dir = getLangDir(locale);
  const isRTL = dir === 'rtl';
  const t = useTranslations();
  const tA11y = useTranslations('accessibility');
  const menuLabels = labels ?? {
    openMenu: t('open-menu'),
    signIn: t('sign-in'),
    sale: t('sale'),
    allSale: t('all-sale'),
    newArrivals: t('new-arrivals'),
    contactUs: t('contact-us.title'),
    allCategoryById: {},
  };

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button
          className='group relative transition-all duration-300 hover:bg-gray-100/80 lg:hidden'
          variant='ghost'
          size='icon'
          aria-label={menuLabels.openMenu}
        >
          <Menu className='h-5 w-5 text-gray-700 transition-colors group-hover:text-gray-900' />
        </Button>
      </SheetTrigger>
      <SheetContent
        overlay
        hiddenCloseButton
        allowPortaledOverlays
        dir={dir}
        className='flex h-full max-h-screen w-full max-w-[min(100vw,22rem)] flex-col gap-0 overflow-hidden border-0 bg-[#faf9f7] p-0 shadow-2xl data-[state=closed]:duration-200 sm:max-w-sm'
        side={isRTL ? 'right' : 'left'}
      >
        <div className='sticky top-0 z-10 border-b border-black/5 bg-white/90 backdrop-blur-xl'>
          <div className='flex h-14 items-center justify-between gap-2 px-3'>
            <div className='flex min-w-0 items-center gap-1.5'>
              <SheetClose asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='size-9 shrink-0 rounded-full hover:bg-black/5'
                >
                  <span className='sr-only'>{tA11y('close-menu')}</span>
                  <X className='size-5 text-gray-700' />
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <span className='inline-flex'>
                  <Logo />
                </span>
              </SheetClose>
            </div>
            <div className='flex shrink-0 items-center gap-0.5'>
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

        <div className='flex min-h-0 flex-1 flex-col overflow-y-auto'>
          <div className='px-3 pt-3'>
            <MobileMenuHeader
              session={session}
              userToken={userToken}
              signInLabel={menuLabels.signIn}
            />
          </div>

          <nav
            className='flex-1 px-3 py-4'
            aria-label={tA11y('main-navigation')}
          >
            <p className='text-muted-foreground mb-2 px-1 text-[11px] font-semibold tracking-[0.14em] uppercase'>
              {t('categories')}
            </p>
            <MobileCategories
              categories={categories}
              sales={sales}
              labels={menuLabels}
            />
          </nav>

          <div className='sticky bottom-0 border-t border-black/5 bg-white/95 p-3 backdrop-blur-md'>
            <MenuBottomLinks labels={menuLabels} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
