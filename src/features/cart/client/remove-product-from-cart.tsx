"use client";

import ConfirmationDialog from "@/components/confirmation-dialog";
import { Button } from "@/components/ui/button";
import { X, ShoppingCart } from "lucide-react";
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
    <ConfirmationDialog
      open={isOpenDialog}
      onOpenChange={setIsOpenDialog}
      title={t("global.remove")}
      description={t(
        "are-you-sure-you-want-to-remove-this-product-from-your-cart"
      )}
      icon={ShoppingCart}
      confirmLabel={t("global.remove")}
      onConfirm={() => mutate()}
      isPending={isPending}
      trigger={
        <Button
          className="absolute top-4 inset-e-4 z-10 size-8 rounded-full border-primary/10 bg-white/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-red-50 hover:text-red-500"
          variant="outline"
          size="icon"
        >
          <span className="sr-only">Remove product {name} from cart</span>
          <X className="size-4" />
        </Button>
      }
    />
  );
};

export default RemoveProductFromCart;
