"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import VerifyAccountForm from "./verify-account-form";
import { Dispatch, FC, SetStateAction } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getLangDir } from "rtl-detect";
import { MessageSquareDot, ShieldCheck } from "lucide-react";

type PropsType = {
  phone: string;
  open: boolean;
  fromLogin?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const VerifyAccountDialog: FC<PropsType> = ({
  phone,
  open,
  fromLogin = false,
  setOpen,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const dir = getLangDir(locale);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        dir={dir}
        className="overflow-hidden rounded-xl border-border/60 p-0 shadow-2xl sm:max-w-sm"
      >
        <DialogTitle className="sr-only">{t("auth.verify")}</DialogTitle>
        {/* Top accent bar */}
        <div className="h-1 w-full bg-linear-to-r from-primary via-amber-300 to-primary" />

        {/* Blobs */}
        <div className="bg-primary/10 absolute -top-16 -inset-e-16 size-32 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -inset-s-16 size-32 rounded-full bg-amber-200/20 blur-3xl" />

        <div className="relative px-6 pb-7 pt-5">
          {/* Icon + Header */}
          <div className="mb-5 flex flex-col items-center gap-3 text-center">
            <div className="relative flex size-16 items-center justify-center rounded-2xl bg-primary/10">
              <MessageSquareDot className="size-8 text-primary" strokeWidth={1.5} />
              <div className="absolute -inset-e-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-md shadow-primary/30">
                6
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {t("auth.verify")}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {fromLogin
                  ? t("auth.verify-description")
                  : t("auth.verify-description-sign-up")}
              </p>
            </div>
            {/* OTP secure badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="size-3.5" />
              {t("auth.otp-secure-verification")}
            </div>
          </div>

          <VerifyAccountForm phone={phone} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
