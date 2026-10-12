'use client';

import { SectionHeading } from '@/components/section-heading';
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
import { prefetchReelNeighbors } from '@/features/reels/lib/reel-video-prefetch';
import { cn } from '@/lib/utils';
import type { ReelCard as ReelCardType } from '@/types/reels';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useCallback, useEffect, useState } from 'react';

const navButtonClassName =
  'border-border flex size-8 items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-300 sm:size-10 disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:border-primary enabled:hover:bg-primary enabled:hover:text-white enabled:active:scale-95';

type PropsType = {
  reels: ReelCardType[];
  className?: string;
};

const ReelsSection: FC<PropsType> = ({ reels, className }) => {
  const t = useTranslations('reels');
  const direction = useLocale() === 'ar' ? 'rtl' : 'ltr';
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
      const safeIndex = index >= 0 ? index : 0;
      prefetchReelNeighbors(reels, safeIndex);
      setViewerIndex(safeIndex);
      setViewerOpen(true);
    },
    [reels]
  );

  useEffect(() => {
    if (reels.length) prefetchReelNeighbors(reels, 0);
  }, [reels]);

  if (!reels.length) return null;

  return (
    <>
      <SectionWrapper className={cn(sectionWrapperClassName, 'pb-0', className)}>
        <SectionHeading
          title={t('section-title')}
          description={t('section-description')}
        >
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={prevSlide}
              disabled={!canScrollPrev}
              className={navButtonClassName}
              aria-label={t('previous')}
            >
              <ChevronLeft className='size-4 sm:size-5 rtl:rotate-180' />
            </button>
            <button
              type='button'
              onClick={nextSlide}
              disabled={!canScrollNext}
              className={navButtonClassName}
              aria-label={t('next')}
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
            {reels.map((reel, index) => (
              <CarouselItem
                key={reel.id}
                className='basis-[62%] ps-3 pt-1 sm:basis-1/3 sm:ps-4 md:basis-1/4 lg:basis-1/5 xl:basis-[18%]'
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
