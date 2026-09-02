// app/hooks/useAnalytics.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function useAnalytics(payload: AnalyticsPayload) {
  const location = useLocation();
  const key = JSON.stringify(payload);

  useEffect(() => {
    sendAnalytics(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, key]);
}

export type AnalyticsPayload = {
  pageType: string;
  [key: string]: unknown;
};

function sendAnalytics(payload: AnalyticsPayload) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'spa_pageview',
    ...payload,
  });
}