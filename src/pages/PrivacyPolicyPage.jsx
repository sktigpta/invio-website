import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { A4DocLayout } from '../components/A4DocLayout';

export function PrivacyPolicyPage() {
  useEffect(() => {
    applySEO('privacy');
    window.scrollTo(0, 0);
  }, []);

  return (
    <A4DocLayout
      title="Privacy Policy"
      subtitle="Invio Desktop Software & Website • Published by Timrio • Last updated: October 2026"
    >
      <p>
        Timrio develops Invio with a strict privacy-first architecture. This Privacy Policy explains how information is handled when you visit our website (invio.timrio.com) or download and use the Invio desktop application for Windows, macOS, and Linux.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        1. Local Data Storage &amp; Zero Cloud Synchronization
      </h2>
      <p>
        All business records—including invoices, quotations, customer directory entries, contact numbers, addresses, GSTIN tax identifiers, product catalogues, inventory levels, and financial ledgers—are stored strictly on your local computer within an embedded SQLite database.
      </p>
      <p>
        Timrio does not operate a cloud synchronization service for your business records. We do not transmit, copy, inspect, aggregate, or monetize your customer lists, sales revenue, or financial documents. You retain full ownership, exclusive physical custody, and complete control of your data.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        2. Integrations &amp; Credential Storage
      </h2>
      <p>
        <strong>Email Integration (Google OAuth / SMTP):</strong> If you choose to enable email invoice delivery, you can connect your own Gmail or custom SMTP server. When using Google OAuth, Invio requests only the permissions necessary to send invoice receipts on your behalf. All authentication tokens and SMTP credentials are encrypted and stored in your operating system&rsquo;s secure credential store (via Electron safeStorage / OS keychain) on your device. Credentials are never transmitted to Timrio servers.
      </p>
      <p>
        <strong>WhatsApp Sharing:</strong> When sharing an invoice via WhatsApp, Invio generates a local universal web link (wa.me) in your default browser. No customer contact details or invoice contents are sent to our servers.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        3. Website Information Handling
      </h2>
      <p>
        When visiting invio.timrio.com, standard non-identifying HTTP access logs (such as IP address, browser user-agent, operating system, and requested page URL) are logged ephemerally by our hosting infrastructure for security, DDoS defense, and rate-limiting purposes. We do not use third-party cross-site advertising trackers or retargeting pixels.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        4. Commercial License Payments
      </h2>
      <p>
        When purchasing an optional Invio Plus commercial license, payments are processed directly by certified, PCI-DSS compliant payment gateways (such as Razorpay). Timrio does not collect, process, or store your credit card numbers, debit card numbers, UPI PINs, or net banking passwords.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        5. Desktop Software Update Verification
      </h2>
      <p>
        The desktop application periodically checks our public release feed (api.invio.timrio.com/api/download) to determine whether a newer version is available. This request contains only the current application version number and your operating system platform. It transmits no business data, invoice summaries, or personal identifiers.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        6. Data Retention, Backups, and User Responsibility
      </h2>
      <p>
        Because your database resides entirely on your device, Timrio cannot access, retrieve, or restore your records in the event of hardware failure, hard drive loss, or operating system formatting. You are solely responsible for creating regular backups using Invio&rsquo;s built-in local export feature and for maintaining statutory business record retention as required by law.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        7. Indian DPDP Act Compliance
      </h2>
      <p>
        Timrio operates from India and respects applicable Indian data protection frameworks, including the Digital Personal Data Protection (DPDP) Act. Because all customer information is held and processed on your own hardware, you act as the Data Fiduciary regarding your clients&rsquo; personal data.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        8. Contact Information
      </h2>
      <p>
        For any questions, requests, or notices regarding this Privacy Policy, please contact our support team at:
      </p>
      <p className="font-mono">
        Email: <a href="mailto:support@timrio.com" className="underline text-black font-semibold">support@timrio.com</a>
      </p>
    </A4DocLayout>
  );
}

export default PrivacyPolicyPage;
