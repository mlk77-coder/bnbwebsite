import addToCart from "@/api/cart/add-to-cart";
import clearCart from "@/api/cart/clear-cart";
import getSession from "@/lib/get-session";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  if (
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return fallback;
};

export async function POST(request: NextRequest) {
  const session = await getSession();
  const body = await request.json();

  if (!session?.user?.access_token) {
    return NextResponse.json(
      { message: "Please login to add items to cart" },
      { status: 401 }
    );
  }

  try {
    const response = await addToCart(
      body,
      session.user.access_token,
      true,
      "en",
      request
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: getErrorMessage(
            response.error,
            "Can not add to cart, please try again"
          ),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message ||
            "Can not add to cart, please try again",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Can not add to cart, please try again" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();

  if (!session?.user?.access_token) {
    return NextResponse.json(
      { message: "Please login to clear cart" },
      { status: 401 }
    );
  }

  try {
    const response = await clearCart(
      session.user.access_token,
      true,
      "en",
      request
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: getErrorMessage(response.error, "Can not clear cart") },
        { status: 400 }
      );
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message || "Can not clear cart, please try again",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Can not clear cart, please try again" },
      { status: 400 }
    );
  }
}
