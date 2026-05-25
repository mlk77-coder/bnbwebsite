'use client';

import AccountLogoutButton from '@/components/account-logout-button';
import ClientLink from '@/components/client-link';
import LogoutConfirmDialog from '@/components/logout-confirm-dialog';
import { useLogout } from '@/hooks/use-logout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CustomSession } from '@/lib/auth-options';
import { cn } from '@/lib/utils';
import { Clock, Home, PackageCheck, Settings, User } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useState } from 'react';

type PropsType = {
  session: CustomSession;
  userToken: string;
  profileAvatar?: string;
  profileName?: string;
  profileEmail?: string | null;
  className?: string;
  label?: string;
};

const menuItems = [
  { href: '/orders', icon: PackageCheck, labelKey: 'orders' },
  { href: '/addresses', icon: Home, labelKey: 'address.title' },
  { href: '/recent-items', icon: Clock, labelKey: 'recently-viewed' },
  { href: '/profile', icon: Settings, labelKey: 'account-settings' },
] as const;

const UserMenu: FC<PropsType> = ({
  session,
  profileAvatar,
  profileName,
  profileEmail,
  className,
  label,
}) => {
  const locale = useLocale();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const { logout, isPending } = useLogout(session);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            type='button'
            size={label ? 'default' : 'icon'}
            variant='ghost'
            title={t('menu')}
            className={cn(
              'group hover:bg-primary/5 relative transition-all duration-300',
              !label && 'rounded-full!',
              label ? 'gap-2 px-3' : '',
              className
            )}
          >
            <span className='sr-only'>{t('menu')}</span>
            <div className='relative'>
              <Avatar className='ring-primary/10 group-hover:ring-primary/30 h-9 w-9 rounded-full! ring-2 transition-all duration-300'>
                <AvatarImage src={profileAvatar || session.user?.image || ''} />
                <AvatarFallback className='bg-primary/10 text-primary rounded-full!'>
                  <User className='h-4 w-4' />
                </AvatarFallback>
              </Avatar>
              <span
                className='pointer-events-none absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500'
                aria-hidden
              />
            </div>
            {label ? (
              <span className='truncate text-sm font-medium text-gray-700'>
                {label}
              </span>
            ) : null}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align={locale === 'en' ? 'end' : 'start'}
          className='border-primary/10 shadow-primary/5 z-[100] w-72 overflow-hidden rounded-xl border bg-white p-3 shadow-xl'
          sideOffset={8}
        >
          <div className='border-muted mb-3 border-b p-4'>
            <div className='flex items-center gap-3'>
              <Avatar className='size-11 rounded-lg ring-2 ring-white'>
                <AvatarImage src={profileAvatar || session.user?.image || ''} />
                <AvatarFallback className='bg-primary text-primary-foreground rounded-lg'>
                  <User className='size-5' />
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0'>
                <p className='text-primary truncate text-sm font-bold capitalize'>
                  {profileName || session.user?.name || t('my-account')}
                </p>
                <p className='text-muted-foreground truncate text-xs'>
                  {profileEmail ||
                    session.user?.email ||
                    session.user?.phone ||
                    t('account-settings')}
                </p>
              </div>
            </div>
          </div>

          <nav className='flex flex-col gap-2'>
            {menuItems.map(item => {
              const Icon = item.icon;

              return (
                <ClientLink
                  key={item.href}
                  href={item.href}
                  slug={item.href}
                  activeClassName='bg-primary/5 border-primary/10 text-primary border'
                  className='group text-muted-foreground hover:border-primary/10 hover:bg-primary/5 hover:text-primary flex items-center gap-3 rounded-2xl border border-transparent px-2 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none'
                  onClick={closeMenu}
                >
                  <span className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors'>
                    <Icon className='size-4' />
                  </span>
                  <span className='flex-1 capitalize'>{t(item.labelKey)}</span>
                </ClientLink>
              );
            })}

            <AccountLogoutButton
              session={session}
              onLogoutRequest={() => {
                setLogoutConfirmOpen(true);
                closeMenu();
              }}
            />
          </nav>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutConfirmDialog
        open={logoutConfirmOpen}
        onOpenChange={setLogoutConfirmOpen}
        onConfirm={logout}
        isPending={isPending}
      />
    </>
  );
};

export default UserMenu;
