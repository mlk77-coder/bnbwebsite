import { getEntry } from "@/lib/utils";
import type { MetadataRoute } from "next";

// Next.js 16 requires a static literal for route segment config analysis
export const revalidate = 86400; // 24 hours
const faq = "frequently-asked-questions";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [
    getEntry(`/`),
    getEntry(`/about-bnb-store`),
    getEntry(`/cart`),
    getEntry(`/contact-us`),
    getEntry(`/cookies-policy`),
    getEntry(`/privacy-policy`),
    getEntry(`/size-chart`),
    getEntry(`/terms-and-conditions`),
    getEntry("/login"),
    getEntry("/register"),
    getEntry("/forgot-password"),
    getEntry(`/${faq}/payment-questions`),
    getEntry(`/${faq}/delivery-questions`),
    getEntry(`/${faq}/general-information`),
    getEntry(`/${faq}/my-order`),
    getEntry(`/${faq}/returns-refunds`),
  ];

  return paths;
}
