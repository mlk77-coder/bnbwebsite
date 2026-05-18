'use client';

import SectionWrapper, {
  sectionWrapperClassName,
} from '@/components/section-wrapper';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import ReelCard from '@/features/reels/client/reel-card';
import ReelsViewer from '@/features/reels/client/reels-viewer';
import { cn } from '@/lib/utils';
import type { ReelCard as ReelCardType } from '@/types/reels';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useCallback, useEffect, useState } from 'react';

type PropsType = {
  reels: ReelCardType[];
};

const ReelsSection: FC<PropsType> = ({ reels }) => {
  const t = useTranslations('reels');
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

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

  const nextSlide = useCallback(() => api?.scrollNext(), [api]);
  const prevSlide = useCallback(() => api?.scrollPrev(), [api]);

  const handleOpenReel = useCallback(
    (reelId: number) => {
      const index = reels.findIndex(r => r.id === reelId);
      setViewerIndex(index >= 0 ? index : 0);
      setViewerOpen(true);
    },
    [reels]
  );

  if (!reels.length) return null;

  return (
    <>
      <SectionWrapper className={cn(sectionWrapperClassName, 'pb-0')}>
        <div className='mb-6 flex items-center justify-between sm:mb-8'>
          <div className='space-y-1.5'>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='text-xl font-bold tracking-wide sm:text-2xl lg:text-3xl'
            >
              {t('section-title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className='text-muted-foreground text-sm'
            >
              {t('section-description')}
            </motion.p>
          </div>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={prevSlide}
              disabled={!canScrollPrev}
              className={cn(
                'border-border flex h-8 w-8 items-center justify-center rounded-2xl border bg-white shadow-sm transition-all duration-300 sm:h-10 sm:w-10',
                !canScrollPrev
                  ? 'cursor-not-allowed opacity-40'
                  : 'hover:border-primary hover:bg-primary hover:text-white hover:shadow-md active:scale-95'
              )}
              aria-label={t('previous')}
            >
              <ChevronLeft className='h-4 w-4 sm:h-5 sm:w-5 rtl:rotate-180' />
            </button>
            <button
              type='button'
              onClick={nextSlide}
              disabled={!canScrollNext}
              className={cn(
                'border-border flex h-8 w-8 items-center justify-center rounded-2xl border bg-white shadow-sm transition-all duration-300 sm:h-10 sm:w-10',
                !canScrollNext
                  ? 'cursor-not-allowed opacity-40'
                  : 'hover:border-primary hover:bg-primary hover:text-white hover:shadow-md active:scale-95'
              )}
              aria-label={t('next')}
            >
              <ChevronRight className='h-4 w-4 sm:h-5 sm:w-5 rtl:rotate-180' />
            </button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: 'start', dragFree: true }}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className='cursor-grab select-none active:cursor-grabbing'
        >
          <CarouselContent className='-ml-3 sm:-ml-4'>
            {reels.map((reel, index) => (
              <CarouselItem
                key={reel.id}
                className='basis-[42%] pt-1 pl-3 sm:basis-1/3 sm:pl-4 md:basis-1/4 lg:basis-1/5 xl:basis-[18%]'
              >
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.35 }}
                >
                  <ReelCard
                    reel={reel}
                    priority={index < 3}
                    onOpen={handleOpenReel}
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </SectionWrapper>

      <ReelsViewer
        reels={reels}
        initialIndex={viewerIndex}
        open={viewerOpen}
        onOpenChange={setViewerOpen}
      />
    </>
  );
};

export default ReelsSection;
