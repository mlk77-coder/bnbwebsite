"use client";

import ChooseUserImageInput from "@/components/choose-user-image-input";
import FormInput from "@/components/form-input";
import PhoneNumberInputForm from "@/components/phone-number-input-form";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomSession } from "@/lib/auth-options";
import { Profile } from "@/types/profile";
import { useTranslations } from "next-intl";
import { FC } from "react";
import useUpdateProfile from "../_hooks/use-update-profile";

type PropsType = {
  userDetails: Profile;
  session: CustomSession;
};

const SettingsForm: FC<PropsType> = ({ userDetails, session }) => {
  const { form, isPending, onSubmit } = useUpdateProfile(userDetails, session);
  const t = useTranslations();

  return (
    <Form {...form}>
      <form className="w-full space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <ChooseUserImageInput
          placeholderImage={userDetails?.avatar || ""}
        />
        <div className="grid w-full grid-cols-1 gap-y-6 md:max-w-md">
          <FormInput
            className="border-border"
            control={form.control}
            name="name"
            label={t("form.fields.name")}
          />
          <FormInput
            className="border-border"
            control={form.control}
            name="email"
            inputMode="email"
            label={t("form.fields.email")}
          />
          <PhoneNumberInputForm borderColor="border" />
        </div>
        <Button disabled={isPending} className="uppercase">
          <SubmitButton isPending={isPending} text={t("update-details")} />
        </Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
