import { fetcher } from "@/lib/fetcher";
import { GetCartResponse } from "@/types/cart";

const getCart = async (
  token: string = "",
  locale: string = "en",
  isLoggedIn = false,
  request?: Request
) => {
  const url = `cart`;
  const auth = (
    isLoggedIn
      ? { headers: { authorization: `Bearer ${token}` }, cache: "no-cache" }
      : {}
  ) as RequestInit;

  const response = await fetcher<GetCartResponse>(
    url,
    locale,
    auth,
    false,
    request
  );
  return response;
};

export default getCart;
