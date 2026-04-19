import addToCart from "@/api/cart/add-to-cart";
import removeProductFromCart from "@/api/cart/remove-product-from-cart";
import getSession from "@/lib/get-session";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getSession();
  const body = await request.json();
  if (session && session.user) {
    try {
      await addToCart(
        body.slug,
        body,
        session.user.access_token,
        true,
        request
      );
      return NextResponse.json(
        { message: "added to cart successfully" },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof Error) {
        if (isAxiosError(error)) {
          return NextResponse.json(
            { message: error.response?.data.message },
            { status: 400 }
          );
        } else {
          return NextResponse.json({ message: error.message }, { status: 400 });
        }
      }
      return NextResponse.json(
        { message: "can not add to cart, please try again" },
        { status: 400 }
      );
    }
  } else {
    const { searchParams } = request.nextUrl;
    const user_token = searchParams.get("user_token");
    if (!user_token)
      return NextResponse.json(
        { message: "please provide user_token" },
        { status: 400 }
      );
    try {
      await addToCart(body.slug, body, user_token, false, request);
      return NextResponse.json(
        { message: "added to cart successfully" },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof Error) {
        if (isAxiosError(error)) {
          return NextResponse.json(
            { message: error.response?.data.message || "" },
            { status: 400 }
          );
        } else {
          return NextResponse.json(
            { message: error.message || "" },
            { status: 400 }
          );
        }
      }
      return NextResponse.json(
        { message: "can not add to cart, please try again" },
        { status: 400 }
      );
    }
  }
}
export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const session = await getSession();
  const slug = searchParams.get("slug");
  const variant_id = searchParams.get("variant_id");
  const params: Record<string, string> = variant_id ? { variant_id } : {};
  if (!slug)
    return NextResponse.json(
      { message: "please provide slug and product_variant_id" },
      { status: 400 }
    );
  if (session && session.user) {
    const response = await removeProductFromCart(
      session.user.access_token,
      params,
      slug,
      true,
      request
    );
    if (!response.ok)
      return NextResponse.json(
        { message: "can not remove this product from cart" },
        { status: 400 }
      );
    return NextResponse.json(response.data, { status: 200 });
  } else {
    const user_token = searchParams.get("user_token");
    if (!user_token)
      return NextResponse.json(
        { message: "please provide user_token" },
        { status: 400 }
      );
    try {
      const response = await removeProductFromCart(
        user_token,
        params,
        slug,
        false,
        request
      );
      if (!response.ok)
        return NextResponse.json(
          { message: "can not remove this product from cart" },
          { status: 400 }
        );
      return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
      return NextResponse.json(
        { message: "can not add to cart, please try again" },
        { status: 400 }
      );
    }
  }
}
