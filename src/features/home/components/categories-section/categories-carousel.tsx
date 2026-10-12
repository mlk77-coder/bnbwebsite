'use client';

import CategoryCirclesCarousel from '@/components/category-circles-carousel';
import SectionWrapper from '@/components/section-wrapper';
import { HOME_SECTION_SPACING } from '@/features/home/constants';
import type { HomePageCategory } from '@/types/home';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type CategoriesCarouselProps = {
  categories: HomePageCategory[];
};

export const CategoriesCarousel: FC<CategoriesCarouselProps> = ({
  categories,
}) => {
  const t = useTranslations();

  if (!categories.length) return null;

  return (
    <SectionWrapper className={HOME_SECTION_SPACING}>
      <CategoryCirclesCarousel
        items={categories}
        title={t('hero-shop-by-category')}
        description={t('explore-our-selection-description')}
      />
    </SectionWrapper>
  );
};

export default CategoriesCarousel;
