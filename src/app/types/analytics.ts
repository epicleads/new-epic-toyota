// Epic Toyota Analytics - TypeScript Type Definitions

export interface ConsentSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface EventPayload {
  [key: string]: any;
  // Common payload fields
  page_title?: string;
  page_path?: string;
  page_query?: string;
  page_hash?: string;
  click_location?: string;
  element_text?: string;
  form_fields?: string[];
  form_completion_time?: number;
  conversion_type?: 'cta_engagement' | 'lead_generation' | 'purchase' | 'download';
  conversion_value?: number;
  scroll_percentage?: number;
  time_to_scroll?: number;
  error_message?: string;
  error_stack?: string;
  error_context?: string;
  analytics_consent?: boolean;
  marketing_consent?: boolean;
  performance_metrics?: PerformanceMetrics;
  viewport?: {
    width: number;
    height: number;
  };
  device_type?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  is_mobile?: boolean;
  timestamp?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  fbp?: string; // Facebook browser ID
  fbc?: string; // Facebook click ID
  gclid?: string; // Google click ID
  msclkid?: string; // Microsoft click ID
}

export interface AnalyticsEvent {
  client_id: string;
  session_id: string;
  event_type: EventType;
  event_name?: string;
  payload?: EventPayload;
  consent_given: boolean;
  timestamp: string;
  page_url: string;
  referrer: string;
}

export type EventType = 
  | 'page_view'
  | 'click'
  | 'form_submit'
  | 'cta_click'
  | 'scroll_depth'
  | 'session_start'
  | 'session_end'
  | 'file_download'
  | 'external_link'
  | 'video_play'
  | 'video_complete'
  | 'search'
  | 'lead_conversion'
  | 'phone_click'
  | 'email_click'
  | 'brochure_download'
  | 'test_drive_request'
  | 'finance_inquiry'
  | 'service_booking'
  | 'parts_inquiry'
  | 'car_configurator'
  | 'dealer_locator'
  | 'chat_initiated'
  | 'quote_request'
  | 'newsletter_signup'
  | 'social_share'
  | 'error'
  | 'consent_updated'
  | 'consent_revoked';

export interface SessionData {
  id: string;
  start_time: number;
  page_views: number;
  last_activity: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  scroll_depth: number;
  time_on_page: number;
  total_clicks: number;
  bounce_rate?: number;
  entry_page: string;
  exit_page?: string;
  device_type?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  country?: string;
  region?: string;
  city?: string;
  referrer?: string;
  is_returning_visitor: boolean;
}

export interface PerformanceMetrics {
  page_load_time?: number;
  dom_content_loaded?: number;
  first_contentful_paint?: number;
  largest_contentful_paint?: number;
  first_input_delay?: number;
  cumulative_layout_shift?: number;
  connection_type?: string;
  memory_usage?: number;
  dns_lookup?: number;
  tcp_connect?: number;
  ssl_handshake?: number;
  ttfb?: number; // Time to First Byte
  download_time?: number;
  dom_processing?: number;
  onload_time?: number;
  resource_load_time?: number;
  js_execution_time?: number;
}

export interface TrackerConfig {
  clientId: string;
  sessionId: string;
  consent: ConsentSettings;
  apiEndpoint?: string;
  batchSize?: number;
  batchTimeout?: number;
  retryAttempts?: number;
  debug?: boolean;
  enablePerformanceTracking?: boolean;
  enableErrorTracking?: boolean;
  enableScrollTracking?: boolean;
  enableClickTracking?: boolean;
}

export interface TrackerInterface {
  // Core tracking methods
  track(eventType: EventType, eventName?: string, payload?: EventPayload): void;
  trackPageView(additionalData?: EventPayload): void;
  trackClick(element: string, location: string, additionalData?: EventPayload): void;
  trackCTA(ctaName: string, location: string, additionalData?: EventPayload): void;
  trackFormSubmit(formName: string, formData?: any): void;
  trackLeadConversion(conversionType: string, value?: number, additionalData?: EventPayload): void;
  trackScrollDepth(depth: number): void;
  trackError(error: Error, context?: string): void;
  
  // Advanced tracking methods
  trackVideoPlay(videoId: string, videoTitle?: string, additionalData?: EventPayload): void;
  trackVideoComplete(videoId: string, videoTitle?: string, additionalData?: EventPayload): void;
  trackFileDownload(filename: string, fileType: string, additionalData?: EventPayload): void;
  trackExternalLink(url: string, linkText?: string, additionalData?: EventPayload): void;
  trackSearch(query: string, results?: number, additionalData?: EventPayload): void;
  trackPhoneClick(phoneNumber: string, location: string, additionalData?: EventPayload): void;
  trackEmailClick(email: string, location: string, additionalData?: EventPayload): void;
  
  // Toyota-specific tracking methods
  trackTestDriveRequest(model: string, location: string, additionalData?: EventPayload): void;
  trackFinanceInquiry(model: string, financeType: string, additionalData?: EventPayload): void;
  trackServiceBooking(serviceType: string, location: string, additionalData?: EventPayload): void;
  trackPartsInquiry(partName: string, model: string, additionalData?: EventPayload): void;
  trackBrochureDownload(model: string, brochureType: string, additionalData?: EventPayload): void;
  trackCarConfigurator(model: string, step: string, additionalData?: EventPayload): void;
  trackDealerLocator(location: string, dealerName?: string, additionalData?: EventPayload): void;
  trackQuoteRequest(model: string, variant: string, additionalData?: EventPayload): void;
  
  // Session and consent management
  updateConsent(newConsent: ConsentSettings): void;
  flush(): Promise<void>;
  getSessionData(): SessionData | null;
  getClientId(): string;
  getConsent(): ConsentSettings;
  
  // Utility methods
  isOnline(): boolean;
  getQueueSize(): number;
  clearQueue(): void;
  enableDebugMode(): void;
  disableDebugMode(): void;
}

export interface AnalyticsResponse {
  success: boolean;
  message?: string;
  processed?: number;
  total?: number;
  duplicates?: number;
  event_id?: string;
  errors?: any[];
  code?: string;
}

export interface BatchAnalyticsRequest {
  events: AnalyticsEvent[];
}

export interface ConsentUpdateRequest {
  client_id: string;
  consent_settings: ConsentSettings;
  timestamp: string;
}

export interface ConsentRevokeRequest {
  client_id: string;
  revoke_reason?: string;
  timestamp: string;
}

// Toyota-specific event payload types
export interface ToyotaModelPayload extends EventPayload {
  model_name: string;
  model_category: 'sedan' | 'suv' | 'hatchback' | 'hybrid' | 'commercial';
  price_range?: string;
  variant?: string;
  color?: string;
  fuel_type?: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  transmission?: 'manual' | 'automatic';
  engine_capacity?: string;
}

export interface ToyotaTestDrivePayload extends ToyotaModelPayload {
  preferred_date?: string;
  preferred_time?: string;
  contact_method?: 'phone' | 'email' | 'whatsapp';
  location_preference: 'mount_road' | 'vyasarpadi' | 'home_delivery';
  previous_toyota_owner?: boolean;
}

export interface ToyotaFinancePayload extends ToyotaModelPayload {
  finance_type: 'loan' | 'lease' | 'cash';
  loan_amount?: number;
  down_payment?: number;
  loan_tenure?: number;
  employment_type?: 'salaried' | 'self_employed' | 'business';
  monthly_income_range?: string;
}

export interface ToyotaServicePayload extends EventPayload {
  service_type: 'general' | 'periodic' | 'repair' | 'warranty' | 'accident';
  vehicle_model?: string;
  vehicle_year?: string;
  registration_number?: string;
  mileage?: number;
  service_location: 'mount_road' | 'vyasarpadi';
  preferred_date?: string;
  preferred_time?: string;
  service_description?: string;
}

// Database schema interfaces (for backend integration)
export interface DatabaseEvent {
  id: string;
  client_id: string;
  session_id?: string;
  event_type: EventType;
  event_name?: string;
  payload: Record<string, any>;
  ip_hash: string;
  country?: string;
  region?: string;
  city?: string;
  user_agent: string;
  consent_given: boolean;
  created_at: string;
  updated_at?: string;
}

export interface DatabaseSession {
  id: string;
  client_id: string;
  start_time: string;
  end_time?: string;
  page_views: number;
  total_events: number;
  bounce_rate?: number;
  session_duration?: number;
  entry_page: string;
  exit_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  device_type?: string;
  browser?: string;
  country?: string;
  region?: string;
  referrer?: string;
  ip_hash: string;
  created_at: string;
  updated_at?: string;
}

// Error handling types
export interface AnalyticsError extends Error {
  code?: string;
  statusCode?: number;
  context?: any;
  retryable?: boolean;
}

// Configuration types
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
  NEXT_PUBLIC_META_PIXEL_ID?: string;
  NEXT_PUBLIC_ANALYTICS_ENDPOINT?: string;
  NEXT_PUBLIC_DEBUG_MODE?: 'true' | 'false';
}

// Hook types for React integration
export interface UseAnalyticsReturn {
  tracker: TrackerInterface | null;
  isLoading: boolean;
  consent: ConsentSettings;
  updateConsent: (newConsent: ConsentSettings) => Promise<void>;
  trackEvent: (eventType: EventType, eventName?: string, payload?: EventPayload) => void;
  isOnline: boolean;
  queueSize: number;
}

// Component prop types
export interface ConsentManagerProps {
  position?: 'bottom' | 'top';
  theme?: 'light' | 'dark' | 'toyota';
  showPreferencesButton?: boolean;
  autoShow?: boolean;
  customTexts?: {
    headline?: string;
    description?: string;
    acceptAll?: string;
    denyAll?: string;
    customize?: string;
  };
  onConsentChange?: (consent: ConsentSettings) => void;
  debug?: boolean;
}

export interface AnalyticsProviderProps {
  children: React.ReactNode;
  config?: Partial<TrackerConfig>;
  autoInitialize?: boolean;
}

// Utility function types
export type CookieOptions = {
  expires?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

export type StorageType = 'localStorage' | 'sessionStorage' | 'cookie';

export interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  os: string;
  device: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isBot: boolean;
}

// Analytics dashboard types (for admin interface)
export interface DashboardStats {
  total_events: number;
  unique_visitors: number;
  page_views: number;
  bounce_rate: number;
  avg_session_duration: number;
  conversion_rate: number;
  top_pages: Array<{ page: string; views: number; }>;
  top_events: Array<{ event_type: string; count: number; }>;
  geographic_data: Array<{ country: string; visitors: number; }>;
  device_breakdown: Array<{ device_type: string; count: number; }>;
  browser_breakdown: Array<{ browser: string; count: number; }>;
  hourly_traffic: Array<{ hour: number; visitors: number; }>;
  conversion_funnel: Array<{ step: string; users: number; drop_off_rate: number; }>;
}