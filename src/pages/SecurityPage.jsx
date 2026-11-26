import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { A4DocLayout } from '../components/A4DocLayout';

export function SecurityPage() {
  useEffect(() => {
    applySEO('security');
    window.scrollTo(0, 0);
  }, []);

  return (
    <A4DocLayout
      title="How Invio Keeps Your Shop Data Safe"
      subtitle="Invio Desktop App • Published by Timrio • Last updated: October 2026"
    >
      <p>
        Keeping your shop bills, customer records, and passwords safe is our top priority. Here is a simple look at how Invio protects your data on your computer.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        1. Safe &amp; Separated App Design
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Protected Screen Area:</strong> The screens you click on inside Invio are kept separate from your computer&rsquo;s system files so nothing can accidentally change your computer settings.</li>
        <li><strong>Checked Add-ons Only:</strong> Official Invio add-ons are checked by Timrio and run in their own safe space, so they cannot touch your other computer files.</li>
        <li><strong>Strict Input Checks:</strong> All numbers, emails, and file names entered into Invio are checked before saving.</li>
      </ul>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        2. Locked Passwords &amp; Email Safety
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Computer Lockbox Protection:</strong> Your email passwords and Gmail login tokens are never saved as plain text. Invio locks them using your computer&rsquo;s built-in security lockbox (Windows Credential Manager, Mac Keychain, or Linux Keyring).</li>
        <li><strong>Safe Login Checks:</strong> If your internet drops while connecting Gmail, Invio safely stops the login instead of leaving anything half-open.</li>
      </ul>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        3. Your Data Stays on Your Computer
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Saved Locally:</strong> All your bills, product lists, stock counts, and customer records are saved right on your own computer.</li>
        <li><strong>Zero Cloud Spying:</strong> Timrio does not copy, upload, or read your shop bills. Your business records never travel to our servers.</li>
        <li><strong>Encrypted Connections:</strong> Whenever Invio checks for a new app update, it uses a secure HTTPS connection.</li>
      </ul>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        4. Responsible Vulnerability Disclosure Program
      </h2>
      <p>
        We appreciate the efforts of security researchers in identifying potential vulnerabilities in the Invio desktop software or web services.
      </p>
      <p>
        If you believe you have discovered a security vulnerability, please submit a detailed report to our security team:
      </p>
      <p className="font-mono">
        Email: <a href="mailto:support@timrio.com" className="underline text-black font-semibold">support@timrio.com</a>
      </p>
      <p>
        Please include the following details in your report:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Target component and software version (e.g. Invio Desktop v1.1.6 on Windows 11).</li>
        <li>Detailed description of the vulnerability and potential impact.</li>
        <li>Step-by-step reproduction instructions or a minimal proof-of-concept.</li>
      </ul>
      <p>
        We commit to acknowledging your submission within 24 business hours and will work diligently to validate and patch verified issues. We ask that researchers act in good faith by maintaining confidentiality until an official fix is deployed. We do not take legal action against security researchers who adhere to responsible disclosure principles.
      </p>
    </A4DocLayout>
  );
}

export default SecurityPage;
