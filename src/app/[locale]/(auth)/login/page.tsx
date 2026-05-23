import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { LoginPage } from '@/features/auth';
import {
  buildAlternateLanguages,
  buildAuthPageMetadata,
} from '@/lib/page-metadata';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { FC } from 'react';

type PropsType = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PropsType): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  const description = t(
    'log-in-to-your-account-to-manage-orders-view-purchase-history-and-enjoy-a-seamless-and-secure-shopping-experience'
  );

  return buildAuthPageMetadata({
    locale,
    title: t('auth.sign-in'),
    description,
    path: '/login',
    languages: buildAlternateLanguages('/login'),
  });
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
