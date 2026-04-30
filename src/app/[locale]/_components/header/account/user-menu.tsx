'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CustomSession } from '@/lib/auth-options';
import { Link } from '@/navigation';
import {
  User,
  Package,
  MapPin,
  Clock,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import LogoutButton from './logout-button';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import axiosInstance from '@/lib/axios';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

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
                'group relative transition-all duration-300 hover:bg-gray-100/80',
                !label && 'rounded-lg!',
                label ? 'gap-2 px-3' : '',
                className
              )}
            >
              <span className='sr-only'>{t('menu')}</span>
              <div className='relative'>
                <Avatar className='group-hover:ring-primary/20 h-8 w-8 rounded-lg! ring-2 ring-transparent transition-all duration-300'>
                  <AvatarImage
                    src={profileAvatar || session.user?.image || ''}
                  />
                  <AvatarFallback className='bg-primary/10 text-primary rounded-lg!'>
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
          className='w-64 p-2'
          sideOffset={8}
        >
          {/* User Info Header */}
          <DropdownMenuLabel className='from-primary/5 mb-2 rounded-xl bg-linear-to-br to-transparent p-3'>
            <div className='flex items-center gap-3'>
              <Avatar className='ring-primary/20 h-12 w-12 ring-2'>
                <AvatarImage src={profileAvatar || session.user?.image || ''} />
                <AvatarFallback className='bg-primary/10 text-primary'>
                  <User className='h-5 w-5' />
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <p className='truncate font-semibold text-gray-900 capitalize'>
                  {profileName || session.user?.name || t('guest')}
                </p>
                <p className='truncate text-xs text-gray-500'>
                  {profileEmail || session.user?.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className='my-2' />

          {/* Menu Items */}
          <DropdownMenuGroup dir={dir} className='space-y-1'>
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <DropdownMenuItem
                    className={cn(
                      'cursor-pointer rounded-lg p-2.5 transition-all duration-200',
                      'hover:bg-gray-50 focus:bg-gray-50',
                      'group/item'
                    )}
                  >
                    <div className='flex w-full items-center gap-3'>
                      <div className='group-hover/item:bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition-colors'>
                        <Icon className='group-hover/item:text-primary h-4 w-4 text-gray-600 transition-colors' />
                      </div>
                      <span className='flex-1 text-sm font-medium text-gray-700 capitalize'>
                        {t(item.labelKey)}
                      </span>
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 text-gray-400 transition-transform duration-200',
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

          <DropdownMenuSeparator className='my-2' />

          {/* Logout Button */}
          <LogoutButton
            userToken={userToken}
            session={session}
            onRequestConfirm={requestLogoutConfirm}
          />
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openLogoutConfirm} onOpenChange={setOpenLogoutConfirm}>
        <DialogContent className='rounded-xl sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>{t('auth.logout-confirm-title')}</DialogTitle>
            <DialogDescription>
              {t('auth.logout-confirm-description')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='gap-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpenLogoutConfirm(false)}
            >
              {t('global.cancel')}
            </Button>
            <Button
              type='button'
              variant='destructive'
              onClick={handleLogout}
              disabled={isLogoutPending}
            >
              {t('sign-out')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserMenu;
