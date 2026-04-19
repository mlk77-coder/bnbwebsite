import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLocale, useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction } from "react";
import { getLangDir } from "rtl-detect";
import CheckCodeForm from "./check-code-form";

type PropsType = {
  email: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CheckCodeDialog: FC<PropsType> = ({ email, open, setOpen }) => {
  const t = useTranslations();
  const locale = useLocale();
  const dir = getLangDir(locale);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent dir={dir}>
        <DialogHeader>
          <DialogTitle>{t("auth.check-code")}</DialogTitle>
          <DialogDescription>
            {t("auth.check-code-description")}
          </DialogDescription>
          <CheckCodeForm email={email} setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CheckCodeDialog;
