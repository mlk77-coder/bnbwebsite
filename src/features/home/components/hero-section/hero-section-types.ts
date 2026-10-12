import type { HomePageContent } from '@/types/home';
import type { ProductCard } from '@/types/products';

export type HeroSectionProps = {
  content: HomePageContent;
  trendyProducts: ProductCard[];
  saleProducts: ProductCard[];
  latestProducts: ProductCard[];
  mostViewedProducts: ProductCard[];
  featuredProducts: ProductCard[];
};
