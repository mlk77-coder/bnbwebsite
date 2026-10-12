import RecentItemsGrid from '@/features/recent-items/client/recent-items-grid';
import { cachedGetRecentlyViewed } from '@/features/recent-items/api/get-recently-viewed';
import { getFetcherErrorMessage } from '@/lib/fetcher';
import getSession from '@/lib/get-session';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { Clock } from 'lucide-react';
import { FC } from 'react';
import { Separator } from '@/components/ui/separator';

type PropsType = {
  params: Promise<{ locale: string }>;
};

const RecentItemsPage: FC<PropsType> = async props => {
  const params = await props.params;
  const { locale } = params;

  const session = await getSession();
  const t = await getTranslations();
  if (!session?.user) {
    redirect('/login');
  }

  const recentResponse = await cachedGetRecentlyViewed(
    locale,
    session.user.access_token
  );

  if (!recentResponse.ok) {
    const detail = getFetcherErrorMessage(recentResponse.error);
    return (
      <div className='space-y-2'>
        <p className='text-muted-foreground text-sm'>
          {t('recent-items-load-error')}
        </p>
        {detail ? (
          <pre className='bg-muted text-destructive overflow-x-auto rounded-lg p-3 text-xs whitespace-pre-wrap'>
            {`API ${recentResponse.status}: ${detail}`}
          </pre>
        ) : null}
      </div>
    );
  }

  const data = recentResponse.data;

  return (
    <div className='flex size-full flex-col items-start justify-start gap-6'>
      <div className='flex items-center gap-3'>
        <span className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl'>
          <Clock className='size-5' />
        </span>
        <div>
          <h2 className='text-primary text-2xl font-bold'>
            {t('recently-viewed')}
          </h2>
          <p className='text-muted-foreground text-sm'>
            {t('product-count', { count: data.products.length })}
          </p>
        </div>
      </div>
      <Separator />
      <RecentItemsGrid
        initialData={data}
        token={session.user.access_token}
      />
    </div>
  );
};

export default RecentItemsPage;
