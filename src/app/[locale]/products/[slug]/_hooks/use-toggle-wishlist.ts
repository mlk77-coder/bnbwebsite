import { GetFavoriteIdsOptions } from "@/app/[locale]/(auth)/hooks/use-get-favorite-ids";
import { toggleWishListAction } from "@/app/actions/wishlist-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useToggleWishList = (token: string, id: number) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: toggleWishListAction,
    onSuccess: (response, variable) => {
      const { id } = variable;
      if (response === "success") {
        const key = GetFavoriteIdsOptions(token).queryKey;
        const wishlist = queryClient.getQueryData(key);
        if (wishlist) {
          if (wishlist.includes(id)) {
            queryClient.setQueryData(
              key,
              wishlist.filter((item) => item !== id)
            );
            toast.success("This product has been removed from wishlist");
          } else {
            queryClient.setQueryData(key, [...wishlist, id]);
            toast.success("This product has been added to wishlist");
          }
        }
      } else {
        toast.error(response);
      }
    },
  });
  const handleToggleWishList = () => {
    mutate({ id, token });
  };

  return {
    handleToggleWishList,
    isPending,
  };
};

export default useToggleWishList;
