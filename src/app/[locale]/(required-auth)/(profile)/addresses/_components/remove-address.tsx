"use client";

import { deleteAddressAction } from "@/app/actions/address-action";
import { toggleWishListAction } from "@/app/actions/wishlist-actions";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { CircleAlert, HeartIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { toast } from "sonner";

type PropsType = {
  id: number;
  name: string;
  token: string;
};

const RemoveAddress: FC<PropsType> = ({ id, name, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const { isPending, mutate } = useMutation({
    mutationFn: deleteAddressAction,
    onSuccess: (response) => {
      if (response === "success") {
        toast.success("This address has been removed successfully");
        setIsOpen(false);
        window.location.reload();
      } else toast.error(response);
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="px-0 underline" variant="link">
          {t("global.remove")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center text-center">
            <span className="sr-only">field to remove address</span>
            <CircleAlert strokeWidth={1.2} className="text-orange size-24" />
          </DialogTitle>
        </DialogHeader>
        <p className="text-center font-medium">
          {t("are-you-sure-you-want-to-remove-this-address", { name })}
        </p>
        <DialogFooter className="gap-2">
          <Button onClick={() => mutate({ id, token })} disabled={isPending}>
            <SubmitButton isPending={isPending} text={t("global.remove")} />
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">{t("global.cancel")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveAddress;
