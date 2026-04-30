"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from "@/components/ui/loader";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

type PropsType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
};

const LogoutConfirmDialog: FC<PropsType> = ({
  open,
  onOpenChange,
  onConfirm,
  isPending,
}) => {
  const t = useTranslations();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-primary/10 overflow-hidden rounded-3xl p-0 sm:max-w-md">
        <div className="to-primary/5 bg-linear-to-br from-red-50 via-white p-6">
          <DialogHeader className="flex! flex-row items-center justify-center gap-4">
            <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <LogOut className="size-4.5" />
            </div>
            <div>
              <DialogTitle className="text-start text-xl">
                {t("auth.logout-confirm-title")}
              </DialogTitle>
              <DialogDescription className="text-start">
                {t("auth.logout-confirm-description")}
              </DialogDescription>
            </div>
          </DialogHeader>
        </div>
        <DialogFooter className="gap-2 p-5 pt-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-2xl"
          >
            {t("global.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            className="gap-2 rounded-2xl"
          >
            {isPending ? <Loader size="xs" /> : null}
            {t("sign-out")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutConfirmDialog;
