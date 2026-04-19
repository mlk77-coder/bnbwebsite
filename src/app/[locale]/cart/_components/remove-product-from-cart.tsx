"use client";

import { Button } from "@/components/ui/button";
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
import useRemoveProductFromCart from "../hooks/use-remove-product-from-cart";
import { CartProduct } from "@/types/cart";
import { useTranslations } from "next-intl";

type PropsType = {
  product: CartProduct;
  userToken: string;
};
const RemoveProductFromCart: FC<PropsType> = ({ product, userToken }) => {
  const { variant_id, slug, quantity, name } = product;
  const { isOpenDialog, setIsOpenDialog, mutate, isPending } =
    useRemoveProductFromCart(variant_id, slug, quantity, userToken);
  const t = useTranslations();
  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button
          className="absolute border-foreground/80 size-6 rounded bg-transparent top-4 end-4"
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
           {t('are-you-sure-you-want-to-remove-this-product-from-your-cart')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center max-sm:gap-2 w-full">
          <Button
            onClick={() => mutate()}
            disabled={isPending}
            size="lg"
            className="sm:w-28 text-base"
          >
            {t("ok")}
          </Button>
          <Button variant="outline" size="lg" className="sm:w-28 text-base">
            {t("global.cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveProductFromCart;
