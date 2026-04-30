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
          className="size-full min-h-44 flex-col rounded-3xl border-dashed border-primary/25 bg-primary/5 capitalize text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          variant="outline"
        >
          <span className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Plus className="size-6" />
          </span>
          <span className="font-semibold capitalize">{t("add-new-adress")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto rounded-3xl">
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
