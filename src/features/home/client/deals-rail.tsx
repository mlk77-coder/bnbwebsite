'use client';

import ProductCard from '@/components/product-card/product-card';
import SectionWrapper from '@/components/section-wrapper';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { SectionHeading } from '@/components/section-heading';
import { HOME_SECTION_SPACING } from '@/features/home/constants';
import { PRODUCT_COLLECTION_SEE_MORE } from '@/features/product-collections/types';
import { cn } from '@/lib/utils';
import type { ProductCard as ProductCardType } from '@/types/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';

type DealsRailProps = {
  products: ProductCardType[];
};

const navButtonClassName =
  'border-border flex size-8 items-center justify-center rounded-2xl border bg-white shadow-sm transition-all duration-300 sm:size-10 disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:border-primary enabled:hover:bg-primary enabled:hover:text-white enabled:hover:shadow-md enabled:active:scale-95';

export const DealsRail: FC<DealsRailProps> = ({ products }) => {
  const t = useTranslations('home');
  const tCarousel = useTranslations('carousel');
  const direction = useLocale() === 'ar' ? 'rtl' : 'ltr';
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

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
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            className={navButtonClassName}
            aria-label={tCarousel('previous')}
          >
            <ChevronLeft className='size-4 sm:size-5 rtl:rotate-180' />
          </button>
          <button
            type='button'
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            className={navButtonClassName}
            aria-label={tCarousel('next')}
          >
            <ChevronRight className='size-4 sm:size-5 rtl:rotate-180' />
          </button>
        </div>
      </SectionHeading>

      <Carousel
        setApi={setApi}
        opts={{ align: 'start', dragFree: true, direction }}
        dir={direction}
        className='cursor-grab select-none active:cursor-grabbing'
      >
        <CarouselContent className='-ms-3 sm:-ms-4'>
          {products.map(product => (
            <CarouselItem
              key={product.id}
              className={cn(
                'basis-1/2 ps-3 sm:basis-1/3 sm:ps-4',
                'md:basis-1/4 xl:basis-1/5'
              )}
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </SectionWrapper>
  );
};

export default DealsRail;
