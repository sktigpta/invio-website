import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './App';
import { buildPageSEOData } from './utils/seoHelper';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DownloadPage } from './pages/DownloadPage';
import { DocsPage } from './pages/DocsPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { EulaPage } from './pages/EulaPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { SecurityPage } from './pages/SecurityPage';
import { ContactPage } from './pages/ContactPage';
import { ReportBugPage } from './pages/ReportBugPage';
import { ToolsPage } from './pages/ToolsPage';
import { FreeInvoiceSoftwarePage } from './pages/FreeInvoiceSoftwarePage';
import { OfflineBillingSoftwarePage } from './pages/OfflineBillingSoftwarePage';
import { GstBillingSoftwarePage } from './pages/GstBillingSoftwarePage';
import { PosBillingSoftwarePage } from './pages/PosBillingSoftwarePage';
import { NotFoundPage } from './pages/NotFoundPage';

const SERVER_PAGES = {
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
};

export function renderRoute(url, seoKey) {
  const html = renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App pageComponents={SERVER_PAGES} />
      </StaticRouter>
    </React.StrictMode>
  );
  const seo = buildPageSEOData(seoKey);
  return { html, seo };
}
