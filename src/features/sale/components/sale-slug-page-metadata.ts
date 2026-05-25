import { SALE_SLUG_COPY } from '@/features/sale/lib/sale-category-copy';
import { buildAlternateLanguages, buildPageMetadata } from '@/lib/page-metadata';
import type { Metadata } from 'next';

type PropsType = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function SaleSlugPageMetaData({
  params,
}: PropsType): Promise<Metadata> {
  const { locale, slug } = await params;
  const copy =
    SALE_SLUG_COPY[locale as keyof typeof SALE_SLUG_COPY] ?? SALE_SLUG_COPY.en;
  const slugKey = slug as keyof typeof copy;
  const title =
    slugKey in copy && typeof copy[slugKey] === 'string'
      ? (copy[slugKey] as string)
      : copy.sale;
  const descriptionKey = `${slug}Description` as keyof typeof copy;
  const description =
    descriptionKey in copy && typeof copy[descriptionKey] === 'string'
      ? (copy[descriptionKey] as string)
      : copy.saleDescription;

  return buildPageMetadata({
    locale,
    title,
    description,
    path: `/sale/${slug}`,
    languages: buildAlternateLanguages(`/sale/${slug}`),
  });
}
