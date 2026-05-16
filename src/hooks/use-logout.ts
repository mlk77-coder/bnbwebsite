'use client';

import axiosInstance from '@/lib/axios';
import { CustomSession } from '@/lib/auth-options';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export const useLogout = (session: CustomSession) => {
  const t = useTranslations();
  const [isPending, setIsPending] = useState(false);

  const logout = useCallback(async () => {
    setIsPending(true);
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
      setIsPending(false);
    }
  }, [session, t]);

  return { logout, isPending };
};
