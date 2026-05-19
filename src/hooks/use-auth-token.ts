'use client';

import { CustomSession } from '@/lib/auth-options';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';

/** Logged-in Bearer token, or guest `x-user-session` cookie for API reads. */
export function useAuthToken() {
  const { data: rawSession } = useSession();
  const session = rawSession as CustomSession | null;
  const isLoggedIn = Boolean(session?.user);
  const token = isLoggedIn
    ? (session?.user?.access_token ?? '')
    : (Cookies.get('x-user-session') ?? '');

  return {
    session,
    isLoggedIn,
    token,
    userName: session?.user?.name,
    userAvatar: session?.user?.avatar ?? session?.user?.image ?? null,
  };
}
