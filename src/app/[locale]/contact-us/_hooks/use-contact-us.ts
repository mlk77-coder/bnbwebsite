import { contactUsAction } from "@/app/actions/conact-us-action";
import { CustomSession } from "@/lib/auth-options";
import { splitCountryCode } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { ContactSchema } from "@/schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useContactUs = (session: CustomSession | null) => {
  const router = useRouter();
  const form = useForm<ContactSchema>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      email: session && session.user ? session.user.email : "",
      message: "",
      name: session && session.user ? session.user.name : "",
      order_number: "",
      phone:
        session && session.user
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
        toast.success("Message sent successfully");
        router.push("/");
        form.reset();
      } else toast.error(data);
    },
  });

  const acceptedPrivacyPolicy = form.watch("acceptPrivacyPolicy");
  const acceptedTermsAndConditions = form.watch("acceptTermsAndConditions");

  const onSubmit = (data: ContactSchema) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("message", data.message);
    if (data.order_number) formdata.append("order_number", data.order_number);
    formdata.append("phone", `${data.phone.code}${data.phone.number}`);
    mutate({ token: session?.user?.access_token || "", body: formdata });
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
