"use client";

import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/analytics';

export function GoogleAnalytics() {
  // Don't render in development unless explicitly enabled
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            // Enhanced measurement settings
            enhanced_measurement: {
              scrolls: true,
              outbound_clicks: true,
              site_search: false,
              video_engagement: false,
              file_downloads: true
            },
            // Custom parameters for A/B testing
            custom_map: {
              'custom_parameter_1': 'content_variant'
            }
          });
        `}
      </Script>
    </>
  );
}

// Hook for tracking page views in client components
export function usePageTracking() {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // This will be called by individual pages
    return {
      trackPage: (url: string, title?: string, variant?: string) => {
        if (window.gtag) {
          window.gtag('config', GA_TRACKING_ID, {
            page_title: title || document.title,
            page_location: url,
          });

          if (variant) {
            window.gtag('event', 'page_view_variant', {
              event_category: 'engagement',
              event_label: variant,
              content_variant: variant,
              page_location: url,
              page_title: title || document.title
            });
          }
        }
      }
    };
  }
  
  return {
    trackPage: () => {} // No-op for SSR
  };
}
