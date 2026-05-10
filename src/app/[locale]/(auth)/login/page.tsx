import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { FC } from 'react';
import { LoginPage } from '@/features/auth';
import { cookies } from 'next/headers';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type PropsType = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PropsType): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t('auth.sign-in'),
    description: t(
      'log-in-to-your-account-to-manage-orders-view-purchase-history-and-enjoy-a-seamless-and-secure-shopping-experience'
    ),
    openGraph: {
      type: 'website',
      title: 'BNB Store',
      description: t(
        'log-in-to-your-account-to-manage-orders-view-purchase-history-and-enjoy-a-seamless-and-secure-shopping-experience'
      ),
      siteName: 'BNB Store',
      locale: 'en',
      url: process.env.NEXT_PUBLIC_LOCAL_URL,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_LOCAL_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: 'BNB Store Logo',
        },
      ],
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_LOCAL_URL,
      languages: {
        ar: `${process.env.NEXT_PUBLIC_LOCAL_URL}/ar/login`,
        en: `${process.env.NEXT_PUBLIC_LOCAL_URL}/en/login`,
      },
    },

    twitter: {
      card: 'summary_large_image',
      title: 'BNB Store',
      description: t(
        'log-in-to-your-account-to-manage-orders-view-purchase-history-and-enjoy-a-seamless-and-secure-shopping-experience'
      ),
      images: [`${process.env.NEXT_PUBLIC_LOCAL_URL}/logo-light.png`],
      creator: '@Ibrahim',
      site: '@Ibrahim',
    },
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

const Page: FC<PropsType> = async () => {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('x-user-session')?.value || '';
  return (
    <PageWrapper className='flex-1 pb-8'>
      <SectionWrapper className='max-w-5xl'>
        <LoginPage userToken={userToken} hardLink={true} />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default Page;
