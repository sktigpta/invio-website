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
} from './Icons';

export function FeatureGrid() {
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

  const steps = [
    {
      number: '1',
      title: 'Download & Install',
      desc: '1-click installer for your computer. Sign in to get started.',
    },
    {
      number: '2',
      title: 'Add Your Shop Details',
      desc: 'Enter your shop name, phone, address, and UPI ID to brand your printed receipts and bills.',
    },
    {
      number: '3',
      title: 'Start Billing Customers',
      desc: 'Scan barcodes or pick products, print thermal receipts or send on WhatsApp, and track your daily sales.',
    },
  ];

  return (
    <section id="features" className="w-full bg-gradient-to-br from-[#fbf9fe] via-white to-purple-50/25 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200 relative scroll-mt-24">
      {/* Decorative ambient blurred orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#8646F4]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Side: Sticky Intro (wrapper stretches full row height so the
              inner panel can stick while the feature cards scroll past) */}
          <div className="relative">
            <div className="lg:sticky lg:top-28 flex flex-col gap-4 sm:gap-6">
              <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8646F4] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-block mb-3 sm:mb-4">
                STORE CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-3 sm:mb-4 font-heading text-slate-900">
                Offline First, <span className="text-[#8646F4]">Zero Fees,</span> and Total Privacy
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-5">
                Unlike traditional cloud tools that require costly recurring subscriptions and constant internet access, Invio delivers lightning-fast desktop billing with total local data privacy.
              </p>
              <a
                href="#product"
                className="inline-flex items-center gap-2 text-[#8646F4] font-semibold text-sm hover:underline group"
              >
                <span>Download Invio for Free</span>
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </a>
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
                    className="group relative p-5 sm:p-6 md:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-[#8646F4]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-default h-full shadow-xs"
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="size-11 sm:size-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-4 sm:mb-5 text-[#8646F4] group-hover:bg-[#8646F4] group-hover:text-white transition-colors duration-200">
                        <Icon className="size-5 sm:size-6 text-[#8646F4] group-hover:text-white transition-colors duration-200" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8646F4] bg-purple-50 border border-purple-100/80 px-2.5 py-0.5 rounded-[8px] inline-block mb-2 self-start">
                        {feature.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-2 font-heading">
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

        {/* 3-Step Quickstart Walkthrough */}
        <div className="mt-12 sm:mt-20 pt-10 sm:pt-12 border-t border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8646F4] block mb-1">
              GET STARTED IN SECONDS
            </span>
            <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
              Ready to bill in 3 simple steps
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-xs relative flex flex-col items-start hover:border-[#8646F4]/40 hover:-translate-y-0.5 hover:shadow-md transition-all h-full"
              >
                <div className="size-8 sm:size-9 rounded-full bg-[#8646F4] text-white flex items-center justify-center font-bold text-xs sm:text-sm mb-3 sm:mb-4 shadow-xs">
                  {step.number}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 font-heading">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureGrid;
