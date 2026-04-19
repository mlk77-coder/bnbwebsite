import localFont from "next/font/local";

/** System stack (no Google Fonts fetch at build time — works offline/CI). */
export const roboto = {
  variable: "--font-roboto",
  className: "",
} as const;

export const helvetica = localFont({
  src: [
    { path: "./fonts/helvetica-thin.woff2", weight: "200" },
    { path: "./fonts/helvetica-ultra-light.woff2", weight: "100" },
    { path: "./fonts/helvetica-light.woff2", weight: "300" },
    { path: "./fonts/helvetica-roman.woff2", weight: "400" },
    { path: "./fonts/helvetica-medium.woff2", weight: "500" },
    { path: "./fonts/helvetica-bold.woff2", weight: "700" },
    { path: "./fonts/helvetica-heavy.woff2", weight: "800" },
    { path: "./fonts/helvetica-black.woff2", weight: "900" },
  ],
  display: "swap",
  preload: true,
  variable: "--font-bambino",
});

