"use client";

import { Button } from "@/components/ui/button";
import LogoutConfirmDialog from "@/components/logout-confirm-dialog";
import axiosInstance from "@/lib/axios";
import { CustomSession } from "@/lib/auth-options";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { toast } from "sonner";

type PropsType = {
  session: CustomSession;
};

const ProfileLogoutButton: FC<PropsType> = ({ session }) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    try {
      if (session.user?.access_token) {
        await axiosInstance.post(
          "/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${session.user.access_token}`,
            },
          }
        );
      }
      await signOut();
    } catch (error) {
      toast.error(t("auth.something-went-wrong-please-try-again"));
      setIsPending(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen(true)}
        className="h-auto flex-1 justify-start p-0 text-start text-sm font-semibold text-red-600 hover:bg-transparent hover:text-red-700"
      >
        {t("sign-out")}
      </Button>
      <LogoutConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleLogout}
        isPending={isPending}
      />
    </>
  );
};

export default ProfileLogoutButton;
