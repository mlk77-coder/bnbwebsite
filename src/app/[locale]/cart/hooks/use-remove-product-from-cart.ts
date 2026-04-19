import useCartCountStore from "@/store/use-cart-count-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useRemoveProductFromCart = (
  id: number | null,
  slug: string,
  quantity: number,
  userToken: string
) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const decrementProductsCount = useCartCountStore(
    (state) => state.decrementProductsCount
  );

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete("/api/cart", {
        params: {
          slug,
          user_token: userToken,
          variant_id: id,
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      decrementProductsCount(quantity);
    },
    onError: (error) => {
      if (isAxiosError(error) && error?.response?.data?.message)
        toast.error(error.response.data.message);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong, please try again");
    },
    onSettled: () => {
      setIsOpenDialog(false);
    },
  });

  return {
    isOpenDialog,
    setIsOpenDialog,
    ...mutation,
  };
};

export default useRemoveProductFromCart;
