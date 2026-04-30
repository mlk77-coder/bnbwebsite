import Link from "@/components/client-link";
import { profileLinks } from "../_constant/profile-links";
import getSession from "@/lib/get-session";
import { getTranslations } from "next-intl/server";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Clock,
  Heart,
  Home,
  LogOut,
  PackageCheck,
  Settings,
  User,
} from "lucide-react";
import ProfileLogoutButton from "./profile-logout-button";

const profileIcons = {
  "/orders": PackageCheck,
  "/wishlist": Heart,
  "/profile": Settings,
  "/recent-items": Clock,
  "/addresses": Home,
};

const ProfileNavbar = async () => {
  const session = await getSession();
  const t = await getTranslations();
  if (!session) return null;
  return (
    <aside className="h-fit rounded-3xl border border-primary/10 bg-white p-3 shadow-xl shadow-primary/5 lg:sticky lg:top-24">
      <div className="mb-3 rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-12 rounded-2xl ring-2 ring-white">
            <AvatarImage src={session.user?.image || ""} />
            <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground">
              <User className="size-5" />
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-primary">
              {session.user?.name || t("my-account")}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {session.user?.email || session.user?.phone || t("account-settings")}
            </p>
          </div>
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        {profileLinks.map((link) => {
          const Icon = profileIcons[link.href as keyof typeof profileIcons];

          return (
            <Link
              key={link.href}
              activeClassName="border-primary/20 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              slug={link.href}
              className="group flex items-center gap-3 rounded-2xl border border-transparent px-3 py-3 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:border-primary/10 hover:bg-primary/5 hover:text-primary focus-visible:outline-none"
              href={link.href}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary/10">
                <Icon className="size-4" />
              </span>
              <span className="flex-1">{t(link.label)}</span>
            </Link>
          );
        })}
        <div className="mt-2 border-t border-primary/10 pt-2">
          <div className="flex items-center gap-3 rounded-2xl border border-red-100/70 bg-red-50/70 px-3 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <LogOut className="size-4" />
            </span>
            <ProfileLogoutButton session={session} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default ProfileNavbar;
