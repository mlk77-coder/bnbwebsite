"use client";

import { getCurrency } from "@/api/currency/get-currency";
import CitiesSelectForm from "@/components/cities-select-form";
import CountriesSelectForm from "@/components/countries-select-form";
import FormInput from "@/components/form-input";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { countries } from "@/constant/countries";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import useCheckoutAddAddress from "../_hooks/use-checkout-add-address";

type PropsType = {
  session: string;
  checkoutForm: UseFormReturn<FieldValues>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CheckoutAddAddressForm: FC<PropsType> = ({
  session,
  checkoutForm,
  setOpen,
}) => {
  const t = useTranslations();
  const { form, isPending, onSubmit } = useCheckoutAddAddress(
    session,
    checkoutForm,
    setOpen
  );
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="size-full space-y-4 flex-1"
      >
        <FormInput
          control={form.control}
          name="name"
          className="border-border"
          label={t("address-name")}
        />
        <CountriesSelectForm />
        <CitiesSelectForm />
        <FormInput
          control={form.control}
          name="address"
          className="border-border"
          label={t("address-label")}
        />
        <SheetFooter className="gap-2 pb-5 capitalize">
          <Button disabled={isPending}>
            <SubmitButton isPending={isPending} text={t("global.confirm")} />
          </Button>
          <SheetClose asChild>
            <Button variant="outline">{t("global.cancel")}</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default CheckoutAddAddressForm;
