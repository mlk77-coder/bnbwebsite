import { z } from "zod";

export const AddAddressSchema = z.object({
  address: z.string().min(1, "error-message.address"),
  city: z.string().min(1, "error-message.city"),
  country: z.string().min(1, "error-message.country"),
  name: z.string().min(1, "error-message.name"),
});

export type AddAddressSchema = z.infer<typeof AddAddressSchema>;
