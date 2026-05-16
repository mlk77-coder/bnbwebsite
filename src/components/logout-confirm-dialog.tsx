'use client';

import ConfirmationDialog from '@/components/confirmation-dialog';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

type PropsType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
};

const LogoutConfirmDialog: FC<PropsType> = ({
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
      title={t('auth.logout-confirm-title')}
      description={t('auth.logout-confirm-description')}
      icon={LogOut}
      iconTone='destructive'
      confirmLabel={t('sign-out')}
      onConfirm={onConfirm}
      isPending={isPending}
    />
  );
};

export default LogoutConfirmDialog;
