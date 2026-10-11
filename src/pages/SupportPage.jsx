import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { MailIcon } from '../components/Icons';

export function SupportPage() {
  useEffect(() => {
    applySEO('support');
    window.scrollTo(0, 0);
  }, []);

  const solutions = [
    {
      q: '1. How do I back up or transfer my invoice database?',
      a: 'In Invio, open Settings > Database and click "Export SQLite Backup". Save the file to an external USB drive or backup folder. To restore on a new machine, install Invio, open Settings > Database, and select "Import Backup". Your complete billing history is restored instantly.'
    },
    {
      q: '2. My ESC/POS thermal printer cuts text or prints misaligned lines.',
      a: 'Ensure you have configured the matching paper roll width in Settings > Printing (58mm vs 80mm). Verify that your printer character encoding is set to standard UTF-8 or CP437. In Windows, test using generic / text-only printer mode if proprietary drivers cause skew.'
    },
    {
      q: '3. Google OAuth email dispatch shows an authorization error.',
      a: 'Ensure your Google account allows desktop app authorization. Alternatively, if using standard SMTP instead of OAuth, generate a dedicated 16-character Google App Password in your Google Account security settings and enter it into Invio Settings > Email.'
    },
    {
      q: '4. Can I run Invio across two computers in the same shop?',
      a: 'Yes. While Invio defaults to local SQLite for single-counter setups, it includes an optional external PostgreSQL database mode under Settings > Advanced Database. You can host PostgreSQL on your main counter PC and connect multiple billing terminals over your local shop Wi-Fi / LAN.'
    }
  ];

  return (
    <PageContainer
      badge="Support & Help Center"
      title="Invio Support &amp; Assistance"
      subtitle="Need assistance installing Invio, connecting hardware, or managing your local database? We are here to help."
    >
      {/* Contact Support Box */}
      <div className="my-6 p-5 rounded-2xl border border-slate-200/90 bg-white">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-50 text-[#7C3AED] shrink-0 mt-0.5">
            <MailIcon className="size-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-900 mb-1">Direct Technical Support</h2>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Email our engineering support team directly for setup assistance, bug reports, and data migration guidance:
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:support@timrio.com"
                className="h-9 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-full flex items-center justify-center transition-colors shadow-sm"
              >
                support@timrio.com
              </a>
              <span className="text-xs text-slate-500">Response time: Within 24 business hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Self-Help Guides */}
      <section className="my-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4">
          Self-Help &amp; Quick Troubleshooting
        </h2>
        <div className="space-y-3">
          {solutions.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-white">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">{item.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documentation Links */}
      <div className="my-8 p-5 rounded-2xl border border-slate-200/90 bg-white">
        <h2 className="text-sm font-bold text-slate-900 mb-3">Helpful Documentation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <Link to="/docs/installation" className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium">
            → Installation &amp; Setup Walkthrough
          </Link>
          <Link to="/system-requirements" className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium">
            → System Requirements &amp; Hardware Compatibility
          </Link>
          <Link to="/faq" className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium">
            → Frequently Asked Questions
          </Link>
          <Link to="/security" className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium">
            → Security Architecture &amp; Data Privacy
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

export default SupportPage;
