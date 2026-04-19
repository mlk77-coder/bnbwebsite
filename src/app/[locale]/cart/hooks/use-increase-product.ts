import useCartCountStore from "@/store/use-cart-count-store";
import { CartProduct } from "@/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const useIncreaseProduct = (product: CartProduct, userToken: string) => {
  const queryClient = useQueryClient();
  const incrementProductsCount = useCartCountStore(
    (state) => state.incrementProductsCount
  );
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (newQuantity: number) => {
      const response = await axios.get("/api/cart/increase", {
        params: {
          slug: product.slug,
          user_token: userToken,
          quantity: newQuantity,
          variant_id: product.variant_id,
        },
      });
      return response;
    },
    onSuccess: (_data, variable) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      incrementProductsCount(variable);
    },
    onError: (error) => {
      if (isAxiosError(error) && error?.response?.data?.message)
        toast.error(error.response.data.message);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong, please try again");
    },
  });

  const handleIncreaseProduct = async (newQuantity: number) => {
    mutateAsync(newQuantity - product.quantity);
  };

  return { handleIncreaseProduct, isPending };
};

export default useIncreaseProduct;
