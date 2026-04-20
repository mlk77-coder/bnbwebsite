import type { HomePageCategory, HomePageContent, HomePageDiscount } from '@/types/home';
import type { ProductCard } from '@/types/products';

/**
 * Unsplash — same pattern as `hero-slider` (`?auto=format&fit=crop&w=…&q=90`).
 * Slugs below were checked to return HTTP 200 (IDs rotate off CDN occasionally; replace if needed).
 */
const u = (photoSlug: string, w = 1600) =>
  `https://images.unsplash.com/${photoSlug}?auto=format&fit=crop&w=${w}&q=90`;

const colors: ProductCard['product_color_attributes'] = [];

function product(p: {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string;
  has_discount?: 0 | 1;
  price_after_sale?: null | number;
}): ProductCard {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    image: p.image,
    price: p.price,
    created_at: '2026-01-01T00:00:00.000Z',
    quantity: 24,
    has_discount: p.has_discount ?? 0,
    price_after_sale: p.price_after_sale ?? null,
    alternative_image: p.image,
    product_color_attributes: colors,
  };
}

/** Hero carousel — wide, high‑res (boutique, editorial, home, lifestyle) */
const SLIDE_1 = u('photo-1441986300917-64674bd600d8', 2400);
const SLIDE_2 = u('photo-1607082348824-0a96f2a4b9da', 2400);
const SLIDE_3 = u('photo-1469334031218-e382a71b716b', 2400);
const SLIDE_4 = u('photo-1616486338812-3dadae4b4ace', 2400);

export const heroDummyContent: HomePageContent = {
  id: 1,
  text: [
    { ar: 'أناقة تليق بك', en: 'Curated for you' },
    { ar: 'تسوق بثقة', en: 'Shop with confidence' },
  ],
  links: [
    {
      url: '/sale',
      name: { ar: 'التخفيضات', en: 'Sale' },
    },
  ],
  media_urls: [
    {
      web: { id: 101, url: SLIDE_1 },
      mobile: { id: 1011, url: u('photo-1441986300917-64674bd600d8', 1200) },
    },
    {
      web: { id: 102, url: SLIDE_2 },
      mobile: { id: 1021, url: u('photo-1607082348824-0a96f2a4b9da', 1200) },
    },
    {
      web: { id: 103, url: SLIDE_3 },
      mobile: { id: 1031, url: u('photo-1469334031218-e382a71b716b', 1200) },
    },
    {
      web: { id: 104, url: SLIDE_4 },
      mobile: { id: 1041, url: u('photo-1616486338812-3dadae4b4ace', 1200) },
    },
  ],
};

const p1 = u('photo-1523275335684-37898b6baf30', 900);
const p2 = u('photo-1542291026-7eec264c27ff', 900);
const p3 = u('photo-1591047139829-d91aecb6caea', 900);
const p4 = u('photo-1553062407-98eeb64c6a62', 900);
const p5 = u('photo-1578662996442-48f60103fc96', 900);
const p6 = u('photo-1505740420928-5e560c06d30e', 900);
const p7 = u('photo-1491553895911-0055eca6402d', 900);
const p8 = u('photo-1572635196237-14b3f281503f', 900);
const p9 = u('photo-1594938291221-94f18cbb5660', 900);

export const heroDummyHighlightedProducts: ProductCard[] = [
  product({
    id: 9001,
    name: 'Minimal Gold Watch',
    slug: 'dummy-minimal-gold-watch',
    image: p1,
    price: '189.00 $',
  }),
  product({
    id: 9002,
    name: 'Urban Running Sneakers',
    slug: 'dummy-urban-running-sneakers',
    image: p2,
    price: '129.00 $',
    has_discount: 1,
    price_after_sale: 99,
  }),
  product({
    id: 9003,
    name: 'Wool Tailored Coat',
    slug: 'dummy-wool-tailored-coat',
    image: p3,
    price: '249.00 $',
  }),
  product({
    id: 9004,
    name: 'Leather Crossbody',
    slug: 'dummy-leather-crossbody',
    image: p4,
    price: '159.00 $',
    has_discount: 1,
    price_after_sale: 119,
  }),
  product({
    id: 9005,
    name: 'Ceramic Desk Vase',
    slug: 'dummy-ceramic-desk-vase',
    image: p5,
    price: '64.00 $',
  }),
  product({
    id: 9006,
    name: 'Wireless Studio Headphones',
    slug: 'dummy-wireless-studio-headphones',
    image: p6,
    price: '279.00 $',
  }),
];

export const heroDummyBestSellingProducts: ProductCard[] = [
  product({
    id: 9101,
    name: 'Signature Eau de Parfum',
    slug: 'dummy-signature-edp',
    image: p7,
    price: '95.00 $',
    has_discount: 1,
    price_after_sale: 72,
  }),
  product({
    id: 9102,
    name: 'Polarized Aviator Sunglasses',
    slug: 'dummy-polarized-aviators',
    image: p8,
    price: '118.00 $',
  }),
  product({
    id: 9103,
    name: 'Silk Evening Scarf',
    slug: 'dummy-silk-evening-scarf',
    image: p9,
    price: '48.00 $',
  }),
  product({
    id: 9104,
    name: 'Cashmere Crewneck',
    slug: 'dummy-cashmere-crewneck',
    image: p3,
    price: '198.00 $',
    has_discount: 1,
    price_after_sale: 159,
  }),
  product({
    id: 9105,
    name: 'Espresso Glass Mugs (Set of 2)',
    slug: 'dummy-espresso-glass-mugs',
    image: p5,
    price: '36.00 $',
  }),
  product({
    id: 9106,
    name: 'Travel Dopp Kit',
    slug: 'dummy-travel-dopp-kit',
    image: p1,
    price: '54.00 $',
  }),
];

export const heroDummyDiscounts: HomePageDiscount = {
  id: 1,
  name: 'Winter Luxe Sale',
  slug: 'winter-luxe',
  description: 'Up to 40% on selected beauty & accessories.',
  image: u('photo-1607082348824-0a96f2a4b9da', 1200),
  products: heroDummyBestSellingProducts.slice(0, 4),
};

export const heroDummyCollectionsCategories: HomePageCategory[] = [
  {
    id: 8001,
    name: 'العناية الشخصية',
    slug: 'personal-care',
    image: u('photo-1570172619644-dfd03ed5d881', 900),
    parents_slugs: [],
  },
  {
    id: 8002,
    name: 'أدوات منزلية',
    slug: 'home-living',
    image: u('photo-1616486338812-3dadae4b4ace', 900),
    parents_slugs: [],
  },
  {
    id: 8003,
    name: 'مستحضرات تجميل',
    slug: 'beauty',
    image: u('photo-1522338242992-e1a54906a8da', 900),
    parents_slugs: [],
  },
  {
    id: 8004,
    name: 'ملابس رجالي',
    slug: 'menswear',
    image: u('photo-1503342217505-b0a15ec3261c', 900),
    parents_slugs: [],
  },
];
