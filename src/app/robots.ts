import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/orders",
        "/order/",
        "/wishlist",
        "/profile",
        "/recent-items",
        "/addresses",
      ],
    },
    sitemap: `${baseUrl}/api/sitemap_index.xml`,
  };
}
