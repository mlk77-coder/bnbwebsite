import removeProductFromCart from "@/api/cart/remove-product-from-cart";
import updateCartItem from "@/api/cart/update-cart-item";
import getSession from "@/lib/get-session";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

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

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const session = await getSession();
  const { productId } = await params;
  const body = await request.json();
  const cartItemId = Number(productId);

  if (!Number.isFinite(cartItemId)) {
    return NextResponse.json(
      { message: "Please provide a valid cart item id" },
      { status: 400 }
    );
  }

  if (!session?.user?.access_token) {
    return NextResponse.json(
      { message: "Please login to update cart" },
      { status: 401 }
    );
  }

  try {
    const response = await updateCartItem(
      cartItemId,
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
            "Can not update cart item"
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
            "Can not update cart item, please try again",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Can not update cart item, please try again" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const session = await getSession();
  const { productId } = await params;
  const cartItemId = Number(productId);

  if (!Number.isFinite(cartItemId)) {
    return NextResponse.json(
      { message: "Please provide a valid cart item id" },
      { status: 400 }
    );
  }

  if (!session?.user?.access_token) {
    return NextResponse.json(
      { message: "Please login to remove items from cart" },
      { status: 401 }
    );
  }

  try {
    const response = await removeProductFromCart(
      cartItemId,
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
            "Can not remove this product from cart"
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
            "Can not remove this product from cart",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Can not remove this product from cart" },
      { status: 400 }
    );
  }
}
