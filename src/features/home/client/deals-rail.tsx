'use client';

import ProductCard from '@/components/product-card/product-card';
import {
  HorizontalRail,
  useHorizontalRailControls,
} from '@/components/horizontal-rail';
import SectionWrapper from '@/components/section-wrapper';
import { SectionHeading } from '@/components/section-heading';
import { HOME_SECTION_SPACING } from '@/features/home/constants';
import { PRODUCT_COLLECTION_SEE_MORE } from '@/features/product-collections/types';
import { cn } from '@/lib/utils';
import type { ProductCard as ProductCardType } from '@/types/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

type DealsRailProps = {
  products: ProductCardType[];
};

const navButtonClassName =
  'border-border flex size-8 items-center justify-center rounded-2xl border bg-white shadow-sm transition-all duration-300 sm:size-10 disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:border-primary enabled:hover:bg-primary enabled:hover:text-white enabled:hover:shadow-md enabled:active:scale-95';

export const DealsRail: FC<DealsRailProps> = ({ products }) => {
  const t = useTranslations('home');
  const tCarousel = useTranslations('carousel');
  const isRtl = useLocale() === 'ar';
  const {
    railRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  } = useHorizontalRailControls(isRtl);

  if (!products.length) return null;

  return (
    <SectionWrapper className={HOME_SECTION_SPACING}>
      <SectionHeading
        title={t('deals-title')}
        description={t('deals-description')}
        action={{
          href: PRODUCT_COLLECTION_SEE_MORE['on-sale'],
          label: t('see-all'),
        }}
      >
        <div className='hidden items-center gap-2 sm:flex'>
          <button
            type='button'
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={navButtonClassName}
            aria-label={tCarousel('previous')}
          >
            <ChevronLeft className='size-4 sm:size-5 rtl:rotate-180' />
          </button>
          <button
            type='button'
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={navButtonClassName}
            aria-label={tCarousel('next')}
          >
            <ChevronRight className='size-4 sm:size-5 rtl:rotate-180' />
          </button>
        </div>
      </SectionHeading>

      <HorizontalRail railRef={railRef}>
        {products.map(product => (
          <div
            key={product.id}
            className={cn(
              'w-[46%] shrink-0 snap-start sm:w-[31%]',
              'md:w-[23%] xl:w-[18%]'
            )}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </HorizontalRail>
    </SectionWrapper>
  );
};

export default DealsRail;
