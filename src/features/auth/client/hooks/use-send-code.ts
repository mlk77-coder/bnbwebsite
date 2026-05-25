import { sendCodeAction } from '@/features/auth/api/auth-actions';
import { useMutation } from '@tanstack/react-query';

const useSendCode = (onSuccess?: (response?: string) => void) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendCodeAction,
    onSuccess,
  });

  const handleSendCode = async (email: string) => {
    const formData = new FormData();
    formData.append('email', email);
    await mutateAsync(formData);
  };

  return {
    handleSendCode,
    isPending,
  };
};

export default useSendCode;
