import { contactUsAction } from "@/app/actions/conact-us-action";
import { CustomSession } from "@/lib/auth-options";
import { splitCountryCode } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { ContactSchema } from "@/schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  type Resolver,
  type SubmitHandler,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { z } from "zod";

type ContactFormValues = z.infer<typeof ContactSchema>;

type ContactUsFormHook = {
  form: UseFormReturn<ContactFormValues>;
  acceptedPrivacyPolicy: boolean;
  acceptedTermsAndConditions: boolean;
  onSubmit: SubmitHandler<ContactFormValues>;
  isPending: boolean;
};

const useContactUs = (session: CustomSession | null): ContactUsFormHook => {
  const t = useTranslations("contact-us");
  const router = useRouter();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema) as Resolver<ContactFormValues>,
    defaultValues: {
      email: session?.user?.email ?? "",
      message: "",
      name: session?.user?.name ?? "",
      order_number: "",
      phone: session?.user?.phone
        ? splitCountryCode(session.user.phone)
        : { code: "", number: "" },
      acceptPrivacyPolicy: false,
      acceptTermsAndConditions: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: contactUsAction,
    onSuccess: (data) => {
      if (data === "success") {
        toast.success(t("message-sent-success"));
        router.push("/");
        form.reset();
      } else toast.error(data);
    },
  });

  const acceptedPrivacyPolicy = form.watch("acceptPrivacyPolicy");
  const acceptedTermsAndConditions = form.watch("acceptTermsAndConditions");

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("message", data.message);
    if (data.order_number) formdata.append("order_number", data.order_number);
    formdata.append("phone", `${data.phone.code}${data.phone.number}`);
    mutate({
      token: session?.user?.access_token ?? "",
      body: formdata,
    });
  };

  return {
    form,
    acceptedPrivacyPolicy,
    acceptedTermsAndConditions,
    onSubmit,
    isPending,
  };
};

export default useContactUs;
