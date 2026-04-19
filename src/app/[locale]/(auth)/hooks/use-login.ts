import redirectHard from "@/app/actions/redirect-hard-action";
import { useRouter } from "@/navigation";
import { LoginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSendCode from "./use-send-code";

const useLogin = (userToken: string) => {
  const router = useRouter();
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const { handleSendCode } = useSendCode();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const body = {
        ...data,
        s_id: userToken,
      };
      const response = await signIn("credentials", {
        ...body,
        callbackUrl:
          new URLSearchParams(window.location.search).get("callbackUrl") || "/",
        redirect: false,
      });
      return response;
    },
    onSuccess: async (response, variable) => {
      if (response) {
        if (response?.ok) {
          toast.success("logged in successfully");
          router.push(response.url || "/");
          router.refresh();
        } else {
          if (response.error === "434") {
            setOpenVerifyDialog(true);
            await handleSendCode(variable.email);
          } else toast.error(response.error);
        }
      }
    },
    onError() {
      toast.error("Something went wrong, please try again");
    },
  });
  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };
  const handleRedirect = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    await redirectHard("/register");
  };

  return {
    form,
    isPending,
    onSubmit,
    handleRedirect,
    openVerifyDialog,
    setOpenVerifyDialog,
  };
};

export default useLogin;
