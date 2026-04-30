'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { CustomSession } from '@/lib/auth-options';
import axiosInstance from '@/lib/axios';
import { LogOut, ChevronRight } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { FC } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type PropsType = {
  inDropdown?: boolean;
  userToken: string;
  session: CustomSession;
  onRequestConfirm?: () => void;
};

const LogoutButton: FC<PropsType> = ({
  inDropdown = true,
  session,
  userToken,
  onRequestConfirm,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleLogout = async () => {
    try {
      if (session.user?.access_token) {
        await axiosInstance.post(
          '/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${session.user.access_token}`,
            },
          }
        );
      }
      await signOut();
    } catch (error) {
      toast.error(t('auth.something-went-wrong-please-try-again'));
    }
  };

  if (inDropdown)
    return (
      <DropdownMenuItem
        onSelect={e => {
          if (onRequestConfirm) {
            e.preventDefault();
            onRequestConfirm();
            return;
          }
          handleLogout();
        }}
        className={cn(
          'cursor-pointer rounded-2xl border border-red-100/60 bg-red-50/60 p-2.5 transition-all duration-200',
          'hover:bg-red-50 focus:bg-red-50',
          'group/item'
        )}
      >
        <div className='flex w-full items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 transition-colors group-hover/item:bg-red-200'>
            <LogOut className='h-4 w-4 text-red-600' />
          </div>
          <span className='flex-1 text-sm font-semibold text-red-600'>
            {t('sign-out')}
          </span>
          <ChevronRight
            className={cn(
              'h-4 w-4 text-red-400 transition-transform group-hover/item:translate-x-0.5',
              isRTL && 'rotate-180'
            )}
          />
        </div>
      </DropdownMenuItem>
    );

  return (
    <button
      onClick={() => {
        if (onRequestConfirm) {
          onRequestConfirm();
          return;
        }
        handleLogout();
      }}
      className='flex-1 text-start text-sm font-semibold text-red-600 focus-visible:outline-none'
    >
      {t('sign-out')}
    </button>
  );
};

export default LogoutButton;
