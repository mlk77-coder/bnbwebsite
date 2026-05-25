/**
 * Login uses the intercepted `/login` route (dialog overlay). Matches patterns in
 * wishlist-heart and verify-account redirects.
 */
export function getLoginUrlWithCallback(callbackPathname: string): string {
  const path = callbackPathname?.startsWith('/')
    ? callbackPathname
    : `/${callbackPathname || ''}`;
  return `/login?${new URLSearchParams({ callbackUrl: path }).toString()}`;
}
