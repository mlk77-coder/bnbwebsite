'use client';

import { cn } from '@/lib/utils';
import { Category } from '@/types/categories';
import { ChevronDown, Flame } from 'lucide-react';
import { FC, Fragment, useState } from 'react';
import MobileSubCategory from './mobile-sub-category';
import SubCategoryLinks from './sub-category-links';
import { Link, usePathname } from '@/navigation';
import { SheetClose } from '@/components/ui/sheet';

type PropsType = {
  categories: Category[];
  sales: Category[];
  labels: {
    sale: string;
    allSale: string;
    newArrivals: string;
    allCategoryById: Record<number, string>;
  };
};

const navItemClass = cn(
  'flex w-full min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2.5',
  'text-start text-[15px] font-medium text-gray-800 transition-colors duration-200',
  'hover:bg-black/[0.03] active:bg-black/[0.05]',
  'focus-visible:ring-primary/30 focus-visible:ring-2 focus-visible:outline-none'
);

const MobileCategories: FC<PropsType> = ({ categories, sales, labels }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
  const pathname = usePathname();

  const handleClick = (id: number) => {
    setSelectedCategoryId(prev => (prev === id ? -1 : id));
  };

  const isSaleActive = pathname.includes('sale');

  return (
    <ul className='flex flex-col gap-1'>
      <li className='overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/5'>
        <button
          type='button'
          onClick={() => handleClick(0)}
          className={cn(
            navItemClass,
            'rounded-2xl',
            selectedCategoryId === 0 && 'bg-red-50 text-red-700',
            isSaleActive && selectedCategoryId !== 0 && 'text-red-600'
          )}
          aria-expanded={selectedCategoryId === 0}
        >
          <span className='flex items-center gap-2.5'>
            <span
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full',
                selectedCategoryId === 0 ? 'bg-red-100' : 'bg-red-50'
              )}
            >
              <Flame className='size-3.5 text-red-500' aria-hidden />
            </span>
            <span className='font-display text-sm tracking-[0.12em] uppercase'>
              {labels.sale}
            </span>
          </span>
          <ChevronDown
            className={cn(
              'size-4 shrink-0 text-gray-400 transition-transform duration-300',
              selectedCategoryId === 0 && 'rotate-180 text-red-500'
            )}
            aria-hidden
          />
        </button>

        {selectedCategoryId === 0 ? (
          <div className='animate-in fade-in-0 slide-in-from-top-1 border-t border-red-100/80 bg-red-50/40 px-2 py-2 duration-200'>
            <div className='border-s-2 border-red-200/80 ps-2'>
              <SheetClose asChild>
                <Link
                  href='/sale'
                  className={cn(
                    navItemClass,
                    'py-2 text-sm',
                    pathname === '/sale' || pathname.endsWith('/sale')
                      ? 'font-semibold text-red-600'
                      : 'text-gray-700'
                  )}
                >
                  {labels.allSale}
                </Link>
              </SheetClose>
              {sales.map(sale => (
                <SheetClose asChild key={sale.id}>
                  <Link
                    href={`/sale/${sale.slug}`}
                    className={cn(
                      navItemClass,
                      'py-2 text-sm text-gray-700',
                      pathname.includes(sale.slug) &&
                        'font-semibold text-red-600'
                    )}
                  >
                    {sale.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </div>
        ) : null}
      </li>

      {categories.map(category => {
        const isActive =
          pathname.includes(String(category.id)) && !pathname.includes('sale/');
        const isOpen = selectedCategoryId === category.id;
        const hasSubcategories = (category.subcategories?.length ?? 0) > 0;

        return (
          <li
            key={category.id}
            className='overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/5'
          >
            {hasSubcategories ? (
              <Fragment>
                <button
                  type='button'
                  onClick={() => handleClick(category.id)}
                  className={cn(
                    navItemClass,
                    'rounded-2xl',
                    isOpen && 'bg-primary/5 text-primary',
                    isActive && !isOpen && 'text-primary font-semibold'
                  )}
                  aria-expanded={isOpen}
                >
                  <span className='truncate'>{category.name}</span>
                  <span
                    className={cn(
                      'flex size-7 shrink-0 items-center justify-center rounded-full transition-colors',
                      isOpen ? 'bg-primary/15 text-primary' : 'bg-gray-100 text-gray-500'
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        'size-3.5 transition-transform duration-300',
                        isOpen && 'rotate-180'
                      )}
                      aria-hidden
                    />
                  </span>
                </button>

                {isOpen ? (
                  <div className='animate-in fade-in-0 slide-in-from-top-1 border-t border-primary/10 bg-primary/[0.03] px-2 py-2 duration-200'>
                    <div className='border-primary/25 border-s-2 ps-2'>
                      <SubCategoryLinks
                        subCategory={category}
                        newArrivalsLabel={labels.newArrivals}
                      />
                      <MobileSubCategory
                        subCategory={category}
                        mainCategorySlug={String(category.id)}
                      />
                    </div>
                  </div>
                ) : null}
              </Fragment>
            ) : (
              <SheetClose asChild>
                <Link
                  href={`/category/${category.id}`}
                  className={cn(
                    navItemClass,
                    'rounded-2xl',
                    isActive && 'text-primary font-semibold'
                  )}
                >
                  <span className='truncate'>{category.name}</span>
                </Link>
              </SheetClose>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MobileCategories;
