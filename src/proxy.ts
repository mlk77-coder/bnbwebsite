import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { v4 as uuid } from "uuid";

const intlMiddleware = createMiddleware(routing);

function checkAndSetCookie(request: NextRequest, response: NextResponse) {
  const cookie = request.cookies.get("x-user-session");
  if (!cookie) {
    response.cookies.set("x-user-session", uuid(), {
      maxAge: 60 * 60 * 24 * 7 * 8,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

function checkSoftNavigation(request: NextRequest, response: NextResponse) {
  const softNavigationToken = request.cookies.get("softNavigationToken")?.value;
  const path = request.nextUrl.pathname;

  if (path.includes("/order-details") && !softNavigationToken) {
    const locale = path.split("/")[1];
    return NextResponse.redirect(new URL(`/${locale}/404`, request.url));
  }

  return response;
}

export async function proxy(request: NextRequest) {
  let response = intlMiddleware(request);
  response = checkAndSetCookie(request, response);
  response = checkSoftNavigation(request, response);
  return response;
}

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!_next|api|_vercel|.*\\..*).*)",
    "/(ar|en)/order-details",
  ],
};
