import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "../styles/globals.css";
import { Nav } from "@/components/Nav";
import { TrustMarquee } from "@/components/TrustMarquee";
import { Footer } from "@/components/Footer";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ScrollProgress />
        <Nav />
        <TrustMarquee />
        <main>{children}</main>
        <Footer />
        <StickyCtaBar />
      </body>
    </html>
  );
}
