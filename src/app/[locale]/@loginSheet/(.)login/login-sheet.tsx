"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const LoginSheet = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isMount, setIsMount] = useState(pathname.includes("/login"));

  useEffect(() => {
    setIsMount(pathname.includes("/login"));
  }, [pathname]);

  return (
    <Sheet
      defaultOpen={isMount}
      open={isMount}
      onOpenChange={() => {
        router.back();
      }}
    >
      <SheetContent
        side={locale === "ar" ? "left" : "right"}
        className="overflow-y-auto"
      >
        <SheetHeader>
          <SheetHeader className="sr-only">
            <SheetTitle className="text-3xl">sign in</SheetTitle>
            <SheetDescription>sign in to your account</SheetDescription>
          </SheetHeader>
          {children}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default LoginSheet;
