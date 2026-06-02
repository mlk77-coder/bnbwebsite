import { HeroSlider } from './hero-slider';
import { QuadCard } from './quad-card';
import type { HeroSectionProps } from './hero-section-types';
import { PRODUCT_COLLECTION_SEE_MORE } from '@/features/product-collections';
import { getTranslations } from 'next-intl/server';

export async function HeroSection({
  content,
  trendyProducts,
  saleProducts,
  latestProducts,
  mostViewedProducts,
}: HeroSectionProps) {
  const t = await getTranslations();

  return (
    <section className='relative w-full'>
      <HeroSlider content={content} />

      <div className='relative z-10 -mt-24 w-full px-2.5 pb-8 sm:-mt-32 sm:px-4 sm:pb-12 lg:-mt-40 lg:px-6 xl:px-24'>
        <div className='max-w-screen-3xl mx-auto'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5'>
            <QuadCard
              variant='trendy'
              title={t('Trendy')}
              products={trendyProducts}
              seeMoreHref={PRODUCT_COLLECTION_SEE_MORE.featured}
              seeMoreLabel={t('see-more')}
            />
            <QuadCard
              variant='sale'
              title={t('sale')}
              products={saleProducts}
              seeMoreHref={PRODUCT_COLLECTION_SEE_MORE['on-sale']}
              seeMoreLabel={t('see-more')}
            />
            <QuadCard
              variant='latest'
              title={t('new-arrivals')}
              products={latestProducts}
              seeMoreHref={PRODUCT_COLLECTION_SEE_MORE.latest}
              seeMoreLabel={t('see-more')}
            />
            <QuadCard
              variant='most-viewed'
              title={t('most-viewed')}
              products={mostViewedProducts}
              seeMoreHref={PRODUCT_COLLECTION_SEE_MORE['most-viewed']}
              seeMoreLabel={t('see-more')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
