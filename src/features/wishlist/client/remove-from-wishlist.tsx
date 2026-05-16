"use client";

import ConfirmationDialog from "@/components/confirmation-dialog";
import { removeFromWishListAction } from "@/features/wishlist/api/wishlist-actions";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HeartIcon, HeartOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { toast } from "sonner";

type PropsType = {
  productId: number;
  name: string;
  token: string;
};

const RemoveFromWishlist: FC<PropsType> = ({ productId, name, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: removeFromWishListAction,
    onSuccess: (response) => {
      if (response === "success") {
        toast.success("This product has been removed form wishlist");
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["user-wishlist", token] });
        queryClient.invalidateQueries({ queryKey: ["favorite-ids", token] });
      } else toast.error(response);
    },
  });

  return (
    <ConfirmationDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title={t("global.remove")}
      description={t("are-you-sure-you-want-to-remove-name-from-your-wishlist", {
        name,
      })}
      icon={HeartOff}
      confirmLabel={t("global.remove")}
      onConfirm={() => mutate({ productId, token })}
      isPending={isPending}
      trigger={
        <Button variant="ghost" size="icon" className="absolute inset-e-0 top-0">
          <span className="sr-only">Remove product {name} from wishlist</span>
          <HeartIcon strokeWidth={1.2} className="fill-red-500 text-red-500" />
        </Button>
      }
    />
  );
};

export default RemoveFromWishlist;
