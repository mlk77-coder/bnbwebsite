import { z } from "zod";
import parsePhoneNumberFromString from "libphonenumber-js/mobile";

export const AddAddressSchema = z.object({
  type: z.string().min(1, "error-message.address-type"),
  address_name: z.string().min(1, "error-message.name"),
  city: z.string().min(1, "error-message.city"),
  area: z.string().min(1, "error-message.area"),
  street_address: z.string().min(1, "error-message.address"),
  building_number: z.string().min(1, "error-message.building-number"),
  details: z.string().optional(),
  phone: z
    .object({
      number: z.string(),
      code: z.string(),
    })
    .refine(
      (data) => data.number.length !== 0 && data.code.length !== 0,
      "error-message.phone"
    )
    .refine((data) => {
      const phoneNumber = parsePhoneNumberFromString(
        `+${data.code}${data.number}`
      );

      if (phoneNumber && phoneNumber.isValid()) {
        const phoneType = phoneNumber.getType();
        return phoneType === "MOBILE" || phoneType === "FIXED_LINE_OR_MOBILE";
      }

      return false;
    }, "error-message.phone-invalid"),
  is_default: z.boolean(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export type AddAddressSchema = z.infer<typeof AddAddressSchema>;
