import PageWrapper from '@/components/page-wrapper';
import SectionWrapper from '@/components/section-wrapper';
import { ForgotPasswordForm } from '@/features/auth';
import {
  buildAlternateLanguages,
  buildAuthPageMetadata,
  getSiteBranding,
} from '@/lib/page-metadata';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { Metadata } from 'next';

type PropsType = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PropsType): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  const description = t(
    'reset-your-account-password-easily-and-securely-to-regain-access-and-continue-shopping'
  );

  return buildAuthPageMetadata({
    locale,
    title: t('auth.reset-password'),
    description,
    path: '/forgot-password',
    languages: buildAlternateLanguages('/forgot-password'),
  });
}

const ForgotPasswordPage = async () => {
  const t = await getTranslations();
  const { logoAlt } = await getSiteBranding();

  return (
    <PageWrapper className='flex-1'>
      <SectionWrapper className='max-w-screen-lg flex flex-1 items-center justify-center'>
        <div className='mx-auto flex max-w-lg flex-col items-center justify-center gap-2'>
          <Image
            src='/logo-light.png'
            priority
            width={300}
            height={300}
            className='size-20'
            alt={logoAlt}
          />
          <h2 className='my-4 text-3xl font-bold uppercase ltr:tracking-widest'>
            {t('auth.reset-password')}
          </h2>
          <p className='max-w-lg text-center text-base'>
            {t('auth.reset-password-desc')}
          </p>
          <ForgotPasswordForm />
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ForgotPasswordPage;
