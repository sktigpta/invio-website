import { useState } from 'react';

const FAQS = [
  {
    q: 'Is Invio really free? Are there any hidden fees or subscriptions?',
    a: 'The Free plan is 100% free forever: download the app and use core offline billing, GST calculations, A4 printing, inventory, customers, expenses and basic reports with no hidden fees. An optional Plus subscription unlocks thermal receipt printing, email & WhatsApp dispatch, POS display, backups and priority support — see the Pricing page for current plans.'
  },
  {
    q: 'Does Invio work without an internet connection?',
    a: 'Yes, 100%! Invio is built offline-first. You can create customer bills, scan barcodes, print thermal receipts, and check inventory anytime, even when your shop WiFi or internet connection is down.'
  },
  {
    q: 'Where is my shop and customer data stored?',
    a: 'All your bills, product inventory, and customer details are stored safely on your computer. Your private business records never leave your device.'
  },
  {
    q: 'Which thermal printers and barcode scanners can I use?',
    a: 'Invio is compatible with all standard 58mm (2-inch) and 80mm (3-inch) thermal receipt printers (USB, Bluetooth, and LAN) as well as regular office printers for A4/A5 paper bills. Any standard USB or wireless barcode scanner gun works plug-and-play.'
  },
  {
    q: 'How does GST calculation work?',
    a: 'Invio calculates taxes automatically as you add items. For intra-state (within your state) sales, it automatically splits the tax into CGST and SGST. For inter-state (outside your state) sales, it applies IGST. You can set tax rates and HSN codes per item.'
  },
  {
    q: 'How do printed UPI payment QR codes work?',
    a: 'Simply save your UPI ID (such as yourname@upi) in Settings. When printing receipts, Invio automatically generates a UPI QR code with the exact bill amount so customers can scan and pay with Google Pay, PhonePe, or Paytm.'
  },
  {
    q: 'Can I export my sales for my accountant or GST filing?',
    a: 'Yes! With one click from the Invoices screen, you can export all your invoices and line items into a spreadsheet file ready to share with your accountant.'
  },
  {
    q: 'How do I backup or move my data to a new computer?',
    a: 'Go to Settings > Database & Storage and click "Create Backup" to save a copy of your data to a pen drive or external drive. On your new computer, click "Restore Backup" to recover everything in seconds.'
  }
];

export function SupportSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="w-full bg-slate-50/50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8646F4] block mb-1">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Common questions &amp; clear answers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simple answers about offline safety, thermal receipts, barcode scanners, and inventory.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`squircle-card overflow-hidden transition-all border ${
                  isOpen ? 'bg-white border-[#8646F4]/50 shadow-md ring-1 ring-[#8646F4]/15' : 'bg-white border-slate-200/90 hover:border-[#8646F4]/30'
                }`}
              >
                <button
                  type="button"
                  id={`faq-button-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-[15px] cursor-pointer"
                >
                  <span className={isOpen ? 'text-[#8646F4]' : 'text-slate-800'}>{faq.q}</span>
                  <span className={`size-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${isOpen ? 'bg-[#8646F4] text-white shadow-sm' : 'bg-slate-100 text-slate-500'}`}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-button-${index}`} className="px-5 sm:px-6 pb-5 text-xs sm:text-[13px] text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Email Prompt */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Have additional questions? Contact us directly at{' '}
          <a href="mailto:support@timrio.com" className="text-[#8646F4] font-medium hover:underline">
            support@timrio.com
          </a>
        </div>
      </div>
    </section>
  );
}

export default SupportSection;
