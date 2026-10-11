import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { A4DocLayout } from '../components/A4DocLayout';

export function CookiePolicyPage() {
  useEffect(() => {
    applySEO('cookie-policy');
    window.scrollTo(0, 0);
  }, []);

  return (
    <A4DocLayout
      title="Cookie Policy"
      subtitle="Invio Website & Web Services • Published by Timrio • Last updated: October 2026"
    >
      <p>
        This Cookie Policy explains how Timrio uses cookies, local storage, and related browser technologies on the Invio website located at invio.timrio.com.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        1. Understanding Cookies &amp; Local Storage
      </h2>
      <p>
        Cookies are small text files transferred to your computer&rsquo;s browser by websites you visit. Browser local storage (localStorage) allows web applications to retain lightweight key-value preferences locally within your browser without sending them to web servers on each network request.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        2. Technologies Utilized on This Website
      </h2>
      <p>
        We employ a minimal, privacy-conscious approach to web storage:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Strictly Necessary &amp; Security Cookies:</strong> Deployed ephemerally by our content delivery network and edge hosting infrastructure (such as Vercel) to protect against distributed denial-of-service (DDoS) attacks and ensure stable, secure HTTP transmission.</li>
        <li><strong>Functional Browser Local Storage:</strong> Used strictly on your client browser to store non-identifying interface preferences, such as retaining your selected operating system download tab and preserving entered calculation parameters in our free online tax calculators.</li>
        <li><strong>Zero Cross-Site Advertising Trackers:</strong> We do not deploy third-party advertising cookies, behavioural profiling trackers, or retargeting pixels on this website.</li>
      </ul>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        3. Local Storage in the Desktop Application
      </h2>
      <p>
        The downloadable Invio desktop software executes as an isolated Electron application. The desktop application does not load third-party advertising cookies or cross-site tracking scripts. User settings, invoice records, and preferences are saved exclusively in local files within your operating system user application directory.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        4. Managing &amp; Disabling Cookies
      </h2>
      <p>
        You can configure your web browser to block, limit, or delete cookies at any time via your browser settings. If you disable cookies or clear local storage, the website will remain fully functional, though temporary calculation values in free web tools may reset upon refreshing the page.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        5. Contact
      </h2>
      <p>
        If you have any questions or concerns regarding our cookie and local storage policies, please contact:
      </p>
      <p className="font-mono">
        Email: <a href="mailto:support@timrio.com" className="underline text-black font-semibold">support@timrio.com</a>
      </p>
    </A4DocLayout>
  );
}

export default CookiePolicyPage;
