'use client';

import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ForgotPasswordSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import useSendCode from '@/features/auth/client/hooks/use-send-code';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CheckCodeDialog = dynamic(
  () => import('@/features/auth/client/check-code-dialog'),
  {
    ssr: false,
  }
);

const ForgotPasswordForm = () => {
  const [openCheckCodeDialog, setOpenCheckCodeDialog] = useState(false);
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const { handleSendCode, isPending } = useSendCode(response => {
    if (response === 'success') {
      toast.success('The verification code has been sent successfully');
      setOpenCheckCodeDialog(true);
    } else toast.error(response);
  });
  const t = useTranslations();
  const onSubmit = async (data: ForgotPasswordSchema) => {
    await handleSendCode(data.email);
  };
  return (
    <Fragment>
      <Form {...form}>
        <form
          className='w-full mt-6 space-y-6'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            control={form.control}
            name='email'
            type='email'
            label={t('form.fields.email')}
          />
          <Button
            disabled={isPending}
            size='lg'
            className='w-full text-xl rounded-lg'
          >
            {t('auth.reset-password')}
          </Button>
        </form>
      </Form>
      <CheckCodeDialog
        email={form.getValues('email')}
        open={openCheckCodeDialog}
        setOpen={setOpenCheckCodeDialog}
      />
    </Fragment>
  );
};

export default ForgotPasswordForm;
