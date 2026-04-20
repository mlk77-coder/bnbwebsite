'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import type { HomePageContent } from '@/types/home';

interface Slide {
  id: number;
  image: string;
  mobileImage?: string;
  alt: string;
}

const FALLBACK_SLIDES: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2400&q=90',
    mobileImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90',
    alt: 'Luxury Lifestyle Collection',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=2400&q=90',
    mobileImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=90',
    alt: 'Premium Tech Showcase',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=2400&q=90',
    mobileImage: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=90',
    alt: 'Fashion & Style',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=90',
    mobileImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=90',
    alt: 'Home Elegance',
  },
];

function slidesFromContent(content: HomePageContent | null | undefined): Slide[] {
  if (!content?.media_urls?.length) return FALLBACK_SLIDES;
  return content.media_urls.map((m, i) => ({
    id: m.web.id,
    image: m.web.url,
    mobileImage: m.mobile?.url ?? m.web.url,
    alt: `Hero ${i + 1}`,
  }));
}

type HeroSliderProps = {
  content?: HomePageContent | null;
};

export function HeroSlider({ content }: HeroSliderProps) {
  const slides = useMemo(() => slidesFromContent(content ?? undefined), [content]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Desktop Image */}
          <div className="hidden sm:block absolute inset-0">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              quality={90}
            />
          </div>
          {/* Mobile Image */}
          <div className="sm:hidden absolute inset-0">
            <Image
              src={slides[currentSlide].mobileImage || slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              quality={90}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Side vignette (keeps arrows readable) */}
      <div
        className="pointer-events-none absolute inset-0 z-1 bg-linear-to-r from-black/20 via-transparent to-black/20"
        aria-hidden
      />
      {/* Tall bottom fade — merges image edge into page background (no hard line) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-[min(52%,22rem)] bg-linear-to-t from-background from-12% via-background/75 via-45% to-transparent sm:h-[min(48%,26rem)] lg:h-[min(45%,28rem)]"
        aria-hidden
      />

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 group-hover:text-primary" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 group-hover:text-primary" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-6 sm:w-8'
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
