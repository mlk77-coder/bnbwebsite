// Import necessary utility functions and types from axios, clsx, and tailwind-merge.
import { locales } from "@/i18n";
import { ProductCategory } from "@/types/products";
import { isAxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import parsePhoneNumberFromString from "libphonenumber-js";
import { MetadataRoute } from "next";
import { twMerge } from "tailwind-merge";

/**
 * Concatenates and merges multiple class names into a single string.
 * This utility helps merge Tailwind CSS classes and resolve potential conflicts using `clsx` and `twMerge`.
 *
 * @param {...ClassValue[]} inputs - A variable number of class names to be merged.
 * @return {string} A single string containing the merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a given price according to the provided currency code.
 * Uses `Intl.NumberFormat` to format the value into a currency string (e.g., "$1,000.00").
 *
 * @param {number} value - The price to be formatted.
 * @param {string} currencyCode - The currency to be used for formatting (ISO 4217 currency code).
 * @return {string} The formatted price as a string (e.g., "$1,000.00").
 */
export const formatPrice = (value: number, currencyCode: string): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(value);

/**
 * Handles errors from API actions, with a special focus on Axios errors.
 * It returns a user-friendly error message based on the type of error encountered.
 *
 * @param {unknown} error - The error object to be handled.
 * @return {string} A user-friendly error message to be displayed.
 *
 * @example
 * // Usage example:
 * try {
 *   await someApiCall();
 * } catch (error) {
 *   const errorMessage = actionHandleError(error);
 *   console.log(errorMessage); // Logs the formatted error message.
 * }
 */
export const actionHandleError = (error: unknown): string => {
  // Check if the error is an Axios error

  if (isAxiosError(error)) {
    const status = error.response?.status;
    const responseData = error.response?.data;
    // Handle validation errors (422 Unprocessable Entity)
    if (status === 422) {
      const errorMessage =
        typeof responseData?.message !== "string"
          ? Object.values(responseData.message)
              .flatMap((err) => err)
              .join("\n")
          : responseData?.message || "Validation error";

      return errorMessage;
    }

    // Handle other server errors
    return responseData?.message || "An error occurred. Please try again.";
  }

  // Handle non-Axios errors
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback for unexpected errors
  return "Something went wrong, please try again";
};

export function getCategoryName(
  category: ProductCategory | null | undefined
): string {
  if (!category) {
    return "";
  }
  if (!category.category) {
    // No deeper category, return current name
    return category.name;
  }
  // Recurse into the next level
  return getCategoryName(category.category);
}

export function splitCountryCode(phoneNumber: string): {
  code: string;
  number: string;
} {
  try {
    // إزالة أي مسافات بيضاء من الرقم
    phoneNumber = phoneNumber.trim();

    // محاولة تحليل رقم الهاتف بدون تحديد دولة افتراضية
    let parsedNumber = parsePhoneNumberFromString(phoneNumber);

    // إذا فشل التحليل، حاول إضافة '+' في بداية الرقم إذا كان يحتوي على أرقام فقط
    if (!(parsedNumber && parsedNumber.isValid())) {
      if (/^\d+$/.test(phoneNumber)) {
        parsedNumber = parsePhoneNumberFromString("+" + phoneNumber);
      }

      // إذا لا يزال التحليل يفشل، حاول استخراج رمز الدولة يدويًا
      if (!(parsedNumber && parsedNumber.isValid())) {
        let code = "";
        let number = phoneNumber;

        // استخراج رمز الدولة (أول 1-3 أرقام)
        const match = phoneNumber.match(/^(\d{1,3})(\d+)$/);
        if (match) {
          code = match[1];
          number = match[2];
        }

        return { code, number };
      }
    }

    // إذا نجح التحليل، اعادة رمز الدولة والرقم الوطني
    return {
      code: parsedNumber.countryCallingCode, // رمز الدولة بدون '+' أو '00'
      number: parsedNumber.nationalNumber,
    };
  } catch (error) {
    console.error("حدث خطأ أثناء تحليل رقم الهاتف:", error);
    return { code: "", number: phoneNumber };
  }
}

/**
 * Converts a File object to a URL string using URL.createObjectURL.
 *
 * @param {File | undefined} file - the File object to convert to a URL
 * @return {string} the URL string representing the File object, or an empty string if the file is undefined
 *
 * @example
 * const file = new File(['content'], 'example.txt', { type: 'text/plain' });
 * const url = convertFileToURL(file);
 * console.log(url); // Output: "blob:http://localhost:3000/6d7b5c3f-5d7a-4b4f-a4a1-2f9e5a0b1e4e"
 */
export const convertFileToURL = (file: File | undefined): string => {
  if (!file) return "";
  const url = URL.createObjectURL(file);
  return url;
};

export function cleanDescription(description: string) {
  // حذف جميع الفقرات الفارغة التي تحتوي على <p></p> أو <p><br></p> أو <p>أي فراغات</p>
  description = description.replace(/<p>(\s|&nbsp;|<br>)*<\/p>/g, "");

  // حذف الفراغات في بداية ونهاية الجمل داخل <p>...</p>
  description = description.replace(/<p>\s*(.*?)\s*<\/p>/g, "<p>$1</p>");

  return description;
}
const domain = process.env.NEXT_PUBLIC_LOCAL_URL || "";
export function getEntry(
  pathname: string,
  changeFrequency?: MetadataRoute.Sitemap[0]["changeFrequency"],
  priority?: MetadataRoute.Sitemap[0]["priority"]
): MetadataRoute.Sitemap[0] {
  return {
    url: getUrl(pathname),
    changeFrequency: changeFrequency || "daily",
    priority: priority || 1,
    lastModified: new Date().toISOString(),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(pathname)])
      ),
    },
  };
}

export function getUrl(pathname: string) {
  return `${domain}${pathname === "/" ? "" : pathname}`;
}
