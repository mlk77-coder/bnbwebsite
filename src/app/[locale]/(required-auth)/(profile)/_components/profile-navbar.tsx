import Link from '@/components/client-link';
import AccountLogoutButton from '@/components/account-logout-button';
import { profileLinks } from '../_constant/profile-links';
import getSession from '@/lib/get-session';
import { getTranslations } from 'next-intl/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Heart, Home, PackageCheck, Settings, User } from 'lucide-react';

const profileIcons = {
  '/orders': PackageCheck,
  '/wishlist': Heart,
  '/profile': Settings,
  '/recent-items': Clock,
  '/addresses': Home,
};

const ProfileNavbar = async () => {
  const session = await getSession();
  const t = await getTranslations();
  if (!session) return null;

  return (
    <aside className='border-primary/10 h-fit min-w-0 max-w-full overflow-hidden rounded-2xl border bg-white sm:rounded-3xl lg:sticky lg:top-24 lg:overflow-visible'>
      <div className='border-muted flex items-center gap-3 border-b px-3 py-3 lg:mb-0 lg:border-b lg:p-4'>
        <Avatar className='size-9 shrink-0 rounded-lg ring-2 ring-white sm:size-11'>
          <AvatarImage src={session.user?.image || ''} />
          <AvatarFallback className='bg-primary text-primary-foreground rounded-lg'>
            <User className='size-4 sm:size-5' />
          </AvatarFallback>
        </Avatar>
        <div className='min-w-0 flex-1'>
          <p className='text-primary truncate text-base font-bold sm:text-lg'>
            {session.user?.name || t('my-account')}
          </p>
          <p className='text-muted-foreground truncate text-xs sm:text-sm'>
            {session.user?.email ||
              session.user?.phone ||
              t('account-settings')}
          </p>
        </div>
        <AccountLogoutButton
          session={session}
          className='border-0 p-0 lg:hidden'
          rowClassName='w-auto gap-0 rounded-xl px-2.5 py-2'
          iconClassName='size-9 rounded-lg'
          labelClassName='sr-only'
        />
      </div>

      {/* Mobile: contained horizontal rail (same pattern as home panels) */}
      <nav
        aria-label={t('my-account')}
        className='scrollbar-hide flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain scroll-px-3 px-3 pt-3 pb-3 lg:hidden'
      >
        {profileLinks.map(link => {
          const Icon = profileIcons[link.href as keyof typeof profileIcons];

          return (
            <Link
              key={link.href}
              activeClassName='bg-primary/10 border-primary/20 text-primary shadow-sm'
              slug={link.href}
              className='text-muted-foreground hover:border-primary/15 hover:bg-primary/5 hover:text-primary flex shrink-0 snap-start flex-col items-center gap-1.5 rounded-xl border border-transparent px-3 py-2.5 text-[11px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-none'
              href={link.href}
            >
              <Icon className='size-4 shrink-0' aria-hidden />
              <span>{t(link.label)}</span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop: vertical sidebar */}
      <nav
        aria-label={t('my-account')}
        className='hidden flex-col gap-2 p-3 lg:flex'
      >
        {profileLinks.map(link => {
          const Icon = profileIcons[link.href as keyof typeof profileIcons];

          return (
            <Link
              key={link.href}
              activeClassName='bg-primary/5 border border-primary/10 text-primary'
              slug={link.href}
              className='group text-muted-foreground hover:border-primary/10 hover:bg-primary/5 hover:text-primary flex items-center gap-3 rounded-2xl border border-transparent px-2 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none'
              href={link.href}
            >
              <span className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors'>
                <Icon className='size-4' />
              </span>
              <span className='flex-1'>{t(link.label)}</span>
            </Link>
          );
        })}
        <AccountLogoutButton session={session} />
      </nav>
    </aside>
  );
};

export default ProfileNavbar;
