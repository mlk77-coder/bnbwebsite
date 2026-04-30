import { z } from "zod";
import parsePhoneNumberFromString from "libphonenumber-js/mobile";

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, "error-message.name"),
  email: z
    .string()
    .min(1, "error-message.email")
    .email("error-message.email-invalid"),
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
  image: z
    .instanceof(File)
    .refine((file) => {
      if (!file) return true;
      if (!file.name) return true;
      return file.type.includes("image");
    }, "error-message.image-invalid")
    .refine((file) => {
      if (!file) return true;
      if (!file.name) return true;
      return file.size <= 2 * 1024 * 1024;
    }, "error-message.image-invalid-size"),
});

export type UpdateProfileSchema = z.infer<typeof UpdateProfileSchema>;

export const ChangePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, "error-message.current_password")
      .min(8, "error-message.password-invalid"),
    new_password: z
      .string()
      .min(1, "error-message.password")
      .min(8, "error-message.password-invalid"),
    new_password_confirmation: z
      .string()
      .min(1, "error-message.confirm-password"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    path: ["new_password_confirmation"],
    message: "error-message.confirm-password-match",
  })
  .refine((data) => data.new_password !== data.current_password, {
    path: ["new_password"],
    message: "error-message.confirm-password-not-match",
  });

export type ChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
