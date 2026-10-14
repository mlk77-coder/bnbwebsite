'use client';

import {
  HorizontalRail,
  useHorizontalRailControls,
} from '@/components/horizontal-rail';
import { SectionHeading } from '@/components/section-heading';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

const PLACEHOLDER = '/no-product.svg';

const navButtonClassName =
  'border-border flex size-8 items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-300 sm:size-10 disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:border-primary enabled:hover:bg-primary enabled:hover:text-white enabled:active:scale-95';

export type CategoryCircleItem = {
  id: number | string;
  name: string;
  image: string | null;
  slug?: string;
  parents_slugs?: string[];
  href?: string;
};

type CategoryCirclesCarouselProps = {
  items: CategoryCircleItem[];
  title?: string;
  description?: string;
  className?: string;
};

function getCategoryPath(item: CategoryCircleItem) {
  if (item.href) return item.href;
  if (item.parents_slugs?.length) {
    return `/category/${[...item.parents_slugs].reverse().join('/')}`;
  }
  return `/category/${item.slug ?? item.id}`;
}

export const CategoryCirclesCarousel: FC<CategoryCirclesCarouselProps> = ({
  items,
  title,
  description,
  className,
}) => {
  const tCarousel = useTranslations('carousel');
  const isRtl = useLocale() === 'ar';
  const {
    railRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  } = useHorizontalRailControls(isRtl);

  if (!items.length) return null;

  const hasOverflow = canScrollPrev || canScrollNext;

  return (
    <section className={className}>
      {title ? (
        <SectionHeading title={title} description={description}>
          {hasOverflow ? (
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
          ) : null}
        </SectionHeading>
      ) : null}

      <HorizontalRail railRef={railRef}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'w-[28%] shrink-0 snap-start sm:w-[20%]',
              'md:w-[16%] lg:w-[12.5%] xl:w-[10%]'
            )}
          >
            <CategoryCircle item={item} index={index} />
          </div>
        ))}
      </HorizontalRail>
    </section>
  );
};

type CategoryCircleProps = {
  item: CategoryCircleItem;
  index: number;
};

const CategoryCircle: FC<CategoryCircleProps> = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04 }}
  >
    <Link
      href={getCategoryPath(item)}
      draggable={false}
      className='group flex flex-col items-center gap-3'
    >
      <span className='bg-card ring-border/70 group-hover:ring-primary relative block aspect-square w-full overflow-hidden rounded-full p-1 shadow-sm ring-1 transition-all duration-300 group-hover:shadow-lg group-hover:ring-2'>
        <span className='relative block size-full overflow-hidden rounded-full'>
          <Image
            src={item.image || PLACEHOLDER}
            alt={item.name}
            fill
            sizes='(max-width: 640px) 28vw, (max-width: 1024px) 16vw, 10vw'
            draggable={false}
            className='object-cover transition-transform duration-500 ease-out group-hover:scale-110'
          />
        </span>
      </span>
      <span className='group-hover:text-primary line-clamp-2 text-center text-xs leading-snug font-medium transition-colors duration-300 sm:text-sm'>
        {item.name}
      </span>
    </Link>
  </motion.div>
);

export default CategoryCirclesCarousel;
