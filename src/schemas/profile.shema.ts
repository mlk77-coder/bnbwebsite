import parsePhoneNumberFromString from "libphonenumber-js/mobile";
import { z } from "zod";

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, "error-message.name"), // الاسم مطلوب
  email: z.string().email("error-message.email-invalid"), // يجب أن يكون بريد إلكتروني صالح
  phone: z
    .object({
      number: z.string(), // جزء رقم الهاتف
      code: z.string(), // جزء رمز الدولة
    })
    .refine(
      (data) => {
        if (data.number.length === 0) return true;
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
  gender: z.string(),
  birthdate: z.date().refine(
    (date) => date <= new Date(),
    "error-message.birthdate-future" // يجب أن يكون تاريخ الميلاد ليس في المستقبل
  ),
  subscribed_to_emails: z.boolean(),
});

export type UpdateProfileSchema = z.infer<typeof UpdateProfileSchema>;

export const ChangePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, "error-message.current_password") // Password is required
      .min(8, "error-message.password-invalid"), // Must be at least 8 characters long
    new_password: z
      .string()
      .min(1, "error-message.password") // Password is required
      .min(8, "error-message.password-invalid"), // Must be at least 8 characters long
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
