import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { DownloadPage } from './pages/DownloadPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { SystemRequirementsPage } from './pages/SystemRequirementsPage';
import { InstallationGuidePage } from './pages/InstallationGuidePage';
import { SupportPage } from './pages/SupportPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { EulaPage } from './pages/EulaPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { SecurityPage } from './pages/SecurityPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { ToolsPage } from './pages/ToolsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const location = useLocation();
  const isToolsPage = location.pathname.startsWith('/tools');

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
      <Navbar />

      <div className={`flex-1 flex flex-col ${isToolsPage ? '' : 'pt-16'}`}>
        <Routes>
          {/* Main Brand & Conversion Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/products/invio" element={<Navigate to="/features" replace />} />
          <Route path="/product" element={<Navigate to="/features" replace />} />
          <Route path="/product-overview" element={<Navigate to="/features" replace />} />
          <Route path="/pricing" element={<PricingPage />} />
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
      </div>

      {!isToolsPage && <Footer />}
    </div>
  );
}

export default App;
