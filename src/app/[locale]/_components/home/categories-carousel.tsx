'use client';

import { useTranslations } from 'next-intl';
import CategoryCirclesCarousel from '@/components/category-circles-carousel';
import { HomePageCategory } from '@/types/home';

interface CategoriesCarouselProps {
  categories: HomePageCategory[];
}

export function CategoriesCarousel({ categories }: CategoriesCarouselProps) {
  const t = useTranslations();

  return (
    <CategoryCirclesCarousel
      items={categories}
      title={t('hero-shop-by-category')}
      description={t('explore-our-selection-description')}
    />
  );
}

export default CategoriesCarousel;
