'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { HomePageContent } from '@/types/home';
import { heroFallbackSlides } from '@/lib/hero-section-dummy-data';

interface Slide {
  id: number;
  image: string;
  mobileImage?: string;
  alt: string;
}

const FALLBACK_SLIDES: Slide[] = heroFallbackSlides;

function slidesFromContent(
  content: HomePageContent | null | undefined
): Slide[] {
  if (!content?.media_urls?.length) return FALLBACK_SLIDES;
  return content.media_urls.map((m, i) => ({
    id: m.web.id,
    image: m.web.url,
    mobileImage: m.mobile?.url ?? m.web.url,
    alt: '',
  }));
}

type HeroSliderProps = {
  content?: HomePageContent | null;
};

const HERO_SLIDE_ALT_KEYS = [
  'hero-slide-alt-1',
  'hero-slide-alt-2',
  'hero-slide-alt-3',
  'hero-slide-alt-4',
] as const;

export function HeroSlider({ content }: HeroSliderProps) {
  const t = useTranslations('home');
  const tCarousel = useTranslations('carousel');
  const slides = useMemo(
    () => slidesFromContent(content ?? undefined),
    [content]
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slideAlt = (index: number) => {
    const key = HERO_SLIDE_ALT_KEYS[index];
    return key ? t(key) : t('hero-slide-alt-1');
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, slides.length]);

  return (
    <div className='relative h-[400px] w-full overflow-hidden sm:h-[500px] lg:h-[600px]'>
      {/* Slides */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className='absolute inset-0'
        >
          {/* Desktop Image */}
          <div className='absolute inset-0 hidden sm:block'>
            <Image
              src={slides[currentSlide].image}
              alt={slideAlt(currentSlide)}
              fill
              sizes='100vw'
              className='object-cover'
              priority={currentSlide === 0}
              quality={90}
            />
          </div>
          {/* Mobile Image */}
          <div className='absolute inset-0 sm:hidden'>
            <Image
              src={
                slides[currentSlide].mobileImage || slides[currentSlide].image
              }
              alt={slideAlt(currentSlide)}
              fill
              sizes='100vw'
              className='object-cover'
              priority={currentSlide === 0}
              quality={90}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Side vignette (keeps arrows readable) */}
      <div
        className='pointer-events-none absolute inset-0 z-1 bg-linear-to-r from-black/20 via-transparent to-black/20'
        aria-hidden
      />
      {/* Tall bottom fade — merges image edge into page background (no hard line) */}
      <div
        className='from-background via-background/75 pointer-events-none absolute inset-x-0 bottom-0 z-2 h-[min(52%,22rem)] bg-linear-to-t from-12% via-45% to-transparent sm:h-[min(48%,26rem)] lg:h-[min(45%,28rem)]'
        aria-hidden
      />

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className='group absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white sm:left-4'
        aria-label={tCarousel('previous')}
      >
        <ChevronLeft className='group-hover:text-primary h-5 w-5 text-gray-800 sm:h-6 sm:w-6' />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className='group absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white sm:right-4'
        aria-label={tCarousel('next')}
      >
        <ChevronRight className='group-hover:text-primary h-5 w-5 text-gray-800 sm:h-6 sm:w-6' />
      </button>

      {/* Dots Indicator */}
      <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3 ${
              index === currentSlide
                ? 'w-6 bg-white sm:w-8'
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={tCarousel('go-to-slide', { number: index + 1 })}
          />
        ))}
      </div>
    </div>
  );
}
