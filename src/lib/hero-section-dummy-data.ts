import type {
  HomePageCategory,
  HomePageContent,
  HomePageDiscount,
} from '@/types/home';
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

/** Hero carousel — wide, high‑res: fashion, home, beauty, lifestyle, tech */
const SLIDE_1 = u('photo-1616486338812-3dadae4b4ace', 2400); // Home & Living elegant interior
const SLIDE_2 = u('photo-1596462502278-27bfdc403348', 2400); // Beauty & cosmetics
const SLIDE_3 = u('photo-1556906781-9a412961c28c', 2400); // Sneakers / footwear
const SLIDE_4 = u('photo-1522338242992-e1a54906a8da', 2400); // Skincare / self-care

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
      mobile: { id: 1011, url: u('photo-1616486338812-3dadae4b4ace', 1200) },
    },
    {
      web: { id: 102, url: SLIDE_2 },
      mobile: { id: 1021, url: u('photo-1596462502278-27bfdc403348', 1200) },
    },
    {
      web: { id: 103, url: SLIDE_3 },
      mobile: { id: 1031, url: u('photo-1556906781-9a412961c28c', 1200) },
    },
    {
      web: { id: 104, url: SLIDE_4 },
      mobile: { id: 1041, url: u('photo-1522338242992-e1a54906a8da', 1200) },
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

// ─── Featured Products by Category ────────────────────────────────────────────

export type FeaturedCategory = {
  id: number;
  name: string;
  slug: string;
  products: ProductCard[];
};

const fp = (id: number, name: string, slug: string, img: string, price: string, sale?: number): ProductCard =>
  product({ id, name, slug, image: u(img, 900), price, has_discount: sale ? 1 : 0, price_after_sale: sale ?? null });

export const heroDummyFeaturedCategories: FeaturedCategory[] = [
  {
    id: 1,
    name: "Women's Fashion",
    slug: 'women',
    products: [
      fp(7001, 'Floral Midi Dress',       'floral-midi-dress',       'photo-1496747611176-843222e1e57c', '89.00',  65),
      fp(7002, 'Linen Wide-Leg Trousers', 'linen-wide-leg-trousers', 'photo-1515886657613-9f3515b0c78f', '74.00'),
      fp(7003, 'Silk Wrap Blouse',        'silk-wrap-blouse',        'photo-1469334031218-e382a71b716b', '68.00',  49),
      fp(7004, 'Trench Coat',             'trench-coat',             'photo-1591047139829-d91aecb6caea', '219.00'),
      fp(7005, 'Oversized Blazer',        'oversized-blazer',        'photo-1539109136881-3be0616acf4b', '139.00', 99),
      fp(7006, 'Knit Cardigan',           'knit-cardigan',           'photo-1434389677669-e08b4cac3105', '79.00'),
      fp(7007, 'Pleated Skirt',           'pleated-skirt',           'photo-1581044777550-4cfa60707c03', '59.00',  45),
      fp(7008, 'Denim Jacket',            'denim-jacket',            'photo-1542291026-7eec264c27ff', '119.00'),
    ],
  },
  {
    id: 2,
    name: "Men's Fashion",
    slug: 'men',
    products: [
      fp(7101, 'Slim Chino Pants',        'slim-chino-pants',        'photo-1519085360753-af0119f7cbe7', '85.00'),
      fp(7102, 'Oxford Dress Shirt',      'oxford-dress-shirt',      'photo-1503342217505-b0a15ec3261c', '69.00',  52),
      fp(7103, 'Merino Wool Sweater',     'merino-wool-sweater',     'photo-1521572163474-6864f9cf17ab', '115.00'),
      fp(7104, 'Slim Fit Suit Jacket',    'slim-fit-suit-jacket',    'photo-1594938291221-94f18cbb5660', '279.00', 210),
      fp(7105, 'Classic Leather Belt',    'classic-leather-belt',    'photo-1553062407-98eeb64c6a62', '55.00'),
      fp(7106, 'Linen Summer Shirt',      'linen-summer-shirt',      'photo-1488161628813-04466f872be2', '65.00',  48),
      fp(7107, 'Athletic Joggers',        'athletic-joggers',        'photo-1491553895911-0055eca6402d', '79.00'),
      fp(7108, 'Puffer Vest',             'puffer-vest',             'photo-1434389677669-e08b4cac3105', '99.00',  74),
    ],
  },
  {
    id: 3,
    name: 'Accessories',
    slug: 'accessories',
    products: [
      fp(7201, 'Minimal Gold Watch',      'minimal-gold-watch',      'photo-1523275335684-37898b6baf30', '189.00'),
      fp(7202, 'Polarized Sunglasses',    'polarized-sunglasses',    'photo-1572635196237-14b3f281503f', '118.00', 89),
      fp(7203, 'Leather Crossbody Bag',   'leather-crossbody-bag',   'photo-1553062407-98eeb64c6a62', '159.00'),
      fp(7204, 'Silk Evening Scarf',      'silk-evening-scarf',      'photo-1594223274512-ad4803739b7c', '48.00',  35),
      fp(7205, 'Tortoise Hair Clips Set', 'tortoise-hair-clips',     'photo-1576053139778-7e32f2ae3cfd', '24.00'),
      fp(7206, 'Gold Hoop Earrings',      'gold-hoop-earrings',      'photo-1617038220319-276d3cfab638', '39.00',  29),
      fp(7207, 'Canvas Tote Bag',         'canvas-tote-bag',         'photo-1508394522741-82ac9c15ba69', '45.00'),
      fp(7208, 'Signature Eau de Parfum', 'signature-edp',           'photo-1491553895911-0055eca6402d', '95.00',  72),
    ],
  },
  {
    id: 4,
    name: 'Home & Living',
    slug: 'home-living',
    products: [
      fp(7301, 'Ceramic Desk Vase',       'ceramic-desk-vase',       'photo-1578662996442-48f60103fc96', '64.00'),
      fp(7302, 'Linen Throw Pillow',      'linen-throw-pillow',      'photo-1616486338812-3dadae4b4ace', '38.00',  28),
      fp(7303, 'Espresso Glass Mugs ×2',  'espresso-glass-mugs',     'photo-1544145945-f90425340c7e', '36.00'),
      fp(7304, 'Marble Cheese Board',     'marble-cheese-board',     'photo-1556909114-f6e7ad7d3136', '82.00',  59),
      fp(7305, 'Woven Storage Basket',    'woven-storage-basket',    'photo-1616627455735-25b716496f5c', '55.00'),
      fp(7306, 'Scented Soy Candle',      'scented-soy-candle',      'photo-1608181831718-c9e3b46cc7c7', '29.00'),
      fp(7307, 'Bamboo Serving Tray',     'bamboo-serving-tray',     'photo-1565193566173-7a0ee3dbe261', '47.00',  35),
      fp(7308, 'Terracotta Plant Pot',    'terracotta-plant-pot',    'photo-1485955900006-10f4d324d411', '33.00'),
    ],
  },
];
