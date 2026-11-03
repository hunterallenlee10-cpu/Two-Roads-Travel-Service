import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SITE } from "@/data/site";
import { RoadProvider } from "@/components/providers/RoadProvider";
import { MatchmakerProvider } from "@/components/providers/MatchmakerProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = "Two Roads Travel Service | We get you and we get you there";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: "%s | Two Roads Travel Service" },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title,
    description: SITE.description,
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "We get you. And we get you there. Two Roads Travel Service." }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
    images: ["/og-image.png"],
  },
  // Concept preview of a real business: keep it out of search engines.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  themeColor: "#0e2a33",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE.name,
  telephone: "+1-610-849-2302",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[200] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-sand transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <RoadProvider>
            <MatchmakerProvider>
              <Nav />
              <main id="main">{children}</main>
              <Footer />
            </MatchmakerProvider>
          </RoadProvider>
        </MotionProvider>
        <SmoothScroll />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
