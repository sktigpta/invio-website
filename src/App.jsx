import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DownloadModalProvider } from './context/DownloadModalContext';
import { DownloadModal } from './components/DownloadModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Primary pages loaded eagerly
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DownloadPage } from './pages/DownloadPage';

// Secondary pages loaded on demand (reduces initial bundle size)
const DocsPage = lazy(() => import('./pages/DocsPage').then(m => ({ default: m.DocsPage })));
const ChangelogPage = lazy(() => import('./pages/ChangelogPage').then(m => ({ default: m.ChangelogPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const EulaPage = lazy(() => import('./pages/EulaPage').then(m => ({ default: m.EulaPage })));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));
const SecurityPage = lazy(() => import('./pages/SecurityPage').then(m => ({ default: m.SecurityPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const ToolsPage = lazy(() => import('./pages/ToolsPage').then(m => ({ default: m.ToolsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function PageFallback() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="size-8 rounded-full border-2 border-slate-200 border-t-[#7C3AED] animate-spin" />
    </div>
  );
}

export function App() {
  const location = useLocation();
  const isToolsPage = location.pathname.startsWith('/tools');
  const isDocsPage = location.pathname.startsWith('/docs') || location.pathname.startsWith('/doc');
  const isCheckoutPage = location.pathname.startsWith('/checkout');

  return (
    <DownloadModalProvider>
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
        <Navbar />

        <div className={`flex-1 flex flex-col ${isToolsPage || isDocsPage ? '' : 'pt-16'}`}>
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

              {/* Documentation Dashboard (Start-to-End Guides & Requirements) */}
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/doc" element={<DocsPage />} />
              <Route path="/docs/:docId" element={<DocsPage />} />
              <Route path="/doc/:docId" element={<DocsPage />} />
              <Route path="/system-requirements" element={<Navigate to="/docs/system" replace />} />
              <Route path="/installation-guide" element={<Navigate to="/docs/installation" replace />} />
              <Route path="/support" element={<Navigate to="/docs/troubleshooting" replace />} />
              <Route path="/faq" element={<FaqPage />} />

              {/* Free Financial & Tax Tools */}
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
              <Route path="/blog" element={<BlogPage />} />

              {/* Fallback & 404 */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>

        {!isToolsPage && !isDocsPage && !isCheckoutPage && <Footer />}

        {/* Global Multi-Platform Download Modal */}
        <DownloadModal />
      </div>
    </DownloadModalProvider>
  );
}

export default App;
