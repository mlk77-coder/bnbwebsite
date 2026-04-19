import { NextResponse } from "next/server";
import {
  buildSitemapIndex,
  generateCategorySitemaps,
  generateProductsSitemaps,
} from "./_sitemapHelpers";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL || "https://example.com";

    const [products, categories] = await Promise.all([
      generateProductsSitemaps(baseUrl),
      generateCategorySitemaps(baseUrl),
    ]);

    const sitemaps = [
      `${baseUrl}/sitemap/sitemap.xml`,
      ...products.map((sitemap) => sitemap.url),
      ...categories.map((sitemap) => sitemap.url),
    ];

    const sitemapIndexXML = await buildSitemapIndex(sitemaps);

    return new NextResponse(sitemapIndexXML, {
      headers: {
        "Content-Type": "application/xml",
        "Content-Length": Buffer.byteLength(sitemapIndexXML).toString(),
      },
    });
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    return NextResponse.error();
  }
}
