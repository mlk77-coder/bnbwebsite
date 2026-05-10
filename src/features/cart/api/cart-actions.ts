"use server";

import addToCart from "./add-to-cart";
import { ADD_TO_CART_AUTH_REQUIRED } from "@/lib/cart-auth";
import type { FetcherErrorDetail } from "@/lib/fetcher";
import getSession from "@/lib/get-session";
import { actionHandleError } from "@/lib/utils";
import type { AddToCartBody } from "@/types/cart";
import { headers } from "next/headers";
import { getLocale } from "next-intl/server";

const getFetcherErrorMessage = (error: FetcherErrorDetail, fallback: string) => {
  if (typeof error === "string") return error;
  if (typeof error === "object" && error && "message" in error) {
    const m = (error as { message?: string }).message;
    if (typeof m === "string") return m;
  }
  return fallback;
};

export async function addToCartAction(
  body: AddToCartBody
): Promise<"success" | string> {
  const session = await getSession();

  if (!session?.user?.access_token) {
    return ADD_TO_CART_AUTH_REQUIRED;
  }

  try {
    const locale = await getLocale();
    const headersList = await headers();
    const request = new Request(`${process.env.NEXT_PUBLIC_LOCAL_URL}`, {
      headers: headersList,
    });

    const response = await addToCart(
      body,
      session.user.access_token,
      true,
      locale,
      request
    );

    if (!response.ok) {
      return getFetcherErrorMessage(
        response.error,
        "Can not add to cart, please try again"
      );
    }

    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
}
