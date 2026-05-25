'use client';

import { VerifyAccountDialog } from '@/features/auth/client/verify-account-dialog';
import useLogin from '@/features/auth/client/hooks/use-login';
import PhoneNumberInputForm from '@/components/phone-number-input-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Link } from '@/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, Fragment } from 'react';

type PropsType = {
  hardLink?: boolean;
  userToken?: string;
};

const LoginForm: FC<PropsType> = ({ hardLink = false }) => {
  const t = useTranslations();
  const {
    form,
    handleRedirect,
    onSubmit,
    isPending,
    openVerifyDialog,
    setOpenVerifyDialog,
    verificationPhone,
  } = useLogin();

  return (
    <Fragment>
      <Form {...form}>
        <form
          className='w-full space-y-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <PhoneNumberInputForm />

          <Button
            disabled={isPending}
            size='lg'
            className='group shadow-primary/20 hover:shadow-primary/25 relative w-full overflow-hidden rounded-xl text-sm font-semibold tracking-wide uppercase shadow-md transition-all hover:shadow-lg'
          >
            {isPending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <>
                {t('auth.sign-in')}
                <ArrowRight className='ms-1.5 size-4 transition-transform group-hover:translate-x-0.5' />
              </>
            )}
          </Button>
        </form>

        <div className='relative mt-5'>
          <div className='absolute inset-0 flex items-center'>
            <div className='border-border/50 w-full border-t' />
          </div>
        </div>

        <p className='text-muted-foreground pt-5 text-center text-sm'>
          {t('auth.dont-have-an-account')}{' '}
          {hardLink ? (
            <a
              className='text-primary font-semibold underline-offset-4 transition-colors hover:underline'
              onClick={handleRedirect}
              href='/register'
            >
              {t('auth.sign-up')}
            </a>
          ) : (
            <Link
              className='text-primary font-semibold underline-offset-4 transition-colors hover:underline'
              scroll={false}
              href='/register'
              replace
            >
              {t('auth.sign-up')}
            </Link>
          )}
        </p>
      </Form>

      <VerifyAccountDialog
        phone={verificationPhone}
        fromLogin
        open={openVerifyDialog}
        setOpen={setOpenVerifyDialog}
      />
    </Fragment>
  );
};

export default LoginForm;
