"use client";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { UserRound, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";

const LoginButton = () => {
  const t = useTranslations();
  return (
    <Tooltip text={t("auth.sign-in")}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "group relative hover:bg-primary/5 transition-all duration-300",
          "hidden md:flex"
        )}
        asChild
      >
        <Link href="/login">
          <span className="sr-only">{t("auth.sign-in")}</span>
          <div className="relative">
            <UserRound className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors duration-300" />
            {/* Hover indicator */}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>
      </Button>
    </Tooltip>
  );
};

export default LoginButton;
