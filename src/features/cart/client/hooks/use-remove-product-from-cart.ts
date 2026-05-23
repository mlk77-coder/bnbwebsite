import useCartCountStore from "@/store/use-cart-count-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

const useRemoveProductFromCart = (cartItemId: number, quantity: number) => {
  const tAuth = useTranslations("auth");
  const genericError = tAuth("something-went-wrong-please-try-again");

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
    return genericError;
  };
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const decrementProductsCount = useCartCountStore(
    (state) => state.decrementProductsCount
  );

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/cart/${cartItemId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      decrementProductsCount(quantity);
    },
    onError: (error) => {
      if (isAxiosError(error) && error?.response?.data?.message)
        toast.error(getToastMessage(error.response.data.message));
      else if (error instanceof Error) toast.error(error.message);
      else toast.error(genericError);
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
