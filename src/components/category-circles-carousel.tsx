'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useLocale } from 'next-intl';

export type CategoryCircleItem = {
  id: number | string;
  name: string;
  image: string;
  slug?: string;
  parents_slugs?: string[];
  href?: string;
};

type CategoryCirclesCarouselProps = {
  items: CategoryCircleItem[];
  title?: string;
  description?: string;
  sectionClassName?: string;
  innerClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  navigationClassName?: string;
  itemClassName?: string;
  imageWrapperClassName?: string;
  nameClassName?: string;
  showProgress?: boolean;
};

function getCategoryPath(item: CategoryCircleItem) {
  if (item.href) return item.href;
  if (item.parents_slugs?.length) {
    return `/category/${[...item.parents_slugs].reverse().join('/')}`;
  }
  return `/category/${item.slug ?? ''}`;
}

export function CategoryCirclesCarousel({
  items,
  title,
  description,
  sectionClassName,
  innerClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  navigationClassName,
  itemClassName,
  imageWrapperClassName,
  nameClassName,
  showProgress = true,
}: CategoryCirclesCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const locale = useLocale();
  const [count, setCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    setCount(api.scrollSnapList().length);
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  const nextSlide = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const prevSlide = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  if (!items.length) return null;

  return (
    <section className={cn('w-full py-8 sm:py-12', sectionClassName)}>
      <div className={cn('max-w-screen-3xl mx-auto w-full', innerClassName)}>
        {(title || description) && (
          <div
            className={cn(
              'mb-6 flex items-center justify-between sm:mb-8',
              headerClassName
            )}
          >
            <div className='space-y-1'>
              {title ? (
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={cn(
                    'text-foreground text-lg font-bold tracking-wide sm:text-xl lg:text-2xl',
                    titleClassName
                  )}
                >
                  {title}
                </motion.h2>
              ) : null}
              {description ? (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={cn(
                    'text-muted-foreground text-xs sm:text-sm',
                    descriptionClassName
                  )}
                >
                  {description}
                </motion.p>
              ) : null}
            </div>

            <div className={cn('flex items-center gap-2', navigationClassName)}>
              <button
                onClick={prevSlide}
                disabled={!canScrollPrev}
                className={cn(
                  'border-border flex h-8 w-8 items-center justify-center rounded-2xl border bg-white shadow-sm transition-all duration-300 sm:h-10 sm:w-10',
                  !canScrollPrev
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:border-primary hover:bg-primary hover:text-white hover:shadow-md active:scale-95'
                )}
                aria-label='Previous'
              >
                <ChevronLeft className='h-4 w-4 sm:h-5 sm:w-5 rtl:rotate-180' />
              </button>
              <button
                onClick={nextSlide}
                disabled={!canScrollNext}
                className={cn(
                  'border-border flex h-8 w-8 items-center justify-center rounded-2xl border bg-white shadow-sm transition-all duration-300 sm:h-10 sm:w-10',
                  !canScrollNext
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:border-primary hover:bg-primary hover:text-white hover:shadow-md active:scale-95'
                )}
                aria-label='Next'
              >
                <ChevronRight className='h-4 w-4 sm:h-5 sm:w-5 rtl:rotate-180' />
              </button>
            </div>
          </div>
        )}

        <div
          className='relative'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', dragFree: true }}
            dir={locale == 'ar' ? 'rtl' : 'ltr'}
            className='cursor-grab select-none active:cursor-grabbing'
          >
            <CarouselContent className='-ml-3 sm:-ml-4'>
              {items.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className={cn(
                    'basis-1/3 pt-1 pl-3 sm:basis-1/4 sm:pl-4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8 2xl:basis-[10%]',
                    itemClassName
                  )}
                >
                  <CategoryCircle
                    item={item}
                    index={index}
                    isHovered={isHovered}
                    imageWrapperClassName={imageWrapperClassName}
                    nameClassName={nameClassName}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {showProgress && count > 1 ? (
            <div className='mt-6 flex items-center justify-center gap-1 sm:mt-8'>
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    'h-1.5 rounded-2xl transition-all duration-300',
                    current === index
                      ? 'bg-primary w-6'
                      : 'bg-border hover:bg-muted-foreground/50 w-1.5'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type CategoryCircleProps = {
  item: CategoryCircleItem;
  index: number;
  isHovered: boolean;
  imageWrapperClassName?: string;
  nameClassName?: string;
};

function CategoryCircle({
  item,
  index,
  isHovered,
  imageWrapperClassName,
  nameClassName,
}: CategoryCircleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={getCategoryPath(item)} className='group block'>
        <div className='flex flex-col items-center gap-2 sm:gap-3'>
          <div className='relative'>
            <div className='from-primary/20 absolute inset-0 rounded-2xl bg-linear-to-br to-orange-400/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100' />
            <div
              className={cn(
                'border-border/50 group-hover:border-primary/30 relative h-24 w-24 overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-all duration-400 group-hover:shadow-lg sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32',
                imageWrapperClassName
              )}
            >
              <div className='absolute inset-0 z-10 bg-linear-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <Image
                src={item.image || '/placeholder-category.jpg'}
                alt={item.name}
                fill
                sizes='(max-width: 640px) 96px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px'
                className='object-cover transition-transform duration-500 ease-out group-hover:scale-110'
              />
            </div>
            <motion.div
              className='border-primary/0 group-hover:border-primary/60 pointer-events-none absolute inset-0 rounded-2xl border-2'
              animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className='text-center'>
            <p
              className={cn(
                'text-foreground group-hover:text-primary line-clamp-2 max-w-[80px] text-xs font-medium transition-colors duration-300 sm:max-w-[100px] sm:text-sm',
                nameClassName
              )}
            >
              {item.name}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default CategoryCirclesCarousel;
