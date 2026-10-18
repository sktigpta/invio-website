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
      title="Security Architecture & Vulnerability Disclosure"
      subtitle="Invio Desktop Application & Infrastructure • Published by Timrio • Last updated: October 2026"
    >
      <p>
        Data security and process isolation are core design requirements of the Invio desktop application. This document details our client architecture, credential handling, local database protection, and our responsible vulnerability disclosure process.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        1. Desktop Architecture &amp; Process Isolation
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Sandboxed Interface Isolation:</strong> The desktop user interface runs within a strict isolated execution sandbox, ensuring complete separation between interface rendering and native operating system primitives.</li>
        <li><strong>Restricted System Access:</strong> Direct low-level system execution is restricted; untrusted interface scripts cannot execute arbitrary native system commands.</li>
        <li><strong>Narrow &amp; Validated IPC:</strong> Communication between the renderer interface and background workers is strictly restricted to typed, schema-validated internal communication channels with rigorous input sanitization.</li>
      </ul>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        2. Credential Encryption &amp; Key Storage
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Native OS Keychain Encryption:</strong> User email secrets (such as OAuth tokens and custom SMTP passwords) are never stored in plain text or browser storage. All sensitive credentials are cryptographically protected using your operating system&rsquo;s native secure key store (such as Windows DPAPI, macOS Keychain, or Linux Secret Service).</li>
        <li><strong>Fail-Closed Security:</strong> Authentication handoffs are configured to fail closed; network disruptions or token errors never bypass authentication gates.</li>
      </ul>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        3. Local Database &amp; Zero Network Telemetry
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Local Data Custody:</strong> Invoices, pricing catalogues, inventory tallies, and customer identities are stored securely inside a local database file in your user application data path on your device.</li>
        <li><strong>No Cloud Ledger Transmission:</strong> Timrio operates no background sync daemon that collects or reads your financial records. Your business documents never transit our servers.</li>
        <li><strong>Transport Security:</strong> All external communication (such as checking the version update feed) enforces TLS encryption over HTTPS.</li>
      </ul>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        4. Responsible Vulnerability Disclosure Program
      </h2>
      <p>
        We appreciate the efforts of security researchers in identifying potential vulnerabilities in the Invio desktop software, backend proxies, or web infrastructure.
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
        <li>Target component and software version (e.g. Invio Desktop v1.0.2 on Windows 11).</li>
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
