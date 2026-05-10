import { CartItem } from "@/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
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

const useUpdateCartItem = (item: CartItem) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (quantity: number) => {
      const response = await axios.put(`/api/cart/${item.id}`, {
        quantity,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      if (isAxiosError(error) && error?.response?.data?.message)
        toast.error(getToastMessage(error.response.data.message));
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong, please try again");
    },
  });

  return mutation;
};

export default useUpdateCartItem;
