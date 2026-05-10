"use client";

import CheckoutAddAddressForm from "@/features/checkout/client/checkout-add-address-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";

type PropsType = {
  session: string;
  children: React.ReactNode;
};

const SelectAddress: FC<PropsType> = ({ session, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t("address.add.title")}</SheetTitle>
          <SheetDescription>{t("address.add.description")}</SheetDescription>
        </SheetHeader>
        <CheckoutAddAddressForm setOpen={setIsOpen} session={session} />
      </SheetContent>
    </Sheet>
  );
};

export default SelectAddress;
