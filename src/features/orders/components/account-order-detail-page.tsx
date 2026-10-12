import { cachedGetOrder } from '@/features/orders/api/get-orders';
import CancelOrderButton from '@/features/orders/client/cancel-order-button';
import OrderDetailContent from '@/features/orders/components/order-detail-content';
import { getFetcherErrorMessage } from '@/lib/fetcher';
import getSession from '@/lib/get-session';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { FC } from 'react';

type PropsType = {
  params: Promise<{ locale: string; id: string }>;
};

const AccountOrderDetailPage: FC<PropsType> = async props => {
  const params = await props.params;
  const { id, locale } = params;

  const t = await getTranslations();
  const session = await getSession();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  if (!session?.user?.access_token) {
    redirect('/login');
  }

  const ordersResponse = await cachedGetOrder(
    locale,
    session.user.access_token,
    id,
    request
  );

  if (!ordersResponse.ok) {
    if (ordersResponse.status === 404) return notFound();
    const detail = getFetcherErrorMessage(ordersResponse.error);
    return (
      <div className='space-y-2'>
        <p className='text-muted-foreground text-sm'>{t('orders-load-error')}</p>
        {detail ? (
          <pre className='bg-muted text-destructive overflow-x-auto rounded-lg p-3 text-xs whitespace-pre-wrap'>
            {`API ${ordersResponse.status}: ${detail}`}
          </pre>
        ) : null}
      </div>
    );
  }

  if (!ordersResponse.data.success) return notFound();

  const order = ordersResponse.data.data;
  const canCancelOrder =
    typeof order.status === 'string' &&
    order.status.toLowerCase() === 'pending';

  return (
    <OrderDetailContent
      order={order}
      t={t}
      cancelAction={
        canCancelOrder ? (
          <CancelOrderButton
            orderId={order.id}
            token={session.user.access_token}
          />
        ) : undefined
      }
    />
  );
};

export default AccountOrderDetailPage;
