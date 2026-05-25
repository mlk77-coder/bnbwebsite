import { buildAlternateLanguages, buildPageMetadata } from '@/lib/page-metadata';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type PropsType = {
  params: Promise<{ locale: string }>;
};

export default async function CheckoutPageMetaData({
  params,
}: PropsType): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();

  return buildPageMetadata({
    locale,
    title: t('checkout-title'),
    description: t('checkout-description'),
    path: '/checkout',
    languages: buildAlternateLanguages('/checkout'),
  });
}
