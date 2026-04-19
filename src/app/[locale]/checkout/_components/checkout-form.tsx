"use client";

import FormInput from "@/components/form-input";
import FormTextArea from "@/components/form-text-area";
import PhoneNumberInputForm from "@/components/phone-number-input-form";
import { CustomSession } from "@/lib/auth-options";
import { CheckoutSchema } from "@/schemas/checkout.schema";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import CheckoutAddNewAddress from "./checkout-add-new-address";

type PropsType = {
  session: CustomSession | null;
};

const CheckoutForm: FC<PropsType> = ({ session }) => {
  const form = useFormContext<CheckoutSchema>();
  const t = useTranslations();
  return (
    <form className="space-y-6 pt-4">
      <div className="space-y-4">
        <h2 className="uppercase font-medium text-xl">
          {t("contact-information")}
        </h2>
        <FormInput
          control={form.control}
          name="name"
          label={t("form.fields.name")}
        />
        <FormInput
          control={form.control}
          name="email"
          label={t("form.fields.email")}
        />
        <PhoneNumberInputForm />
        <FormTextArea
          control={form.control}
          name="description"
          label={t("form.fields.additional-info")}
        />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="uppercase font-medium text-xl">
            {t("address-details")}
          </h2>
        </div>
        <CheckoutAddNewAddress session={session} />
      </div>
    </form>
  );
};

export default CheckoutForm;
