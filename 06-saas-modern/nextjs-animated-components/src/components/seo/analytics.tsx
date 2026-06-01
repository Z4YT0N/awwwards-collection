"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// =============================================================================
// Analytics Integration - Plug and Play
// =============================================================================
// Supports: Google Analytics 4, Plausible, Fathom, Umami, Posthog
// Usage: Just add the component to your layout with your ID

// =============================================================================
// Google Analytics 4
// =============================================================================

export interface GoogleAnalyticsProps {
  measurementId: string;
  debugMode?: boolean;
}

function GoogleAnalyticsInner({ measurementId, debugMode = false }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      window.gtag("config", measurementId, {
        page_path: url,
        debug_mode: debugMode,
      });
    }
  }, [pathname, searchParams, measurementId, debugMode]);

  return null;
}

export function GoogleAnalytics({ measurementId, debugMode = false }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}'${debugMode ? ", { debug_mode: true }" : ""});
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsInner measurementId={measurementId} debugMode={debugMode} />
      </Suspense>
    </>
  );
}

// GA4 Event Tracking Helper
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// =============================================================================
// Plausible Analytics (Privacy-friendly)
// =============================================================================

export interface PlausibleProps {
  domain: string;
  customDomain?: string; // For self-hosted
  trackLocalhost?: boolean;
  enabled?: boolean;
}

export function PlausibleAnalytics({
  domain,
  customDomain,
  trackLocalhost = false,
  enabled = true,
}: PlausibleProps) {
  if (!enabled) return null;

  const scriptSrc = customDomain
    ? `${customDomain}/js/plausible.js`
    : "https://plausible.io/js/plausible.js";

  return (
    <Script
      defer
      data-domain={domain}
      src={scriptSrc}
      data-api={customDomain ? `${customDomain}/api/event` : undefined}
      {...(trackLocalhost && { "data-include": "localhost" })}
    />
  );
}

// Plausible Event Tracking
export function trackPlausibleEvent(
  eventName: string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(eventName, { props });
  }
}

// =============================================================================
// Fathom Analytics (Privacy-friendly)
// =============================================================================

export interface FathomProps {
  siteId: string;
  customDomain?: string;
  includedDomains?: string[];
  excludedDomains?: string[];
  spa?: "auto" | "history" | "hash";
}

function FathomInner({ siteId }: { siteId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.fathom) {
      window.fathom.trackPageview();
    }
  }, [pathname, searchParams]);

  return null;
}

export function FathomAnalytics({
  siteId,
  customDomain,
  includedDomains,
  excludedDomains,
  spa = "auto",
}: FathomProps) {
  const scriptSrc = customDomain
    ? `${customDomain}/script.js`
    : "https://cdn.usefathom.com/script.js";

  return (
    <>
      <Script
        src={scriptSrc}
        data-site={siteId}
        data-spa={spa}
        {...(includedDomains && { "data-included-domains": includedDomains.join(",") })}
        {...(excludedDomains && { "data-excluded-domains": excludedDomains.join(",") })}
        defer
      />
      <Suspense fallback={null}>
        <FathomInner siteId={siteId} />
      </Suspense>
    </>
  );
}

// Fathom Event Tracking
export function trackFathomGoal(goalId: string, value?: number) {
  if (typeof window !== "undefined" && window.fathom) {
    window.fathom.trackGoal(goalId, value || 0);
  }
}

// =============================================================================
// Umami Analytics (Open Source, Self-Hosted)
// =============================================================================

export interface UmamiProps {
  websiteId: string;
  src: string; // Your Umami instance URL
  domains?: string[];
  autoTrack?: boolean;
}

export function UmamiAnalytics({
  websiteId,
  src,
  domains,
  autoTrack = true,
}: UmamiProps) {
  return (
    <Script
      async
      src={src}
      data-website-id={websiteId}
      {...(domains && { "data-domains": domains.join(",") })}
      {...(!autoTrack && { "data-auto-track": "false" })}
    />
  );
}

// Umami Event Tracking
export function trackUmamiEvent(
  eventName: string,
  eventData?: Record<string, string | number>
) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(eventName, eventData);
  }
}

// =============================================================================
// PostHog (Product Analytics)
// =============================================================================

export interface PostHogProps {
  apiKey: string;
  apiHost?: string;
  capturePageview?: boolean;
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.posthog) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      window.posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogAnalytics({
  apiKey,
  apiHost = "https://app.posthog.com",
  capturePageview = true,
}: PostHogProps) {
  return (
    <>
      <Script id="posthog-init" strategy="afterInteractive">
        {`
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('${apiKey}', {
            api_host: '${apiHost}',
            capture_pageview: ${!capturePageview}
          });
        `}
      </Script>
      {capturePageview && (
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
      )}
    </>
  );
}

// PostHog Event Tracking
export function trackPostHogEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.posthog) {
    window.posthog.capture(eventName, properties);
  }
}

// =============================================================================
// Universal Analytics Component
// =============================================================================
// Supports multiple providers in one component

export interface AnalyticsConfig {
  googleAnalytics?: GoogleAnalyticsProps;
  plausible?: PlausibleProps;
  fathom?: FathomProps;
  umami?: UmamiProps;
  posthog?: PostHogProps;
}

export function Analytics({
  googleAnalytics,
  plausible,
  fathom,
  umami,
  posthog,
}: AnalyticsConfig) {
  return (
    <>
      {googleAnalytics && <GoogleAnalytics {...googleAnalytics} />}
      {plausible && <PlausibleAnalytics {...plausible} />}
      {fathom && <FathomAnalytics {...fathom} />}
      {umami && <UmamiAnalytics {...umami} />}
      {posthog && <PostHogAnalytics {...posthog} />}
    </>
  );
}

// =============================================================================
// Type Declarations for Global Window
// =============================================================================

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    plausible: (
      eventName: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
    fathom: {
      trackPageview: () => void;
      trackGoal: (goalId: string, value: number) => void;
    };
    umami: {
      track: (eventName: string, eventData?: Record<string, string | number>) => void;
    };
    posthog: {
      capture: (eventName: string, properties?: Record<string, unknown>) => void;
      identify: (userId: string, properties?: Record<string, unknown>) => void;
    };
  }
}
