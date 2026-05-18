import { getReelDetails } from '@/features/reels/api/get-reel-details';
import { Metadata } from 'next';

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
  const title = reel.caption || 'Reel';
  const description = reel.caption || 'Watch this reel on BNB Store';

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_LOCAL_URL}/${locale}/reels/${id}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/reels/${id}`,
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/reels/${id}`,
      },
    },
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/${locale}/reels/${id}`,
      title,
      description,
      siteName: 'BNB Store',
      locale,
      images: [reel.thumbnailUrl],
      type: 'video.other',
    },
  };
}
