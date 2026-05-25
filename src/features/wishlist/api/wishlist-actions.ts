import axiosInstance from "@/lib/axios";
import { actionHandleError } from "@/lib/utils";

export const addToWishListAction = async ({
  productId,
  token,
}: {
  productId: number;
  token: string;
}) => {
  try {
    await axiosInstance.post(
      "wishlist",
      {
        product_id: productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};

export const removeFromWishListAction = async ({
  productId,
  token,
}: {
  productId: number;
  token: string;
}) => {
  try {
    await axiosInstance.delete(`wishlist/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};
