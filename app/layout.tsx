import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter, Baloo_2 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const playful = Baloo_2({ subsets: ["latin"], variable: "--font-playful", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  title: {
    default: "Cub Scout Pack 786 | Adventure Starts Here",
    template: "%s | Pack 786",
  },
  description:
    "Cub Scout Pack 786 — camping, Pinewood Derby, community service, and family adventure for kids in Castle Rock, CO. Cub Scouts near me, Scouting for elementary students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${playful.variable}`}>
      <body className="bg-trail-bg text-trail-ink font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-full focus:bg-trail-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      </body>
    </html>
  );
}
