"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleAlert, X } from "lucide-react";
import { FC } from "react";
import useRemoveProductFromCart from "@/features/cart/client/hooks/use-remove-product-from-cart";
import { CartItem } from "@/types/cart";
import { useTranslations } from "next-intl";

type PropsType = {
  item: CartItem;
};
const RemoveProductFromCart: FC<PropsType> = ({ item }) => {
  const { quantity } = item;
  const { name } = item.product;
  const { isOpenDialog, setIsOpenDialog, mutate, isPending } =
    useRemoveProductFromCart(item.id, quantity);
  const t = useTranslations();
  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button
          className="absolute top-4 inset-e-4 z-10 size-8 rounded-full border-primary/10 bg-white/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-red-50 hover:text-red-500"
          variant="outline"
          size="icon"
        >
          <span className="sr-only">Remove product {name} from cart</span>
          <X className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <span className="flex w-full justify-center items-center">
              <span className="sr-only">remove product {name} from cart</span>
              <CircleAlert strokeWidth={1} className="size-24 text-orange" />
            </span>
          </DialogTitle>
          <DialogDescription className="text-lg text-center w-11/12 mx-auto text-foreground">
            {t(
              "are-you-sure-you-want-to-remove-this-product-from-your-cart"
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center max-sm:gap-2 w-full">
          <Button
            onClick={() => mutate()}
            disabled={isPending}
            size="lg"
            className="sm:w-28 text-base gap-2"
          >
            {isPending ? <Loader size="xs" /> : null}
            {t("ok")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="sm:w-28 text-base"
            onClick={() => setIsOpenDialog(false)}
          >
            {t("global.cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveProductFromCart;
