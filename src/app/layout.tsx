import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";
import { GoogleAnalytics } from "@/components/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const content = getContent();

export const metadata: Metadata = {
  title: {
    default: content.meta.title,
    template: '%s | StuffScope'
  },
  description: content.meta.description,
  keywords: content.meta.keywords,
  authors: [{ name: "StuffScope Team", url: "https://stuffscope.com" }],
  creator: "StuffScope",
  publisher: "StuffScope",
  applicationName: "StuffScope",
  referrer: "origin-when-cross-origin",
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3B82F6" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
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
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
    images: ["/og-image.jpg"],
    creator: "@stuffscope",
    site: "@stuffscope",
  },
  alternates: {
    canonical: "https://stuffscope.com",
  },
  category: "Technology",
  classification: "Business",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "StuffScope",
      "description": content.meta.description,
      "url": "https://stuffscope.com",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": ["iOS", "Android", "Web"],
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "softwareVersion": "1.0",
      "releaseNotes": "Initial launch version with AI-powered inventory scanning",
      "screenshot": "https://stuffscope.com/og-image.jpg",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/ComingSoon",
        "validFrom": new Date().toISOString(),
        "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      },
      "creator": {
        "@type": "Organization",
        "name": "StuffScope Team",
        "url": "https://stuffscope.com",
        "sameAs": [
          "https://twitter.com/stuffscope"
        ]
      },
      "featureList": [
        "AI-powered item recognition",
        "Automatic categorization",
        "Value estimation",
        "Insurance report generation",
        "Cloud backup",
        "Export functionality"
      ],
      "keywords": content.meta.keywords.join(", "),
      "inLanguage": "en-US",
      "copyrightYear": "2025",
      "copyrightHolder": {
        "@type": "Organization",
        "name": "StuffScope Team"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "StuffScope",
      "description": content.meta.description,
      "url": "https://stuffscope.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://stuffscope.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "StuffScope Team",
        "url": "https://stuffscope.com"
      },
      "copyrightYear": "2025",
      "inLanguage": "en-US"
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "StuffScope",
      "url": "https://stuffscope.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://stuffscope.com/logo.png",
        "width": "512",
        "height": "512"
      },
      "sameAs": [
        "https://twitter.com/stuffscope"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "English"
      },
      "foundingDate": "2025",
      "description": content.meta.description,
      "knowsAbout": [
        "Inventory Management",
        "Home Organization",
        "Insurance Documentation",
        "Asset Tracking",
        "AI Technology"
      ]
    }
  ];

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        {jsonLd.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
