import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DownloadModalProvider } from './context/DownloadModalContext';
import { DownloadModal } from './components/DownloadModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

// Primary home page loaded eagerly; other pages code-split for minimal initial bundle
import { HomePage } from './pages/HomePage';
const FeaturesPage = lazy(() => import('./pages/FeaturesPage').then(m => ({ default: m.FeaturesPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const DownloadPage = lazy(() => import('./pages/DownloadPage').then(m => ({ default: m.DownloadPage })));

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
const ReportBugPage = lazy(() => import('./pages/ReportBugPage').then(m => ({ default: m.ReportBugPage })));
const ToolsPage = lazy(() => import('./pages/ToolsPage').then(m => ({ default: m.ToolsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
// CRM System Components (only mounted when VITE_ENABLE_EMBEDDED_CRM === 'true')
import { CrmAuthProvider } from './crm/context/CrmAuthContext';
import { CrmToastProvider } from './crm/context/CrmToastContext';
import { CrmToaster } from './crm/components/CrmToaster';
import { CrmLayout } from './crm/components/CrmLayout';
import { CrmProtectedRoute } from './crm/components/CrmProtectedRoute';
const CrmLoginPage = lazy(() => import('./crm/pages/CrmLoginPage').then(m => ({ default: m.CrmLoginPage })));
const CrmDashboardPage = lazy(() => import('./crm/pages/CrmDashboardPage').then(m => ({ default: m.CrmDashboardPage })));
const CrmCustomersPage = lazy(() => import('./crm/pages/CrmCustomersPage').then(m => ({ default: m.CrmCustomersPage })));
const CrmCustomerDetailPage = lazy(() => import('./crm/pages/CrmCustomerDetailPage').then(m => ({ default: m.CrmCustomerDetailPage })));
const CrmDiscountsPage = lazy(() => import('./crm/pages/CrmDiscountsPage').then(m => ({ default: m.CrmDiscountsPage })));
const CrmApprovalsPage = lazy(() => import('./crm/pages/CrmApprovalsPage').then(m => ({ default: m.CrmApprovalsPage })));
const CrmCouponsPage = lazy(() => import('./crm/pages/CrmCouponsPage').then(m => ({ default: m.CrmCouponsPage })));
const CrmTicketsPage = lazy(() => import('./crm/pages/CrmTicketsPage').then(m => ({ default: m.CrmTicketsPage })));
const CrmTicketDetailPage = lazy(() => import('./crm/pages/CrmTicketDetailPage').then(m => ({ default: m.CrmTicketDetailPage })));
const CrmBugsPage = lazy(() => import('./crm/pages/CrmBugsPage').then(m => ({ default: m.CrmBugsPage })));
const CrmContactsPage = lazy(() => import('./crm/pages/CrmContactsPage').then(m => ({ default: m.CrmContactsPage })));
const CrmBroadcastsPage = lazy(() => import('./crm/pages/CrmBroadcastsPage').then(m => ({ default: m.CrmBroadcastsPage })));
const CrmPlansPage = lazy(() => import('./crm/pages/CrmPlansPage').then(m => ({ default: m.CrmPlansPage })));
const CrmStaffPage = lazy(() => import('./crm/pages/CrmStaffPage').then(m => ({ default: m.CrmStaffPage })));
const CrmAuditLogsPage = lazy(() => import('./crm/pages/CrmAuditLogsPage').then(m => ({ default: m.CrmAuditLogsPage })));

const ENABLE_EMBEDDED_CRM =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  String(import.meta.env.VITE_ENABLE_EMBEDDED_CRM).toLowerCase() === 'true';

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

export function App() {
  const location = useLocation();
  const isCrmPage = ENABLE_EMBEDDED_CRM && location.pathname.startsWith('/crm');
  const isToolsPage = location.pathname.startsWith('/tools');
  const isDocsPage = location.pathname.startsWith('/docs') || location.pathname.startsWith('/doc');
  const isCheckoutPage = location.pathname.startsWith('/checkout');

  return (
    <DownloadModalProvider>
      <CrmAuthProvider>
        <CrmToastProvider>
          {isCrmPage && <CrmToaster />}
          <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
          {!isCrmPage && <Navbar />}

          <div className={`flex-1 flex flex-col ${isToolsPage || isDocsPage || isCrmPage ? '' : 'pt-16'}`}>
            <ErrorBoundary>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* Embedded CRM Routes (disabled by default on public marketing builds; use dedicated CRM origin) */}
                {ENABLE_EMBEDDED_CRM && (
                  <>
                    <Route path="/crm/login" element={<CrmLoginPage />} />
                    <Route
                      path="/crm"
                      element={
                        <CrmProtectedRoute>
                          <CrmLayout />
                        </CrmProtectedRoute>
                      }
                    >
                      <Route index element={<CrmDashboardPage />} />
                      <Route
                        path="customers"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager', 'sales_executive', 'support_executive', 'billing_accountant']}>
                            <CrmCustomersPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="customers/:id"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager', 'sales_executive', 'support_executive', 'billing_accountant']}>
                            <CrmCustomerDetailPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="discounts"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager', 'sales_executive', 'billing_accountant']}>
                            <CrmDiscountsPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="approvals"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager', 'sales_executive']}>
                            <CrmApprovalsPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="coupons"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager', 'sales_executive', 'digital_marketer', 'billing_accountant']}>
                            <CrmCouponsPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="tickets"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager', 'support_executive']}>
                            <CrmTicketsPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="tickets/:id"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager', 'support_executive']}>
                            <CrmTicketDetailPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="bugs"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager', 'support_executive']}>
                            <CrmBugsPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="contacts"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager', 'support_executive', 'sales_executive', 'digital_marketer']}>
                            <CrmContactsPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="broadcasts"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager', 'digital_marketer']}>
                            <CrmBroadcastsPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="plans"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager']}>
                            <CrmPlansPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="staff"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager']}>
                            <CrmStaffPage />
                          </CrmProtectedRoute>
                        }
                      />
                      <Route
                        path="audit-logs"
                        element={
                          <CrmProtectedRoute requiredRoles={['admin', 'manager']}>
                            <CrmAuditLogsPage />
                          </CrmProtectedRoute>
                        }
                      />
                    </Route>
                  </>
                )}

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

          {!isToolsPage && !isDocsPage && !isCheckoutPage && !isCrmPage && <Footer />}

          {/* Global Multi-Platform Download Modal */}
          <DownloadModal />
        </div>
        </CrmToastProvider>
      </CrmAuthProvider>
    </DownloadModalProvider>
  );
}

export default App;
