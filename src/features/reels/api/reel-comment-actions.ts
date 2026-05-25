import axiosInstance from '@/lib/axios';
import { actionHandleError } from '@/lib/utils';

export const addReelCommentAction = async ({
  reelId,
  token,
  comment,
}: {
  reelId: number;
  token: string;
  comment: string;
}) => {
  try {
    if (!token) return 'Unauthorized';

    const formData = new FormData();
    formData.append('comment', comment);

    await axiosInstance.post(`reels/${reelId}/comments`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return 'success' as const;
  } catch (error) {
    return actionHandleError(error);
  }
};

export const deleteReelCommentAction = async ({
  reelId,
  commentId,
  token,
}: {
  reelId: number;
  commentId: number;
  token: string;
}) => {
  try {
    if (!token) return 'Unauthorized';
    await axiosInstance.delete(`reels/${reelId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return 'success' as const;
  } catch (error) {
    return actionHandleError(error);
  }
};
