// Google Analytics 4 Configuration and Event Tracking

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date | object,
      config?: object
    ) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title?: string, variant?: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title || document.title,
      page_location: url,
      custom_map: {
        custom_parameter_1: 'content_variant'
      }
    });

    // Track custom event for variant tracking
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
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string = 'engagement',
  label?: string,
  value?: number,
  variant?: string
) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    const eventData: Record<string, unknown> = {
      event_category: category,
      event_label: label,
      value: value,
    };

    // Add variant information if available
    if (variant) {
      eventData.content_variant = variant;
    }

    window.gtag('event', action, eventData);
  }
};

// Specific tracking functions for StuffScope events

// Track CTA clicks
export const trackCTAClick = (
  ctaType: 'primary' | 'secondary',
  ctaText: string,
  location: string,
  variant?: string
) => {
  trackEvent('cta_click', 'engagement', `${ctaType}_${location}_${ctaText}`, undefined, variant);
};

// Track waitlist signup
export const trackWaitlistSignup = (variant?: string, email?: string) => {
  trackEvent('waitlist_signup', 'conversion', variant, undefined, variant);
  
  // Track as conversion event
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'conversion', {
      send_to: GA_TRACKING_ID,
      event_category: 'conversion',
      event_label: 'waitlist_signup',
      content_variant: variant,
      user_email_hash: email ? btoa(email) : undefined // Hash email for privacy
    });
  }
};

// Track survey completion
export const trackSurveyComplete = (variant?: string, questionCount?: number) => {
  trackEvent('survey_complete', 'conversion', variant, questionCount, variant);
  
  // Track as conversion event
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'conversion', {
      send_to: GA_TRACKING_ID,
      event_category: 'conversion',
      event_label: 'survey_complete',
      content_variant: variant,
      question_count: questionCount
    });
  }
};

// Track survey start
export const trackSurveyStart = (variant?: string) => {
  trackEvent('survey_start', 'engagement', variant, undefined, variant);
};

// Track scroll depth
export const trackScrollDepth = (percentage: number, variant?: string) => {
  trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage, variant);
};

// Track form interactions
export const trackFormInteraction = (
  formType: 'waitlist' | 'survey',
  action: 'focus' | 'input' | 'error' | 'submit',
  field?: string,
  variant?: string
) => {
  trackEvent(`form_${action}`, 'engagement', `${formType}_${field || 'form'}`, undefined, variant);
};

// Track feature interactions
export const trackFeatureClick = (featureName: string, location: string, variant?: string) => {
  trackEvent('feature_click', 'engagement', `${featureName}_${location}`, undefined, variant);
};

// Track navigation
export const trackNavigation = (
  from: string,
  to: string,
  method: 'click' | 'scroll' | 'back',
  variant?: string
) => {
  trackEvent('navigation', 'engagement', `${from}_to_${to}_${method}`, undefined, variant);
};

// Track time on page (call when user leaves or after certain time)
export const trackTimeOnPage = (seconds: number, variant?: string) => {
  trackEvent('time_on_page', 'engagement', variant, seconds, variant);
};

// Track A/B test exposure
export const trackABTestExposure = (testName: string, variant: string) => {
  trackEvent('ab_test_exposure', 'experiment', `${testName}_${variant}`, undefined, variant);
};

// Utility function to get current variant from URL
export const getCurrentVariant = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.startsWith('/v1') ? 'v1' : 'default';
  }
  return 'default';
};

// Enhanced page tracking with automatic variant detection
export const trackPageViewWithVariant = (url?: string, title?: string) => {
  const variant = getCurrentVariant();
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  trackPageView(pageUrl, title, variant);
  
  // Track A/B test exposure
  trackABTestExposure('landing_page_content', variant);
};

// Scroll tracking setup
export const setupScrollTracking = (variant?: string) => {
  if (typeof window === 'undefined') return;

  const scrollDepthTracked = new Set<number>();
  const thresholds = [25, 50, 75, 90, 100];

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !scrollDepthTracked.has(threshold)) {
        scrollDepthTracked.add(threshold);
        trackScrollDepth(threshold, variant || getCurrentVariant());
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Time tracking setup
export const setupTimeTracking = (variant?: string) => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  const timeTracked = new Set<number>();
  const thresholds = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m

  const trackTimeThresholds = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    thresholds.forEach(threshold => {
      if (timeSpent >= threshold && !timeTracked.has(threshold)) {
        timeTracked.add(threshold);
        trackTimeOnPage(threshold, variant || getCurrentVariant());
      }
    });
  };

  const interval = setInterval(trackTimeThresholds, 10000); // Check every 10 seconds

  // Track final time on page when leaving
  const handleBeforeUnload = () => {
    const finalTime = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(finalTime, variant || getCurrentVariant());
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  // Cleanup function
  return () => {
    clearInterval(interval);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};
