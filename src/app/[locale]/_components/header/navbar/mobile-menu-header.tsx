'use client';

import { CustomSession } from '@/lib/auth-options';
import LanguagesToggle from '../i18n/languages-toggle';
import UserMenu from '../account/user-menu';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { UserRound } from 'lucide-react';

const MobileMenuHeader = ({
  session,
  userToken,
  signInLabel,
}: {
  session: CustomSession | null;
  userToken: string;
  signInLabel: string;
}) => {
  return (
    <div className='flex w-full items-center gap-2 rounded-2xl border border-black/5 bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]'>
      <div className='min-w-0 flex-1'>
        {session?.user ? (
          <UserMenu
            className='max-xl:inline-flex max-xl:w-full max-xl:justify-start'
            label={session.user.name}
            session={session}
            userToken={userToken}
          />
        ) : (
          <Link
            className={cn(
              'flex h-10 w-full items-center justify-start gap-2.5 rounded-xl px-2.5 capitalize transition-colors',
              'hover:bg-primary/5 active:bg-primary/10'
            )}
            href='/login'
          >
            <span className='bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-full'>
              <UserRound className='size-4' />
            </span>
            <span className='truncate text-sm font-semibold text-gray-900'>
              {signInLabel}
            </span>
          </Link>
        )}
      </div>
      <LanguagesToggle inMobileMenu />
    </div>
  );
};

export default MobileMenuHeader;
