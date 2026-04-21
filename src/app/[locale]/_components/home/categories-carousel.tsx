'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { HomePageCategory } from '@/types/home';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface CategoriesCarouselProps {
  categories: HomePageCategory[];
}

export function CategoriesCarousel({ categories }: CategoriesCarouselProps) {
  const t = useTranslations();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
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

  if (categories.length === 0) return null;

  return (
    <section className="w-full bg-linear-to-b from-background via-white to-background py-8 sm:py-12">
      <div className="max-w-screen-3xl mx-auto px-2.5 sm:px-4 lg:px-6 xl:px-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="space-y-1">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground tracking-wide"
            >
              {t('hero-shop-by-category')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xs sm:text-sm text-muted-foreground"
            >
              {t('explore-our-selection-description')}
            </motion.p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={!canScrollPrev}
              className={cn(
                'flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-2xl border border-border bg-white shadow-sm transition-all duration-300',
                !canScrollPrev
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-primary hover:border-primary hover:text-white hover:shadow-md active:scale-95'
              )}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={!canScrollNext}
              className={cn(
                'flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-2xl border border-border bg-white shadow-sm transition-all duration-300',
                !canScrollNext
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-primary hover:border-primary hover:text-white hover:shadow-md active:scale-95'
              )}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', dragFree: true }}
            className="cursor-grab active:cursor-grabbing select-none"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {categories.map((category, index) => (
                <CarouselItem
                  key={category.id}
                  className="pl-3 sm:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8 2xl:basis-[10%]"
                >
                  <CategoryCircle
                    category={category}
                    index={index}
                    isHovered={isHovered}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Progress Indicator */}
          {count > 1 && (
            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-1">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    'h-1.5 rounded-2xl transition-all duration-300',
                    current === index
                      ? 'w-6 bg-primary'
                      : 'w-1.5 bg-border hover:bg-muted-foreground/50'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface CategoryCircleProps {
  category: HomePageCategory;
  index: number;
  isHovered: boolean;
}

function CategoryCircle({ category, index, isHovered }: CategoryCircleProps) {
  const categoryPath = category.parents_slugs.length
    ? `/category/${[...category.parents_slugs].reverse().join('/')}`
    : `/category/${category.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={categoryPath} className="group block">
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          {/* Circle Image Container */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/20 to-orange-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Circle Image */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden border-2 border-border/50 bg-white shadow-sm group-hover:border-primary/30 group-hover:shadow-lg transition-all duration-400">
              <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

              <Image
                src={category.image || '/placeholder-category.jpg'}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Hover Ring Animation */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/60 pointer-events-none"
              animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Category Name */}
          <div className="text-center">
            <p className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 max-w-[80px] sm:max-w-[100px]">
              {category.name}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default CategoriesCarousel;
