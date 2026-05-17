import axiosInstance from '@/lib/axios';
import { actionHandleError } from '@/lib/utils';

export const toggleProductLike = async ({
  productId,
  token,
}: {
  productId: number;
  token: string;
}) => {
  try {
    if (!token) return 'Unauthorized';
    await axiosInstance.post(
      `products/${productId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return 'success' as const;
  } catch (error) {
    return actionHandleError(error);
  }
};
