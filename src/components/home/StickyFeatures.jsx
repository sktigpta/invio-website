import { Link } from 'react-router-dom';
import {
  CalculatorIcon,
  PrinterIcon,
  BarcodeIcon,
  ZapIcon,
  MailIcon,
  TrendingUpIcon,
  SparklesIcon,
  ReceiptIcon,
  ShieldCheckIcon,
} from '../Icons';

export function StickyFeatures() {
  const features = [
    {
      title: 'Fast GST & Regular Invoicing',
      category: 'Billing & Invoicing',
      description: 'Create clean bills in seconds. Automatically calculates CGST & SGST for local sales or IGST for other states, adds discounts, and writes totals in words.',
      icon: CalculatorIcon,
    },
    {
      title: 'Thermal Receipts & UPI QR Code',
      category: 'Counter Checkout',
      description: 'Print store receipts on standard thermal printers with your shop logo, address, and dynamic UPI QR code for customers to scan and pay with GPay, PhonePe, or Paytm.',
      icon: PrinterIcon,
    },
    {
      title: 'Barcode Scanner Fast Billing',
      category: 'Quick Counter',
      description: 'Plug in any barcode scanner gun. Scan items directly into customer bills in real time without typing product names or searching prices.',
      icon: BarcodeIcon,
    },
    {
      title: 'Stock & Inventory Tracker',
      category: 'Stock Control',
      description: 'Stock quantities automatically reduce when you sell and update when you restock. Get helpful warning alerts before fast-moving items run out.',
      icon: TrendingUpIcon,
    },
    {
      title: 'Works 100% Offline & Privately',
      category: '100% Offline',
      description: 'Keep billing customers even when your shop internet or WiFi is down. All customer bills and sales records stay safely and privately on your computer.',
      icon: ZapIcon,
    },
    {
      title: 'Send Bills on WhatsApp & Email',
      category: 'Customer Sharing',
      description: 'Send neat PDF invoices directly to your customer’s WhatsApp number or email inbox in one click. Saves paper and keeps customers happy.',
      icon: MailIcon,
    },
    {
      title: 'Customer Directory & Credit (Udhar) Diary',
      category: 'Customer Ledger',
      description: 'Save customer phone numbers and addresses. Easily record pending dues (udhar), partial payments, and see customer balance history anytime.',
      icon: ReceiptIcon,
    },
    {
      title: 'Daily Sales & Profit Reports',
      category: 'Business Reports',
      description: 'Check daily and monthly sales, cash collections, pending dues, and shop expenses at a glance. Export simple spreadsheet reports for your tax filings.',
      icon: SparklesIcon,
    },
    {
      title: 'One-Click Data Backup & Safety',
      category: 'Safe & Secure',
      description: 'Save a complete backup of your shop data to a pen drive or computer folder with one click. Safely restore your bills, stock, and customers anytime.',
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <section
      id="features"
      className="w-full bg-gradient-to-br from-[#fbf9fe] via-white to-purple-50/25 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-200 relative scroll-mt-24"
    >
      {/* Decorative ambient blurred orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#7C3AED]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {/* Left Side: Sticky Intro (stays pinned as feature cards scroll past smoothly) */}
          <div className="relative h-full">
            <div className="lg:sticky lg:top-28 flex flex-col gap-4 sm:gap-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-block mb-3 sm:mb-4">
                  STORE CAPABILITIES
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-3 sm:mb-4 text-slate-900">
                  Explore Our <span className="text-[#7C3AED]">Features</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-5">
                  Unlike traditional cloud tools that require costly monthly subscriptions and constant internet access, Invio starts free forever with lightning-fast desktop billing and total local data privacy. Step up to Plus only when you need multi-counter hardware POS, thermal printing, and dynamic UPI QR dispatches.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Link
                    to="/features"
                    className="inline-flex items-center gap-2 text-[#7C3AED] font-semibold text-sm hover:underline group"
                  >
                    <span>View All Capabilities &amp; Specs</span>
                    <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Features Responsive 2-Col Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#7C3AED]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-default h-full shadow-xs"
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="size-11 sm:size-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-4 text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white transition-colors duration-200">
                        <Icon className="size-5 sm:size-6 text-[#7C3AED] group-hover:text-white transition-colors duration-200" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-50 border border-purple-100/80 px-2.5 py-0.5 rounded-[8px] inline-block mb-2 self-start">
                        {feature.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal flex-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StickyFeatures;
