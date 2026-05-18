'use client';

import { useMediaQuery } from '@/app/hooks/use-media-query';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ReelsViewerSlide } from '@/features/reels/client/reels-viewer-slide';
import { cn, formatLocaleNumber } from '@/lib/utils';
import { Link } from '@/navigation';
import type { ReelCard as ReelCardType } from '@/types/reels';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useCallback, useEffect, useState } from 'react';

type PropsType = {
  reels: ReelCardType[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MOBILE_QUERY = '(max-width: 768px)';

const ReelsViewer: FC<PropsType> = ({
  reels,
  initialIndex,
  open,
  onOpenChange,
}) => {
  const t = useTranslations('reels');
  const locale = useLocale();
  const isMobile = useMediaQuery(MOBILE_QUERY, {
    defaultValue: false,
    initializeWithValue: true,
  });
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(initialIndex);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const orientation = isMobile ? 'vertical' : 'horizontal';

  useEffect(() => {
    if (!open || !api) return;
    api.scrollTo(initialIndex, true);
    setCurrent(initialIndex);
  }, [open, initialIndex, api, orientation]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
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

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const closeViewer = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          closeViewer();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          scrollPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          scrollNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isMobile) scrollNext();
          else scrollPrev();
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (isMobile) scrollPrev();
          else scrollNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, isMobile, scrollPrev, scrollNext, closeViewer]);

  const activeReel = reels[current];

  if (!reels.length) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black' />
        <Dialog.Content
          className='fixed inset-0 z-50 flex outline-none'
          aria-describedby={undefined}
          onOpenAutoFocus={e => e.preventDefault()}
        >
          <Dialog.Title className='sr-only'>{t('viewer-title')}</Dialog.Title>

          <div className='relative flex size-full flex-col'>
            {/* Top bar */}
            <div
              className={cn(
                'absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-4 pt-4 pb-2 sm:px-6',
                isMobile && 'bg-linear-to-b from-black/70 to-transparent'
              )}
            >
              <Link
                href={`/reels/${activeReel?.id}`}
                onClick={closeViewer}
                className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:border-white/30 hover:bg-black/50 sm:px-4 sm:text-sm'
              >
                <Maximize2 className='size-3.5 sm:size-4' aria-hidden />
                {t('view-details')}
              </Link>

              <div className='flex items-center gap-2 sm:gap-3'>
                <span className='rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white/80 tabular-nums backdrop-blur-md sm:text-xs'>
                  {formatLocaleNumber(current + 1, locale)} /{' '}
                  {formatLocaleNumber(reels.length, locale)}
                </span>
                <Dialog.Close
                  className='rounded-full bg-black/30 p-2 text-white backdrop-blur-md transition hover:bg-black/50 sm:p-2.5'
                  aria-label={t('close')}
                >
                  <X className='size-4 sm:size-5' aria-hidden />
                </Dialog.Close>
              </div>
            </div>

            {/* Mobile: full-screen vertical feed */}
            {isMobile ? (
              <Carousel
                key='reels-viewer-vertical'
                setApi={setApi}
                orientation='vertical'
                opts={{
                  align: 'start',
                  loop: false,
                  startIndex: initialIndex,
                  watchDrag: true,
                }}
                className='size-full [&>div]:h-dvh'
              >
                <CarouselContent className='mt-0 h-dvh flex-col'>
                  {reels.map((reel, index) => (
                    <CarouselItem
                      key={reel.id}
                      className='h-dvh basis-full pt-0'
                    >
                      <ReelsViewerSlide
                        reel={reel}
                        isActive={index === current}
                        isMobile
                        onNavigate={closeViewer}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              /* Desktop: centered reel + side gutters for navigation */
              <div className='grid size-full grid-cols-[minmax(72px,1fr)_auto_minmax(72px,1fr)] items-center'>
                <button
                  type='button'
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className={cn(
                    'group flex h-full items-center justify-center transition-colors',
                    canScrollPrev
                      ? 'cursor-pointer hover:bg-white/[0.04]'
                      : 'cursor-default opacity-30'
                  )}
                  aria-label={t('previous')}
                >
                  <span className='flex flex-col items-center gap-2 text-white/50 transition group-hover:text-white/90'>
                    <ChevronLeft className='size-8 rtl:rotate-180' aria-hidden />
                    <span className='hidden text-[11px] font-medium tracking-wide uppercase lg:block'>
                      {t('previous')}
                    </span>
                  </span>
                </button>

                <div className='flex h-full max-h-dvh items-center justify-center px-2 py-16'>
                  <Carousel
                    key='reels-viewer-horizontal'
                    setApi={setApi}
                    orientation='horizontal'
                    opts={{
                      align: 'center',
                      loop: false,
                      startIndex: initialIndex,
                    }}
                    className='h-full w-[min(420px,calc((100dvh-8rem)*9/16))]'
                  >
                    <CarouselContent className='ms-0 h-full'>
                      {reels.map((reel, index) => (
                        <CarouselItem
                          key={reel.id}
                          className='flex h-full basis-full items-center justify-center ps-0'
                        >
                          <ReelsViewerSlide
                            reel={reel}
                            isActive={index === current}
                            isMobile={false}
                            onNavigate={closeViewer}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>

                <button
                  type='button'
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className={cn(
                    'group flex h-full items-center justify-center transition-colors',
                    canScrollNext
                      ? 'cursor-pointer hover:bg-white/[0.04]'
                      : 'cursor-default opacity-30'
                  )}
                  aria-label={t('next')}
                >
                  <span className='flex flex-col items-center gap-2 text-white/50 transition group-hover:text-white/90'>
                    <ChevronRight className='size-8 rtl:rotate-180' aria-hidden />
                    <span className='hidden text-[11px] font-medium tracking-wide uppercase lg:block'>
                      {t('next')}
                    </span>
                  </span>
                </button>
              </div>
            )}

            {/* Keyboard hint — desktop only */}
            {!isMobile ? (
              <p className='pointer-events-none absolute inset-x-0 bottom-3 z-30 text-center text-[11px] text-white/30'>
                {t('keyboard-hint-desktop')}
              </p>
            ) : (
              <p className='pointer-events-none absolute inset-x-0 bottom-3 z-30 text-center text-[11px] text-white/35'>
                {t('swipe-hint-vertical')}
              </p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ReelsViewer;
