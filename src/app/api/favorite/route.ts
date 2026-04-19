import getFavoriteIds from "@/api/favorite/get-favorite-ids";
import getSession from "@/lib/get-session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (session && session.user) {
    const response = await getFavoriteIds(session.user.access_token, request);
    if (!response.ok) return NextResponse.json([], { status: 400 });
    return NextResponse.json(response.data.product_ids, { status: 200 });
  } else {
    return NextResponse.json([], { status: 200 });
  }
}
