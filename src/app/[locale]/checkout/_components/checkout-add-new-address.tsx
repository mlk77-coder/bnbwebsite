"use client";

import SelectAddressFormInput from "@/app/[locale]/checkout/_components/select-address-form-input";
import { CustomSession } from "@/lib/auth-options";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";

type PropsType = {
  session: CustomSession | null;
};

const CheckoutAddNewAddress: FC<PropsType> = ({ session }) => {
  const t = useTranslations();
  const token = session?.user?.access_token;
  if (token) return <SelectAddressFormInput token={token} />;

  return (
    <p className="text-sm leading-relaxed text-muted-foreground">
      <Link
        href="/login"
        className="font-semibold text-primary underline-offset-4 hover:underline"
      >
        {t("auth.sign-in")}
      </Link>{" "}
      {t("checkout-sign-in-select-address")}
    </p>
  );
};

export default CheckoutAddNewAddress;
