import parsePhoneNumberFromString from "libphonenumber-js/mobile";
import { z } from "zod";

export const ContactSchema = z.object({
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
      "error-message.phone"
    )
    .refine((data) => {
      const fullNumber = `+${data.code}${data.number}`;
      const phoneNumber = parsePhoneNumberFromString(fullNumber);

      if (phoneNumber && phoneNumber.isValid()) {
        const phoneType = phoneNumber.getType();
        return phoneType === "MOBILE" || phoneType === "FIXED_LINE_OR_MOBILE";
      }
      return false;
    }, "error-message.phone-invalid"),
  order_number: z.string(),
  message: z.string().min(1, "error-message.message"),
  acceptPrivacyPolicy: z.boolean(),
  acceptTermsAndConditions: z.boolean(),
});

export type ContactSchema = z.infer<typeof ContactSchema>;
