import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DownloadModalProvider } from './context/DownloadModalContext';
import { DownloadModal } from './components/DownloadModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PAGE_LOADERS } from './routes/pageLoaders';

// Primary home page loaded eagerly; other pages code-split on client and overridden eagerly in SSR
import { HomePage } from './pages/HomePage';

const LazyPages = {
  FeaturesPage: lazy(PAGE_LOADERS.FeaturesPage),
  PricingPage: lazy(PAGE_LOADERS.PricingPage),
  CheckoutPage: lazy(PAGE_LOADERS.CheckoutPage),
  DownloadPage: lazy(PAGE_LOADERS.DownloadPage),
  DocsPage: lazy(PAGE_LOADERS.DocsPage),
  ChangelogPage: lazy(PAGE_LOADERS.ChangelogPage),
  FaqPage: lazy(PAGE_LOADERS.FaqPage),
  PrivacyPolicyPage: lazy(PAGE_LOADERS.PrivacyPolicyPage),
  TermsPage: lazy(PAGE_LOADERS.TermsPage),
  EulaPage: lazy(PAGE_LOADERS.EulaPage),
  CookiePolicyPage: lazy(PAGE_LOADERS.CookiePolicyPage),
  SecurityPage: lazy(PAGE_LOADERS.SecurityPage),
  ContactPage: lazy(PAGE_LOADERS.ContactPage),
  ReportBugPage: lazy(PAGE_LOADERS.ReportBugPage),
  ToolsPage: lazy(PAGE_LOADERS.ToolsPage),
  FreeInvoiceSoftwarePage: lazy(PAGE_LOADERS.FreeInvoiceSoftwarePage),
  OfflineBillingSoftwarePage: lazy(PAGE_LOADERS.OfflineBillingSoftwarePage),
  GstBillingSoftwarePage: lazy(PAGE_LOADERS.GstBillingSoftwarePage),
  PosBillingSoftwarePage: lazy(PAGE_LOADERS.PosBillingSoftwarePage),
  NotFoundPage: lazy(PAGE_LOADERS.NotFoundPage),
};

function PageFallback() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="size-8 rounded-full border-2 border-slate-200 border-t-[#7C3AED] animate-spin" />
    </div>
  );
}

function SitemapRedirect() {
  useEffect(() => {
    window.location.replace('/sitemap.xml');
  }, []);
  return null;
}

export function App({ pageComponents = LazyPages }) {
  const location = useLocation();
  const isToolsPage = location.pathname.startsWith('/tools');
  const isDocsPage = location.pathname.startsWith('/docs') || location.pathname.startsWith('/doc');
  const isCheckoutPage = location.pathname.startsWith('/checkout');

  const {
    FeaturesPage,
    PricingPage,
    CheckoutPage,
    DownloadPage,
    DocsPage,
    ChangelogPage,
    FaqPage,
    PrivacyPolicyPage,
    TermsPage,
    EulaPage,
    CookiePolicyPage,
    SecurityPage,
    ContactPage,
    ReportBugPage,
    ToolsPage,
    FreeInvoiceSoftwarePage,
    OfflineBillingSoftwarePage,
    GstBillingSoftwarePage,
    PosBillingSoftwarePage,
    NotFoundPage,
  } = pageComponents;

  return (
    <DownloadModalProvider>
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
        <Navbar />

        <div className={`flex-1 flex flex-col ${isToolsPage || isDocsPage ? '' : 'pt-16'}`}>
          <ErrorBoundary>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* Main Brand & Conversion Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/products/invio" element={<Navigate to="/features" replace />} />
                <Route path="/product" element={<Navigate to="/features" replace />} />
                <Route path="/product-overview" element={<Navigate to="/features" replace />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/subscription" element={<Navigate to="/pricing" replace />} />
                <Route path="/download" element={<DownloadPage />} />
                <Route path="/changelog" element={<ChangelogPage />} />
                <Route path="/version" element={<Navigate to="/changelog" replace />} />
                <Route path="/releases" element={<Navigate to="/changelog" replace />} />

                {/* Dedicated High-Intent Solutions Landing Pages */}
                <Route path="/free-invoice-software" element={<FreeInvoiceSoftwarePage />} />
                <Route path="/offline-billing-software" element={<OfflineBillingSoftwarePage />} />
                <Route path="/gst-billing-software" element={<GstBillingSoftwarePage />} />
                <Route path="/pos-billing-software" element={<PosBillingSoftwarePage />} />

                {/* Documentation Dashboard (Start-to-End Guides & Requirements) */}
                <Route path="/docs" element={<DocsPage />} />
                <Route path="/doc" element={<DocsPage />} />
                <Route path="/docs/:docId" element={<DocsPage />} />
                <Route path="/doc/:docId" element={<DocsPage />} />
                <Route path="/system-requirements" element={<Navigate to="/docs/system" replace />} />
                <Route path="/installation-guide" element={<Navigate to="/docs/installation" replace />} />
                <Route path="/support" element={<Navigate to="/docs/troubleshooting" replace />} />
                <Route path="/faq" element={<FaqPage />} />

                {/* Free Financial, Invoice & Tax Tools */}
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/tools/:toolId" element={<ToolsPage />} />

                {/* Legal & Trust Routes */}
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
                <Route path="/eula" element={<EulaPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/report-bug" element={<ReportBugPage />} />
                <Route path="/bugs" element={<Navigate to="/report-bug" replace />} />
                <Route path="/bug-report" element={<Navigate to="/report-bug" replace />} />
                <Route path="/sitemap" element={<SitemapRedirect />} />
                <Route path="/sitemap.xml" element={<SitemapRedirect />} />

                {/* Fallback & 404 */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>

        {!isToolsPage && !isDocsPage && !isCheckoutPage && <Footer />}

        {/* Global Multi-Platform Download Modal */}
        <DownloadModal />
      </div>
    </DownloadModalProvider>
  );
}

export default App;
