"use client";

import SelectAddressFormInput from "@/app/[locale]/checkout/_components/select-address-form-input";
import CitiesSelectForm from "@/components/cities-select-form";
import CountriesSelectForm from "@/components/countries-select-form";
import FormInput from "@/components/form-input";
import { CustomSession } from "@/lib/auth-options";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  session: CustomSession | null;
};

const CheckoutAddNewAddress: FC<PropsType> = ({ session }) => {
  const form = useFormContext();
  const t = useTranslations();
  if (session && session.user)
    return <SelectAddressFormInput token={session.user.access_token || ""} />;
  return (
    <div className="space-y-3">
      <CountriesSelectForm className="border-foreground" name="countryId" />
      <CitiesSelectForm
        className="border-foreground"
        name="countryId"
        cityName="city_id"
      />
      <FormInput
        control={form.control}
        name="street"
        label={t("address-label")}
      />
    </div>
  );
};

export default CheckoutAddNewAddress;
