import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { EB_Garamond, Source_Sans_3 } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const display = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "latin-ext"],
});

const sans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Niña Blanca — Prayer under the Mantle of Santa Muerte",
    template: "%s · Niña Blanca",
  },
  description:
    "A calm sanctuary for petitions, novenas, and study of Santa Muerte in her white aspect.",
  metadataBase: new URL("https://ninablanca.com"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-surface font-sans text-on-surface antialiased">
        <SiteShell>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
