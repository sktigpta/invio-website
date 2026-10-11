import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCta } from '../components/DownloadCta';

export function BlogPage() {
  useEffect(() => {
    applySEO('blog');
    window.scrollTo(0, 0);
  }, []);

  const articles = [
    {
      title: 'Offline vs Cloud Invoicing: Why Small Businesses Prefer Local SQLite',
      date: 'October 2026',
      readTime: '5 min read',
      summary:
        'Cloud invoicing software introduces monthly subscriptions and crashes when internet connections fail. Discover how offline-first desktop billing with embedded SQLite ensures zero latency, complete data sovereignty, and reliable counter operations.',
      tag: 'Architecture'
    },
    {
      title: 'How to Set Up 58mm & 80mm Thermal Receipt Printers for Retail Billing',
      date: 'September 2026',
      readTime: '6 min read',
      summary:
        'A comprehensive guide to ESC/POS thermal printing. Learn the differences between 2-inch (58mm) and 3-inch (80mm) paper widths, baud rates, ESC/POS escape commands, and how to print paper slips with dynamic UPI payment QR codes.',
      tag: 'Hardware POS'
    },
    {
      title: 'GST Slabs & Automatic Tax Splits: CGST, SGST, IGST Explained',
      date: 'August 2026',
      readTime: '4 min read',
      summary:
        'Understanding how GSTIN state codes determine intra-state (CGST + SGST 50/50 split) vs inter-state (IGST 100%) tax liabilities, and how automated billing engines prevent expensive filing errors.',
      tag: 'GST & Compliance'
    },
    {
      title: 'Dynamic UPI QR Codes on Printed Invoices: Accelerating Checkout Speed',
      date: 'July 2026',
      readTime: '4 min read',
      summary:
        'How embedding the exact payable invoice sum into paper-printed UPI QR codes eliminates manual payment amount entry, minimizes customer queues, and speeds up retail counter throughput.',
      tag: 'Payments'
    }
  ];

  return (
    <PageContainer
      badge="Guides & Insights"
      title="Invio Invoicing Blog &amp; Guides"
      subtitle="Practical articles, billing best practices, hardware setup guides, and tax compliance tutorials from the Invio team at Timrio."
    >
      <div className="space-y-4 my-8">
        {articles.map((art, idx) => (
          <article key={idx} className="p-5 rounded-squircle border border-slate-200/90 bg-white hover:border-purple-200 transition-colors">
            <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-2">
              <span className="font-semibold text-[#7C3AED] bg-purple-50 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                {art.tag}
              </span>
              <span>•</span>
              <span>{art.date}</span>
              <span>•</span>
              <span>{art.readTime}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              {art.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              {art.summary}
            </p>
            <span className="text-xs font-semibold text-[#7C3AED] inline-flex items-center gap-1">
              Read complete guide →
            </span>
          </article>
        ))}
      </div>

      <DownloadCta
        title="Experience Fast Desktop Invoicing"
        subtitle="Download Invio v1.0.2 for Windows and macOS. Free forever for core billing."
      />
    </PageContainer>
  );
}

export default BlogPage;
