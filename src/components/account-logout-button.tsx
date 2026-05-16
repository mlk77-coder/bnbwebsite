'use client';

import LogoutConfirmDialog from '@/components/logout-confirm-dialog';
import { useLogout } from '@/hooks/use-logout';
import { CustomSession } from '@/lib/auth-options';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

type AccountLogoutButtonProps = {
  session: CustomSession;
  className?: string;
  rowClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  /** When provided, confirm dialog is handled by the parent (e.g. user menu). */
  onLogoutRequest?: () => void;
};

const AccountLogoutButton: FC<AccountLogoutButtonProps> = ({
  session,
  className,
  rowClassName,
  iconClassName,
  labelClassName,
  onLogoutRequest,
}) => {
  const t = useTranslations();
  const [openConfirm, setOpenConfirm] = useState(false);
  const { logout, isPending } = useLogout(session);

  const handleClick = () => {
    if (onLogoutRequest) {
      onLogoutRequest();
      return;
    }
    setOpenConfirm(true);
  };

  return (
    <>
      <div className={cn('border-muted border-t pt-2', className)}>
        <button
          type='button'
          onClick={handleClick}
          className={cn(
            'flex w-full items-center gap-3 rounded-2xl border border-transparent px-2 py-2 text-sm font-semibold text-red-600 transition-colors hover:border-red-100/70 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:outline-none',
            rowClassName,
            labelClassName
          )}
        >
          <span
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600',
              iconClassName
            )}
          >
            <LogOut className='size-4' />
          </span>
          <span className='flex-1 text-start'>{t('sign-out')}</span>
        </button>
      </div>

      {!onLogoutRequest ? (
        <LogoutConfirmDialog
          open={openConfirm}
          onOpenChange={setOpenConfirm}
          onConfirm={logout}
          isPending={isPending}
        />
      ) : null}
    </>
  );
};

export default AccountLogoutButton;
