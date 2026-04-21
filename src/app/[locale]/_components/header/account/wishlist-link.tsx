"use client";

import { buttonVariants } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { CustomSession } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import { Link, usePathname, useRouter } from "@/navigation";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, Fragment, useState, useEffect } from "react";

type WishlistLinkProps = {
  session?: CustomSession | null;
};

const WishlistLink: FC<WishlistLinkProps> = ({ session }) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation effect on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 500);
    const stopTimer = setTimeout(() => setIsAnimating(false), 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(stopTimer);
    };
  }, []);

  const renderLinkContent = () => (
    <Fragment>
      <span className="sr-only">{t("wishlist")}</span>
      <div className="relative">
        <Heart 
          className={cn(
            "w-5 h-5 transition-all duration-300",
            isAnimating && "scale-110 text-red-500"
          )} 
        />
        {/* Heart beat animation */}
        <span 
          className={cn(
            "absolute inset-0 rounded-full bg-red-500/20 scale-0 transition-transform duration-500",
            isAnimating && "scale-150 opacity-0"
          )} 
        />
      </div>
    </Fragment>
  );

  const classNames = cn(
    buttonVariants({ variant: "ghost", size: "icon" }),
    "group relative hover:bg-red-50 transition-all duration-300",
    "hover:text-red-500"
  );

  return (
    <Tooltip text={t("wishlist")}>
      {session ? (
        <Link 
          className={classNames} 
          href="/wishlist"
          onMouseEnter={() => setIsAnimating(true)}
          onMouseLeave={() => setIsAnimating(false)}
        >
          {renderLinkContent()}
        </Link>
      ) : (
        <button 
          className={classNames} 
          onClick={() =>
            router.push(
              `/login?${new URLSearchParams({ callbackUrl: pathname || "/" }).toString()}`
            )
          }
          onMouseEnter={() => setIsAnimating(true)}
          onMouseLeave={() => setIsAnimating(false)}
        >
          {renderLinkContent()}
        </button>
      )}
    </Tooltip>
  );
};

export default WishlistLink;
