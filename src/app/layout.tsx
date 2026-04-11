import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "../styles/globals.css";
import { Nav } from "@/components/Nav";
import { TrustBar } from "@/components/TrustBar";
import { Footer } from "@/components/Footer";
import { StickyCtaBar } from "@/components/StickyCtaBar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harley Street Wellness | Joint Pain Education & Assessment",
  description:
    "Educational resources about non-surgical approaches to joint pain. Take a free joint health assessment at our Harley Street clinic in London.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Nav />
        <TrustBar />
        <main>{children}</main>
        <Footer />
        <StickyCtaBar />
      </body>
    </html>
  );
}
