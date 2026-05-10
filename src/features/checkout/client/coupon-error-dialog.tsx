"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleX } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

type PropsType = {
  errorMessage: string;
  open: boolean;
  onClose: () => void;
};

const CouponErrorDialog: FC<PropsType> = ({ errorMessage, open, onClose }) => {
  const t = useTranslations();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center text-center">
            <span className="sr-only">error when adding coupon</span>
            <CircleX strokeWidth={1.2} className="text-red-500 size-24" />
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-center items-center flex-col gap-6">
          <p className="text-center text-lg font-medium">{errorMessage}</p>
          <DialogClose asChild>
            <Button size="lg">{t("ok")}</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CouponErrorDialog;
