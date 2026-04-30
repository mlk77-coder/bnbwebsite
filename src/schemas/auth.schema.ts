import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile';

/**
 * Schema for validating login form data.
 */
export const LoginSchema = z.object({
  phone: z
    .object({
      number: z.string(),
      code: z.string(),
    })
    .refine(
      data => data.number.length !== 0 && data.code.length !== 0,
      'error-message.phone'
    )
    .refine(data => {
      const fullNumber = `+${data.code}${data.number}`;
      const phoneNumber = parsePhoneNumberFromString(fullNumber);

      if (phoneNumber && phoneNumber.isValid()) {
        const phoneType = phoneNumber.getType();
        return phoneType === 'MOBILE' || phoneType === 'FIXED_LINE_OR_MOBILE';
      }
      return false;
    }, 'error-message.phone-invalid'),
});

export type LoginSchema = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, 'error-message.email')
    .email('error-message.email-invalid'),
  name: z.string().min(1, 'error-message.name'),
  phone: z
    .object({
      number: z.string(),
      code: z.string(),
    })
    .refine(
      data => data.number.length !== 0 && data.code.length !== 0,
      'error-message.phone' // رقم الهاتف مطلوب
    )
    .refine(
      data => {
        const fullNumber = `+${data.code}${data.number}`;
        const phoneNumber = parsePhoneNumberFromString(fullNumber);

        if (phoneNumber && phoneNumber.isValid()) {
          const phoneType = phoneNumber.getType();
          return phoneType === 'MOBILE' || phoneType === 'FIXED_LINE_OR_MOBILE';
        }
        return false;
      },
      'error-message.phone-invalid' // يجب أن يكون رقم هاتف محمول صالحًا
    ),
  accepted_privacy: z.boolean(),
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;

/**
 * Schema for verifying account via code.
 */
export const VerifyAccountSchema = z.object({
  code: z
    .string()
    .min(1, 'error-message.code') // Code is required
    .min(6, 'error-message.code-invalid') // Code must be exactly 4 characters
    .max(6, 'error-message.code-invalid'),
});

export type VerifyAccountSchema = z.infer<typeof VerifyAccountSchema>;

export const OtpSchema = z.object({
  otp: z
    .string()
    .min(1, 'error-message.code')
    .min(6, 'error-message.code-invalid')
    .max(6, 'error-message.code-invalid'),
});

export type OtpSchema = z.infer<typeof OtpSchema>;

/**
 * Schema for handling forgot password form data.
 */
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'error-message.email') // Email is required
    .email('error-message.email-invalid'), // Must be a valid email address
});

export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;

/**
 * Schema for handling reset password form data.
 */
export const ResetPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(1, 'error-message.password') // New password is required
      .min(8, 'error-message.password-invalid'), // Must be at least 8 characters long
    new_password_confirmation: z
      .string()
      .min(1, 'error-message.password') // New password is required
      .min(8, 'error-message.password-invalid'), // Must be at least 8 characters long
  })
  .refine(data => data.new_password === data.new_password_confirmation, {
    path: ['new_password_confirmation'], // Points to the field causing the error
    message: 'error-message.confirm-password-match', // Custom error message when passwords don't match
  });

export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
