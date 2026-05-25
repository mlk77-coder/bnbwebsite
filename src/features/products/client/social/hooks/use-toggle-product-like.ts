'use client';

import { toggleProductLike } from '@/features/products/api/toggle-product-like';
import { ProductLikesData } from '@/types/product-social';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const useToggleProductLike = (
  productId: number,
  token: string,
  initialLikes: ProductLikesData
) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const queryKey = ['product-likes', productId, token];

  const { mutate, isPending } = useMutation({
    mutationFn: () => toggleProductLike({ productId, token }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<ProductLikesData>(queryKey);
      const next: ProductLikesData = previous
        ? {
            is_liked: !previous.is_liked,
            likes_count: previous.is_liked
              ? Math.max(0, previous.likes_count - 1)
              : previous.likes_count + 1,
          }
        : {
            is_liked: !initialLikes.is_liked,
            likes_count: initialLikes.is_liked
              ? Math.max(0, initialLikes.likes_count - 1)
              : initialLikes.likes_count + 1,
          };
      queryClient.setQueryData(queryKey, next);
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
      toast.error(t('product-social.like-error'));
    },
    onSuccess: result => {
      if (result !== 'success') {
        toast.error(result);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { toggleLike: mutate, isPending };
};

export default useToggleProductLike;
