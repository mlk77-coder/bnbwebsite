"use client";

import { changePasswordAction } from "@/features/profile/api/profile-actions";
import { CustomSession } from "@/lib/auth-options";
import { ChangePasswordSchema } from "@/schemas/profile.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useChangePassword = (session: CustomSession) => {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: changePasswordAction,
    onSuccess: async (data) => {
      if (data === "success") {
        toast.success("Password changed successfully");
        form.reset();
      } else toast.error(data);
    },
  });

  const onSubmit = (data: ChangePasswordSchema) => {
    const formData = new FormData();
    formData.append("current_password", data.current_password);
    formData.append("new_password", data.new_password);
    formData.append(
      "new_password_confirmation",
      data.new_password_confirmation
    );
    mutate({ token: session?.user?.access_token || "", body: formData });
  };

  return { onSubmit, isPending, form };
};

export default useChangePassword;
