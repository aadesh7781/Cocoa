import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "COCOA — Where Chocolate Flows & Stories Brew",
  description: "Experience premium artisan desserts, luxury single-origin coffees, and fine chocolate craftsmanship in a cinematic and editorial atmosphere.",
  keywords: "cafe, luxury dessert, coffee, artisan chocolate, coffee shop, fine dining, premium pastry",
  authors: [{ name: "COCOA Cafe" }],
  openGraph: {
    title: "COCOA — Luxury Coffee & Artisan Desserts",
    description: "Where Chocolate Flows & Stories Brew. Explore our collection of premium cakes, classic espressos, and single-origin chocolates.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFF8F0] text-[#2B1810]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
