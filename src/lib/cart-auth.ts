/**
 * Returned by `addToCartAction` when the user must sign in before adding to cart.
 * Client compares against this constant (avoid fragile English-message checks).
 */
export const ADD_TO_CART_AUTH_REQUIRED = 'ADD_TO_CART_AUTH_REQUIRED' as const;
