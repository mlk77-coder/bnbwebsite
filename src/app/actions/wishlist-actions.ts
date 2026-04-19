import axiosInstance from "@/lib/axios";
import { actionHandleError } from "@/lib/utils";

export const toggleWishListAction = async ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => {
  try {
    await axiosInstance.get(`products/${id}/toggle-favorite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};
