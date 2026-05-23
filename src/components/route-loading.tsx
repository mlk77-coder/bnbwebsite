import { LetterPullup } from '@/components/letter-pullup';
import PageWrapper from '@/components/page-wrapper';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

const RouteLoading = async () => {
  const t = await getTranslations('home');

  return (
    <PageWrapper className='mx-auto flex max-w-3xl flex-col items-center justify-center'>
      <Image
        src='/logo-light.png'
        width={300}
        height={300}
        alt={t('logo-alt')}
      />
      <LetterPullup
        words={t('site-name')}
        className='text-primary font-serif text-6xl'
      />
    </PageWrapper>
  );
};

export default RouteLoading;
