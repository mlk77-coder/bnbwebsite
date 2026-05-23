import type { HomePageContent } from '@/types/home';

const HERO_SLIDES = [
  { id: 101, url: '/hero-img1.jpg' },
  { id: 102, url: '/hero-img2.jpg' },
  { id: 103, url: '/hero-img3.jpg' },
  { id: 104, url: '/hero-img4.jpg' },
] as const;

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
  media_urls: HERO_SLIDES.map(slide => ({
    web: { id: slide.id, url: slide.url },
    mobile: { id: slide.id + 900, url: slide.url },
  })),
};

export const heroFallbackSlides = HERO_SLIDES.map(slide => ({
  id: slide.id,
  image: slide.url,
  mobileImage: slide.url,
  alt: '',
}));
