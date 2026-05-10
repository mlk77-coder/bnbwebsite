import { fetcher } from "@/lib/fetcher";
import { GetCartResponse } from "@/types/cart";

const clearCart = async (
  token: string = "",
  isLoggedIn: boolean = false,
  locale: string = "en",
  request?: Request
) => {
  const auth = (
    isLoggedIn ? { headers: { authorization: `Bearer ${token}` } } : {}
  ) as RequestInit;

  const response = await fetcher<GetCartResponse>(
    "cart",
    locale,
    {
      method: "DELETE",
      ...auth,
    },
    false,
    request
  );

  return response;
};

export default clearCart;
