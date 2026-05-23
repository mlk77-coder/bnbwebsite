import { buildPageMetadata } from '@/lib/page-metadata';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type PropsType = {
  params: Promise<{ locale: string }>;
};

export default async function HomePageMetaData({
  params,
}: PropsType): Promise<Metadata> {
  const { locale } = await params;
  const tHome = await getTranslations('home');
  const t = await getTranslations();

  const metadata = await buildPageMetadata({
    locale,
    title: tHome('meta-title'),
    description: t('meta-description'),
  });

  return {
    ...metadata,
    icons: {
      icon: '/favicon/favicon.ico',
      apple: '/favicon/apple-touch-icon.png',
      shortcut: '/favicon/apple-touch-icon.png',
    },
    other: {
      rating: 'General',
    },
  };
}
