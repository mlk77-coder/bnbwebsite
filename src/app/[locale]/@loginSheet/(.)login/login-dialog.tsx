'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { usePathname, useRouter } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function LoginDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('auth');
  const [isOpen, setIsOpen] = useState(pathname.includes('/login'));

  useEffect(() => {
    setIsOpen(pathname.includes('/login'));
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && handleClose()}>
      <DialogContent className='overflow-hidden border-0 bg-transparent p-0 shadow-2xl sm:max-w-md sm:rounded-2xl'>
          {/* Hidden title for accessibility */}
          <DialogTitle className='sr-only'>{t('sign-in-to-your-account')}</DialogTitle>

        <div className='bg-background relative'>
          {/* Decorative top gradient */}
          <div className='from-primary to-primary absolute inset-x-0 top-0 h-1 bg-linear-to-r via-orange-400' />
          {/* Content */}
          <div className='px-6 pt-10 pb-8'>{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
