import type {
  HomePageCategory,
  HomePageContent,
  HomePageDiscount,
} from '@/types/home';
import type { ProductCard } from '@/types/products';

export type HeroSectionProps = {
  content: HomePageContent;
  bestSellingProducts: ProductCard[];
  highlightedProducts: ProductCard[];
  discounts: HomePageDiscount | null;
  /** First four categories for the hero “Our collections” card */
  collectionsCategories: HomePageCategory[];
};
