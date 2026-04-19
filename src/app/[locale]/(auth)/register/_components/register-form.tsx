"use client";
import FormCheckbox from "@/components/form-checkbox";
import FormInput from "@/components/form-input";
import PasswordInput from "@/components/password-input";
import PhoneNumberInputForm from "@/components/phone-number-input-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { FC, Fragment } from "react";
import { VerifyAccountDialog } from "../../_components/verify-account-dialog";
import useRegister from "../../hooks/use-register";
import AlreadyHaveAnAccount from "./already-have-an-account";
import PasswordRoles from "./password-roles";
type PropsType = {
  hardLink?: boolean;
};

const RegisterForm: FC<PropsType> = ({ hardLink = false }) => {
  const t = useTranslations();
  const { form, isPending, onSubmit, openVerifyDialog, setOpenVerifyDialog } =
    useRegister();

  return (
    <Fragment>
      <Form {...form}>
        <form
          className="w-full mt-6 space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
          <PasswordInput
            control={form.control}
            descriptionClassName="grid grid-cols-2 gap-2"
            name="password"
            label={t("form.fields.password")}
          >
            <PasswordRoles />
          </PasswordInput>
          <PasswordInput
            control={form.control}
            name="password_confirmation"
            label={t("confirm-password.confirm-password")}
          />
          <div className="w-full flex justify-start items-center">
            <FormCheckbox
              control={form.control}
              name="accepted_privacy"
              label={
                <p className="text-base normal-case">
                  {t.rich("register.accept-privacy-policy", {
                    policy: (text) => (
                      <Link
                        className={cn("text-foreground underline")}
                        href="/privacy-policy"
                      >
                        {text}
                      </Link>
                    ),
                    terms: (text) => (
                      <Link
                        className={cn("text-foreground underline")}
                        href="/terms-and-conditions"
                      >
                        {text}
                      </Link>
                    ),
                  })}
                </p>
              }
            />
          </div>
          <div className="w-full flex justify-start items-center">
            <FormCheckbox
              control={form.control}
              name="subscribed_to_emails"
              label={
                <p className="text-base normal-case">
                  {t("register.enabled-email")}
                </p>
              }
            />
          </div>
          <Button
            disabled={isPending || form.watch("accepted_privacy") === false}
            size="lg"
            className="w-full text-xl rounded-lg"
          >
            {t("auth.sign-up")}
          </Button>
          <AlreadyHaveAnAccount hardLink={hardLink} />
        </form>
      </Form>
      <VerifyAccountDialog
        email={form.getValues("email")}
        password={form.getValues("password")}
        open={openVerifyDialog}
        setOpen={setOpenVerifyDialog}
      />
    </Fragment>
  );
};

export default RegisterForm;
