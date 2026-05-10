"use client";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FC } from "react";

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
};

const CheckoutConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  isPending,
}) => {
  const t = useTranslations();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2">
          <AlertTriangle className="h-12 w-12 text-orange" />
          <DialogTitle>{t("checkout-confirmation-title")}</DialogTitle>
          <DialogDescription>
            {t("checkout-confirmation-description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-center">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            {t("global.cancel")}
          </Button>
          <Button onClick={onConfirm} disabled={isPending}>
            <SubmitButton isPending={isPending} text={t("pay-button")} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmationDialog;
