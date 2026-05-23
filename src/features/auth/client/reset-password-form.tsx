'use client';

import { resetPasswordAction } from '@/features/auth/api/auth-actions';
import redirectHard from '@/app/actions/redirect-hard-action';
import PasswordInput from '@/components/password-input';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ResetPasswordSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ResetPasswordFormProps {
  email: string;
  code: string;
}

const ResetPasswordForm = ({ email, code }: ResetPasswordFormProps) => {
  const t = useTranslations();

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      new_password: '',
      new_password_confirmation: '',
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPasswordAction,
    onSuccess: async response => {
      if (response === 'success') {
        await redirectHard('/login');
        Cookies.remove('email');
        Cookies.remove('code');
        toast.success(t('auth.password-reset-success'));
      } else {
        toast.error(response);
      }
    },
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('code', code);
    formData.append('new_password', data.new_password);
    formData.append(
      'new_password_confirmation',
      data.new_password_confirmation
    );
    await mutateAsync(formData);
  };
  return (
    <Form {...form}>
      <form
        className='w-full mt-6 space-y-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <PasswordInput
          control={form.control}
          name='new_password'
          label={t('form.fields.new-password')}
        />
        <PasswordInput
          control={form.control}
          name='new_password_confirmation'
          label={t('form.fields.new-password-confirmation')}
        />
        <Button
          disabled={isPending}
          size='lg'
          className='w-full text-xl rounded-lg'
        >
          <SubmitButton isPending={isPending} text={t('global.confirm')} />
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
