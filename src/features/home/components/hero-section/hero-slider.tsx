'use client';

import { heroFallbackSlides } from '@/lib/hero-section-dummy-data';
import { cn } from '@/lib/utils';
import type { HomePageContent } from '@/types/home';
import {
  AnimatePresence,
  motion,
  type PanInfo,
  useReducedMotion,
} from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

const AUTOPLAY_SECONDS = 6;
const SWIPE_THRESHOLD_PX = 60;

const HERO_SLIDE_ALT_KEYS = [
  'hero-slide-alt-1',
  'hero-slide-alt-2',
  'hero-slide-alt-3',
  'hero-slide-alt-4',
] as const;

const navButtonClassName =
  'bg-background/85 text-foreground flex size-10 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-background hover:scale-105 active:scale-95';

type Slide = {
  id: number;
  image: string;
  mobileImage: string;
};

type HeroSliderProps = {
  content?: HomePageContent | null;
};

function slidesFromContent(content?: HomePageContent | null): Slide[] {
  if (!content?.media_urls?.length) return heroFallbackSlides;
  return content.media_urls.map(media => ({
    id: media.web.id,
    image: media.web.url,
    mobileImage: media.mobile?.url ?? media.web.url,
  }));
}

const padIndex = (value: number) => String(value).padStart(2, '0');

export function HeroSlider({ content }: HeroSliderProps) {
  const t = useTranslations('home');
  const tCarousel = useTranslations('carousel');
  const isRtl = useLocale() === 'ar';
  const reduceMotion = useReducedMotion();
  const slides = useMemo(() => slidesFromContent(content), [content]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const hasMultiple = slides.length > 1;
  const isAutoplaying = hasMultiple && !isPaused && !reduceMotion;
  const activeIndex = current < slides.length ? current : 0;
  const active = slides[activeIndex];
  const alt = t(HERO_SLIDE_ALT_KEYS[activeIndex] ?? HERO_SLIDE_ALT_KEYS[0]);

  const goTo = useCallback(
    (index: number) => setCurrent((index + slides.length) % slides.length),
    [slides.length]
  );
  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  const handleDragEnd = (_: unknown, { offset }: PanInfo) => {
    if (Math.abs(offset.x) < SWIPE_THRESHOLD_PX) return;
    const isForward = isRtl ? offset.x > 0 : offset.x < 0;
    if (isForward) goNext();
    else goPrev();
  };

  return (
    <div
      className='bg-secondary/40 relative h-[420px] w-full overflow-hidden rounded-2xl sm:h-[460px] lg:h-[540px] lg:rounded-3xl'
      role='region'
      aria-roledescription='carousel'
      aria-label={t('hero-label')}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={active.id}
          className='absolute inset-0 touch-pan-y'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          drag={hasMultiple ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
        >
          <motion.div
            className='absolute inset-0'
            initial={{ scale: reduceMotion ? 1 : 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: AUTOPLAY_SECONDS + 1, ease: 'easeOut' }}
          >
            <Image
              src={active.image}
              alt={alt}
              fill
              sizes='(max-width: 1920px) 100vw, 1920px'
              className='hidden object-cover select-none sm:block'
              priority={activeIndex === 0}
              quality={90}
              draggable={false}
            />
            <Image
              src={active.mobileImage}
              alt={alt}
              fill
              sizes='100vw'
              className='object-cover select-none sm:hidden'
              priority={activeIndex === 0}
              quality={90}
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div
        className='pointer-events-none absolute inset-x-0 bottom-0 z-1 h-36 bg-linear-to-t from-black/45 to-transparent'
        aria-hidden
      />

      {hasMultiple ? (
        <div className='absolute inset-x-0 bottom-0 z-10 flex items-center gap-4 p-4 sm:p-6'>
          <span className='shrink-0 text-xs font-semibold text-white tabular-nums'>
            {padIndex(activeIndex + 1)}
            <span className='text-white/60'> / {padIndex(slides.length)}</span>
          </span>

          <div className='flex flex-1 gap-1.5 sm:max-w-xs'>
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type='button'
                onClick={() => goTo(index)}
                className='flex-1 py-2'
                aria-label={tCarousel('go-to-slide', { number: index + 1 })}
                aria-current={index === activeIndex}
              >
                <span className='relative block h-1 overflow-hidden rounded-full bg-white/35'>
                  {index === activeIndex && isAutoplaying ? (
                    <motion.span
                      key={activeIndex}
                      className='absolute inset-y-0 start-0 bg-white'
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{
                        duration: AUTOPLAY_SECONDS,
                        ease: 'linear',
                      }}
                      onAnimationComplete={goNext}
                    />
                  ) : (
                    <span
                      className={cn(
                        'absolute inset-y-0 start-0 bg-white transition-[width] duration-300',
                        index <= activeIndex ? 'w-full' : 'w-0'
                      )}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className='ms-auto hidden items-center gap-2 sm:flex'>
            <button
              type='button'
              onClick={goPrev}
              className={navButtonClassName}
              aria-label={tCarousel('previous')}
            >
              <ChevronLeft className='size-5 rtl:rotate-180' />
            </button>
            <button
              type='button'
              onClick={goNext}
              className={navButtonClassName}
              aria-label={tCarousel('next')}
            >
              <ChevronRight className='size-5 rtl:rotate-180' />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
