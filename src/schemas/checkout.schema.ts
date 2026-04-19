import parsePhoneNumberFromString from "libphonenumber-js/mobile";
import { z } from "zod";

export const CheckoutSchema = z.object({
  email: z
    .string()
    .min(1, "error-message.email")
    .email("error-message.email-invalid"),
  name: z.string().min(1, "error-message.name"),
  phone: z
    .object({
      number: z.string(),
      code: z.string(),
    })
    .refine(
      (data) => data.number.length !== 0 && data.code.length !== 0,
      "error-message.phone" // رقم الهاتف مطلوب
    )
    .refine(
      (data) => {
        const fullNumber = `+${data.code}${data.number}`;
        const phoneNumber = parsePhoneNumberFromString(fullNumber);

        if (phoneNumber && phoneNumber.isValid()) {
          const phoneType = phoneNumber.getType();
          return phoneType === "MOBILE" || phoneType === "FIXED_LINE_OR_MOBILE";
        }
        return false;
      },
      "error-message.phone-invalid" // يجب أن يكون رقم هاتف محمول صالحًا
    ),
  street: z.string().min(1, "error-message.address"),
  city_id: z.string().min(1, "error-message.city"),
  country: z.string(),
  countryId: z.string().min(1, "error-message.country"),
  description: z.string(),
});

export type CheckoutSchema = z.infer<typeof CheckoutSchema>;
