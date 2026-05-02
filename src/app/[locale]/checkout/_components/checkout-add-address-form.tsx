"use client";

import AddressLocationPicker from "@/components/address-location-picker";
import FormCheckbox from "@/components/form-checkbox";
import FormInput from "@/components/form-input";
import PhoneNumberInputForm from "@/components/phone-number-input-form";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
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
          name="address_name"
          className="border-border"
          label={t("address-name")}
        />
        <FormInput
          control={form.control}
          name="type"
          className="border-border"
          label={t("address-fields.type")}
        />
        <FormInput
          control={form.control}
          name="city"
          className="border-border"
          label={t("form.city")}
        />
        <FormInput
          control={form.control}
          name="area"
          className="border-border"
          label={t("address-fields.area")}
        />
        <FormInput
          control={form.control}
          name="street_address"
          className="border-border"
          label={t("address-label")}
        />
        <FormInput
          control={form.control}
          name="building_number"
          className="border-border"
          label={t("address-fields.building-number")}
        />
        <FormInput
          control={form.control}
          name="details"
          className="border-border"
          label={t("address-fields.details")}
        />
        <PhoneNumberInputForm borderColor="border" />
        <AddressLocationPicker form={form} />
        <FormCheckbox
          control={form.control}
          name="is_default"
          label={t("address-fields.set-as-default")}
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
