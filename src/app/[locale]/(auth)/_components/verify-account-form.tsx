"use client";

import { verifiedAccountAction } from "@/app/actions/auth-actions";
import FormInput from "@/components/form-input";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "@/navigation";
import { VerifyAccountSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSendCode from "../hooks/use-send-code";

type PropsType = {
  email: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  password: string;
};

const VerifyAccountForm: FC<PropsType> = ({ email, setOpen, password }) => {
  const form = useForm<VerifyAccountSchema>({
    resolver: zodResolver(VerifyAccountSchema),
    defaultValues: {
      code: "",
    },
  });
  const t = useTranslations();
  const router = useRouter();
  const { handleSendCode, isPending: isPendingSendCode } = useSendCode(() => {
    toast.success("The verification code has been re-sent successfully");
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: verifiedAccountAction,
    onSuccess: async (response) => {
      if (response === "success") {
        setOpen(false);
        toast.success("Account verified successfully");
        try {
          const loginResponse = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
          if (loginResponse?.ok) {
            toast.success("Logged in successfully");
            router.push("/");
            router.refresh();
          }
        } catch (error) {
          toast.error("Something went wrong, please try again");
        }
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

export default VerifyAccountForm;
