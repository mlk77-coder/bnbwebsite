import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { RegisterPage } from '@/features/auth';
import {
  buildAlternateLanguages,
  buildAuthPageMetadata,
} from '@/lib/page-metadata';
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
    'create-a-new-account-to-start-shopping-effortlessly-manage-your-orders-and-enjoy-a-personalized-and-secure-experience-on-our-platform'
  );

  return buildAuthPageMetadata({
    locale,
    title: t('auth.sign-up'),
    description,
    path: '/register',
    languages: buildAlternateLanguages('/register'),
  });
}

const Page: FC<PropsType> = () => {
  return (
    <PageWrapper className='flex-1 pb-8'>
      <SectionWrapper className='max-w-5xl'>
        <RegisterPage hardLink={true} />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default Page;
