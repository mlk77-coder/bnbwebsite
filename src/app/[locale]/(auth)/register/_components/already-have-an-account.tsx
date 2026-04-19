import redirectHard from "@/app/actions/redirect-hard-action";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";

type PropsType = {
  hardLink: boolean;
};

const handleRedirect = async (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  e.preventDefault();
  await redirectHard("/login");
};

const AlreadyHaveAnAccount: FC<PropsType> = ({ hardLink }) => {
  const t = useTranslations();

  return (
    <p>
      {t.rich("auth.already-have-an-account", {
        login: (chunks) => {
          if (hardLink)
            return (
              <a
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-base text-orange py-0 h-fit px-0.5"
                )}
                onClick={handleRedirect}
                href="/login"
              >
                {chunks}
              </a>
            );
          return (
            <Link
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-base text-orange py-0 h-fit px-0.5"
              )}
              scroll={false}
              href="/login"
              replace
            >
              {chunks}
            </Link>
          );
        },
      })}
    </p>
  );
};

export default AlreadyHaveAnAccount;
