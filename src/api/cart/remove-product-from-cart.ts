import { fetcher } from "@/lib/fetcher";

const removeProductFromCart = async (
  token: string,
  body: Record<string, string>,
  slug: string,
  isLoggedIn: boolean = false,
  request: any
) => {
  const params = Object.entries(body)
    .map((value) => {
      return `${value[0]}=${value[1]}`;
    })
    .join("&");
  const url = `cart/products/${slug}/remove?${params}`;
  const fullUrl = isLoggedIn ? url : `${url}&s_id=${token}`;
  const auth = (
    isLoggedIn ? { headers: { authorization: `Bearer ${token}` } } : {}
  ) as RequestInit;
  const response = await fetcher(fullUrl, "en", auth, false, request);
  return response;
};

export default removeProductFromCart;
