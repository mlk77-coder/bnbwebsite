import type { QueryClient } from "@tanstack/react-query";

/** Profile addresses list (`useQuery`). */
export const addressesListQueryKey = (locale: string, token: string) =>
  ["addresses", locale, token] as const;

/** Checkout saved-address selector (`useQuery`). */
export const checkoutAddressesQueryKey = (token: string) =>
  ["address", token] as const;

export function invalidateAddressRelatedQueries(queryClient: QueryClient) {
  void queryClient.invalidateQueries({ queryKey: ["addresses"] });
  void queryClient.invalidateQueries({ queryKey: ["address"] });
}
