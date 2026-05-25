'use client';

import { formatPrice } from '@/lib/utils';
import useCurrencyStore from '@/store/use-currency-store';
import { Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const COUNTRY_MESSAGE_KEYS = {
  LEBANON: 'countries.lebanon.name',
  SYRIA: 'countries.syria.name',
  AE: 'countries.eau.name',
} as const;

type StoreCountry = keyof typeof COUNTRY_MESSAGE_KEYS;

function resolveCountryKey(country: string): StoreCountry {
  if (country in COUNTRY_MESSAGE_KEYS) {
    return country as StoreCountry;
  }
  return 'LEBANON';
}

const DeliveryAlert = () => {
  const t = useTranslations();
  const currency = useCurrencyStore(state => state.currency);
  const country = useCurrencyStore(state => state.country);
  const symbol = useCurrencyStore(state => state.symbol);
  const shipmentFees = useCurrencyStore(state => state.shipmentFees);
  const region = t(COUNTRY_MESSAGE_KEYS[resolveCountryKey(country)]);

  return (
    <p className='text-primary flex w-full items-center justify-center gap-2 bg-[#e5e2d1] py-4 font-medium'>
      <Truck />
      {t('standard-home-delivery-region-from', {
        price: formatPrice(shipmentFees * currency, symbol),
        region,
      })}
    </p>
  );
};

export default DeliveryAlert;
