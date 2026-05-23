'use client';

import PageWrapper from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

type Props = {
  reset: () => void;
};

export function ErrorBoundaryFallback({ reset }: Props) {
  const t = useTranslations('errors');

  return (
    <PageWrapper className='flex flex-1 flex-col items-center justify-center gap-4 p-8'>
      <h2 className='text-xl font-semibold'>{t('boundary-title')}</h2>
      <Button type='button' onClick={reset}>
        {t('boundary-retry')}
      </Button>
    </PageWrapper>
  );
}
