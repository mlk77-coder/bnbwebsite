import axiosInstance from '@/lib/axios';
import { actionHandleError } from '@/lib/utils';

export const toggleReelLike = async ({
  reelId,
  token,
}: {
  reelId: number;
  token: string;
}) => {
  try {
    if (!token) return 'Unauthorized';
    await axiosInstance.post(
      `reels/${reelId}/like`,
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
