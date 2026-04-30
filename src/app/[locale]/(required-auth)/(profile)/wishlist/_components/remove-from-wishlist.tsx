"use client";

import { removeFromWishListAction } from "@/app/actions/wishlist-actions";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleAlert, HeartIcon } from "lucide-react";
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute inset-e-0 top-0">
          <span className="sr-only">Remove product {name} from wishlist</span>
          <HeartIcon strokeWidth={1.2} className="fill-red-500 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center text-center">
            <span className="sr-only">field to add this product to cart</span>
            <CircleAlert strokeWidth={1.2} className="text-orange size-24" />
          </DialogTitle>
        </DialogHeader>
        <p dir="auto" className="text-center text-lg font-medium">
          {t("are-you-sure-you-want-to-remove-name-from-your-wishlist", {
            name,
          })}
        </p>
        <DialogFooter className="max-md:gap-2 justify-center">
          <Button
            className="w-full"
            onClick={() => mutate({ productId, token })}
            disabled={isPending}
          >
            <SubmitButton isPending={isPending} text={t("global.remove")} />
          </Button>
          <DialogClose asChild>
            <Button className="w-full" variant="secondary">{t("global.cancel")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveFromWishlist;
