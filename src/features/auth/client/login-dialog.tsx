'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { usePathname, useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function LoginDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
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
      <DialogContent className='overflow-visible border-0 bg-transparent p-0 shadow-none sm:max-w-md'>
        <DialogTitle className='sr-only'>
          {t('sign-in-to-your-account')}
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
