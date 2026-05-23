import { GetFavoriteIdsOptions } from '@/features/auth';
import {
  addToWishListAction,
  removeFromWishListAction,
} from '@/app/actions/wishlist-actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const useToggleWishList = (token: string, id: number) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      productId,
      isInWishlist,
      token,
    }: {
      productId: number;
      isInWishlist: boolean;
      token: string;
    }) => {
      if (isInWishlist) {
        return removeFromWishListAction({ productId, token });
      }
      return addToWishListAction({ productId, token });
    },
    onSuccess: (response, variable) => {
      const { productId } = variable;
      if (response === 'success') {
        const key = GetFavoriteIdsOptions(token).queryKey;
        const wishlist = queryClient.getQueryData<{
          productIds: number[];
          wishlistItemIdByProductId: Record<number, number>;
        }>(key);

        if (wishlist) {
          if (variable.isInWishlist) {
            queryClient.setQueryData(key, {
              productIds: wishlist.productIds.filter(item => item !== productId),
              wishlistItemIdByProductId: Object.fromEntries(
                Object.entries(wishlist.wishlistItemIdByProductId).filter(
                  ([k]) => Number(k) !== productId
                )
              ),
            });
            toast.success(t('wishlist-removed-success'));
          } else {
            queryClient.invalidateQueries({ queryKey: key });
            toast.success(t('wishlist-added-success'));
          }
        }
      } else {
        toast.error(response);
      }
    },
  });
  const handleToggleWishList = () => {
    const wishlist = queryClient.getQueryData<{
      productIds: number[];
      wishlistItemIdByProductId: Record<number, number>;
    }>(GetFavoriteIdsOptions(token).queryKey);
    const isInWishlist = wishlist?.productIds.includes(id) ?? false;
    mutate({ productId: id, isInWishlist, token });
  };

  return {
    handleToggleWishList,
    isPending,
  };
};

export default useToggleWishList;
