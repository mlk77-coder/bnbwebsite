import { fetcher } from "@/lib/fetcher";
import { GetCartResponse, UpdateCartItemBody } from "@/types/cart";

const updateCartItem = async (
  cartItemId: number,
  body: UpdateCartItemBody,
  token: string = "",
  isLoggedIn: boolean = false,
  locale: string = "en",
  request?: Request
) => {
  const authHeaders: HeadersInit = isLoggedIn
    ? { authorization: `Bearer ${token}` }
    : {};

  const response = await fetcher<GetCartResponse>(
    `cart/${cartItemId}`,
    locale,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: authHeaders,
    },
    false,
    request
  );

  return response;
};

export default updateCartItem;
