import axiosInstance from '@/lib/axios';
import { actionHandleError } from '@/lib/utils';

export const addProductCommentAction = async ({
  productId,
  token,
  body,
}: {
  productId: number;
  token: string;
  body: string;
}) => {
  try {
    if (!token) return 'Unauthorized';

    const formData = new FormData();
    formData.append('body', body);

    await axiosInstance.post(`products/${productId}/comments`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return 'success' as const;
  } catch (error) {
    return actionHandleError(error);
  }
};

export const deleteProductCommentAction = async ({
  productId,
  commentId,
  token,
}: {
  productId: number;
  commentId: number;
  token: string;
}) => {
  try {
    if (!token) return 'Unauthorized';
    await axiosInstance.delete(
      `products/${productId}/comments/${commentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return 'success' as const;
  } catch (error) {
    return actionHandleError(error);
  }
};
