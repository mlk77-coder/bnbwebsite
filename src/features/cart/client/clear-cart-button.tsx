"use client";

import ConfirmationDialog from "@/components/confirmation-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import useClearCart from "@/features/cart/client/hooks/use-clear-cart";

const ClearCartButton = () => {
  const t = useTranslations();
  const { isOpenDialog, setIsOpenDialog, mutate, isPending } = useClearCart();

  return (
    <ConfirmationDialog
      open={isOpenDialog}
      onOpenChange={setIsOpenDialog}
      title={t("cart.clear-cart")}
      description={t("cart.clear-cart-confirmation")}
      icon={Trash2}
      confirmLabel={t("global.confirm")}
      onConfirm={() => mutate()}
      isPending={isPending}
      trigger={
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Trash2 className="size-4" />
          {t("cart.clear-cart")}
        </Button>
      }
    />
  );
};

export default ClearCartButton;
