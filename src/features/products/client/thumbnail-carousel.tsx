'use client';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNextWithoutHover,
  CarouselPreviousWithoutHover,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FC } from 'react';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ThumbnailCarouselProps = {
  images: string[];
  name: string;
  setThumbnailApi: (api: CarouselApi) => void;
  mainApi: CarouselApi | undefined;
};

const ThumbnailCarousel: FC<ThumbnailCarouselProps> = ({
  images,
  setThumbnailApi,
  mainApi,
  name,
}) => {
  const tProduct = useTranslations('product');
  const tCarousel = useTranslations('carousel');
  const isVideo = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.endsWith(ext));
  };

  return (
    <Carousel
      opts={{ loop: true, align: 'start' }}
      setApi={setThumbnailApi}
      className='relative mx-auto w-full'
    >
      <CarouselContent className='-ml-2'>
        {images.map((src, index) => (
          <CarouselItem
            key={index}
            className='shrink-0 basis-1/4 pl-2 sm:basis-1/5 md:basis-1/6 lg:basis-1/7 xl:basis-1/8'
          >
            <Button
              variant='ghost'
              type='button'
              onClick={() => mainApi?.scrollTo(index)}
              className={cn(
                'relative aspect-square min-h-[80px] min-w-[80px] overflow-hidden rounded-lg border-2 border-transparent p-0 transition-all duration-200'
              )}
              aria-label={tCarousel('go-to-slide', { number: index + 1 })}
            >
              {isVideo(src) ? (
                <div className='relative aspect-square h-full w-full'>
                  <video
                    src={src}
                    className='h-full w-full rounded-md object-cover'
                    preload='metadata'
                    muted
                  />
                  <div className='absolute inset-0 flex items-center justify-center rounded-md bg-black/30'>
                    <Play className='h-4 w-4 fill-white text-white' />
                  </div>
                </div>
              ) : (
                <div className='relative aspect-square h-full w-full'>
                  <Image
                    src={src ?? ''}
                    alt={tProduct('thumbnail-alt', { name, index: index + 1 })}
                    fill
                    className='rounded-md object-cover'
                  />
                </div>
              )}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 3 && (
        <>
          <CarouselPreviousWithoutHover className='-left-4' />
          <CarouselNextWithoutHover className='-right-4' />
        </>
      )}
    </Carousel>
  );
};

export default ThumbnailCarousel;
