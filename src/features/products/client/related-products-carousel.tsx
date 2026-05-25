'use client';

import { FC, useEffect, useRef } from 'react';
import ProductCard from '@/components/product-card/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard as ProductCardType } from '@/types/products';
import { useRelatedProducts } from '@/features/products/client/hooks/use-related-products';
import Loader from '@/components/ui/loader';
import useRelatedProductsStore from '@/store/use-related-product-store';

type PropsType = {
  id: string;
  locale: string;
  initialProducts: ProductCardType[];
  totalPages: number;
};

const RelatedProductsCarousel: FC<PropsType> = ({
  id,
  locale,
  initialProducts,
  totalPages,
}) => {
  const { products, loading, hasMore, loadMore } = useRelatedProducts(
    id,
    locale,
    initialProducts,
    totalPages
  );
  const observerTarget = useRef(null);
  const setProductsList = useRelatedProductsStore(
    state => state.setProductsList
  );

  useEffect(() => {
    setProductsList(initialProducts);
  }, [initialProducts, setProductsList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  return (
    <Carousel opts={{ align: 'start' }}>
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem
            key={index}
            className='basis-1/2 md:basis-1/3 lg:basis-1/4'
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
        {hasMore && (
          <CarouselItem
            ref={observerTarget}
            className='basis-1/2 md:basis-1/3 lg:basis-1/4'
          >
            {loading ? (
              <div className='size-full flex justify-center items-center'>
                <Loader className='text-primary' variant='ring' size='xl' />
              </div>
            ) : null}
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default RelatedProductsCarousel;
