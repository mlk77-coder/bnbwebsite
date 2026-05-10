'use client';

import LoginForm from '@/features/auth/client/login-form';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type PropsType = {
  hardLink?: boolean;
  userToken?: string;
};

const LoginPage: FC<PropsType> = ({
  hardLink = false,
  userToken: _userToken,
}) => {
  const t = useTranslations();

  return (
    <div className='border-border/50 relative mx-auto max-w-md overflow-hidden rounded-xl border bg-white shadow-2xl shadow-black/10'>
      <div className='from-primary to-primary h-1.5 w-full bg-linear-to-r via-amber-300' />

      <div className='bg-primary/10 pointer-events-none absolute -inset-e-16 -top-20 size-44 rounded-full blur-3xl' />
      <div className='pointer-events-none absolute -inset-s-20 -bottom-24 size-52 rounded-full bg-amber-200/25 blur-3xl' />

      <div className='relative px-6 py-16 sm:px-8'>
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className='mb-8 flex flex-col items-center gap-3 text-center'
        >
          <div className='relative'>
            <div className='bg-primary/15 absolute inset-0 rounded-full blur-2xl' />
            <Image
              src='/logo-light.png'
              priority
              width={90}
              height={90}
              className='relative h-auto w-[88px] object-contain drop-shadow-sm'
              alt='BNB Store logo'
            />
          </div>

          <div>
            <h1 className='text-foreground text-2xl font-bold tracking-tight sm:text-3xl'>
              {t('auth.sign-in')}
            </h1>
            <p className='text-muted-foreground mt-1.5 text-sm'>
              {t(
                'sign-in-to-your-account-to-manage-your-orders-and-continue-shopping'
              )}
            </p>
          </div>

          <div className='border-primary/20 bg-primary/5 text-primary inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium'>
            <ShieldCheck className='size-3.5' />
            {t('auth.otp-secure-login')}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <LoginForm hardLink={hardLink} />
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
