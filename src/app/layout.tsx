import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const content = getContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  keywords: content.meta.keywords,
  authors: [{ name: "StuffScope Team" }],
  creator: "StuffScope",
  publisher: "StuffScope",
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
    locale: "en_US",
    url: "https://stuffscope.com",
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
    siteName: "StuffScope",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StuffScope - Smart Inventory Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
    images: ["/og-image.jpg"],
    creator: "@stuffscope",
  },
  alternates: {
    canonical: "https://stuffscope.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StuffScope",
    "description": content.meta.description,
    "url": "https://stuffscope.com",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": ["iOS", "Android", "Web"],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/ComingSoon"
    },
    "creator": {
      "@type": "Organization",
      "name": "StuffScope Team"
    }
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
