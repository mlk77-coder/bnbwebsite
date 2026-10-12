import AddressesSection from '@/features/addresses/client/addresses-section';
import { cachedGetAddresses } from '@/features/addresses/api/get-addresses';
import { getFetcherErrorMessage } from '@/lib/fetcher';
import getSession from '@/lib/get-session';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Home } from 'lucide-react';
import { FC } from 'react';
import { Separator } from '@/components/ui/separator';

type PropsType = {
  params: Promise<{ locale: string }>;
};

const AddressesPage: FC<PropsType> = async props => {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations();
  const session = await getSession();
  const headersList = await headers();
  const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
    headers: headersList,
  });
  if (!session?.user) {
    redirect('/login');
  }

  const addressesResponse = await cachedGetAddresses(
    locale,
    session.user.access_token,
    request
  );
  if (!addressesResponse.ok) {
    const detail = getFetcherErrorMessage(addressesResponse.error);
    return (
      <div className='space-y-2'>
        <p className='text-muted-foreground text-sm'>
          {t('addresses-load-error')}
        </p>
        {detail ? (
          <pre className='bg-muted text-destructive overflow-x-auto rounded-lg p-3 text-xs whitespace-pre-wrap'>
            {`API ${addressesResponse.status}: ${detail}`}
          </pre>
        ) : null}
      </div>
    );
  }
  const addresses = addressesResponse.data.data;

  return (
    <div className='flex size-full flex-col items-start justify-start gap-6'>
      <div className='flex items-center gap-3'>
        <span className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl'>
          <Home className='size-5' />
        </span>
        <div>
          <h2 className='text-primary text-2xl font-bold'>
            {t('address.title')}
          </h2>
          <p className='text-muted-foreground text-sm'>
            {t('addresses-count', { count: addresses.length })}
          </p>
        </div>
      </div>
      <Separator />
      <AddressesSection
        locale={locale}
        token={session.user.access_token}
        session={session}
        initialAddresses={addresses}
      />
    </div>
  );
};

export default AddressesPage;
