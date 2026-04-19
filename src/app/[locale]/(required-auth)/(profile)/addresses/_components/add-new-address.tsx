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
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import AddAddressForm from "./add-address-form";
type PropsType = {
  session: CustomSession;
};
const AddNewAddress: FC<PropsType> = ({ session }) => {
  const t = useTranslations();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="size-full min-h-44 border-border rounded capitalize shadow flex-col"
          variant="outline"
        >
          <Plus className="size-10" />
          <span className="capitalize">{t("add-new-adress")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("address.add.title")}</DialogTitle>
          <DialogDescription>{t("address.add.description")}</DialogDescription>
        </DialogHeader>
        <AddAddressForm session={session} />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewAddress;
