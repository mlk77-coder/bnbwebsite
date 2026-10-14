import { HeroSlider } from './hero-slider';
import { CollectionPanel } from './collection-panel';
import type { HeroSectionProps } from './hero-section-types';
import SectionWrapper from '@/components/section-wrapper';
import {
  buildCollectionPanels,
  sortByLowestPrice,
  sortByMostLiked,
} from '@/features/home/lib/collection-panels';
import { PRODUCT_COLLECTION_SEE_MORE } from '@/features/product-collections';
import { horizontalRailClassName } from '@/components/horizontal-rail.constants';
import { cn } from '@/lib/utils';

const LG_GRID_COLS: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
};

export function HeroSection({
  content,
  trendyProducts,
  saleProducts,
  latestProducts,
  mostViewedProducts,
  featuredProducts,
}: HeroSectionProps) {
  const allProducts = [
    ...featuredProducts,
    ...saleProducts,
    ...latestProducts,
    ...trendyProducts,
    ...mostViewedProducts,
  ];

  const panels = buildCollectionPanels([
    {
      variant: 'sale',
      products: saleProducts,
      href: PRODUCT_COLLECTION_SEE_MORE['on-sale'],
    },
    {
      variant: 'latest',
      products: latestProducts,
      href: PRODUCT_COLLECTION_SEE_MORE.latest,
    },
    {
      variant: 'trendy',
      products: trendyProducts,
      href: PRODUCT_COLLECTION_SEE_MORE.featured,
    },
    {
      variant: 'most-viewed',
      products: mostViewedProducts,
      href: PRODUCT_COLLECTION_SEE_MORE['most-viewed'],
    },
    { variant: 'lowest-price', products: sortByLowestPrice(allProducts) },
    { variant: 'most-loved', products: sortByMostLiked(allProducts) },
  ]);

  return (
    <SectionWrapper className='space-y-4 pt-3 pb-0 md:pt-4 md:pb-0 lg:space-y-5 lg:pt-5 lg:pb-0'>
      <HeroSlider content={content} />

      {panels.length > 0 ? (
        <div
          className={cn(
            horizontalRailClassName,
            'md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:scroll-px-0',
            LG_GRID_COLS[panels.length]
          )}
        >
          {panels.map((panel, index) => (
            <CollectionPanel key={panel.variant} {...panel} index={index} />
          ))}
        </div>
      ) : null}
    </SectionWrapper>
  );
}

export default HeroSection;
