/**
 * Next.js edge proxy (replaces middleware in newer Next.js versions).
 * Runs on every matched request before the page renders.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { v4 as uuid } from "uuid";

// Handles locale prefixing, redirects, and default-locale routing (ar | en).
const intlMiddleware = createMiddleware(routing);

/**
 * Ensures every visitor has an anonymous session id before they log in.
 * Used for browse-only features (e.g. favorites, recently viewed) — not for placing orders.
 */
function checkAndSetCookie(request: NextRequest, response: NextResponse) {
  const cookie = request.cookies.get("x-user-session");
  if (!cookie) {
    response.cookies.set("x-user-session", uuid(), {
      maxAge: 60 * 60 * 24 * 7 * 8, // 8 weeks
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

/** Runs intl routing, then assigns an anonymous browse session when needed. */
export async function proxy(request: NextRequest) {
  let response = intlMiddleware(request);
  response = checkAndSetCookie(request, response);
  return response;
}

// Paths that skip static assets, API routes, and Next internals.
export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!_next|api|_vercel|.*\\..*).*)",
  ],
};
