"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomSession } from "@/lib/auth-options";
import { Link } from "@/navigation";
import { User, Package, MapPin, Clock, Settings, LogOut, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { FC } from "react";
import LogoutButton from "./logout-button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type PropsType = {
  session: CustomSession;
  userToken: string;
  className?: string;
  label?: string;
};

const menuItems = [
  { href: "/orders", icon: Package, labelKey: "orders" },
  { href: "/addresses", icon: MapPin, labelKey: "address.title" },
  { href: "/recent-items", icon: Clock, labelKey: "recently-viewed" },
  { href: "/profile", icon: Settings, labelKey: "account-settings" },
];

const UserMenu: FC<PropsType> = ({ session, userToken, className, label }) => {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = useTranslations();
  const isRTL = dir === "rtl";

  return (
    <DropdownMenu modal={false}>
      <Tooltip text={t("menu")}>
        <DropdownMenuTrigger asChild>
          <Button
            size={label ? "default" : "icon"}
            variant="ghost"
            className={cn(
              "relative group hover:bg-gray-100/80 transition-all duration-300",
              label ? "gap-2 px-3" : "",
              className
            )}
          >
            <span className="sr-only">{t("menu")}</span>
            <div className="relative">
              <Avatar className="w-8 h-8 ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300">
                <AvatarImage src={session.user?.image || ""} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              {/* Online indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
            </div>
            {label ? (
              <span className="text-sm font-medium text-gray-700">{label}</span>
            ) : null}
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>

      <DropdownMenuContent
        align={locale === "en" ? "end" : "start"}
        className="w-64 p-2"
        sideOffset={8}
      >
        {/* User Info Header */}
        <DropdownMenuLabel className="p-3 mb-2 bg-gradient-to-br from-primary/5 to-transparent rounded-xl">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 ring-2 ring-primary/20">
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback className="bg-primary/10 text-primary">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate capitalize">
                {session.user?.name || t("guest")}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session.user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2" />

        {/* Menu Items */}
        <DropdownMenuGroup dir={dir} className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <DropdownMenuItem 
                  className={cn(
                    "cursor-pointer p-2.5 rounded-lg transition-all duration-200",
                    "hover:bg-gray-50 focus:bg-gray-50",
                    "group/item"
                  )}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover/item:bg-primary/10 transition-colors">
                      <Icon className="w-4 h-4 text-gray-600 group-hover/item:text-primary transition-colors" />
                    </div>
                    <span className="flex-1 text-sm font-medium text-gray-700 capitalize">
                      {t(item.labelKey)}
                    </span>
                    <ChevronRight className={cn(
                      "w-4 h-4 text-gray-400 transition-transform duration-200",
                      isRTL ? "rotate-180" : "",
                      "group-hover/item:translate-x-0.5"
                    )} />
                  </div>
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2" />

        {/* Logout Button */}
        <LogoutButton userToken={userToken} session={session} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
