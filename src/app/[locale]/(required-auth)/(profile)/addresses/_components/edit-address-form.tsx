"use client";

import CitiesSelectForm from "@/components/cities-select-form";
import CountriesSelectForm from "@/components/countries-select-form";
import FormInput from "@/components/form-input";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { CustomSession } from "@/lib/auth-options";
import { Address } from "@/types/address";
import { useTranslations } from "next-intl";
import { FC } from "react";
import useEditAddress from "../_hooks/use-edit-address";

type PropsType = {
  session: CustomSession;
  address: Address;
};
const EditAddressForm: FC<PropsType> = ({ session, address }) => {
  const t = useTranslations();
  const { form, isPending, onSubmit } = useEditAddress(
    session?.user?.access_token || "",
    address
  );
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="size-full space-y-2 flex-1"
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
        <SheetFooter className="gap-2 capitalize">
          <Button disabled={isPending}>
            <SubmitButton isPending={isPending} text={t("global.edit")} />
          </Button>
          <SheetClose asChild>
            <Button variant="outline">{t("global.cancel")}</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default EditAddressForm;
