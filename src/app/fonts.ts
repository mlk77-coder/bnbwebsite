import { Playfair_Display, Montserrat, Cairo } from "next/font/google";

/** Luxury Google Fonts - Premium Selection */
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const cairo = Cairo({
  subsets: ["latin", "arabic"],
  display: "swap",
  variable: "--font-arabic",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

