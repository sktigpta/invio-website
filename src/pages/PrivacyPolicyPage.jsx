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
      subtitle="Invio Desktop Software, Website & Services • Published by Timrio • Last updated: October 2026"
    >
      <p>
        Timrio (&ldquo;we&rdquo;, &ldquo;us&rdquo;) publishes Invio, a desktop invoicing and inventory application for
        Windows, macOS, and Linux, together with the website at invio.timrio.com and the backend services at
        api.invio.timrio.com that power sign-in, licensing, support, and update checks. This Privacy Policy explains
        what information Invio accesses, collects, or transmits, how it is used, stored, and secured, who receives it,
        and how you can access or control it.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        1. Information We Collect
      </h2>
      <p>
        <strong>Account &amp; license information.</strong> When you register or sign in, we collect your email address,
        business or shop name, first and last name (if provided), and a bcrypt hash of your password — never the
        password itself. New email registrations require a 4-digit one-time code sent to your address before the account
        is verified.
      </p>
      <p>
        <strong>Business profile you enter.</strong> If you fill in business settings (address, phone, GSTIN, currency,
        invoice numbering, payment details such as UPI ID or bank display fields, and display preferences), that profile
        is sent to our servers so your license and receipts work correctly.
      </p>
      <p>
        <strong>Support &amp; contact messages.</strong> When you use our contact or bug-report forms, we collect your
        name, email address, subject, message, and — for bug reports — the details you choose to include such as app
        version, operating system, description, reproduction steps, and any diagnostic log excerpt you attach. Our
        servers also record the time of submission and your IP address for abuse prevention.
      </p>
      <p>
        <strong>Device &amp; update-check data.</strong> The desktop app periodically contacts our release feed to check
        for updates. That request necessarily includes your current app version, platform (Windows, macOS, or Linux),
        and the IP address and user-agent inherent to any HTTPS request. Sign-in and licensing calls likewise include a
        session token, app version, and platform. These requests never include your invoices, customers, products, or
        expenses.
      </p>
      <p>
        <strong>Website visits.</strong> Our hosting infrastructure ephemerally logs standard request data (IP address,
        browser user-agent, operating system, and requested page) for security, DDoS defense, and rate limiting. The
        site loads fonts from Google Fonts, which receives your IP address as part of that request. We do not use
        third-party cross-site advertising trackers or retargeting pixels.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        2. Where Your Business Records Live
      </h2>
      <p>
        Your invoices, quotations, customer directory entries, product catalogues, inventory levels, and financial
        ledgers are stored <strong>on your own computer</strong> in the app&rsquo;s embedded SQLite database by default,
        or in a PostgreSQL database you choose and host yourself (for example on your main counter PC for
        multi-terminal use over your shop&rsquo;s local network). You retain full ownership and control of these records.
      </p>
      <p>
        The current version of Invio does <strong>not</strong> synchronize your invoices, customers, products, or
        expenses to Timrio&rsquo;s cloud. The app contains dormant sync code that is disabled in production builds, and
        our servers reject sync requests. If cloud synchronization is ever offered in the future, it will require an app
        update and your explicit choice, and this policy will be updated before it ships.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        3. Google Sign-In &amp; Gmail
      </h2>
      <p>
        <strong>Google sign-in (optional).</strong> If you choose &ldquo;Sign in with Google&rdquo;, Google verifies your
        identity using the <span className="font-mono">openid email profile</span> scopes. We receive your verified email
        address and profile name to sign you in or create your license profile. We never receive or store your Google
        password.
      </p>
      <p>
        <strong>Gmail invoice sending (optional).</strong> If you connect Gmail to send invoices from the desktop app, you
        are shown Google&rsquo;s consent screen requesting mail-sending permission (including the broad Gmail scope Google
        requires for SMTP-based sending). Our servers act only as a short-lived handoff: they exchange the authorization
        code and return tokens to your device, and <strong>never store your Gmail refresh token or read, store, or send
        your email content</strong>. The refresh token is encrypted and kept only on your device (see Section 6), and
        invoice emails are sent directly from your device through your Gmail account — not through Timrio&rsquo;s servers.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        4. Email &amp; WhatsApp Sharing
      </h2>
      <p>
        <strong>Transactional emails from us.</strong> Verification codes, login security alerts, billing receipts,
        contact-form replies, and bug-report acknowledgements are sent through our enterprise mail provider (Zoho),
        which necessarily receives the recipient address and message content in order to deliver it.
      </p>
      <p>
        <strong>Invoice emails you send.</strong> When you email an invoice from the desktop app using your own Gmail or
        custom SMTP server, the invoice content travels directly from your device to your mail provider and on to your
        chosen recipient. Timrio&rsquo;s servers are not in that path.
      </p>
      <p>
        <strong>WhatsApp sharing.</strong> Tapping WhatsApp share opens a link in your own browser addressed to the number
        you choose. Nothing is sent to Timrio&rsquo;s servers; when you confirm sending, the invoice text you share is
        transmitted to WhatsApp (Meta) under WhatsApp&rsquo;s own privacy policy.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        5. Marketing &amp; Future Communication
      </h2>
      <p>
        <strong>Service messages.</strong> We may email you about your account and the service: verification codes,
        security alerts, billing receipts, replies to your support requests, and important changes to these terms or
        this policy. These are part of providing the service and are not marketing.
      </p>
      <p>
        <strong>Marketing messages only with your consent.</strong> We will only send you product news, offers, tips, or
        other marketing communication if you have opted in — for example by ticking an opt-in box where one is offered
        or by asking us to keep you updated. Contacting support does not by itself subscribe you to marketing.
      </p>
      <p>
        <strong>Opting out.</strong> Every marketing email includes an unsubscribe link or instructions, and you can opt
        out at any time by clicking it or by writing to support@timrio.com with &ldquo;unsubscribe&rdquo; in the subject
        line. Opting out of marketing does not stop service messages described above. We never sell your personal
        information to third parties for their own marketing.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        6. Security
      </h2>
      <p>
        We apply reasonable safeguards: passwords stored only as bcrypt hashes; API sessions protected by signed tokens;
        all traffic over TLS (HTTPS); email and SMTP credentials encrypted on your device with your operating
        system&rsquo;s secure credential store (via Electron safeStorage / OS keychain) and never transmitted to Timrio;
        one-time codes stored only as hashes; sign-in handoff sessions that expire within minutes and are deleted on
        first use; and least-privilege database access on our servers.
      </p>
      <p>
        No method of transmission or storage is completely secure. You are responsible for keeping your device, operating
        system, and login credentials secure, and for creating regular backups using Invio&rsquo;s built-in local export
        feature — Timrio cannot retrieve records from your device if it is lost, damaged, or reformatted.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        7. Payments &amp; Subscriptions
      </h2>
      <p>
        Purchases of Invio Plus or Pro subscriptions are processed directly by our PCI-DSS compliant payment provider,
        Razorpay. Card numbers, UPI PINs, and net-banking credentials are entered on Razorpay&rsquo;s checkout and are
        never collected, processed, or stored by Timrio. Razorpay sends our servers only a cryptographically signed
        confirmation of the transaction (plan, amount, and status) so we can activate your license.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        8. Retention &amp; Deletion
      </h2>
      <p>
        We keep account, license, and support records for as long as your account is active and as required by law (for
        example, transaction records for tax and accounting obligations). One-time codes, sign-in handoff sessions, and
        rate-limit counters expire automatically within minutes. Website request logs are ephemeral.
      </p>
      <p>
        To delete your account and the personal information we hold about you, write to support@timrio.com from your
        registered email address. We will delete or anonymize your account data within a reasonable period except where
        we must retain limited records for legal, fraud-prevention, or accounting purposes. Data stored only on your
        device (your invoices, customers, and settings database) is deleted by you — uninstalling the app and removing
        its data directory, or using the in-app reset/export tools.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        9. Your Rights &amp; Contact
      </h2>
      <p>
        You may request access to, correction of, or deletion of your personal information, as well as information about
        how it is processed, by writing to our support team. We respond to privacy requests sent from the relevant
        registered email address after verifying ownership of the account.
      </p>
      <p>
        Timrio operates from India and respects applicable data protection law, including India&rsquo;s Digital Personal
        Data Protection (DPDP) Act. Because the customer personal data you enter into Invio (for example your
        clients&rsquo; names and phone numbers) is held and processed on your own hardware, <strong>you</strong> act as
        the Data Fiduciary for that data toward your own customers.
      </p>
      <p className="font-mono">
        Email: <a href="mailto:support@timrio.com" className="underline text-black font-semibold">support@timrio.com</a>
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        10. Third Parties That Process Information
      </h2>
      <p>
        We use a small set of providers, each receiving only what it needs to perform its function:
      </p>
      <p>
        Google (sign-in identity, Gmail sending you authorize, support-form storage, web fonts) • Zoho (transactional
        email delivery) • Razorpay (payment processing) • WhatsApp/Meta (messages you choose to share) • GitHub (release
        binaries, proxied through our download service so tokens stay server-side) • our hosting, PostgreSQL database,
        and Redis/rate-limit infrastructure (account, license, and operational data). We do not list any provider we do
        not use, and we update this section if our providers change.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3">
        11. Changes to This Policy
      </h2>
      <p>
        If we make material changes — for example, launching an optional cloud-sync feature, adding a provider, or
        starting a newsletter — we will update the &ldquo;Last updated&rdquo; date above and, where appropriate, notify
        you through the app, the website, or your registered email address. Continued use of Invio after an update takes
        effect constitutes acceptance of the revised policy.
      </p>
    </A4DocLayout>
  );
}

export default PrivacyPolicyPage;
