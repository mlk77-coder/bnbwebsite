import Link from "@/components/client-link";
import { profileLinks } from "../_constant/profile-links";
import LogoutButton from "@/app/[locale]/_components/header/account/logout-button";
import { cookies } from "next/headers";
import getSession from "@/lib/get-session";
import { getTranslations } from "next-intl/server";

const ProfileNavbar = async () => {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("x-user-session")?.value || "";
  const session = await getSession();
  const t = await getTranslations();
  if (!session) return null;
  return (
    <div className="md:col-span-2 flex flex-col justify-start items-start gap-4 text-lg">
      {profileLinks.map((link, index) => (
        <Link
          key={index}
          activeClassName="text-orange before:bg-orange/75 before:w-full"
          slug={link.href}
          className="block pb-3 text-start focus-visible:outline-none focus-visible:border-none before:transition-all before:duration-300 relative before:absolute before:bottom-1/4 before:start-0 before:end-0 before:h-0.5 before:w-0 hover:before:w-full focus:before:w-full focus-visible:before:w-full before:bg-primary"
          href={link.href}
        >
          {t(link.label)}
        </Link>
      ))}
      <LogoutButton
        session={session}
        userToken={userToken}
        inDropdown={false}
      />
    </div>
  );
};

export default ProfileNavbar;
