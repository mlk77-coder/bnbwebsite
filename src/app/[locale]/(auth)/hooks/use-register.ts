import { registerAction } from "@/app/actions/auth-actions";
import { RegisterSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useRegister = () => {
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: {
        code: "",
        number: "",
      },
      password_confirmation: "",
      accepted_privacy: false,
      subscribed_to_emails: true,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: registerAction,
    onSuccess(response) {
      if (response === "success") {
        toast.success("account created successfully");
        setOpenVerifyDialog(true);
      } else {
        toast.error(response);
      }
    },
  });
  const onSubmit = (data: RegisterSchema) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append(
      "subscribed_to_emails",
      data.subscribed_to_emails ? "1" : "0"
    );
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("phone", `${data.phone.code}${data.phone.number}`);
    mutate(formData);
  };

  return {
    form,
    onSubmit,
    isPending,
    openVerifyDialog,
    setOpenVerifyDialog,
  };
};

export default useRegister;
