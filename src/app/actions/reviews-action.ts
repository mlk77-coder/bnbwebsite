import axiosInstance from '@/lib/axios';
import { actionHandleError } from '@/lib/utils';

export const addReviewAction = async ({
  token,
  body,
  slug,
}: {
  token: string;
  body: {
    rating: number;
    comment: string;
  };
  slug: string;
}) => {
  try {
    if (!token) return 'Unauthorized';

    const headers = { Authorization: `Bearer ${token}` };
    await axiosInstance.post(`products/${slug}/reviews`, body, {
      headers,
    });
    return 'success';
  } catch (error) {
    return actionHandleError(error);
  }
};
