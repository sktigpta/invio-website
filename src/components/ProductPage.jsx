import { useState } from 'react';
import { PRODUCT_METADATA } from '../data/productMetadata';
import { PLATFORM_DOWNLOADS } from '../utils/osDetector';
import {
  AppleIcon,
  WindowsIcon,
  LinuxIcon,
  CalculatorIcon,
  PrinterIcon,
  BarcodeIcon,
  TrendingUpIcon,
  ReceiptIcon,
  MailIcon,
  ZapIcon,
  ShieldCheckIcon,
} from './Icons';

export function ProductPage({ onNavigate, onDirectDownload, activeOS, onSelectOS }) {
  const [selectedPlatform, setSelectedPlatform] = useState(
    activeOS?.id && ['mac', 'windows', 'linux'].includes(activeOS.id) ? activeOS.id : 'windows'
  );

  const getOsIcon = (id, className = 'size-4') => {
    if (id === 'mac') return <AppleIcon className={className} />;
    if (id === 'windows') return <WindowsIcon className={className} />;
    return <LinuxIcon className={className} />;
  };

  const featureIcons = [
    CalculatorIcon,
    PrinterIcon,
    BarcodeIcon,
    TrendingUpIcon,
    ReceiptIcon,
    MailIcon,
    ZapIcon,
    ShieldCheckIcon,
  ];

  const currentPlatformMeta = PLATFORM_DOWNLOADS[selectedPlatform] || PLATFORM_DOWNLOADS.windows;
  const currentRequirements = PRODUCT_METADATA.systemRequirements[selectedPlatform] || PRODUCT_METADATA.systemRequirements.windows;
  const currentInstallGuide = PRODUCT_METADATA.installationInstructions[selectedPlatform] || PRODUCT_METADATA.installationInstructions.windows;

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button
            type="button"
            onClick={() => onNavigate('product-home')}
            className="hover:text-purple-600 transition-colors cursor-pointer"
          >
            Invio Home
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Product Overview</span>
        </nav>

        {/* Hero Section */}
        <section aria-labelledby="product-title" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-semibold text-[#8646F4]">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Free Downloadable Desktop Software
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                  By {PRODUCT_METADATA.brand}
                </span>
              </div>

              <h1 id="product-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
                {PRODUCT_METADATA.name}
              </h1>

              <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {PRODUCT_METADATA.description}
              </p>

              {/* Verified Key Highlights */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>100% Offline SQLite</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>GST (CGST/SGST/IGST)</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>58mm / 80mm Thermal POS</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Barcode Scanner Guns</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Dynamic UPI QR Code</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Windows &amp; macOS Ready</span>
                </div>
              </div>
            </div>

            {/* Download Action Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col items-center text-center shrink-0 w-full lg:w-72">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                Pricing
              </span>
              <div className="text-3xl font-extrabold text-slate-900 font-heading">
                $0.00
              </div>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Free Forever Core Plan
              </p>

              <button
                type="button"
                onClick={() => onDirectDownload(currentPlatformMeta)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#8646F4] hover:bg-[#7234de] text-white font-bold text-xs rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                {getOsIcon(selectedPlatform)}
                <span>Download for {currentPlatformMeta.name}</span>
              </button>

              <span className="text-[11px] text-slate-500 mt-2">
                {currentPlatformMeta.sizeEstimate} • {currentPlatformMeta.archLabel}
              </span>

              {/* Platform Switcher */}
              <div className="mt-4 pt-4 border-t border-slate-200 w-full flex items-center justify-center gap-1.5">
                {['windows', 'mac', 'linux'].map((pId) => (
                  <button
                    key={pId}
                    type="button"
                    onClick={() => {
                      setSelectedPlatform(pId);
                      if (onSelectOS) onSelectOS(pId);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                      selectedPlatform === pId
                        ? 'bg-white text-[#8646F4] font-bold shadow-xs border border-purple-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {getOsIcon(pId, 'size-3')}
                    <span className="capitalize">{pId === 'mac' ? 'macOS' : pId}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Real Product Screenshot */}
        <section aria-labelledby="screenshot-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 id="screenshot-heading" className="text-xl font-bold text-slate-900 font-heading">
                Authentic Application Interface
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Real screenshot of the Invio desktop billing counter, invoice items table, and totals engine.
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium self-start sm:self-auto">
              Desktop Application UI
            </span>
          </div>

          <div className="squircle-window bg-slate-950 text-left border border-slate-800 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[#ff5f56]" />
                <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="size-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Invio Desktop • POS Billing &amp; Inventory Counter
              </span>
              <div className="size-2.5" />
            </div>
            <img
              src="/screenshots/dashboard.png"
              alt="Invio Desktop Application billing and inventory management interface showing invoice creation and stock summary"
              width="1200"
              height="750"
              className="w-full h-auto object-cover block"
              loading="eager"
            />
          </div>
        </section>

        {/* Verified Feature Breakdown */}
        <section aria-labelledby="features-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-10">
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8646F4] block mb-1">
              Core Capabilities
            </span>
            <h2 id="features-heading" className="text-2xl font-bold text-slate-900 font-heading">
              Built for Speed, Privacy, and Counter Efficiency
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Every feature below is implemented in the desktop application and verified in source code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCT_METADATA.keyFeatures.map((feat, idx) => {
              const IconComp = featureIcons[idx % featureIcons.length];
              return (
                <div
                  key={feat.title}
                  className="bg-slate-50/70 p-5 rounded-2xl border border-slate-100 flex gap-4 items-start"
                >
                  <div className="size-9 rounded-xl bg-purple-100 text-[#8646F4] flex items-center justify-center shrink-0">
                    <IconComp className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-heading">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 100% Local Data Privacy Guarantee */}
        <section aria-labelledby="privacy-heading" className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
                <ShieldCheckIcon className="size-3.5" />
                <span>100% Local SQLite Architecture</span>
              </div>
              <h2 id="privacy-heading" className="text-2xl font-bold font-heading">
                Your Business Records Never Leave Your Computer
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                Unlike cloud accounting services that require monthly fees and transmit your customer data to third-party servers, Invio runs entirely on your local machine. Customer details, invoices, and sales reports remain strictly private in your local database with zero telemetry and zero external tracking.
              </p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs space-y-2 shrink-0 w-full md:w-64">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Database:</span>
                <span className="font-semibold text-white">Local SQLite</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Cloud Sync:</span>
                <span className="font-semibold text-white">None (Air-Gapped)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Telemetry:</span>
                <span className="font-semibold text-emerald-400">0% Collected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Backups:</span>
                <span className="font-semibold text-white">1-Click Local</span>
              </div>
            </div>
          </div>
        </section>

        {/* System Requirements & Installation Instructions */}
        <section aria-labelledby="requirements-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8646F4] block mb-1">
                Specifications
              </span>
              <h2 id="requirements-heading" className="text-2xl font-bold text-slate-900 font-heading">
                System Requirements &amp; Installation
              </h2>
            </div>

            {/* Platform Tab Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              {['windows', 'mac', 'linux'].map((pId) => (
                <button
                  key={pId}
                  type="button"
                  onClick={() => setSelectedPlatform(pId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedPlatform === pId
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {getOsIcon(pId, 'size-3')}
                  <span className="capitalize">{pId === 'mac' ? 'macOS' : pId}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Requirements Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 font-heading mb-4 flex items-center gap-2">
                <span>Minimum System Requirements for</span>
                <span className="capitalize text-[#8646F4]">{selectedPlatform === 'mac' ? 'macOS' : selectedPlatform}</span>
              </h3>

              <dl className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <dt className="text-slate-500 font-medium">Operating System</dt>
                  <dd className="text-slate-800 font-semibold text-right">{currentRequirements.os}</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <dt className="text-slate-500 font-medium">Processor</dt>
                  <dd className="text-slate-800 font-semibold text-right">{currentRequirements.processor}</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <dt className="text-slate-500 font-medium">System Memory (RAM)</dt>
                  <dd className="text-slate-800 font-semibold text-right">{currentRequirements.ram}</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <dt className="text-slate-500 font-medium">Disk Storage</dt>
                  <dd className="text-slate-800 font-semibold text-right">{currentRequirements.diskSpace}</dd>
                </div>
                <div className="flex justify-between py-1.5">
                  <dt className="text-slate-500 font-medium">Display Resolution</dt>
                  <dd className="text-slate-800 font-semibold text-right">{currentRequirements.display}</dd>
                </div>
              </dl>
            </div>

            {/* Installation Guide Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-heading mb-3">
                  Quick Installation Instructions
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentInstallGuide}
                </p>

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-[11px] text-amber-800">
                  <strong>First-launch note:</strong> {currentPlatformMeta.securityTip}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">Package file:</span>
                  <span className="text-xs font-mono font-semibold text-slate-800">
                    {currentPlatformMeta.filename}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onDirectDownload(currentPlatformMeta)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Download {currentPlatformMeta.shortName}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Transparency Section: Free, Monthly, and Yearly */}
        <section aria-labelledby="pricing-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-10">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8646F4] block mb-1">
              Transparent Pricing
            </span>
            <h2 id="pricing-heading" className="text-2xl font-bold text-slate-900 font-heading">
              Choose the Plan That Fits Your Shop
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Start with our 100% Free Forever Core plan or upgrade to Invio Plus for thermal printing, automated email &amp; WhatsApp delivery, POS customer display, and automated backups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {/* 1. Free Core Plan */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900">Invio Free</h3>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Free Forever
                  </span>
                </div>
                <div className="mt-2 mb-3">
                  <span className="text-3xl font-extrabold text-slate-900">₹0</span>
                  <span className="text-xs text-slate-500 ml-1">/ forever</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Full offline desktop billing, GST invoices, A4 PDF exports, barcode scanner checkout, and local SQLite data privacy.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Unlimited offline invoices &amp; billing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Automated CGST/SGST/IGST tax engine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>A4 &amp; A5 print and PDF exports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>100% offline local SQLite database</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onDirectDownload(currentPlatformMeta)}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 hover:bg-white transition-all cursor-pointer shadow-2xs"
              >
                Download Free
              </button>
            </div>

            {/* 2. Invio Plus Monthly */}
            <div className="rounded-2xl border border-purple-200 bg-purple-50/30 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900">Invio Plus Monthly</h3>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
                    Monthly
                  </span>
                </div>
                <div className="mt-2 mb-3">
                  <span className="text-3xl font-extrabold text-slate-900">₹149</span>
                  <span className="text-xs text-slate-500 ml-1">/ month</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Ideal for seasonal shops and flexibility. Unlock thermal POS printing, WhatsApp sharing, and POS display.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>Everything in Free Core</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>58mm &amp; 80mm thermal receipt printing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>Dynamic UPI payment QR codes on bills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>WhatsApp bill sharing &amp; POS display</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  window.history.pushState(null, '', '/subscription?plan=monthly');
                  onNavigate('subscription');
                }}
                className="w-full py-2.5 rounded-xl border border-purple-300 bg-white text-xs font-bold text-[#8646F4] hover:bg-purple-50 transition-all cursor-pointer shadow-2xs"
              >
                Get Monthly (₹149/mo)
              </button>
            </div>

            {/* 3. Invio Plus Yearly (Best Value) */}
            <div className="relative rounded-2xl border-2 border-[#8646F4] bg-white p-5 flex flex-col justify-between shadow-sm">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#8646F4] text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                Save 44% • Best Value
              </span>
              <div>
                <div className="flex items-center justify-between mb-2 mt-1">
                  <h3 className="text-base font-bold text-slate-900">Invio Plus Yearly</h3>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Annual License
                  </span>
                </div>
                <div className="mt-2 mb-3">
                  <span className="text-3xl font-extrabold text-slate-900">₹999</span>
                  <span className="text-xs text-slate-500 ml-1">/ year (₹83/mo)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Full commercial license with priority support, automated backups, and complete POS capabilities.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>Everything in Free Core + Plus Monthly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>58mm &amp; 80mm thermal receipt printing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>Email invoices (Google OAuth / SMTP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>1-click SQLite &amp; PostgreSQL backups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>Priority dedicated developer support</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  window.history.pushState(null, '', '/subscription');
                  onNavigate('subscription');
                }}
                className="w-full py-2.5 rounded-xl bg-[#8646F4] hover:bg-[#7234de] text-xs font-bold text-white transition-all cursor-pointer shadow-xs"
              >
                Get Plus Yearly (₹999/yr)
              </button>
            </div>
          </div>
        </section>

        {/* Publisher, Support & Legal Footer Bar */}
        <footer className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-slate-600">
            <div>
              <p className="font-semibold text-slate-800">
                Published by Timrio (<a href="https://timrio.com" target="_blank" rel="noopener noreferrer" className="text-[#8646F4] hover:underline">timrio.com</a>)
              </p>
              <p className="mt-1 text-slate-500">
                Direct customer support: <a href="mailto:support@timrio.com" className="text-[#8646F4] font-medium hover:underline">support@timrio.com</a>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => onNavigate('docs-features')}
                className="hover:text-purple-600 transition-colors cursor-pointer"
              >
                Feature Docs
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigate('privacy')}
                className="hover:text-purple-600 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigate('terms')}
                className="hover:text-purple-600 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigate('version')}
                className="hover:text-purple-600 transition-colors cursor-pointer"
              >
                Changelog
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ProductPage;
