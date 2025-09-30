"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Settings, X, Check, AlertCircle, Eye, Zap, BarChart3 } from 'lucide-react';

// Types for better TypeScript support
interface ConsentSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface EventPayload {
  [key: string]: string | number | boolean | object | null | undefined;
}

interface AnalyticsEvent {
  client_id: string;
  session_id: string;
  event_type: string;
  event_name?: string;
  payload?: EventPayload;
  consent_given: boolean;
  timestamp: string;
  page_url: string;
  referrer: string;
}

interface SessionData {
  id: string;
  start_time: number;
  page_views: number;
  last_activity: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  scroll_depth: number;
  time_on_page: number;
}

// Cookie and localStorage keys
const CONSENT_COOKIE = 'epic_consent_v2';
const CLIENT_ID_COOKIE = 'epic_client_id_v2';
const SESSION_STORAGE_KEY = 'epic_session_v2';
const QUEUE_STORAGE_KEY = 'epic_queue_v2';

// API endpoint
const ANALYTICS_ENDPOINT = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.com/admin/epic-toyota/events'
  : 'http://localhost:3001/admin/epic-toyota/events';

export default function ConsentManager() {
  // State management
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [consent, setConsent] = useState<ConsentSettings>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  // Advanced tracking state
  const [clientId, setClientId] = useState<string>('');
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [eventQueue, setEventQueue] = useState<AnalyticsEvent[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [performanceMetrics, setPerformanceMetrics] = useState<any>({});

  // Refs for tracking
  const scrollDepthRef = useRef(0);
  const timeOnPageRef = useRef(Date.now());
  const lastScrollTime = useRef(Date.now());
  const retryTimeouts = useRef<NodeJS.Timeout[]>([]);

  // Generate or retrieve client ID
  const getClientId = useCallback(() => {
    let id = getCookie(CLIENT_ID_COOKIE);
    if (!id) {
      id = generateUUID();
      setCookie(CLIENT_ID_COOKIE, id, 365 * 2); // 2 years
    }
    return id;
  }, []);

  // Session management
  const initializeSession = useCallback(() => {
    const existingSession = localStorage.getItem(SESSION_STORAGE_KEY);
    const urlParams = new URLSearchParams(window.location.search);
    
    let session: SessionData;
    
    if (existingSession) {
      session = JSON.parse(existingSession);
      // Check if session expired (30 minutes)
      if (Date.now() - session.last_activity > 30 * 60 * 1000) {
        session = createNewSession(urlParams);
      } else {
        session.last_activity = Date.now();
        session.page_views += 1;
      }
    } else {
      session = createNewSession(urlParams);
    }

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    setSessionData(session);
    return session;
  }, []);

  const createNewSession = (urlParams: URLSearchParams): SessionData => {
    return {
      id: generateUUID(),
      start_time: Date.now(),
      page_views: 1,
      last_activity: Date.now(),
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      scroll_depth: 0,
      time_on_page: 0
    };
  };

  // Advanced Analytics Tracker Class
  class EpicToyotaTracker {
    private clientId: string;
    private sessionId: string;
    private consent: ConsentSettings;
    private queue: AnalyticsEvent[] = [];
    private batchSize: number = 10;
    private batchTimeout: NodeJS.Timeout | null = null;
    private retryCount: { [key: string]: number } = {};

    constructor(clientId: string, sessionId: string, consent: ConsentSettings) {
      this.clientId = clientId;
      this.sessionId = sessionId;
      this.consent = consent;
      this.loadQueueFromStorage();
      this.setupAutoFlush();
    }

    // Main tracking method
    track(eventType: string, eventName?: string, payload?: EventPayload): void {
      const event: AnalyticsEvent = {
        client_id: this.clientId,
        session_id: this.sessionId,
        event_type: eventType,
        event_name: eventName,
        payload: {
          ...payload,
          analytics_consent: this.consent.analytics,
          marketing_consent: this.consent.marketing,
          performance_metrics: this.getPerformanceMetrics(),
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          scroll_depth: scrollDepthRef.current,
          time_on_page: Date.now() - timeOnPageRef.current
        },
        consent_given: this.consent.analytics,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        referrer: document.referrer || ''
      };

      this.queue.push(event);
      this.saveQueueToStorage();

      // Auto-flush for high-priority events
      const highPriorityEvents = ['form_submit', 'cta_click', 'lead_conversion', 'error'];
      if (highPriorityEvents.includes(eventType)) {
        this.flush();
      } else if (this.queue.length >= this.batchSize) {
        this.flush();
      }
    }

    // Enhanced page view tracking
    trackPageView(additionalData?: EventPayload): void {
      const performanceData = this.getPagePerformanceData();
      
      this.track('page_view', 'navigation', {
        ...additionalData,
        page_title: document.title,
        page_path: window.location.pathname,
        page_query: window.location.search,
        page_hash: window.location.hash,
        user_agent: navigator.userAgent,
        language: navigator.language,
        screen_resolution: `${screen.width}x${screen.height}`,
        color_depth: screen.colorDepth,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        performance: performanceData
      });
    }

    // Enhanced click tracking
    trackClick(element: string, location: string, additionalData?: EventPayload): void {
      this.track('click', element, {
        ...additionalData,
        click_location: location,
        element_text: typeof element === 'string' ? element : '',
        timestamp: Date.now()
      });
    }

    // CTA tracking with conversion tracking
    trackCTA(ctaName: string, location: string, additionalData?: EventPayload): void {
      this.track('cta_click', ctaName, {
        ...additionalData,
        cta_location: location,
        conversion_type: 'cta_engagement'
      });
    }

    // Form submission tracking
    trackFormSubmit(formName: string, formData?: any): void {
      this.track('form_submit', formName, {
        form_fields: Object.keys(formData || {}),
        form_completion_time: Date.now() - timeOnPageRef.current,
        conversion_type: 'lead_generation'
      });
    }

    // Lead conversion tracking
    trackLeadConversion(conversionType: string, value?: number, additionalData?: EventPayload): void {
      this.track('lead_conversion', conversionType, {
        ...additionalData,
        conversion_value: value,
        conversion_timestamp: Date.now(),
        conversion_page: window.location.pathname
      });
    }

    // Scroll depth tracking
    trackScrollDepth(depth: number): void {
      if (depth > scrollDepthRef.current) {
        scrollDepthRef.current = depth;
        
        // Track milestone depths
        const milestones = [25, 50, 75, 90, 100];
        const milestone = milestones.find(m => depth >= m && scrollDepthRef.current < m);
        
        if (milestone) {
          this.track('scroll_depth', `${milestone}%`, {
            scroll_percentage: depth,
            time_to_scroll: Date.now() - timeOnPageRef.current
          });
        }
      }
    }

    // Error tracking
    trackError(error: Error, context?: string): void {
      this.track('error', 'javascript_error', {
        error_message: error.message,
        error_stack: error.stack?.substring(0, 1000), // Limit stack trace size
        error_context: context,
        page_url: window.location.href,
        user_agent: navigator.userAgent
      });
    }

    // Performance metrics
    private getPerformanceMetrics(): any {
      if (!('performance' in window)) return {};

      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
        const lcp = performance.getEntriesByType('largest-contentful-paint')[0];

        return {
          page_load_time: navigation?.loadEventEnd - navigation?.fetchStart,
          dom_content_loaded: navigation?.domContentLoadedEventEnd - navigation?.fetchStart,
          first_contentful_paint: fcp?.startTime,
          largest_contentful_paint: (lcp as any)?.startTime,
          connection_type: (navigator as any)?.connection?.effectiveType,
          memory_usage: (performance as any)?.memory?.usedJSHeapSize
        };
      } catch (error) {
        return { error: 'performance_unavailable' };
      }
    }

    private getPagePerformanceData(): any {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        return {
          dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp_connect: navigation.connectEnd - navigation.connectStart,
          ssl_handshake: navigation.connectEnd - navigation.secureConnectionStart,
          ttfb: navigation.responseStart - navigation.requestStart,
          download_time: navigation.responseEnd - navigation.responseStart,
          dom_processing: navigation.domComplete - navigation.domInteractive,
          onload_time: navigation.loadEventEnd - navigation.loadEventStart
        };
      } catch (error) {
        return {};
      }
    }

    // Queue management
    private loadQueueFromStorage(): void {
      try {
        const stored = localStorage.getItem(QUEUE_STORAGE_KEY);
        if (stored) {
          this.queue = JSON.parse(stored);
        }
      } catch (error) {
        console.warn('Failed to load event queue from storage:', error);
      }
    }

    private saveQueueToStorage(): void {
      try {
        localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(this.queue));
      } catch (error) {
        console.warn('Failed to save event queue to storage:', error);
      }
    }

    private setupAutoFlush(): void {
      // Flush every 30 seconds
      setInterval(() => {
        if (this.queue.length > 0) {
          this.flush();
        }
      }, 30000);

      // Flush on page unload
      window.addEventListener('beforeunload', () => {
        if (this.queue.length > 0) {
          this.flushSync();
        }
      });

      // Flush when page becomes visible again
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && this.queue.length > 0) {
          this.flush();
        }
      });
    }

    // Asynchronous flush
    async flush(): Promise<void> {
      if (this.queue.length === 0) return;

      const events = [...this.queue];
      this.queue = [];
      this.saveQueueToStorage();

      try {
        const response = await fetch(ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(events.length === 1 ? events[0] : { events }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Reset retry count on success
        events.forEach(event => {
          delete this.retryCount[event.event_type + event.timestamp];
        });

      } catch (error) {
        console.warn('Failed to send analytics events:', error);
        
        // Re-queue failed events with exponential backoff
        events.forEach(event => {
          const key = event.event_type + event.timestamp;
          const retries = this.retryCount[key] || 0;
          
          if (retries < 3) {
            this.retryCount[key] = retries + 1;
            setTimeout(() => {
              this.queue.unshift(event);
              this.saveQueueToStorage();
            }, Math.pow(2, retries) * 1000);
          }
        });
      }
    }

    // Synchronous flush for page unload
    private flushSync(): void {
      if (this.queue.length === 0) return;

      try {
        const events = [...this.queue];
        navigator.sendBeacon(
          ANALYTICS_ENDPOINT,
          JSON.stringify(events.length === 1 ? events[0] : { events })
        );
        this.queue = [];
        localStorage.removeItem(QUEUE_STORAGE_KEY);
      } catch (error) {
        console.warn('Failed to send beacon:', error);
      }
    }

    // Update consent settings
    updateConsent(newConsent: ConsentSettings): void {
      this.consent = newConsent;
      
      // If analytics consent withdrawn, flush queue and stop tracking
      if (!newConsent.analytics) {
        this.queue = [];
        this.saveQueueToStorage();
      }
    }
  }

  // Initialize tracker
  const [tracker, setTracker] = useState<EpicToyotaTracker | null>(null);

  // Utility functions
  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const setCookie = (name: string, value: string, days: number): void => {
    if (typeof window === 'undefined') return;
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
  };

  const deleteCookie = (name: string): void => {
    if (typeof window === 'undefined') return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  };

  // Load GA4
  const loadGA4 = useCallback(() => {
    if (typeof window === 'undefined' || !consent.analytics) return;

    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!GA_MEASUREMENT_ID) return;

    // Load gtag script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        client_storage: 'none',
        analytics_storage: 'granted',
        ad_storage: '${consent.marketing ? 'granted' : 'denied'}',
        anonymize_ip: true,
        allow_google_signals: ${consent.marketing}
      });
    `;
    document.head.appendChild(script2);
  }, [consent.analytics, consent.marketing]);

  // Load Meta Pixel
  const loadMetaPixel = useCallback(() => {
    if (typeof window === 'undefined' || !consent.marketing) return;

    const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!PIXEL_ID) return;

    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  }, [consent.marketing]);

  // Initialize everything
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if consent already given
    const existingConsent = getCookie(CONSENT_COOKIE);
    if (existingConsent) {
      const consentData = JSON.parse(existingConsent);
      setConsent(consentData);
      
      // Initialize tracking
      const cId = getClientId();
      setClientId(cId);
      
      const session = initializeSession();
      const newTracker = new EpicToyotaTracker(cId, session.id, consentData);
      setTracker(newTracker);
      
      // Load external scripts if consented
      if (consentData.analytics) loadGA4();
      if (consentData.marketing) loadMetaPixel();
      
      // Track page view
      setTimeout(() => newTracker.trackPageView(), 100);
    } else {
      setShowBanner(true);
    }

    // Online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Scroll depth tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > scrollDepthRef.current) {
        scrollDepthRef.current = scrollPercent;
        tracker?.trackScrollDepth(scrollPercent);
      }
      
      lastScrollTime.current = Date.now();
    };

    const throttledScrollHandler = throttle(handleScroll, 1000);
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    // Global error tracking
    const handleError = (event: ErrorEvent) => {
      tracker?.trackError(new Error(event.message), event.filename);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      tracker?.trackError(new Error(String(event.reason)), 'unhandled_promise_rejection');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('scroll', throttledScrollHandler);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      retryTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  // Throttle utility
  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Handle consent decisions
  const handleAcceptAll = async () => {
    setIsLoading(true);
    
    const newConsent: ConsentSettings = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    };

    await saveConsent(newConsent);
  };

  const handleDenyAll = async () => {
    setIsLoading(true);
    
    const newConsent: ConsentSettings = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    };

    await saveConsent(newConsent);
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    await saveConsent(consent);
    setShowPreferences(false);
  };

  const saveConsent = async (newConsent: ConsentSettings) => {
    try {
      // Save consent
      setCookie(CONSENT_COOKIE, JSON.stringify(newConsent), 365);
      setConsent(newConsent);
      
      // Initialize or update tracking
      const cId = getClientId();
      setClientId(cId);
      
      let session = sessionData;
      if (!session) {
        session = initializeSession();
      }
      
      let currentTracker = tracker;
      if (!currentTracker) {
        currentTracker = new EpicToyotaTracker(cId, session.id, newConsent);
        setTracker(currentTracker);
      } else {
        currentTracker.updateConsent(newConsent);
      }

      // Load external scripts
      if (newConsent.analytics) loadGA4();
      if (newConsent.marketing) loadMetaPixel();

      // Track consent decision
      currentTracker.track('consent_updated', 'privacy_action', {
        analytics_consent: newConsent.analytics,
        marketing_consent: newConsent.marketing,
        preferences_consent: newConsent.preferences
      });

      // Track initial page view if new session
      if (!tracker) {
        setTimeout(() => currentTracker!.trackPageView(), 100);
      }

      setShowBanner(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Failed to save consent:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Consent banner component
  const ConsentBanner = () => (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t-4 border-red-600 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Content */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Epic Toyota uses cookies
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed max-w-2xl">
                We use cookies to enhance your experience, analyze site performance, and deliver personalized Toyota car recommendations. 
                Your privacy matters - choose your preferences below.
              </p>
              <button
                onClick={() => setShowPreferences(true)}
                className="text-red-600 hover:text-red-700 text-sm font-medium mt-2 underline"
              >
                View Cookie Details
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 min-w-max">
            <button
              onClick={handleDenyAll}
              disabled={isLoading}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              Deny All
            </button>
            <button
              onClick={() => setShowPreferences(true)}
              className="px-6 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Customize
            </button>
            <button
              onClick={handleAcceptAll}
              disabled={isLoading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Accept All
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Preferences modal component
  const PreferencesModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowPreferences(false);
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Privacy Preferences</h2>
            </div>
            <button
              onClick={() => setShowPreferences(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
            
            {/* Essential Cookies */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Always Active
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Required for the website to function properly. These cookies ensure basic functionalities and security features.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => setConsent(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Help us understand how visitors interact with our website by collecting anonymous information about page views, clicks, and user behavior.
              </p>
              <div className="text-xs text-gray-500">
                <strong>Data collected:</strong> Page views, click events, scroll depth, time on page, device information, geographic location (country/region only)
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Marketing Cookies</h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={(e) => setConsent(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Enable personalized Toyota car recommendations, targeted advertisements, and remarketing campaigns across social media platforms.
              </p>
              <div className="text-xs text-gray-500">
                <strong>Data collected:</strong> Ad interactions, conversion tracking, social media integration, personalized content preferences
              </div>
            </div>

            {/* Preferences */}
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Preference Cookies</h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.preferences}
                    onChange={(e) => setConsent(prev => ({ ...prev, preferences: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Remember your choices and preferences to provide a more personalized experience on future visits.
              </p>
              <div className="text-xs text-gray-500">
                <strong>Data collected:</strong> Language preferences, display settings, form data, location preferences
              </div>
            </div>

          </div>

          {/* Privacy Information */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">Your Privacy Rights</p>
                <p>
                  You can change these preferences anytime. Your data is processed in accordance with our Privacy Policy and is never sold to third parties.
                  All personal information is anonymized and encrypted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t bg-gray-50 p-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={() => setShowPreferences(false)}
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSavePreferences}
            disabled={isLoading}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            Save Preferences
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  // Success message
  const SuccessMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 right-6 z-[9999] bg-green-600 text-white p-4 rounded-lg shadow-xl max-w-sm"
    >
      <div className="flex items-center gap-3">
        <Check className="w-5 h-5" />
        <p className="font-medium">✅ Thank you! Preferences saved successfully.</p>
      </div>
    </motion.div>
  );

 

  // Expose tracker globally for easy access
  useEffect(() => {
    if (tracker && typeof window !== 'undefined') {
      (window as any).epicTracker = tracker;
    }
  }, [tracker]);

  return (
    <>
      <AnimatePresence>
        {showBanner && <ConsentBanner key="consent-banner" />}
        {showPreferences && <PreferencesModal key="preferences-modal" />}
        {showSuccess && <SuccessMessage key="success-message" />}
      </AnimatePresence>
      
    </>
  );
}