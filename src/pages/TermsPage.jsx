import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { A4DocLayout } from '../components/A4DocLayout';

export function TermsPage() {
  useEffect(() => {
    applySEO('terms');
    window.scrollTo(0, 0);
  }, []);

  return (
    <A4DocLayout
      title="Terms of Use"
      subtitle="Invio Software & Website • Published by Timrio • Last updated: October 2026"
    >
      <p>
        These Terms of Use (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo;) and Timrio (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) regarding your access to and use of the Invio desktop application, associated services, and the website at invio.timrio.com.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        1. Acceptance of Terms
      </h2>
      <p>
        By downloading, installing, launching, or using the Invio desktop application, or by accessing our website, you confirm that you have read, understood, and agreed to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must immediately uninstall and discontinue all use of the software.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        2. Permitted Use &amp; License Grant
      </h2>
      <p>
        Timrio grants you a personal, non-exclusive, revocable, non-transferable license to install and run the Invio desktop application on compatible computing hardware running Windows, macOS, or Linux, strictly for your lawful internal business, retail, or personal invoicing purposes.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        3. Account Registration &amp; Security
      </h2>
      <p>
        When registering for an Invio account or commercial subscription, you must provide valid business details and complete email OTP verification. You are responsible for safeguarding your credentials. Timrio will never request your password or email provider secrets.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        4. Subscriptions, Payments &amp; Cancellation
      </h2>
      <p>
        Invio offers a free core offline billing tier and paid commercial tiers (Plus and Pro) billed monthly or yearly via authorized payment gateways (Razorpay). 
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Free Trial &amp; Evaluation:</strong> Because the core desktop application is free to download and evaluate locally without feature expiration, all digital license subscription purchases are final and non-refundable once unlocked.</li>
        <li><strong>Cancellation:</strong> You may cancel recurring commercial subscriptions at any time from your account settings without penalties; full license features remain active through the prepaid billing period.</li>
      </ul>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        5. Use Restrictions
      </h2>
      <p>You agree that you will not, directly or indirectly:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Decompile, reverse engineer, disassemble, or attempt to derive the underlying source code of the binary distributions, except to the extent permitted by applicable law.</li>
        <li>Use the software to produce fraudulent, deceptive, or forged fiscal documents, or to evade tax regulations.</li>
        <li>Distribute, rent, lease, sub-license, or redistribute unauthorized modified builds of the installer binaries.</li>
        <li>Interfere with or bypass digital signatures, license validation mechanisms, or security controls.</li>
      </ul>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        6. Tax &amp; Legal Compliance Disclaimer
      </h2>
      <p>
        Invio is a software utility designed to assist with document formatting, arithmetic calculations, and receipt generation. Invio is not an automated chartered accountant, legal counsel, or fiscal tax advisory service.
      </p>
      <p>
        You are solely responsible for verifying the accuracy of tax rates, GSTIN state prefixes, HSN and SAC codes, cess calculations, and compliance with statutory invoicing guidelines, tax filing requirements, and mandatory audit trail regulations applicable in your jurisdiction.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        7. Data Ownership &amp; Local Custody
      </h2>
      <p>
        You retain full ownership, title, and intellectual property rights in and to all data, customer profiles, product prices, and transaction records stored within your local SQLite database. Timrio claims no ownership or proprietary interest in your business data.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        8. Disclaimer of Warranties
      </h2>
      <p>
        The software and website are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express, implied, statutory, or otherwise. Timrio expressly disclaims all implied warranties of merchantability, fitness for a particular purpose, non-infringement, and continuous uninterrupted operation.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        9. Limitation of Liability
      </h2>
      <p>
        To the maximum extent permitted by applicable law, in no event shall Timrio, its directors, employees, or affiliates be liable for any indirect, incidental, consequential, punitive, or special damages, including loss of profits, loss of business data, hardware disruption, or statutory penalties, arising out of or related to your use of or inability to use the software.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        10. Governing Law &amp; Dispute Resolution
      </h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts in India.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        11. Inquiries &amp; Notices
      </h2>
      <p>
        For any inquiries or official notices regarding these Terms, please contact:
      </p>
      <p className="font-mono">
        Email: <a href="mailto:support@timrio.com" className="underline text-black font-semibold">support@timrio.com</a>
      </p>
    </A4DocLayout>
  );
}

export default TermsPage;
