import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { A4DocLayout } from '../components/A4DocLayout';

export function EulaPage() {
  useEffect(() => {
    applySEO('eula');
    window.scrollTo(0, 0);
  }, []);

  return (
    <A4DocLayout
      title="End User License Agreement (EULA)"
      subtitle="Invio Desktop Application • Published by Timrio • Last updated: October 2026"
    >
      <p>
        This End User License Agreement (&ldquo;Agreement&rdquo;) is a binding legal contract between you (&ldquo;Licensee&rdquo;) and Timrio (&ldquo;Licensor&rdquo;) governing your download, installation, and use of the Invio desktop application software (&ldquo;Software&rdquo;).
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        1. Scope &amp; Grant of License
      </h2>
      <p>
        Subject to your strict compliance with the terms of this Agreement, Timrio grants you a limited, non-exclusive, non-transferable, revocable license to install and execute the Software in executable object code format on compatible personal computers running supported versions of Windows, macOS, or Linux, solely for your internal business or personal use.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        2. License Editions
      </h2>
      <p>
        <strong>Core Free Edition:</strong> The core desktop invoicing edition is licensed free of charge for unlimited local invoice generation and customer record management on a standalone machine.
      </p>
      <p>
        <strong>Plus Commercial Edition:</strong> Advanced hardware features (such as secondary customer POS display monitors, specialised ESC/POS thermal formatting, and priority technical support) require an active commercial Plus license per store workstation.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        3. Restrictions on Use
      </h2>
      <p>You agree that you will not:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Decompile, reverse engineer, disassemble, decrypt, or attempt to derive the source code of the Software binaries, except where applicable law expressly permits.</li>
        <li>Sublicense, sell, rent, lease, or lend the Software to any third party.</li>
        <li>Modify, adapt, or create derivative works based upon the Software.</li>
        <li>Remove, obscure, or alter any copyright notices, trademark indicators, or proprietary markings embedded in the Software.</li>
        <li>Bypass, disable, or circumvent any technological protection measures, code signatures, or license validation systems.</li>
      </ul>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        4. Intellectual Property &amp; Ownership
      </h2>
      <p>
        The Software is licensed, not sold. All rights, title, and interest in and to the Software—including its architecture, code, algorithms, visual interface design, icons, and documentation—remain the exclusive intellectual property of Timrio.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        5. Local Data Sovereignty
      </h2>
      <p>
        You retain absolute title and ownership over all customer information, product catalogues, tax numbers, and invoices stored in your local SQLite database file. The Software processes your records locally and does not claim ownership or access rights over your business data.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        6. Termination
      </h2>
      <p>
        This Agreement is effective until terminated. You may terminate it at any time by completely uninstalling and deleting all copies of the Software from your hardware. This Agreement terminates automatically if you fail to comply with any of its terms. Upon termination, you must cease all use of the Software.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        7. Disclaimer of Warranties
      </h2>
      <p>
        The Software is provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo;, without warranty of any kind. To the maximum extent permitted by applicable law, Timrio disclaims all warranties, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        8. Limitation of Liability
      </h2>
      <p>
        In no event shall Timrio be liable for any indirect, incidental, punitive, or consequential damages (including loss of data, loss of business revenue, or hardware disruption) arising out of the use or inability to use the Software. Timrio&rsquo;s total cumulative liability under this Agreement shall not exceed the amount actually paid by you for the Software license during the twelve months preceding the claim.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        9. Contact
      </h2>
      <p>
        For questions or notices regarding this License Agreement, please contact:
      </p>
      <p className="font-mono">
        Email: <a href="mailto:support@timrio.com" className="underline text-black font-semibold">support@timrio.com</a>
      </p>
    </A4DocLayout>
  );
}

export default EulaPage;
