import { CarouselItem } from '@/components/ui/carousel';
import { HomePageContent } from '@/types/home';
import { getImageProps } from 'next/image';
import { FC } from 'react';
import HeroCarousel from './hero-carousel';

type PropsType = {
  content: HomePageContent;
};

const Hero: FC<PropsType> = ({ content }) => {
  const images = content.media_urls.map(media => ({
    web: media.web.url,
    mobile: media.mobile?.url || media.web.url,
  }));

  const renderImage = (webSrc: string, mobileSrc: string, index: number) => {
    const commonProps = {
      alt: `Hero Image ${index + 1}`,
      priority: index === 0,
      quality: 100,
    };
    const {
      props: { srcSet: webSrcSet },
    } = getImageProps({
      ...commonProps,
      src: webSrc,
      width: 2592,
      height: 1080,
    });
    const {
      props: { srcSet: mobileSrcSet, ...mobileRest },
    } = getImageProps({
      ...commonProps,
      src: mobileSrc,
      width: 1080,
      height: 2340,
    });

    return (
      <picture>
        <source media='(min-width: 640px)' srcSet={webSrcSet} />
        <source media='(max-width: 639px)' srcSet={mobileSrcSet} />
        <img
          {...mobileRest}
          sizes='100vw'
          className='h-full w-full object-cover'
        />
      </picture>
    );
  };

  return (
    <div className='w-full pb-4 md:pb-8 lg:pb-12'>
      {images.length === 1 ? (
        renderImage(images[0].web, images[0].mobile, 0)
      ) : (
        <HeroCarousel>
          {images.map((image, index) => (
            <CarouselItem key={index} className='size-full !px-0'>
              {renderImage(image.web, image.mobile, index)}
            </CarouselItem>
          ))}
        </HeroCarousel>
      )}
    </div>
  );
};

export default Hero;
