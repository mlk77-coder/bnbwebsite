'use client';

import FormCheckbox from '@/components/form-checkbox';
import FormInput from '@/components/form-input';
import PhoneNumberInputForm from '@/components/phone-number-input-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { FC, Fragment } from 'react';
import { VerifyAccountDialog } from '../../_components/verify-account-dialog';
import useRegister from '../../hooks/use-register';
import AlreadyHaveAnAccount from './already-have-an-account';
import { ArrowRight, Loader2 } from 'lucide-react';

type PropsType = {
  hardLink?: boolean;
};

const RegisterForm: FC<PropsType> = ({ hardLink = false }) => {
  const t = useTranslations();
  const {
    form,
    isPending,
    onSubmit,
    openVerifyDialog,
    setOpenVerifyDialog,
    verificationPhone,
  } = useRegister();

  return (
    <Fragment>
      <Form {...form}>
        <form
          className='mt-6 w-full space-y-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            control={form.control}
            name='name'
            label={t('form.fields.name')}
          />
          <FormInput
            control={form.control}
            name='email'
            label={t('form.fields.email')}
            type='email'
          />

          {/* Phone field */}
          <PhoneNumberInputForm />

          {/* Privacy checkbox */}
          <div className='flex w-full items-start justify-start pt-1'>
            <FormCheckbox
              control={form.control}
              name='accepted_privacy'
              label={
                <p className='text-sm leading-snug normal-case'>
                  {t.rich('register.accept-privacy-policy', {
                    policy: text => (
                      <Link
                        className={cn(
                          'text-foreground font-medium underline underline-offset-2'
                        )}
                        href='/privacy-policy'
                      >
                        {text}
                      </Link>
                    ),
                    terms: text => (
                      <Link
                        className={cn(
                          'text-foreground font-medium underline underline-offset-2'
                        )}
                        href='/terms-and-conditions'
                      >
                        {text}
                      </Link>
                    ),
                  })}
                </p>
              }
            />
          </div>

          <Button
            disabled={isPending || form.watch('accepted_privacy') === false}
            size='lg'
            className='group shadow-primary/20 hover:shadow-primary/25 w-full gap-2 rounded-xl text-sm font-semibold tracking-wide uppercase shadow-md transition-all hover:shadow-lg'
          >
            {isPending ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <>
                {t('auth.sign-up')}
                <ArrowRight className='ms-1.5 size-4 transition-transform group-hover:translate-x-0.5' />
              </>
            )}
          </Button>

          <AlreadyHaveAnAccount hardLink={hardLink} />
        </form>
      </Form>

      <VerifyAccountDialog
        phone={verificationPhone}
        open={openVerifyDialog}
        setOpen={setOpenVerifyDialog}
      />
    </Fragment>
  );
};

export default RegisterForm;
