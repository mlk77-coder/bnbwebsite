'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePathname, useRouter } from '@/navigation';
import { useEffect, useState } from 'react';

const RegisterSheet = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMount, setIsMount] = useState(pathname.includes('/register'));

  useEffect(() => {
    setIsMount(pathname.includes('/register'));
  }, [pathname]);

  return (
    <Dialog
      open={isMount}
      onOpenChange={open => {
        if (!open) router.back();
      }}
    >
      <DialogContent className='overflow-y-auto border-0 bg-transparent p-0 shadow-none sm:max-w-lg'>
        <DialogTitle className='sr-only'>sign up</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default RegisterSheet;
