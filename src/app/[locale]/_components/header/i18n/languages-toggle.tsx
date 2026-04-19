"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/navigation";
import { Globe, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FC, Fragment, useTransition } from "react";

type PropsType = {
  inMobileMenu?: boolean;
};

const LanguagesToggle: FC<PropsType> = ({ inMobileMenu = false }) => {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const isRTL = locale === "ar";

  function onSelectChange(newLocale: string) {
    startTransition(() => {
      const newUrl = `${pathname}?${searchParams.toString()}`;
      if (pathname.includes("/login") || pathname.includes("/register")) {
        window.location.replace(`/${newLocale}${newUrl}`);
      } else {
        router.replace(newUrl, { locale: newLocale as "ar" | "en" });
      }
    });
  }

  const languages = [
    { code: "ar", name: t("arabic"), flag: "🇸🇦", native: "عربي" },
    { code: "en", name: t("english"), flag: "🇬🇧", native: "English" },
  ];

  return (
    <DropdownMenu modal={false}>
      <Tooltip text={t("change-language")}>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isPending}
            className={cn(
              "group relative hover:bg-gray-100/80 transition-all duration-300",
              isPending && "transition-opacity [&:disabled]:opacity-30",
              inMobileMenu
                ? "flex justify-center capitalize items-center gap-2 w-full"
                : "hidden md:flex"
            )}
            variant="ghost"
            size={inMobileMenu ? "default" : "icon"}
          >
            {inMobileMenu ? (
              <Fragment>
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">
                  {isRTL ? "عربي" : "English"}
                </span>
                <span className="ml-auto text-lg">
                  {isRTL ? "🇸🇦" : "🇬🇧"}
                </span>
              </Fragment>
            ) : (
              <Fragment>
                <span className="sr-only">{t("change-language")}</span>
                <div className="relative">
                  <Globe className={cn(
                    "w-5 h-5 transition-all duration-300",
                    isPending ? "animate-pulse text-primary" : "text-gray-600 group-hover:text-gray-900"
                  )} />
                  {/* Active indicator dot */}
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full border border-white" />
                </div>
              </Fragment>
            )}
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>

      <DropdownMenuContent
        align={isRTL ? "start" : "end"}
        className="w-56 p-2"
        sideOffset={8}
      >
        <DropdownMenuLabel
          dir={isRTL ? "rtl" : "ltr"}
          className="text-sm font-semibold text-gray-900 px-3 py-2"
        >
          {t("select-language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuRadioGroup
          dir={isRTL ? "rtl" : "ltr"}
          value={locale}
          onValueChange={onSelectChange}
          className="space-y-1"
        >
          {languages.map((lang) => (
            <DropdownMenuRadioItem
              key={lang.code}
              value={lang.code}
              className={cn(
                "cursor-pointer p-3 rounded-xl transition-all duration-200",
                "hover:bg-gray-50 focus:bg-gray-50",
                "flex items-center gap-3",
                locale === lang.code && "bg-primary/5 hover:bg-primary/10"
              )}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex-1">
                <p className={cn(
                  "font-medium",
                  locale === lang.code ? "text-primary" : "text-gray-700"
                )}>
                  {lang.native}
                </p>
                <p className="text-xs text-gray-400">{lang.name}</p>
              </div>
              {locale === lang.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguagesToggle;
