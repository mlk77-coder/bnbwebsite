"use client";

import { useForm } from "react-hook-form";
import { checkCodeAction } from "@/app/actions/auth-actions";
import FormInput from "@/components/form-input";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { VerifyAccountSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction } from "react";
import { toast } from "sonner";
import useSendCode from "../hooks/use-send-code";
import { useRouter } from "@/navigation";
import Cookies from "js-cookie"; // Import js-cookie

type PropsType = {
  email: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CheckCodeForm: FC<PropsType> = ({ email, setOpen }) => {
  const router = useRouter();
  const form = useForm<VerifyAccountSchema>({
    resolver: zodResolver(VerifyAccountSchema),
    defaultValues: {
      code: "",
    },
  });
  const t = useTranslations();
  const { handleSendCode, isPending: isPendingSendCode } = useSendCode(() => {
    toast.success("The verification code has been re-sent successfully");
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: checkCodeAction,
    onSuccess: async (response) => {
      if (response === "success") {
        setOpen(false);
        toast.success("Account verified successfully");

        // Set email and code in cookies
        Cookies.set("email", email, { expires: 1 / 24 }); // 1 hour = 1/24 of a day
        Cookies.set("code", form.getValues("code"), { expires: 1 / 24 });

        router.push("/reset-password", { scroll: false });
      } else toast.error(response);
    },
  });

  const onSubmit = async (data: VerifyAccountSchema) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", data.code);
    await mutateAsync(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          control={form.control}
          name="code"
          label={t("form.fields.code")}
        />
        <p className="w-full text-start text-sm">
          {t.rich("auth.resent-code-text", {
            resend: (text) => (
              <Button
                disabled={isPendingSendCode}
                className="h-auto px-1 py-0.5"
                onClick={() => handleSendCode(email)}
                variant="link"
                type="button"
              >
                {text}
              </Button>
            ),
          })}
        </p>
        <Button disabled={isPending} className="w-full text-base">
          <SubmitButton isPending={isPending} text={t("auth.verify")} />
        </Button>
      </form>
    </Form>
  );
};

export default CheckCodeForm;
