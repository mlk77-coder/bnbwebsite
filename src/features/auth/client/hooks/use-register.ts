import { registerWithOtpAction } from '@/features/auth/api/auth-actions';
import { RegisterSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const useRegister = () => {
  const t = useTranslations();
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const [verificationPhone, setVerificationPhone] = useState('');
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: {
        code: '',
        number: '',
      },
      accepted_privacy: false,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: registerWithOtpAction,
    onSuccess(response) {
      if (response === 'success') {
        toast.success(t('auth.account-created-otp-sent-successfully'));
        setOpenVerifyDialog(true);
      } else {
        toast.error(response);
      }
    },
  });
  const onSubmit = (data: RegisterSchema) => {
    const phone = `+${data.phone.code}${data.phone.number}`;
    setVerificationPhone(phone);
    mutate({
      name: data.name,
      email: data.email,
      phone,
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    openVerifyDialog,
    setOpenVerifyDialog,
    verificationPhone,
  };
};

export default useRegister;
