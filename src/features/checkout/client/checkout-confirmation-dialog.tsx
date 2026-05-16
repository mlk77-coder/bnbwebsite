'use client';

import ConfirmationDialog from '@/components/confirmation-dialog';
import { ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

type ConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
};

const CheckoutConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  isPending,
}) => {
  const t = useTranslations();

  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('checkout-confirmation-title')}
      description={t('checkout-confirmation-description')}
      icon={ShoppingBag}
      iconTone='warning'
      confirmLabel={t('pay-button')}
      confirmVariant='default'
      onConfirm={onConfirm}
      isPending={isPending}
    />
  );
};

export default CheckoutConfirmationDialog;
