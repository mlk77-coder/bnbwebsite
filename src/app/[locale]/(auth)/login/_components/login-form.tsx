'use client';

import FormInput from '@/components/form-input';
import PasswordInput from '@/components/password-input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import Image from 'next/image';
import { FC, Fragment } from 'react';
import useLogin from '../../hooks/use-login';
import { useTranslations } from 'next-intl';
import { VerifyAccountDialog } from '../../_components/verify-account-dialog';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

type PropsType = {
  hardLink?: boolean;
  userToken: string;
};

const LoginForm: FC<PropsType> = ({ hardLink = false, userToken }) => {
  const t = useTranslations();
  const {
    form,
    handleRedirect,
    onSubmit,
    isPending,
    openVerifyDialog,
    setOpenVerifyDialog,
  } = useLogin(userToken);

  return (
    <Fragment>
      <Form {...form}>
        <form
          className='w-full space-y-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='space-y-4'>
            <FormInput
              control={form.control}
              name='email'
              label={t('form.fields.email')}
            />
            <div className='space-y-1'>
              <PasswordInput
                control={form.control}
                name='password'
                label={t('form.fields.password')}
              />
              <div className='flex justify-end'>
                <Link
                  className={cn(
                    buttonVariants({ variant: 'link' }),
                    'text-muted-foreground hover:text-primary h-auto px-0 py-0 text-xs font-medium'
                  )}
                  href='/forgot-password'
                >
                  {t('auth.forgot-password-link')}
                </Link>
              </div>
            </div>
          </div>

          <Button
            disabled={isPending}
            size='lg'
            className='group w-full gap-2 rounded-xl text-sm font-semibold tracking-wide uppercase'
          >
            {isPending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <>
                {t('auth.sign-in')}
                <ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
              </>
            )}
          </Button>
        </form>

        {/* Sign up link */}
        <p className='text-muted-foreground mt-5 text-center text-xs'>
          {t('auth.dont-have-an-account')}{' '}
          {hardLink ? (
            <a
              className='text-foreground hover:text-primary font-medium underline-offset-4 transition-colors hover:underline'
              onClick={handleRedirect}
              href='/register'
            >
              {t('auth.sign-up')}
            </a>
          ) : (
            <Link
              className='text-foreground hover:text-primary font-medium underline-offset-4 transition-colors hover:underline'
              scroll={false}
              href='/register'
              replace
            >
              {t('auth.sign-up')}
            </Link>
          )}
        </p>

        {/* Social login divider */}
        <div className='relative my-5'>
          <div className='absolute inset-0 flex items-center'>
            <div className='border-border/50 w-full border-t' />
          </div>
          <div className='relative flex justify-center'>
            <span className='bg-background text-muted-foreground px-2 text-[10px] font-medium tracking-wider uppercase'>
              {t('continue-with')}
            </span>
          </div>
        </div>

        {/* Social buttons */}
        <div className='grid gap-2.5'>
          <motion.button
            type='button'
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => signIn('google')}
            className='border-border/60 text-foreground hover:border-border hover:bg-secondary/30 flex w-full items-center justify-center gap-2 rounded-xl border bg-white py-2.5 text-sm font-medium shadow-sm transition-all hover:shadow-md'
          >
            <Image
              src='/google.svg'
              width={18}
              height={18}
              className='size-5'
              alt='Google'
            />
            <span>{t('continue-with-google')}</span>
          </motion.button>

          <motion.button
            type='button'
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => signIn('apple')}
            className='border-border/60 bg-foreground text-background hover:bg-foreground/90 flex w-full items-center justify-center gap-3 rounded-xl border py-2.5 text-sm font-medium shadow-sm transition-all hover:shadow-md'
          >
            <Image
              src='/apple.svg'
              width={18}
              height={18}
              className='size-4.5 invert'
              alt='Apple'
            />
            <span>{t('continue-with-apple')}</span>
          </motion.button>
        </div>
      </Form>

      <VerifyAccountDialog
        email={form.getValues('email')}
        password={form.getValues('password')}
        fromLogin
        open={openVerifyDialog}
        setOpen={setOpenVerifyDialog}
      />
    </Fragment>
  );
};

export default LoginForm;
