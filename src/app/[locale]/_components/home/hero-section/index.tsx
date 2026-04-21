'use client';

import { useTranslations } from 'next-intl';
import { HeroSlider } from './hero-slider';
import { QuadCard } from './quad-card';
import { TopRatedCard } from './top-rated-card';
import type { HeroSectionProps } from './hero-section-types';

export function HeroSection({
  content,
  bestSellingProducts,
  highlightedProducts,
  discounts,
  collectionsCategories,
}: HeroSectionProps) {
  const t = useTranslations();
  const topRatedProduct =
    highlightedProducts[4] ??
    bestSellingProducts[4] ??
    highlightedProducts[1] ??
    bestSellingProducts[1] ??
    highlightedProducts[0] ??
    bestSellingProducts[0] ??
    null;
  const saleHref = discounts?.slug ? `/sale/${discounts.slug}` : '/sale';

  return (
    <section className='relative w-full'>
      <HeroSlider content={content} />

      <div className='relative z-10 -mt-24 w-full px-2.5 pb-8 sm:-mt-32 sm:px-4 sm:pb-12 lg:-mt-40 lg:px-6 xl:px-24'>
        <div className='max-w-screen-3xl mx-auto'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5'>
            <QuadCard
              variant='trendy'
              title={t('Trendy')}
              products={highlightedProducts}
              seeMoreHref='/'
              seeMoreLabel={t('see-more')}
            />
            <QuadCard
              variant='best-selling'
              title={t('best-sellers')}
              products={bestSellingProducts}
              seeMoreHref={saleHref}
              seeMoreLabel={t('see-more')}
            />
            <QuadCard
              variant='collections'
              title={t('new-arrivals')}
              categories={collectionsCategories}
              seeMoreHref='/new-arrivals'
              seeMoreLabel={t('see-more')}
            />
            <TopRatedCard product={topRatedProduct} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
