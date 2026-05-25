import { SALE_ROOT_COPY } from '@/features/sale/lib/sale-category-copy';
import { buildAlternateLanguages, buildPageMetadata } from '@/lib/page-metadata';
import type { Metadata } from 'next';

type PropsType = {
  params: Promise<{ locale: string }>;
};

export default async function SaleRootPageMetaData({
  params,
}: PropsType): Promise<Metadata> {
  const { locale } = await params;
  const copy =
    SALE_ROOT_COPY[locale as keyof typeof SALE_ROOT_COPY] ?? SALE_ROOT_COPY.en;

  return buildPageMetadata({
    locale,
    title: copy.sale,
    description: copy.saleDescription,
    path: '/sale',
    languages: buildAlternateLanguages('/sale'),
  });
}
