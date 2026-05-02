'use client';

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
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import AddAddressForm from './add-address-form';
type PropsType = {
  session: CustomSession;
};
const AddNewAddress: FC<PropsType> = ({ session }) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className='border-primary/25 bg-primary/5 text-primary hover:border-primary/40 hover:bg-primary/10 hover:text-primary size-full min-h-44 flex-col rounded-3xl border-dashed capitalize shadow-sm transition-all hover:-translate-y-0.5'
          variant='outline'
        >
          <span className='mb-2 flex size-12 items-center justify-center rounded-2xl bg-white shadow-sm'>
            <Plus className='size-6' />
          </span>
          <span className='font-semibold capitalize'>
            {t('add-new-adress')}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className='max-w-2xl! overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>{t('address.add.title')}</SheetTitle>
          <SheetDescription>{t('address.add.description')}</SheetDescription>
        </SheetHeader>
        <AddAddressForm
          session={session}
          onMutationSuccess={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default AddNewAddress;
