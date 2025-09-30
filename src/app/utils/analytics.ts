// Epic Toyota Analytics - Utility Functions & Tracker Access

import { EventType, EventPayload, ConsentSettings, TrackerInterface } from '@/app/types/analytics';

// Global tracker access
declare global {
  interface Window {
    epicTracker?: TrackerInterface;
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Get the global Epic Toyota tracker instance
 */
export function getTracker(): TrackerInterface | null {
  if (typeof window !== 'undefined' && window.epicTracker) {
    return window.epicTracker;
  }
  return null;
}

/**
 * Track an event using the global tracker
 */
export function trackEvent(
  eventType: EventType, 
  eventName?: string, 
  payload?: EventPayload
): void {
  const tracker = getTracker();
  if (tracker) {
    tracker.track(eventType, eventName, payload);
  } else if (process.env.NODE_ENV === 'development') {
    console.warn('Epic Toyota Tracker not initialized. Event not tracked:', { eventType, eventName, payload });
  }
}

/**
 * Toyota-specific tracking helpers
 */
export const ToyotaTracking = {
  // Page tracking
  pageView(additionalData?: EventPayload) {
    trackEvent('page_view', 'navigation', additionalData);
  },

  // CTA tracking
  heroButtonClick(buttonText: string, location: 'hero' | 'sticky' = 'hero') {
    trackEvent('cta_click', 'hero_cta', {
      button_text: buttonText,
      cta_location: location,
      conversion_type: 'cta_engagement'
    });
  },

  bookTestDriveClick(model?: string, location?: string) {
    trackEvent('cta_click', 'book_test_drive', {
      model_name: model,
      cta_location: location,
      conversion_type: 'lead_generation',
      service_type: 'test_drive'
    });
  },

  requestQuoteClick(model?: string, location?: string) {
    trackEvent('cta_click', 'request_quote', {
      model_name: model,
      cta_location: location,
      conversion_type: 'lead_generation',
      service_type: 'quote_request'
    });
  },

  // Form submissions
  contactFormSubmit(formData: any) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackFormSubmit('contact_form', {
        ...formData,
        form_type: 'contact_inquiry'
      });
      
      // Also track as lead conversion
      tracker.trackLeadConversion('contact_inquiry', undefined, {
        inquiry_type: formData.service || 'general',
        contact_method: formData.preferred_contact || 'phone'
      });
    }
  },

  testDriveFormSubmit(formData: any) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackFormSubmit('test_drive_form', formData);
      tracker.trackTestDriveRequest(
        formData.model || 'unknown',
        formData.location || 'unknown',
        {
          ...formData,
          conversion_value: 100 // Assign lead value
        }
      );
    }
  },

  financeInquirySubmit(formData: any) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackFormSubmit('finance_inquiry_form', formData);
      tracker.trackFinanceInquiry(
        formData.model || 'unknown',
        formData.finance_type || 'loan',
        {
          ...formData,
          conversion_value: 150
        }
      );
    }
  },

  serviceBookingSubmit(formData: any) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackFormSubmit('service_booking_form', formData);
      tracker.trackServiceBooking(
        formData.service_type || 'general',
        formData.location || 'mount_road',
        {
          ...formData,
          conversion_value: 75
        }
      );
    }
  },

  // Model interactions
  modelCardClick(modelName: string, action: 'view_details' | 'configure' | 'brochure') {
    trackEvent('click', `model_${action}`, {
      model_name: modelName,
      click_location: 'model_gallery',
      interaction_type: action
    });
  },

  modelConfiguratorStep(modelName: string, step: string, selections?: any) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackCarConfigurator(modelName, step, {
        configurator_step: step,
        selections: selections,
        step_completion: true
      });
    }
  },

  brochureDownload(modelName: string, brochureType: 'general' | 'specs' | 'pricing' = 'general') {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackBrochureDownload(modelName, brochureType, {
        download_location: 'model_page',
        conversion_type: 'content_engagement'
      });
      
      // Also track as file download
      tracker.trackFileDownload(`${modelName}_${brochureType}_brochure.pdf`, 'pdf', {
        model_name: modelName,
        content_type: 'brochure'
      });
    }
  },

  // Navigation and location
  dealerLocationClick(locationName: string, action: 'directions' | 'call' | 'visit_page') {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackDealerLocator(locationName, locationName, {
        action_type: action,
        dealer_name: `Epic Toyota ${locationName}`,
        click_location: 'locations_section'
      });
    }
  },

  phoneNumberClick(phoneNumber: string, location: string) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackPhoneClick(phoneNumber, location, {
        contact_type: 'phone_call',
        conversion_type: 'lead_generation'
      });
    }
  },

  emailClick(email: string, location: string) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackEmailClick(email, location, {
        contact_type: 'email',
        conversion_type: 'lead_generation'
      });
    }
  },

  // Social and external links
  socialMediaClick(platform: 'facebook' | 'instagram' | 'youtube' | 'twitter', location: string) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackExternalLink(`https://${platform}.com/epictoyotachennai`, platform, {
        link_type: 'social_media',
        platform: platform,
        click_location: location
      });
    }
  },

  whatsappClick(phoneNumber: string, location: string) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackExternalLink(`https://wa.me/${phoneNumber}`, 'whatsapp', {
        contact_type: 'whatsapp',
        phone_number: phoneNumber,
        click_location: location,
        conversion_type: 'lead_generation'
      });
    }
  },

  // Video interactions
  videoPlay(videoId: string, videoTitle: string, location?: string) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackVideoPlay(videoId, videoTitle, {
        video_location: location,
        content_type: 'promotional_video'
      });
    }
  },

  videoComplete(videoId: string, videoTitle: string, duration?: number) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackVideoComplete(videoId, videoTitle, {
        video_duration: duration,
        engagement_type: 'complete_view',
        conversion_type: 'content_engagement'
      });
    }
  },

  // Search and filters
  searchUsed(query: string, resultsCount?: number, location?: string) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackSearch(query, resultsCount, {
        search_location: location,
        search_type: 'site_search'
      });
    }
  },

  filterApplied(filterType: string, filterValue: string, location: string) {
    trackEvent('click', 'filter_applied', {
      filter_type: filterType,
      filter_value: filterValue,
      click_location: location,
      interaction_type: 'filter'
    });
  },

  // Error tracking
  trackError(error: Error, context?: string, additionalData?: EventPayload) {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackError(error, context);
    }
    
    // Also send to external error tracking service
    if (window.gtag && context) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: {
          custom_dimension_1: context
        }
      });
    }
  },

  // Performance tracking
  trackPerformanceIssue(issueType: string, details: any) {
    trackEvent('error', 'performance_issue', {
      issue_type: issueType,
      details: details,
      page_url: window.location.href,
      user_agent: navigator.userAgent
    });
  },

  // Newsletter and marketing
  newsletterSignup(email: string, location: string) {
    trackEvent('form_submit', 'newsletter_signup', {
      email_provided: !!email,
      signup_location: location,
      conversion_type: 'marketing_engagement'
    });
  },

  promotionalBannerClick(promoId: string, promoTitle: string, location: string) {
    trackEvent('cta_click', 'promotional_banner', {
      promo_id: promoId,
      promo_title: promoTitle,
      click_location: location,
      content_type: 'promotion'
    });
  }
};

/**
 * Enhanced event helpers with automatic enrichment
 */
export const EnhancedTracking = {
  // Automatically enrich events with UTM parameters
  enrichWithUTM(payload: EventPayload = {}): EventPayload {
    if (typeof window === 'undefined') return payload;
    
    const urlParams = new URLSearchParams(window.location.search);
    return {
      ...payload,
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_term: urlParams.get('utm_term') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
      gclid: urlParams.get('gclid') || undefined,
      fbclid: urlParams.get('fbclid') || undefined,
      msclkid: urlParams.get('msclkid') || undefined
    };
  },

  // Track page performance automatically
  trackPagePerformance() {
    if (typeof window === 'undefined' || !('performance' in window)) return;
    
    // Wait for load event
    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const paint = performance.getEntriesByType('paint');
          const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
          const lcp = performance.getEntriesByType('largest-contentful-paint')[0];
          
          const performanceData = {
            page_load_time: Math.round(navigation.loadEventEnd - navigation.navigationStart),
            dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
            first_contentful_paint: Math.round(fcp?.startTime || 0),
            largest_contentful_paint: Math.round((lcp as any)?.startTime || 0),
            dns_lookup: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
            tcp_connect: Math.round(navigation.connectEnd - navigation.connectStart),
            ttfb: Math.round(navigation.responseStart - navigation.requestStart)
          };

          trackEvent('page_view', 'performance_metrics', performanceData);

          // Track Core Web Vitals issues
          if (performanceData.largest_contentful_paint > 2500) {
            ToyotaTracking.trackPerformanceIssue('poor_lcp', {
              lcp_time: performanceData.largest_contentful_paint,
              threshold: 2500
            });
          }
          
          if (performanceData.first_contentful_paint > 1800) {
            ToyotaTracking.trackPerformanceIssue('poor_fcp', {
              fcp_time: performanceData.first_contentful_paint,
              threshold: 1800
            });
          }
        } catch (error) {
          console.warn('Performance tracking failed:', error);
        }
      }, 2000);
    });
  },

  // Auto-track external link clicks
  initializeAutoTracking() {
    if (typeof window === 'undefined') return;
    
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href) {
        const url = new URL(link.href, window.location.origin);
        
        // External link tracking
        if (url.hostname !== window.location.hostname) {
          const tracker = getTracker();
          if (tracker) {
            tracker.trackExternalLink(link.href, link.textContent || 'External Link', {
              click_location: getElementLocation(link),
              link_text: link.textContent || '',
              target_domain: url.hostname
            });
          }
        }
        
        // Phone number clicks
        if (link.href.startsWith('tel:')) {
          const phone = link.href.replace('tel:', '');
          ToyotaTracking.phoneNumberClick(phone, getElementLocation(link));
        }
        
        // Email clicks
        if (link.href.startsWith('mailto:')) {
          const email = link.href.replace('mailto:', '');
          ToyotaTracking.emailClick(email, getElementLocation(link));
        }
      }
      
      // Button clicks with data attributes
      const button = target.closest('button, [data-track-event]');
      if (button) {
        const eventType = button.getAttribute('data-track-event');
        const eventName = button.getAttribute('data-track-name');
        const eventData = button.getAttribute('data-track-data');
        
        if (eventType) {
          try {
            const payload = eventData ? JSON.parse(eventData) : {};
            trackEvent(eventType as EventType, eventName || undefined, {
              ...payload,
              button_text: button.textContent || '',
              click_location: getElementLocation(button)
            });
          } catch (error) {
            console.warn('Auto-tracking failed:', error);
          }
        }
      }
    });
    
    // Auto-track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      const formName = form.getAttribute('name') || form.id || 'unnamed_form';
      const formData = new FormData(form);
      const formObject: any = {};
      
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      trackEvent('form_submit', formName, {
        form_fields: Object.keys(formObject),
        form_location: getElementLocation(form),
        form_method: form.method || 'GET',
        form_action: form.action || window.location.href
      });
    });
  }
};

/**
 * Utility functions
 */
export function getElementLocation(element: Element): string {
  // Try to find a descriptive location
  let current = element as Element | null;
  
  while (current) {
    // Check for semantic sections
    if (current.id) {
      return current.id;
    }
    
    if (current.className) {
      const classes = current.className.toString();
      if (classes.includes('hero')) return 'hero';
      if (classes.includes('nav')) return 'navigation';
      if (classes.includes('footer')) return 'footer';
      if (classes.includes('contact')) return 'contact';
      if (classes.includes('service')) return 'services';
      if (classes.includes('model')) return 'models';
      if (classes.includes('testimonial')) return 'testimonials';
      if (classes.includes('location')) return 'locations';
    }
    
    // Check tag names
    if (current.tagName) {
      if (current.tagName === 'HEADER') return 'header';
      if (current.tagName === 'NAV') return 'navigation';
      if (current.tagName === 'MAIN') return 'main_content';
      if (current.tagName === 'ASIDE') return 'sidebar';
      if (current.tagName === 'FOOTER') return 'footer';
    }
    
    current = current.parentElement;
  }
  
  return 'unknown';
}

/**
 * Consent management helpers
 */
export const ConsentHelpers = {
  hasConsent(type: keyof ConsentSettings): boolean {
    const tracker = getTracker();
    if (!tracker) return false;
    
    const consent = tracker.getConsent();
    return consent[type];
  },

  async updateConsent(newConsent: Partial<ConsentSettings>): Promise<void> {
    const tracker = getTracker();
    if (!tracker) return;
    
    const currentConsent = tracker.getConsent();
    const updatedConsent = { ...currentConsent, ...newConsent };
    
    tracker.updateConsent(updatedConsent);
    
    // Track consent change
    trackEvent('consent_updated', 'privacy_action', {
      previous_consent: currentConsent,
      new_consent: updatedConsent,
      consent_change_type: Object.keys(newConsent).join(',')
    });
  },

  canLoadExternalScript(scriptType: 'analytics' | 'marketing'): boolean {
    return this.hasConsent(scriptType);
  }
};

/**
 * Debug helpers
 */
export const DebugHelpers = {
  logEvent(eventType: EventType, eventName?: string, payload?: EventPayload) {
    if (process.env.NODE_ENV !== 'development') return;
    
    console.group(`🔍 Epic Toyota Analytics Event`);
    console.log('Type:', eventType);
    if (eventName) console.log('Name:', eventName);
    if (payload) console.log('Payload:', payload);
    console.log('Timestamp:', new Date().toISOString());
    console.log('Page:', window.location.href);
    console.groupEnd();
  },

  getTrackerStatus() {
    const tracker = getTracker();
    if (!tracker) {
      return { status: 'not_initialized', tracker: null };
    }
    
    return {
      status: 'active',
      tracker: tracker,
      consent: tracker.getConsent(),
      clientId: tracker.getClientId(),
      sessionData: tracker.getSessionData(),
      queueSize: tracker.getQueueSize(),
      isOnline: tracker.isOnline()
    };
  },

  enableDebugMode() {
    const tracker = getTracker();
    if (tracker && 'enableDebugMode' in tracker) {
      (tracker as any).enableDebugMode();
    }
  }
};

// Initialize auto-tracking when the module loads
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      EnhancedTracking.initializeAutoTracking();
      EnhancedTracking.trackPagePerformance();
    });
  } else {
    EnhancedTracking.initializeAutoTracking();
    EnhancedTracking.trackPagePerformance();
  }
}

export default ToyotaTracking;