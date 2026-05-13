import ProductCard from '@/components/product-card/product-card';
import SectionWrapper from '@/components/section-wrapper';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { HomePageDiscount } from '@/types/home';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

type PropsType = {
  discounts: HomePageDiscount;
};

const SalesSlider: FC<PropsType> = ({ discounts }) => {
  return (
    <SectionWrapper
      key={discounts.id}
      className={cn('gap-x-3 lg:gap-x-8', 'md:collection-invert')}
    >
      <div className='[grid-column:span_2] mb-4 space-y-4 [grid-area:header] lg:mb-8'>
        <h2 className='text-lg font-bold'>{discounts.name}</h2>
        <Link
          className='over:text-orange group inline-flex items-end justify-start gap-2 duration-100'
          href={'/'}
        >
          {/* {t("see-more")} */}
          Explore more
          <MoveRight className='size-5 duration-100 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1' />
        </Link>
      </div>
      <Link
        className='aspect-[387/346] size-full [grid-area:promo-image]'
        href={'/'}
      >
        <Image
          src={discounts.image ?? ''}
          alt={discounts.name}
          width={1000}
          height={1000}
          className='size-full object-cover hover:opacity-85'
        />
      </Link>
      <Carousel
        className={cn(
          'mx-auto h-full w-11/12 [grid-area:carousel] max-md:-mt-44 md:w-full'
        )}
        opts={{ loop: true, align: 'start' }}
      >
        <CarouselContent className='-ms-4 md:-ms-7'>
          {discounts.products.map((product, index) => (
            <CarouselItem key={index} className='ps-4 sm:basis-1/2 md:ps-7'>
              <div className='bg-background p-4'>
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionWrapper>
  );
};

export default SalesSlider;
