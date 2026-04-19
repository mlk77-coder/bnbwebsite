// app/api/get-ip/route.js

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  let ip = xForwardedFor ? xForwardedFor.split(",")[0].trim() : null;
  if (!ip) {
    ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      "";
  }

  return NextResponse.json({ ip });
}
