import { getProductDetails } from '@/features/products/api/get-product-details';
import { cleanDescription } from '@/lib/utils';
import { htmlToText } from 'html-to-text';
import { Metadata } from 'next';

type PropsType = {
  locale: string;
  slug: string;
};

export default async function ProductPageMetaData(
  params: PropsType
): Promise<Metadata> {
  const { locale, slug } = params;
  const response = await getProductDetails(slug);
  if (!response.ok) return {};

  const product = response.data;

  return {
    title: product.name,
    description: htmlToText(cleanDescription(product.description || '')),
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'standard',
      'max-video-preview': -1,
      notranslate: false,
      noimageindex: false,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_LOCAL_URL}/${locale}/products/${slug}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/products/${slug}`,
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/products/${slug}`,
      },
    },
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/${locale}/products/${slug}`,
      title: product.name,
      description: htmlToText(cleanDescription(product.description || '')),
      siteName: 'BNB Store',
      locale,
      images: [product.image || ''],
    },
    other: {
      'og:type': 'product',
      'product:price:amount': String(product.price),
      'product:price:currency': 'USD',
      'product:condition': 'new',
      'product:category': product?.category?.name || '',
      'og:availability': product.is_available ? 'instock' : 'oos',
    },
  };
}
