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
import { DownloadPage } from './pages/DownloadPage';

// Secondary pages loaded on demand (reduces initial bundle size)
const ChangelogPage = lazy(() => import('./pages/ChangelogPage').then(m => ({ default: m.ChangelogPage })));
const SystemRequirementsPage = lazy(() => import('./pages/SystemRequirementsPage').then(m => ({ default: m.SystemRequirementsPage })));
const InstallationGuidePage = lazy(() => import('./pages/InstallationGuidePage').then(m => ({ default: m.InstallationGuidePage })));
const SupportPage = lazy(() => import('./pages/SupportPage').then(m => ({ default: m.SupportPage })));
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

  return (
    <DownloadModalProvider>
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
        <Navbar />

        <div className={`flex-1 flex flex-col ${isToolsPage ? '' : 'pt-16'}`}>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              {/* Main Brand & Conversion Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/products/invio" element={<Navigate to="/features" replace />} />
              <Route path="/product" element={<Navigate to="/features" replace />} />
              <Route path="/product-overview" element={<Navigate to="/features" replace />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/checkout" element={<PricingPage />} />
              <Route path="/subscription" element={<Navigate to="/pricing" replace />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/changelog" element={<ChangelogPage />} />
              <Route path="/version" element={<Navigate to="/changelog" replace />} />
              <Route path="/releases" element={<Navigate to="/changelog" replace />} />
              <Route path="/system-requirements" element={<SystemRequirementsPage />} />

              {/* Documentation & Support Routes */}
              <Route path="/docs/installation" element={<InstallationGuidePage />} />
              <Route path="/docs/features" element={<Navigate to="/features" replace />} />
              <Route path="/docs/settings" element={<Navigate to="/docs/installation" replace />} />
              <Route path="/docs" element={<Navigate to="/docs/installation" replace />} />
              <Route path="/support" element={<SupportPage />} />
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

        {!isToolsPage && <Footer />}

        {/* Global Multi-Platform Download Modal */}
        <DownloadModal />
      </div>
    </DownloadModalProvider>
  );
}

export default App;
