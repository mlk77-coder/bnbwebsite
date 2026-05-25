'use client';

import { resendOtpAction } from '@/features/auth/api/auth-actions';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useRouter } from '@/navigation';
import { OtpSchema } from '@/schemas/auth.schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Loader2 } from 'lucide-react';
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type PropsType = {
  phone: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const RESEND_COOLDOWN = 60;

const VerifyAccountForm: FC<PropsType> = ({ phone, setOpen }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OtpSchema>({
    resolver: zodResolver(OtpSchema),
    defaultValues: { otp: '' },
  });
  const t = useTranslations();
  const router = useRouter();
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const otp = watch('otp');

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const { mutate: resendOtp, isPending: isPendingSendCode } = useMutation({
    mutationFn: resendOtpAction,
    onSuccess(response) {
      if (response === 'success') {
        toast.success(t('auth.verification-code-sent-success'));
        setCountdown(RESEND_COOLDOWN);
      } else {
        toast.error(response);
      }
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: OtpSchema) => {
      const callbackUrl =
        new URLSearchParams(window.location.search).get('callbackUrl') || '/';
      return signIn('credentials', {
        phone,
        otp: data.otp,
        callbackUrl,
        redirect: false,
      });
    },
    onSuccess: async response => {
      if (response?.ok) {
        setOpen(false);
        toast.success(t('auth.logged-in-successfully'));
        router.push(response.url || '/');
        router.refresh();
      } else {
        toast.error(response?.error || t('auth.invalid-verification-code'));
        setValue('otp', '');
      }
    },
  });

  const onSubmit = async (data: OtpSchema) => {
    await mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 pt-2'>
      <div className='flex items-center justify-center gap-2 rounded-xl bg-muted/50 px-4 py-2.5'>
        <div className='size-2 animate-pulse rounded-full bg-primary' />
        <span
          className='text-sm font-medium text-foreground/80 ltr:tracking-wider'
          dir='ltr'
        >
          {phone}
        </span>
      </div>

      <div className='flex flex-col items-center gap-2'>
        <Controller
          control={control}
          name='otp'
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              autoFocus
            >
              <InputOTPGroup className='gap-2'>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className={cn(
                      'size-11 rounded-xl border-border/60 text-base font-bold transition-all',
                      'first:rounded-xl first:border last:rounded-xl last:border',
                      'data-[active=true]:border-primary data-[active=true]:ring-2 data-[active=true]:ring-primary/20',
                      errors.otp && 'border-destructive'
                    )}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.otp ? (
          <p className='text-xs text-destructive'>
            {String(errors.otp.message)}
          </p>
        ) : null}
      </div>

      <div className='flex items-center justify-center gap-2 text-sm'>
        <span className='text-muted-foreground'>{t('auth.didnt-receive-code')}</span>
        {countdown > 0 ? (
          <span className='font-semibold tabular-nums text-primary'>
            {t('auth.resend-in', { seconds: countdown })}
          </span>
        ) : (
          <Button
            disabled={isPendingSendCode}
            className='h-auto px-1 py-0 text-sm font-semibold text-primary'
            onClick={() => resendOtp({ phone })}
            variant='link'
            type='button'
          >
            {isPendingSendCode ? (
              <Loader2 className='me-1 size-3.5 animate-spin' />
            ) : null}
            {t('auth.resend-code')}
          </Button>
        )}
      </div>

      <Button
        disabled={isPending || otp.length < 6}
        className='group w-full gap-2 rounded-xl text-sm font-semibold tracking-wide uppercase'
        size='lg'
      >
        {isPending ? (
          <Loader2 className='size-4 animate-spin' />
        ) : (
          <>
            <CheckCircle2 className='size-4' />
            {t('auth.verify')}
          </>
        )}
      </Button>
    </form>
  );
};

export default VerifyAccountForm;
