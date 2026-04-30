"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CustomSession } from "@/lib/auth-options";
import axiosInstance from "@/lib/axios";
import { LogOut, ChevronRight } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";
import { FC } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type PropsType = {
  inDropdown?: boolean;
  userToken: string;
  session: CustomSession;
  onRequestConfirm?: () => void;
};

const LogoutButton: FC<PropsType> = ({
  inDropdown = true,
  session,
  userToken,
  onRequestConfirm,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const handleLogout = async () => {
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
    }
  };

  if (inDropdown)
    return (
      <DropdownMenuItem
        onSelect={(e) => {
          if (onRequestConfirm) {
            e.preventDefault();
            onRequestConfirm();
            return;
          }
          handleLogout();
        }}
        className={cn(
          "cursor-pointer p-2.5 rounded-lg transition-all duration-200",
          "hover:bg-red-50 focus:bg-red-50",
          "group/item"
        )}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover/item:bg-red-200 transition-colors">
            <LogOut className="w-4 h-4 text-red-600" />
          </div>
          <span className="flex-1 text-sm font-medium text-red-600">
            {t("sign-out")}
          </span>
          <ChevronRight
            className={cn("w-4 h-4 text-red-400", isRTL && "rotate-180")}
          />
        </div>
      </DropdownMenuItem>
    );

  return (
    <button
      onClick={() => {
        if (onRequestConfirm) {
          onRequestConfirm();
          return;
        }
        handleLogout();
      }}
      className="relative block pb-3 text-start before:absolute before:bottom-1/4 before:inset-e-0 before:inset-s-0 before:h-0.5 before:w-0 before:bg-red-500 before:transition-all before:duration-300 hover:before:w-full focus:before:w-full focus-visible:before:w-full focus-visible:border-none focus-visible:outline-none"
    >
      {t("sign-out")}
    </button>
  );
};

export default LogoutButton;
