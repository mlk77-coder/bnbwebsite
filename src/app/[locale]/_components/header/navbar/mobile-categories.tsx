'use client';

import { cn } from '@/lib/utils';
import { Category } from '@/types/categories';
import { ChevronDown, Flame } from 'lucide-react';
import { FC, Fragment, useState } from 'react';
import MobileSubCategory from './mobile-sub-category';
import SubCategoryLinks from './sub-category-links';
import { Link, usePathname } from '@/navigation';
import { SheetClose } from '@/components/ui/sheet';
import { useLocale } from 'next-intl';
import { getLangDir } from 'rtl-detect';

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
  'flex w-full min-h-12 items-center justify-between gap-3 rounded-xl px-3 py-3',
  'text-start text-sm font-medium text-gray-800 transition-colors',
  'hover:bg-gray-50/90 active:bg-gray-100/80',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25'
);

const MobileCategories: FC<PropsType> = ({ categories, sales, labels }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const pathname = usePathname();
  const locale = useLocale();
  const isRTL = getLangDir(locale) === 'rtl';

  const selectedCategory = categories.find(
    category => category.id === selectedCategoryId
  );

  const handleClick = (id: number, name: string) => {
    if (selectedCategoryId === id) {
      setSelectedCategoryName('');
      setSelectedCategoryId(-1);
    } else {
      setSelectedCategoryId(id);
      setSelectedCategoryName(name);
    }
  };

  const isSaleActive = pathname.includes('sale');

  return (
    <Fragment>
      <ul className="flex flex-col gap-0.5">
        <li>
          <button
            type="button"
            onClick={() => handleClick(0, 'sale')}
            className={cn(
              navItemClass,
              selectedCategoryId === 0 && 'bg-red-50/80 text-red-700',
              isSaleActive && selectedCategoryId !== 0 && 'text-red-600'
            )}
            aria-expanded={selectedCategoryId === 0}
          >
            <span className="flex items-center gap-2">
              <Flame className="size-4 shrink-0" aria-hidden />
              <span className="font-display tracking-wide uppercase">
                {labels.sale}
              </span>
            </span>
            <ChevronDown
              className={cn(
                'size-4 shrink-0 text-gray-400 transition-transform duration-200',
                selectedCategoryId === 0 && 'rotate-180 text-red-500'
              )}
              aria-hidden
            />
          </button>
        </li>

        {categories.map(category => {
          const isActive =
            pathname.includes(String(category.id)) &&
            !pathname.includes('sale/');
          const isOpen = selectedCategoryId === category.id;

          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => handleClick(category.id, category.name)}
                className={cn(
                  navItemClass,
                  isOpen && 'bg-gray-50/90 text-gray-900',
                  isActive && !isOpen && 'text-primary font-semibold'
                )}
                aria-expanded={isOpen}
              >
                <span>{category.name}</span>
                {category.subcategories?.length > 0 ? (
                  <ChevronDown
                    className={cn(
                      'size-4 shrink-0 text-gray-400 transition-transform duration-200',
                      isOpen && 'rotate-180 text-primary'
                    )}
                    aria-hidden
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      {selectedCategoryId === 0 ? (
        <div
          className={cn(
            'mt-2 flex flex-col gap-0.5 rounded-xl border border-gray-100/80 bg-gray-50/50 p-2',
            isRTL ? 'me-1' : 'ms-1'
          )}
        >
          <SheetClose asChild>
            <Link
              href="/sale"
              className={cn(
                navItemClass,
                'py-2.5 text-sm font-semibold',
                pathname === '/sale' || pathname.endsWith('/sale')
                  ? 'text-red-600'
                  : ''
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
                  'py-2.5',
                  pathname.includes(sale.slug) ? 'text-red-600 font-medium' : ''
                )}
              >
                {sale.name}
              </Link>
            </SheetClose>
          ))}
        </div>
      ) : null}

      {selectedCategoryId > 0 && selectedCategory ? (
        <div
          className={cn(
            'mt-2 flex flex-col gap-1 rounded-xl border border-gray-100/80 bg-gray-50/50 p-2',
            isRTL ? 'me-1' : 'ms-1'
          )}
        >
          <SubCategoryLinks
            subCategory={selectedCategory}
            allCategoryLabel={
              labels.allCategoryById[selectedCategoryId] || selectedCategoryName
            }
            newArrivalsLabel={labels.newArrivals}
          />
          <MobileSubCategory
            subCategory={selectedCategory}
            mainCategorySlug={
              selectedCategory ? String(selectedCategory.id) : ''
            }
          />
        </div>
      ) : null}
    </Fragment>
  );
};

export default MobileCategories;
