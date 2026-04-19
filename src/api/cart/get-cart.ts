import { fetcher } from "@/lib/fetcher";
import { GetCartResponse } from "@/types/cart";

const getCart = async (
  token: string = "",
  locale: string = "en",
  isLoggedIn = false,
  request?: any
) => {
  const url = `cart`;
  const fullUrl = isLoggedIn ? url : `${url}?s_id=${token}`;
  const auth = (
    isLoggedIn
      ? { headers: { authorization: `Bearer ${token}` }, cache: "no-cache" }
      : {}
  ) as RequestInit;

  const response = await fetcher<GetCartResponse>(
    fullUrl,
    locale,
    auth,
    false,
    request
  );
  return response;
};

export default getCart;
