/**
 * Shared dynamic module loaders for secondary pages.
 * Used both for React.lazy code-splitting and for preloading the active route
 * before client hydration so SSG pre-rendered routes hydrate with zero Suspense flicker.
 */
export const PAGE_LOADERS = {
  FeaturesPage: () => import('../pages/FeaturesPage'),
  PricingPage: () => import('../pages/PricingPage'),
  CheckoutPage: () => import('../pages/CheckoutPage'),
  DownloadPage: () => import('../pages/DownloadPage'),
  DocsPage: () => import('../pages/DocsPage'),
  ChangelogPage: () => import('../pages/ChangelogPage'),
  FaqPage: () => import('../pages/FaqPage'),
  PrivacyPolicyPage: () => import('../pages/PrivacyPolicyPage'),
  TermsPage: () => import('../pages/TermsPage'),
  EulaPage: () => import('../pages/EulaPage'),
  CookiePolicyPage: () => import('../pages/CookiePolicyPage'),
  SecurityPage: () => import('../pages/SecurityPage'),
  ContactPage: () => import('../pages/ContactPage'),
  ReportBugPage: () => import('../pages/ReportBugPage'),
  ToolsPage: () => import('../pages/ToolsPage'),
  FreeInvoiceSoftwarePage: () => import('../pages/FreeInvoiceSoftwarePage'),
  OfflineBillingSoftwarePage: () => import('../pages/OfflineBillingSoftwarePage'),
  GstBillingSoftwarePage: () => import('../pages/GstBillingSoftwarePage'),
  PosBillingSoftwarePage: () => import('../pages/PosBillingSoftwarePage'),
  NotFoundPage: () => import('../pages/NotFoundPage'),
};

export function preloadRouteForPath(pathname = '/') {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/') return Promise.resolve();
  if (clean === '/features') return PAGE_LOADERS.FeaturesPage();
  if (clean === '/pricing') return PAGE_LOADERS.PricingPage();
  if (clean === '/checkout') return PAGE_LOADERS.CheckoutPage();
  if (clean === '/download') return PAGE_LOADERS.DownloadPage();
  if (clean === '/changelog') return PAGE_LOADERS.ChangelogPage();
  if (clean === '/faq') return PAGE_LOADERS.FaqPage();
  if (clean === '/privacy-policy') return PAGE_LOADERS.PrivacyPolicyPage();
  if (clean === '/terms') return PAGE_LOADERS.TermsPage();
  if (clean === '/eula') return PAGE_LOADERS.EulaPage();
  if (clean === '/cookie-policy') return PAGE_LOADERS.CookiePolicyPage();
  if (clean === '/security') return PAGE_LOADERS.SecurityPage();
  if (clean === '/contact') return PAGE_LOADERS.ContactPage();
  if (clean === '/report-bug') return PAGE_LOADERS.ReportBugPage();
  if (clean === '/free-invoice-software') return PAGE_LOADERS.FreeInvoiceSoftwarePage();
  if (clean === '/offline-billing-software') return PAGE_LOADERS.OfflineBillingSoftwarePage();
  if (clean === '/gst-billing-software') return PAGE_LOADERS.GstBillingSoftwarePage();
  if (clean === '/pos-billing-software') return PAGE_LOADERS.PosBillingSoftwarePage();
  if (clean === '/docs' || clean.startsWith('/docs/') || clean === '/doc' || clean.startsWith('/doc/')) {
    return PAGE_LOADERS.DocsPage();
  }
  if (clean === '/tools' || clean.startsWith('/tools/')) {
    return PAGE_LOADERS.ToolsPage();
  }
  return PAGE_LOADERS.NotFoundPage();
}
