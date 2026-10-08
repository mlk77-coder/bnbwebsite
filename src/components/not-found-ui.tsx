import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import PageWrapper from './page-wrapper';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { Undo2 } from 'lucide-react';

const NotFoundUi = async () => {
  const t = await getTranslations('errors');
  const tGlobal = await getTranslations();

  return (
    <PageWrapper className='flex flex-1 flex-col items-center justify-center'>
      <div className='space-y-2 text-center'>
        <h1 className='text-primary text-3xl font-bold sm:text-4xl md:text-5xl'>
          {t('not-found-title')}
        </h1>
        <p className='text-primary text-lg md:text-2xl'>
          {t('not-found-subtitle')}
        </p>
      </div>
      <Link
        className={cn(buttonVariants({ size: 'lg' }), 'uppercase')}
        href='/'
      >
        <Undo2 className='me-1 size-5' />
        {tGlobal('return-home')}
      </Link>
    </PageWrapper>
  );
};

export default NotFoundUi;
