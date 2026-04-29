import axiosInstance from '@/lib/axios';
import { actionHandleError } from '@/lib/utils';

export const addReviewAction = async ({
  token,
  body,
  slug,
}: {
  token: string;
  body: FormData;
  slug: string;
}) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    await axiosInstance.post(`products/${slug}/reviews`, body, {
      headers,
    });
    return 'success';
  } catch (error) {
    return actionHandleError(error);
  }
};
