import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomSession } from "@/lib/auth-options";
import { getTranslations } from "next-intl/server";
import { FC } from "react";
import EditAddressForm from "./edit-address-form";
import { Address } from "@/types/address";

type PropsType = {
  session: CustomSession;
  address: Address;
};
const EditAddress: FC<PropsType> = async ({ session, address }) => {
  const t = await getTranslations();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-0 underline" variant="link">
          {t("global.edit")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("address.edit.title")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("address.edit.title")}
          </DialogDescription>
        </DialogHeader>
        <EditAddressForm address={address} session={session} />
      </DialogContent>
    </Dialog>
  );
};

export default EditAddress;
