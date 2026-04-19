"use client";

import FormCheckbox from "@/components/form-checkbox";
import FormInput from "@/components/form-input";
import FormTextArea from "@/components/form-text-area";
import PhoneNumberInputForm from "@/components/phone-number-input-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomSession } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";
import useContactUs from "../_hooks/use-contact-us";

type PropsType = {
  session: CustomSession | null;
};

const ContactUsForm: FC<PropsType> = ({ session }) => {
  const t = useTranslations();
  const {
    acceptedPrivacyPolicy,
    acceptedTermsAndConditions,
    form,
    onSubmit,
    isPending,
  } = useContactUs(session);

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-7">
          <FormInput
            control={form.control}
            name="name"
            label={t("form.fields.name")}
          />
          <PhoneNumberInputForm />
          <FormInput
            control={form.control}
            name="email"
            label={t("form.fields.email")}
          />
          <FormInput
            control={form.control}
            name="order_number"
            label={t("form.fields.order_number")}
          />
          <div className="w-full md:col-span-2">
            <FormTextArea
              rows={6}
              control={form.control}
              name="message"
              label={t("form.fields.message")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <FormCheckbox
            control={form.control}
            name="acceptTermsAndConditions"
            label={
              <p className="text-base normal-case">
                {t.rich("contact-us.accept-policy", {
                  policy: (text) => (
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
          <FormCheckbox
            control={form.control}
            name="acceptPrivacyPolicy"
            label={
              <p className="text-base">
                {t.rich("contact-us.accept-privacy-policy", {
                  policy: (text) => (
                    <Link
                      className={cn("text-foreground underline")}
                      href="/privacy-policy"
                    >
                      {text}
                    </Link>
                  ),
                })}
              </p>
            }
          />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Button
            size="lg"
            className="uppercase"
            disabled={
              !acceptedPrivacyPolicy || !acceptedTermsAndConditions || isPending
            }
          >
            {t("global.submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactUsForm;
