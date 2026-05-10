'use client';

import FormTextArea from '@/components/form-text-area';
import CheckoutAddNewAddress from '@/features/checkout/client/checkout-add-new-address';
import { CustomSession } from '@/lib/auth-options';
import { cn } from '@/lib/utils';
import { CheckoutSchema } from '@/schemas/checkout.schema';
import { ClipboardList, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof MapPin;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        'border-primary/10 shadow-primary/5 rounded-3xl border bg-white p-5 shadow-sm',
        'hover:shadow-primary/10 transition-shadow duration-300 hover:shadow-md'
      )}
    >
      <div className='border-primary/10 mb-4 flex items-center gap-2.5 border-b pb-3'>
        <span className='bg-primary/8 text-primary flex size-9 items-center justify-center rounded-2xl'>
          <Icon className='size-4' aria-hidden />
        </span>
        <h2 className='text-primary text-xs font-semibold tracking-[0.18em] uppercase'>
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </section>
  );
}

type PropsType = {
  session: CustomSession | null;
};

const CheckoutForm: FC<PropsType> = ({ session }) => {
  const form = useFormContext<CheckoutSchema>();
  const t = useTranslations();

  return (
    <div className='space-y-5'>
      <SectionCard title={t('order-notes')} icon={ClipboardList}>
        <FormTextArea
          control={form.control}
          name='notes'
          label={t('form.fields.additional-info')}
          placeholder={t('checkout-notes-placeholder')}
        />
      </SectionCard>

      <SectionCard title={t('address-details')} icon={MapPin}>
        <CheckoutAddNewAddress session={session} />
      </SectionCard>
    </div>
  );
};

export default CheckoutForm;
