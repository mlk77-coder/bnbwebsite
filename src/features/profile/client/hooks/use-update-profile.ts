"use client";

import {
  updateAvatarAction,
  updateProfileAction,
} from "@/features/profile/api/profile-actions";
import { CustomSession } from "@/lib/auth-options";
import { convertFileToURL, splitCountryCode } from "@/lib/utils";
import { useRouter } from "@/navigation";
import { UpdateProfileSchema } from "@/schemas/profile.shema";
import { Profile } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useUpdateProfile = (user: Profile, session: CustomSession) => {
  const { update } = useSession();
  const router = useRouter();
  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email || "",
      phone: splitCountryCode(user.phone),
      image: new File([], ""),
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: updateProfileAction,
    onSuccess: async (data) => {
      if (data === "success") {
        toast.success("Profile updated successfully");
      } else toast.error(data);
    },
  });

  const onSubmit = async (data: UpdateProfileSchema) => {
    const token = session?.user?.access_token || "";
    const profileResult = await mutateAsync({
      token,
      body: {
        name: data.name,
        email: data.email,
        phone: `+${data.phone.code}${data.phone.number}`,
      },
    });

    if (profileResult !== "success") return;

    if (data.image.name) {
      const avatarBody = new FormData();
      avatarBody.append("avatar", data.image);
      const avatarResult = await updateAvatarAction({
        token,
        body: avatarBody,
      });
      if (avatarResult !== "success") {
        toast.error(avatarResult);
        return;
      }
    }

    await update({
      name: data.name,
      email: data.email,
      image: data.image.name
        ? convertFileToURL(data.image)
        : session?.user?.image || "",
      phone: `+${data.phone.code}${data.phone.number}`,
    });
    router.refresh();
  };

  return { onSubmit, isPending, form };
};

export default useUpdateProfile;
