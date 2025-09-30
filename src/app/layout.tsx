import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BUSINESS_INFO, META_DEFAULTS } from "./lib/business-info";
import StructuredData from "./components/seo/StructuredData";
import GeoTargeting from "./components/seo/GeoTargeting";
import ConsentManager from "./components/analytics/ConsentManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BUSINESS_INFO.brand.colors.primary },
    { media: "(prefers-color-scheme: dark)", color: BUSINESS_INFO.brand.colors.secondary },
  ],
};

export const metadata: Metadata = {
  title: {
    default: META_DEFAULTS.title,
    template: `%s | ${BUSINESS_INFO.name}`,
  },
  description: META_DEFAULTS.description,
  keywords: META_DEFAULTS.keywords,
  authors: [{ name: META_DEFAULTS.author }],
  creator: META_DEFAULTS.author,
  publisher: META_DEFAULTS.author,
  
  metadataBase: new URL(META_DEFAULTS.siteUrl),
  alternates: {
    canonical: "/",
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: META_DEFAULTS.siteUrl,
    siteName: META_DEFAULTS.siteName,
    title: META_DEFAULTS.title,
    description: META_DEFAULTS.description,
    images: [
      {
        url: "/images/epic-toyota-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Epic Toyota Chennai - Authorized Toyota Dealer",
        type: "image/jpeg",
      },
      {
        url: "/images/epic-toyota-logo.png",
        width: 512,
        height: 512,
        alt: "Epic Toyota Logo",
        type: "image/png",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    site: "@epictoyotachn",
    creator: "@epictoyotachn",
    title: META_DEFAULTS.title,
    description: META_DEFAULTS.description,
    images: ["/images/epic-toyota-og-image.jpg"],
  },
  
  facebook: {
    admins: [""], // Add Facebook admin ID if available
  },
  
  verification: {
    google: "", // Add Google Search Console verification
    yandex: "", // Add if targeting international users
    other: {
      "msvalidate.01": "", // Add Bing verification
    },
  },
  
  category: "automotive",
  classification: "business",
  
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=yes",
    "geo.region": "IN-TN",
    "geo.placename": "Chennai, Tamil Nadu, India",
    "geo.position": `${BUSINESS_INFO.geoData.primaryCoordinates.latitude};${BUSINESS_INFO.geoData.primaryCoordinates.longitude}`,
    "ICBM": `${BUSINESS_INFO.geoData.primaryCoordinates.latitude}, ${BUSINESS_INFO.geoData.primaryCoordinates.longitude}`,
    "geo.coverage": "Chennai Metropolitan Area, Tamil Nadu",
    "location": "Chennai, Tamil Nadu, India",
    "distribution": "Chennai, Mount Road, Vyasarpadi, T Nagar, Anna Nagar, Adyar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <StructuredData />
        <GeoTargeting />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <noscript>
          <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#f3f4f6" }}>
            For the best experience, please enable JavaScript in your browser to view Epic Toyota Chennai.
          </div>
        </noscript>
        {children}
        <ConsentManager />
      </body>
    </html>
  );
}
