"use client";

import { CustomSession } from "@/lib/auth-options";
import LanguagesToggle from "../i18n/languages-toggle";
import UserMenu from "../account/user-menu";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserRound } from "lucide-react";

const MobileMenuHeader = ({
  session,
  userToken,
  signInLabel,
}: {
  session: CustomSession | null;
  userToken: string;
  signInLabel: string;
}) => {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="min-w-0 flex-1">
        {session?.user ? (
          <UserMenu
            className="max-xl:inline-flex max-xl:w-full max-xl:justify-start"
            label={session.user.name}
            session={session}
            userToken={userToken}
          />
        ) : (
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-10 w-full justify-start gap-2 px-2 capitalize"
            )}
            href="/login"
          >
            <UserRound className="size-5 shrink-0 text-gray-600" />
            <span className="truncate text-sm font-medium text-gray-800">
              {signInLabel}
            </span>
          </Link>
        )}
      </div>
      <LanguagesToggle inMobileMenu />
    </div>
  );
};

export default MobileMenuHeader;
