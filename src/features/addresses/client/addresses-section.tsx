'use client';

import { getAddresses } from '@/features/addresses/api/get-addresses';
import AddNewAddress from '@/features/addresses/client/add-new-address';
import EditAddress from '@/features/addresses/client/edit-address';
import RemoveAddress from '@/features/addresses/client/remove-address';
import SetDefaultAddress from '@/features/addresses/client/set-default-address';
import { Badge } from '@/components/ui/badge';
import {
  formatAddressLocation,
  formatAddressStreet,
} from '@/lib/address-utils';
import { addressesListQueryKey } from '@/lib/address-query-keys';
import { CustomSession } from '@/lib/auth-options';
import type { Address } from '@/types/address';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  locale: string;
  token: string;
  session: CustomSession;
  initialAddresses: Address[];
};

const AddressesSection: FC<PropsType> = ({
  locale,
  token,
  session,
  initialAddresses,
}) => {
  const t = useTranslations();
  const { data: addresses = initialAddresses } = useQuery({
    queryKey: addressesListQueryKey(locale, token),
    queryFn: async () => {
      const response = await getAddresses(locale, token);
      if (!response.ok) throw new Error('Failed to fetch addresses');
      return response.data.data;
    },
    initialData: initialAddresses,
  });

  return (
    <div className='grid w-full gap-3 sm:grid-cols-2'>
      {addresses.map(address => (
        <article
          key={address.id}
          className='border-primary/10 flex flex-col gap-3 rounded-2xl border bg-white p-3.5 capitalize sm:p-4'
        >
          <div className='flex items-start justify-between gap-2'>
            <p className='text-primary truncate text-sm font-bold'>
              {address.address_name}
            </p>
            {address.is_default ? (
              <Badge
                variant='secondary'
                className='bg-primary/12 text-primary shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium'
              >
                {t('address-fields.default')}
              </Badge>
            ) : null}
          </div>

          <div className='text-muted-foreground space-y-1 text-xs'>
            <p>{formatAddressLocation(address)}</p>
            <p>{formatAddressStreet(address)}</p>
            {address.details ? <p>{address.details}</p> : null}
            <p>{address.phone}</p>
          </div>

          <div className='mt-auto flex flex-wrap items-center gap-3 pt-1'>
            <EditAddress address={address} session={session} />
            {!address.is_default ? (
              <SetDefaultAddress id={address.id} token={token} />
            ) : null}
            <RemoveAddress
              id={address.id}
              name={address.address_name}
              token={token}
            />
          </div>
        </article>
      ))}
      <AddNewAddress session={session} />
    </div>
  );
};

export default AddressesSection;
