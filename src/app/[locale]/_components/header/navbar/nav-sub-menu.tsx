import { Link as IntlLink } from '@/navigation';
import { Category } from '@/types/categories';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import SubCategoryColumn from './sub-category-column';
import { distributeSubCategories } from '@/lib/navbar-split-categories';
import { useLocale, useTranslations } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles, Grid3X3, ChevronRight } from 'lucide-react';

type NavSubMenuProps = {
  category: Category;
  onLinkClick: () => void;
};

const NavSubMenu: FC<NavSubMenuProps> = ({ category, onLinkClick }) => {
  const t = useTranslations();
  const locale = useLocale();
  const dir = getLangDir(locale);
  const isRTL = dir === 'rtl';
  const columns = useMemo(
    () => distributeSubCategories(category.subcategories, 3),
    [category.subcategories]
  );

  return (
    <div
      dir={dir}
      className='w-screen border-t border-gray-100 bg-white/95 shadow-2xl shadow-gray-200/50 backdrop-blur-xl'
    >
      <div className='mx-auto max-w-screen-2xl p-6 lg:p-8'>
        {/* Header Section */}
        <div className='mb-6 flex items-center justify-between border-b border-gray-100 pb-4'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl'>
              <Grid3X3 className='text-primary h-5 w-5' />
            </div>
            <div>
              <h2 className='text-lg font-bold text-gray-900'>
                {category.name}
              </h2>
              <p className='text-sm text-gray-500'>{t('explore-category')}</p>
            </div>
          </div>
          <IntlLink
            href={`/category/${category.id}`}
            onClick={onLinkClick}
            className={cn(
              'group flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white',
              'text-sm font-medium transition-all duration-300 hover:bg-gray-800'
            )}
          >
            {t('view-all-products')}
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform duration-300',
                isRTL
                  ? 'rotate-180 group-hover:-translate-x-1'
                  : 'group-hover:translate-x-1'
              )}
            />
          </IntlLink>
        </div>

        {/* Bento Grid Layout */}
        <div className='grid grid-cols-12 gap-6'>
          {/* Quick Links Sidebar */}
          <div className='col-span-12 space-y-3 lg:col-span-2'>
            <IntlLink
              href={`/category/${category.id}`}
              onClick={onLinkClick}
              className='group flex items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-gray-50'
            >
              <div className='bg-primary/10 group-hover:bg-primary/20 flex h-8 w-8 items-center justify-center rounded-lg transition-colors'>
                <Grid3X3 className='text-primary h-4 w-4' />
              </div>
              <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                {t('all-products')}
              </span>
            </IntlLink>
            <IntlLink
              href={`/new-arrivals/${category.slug}`}
              onClick={onLinkClick}
              className='group flex items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-amber-50'
            >
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 transition-colors group-hover:bg-amber-200'>
                <Sparkles className='h-4 w-4 text-amber-600' />
              </div>
              <span className='text-sm font-medium text-amber-700'>
                {t('new-arrivals')}
              </span>
            </IntlLink>
          </div>

          {/* Categories Grid */}
          <div className='col-span-12 lg:col-span-7'>
            <div
              className={cn(
                'grid gap-6',
                columns.length === 1
                  ? 'grid-cols-1'
                  : columns.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
              )}
            >
              {columns.map((column, index) => (
                <SubCategoryColumn
                  key={index}
                  column={column}
                  categorySlug={String(category.id)}
                  onLinkClick={onLinkClick}
                />
              ))}
            </div>
          </div>

          {/* Featured Image Card */}
          <div className='col-span-12 lg:col-span-3'>
            <IntlLink
              href={`/category/${category.id}`}
              onClick={onLinkClick}
              className='group relative block aspect-4/5 min-h-[280px] overflow-hidden rounded-2xl lg:aspect-auto lg:h-full'
            >
              {category.image ? (
                <Image
                  src={category.image}
                  alt={`${category.name} featured`}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              ) : (
                <div className='from-primary/20 to-primary/40 absolute inset-0 bg-linear-to-br' />
              )}
              {/* Gradient Overlay */}
              <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent' />

              {/* Content */}
              <div className='absolute inset-x-0 bottom-0 p-5'>
                <p className='mb-1 text-sm font-medium text-white/80'>
                  {t('featured-collection')}
                </p>
                <h3 className='mb-3 text-xl font-bold text-white'>
                  {category.name}
                </h3>
                <span
                  className={cn(
                    'inline-flex items-center gap-2 text-sm font-medium text-white',
                    'transition-all duration-300 group-hover:gap-3'
                  )}
                >
                  {t('shop-now')}
                  <ArrowRight
                    className={cn('h-4 w-4', isRTL && 'rotate-180')}
                  />
                </span>
              </div>
            </IntlLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavSubMenu;
