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
import { CircleAlert, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import useClearCart from "../hooks/use-clear-cart";

const ClearCartButton = () => {
  const t = useTranslations();
  const { isOpenDialog, setIsOpenDialog, mutate, isPending } = useClearCart();

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Trash2 className="size-4" />
          {t("cart.clear-cart")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <span className="flex w-full justify-center items-center">
              <span className="sr-only">{t("cart.clear-cart")}</span>
              <CircleAlert strokeWidth={1} className="size-24 text-orange" />
            </span>
          </DialogTitle>
          <DialogDescription className="text-lg text-center w-11/12 mx-auto text-foreground">
            {t("cart.clear-cart-confirmation")}
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

export default ClearCartButton;
