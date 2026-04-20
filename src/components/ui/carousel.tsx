'use client';

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ComponentProps,
  createContext,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
      api?.scrollNext();
    }, [api]);

    useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);

      return () => {
        api?.off('select', onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          dir='ltr'
          className={cn('group/container relative', className)}
          role='region'
          aria-roledescription='carousel'
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className='overflow-hidden'>
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ms-2' : '-mt-2 flex-col',
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role='group'
        aria-roledescription='slide'
        className={cn(
          'relative z-10 min-w-0 shrink-0 grow-0 basis-full',
          orientation === 'horizontal' ? 'ps-2' : 'pt-2',
          className
        )}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  if (!canScrollPrev) return null;

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'bg-primary text-background hover:bg-primary hover:text-background absolute size-8 border-transparent transition-opacity duration-300 md:invisible md:size-10 md:opacity-0 md:group-hover/container:visible md:group-hover/container:opacity-100 lg:size-12',
        orientation === 'horizontal'
          ? 'top-1/2 left-0 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className='size-8' />
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  if (!canScrollNext) return null;

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'bg-primary text-background hover:bg-primary hover:text-background absolute size-8 border-transparent transition-opacity duration-300 md:invisible md:size-10 md:opacity-0 md:group-hover/container:visible md:group-hover/container:opacity-100 lg:size-12',
        orientation === 'horizontal'
          ? 'end-0 top-1/2 -translate-y-1/2'
          : 'start-1/2 -bottom-12 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className='size-8' />
      <span className='sr-only'>Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';

const CarouselPreviousWithoutHover = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  if (!canScrollPrev) return null;

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'bg-primary text-background hover:bg-primary hover:text-background absolute size-10 border-transparent',
        orientation === 'horizontal'
          ? '-start-12 top-1/2 -translate-y-1/2'
          : 'start-1/2 -top-12 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className='size-6' />
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
});
CarouselPreviousWithoutHover.displayName = 'CarouselPreviousWithoutHover';

const CarouselNextWithoutHover = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  if (!canScrollNext) return null;

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'bg-primary text-background hover:bg-primary hover:text-background absolute size-10 border-transparent',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className='size-6' />
      <span className='sr-only'>Next slide</span>
    </Button>
  );
});
CarouselNextWithoutHover.displayName = 'CarouselNextWithoutHover';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselNextWithoutHover,
  CarouselPreviousWithoutHover,
  type CarouselApi,
};
