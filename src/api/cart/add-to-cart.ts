import { fetcher } from "@/lib/fetcher";
import { AddToCartBody, GetCartResponse } from "@/types/cart";

const addToCart = async (
  body: AddToCartBody,
  token: string = "",
  isLoggedIn: boolean = false,
  locale: string = "en",
  request?: Request
) => {
  const authHeaders: HeadersInit = isLoggedIn
    ? { authorization: `Bearer ${token}` }
    : {};
  const response = await fetcher<GetCartResponse>(
    "cart",
    locale,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: authHeaders,
    },
    false,
    request
  );
  return response;
};

export default addToCart;
