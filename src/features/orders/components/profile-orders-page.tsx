import { cachedGetOrders } from '@/features/orders/api/get-orders';
import InfiniteOrders from '@/features/orders/client/infinite-orders';
import getSession from '@/lib/get-session';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { PackageCheck } from 'lucide-react';
import { FC } from 'react';
import { Separator } from '@/components/ui/separator';

type PropsType = {
  params: Promise<{ locale: string }>;
};

const ProfileOrdersPage: FC<PropsType> = async props => {
  const params = await props.params;
  const { locale } = params;

  const t = await getTranslations();
  const session = await getSession();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  if (!session?.user) return notFound();

  const ordersResponse = await cachedGetOrders(
    locale,
    session.user.access_token,
    request
  );
  if (!ordersResponse.ok) return notFound();
  const body = ordersResponse.data;
  if (!body.success) return notFound();

  const firstPage = body.data;

  return (
    <div className='flex size-full flex-col items-start justify-start gap-6'>
      <div className='flex items-center gap-3'>
        <span className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl'>
          <PackageCheck className='size-5' />
        </span>
        <div>
          <h2 className='text-primary text-2xl font-bold'>{t('orders')}</h2>
          <p className='text-muted-foreground text-sm'>
            {t('orders-count', { count: firstPage.meta.total })}
          </p>
        </div>
      </div>
      <Separator />
      <InfiniteOrders
        initialData={firstPage}
        token={session.user.access_token}
      />
    </div>
  );
};

export default ProfileOrdersPage;
