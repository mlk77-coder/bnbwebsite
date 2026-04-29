import type { HomePageContent } from '@/types/home';

/**
 * Unsplash — same pattern as `hero-slider` (`?auto=format&fit=crop&w=…&q=90`).
 * Slugs below were checked to return HTTP 200 (IDs rotate off CDN occasionally; replace if needed).
 */
const u = (photoSlug: string, w = 1600) =>
  `https://images.unsplash.com/${photoSlug}?auto=format&fit=crop&w=${w}&q=90`;

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
