import useCartCountStore from "@/store/use-cart-count-store";
import useCartShoppingStore from "@/store/use-cart-shopping-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

const getToastMessage = (message: unknown) => {
  if (typeof message === "string") return message;
  if (
    message &&
    typeof message === "object" &&
    "message" in message &&
    typeof message.message === "string"
  ) {
    return message.message;
  }
  return "Something went wrong, please try again";
};

const useClearCart = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const resetCartCount = useCartCountStore((state) => state.reset);
  const resetCartSummary = useCartShoppingStore((state) => state.reset);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete("/api/cart");
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      resetCartCount();
      resetCartSummary();
    },
    onError: (error) => {
      if (isAxiosError(error) && error?.response?.data?.message)
        toast.error(getToastMessage(error.response.data.message));
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

export default useClearCart;
