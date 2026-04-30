import { loginWithOtpAction } from '@/app/actions/auth-actions';
import redirectHard from '@/app/actions/redirect-hard-action';
import { useRouter } from '@/navigation';
import { LoginSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const useLogin = () => {
  const t = useTranslations();
  const router = useRouter();
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const [verificationPhone, setVerificationPhone] = useState('');
  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: {
        code: '',
        number: '',
      },
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const phone = `+${data.phone.code}${data.phone.number}`;
      setVerificationPhone(phone);
      return loginWithOtpAction({ phone });
    },
    onSuccess: async response => {
      if (response === 'success') {
        toast.success(t('auth.otp-sent-successfully'));
        setOpenVerifyDialog(true);
      } else {
        toast.error(response);
      }
    },
    onError() {
      toast.error(t('auth.something-went-wrong-please-try-again'));
    },
  });
  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };
  const handleRedirect = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    await redirectHard('/register');
  };

  return {
    form,
    isPending,
    onSubmit,
    handleRedirect,
    openVerifyDialog,
    setOpenVerifyDialog,
    verificationPhone,
  };
};

export default useLogin;
