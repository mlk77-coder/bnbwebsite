'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CustomSession } from '@/lib/auth-options';
import { Link } from '@/navigation';
import {
  User,
  Package,
  MapPin,
  Clock,
  Settings,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import LogoutButton from './logout-button';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import axiosInstance from '@/lib/axios';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import LogoutConfirmDialog from '@/components/logout-confirm-dialog';

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
  { href: '/orders', icon: Package, labelKey: 'orders' },
  { href: '/addresses', icon: MapPin, labelKey: 'address.title' },
  { href: '/recent-items', icon: Clock, labelKey: 'recently-viewed' },
  { href: '/profile', icon: Settings, labelKey: 'account-settings' },
];

const UserMenu: FC<PropsType> = ({
  session,
  userToken,
  profileAvatar,
  profileName,
  profileEmail,
  className,
  label,
}) => {
  const locale = useLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const t = useTranslations();
  const isRTL = dir === 'rtl';
  const [open, setOpen] = useState(false);
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  const [isLogoutPending, setIsLogoutPending] = useState(false);

  const requestLogoutConfirm = () => {
    setOpen(false);
    setTimeout(() => setOpenLogoutConfirm(true), 0);
  };

  const handleLogout = async () => {
    setIsLogoutPending(true);
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
      setIsLogoutPending(false);
    }
  };

  return (
    <>
      <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
        <Tooltip text={t('menu')}>
          <DropdownMenuTrigger asChild>
            <Button
              size={label ? 'default' : 'icon'}
              variant='ghost'
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
                  <AvatarImage
                    src={profileAvatar || session.user?.image || ''}
                  />
                  <AvatarFallback className='bg-primary/10 text-primary rounded-full!'>
                    <User className='h-4 w-4' />
                  </AvatarFallback>
                </Avatar>
                {/* Online indicator */}
                <span className='absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500' />
              </div>
              {label ? (
                <span className='text-sm font-medium text-gray-700'>
                  {label}
                </span>
              ) : null}
            </Button>
          </DropdownMenuTrigger>
        </Tooltip>

        <DropdownMenuContent
          align={locale === 'en' ? 'end' : 'start'}
          className='border-primary/10 shadow-primary/15 w-80 overflow-hidden rounded-3xl border bg-white p-0 shadow-2xl'
          sideOffset={8}
        >
          <DropdownMenuLabel className='border-primary/10 from-primary/10 via-primary/5 relative overflow-hidden border-b bg-linear-to-br to-transparent p-5'>
            <div className='bg-primary/10 absolute -inset-e-8 -top-8 size-28 rounded-full blur-2xl' />
            <div className='relative flex items-center gap-4'>
              <div className='relative'>
                <Avatar className='ring-primary/20 shadow-primary/10 h-16 w-16 rounded-2xl shadow-lg ring-2'>
                  <AvatarImage
                    src={profileAvatar || session.user?.image || ''}
                  />
                  <AvatarFallback className='bg-primary/10 text-primary rounded-2xl'>
                    <User className='h-6 w-6' />
                  </AvatarFallback>
                </Avatar>
                <span className='absolute -inset-e-1 -bottom-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-green-500'>
                  <span className='size-2 rounded-full bg-white' />
                </span>
              </div>
              <div className='min-w-0 flex-1 space-y-1'>
                <div className='flex items-center gap-2'>
                  <p className='truncate text-base font-bold text-gray-950 capitalize'>
                    {profileName || session.user?.name || t('guest')}
                  </p>
                  <Sparkles className='text-primary size-4 shrink-0' />
                </div>
                <p className='text-muted-foreground truncate text-xs font-medium'>
                  {profileEmail || session.user?.email}
                </p>
                <span className='text-primary inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold shadow-sm'>
                  <ShieldCheck className='size-3' />
                  {t('account-settings')}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          {/* Menu Items */}
          <DropdownMenuGroup dir={dir} className='space-y-1 p-3'>
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <DropdownMenuItem
                    className={cn(
                      'cursor-pointer rounded-2xl border border-transparent p-2.5 transition-all duration-200',
                      'hover:border-primary/10 hover:bg-primary/5 focus:border-primary/10 focus:bg-primary/5',
                      'group/item'
                    )}
                  >
                    <div className='flex w-full items-center gap-3'>
                      <div className='bg-secondary/70 text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary flex h-10 w-10 items-center justify-center rounded-2xl transition-colors'>
                        <Icon className='h-4 w-4 transition-colors' />
                      </div>
                      <span className='group-hover/item:text-primary flex-1 text-sm font-semibold text-gray-700 capitalize transition-colors'>
                        {t(item.labelKey)}
                      </span>
                      <ChevronRight
                        className={cn(
                          'group-hover/item:text-primary h-4 w-4 text-gray-400 transition-transform duration-200',
                          isRTL ? 'rotate-180' : '',
                          'group-hover/item:translate-x-0.5'
                        )}
                      />
                    </div>
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </DropdownMenuGroup>

          {/* Logout Button */}
          <div className='border-primary/10 border-t p-3'>
            <LogoutButton
              userToken={userToken}
              session={session}
              onRequestConfirm={requestLogoutConfirm}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutConfirmDialog
        open={openLogoutConfirm}
        onOpenChange={setOpenLogoutConfirm}
        onConfirm={handleLogout}
        isPending={isLogoutPending}
      />
    </>
  );
};

export default UserMenu;
