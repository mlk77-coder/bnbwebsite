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

  const triggerButton = (
    <Button
      type="button"
      title={t("change-language")}
      disabled={isPending}
      className={cn(
        "group relative hover:bg-gray-100/80 transition-all duration-300",
        isPending && "transition-opacity [&:disabled]:opacity-30",
        inMobileMenu
          ? "h-10 shrink-0 gap-2 rounded-lg border border-gray-100/80 bg-white/90 px-3 capitalize shadow-sm hover:bg-white"
          : "hidden md:flex"
      )}
      variant="ghost"
      size={inMobileMenu ? "default" : "icon"}
    >
      {inMobileMenu ? (
        <Fragment>
          <Globe className="size-4 text-gray-600" aria-hidden />
          <span className="text-sm font-medium text-gray-700">
            {isRTL ? "عربي" : "English"}
          </span>
          <span className="text-base leading-none" aria-hidden>
            {isRTL ? "🇸🇦" : "🇬🇧"}
          </span>
        </Fragment>
      ) : (
        <Fragment>
          <span className="sr-only">{t("change-language")}</span>
          <div className="relative">
            <Globe
              className={cn(
                "w-5 h-5 transition-all duration-300",
                isPending
                  ? "animate-pulse text-primary"
                  : "text-gray-600 group-hover:text-gray-900"
              )}
            />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full border border-white" />
          </div>
        </Fragment>
      )}
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>

      <DropdownMenuContent
        align={isRTL ? "start" : "end"}
        className={cn("z-[100] w-56 p-2")}
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
                "flex items-center gap-3 pl-3",
                "[&>span:first-child]:hidden",
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
