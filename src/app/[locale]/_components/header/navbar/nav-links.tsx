'use client';

import { useState, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import NavSubMenu from './nav-sub-menu';
import { Category } from '@/types/categories';
import { FC } from 'react';
import ClientLink from '@/components/client-link';
import { useLocale, useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import SaleSubMenu from './sale-sub-menu';
import { usePathname, Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown, Flame, Sparkles } from 'lucide-react';

type PropsType = {
  categories: Category[];
  sales: Category[];
};

const NavLinks: FC<PropsType> = ({ categories, sales }) => {
  const [openCategory, setOpenCategory] = useState<string>('');
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const dir = getLangDir(locale);

  const handleLinkClick = () => {
    setOpenCategory('');
  };

  useEffect(() => {
    if (openCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openCategory]);

  return (
    <NavigationMenu
      value={openCategory}
      onValueChange={value => {
        if (value === openCategory) setOpenCategory('');
        else setOpenCategory(value);
      }}
      className='flex w-full items-center justify-center overflow-visible'
    >
      <NavigationMenuList dir={dir} className='font-body'>
        {/* New Arrivals Link */}
        <NavigationMenuItem className='group/item'>
          <Link
            href='/new-arrivals'
            className={cn(
              'relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700',
              'transition-all duration-300 hover:text-gray-900',
              'rounded-lg hover:bg-gray-50/80',
              'focus-visible:ring-primary/20 focus-visible:ring-2 focus-visible:outline-none'
            )}
          >
            <Sparkles className='h-4 w-4 text-amber-500' />
            <span>{t('new-arrivals')}</span>
          </Link>
        </NavigationMenuItem>

        {/* Sale Link - Special styling */}
        {sales.length > 0 && (
          <NavigationMenuItem value='SALE' className='group/item'>
            <NavigationMenuTrigger asChild>
              <span role='button' className='cursor-pointer'>
                <ClientLink
                  className={cn(
                    'relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium',
                    'text-red-600 transition-all duration-300 hover:text-red-700',
                    'rounded-lg hover:bg-red-50/80',
                    'focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:outline-none',
                    'group-data-[state=open]/item:bg-red-50/80',
                    'font-display tracking-widest'
                  )}
                  href={`/sale`}
                  slug='sale'
                  activeClassName='text-red-600'
                  onClick={handleLinkClick}
                >
                  <Flame className='h-4 w-4' />
                  <span className='text-xs uppercase'>{t('sale')}</span>
                  <ChevronDown className='h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-data-[state=open]/item:rotate-180' />
                </ClientLink>
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className='inset-x-0 w-screen'>
              <SaleSubMenu sales={sales} onLinkClick={handleLinkClick} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* Category Links */}
        {categories.map(category => {
          const hasSubCategories = category.subcategories?.length > 0;

          return (
            <NavigationMenuItem
              key={category.id}
              value={hasSubCategories ? category.slug : undefined}
              className='group/item'
            >
              {hasSubCategories ? (
                <NavigationMenuTrigger asChild>
                  <span role='button' className='cursor-pointer'>
                    <ClientLink
                      className={cn(
                        'relative flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-700',
                        'transition-all duration-300 hover:text-gray-900',
                        'rounded-lg hover:bg-gray-50/80',
                        'focus-visible:ring-primary/20 focus-visible:ring-2 focus-visible:outline-none',
                        'group-data-[state=open]/item:bg-gray-50/80',
                        pathname.includes('sale/') &&
                          'pointer-events-none opacity-60'
                      )}
                      href={`/category/${category.id}`}
                      slug={String(category.id)}
                      activeClassName='text-primary font-semibold'
                      onClick={handleLinkClick}
                    >
                      <span>{category.name}</span>
                      <ChevronDown className='h-3.5 w-3.5 opacity-50 transition-transform duration-200 group-data-[state=open]/item:rotate-180' />
                    </ClientLink>
                  </span>
                </NavigationMenuTrigger>
              ) : (
                <ClientLink
                  className={cn(
                    'relative flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-700',
                    'transition-all duration-300 hover:text-gray-900',
                    'rounded-lg hover:bg-gray-50/80',
                    'focus-visible:ring-primary/20 focus-visible:ring-2 focus-visible:outline-none',
                    'group-data-[state=open]/item:bg-gray-50/80',
                    pathname.includes('sale/') &&
                      'pointer-events-none opacity-60'
                  )}
                  href={`/category/${category.id}`}
                  slug={String(category.id)}
                  activeClassName='text-primary font-semibold'
                  onClick={handleLinkClick}
                >
                  <span>{category.name}</span>
                </ClientLink>
              )}
              {hasSubCategories && (
                <NavigationMenuContent className='inset-x-0 w-screen'>
                  <NavSubMenu
                    category={category}
                    onLinkClick={handleLinkClick}
                  />
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;
