import { getEntry } from "@/lib/utils";
import type { MetadataRoute } from "next";

// Next.js 16 requires a static literal for route segment config analysis
export const revalidate = 86400; // 24 hours
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [
    getEntry(`/`),
    getEntry(`/cart`),
    getEntry(`/contact-us`),
    getEntry("/login"),
    getEntry("/register"),
    getEntry("/forgot-password"),
  ];

  return paths;
}
