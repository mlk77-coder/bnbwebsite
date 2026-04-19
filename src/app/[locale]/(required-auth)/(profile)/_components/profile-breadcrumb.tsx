"use client";

import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { usePathname } from "@/navigation";
import { profileLinks } from "../_constant/profile-links";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";

const ProfileBreadcrumb = () => {
  const pathname = usePathname();
  const activeLink = profileLinks.find((link) => link.href === pathname);
  const t = useTranslations();
  if (!activeLink) return notFound();
  return (
    <CustomBreadcrumb
      activeLink={t(activeLink?.label) || ""}
      links={[{ name: t('my-account'), slug: "/profile" }]}
    />
  );
};

export default ProfileBreadcrumb;
