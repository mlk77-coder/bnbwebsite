'use client';

import EditAddressForm from '@/features/addresses/client/edit-address-form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CustomSession } from '@/lib/auth-options';
import { Address } from '@/types/address';
import { Edit3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

type PropsType = {
  session: CustomSession;
  address: Address;
};

const EditAddress: FC<PropsType> = ({ session, address }) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className='border-primary/10 text-primary hover:bg-primary/10 hover:text-primary size-9 rounded-full'
          size='icon'
          title={t('global.edit')}
          variant='outline'
        >
          <Edit3 className='size-4' />

          <span className='sr-only'>{t('global.edit')}</span>
        </Button>
      </SheetTrigger>

      <SheetContent className='max-w-2xl! overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>{t('address.edit.title')}</SheetTitle>

          <SheetDescription className='sr-only'>
            {t('address.edit.title')}
          </SheetDescription>
        </SheetHeader>

        <EditAddressForm
          address={address}
          session={session}
          onMutationSuccess={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default EditAddress;
