import { SITE_BRAND_NAME } from '@/lib/site-branding';
import type { Metadata } from 'next';
import 'react-photo-view/dist/react-photo-view.css';
import { getLangDir } from 'rtl-detect';
import HtmlBody from './_components/html-body';
import HtmlHead from './_components/html-head';
import './globals.css';

type PropsType = Readonly<{
  children: React.ReactNode;
  loginSheet: React.ReactNode;
  registerSheet: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata(props: PropsType): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  return {
    title: {
      default: SITE_BRAND_NAME,
      template: `%s | ${SITE_BRAND_NAME}`,
    },
    authors: [
      { name: SITE_BRAND_NAME, url: process.env.NEXT_PUBLIC_LOCAL_URL },
    ],
    creator: 'Ibrahim',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_LOCAL_URL}/${locale}`,
    },
    category: 'E-commerce | Fashion, Beauty, and Home Essentials',
    applicationName: SITE_BRAND_NAME,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_LOCAL_URL || 'https://www.bnb-stores.com/'
    ),
    abstract:
      'Luxury fashion reimagined. Exquisite designs for the family. Shop now!',
    classification: 'E-commerce | Fashion, Beauty, and Home Essentials',
    generator: SITE_BRAND_NAME,
    publisher: SITE_BRAND_NAME,
    keywords: [
      'BNB Store',
      'bnb store',
      'BNB shop',
      'bnb shop',
      'BNB online',
      'bnb online store',

      'متجر BNB',
      'بي ان بي ستور',
      'تسوق BNB',

      'luxury fashion',
      'luxury brand',
      'affordable luxury',
      'designer handbags',
      'organic skincare',
      'smart home devices',
      "men's fashion",
      "women's fashion",
      "kids' clothing",
      'gifts for her',
      'gifts for him',
      'home decor',
      'travel accessories',
      'fast shipping',
      'free delivery',
      'cash on delivery',
      'summer collection',
      'winter sale',
      'black friday deals',
      'ramadan offers',
      'high-quality products',
      'trendy apparel',
      'elegant style',
      'online shopping',
      'lifestyle store',
      'luxury shopping experience',
      'fashionable outfits',
      'modern accessories',
      'exclusive deals',
      'premium quality',
      'authentic brands',
      'beauty essentials',
      'skincare routine',
      'makeup products',
      'fragrances',
      'luxury watches',
      'fashion trends',
      'boutique shopping',
      'exclusive collections',
      'handmade products',
      'eco-friendly products',
      'minimalist design',
      'gift ideas',
      'wedding gifts',
      'luxury homeware',
      'luxury lifestyle',
      'stylish outfits',
      'on-sale items',
      'seasonal promotions',
      'discounted luxury',
      'exclusive fashion deals',
      'shopping spree',
      'personalized gifts',
      'fashion inspiration',
      'online boutique',
      'wardrobe essentials',
      'fashionable accessories',
      'luxury decor',
      'designer wear',
      'luxury bags',
      'shop from home',
      'luxury gifting',

      'سوريا',
      'لبنان',
      'امارات',
      'التسوق عبر الإنترنت',
      'توصيل مجاني',
      'الدفع عند الاستلام',
      'أزياء راقية',
      'ماركات عالمية',
      'منتجات فاخرة',
      'حقائب يد',
      'أجهزة منزلية ذكية',
      'أزياء رجالية',
      'أزياء نسائية',
      'ملابس الأطفال',
      'إكسسوارات عصرية',
      'هدايا فاخرة',
      'منتجات التجميل',
      'العناية بالبشرة',
      'العطور',
      'أزياء موسمية',
      'عروض الجمعة السوداء',
      'عروض رمضان',
      'أفكار هدايا',
      'تصاميم حديثة',
      'منتجات صديقة للبيئة',
      'منتجات مصنوعة يدويًا',
      'مستلزمات المنزل',
      'ستايل وأناقة',
      'أزياء مميزة',
      'إلهام الموضة',
      'ديكور فاخر',
      'متجر إلكتروني',
      'تسوق الآن',
      'تجربة تسوق فاخرة',
      'أزياء بجودة عالية',
      'ملابس عصرية',
      'إكسسوارات فاخرة',
      'منتجات للعناية بالجمال',
      'منتجات أساسية',
      'هدايا شخصية',
      'منتجات عالية الجودة',
    ],
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      rating: 'General',
    },
  };
}

export default async function RootLayout(props: PropsType) {
  const { locale } = await props.params;
  const direction = getLangDir(locale);
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <HtmlHead />
      <body className="bg-background flex min-h-screen w-full flex-col items-start justify-start antialiased">
        <HtmlBody>
          {props.children}
          {props.loginSheet}
          {props.registerSheet}
        </HtmlBody>
      </body>
    </html>
  );
}
