import { SALE_SLUG_COPY } from '@/features/sale/lib/sale-category-copy';
import type { Category } from '@/types/categories';

const NAV_SALE_SLUGS = [
  'woman',
  'man',
  'kids',
  'home',
  'beauty',
  'travel',
] as const;

type SaleSlug = (typeof NAV_SALE_SLUGS)[number];

const SALE_TITLE_KEYS: Record<SaleSlug, keyof (typeof SALE_SLUG_COPY)['en']> = {
  woman: 'woman',
  man: 'man',
  kids: 'kids',
  home: 'home',
  beauty: 'beauty',
  travel: 'travel',
};

const SALE_DESCRIPTION_KEYS: Record<
  SaleSlug,
  keyof (typeof SALE_SLUG_COPY)['en']
> = {
  woman: 'womanDescription',
  man: 'manDescription',
  kids: 'kidsDescription',
  home: 'homeDescription',
  beauty: 'beautyDescription',
  travel: 'travelDescription',
};

/** Sale submenu items for navbar/mobile nav (localized via SALE_SLUG_COPY). */
export function getNavSaleCategories(locale: string): Category[] {
  const copy =
    SALE_SLUG_COPY[locale as keyof typeof SALE_SLUG_COPY] ?? SALE_SLUG_COPY.en;

  return NAV_SALE_SLUGS.map((slug, index) => ({
    id: 9_000 + index,
    name: String(copy[SALE_TITLE_KEYS[slug]]),
    description: String(copy[SALE_DESCRIPTION_KEYS[slug]]),
    slug,
    image: null,
    parent_id: null,
    parent: null,
    order: index,
    is_active: true,
    products_count: 0,
    subcategories: [],
  }));
}
