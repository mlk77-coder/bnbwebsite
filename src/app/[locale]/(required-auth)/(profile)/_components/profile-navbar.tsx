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
    <aside className='border-primary/10 h-fit rounded-3xl border bg-white p-3 lg:sticky lg:top-24'>
      <div className='border-muted mb-3 border-b p-4'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-11 rounded-lg ring-2 ring-white'>
            <AvatarImage src={session.user?.image || ''} />
            <AvatarFallback className='bg-primary text-primary-foreground rounded-lg'>
              <User className='size-5' />
            </AvatarFallback>
          </Avatar>
          <div className='min-w-0'>
            <p className='text-primary truncate text-lg font-bold'>
              {session.user?.name || t('my-account')}
            </p>
            <p className='text-muted-foreground truncate text-sm'>
              {session.user?.email ||
                session.user?.phone ||
                t('account-settings')}
            </p>
          </div>
        </div>
      </div>
      <nav className='flex flex-col gap-2'>
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
