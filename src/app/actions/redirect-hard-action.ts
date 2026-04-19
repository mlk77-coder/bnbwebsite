"use server";

import { redirect } from "@/navigation";
import { getLocale } from "next-intl/server";

export default async function redirectHard(uri: string) {
  redirect({ href: uri, locale: await getLocale() });
}
