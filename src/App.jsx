import { useState, useEffect } from 'react';
import { detectDeviceOS, PLATFORM_DOWNLOADS } from './utils/osDetector';
import { applySEO } from './utils/seoHelper';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureGrid } from './components/FeatureGrid';
import { SupportSection } from './components/SupportSection';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { NotFound } from './components/NotFound';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { DocsPage } from './components/DocsPage';
import { VersionPage } from './components/VersionPage';
import { ProductPage } from './components/ProductPage';
import { FinanceToolsDashboard } from './components/FinanceToolsDashboard';
import { CalculatorIcon } from './components/tools/ToolIcons';
import { ALL_TOOLS } from './components/tools/toolsData';

export function App() {
  const [activeSection, setActiveSection] = useState('product');
  const [docsTab, setDocsTab] = useState('features');
  const [activeToolId, setActiveToolId] = useState('gst-calculator');
  const [activeOS, setActiveOS] = useState(() => detectDeviceOS());
  const [downloadModalPlatform, setDownloadModalPlatform] = useState(null);

  useEffect(() => {
    const scrollToTarget = (id) => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    };

    const handleHash = () => {
      const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      const fullHash = window.location.hash.replace('#', '').toLowerCase();

      // Check explicit 404 routes
      if (pathname === '/404' || fullHash === '404' || fullHash === 'not-found') {
        setActiveSection('404');
        applySEO('404');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Check standalone legal pages (pathname or hash)
      if (pathname === '/privacy' || pathname === '/privacy-policy' || pathname === '/privacy.html' || fullHash === 'privacy') {
        setActiveSection('privacy');
        applySEO('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (pathname === '/terms' || pathname === '/terms-of-service' || pathname === '/terms.html' || fullHash === 'terms') {
        setActiveSection('terms');
        applySEO('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Standalone dedicated product landing page (for direct visits and Google Merchant Center)
      if (
        pathname === '/product' ||
        pathname === '/product/' ||
        pathname === '/product-overview' ||
        fullHash === 'product-overview' ||
        fullHash === 'product-details'
      ) {
        setActiveSection('product-page');
        applySEO('product');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Standalone subscription / billing page
      if (pathname === '/subscription' || pathname === '/pricing' || fullHash === 'subscription' || fullHash === 'pricing') {
        setActiveSection('subscription');
        applySEO('subscription');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Standalone version / release notes / changelog page
      if (
        pathname === '/version' ||
        pathname === '/versions' ||
        pathname === '/changelog' ||
        pathname === '/releases' ||
        fullHash === 'version' ||
        fullHash === 'changelog' ||
        fullHash === 'releases'
      ) {
        setActiveSection('version');
        applySEO('version');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Documentation & User Manual pages
      if (
        pathname === '/docs' ||
        pathname === '/docs/features' ||
        pathname === '/docs/settings' ||
        pathname === '/docs/features-and-settings' ||
        fullHash === 'docs' ||
        fullHash === 'docs/features' ||
        fullHash === 'docs/settings'
      ) {
        setActiveSection('docs');
        if (pathname === '/docs/settings' || fullHash === 'docs/settings') {
          setDocsTab('settings');
          applySEO('docs-settings');
        } else if (pathname === '/docs/features' || fullHash === 'docs/features') {
          setDocsTab('features');
          applySEO('docs-features');
        } else {
          setDocsTab('features');
          applySEO('docs');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Check tools path routing
      if (pathname.startsWith('/tools') || pathname === '/gst-calculator-online' || pathname === '/gst-calculator') {
        setActiveSection('tools');
        if (pathname === '/gst-calculator-online' || pathname === '/gst-calculator') {
          setActiveToolId('gst-calculator');
          applySEO('gst-calculator');
        } else {
          const allowed = ['gst-calculator','income-tax-india','vat-uk','vat-uae','payslip-generator','paycheck-calc','hra-exemption','gratuity-calc','project-estimate'];
          const pathTool = pathname.startsWith('/tools/') ? pathname.slice(7).split('/')[0] : '';
          if (pathTool && allowed.includes(pathTool)) {
            setActiveToolId(pathTool);
            applySEO(pathTool);
          } else if (pathTool) {
            setActiveSection('404'); applySEO('404'); return;
          } else {
            applySEO('tools');
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Reject any unrecognised pathnames (not root or known static assets)
      if (
        pathname !== '/' &&
        pathname !== '/index.html' &&
        !pathname.startsWith('/favicons/') &&
        !pathname.startsWith('/screenshots/') &&
        !pathname.startsWith('/feeds/') &&
        pathname !== '/robots.txt' &&
        pathname !== '/sitemap.xml'
      ) {
        setActiveSection('404');
        applySEO('404');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Hash routing for landing page sections
      if (fullHash === 'features') {
        setActiveSection('features');
        applySEO('features');
        setTimeout(() => scrollToTarget('features'), 50);
      } else if (fullHash.startsWith('tools/') || fullHash === 'tools' || fullHash === 'gst-calculator') {
        setActiveSection('tools');
        if (fullHash.startsWith('tools/')) {
          const toolSlug = fullHash.slice('tools/'.length);
          if (!ALL_TOOLS.some((tool) => tool.id === toolSlug)) {
            setActiveSection('404');
            applySEO('404');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          setActiveToolId(toolSlug);
          applySEO(toolSlug);
        } else if (fullHash === 'gst-calculator') {
          setActiveToolId('gst-calculator');
          applySEO('gst-calculator');
        } else {
          applySEO('tools');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (fullHash === 'comparison') {
        setActiveSection('comparison');
        applySEO('comparison');
        setTimeout(() => scrollToTarget('comparison'), 50);
      } else if (fullHash === 'faq') {
        setActiveSection('faq');
        applySEO('faq');
        setTimeout(() => scrollToTarget('faq'), 50);
      } else if (fullHash === 'download' || fullHash === 'downloads') {
        setActiveSection('product');
        applySEO('home');
        const detected = detectDeviceOS();
        setDownloadModalPlatform(detected);
      } else if (fullHash === 'product' || fullHash === '' || fullHash === 'home') {
        setActiveSection('product');
        applySEO('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Unknown hash — treat as 404
        setActiveSection('404');
        applySEO('404');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);

    if (sectionId === 'product-page' || sectionId === 'product-details' || sectionId === 'product-overview') {
      setActiveSection('product-page');
      window.history.pushState(null, '', '/product');
      applySEO('product');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'product' || sectionId === 'product-home' || sectionId === 'home') {
      setActiveSection('product');
      window.history.pushState(null, '', '/');
      applySEO('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'privacy') {
      window.history.pushState(null, '', '/privacy');
      applySEO('privacy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'terms') {
      window.history.pushState(null, '', '/terms');
      applySEO('terms');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'subscription') {
      window.history.pushState(null, '', '/subscription');
      applySEO('subscription');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'version' || sectionId === 'changelog') {
      setActiveSection('version');
      window.history.pushState(null, '', '/version');
      applySEO('version');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'docs' || sectionId === 'docs-features') {
      setActiveSection('docs');
      setDocsTab('features');
      window.history.pushState(null, '', '/docs/features');
      applySEO('docs-features');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'docs-settings') {
      setActiveSection('docs');
      setDocsTab('settings');
      window.history.pushState(null, '', '/docs/settings');
      applySEO('docs-settings');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'tools') {
      window.history.pushState(null, '', '/tools');
      applySEO('tools');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === '404') {
      window.history.pushState(null, '', '/404');
      applySEO('404');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'features' || sectionId === 'faq') {
      setActiveSection('product');
      window.history.pushState(null, '', `/#${sectionId}`);
      applySEO(sectionId);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }, 60);
    } else {
      setActiveSection('product');
      window.history.pushState(null, '', `/#${sectionId}`);
      applySEO(sectionId);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }, 60);
    }
  };

  const handleOpenDownloadModal = (platformToDownload) => {
    const target = platformToDownload || activeOS;
    if (target?.isMobileFallback) {
      if (activeSection !== 'product') {
        setActiveSection('product');
        window.history.pushState(null, '', '/');
        applySEO('home');
      }
      setTimeout(() => {
        document.getElementById('platform-selector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
      return;
    }
    setDownloadModalPlatform(target);
  };

  const handleSelectOS = (osId) => {
    if (PLATFORM_DOWNLOADS[osId]) {
      setActiveOS(PLATFORM_DOWNLOADS[osId]);
    }
  };

  return (
    <div className="min-h-screen w-full m-0 p-0 flex flex-col justify-between bg-white text-[#0f172a] relative">

      {/* Sticky Edge-to-Edge Navbar */}
      <Navbar
        currentPage={activeSection}
        onNavigate={handleNavigate}
        activeOS={activeOS}
        onDirectDownload={handleOpenDownloadModal}
      />

      {/* Main Content */}
      <main className="w-full flex-1">
        {activeSection === '404' ? (
          /* 404 Page Not Found */
          <NotFound onNavigate={handleNavigate} />
        ) : activeSection === 'privacy' ? (
          /* Dedicated Standalone Privacy Policy Page */
          <PrivacyPage onNavigate={handleNavigate} />
        ) : activeSection === 'product-page' ? (
          /* Dedicated Standalone Product Page (for Google Merchant Center and direct visitors) */
          <ProductPage
            onNavigate={handleNavigate}
            onDirectDownload={handleOpenDownloadModal}
            activeOS={activeOS}
            onSelectOS={handleSelectOS}
          />
        ) : activeSection === 'terms' ? (
          /* Dedicated Standalone Terms of Service Page */
          <TermsPage onNavigate={handleNavigate} />
        ) : activeSection === 'subscription' ? (
          /* Dedicated Subscription / Billing Page */
          <SubscriptionPage
            onNavigate={handleNavigate}
            onDirectDownload={() => handleOpenDownloadModal()}
          />
        ) : activeSection === 'version' ? (
          /* Dedicated Version & Release Notes Page */
          <VersionPage
            onNavigate={handleNavigate}
            onDirectDownload={handleOpenDownloadModal}
            activeOS={activeOS}
          />
        ) : activeSection === 'docs' ? (
          /* Dedicated Features & Settings Documentation Manual */
          <DocsPage
            initialTab={docsTab}
            onNavigate={handleNavigate}
            onDirectDownload={() => handleOpenDownloadModal()}
          />
        ) : activeSection === 'tools' ? (
          /* Dedicated Finance, Tax & Payroll Tools Hub */
          <FinanceToolsDashboard
            initialToolId={activeToolId}
            onDirectDownload={() => handleOpenDownloadModal()}
            onNavigate={handleNavigate}
          />
        ) : (
          /* Landing Page */
          <>
            {/* 1. Hero Overview */}
            <Hero
              activeOS={activeOS}
              onSelectOS={handleSelectOS}
              onDirectDownload={handleOpenDownloadModal}
            />

            {/* 2. Core Capabilities Bento Grid */}
            <FeatureGrid />

            {/* 3. Free Tools Teaser Banner */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50/50 border border-purple-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="size-11 rounded-xl bg-[#8646F4] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CalculatorIcon className="size-5 text-white" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm sm:text-base font-bold font-heading">
                      Free Finance, Tax &amp; Payroll Suite
                    </strong>
                    <span className="text-xs text-slate-600">
                      India GST, Income Tax (FY 25–26), Payslip Generator, UK &amp; UAE VAT, HRA, and Gratuity tools.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigate('tools')}
                  className="py-3 px-6 bg-[#8646F4] hover:bg-[#7234de] text-white font-bold text-xs sm:text-sm rounded-xl transition-all whitespace-nowrap shadow-sm cursor-pointer"
                >
                  Explore Free Tools Suite →
                </button>
              </div>
            </section>

            {/* 4. Frequently Asked Questions */}
            <SupportSection />
          </>
        )}
      </main>

      {/* Footer (Rendered on Homepage and Content views, not in the fixed full-height app dashboard) */}
      {activeSection !== 'tools' && (
        <Footer
          onNavigate={handleNavigate}
          onDirectDownload={() => handleOpenDownloadModal()}
        />
      )}

      {/* Direct Download & Install Modal */}
      {downloadModalPlatform && (
        <DownloadModal
          platform={downloadModalPlatform}
          onClose={() => setDownloadModalPlatform(null)}
        />
      )}
    </div>
  );
}

export default App;
