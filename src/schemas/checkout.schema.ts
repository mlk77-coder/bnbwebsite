import { z } from "zod";

/** Matches POST /orders body (payment_method_id is set at submit time, not stored in the form). */
export const CheckoutSchema = z.object({
  address_id: z.number().optional(),
  /** Empty string is fine; trimmed at submit when building POST body. */
  notes: z.string().optional(),
});

export type CheckoutSchema = z.infer<typeof CheckoutSchema>;
