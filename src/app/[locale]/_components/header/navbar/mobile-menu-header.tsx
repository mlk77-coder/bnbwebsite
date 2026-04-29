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
    <div className="pt-3 pb-2 w-full flex justify-center items-center divide-x">
      <div className="w-full flex justify-center items-center">
        {session?.user ? (
          <UserMenu
            className="max-xl:inline-flex"
            label={session.user.name}
            session={session}
            userToken={userToken}
          />
        ) : (
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex justify-center capitalize items-center gap-1"
            )}
            href="/login"
          >
            <UserRound className="size-5" />
            {signInLabel}
          </Link>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        <LanguagesToggle inMobileMenu />
      </div>
    </div>
  );
};

export default MobileMenuHeader;
