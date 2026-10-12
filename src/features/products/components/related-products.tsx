import { FC, Suspense } from 'react';
import SectionWrapper from '@/components/section-wrapper';
import { fetcher } from '@/lib/fetcher';
import { GetProductsResponse } from '@/types/products';
import { getLocale, getTranslations } from 'next-intl/server';
import RelatedProductsCarousel from '@/features/products/client/related-products-carousel';
import { ProductGridSkeleton } from '@/components/skeletons/product-skeletons';

type PropsType = {
  id: string;
};

const RelatedProducts: FC<PropsType> = async ({ id }) => {
  try {
    const t = await getTranslations();
    const locale = await getLocale();
    const response = await fetcher<GetProductsResponse>(
      `products/${id}/similar?page=1`,
      locale
    );
    if (!response.ok) return null;
    const initialProducts = response.data.products;
    const totalPages = Math.floor(response.data.pagination.total / 15);

    if (initialProducts.length === 0) return null;
    return (
      <Suspense
        fallback={
          <SectionWrapper className='space-y-10'>
            <h2 className='w-full border-b pb-2 text-lg sm:text-xl font-bold text-primary ltr:tracking-wider'>
              {t('related-products')}
            </h2>
            <ProductGridSkeleton
              count={4}
              className='lg:grid-cols-4 xl:grid-cols-4'
            />
          </SectionWrapper>
        }
      >
        <SectionWrapper className='space-y-10'>
          <h2 className='w-full border-b pb-2 text-lg sm:text-xl font-bold text-primary ltr:tracking-wider'>
            {t('related-products')}
          </h2>
          <RelatedProductsCarousel
            id={id}
            locale={locale}
            initialProducts={initialProducts}
            totalPages={totalPages}
          />
        </SectionWrapper>
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching initial related products:', error);
    return null;
  }
};

export default RelatedProducts;
