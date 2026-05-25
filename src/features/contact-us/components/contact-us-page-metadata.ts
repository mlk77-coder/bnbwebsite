import { buildAlternateLanguages, buildPageMetadata } from '@/lib/page-metadata';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type PropsType = {
  params: Promise<{ locale: string }>;
};

export default async function ContactUsPageMetaData({
  params,
}: PropsType): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();

  return buildPageMetadata({
    locale,
    title: t('contact-us.title'),
    description: t('contact-us-description'),
    path: '/contact-us',
    languages: buildAlternateLanguages('/contact-us'),
  });
}
