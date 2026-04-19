import decreaseProductFromCart from "@/api/cart/decrease-product-from-cart";
import getSession from "@/lib/get-session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const slug = searchParams.get("slug");
  const variant_id = searchParams.get("variant_id");
  const quantity = searchParams.get("quantity") || "1";
  const params: Record<string, string> = variant_id
    ? { variant_id, quantity }
    : { quantity };
  if (!slug)
    return NextResponse.json(
      { message: "please provide slug" },
      { status: 400 }
    );
  const session = await getSession();
  if (session && session.user) {
    const response = await decreaseProductFromCart(
      session.user?.access_token,
      params,
      slug,
      true,
      request
    );
    return NextResponse.json(response.data, { status: 200 });
  } else {
    const user_token = searchParams.get("user_token");
    if (!user_token)
      return NextResponse.json(
        { message: "please provide user_token" },
        { status: 401 }
      );
    try {
      const response = await decreaseProductFromCart(
        user_token,
        params,
        slug,
        false,
        request
      );
      if (!response.ok)
        return NextResponse.json(
          { message: "something went wrong, please try again later" },
          { status: 400 }
        );
      return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "something went wrong, please try again later", error },
        { status: 400 }
      );
    }
  }
}
