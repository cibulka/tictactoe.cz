// log the pageview with their URL
export function googleAnalyticsPageView(url: string) {
  if (!window) return;
  const { gtag } = window as any;
  if (!gtag) return;
  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) return;
  gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
}

// log specific events happening.
export function googleAnalyticsEvent({ action, params }: any) {
  if (!window) return;
  const { gtag } = window as any;
  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) return;
  if (!gtag) return;
  gtag('event', action, params);
}
