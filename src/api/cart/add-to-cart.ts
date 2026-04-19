import axiosInstance from "@/lib/axios";
import { fetcher } from "@/lib/fetcher";

const addToCart = async (
  slug: string,
  body: unknown,
  token: string = "",
  isLoggedIn: boolean = false,
  request: any
) => {
  const url = `cart/products/${slug}/add`;
  const fullUrl = isLoggedIn ? url : `${url}?s_id=${token}`;
  const auth = (
    isLoggedIn ? { headers: { authorization: `Bearer ${token}` } } : {}
  ) as HeadersInit;
  const response = await fetcher(
    fullUrl,
    "en",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: auth,
    },
    false,
    request
  );
  return response;
};

export default addToCart;
