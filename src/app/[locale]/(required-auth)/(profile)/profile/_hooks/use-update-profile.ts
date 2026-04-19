import { updateProfileAction } from "@/app/actions/profile-actions";
import { CustomSession } from "@/lib/auth-options";
import { convertFileToURL, splitCountryCode } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { UpdateProfileSchema } from "@/schemas/profile.shema";
import { Profile } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useUpdateProfile = (user: Profile, session: CustomSession) => {
  const { update } = useSession();
  const router = useRouter();
  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      email: user.email,
      gender: user.gender || "",
      name: user.name,
      image: new File([], ""),
      birthdate: user.birthdate ? new Date(user.birthdate) : undefined,
      phone: splitCountryCode(user.phone),
      subscribed_to_emails: user.subscribed_to_emails,
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: updateProfileAction,
    onSuccess: async (data) => {
      if (data === "success") {
        toast.success("Profile updated successfully");
      } else toast.error(data);
    },
  });

  const onSubmit = (data: UpdateProfileSchema) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append(
      "subscribed_to_emails",
      data.subscribed_to_emails ? "1" : "0"
    );
    if (data.birthdate)
      formData.append("birthdate", format(data.birthdate, "yyyy-MM-dd"));
    if (data.image.name) formData.append("image", data.image);
    if (data.phone.number)
      formData.append("phone", `${data.phone.code}${data.phone.number}`);
    if (data.gender) formData.append("gender", data.gender);
    mutate(
      { token: session?.user?.access_token || "", body: formData },
      {
        onSuccess: async () => {
          await update({
            name: data.name,
            email: data.email,
            image: data.image.name ? convertFileToURL(data.image) : "",
            phone: `${data.phone.code}${data.phone.number}`,
          });
          router.refresh();
        },
      }
    );
  };

  return { onSubmit, isPending, form };
};

export default useUpdateProfile;
