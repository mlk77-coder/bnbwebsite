"use client";

import PasswordInput from "@/components/password-input";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useChangePassword from "@/features/profile/client/hooks/use-change-password";
import { CustomSession } from "@/lib/auth-options";
import { useTranslations } from "next-intl";
import { FC } from "react";

type PropsType = {
  session: CustomSession;
};

const ChangePasswordForm: FC<PropsType> = ({ session }) => {
  const { form, isPending, onSubmit } = useChangePassword(session);
  const t = useTranslations();
  return (
    <Form {...form}>
      <form className="w-full space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold">{t("change-password")}</h2>
        <div className="w-full grid grid-cols-1 gap-y-6 md:*:w-1/2 gap-12">
          <PasswordInput
            className="border-border"
            control={form.control}
            name="current_password"
            label={t("form.fields.current-password")}
          />
          <PasswordInput
            className="border-border"
            control={form.control}
            name="new_password"
            inputMode="email"
            label={t("form.fields.new-password")}
          />
          <PasswordInput
            className="border-border"
            control={form.control}
            name="new_password_confirmation"
            inputMode="email"
            label={t("form.fields.new-password-confirmation")}
          />
        </div>
        <Button disabled={isPending} className="uppercase">
          <SubmitButton isPending={isPending} text={t("change-password")} />
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
