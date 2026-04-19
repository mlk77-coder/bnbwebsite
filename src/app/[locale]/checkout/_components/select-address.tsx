"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import CheckoutAddAddressForm from "./checkout-add-address-form";
import { FieldValues, UseFormReturn } from "react-hook-form";

type PropsType = {
  session: string;
  children: React.ReactNode;
  checkoutForm: UseFormReturn<FieldValues>;
};

const SelectAddress: FC<PropsType> = ({ session, children, checkoutForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("address.add.title")}</DialogTitle>
          <DialogDescription>{t("address.add.description")}</DialogDescription>
        </DialogHeader>
        <CheckoutAddAddressForm
          setOpen={setIsOpen}
          checkoutForm={checkoutForm}
          session={session}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SelectAddress;
