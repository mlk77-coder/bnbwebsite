import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VerifyAccountForm from "./verify-account-form";
import { Dispatch, FC, SetStateAction } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getLangDir } from "rtl-detect";

type PropsType = {
  email: string;
  open: boolean;
  fromLogin?: boolean;
  password: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const VerifyAccountDialog: FC<PropsType> = ({
  email,
  open,
  fromLogin = false,
  setOpen,
  password,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const dir = getLangDir(locale);
  const fromLoginDescription = fromLogin
    ? t("auth.verify-description")
    : t("auth.verify-description-sign-up");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent dir={dir}>
        <DialogHeader>
          <DialogTitle>{t("auth.verify")}</DialogTitle>
          <DialogDescription>{fromLoginDescription}</DialogDescription>
          <VerifyAccountForm
            email={email}
            password={password}
            setOpen={setOpen}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
