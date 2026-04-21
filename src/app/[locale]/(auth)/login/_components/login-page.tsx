'use client';

import Image from 'next/image';
import { FC } from 'react';
import LoginForm from './login-form';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

type PropsType = {
  hardLink?: boolean;
  userToken: string;
};

const LoginPage: FC<PropsType> = ({ hardLink = false, userToken }) => {
  const t = useTranslations();

  return (
    <div className='relative mx-auto max-w-xl'>
      {/* Subtle background pattern */}
      <div
        className='absolute inset-0 -z-10 opacity-[0.03]'
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='mb-4 flex flex-col items-center gap-3'
      >
        {/* Logo with glow effect */}
        <div className='relative'>
          <div className='bg-primary/20 absolute inset-0 rounded-full blur-2xl' />
          <Image
            src='/logo-light.png'
            priority
            width={80}
            height={80}
            className='relative w-24 object-contain'
            alt='BNB Store logo'
          />
        </div>

        {/* Title with decorative element */}
        <div className='flex items-center gap-2'>
          <Sparkles className='text-primary size-4' />
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            {t('auth.sign-in')}
          </h2>
          <Sparkles className='text-primary size-4' />
        </div>

        {/* Subtitle */}
        <p className='text-muted-foreground max-w-xs text-center text-sm'>
          {t(
            'sign-in-to-your-account-to-manage-your-orders-and-continue-shopping'
          )}
        </p>
      </motion.div>

      {/* Divider */}
      {/* <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='relative my-6 flex items-center justify-center'
      >
        <div className='absolute inset-0 flex items-center'>
          <div className='border-border/50 w-full border-t' />
        </div>
        <span className='bg-background text-muted-foreground relative px-3 text-[10px] font-medium tracking-[0.2em] uppercase'>
          {t('or')}
        </span>
      </motion.div> */}

      {/* Form section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <LoginForm hardLink={hardLink} userToken={userToken} />
      </motion.div>
    </div>
  );
};

export default LoginPage;
