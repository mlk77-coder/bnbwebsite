import { getReelDetails } from '@/features/reels/api/get-reel-details';
import { getSiteBranding } from '@/lib/page-metadata';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type PropsType = {
  locale: string;
  id: string;
};

export default async function ReelPageMetadata(
  params: PropsType
): Promise<Metadata> {
  const { locale, id } = params;
  const response = await getReelDetails(id, locale);
  if (!response.ok) return {};

  const reel = response.data;
  const t = await getTranslations('reels');
  const { siteName } = await getSiteBranding();
  const title = reel.caption || t('reel-fallback-title');
  const description = reel.caption || t('meta-fallback-description');
  const base = process.env.NEXT_PUBLIC_LOCAL_URL;

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${base}/${locale}/reels/${id}`,
      languages: {
        en: `${base}/en/reels/${id}`,
        ar: `${base}/ar/reels/${id}`,
      },
    },
    openGraph: {
      url: `${base}/${locale}/reels/${id}`,
      title,
      description,
      siteName,
      locale,
      images: [reel.thumbnailUrl],
      type: 'video.other',
    },
  };
}
