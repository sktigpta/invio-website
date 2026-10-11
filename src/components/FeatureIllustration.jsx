import {
  CalculatorIcon,
  PrinterIcon,
  BarcodeIcon,
  TrendingUpIcon,
  ZapIcon,
  MailIcon,
  ReceiptIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from './Icons';

export function FeatureIllustration({ type, title }) {
  // 1. GST Invoice illustration
  if (type === 'invoice') {
    return (
      <div className="w-full h-full min-h-[260px] sm:min-h-[300px] bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 p-5 rounded-2xl flex flex-col justify-between text-white shadow-md relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-[#7C3AED] flex items-center justify-center">
              <CalculatorIcon className="size-3.5 text-white" />
            </div>
            <span className="text-xs font-bold tracking-tight text-white">TAX INVOICE</span>
          </div>
          <span className="text-[11px] font-mono text-purple-300">#INV-2026-084</span>
        </div>

        {/* Invoice Item Rows */}
        <div className="space-y-2 py-3">
          <div className="flex items-center justify-between text-[11px] text-slate-300 pb-1 border-b border-white/5">
            <span>Item Description</span>
            <span className="font-mono">Qty × Rate</span>
            <span className="font-mono">Total</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-white">
            <span className="truncate max-w-[130px]">Wireless Laser Scanner</span>
            <span className="font-mono text-slate-400">1 × ₹2,400</span>
            <span className="font-mono font-semibold">₹2,400.00</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-white">
            <span className="truncate max-w-[130px]">Thermal Paper (80mm)</span>
            <span className="font-mono text-slate-400">5 × ₹120</span>
            <span className="font-mono font-semibold">₹600.00</span>
          </div>
        </div>

        {/* GST Calculations & Total */}
        <div className="pt-2 border-t border-white/10 space-y-1 text-[11px]">
          <div className="flex justify-between text-slate-300">
            <span>Subtotal</span>
            <span className="font-mono">₹3,000.00</span>
          </div>
          <div className="flex justify-between text-purple-300">
            <span>CGST (9%) + SGST (9%)</span>
            <span className="font-mono">₹270 + ₹270</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-white pt-1 border-t border-white/10">
            <span>Grand Total</span>
            <span className="font-mono text-emerald-400">₹3,540.00</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Thermal Receipt with UPI QR illustration
  if (type === 'thermal') {
    return (
      <div className="w-full h-full min-h-[260px] sm:min-h-[300px] bg-amber-50/70 border border-amber-200/60 p-5 rounded-2xl flex flex-col justify-between text-slate-800 shadow-xs relative overflow-hidden select-none">
        <div className="text-center pb-2 border-b border-dashed border-slate-300">
          <div className="text-xs font-bold tracking-tight text-slate-900 uppercase">INVIO RETAIL MART</div>
          <div className="text-[10px] text-slate-500">GSTIN: 27AAAAA0000A1Z5</div>
          <div className="text-[10px] text-slate-500">POS Slip #80-5412 • 58mm Thermal</div>
        </div>

        <div className="space-y-1.5 py-2 text-[11px]">
          <div className="flex justify-between font-mono">
            <span>Cotton Shirt (M)</span>
            <span>₹850.00</span>
          </div>
          <div className="flex justify-between font-mono">
            <span>Denim Jeans (32)</span>
            <span>₹1,450.00</span>
          </div>
          <div className="flex justify-between font-bold border-t border-dashed border-slate-300 pt-1">
            <span>NET BILL AMOUNT</span>
            <span className="text-[#7C3AED]">₹2,300.00</span>
          </div>
        </div>

        {/* Dynamic UPI QR Box */}
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center flex items-center justify-center gap-3">
          <div className="size-14 rounded-lg bg-slate-900 p-1 flex items-center justify-center text-[8px] font-mono text-white text-center leading-tight">
            UPI QR CODE
          </div>
          <div className="text-left">
            <span className="text-[11px] font-bold text-slate-900 block">Scan to Pay via UPI</span>
            <span className="text-[10px] text-slate-500 block">GPay • PhonePe • Paytm</span>
            <span className="text-[10px] font-semibold text-emerald-600 block">Instant Verification</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Barcode Scanner Fast Billing illustration
  if (type === 'barcode') {
    return (
      <div className="w-full h-full min-h-[260px] sm:min-h-[300px] bg-slate-900 p-5 rounded-2xl flex flex-col justify-between text-white shadow-md relative overflow-hidden select-none">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <BarcodeIcon className="size-3.5" />
            </div>
            <span className="text-xs font-bold text-white">Live Barcode Input</span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
            Scanner Connected
          </span>
        </div>

        {/* Barcode visual beam */}
        <div className="my-2 p-3 rounded-xl bg-slate-800/80 border border-white/10 relative overflow-hidden">
          <div className="h-0.5 bg-red-500/80 w-full mb-2 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <div className="flex items-center justify-center tracking-[4px] font-mono text-xs text-slate-300">
            ||||| | |||| ||| |||||||
          </div>
          <div className="text-center font-mono text-[10px] text-purple-300 mt-1">
            8901030829142 • Instant Cart Add
          </div>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between text-slate-300">
            <span>Lookup Latency:</span>
            <span className="font-mono text-emerald-400 font-semibold">&lt; 0.8ms (Local SQLite)</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Peripheral Support:</span>
            <span className="text-white font-medium">USB • 2.4G • Bluetooth</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Inventory & Stock illustration
  if (type === 'stock') {
    return (
      <div className="w-full h-full min-h-[260px] sm:min-h-[300px] bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between text-slate-900 shadow-xs relative overflow-hidden select-none">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-purple-100 text-[#7C3AED] flex items-center justify-center">
              <TrendingUpIcon className="size-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-900">Live Stock Decrement</span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            Low Stock Alerts Active
          </span>
        </div>

        <div className="space-y-2.5 py-2">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Amul Butter 500g</span>
              <span className="text-[10px] text-slate-500">Threshold: 10 units</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600">42 in stock</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/70 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Basmati Rice 5kg</span>
              <span className="text-[10px] text-amber-700">Reorder Warning</span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-700">3 in stock</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
          <span>Auto-Restock on Return</span>
          <span className="font-semibold text-[#7C3AED]">Enabled</span>
        </div>
      </div>
    );
  }

  // 5. Offline SQLite illustration
  if (type === 'offline') {
    return (
      <div className="w-full h-full min-h-[260px] sm:min-h-[300px] bg-slate-900 p-5 rounded-2xl flex flex-col justify-between text-white shadow-md relative overflow-hidden select-none">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <ZapIcon className="size-3.5" />
            </div>
            <span className="text-xs font-bold text-white">Local SQLite 3 Engine</span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
            100% Offline
          </span>
        </div>

        <div className="my-2 p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 font-mono text-[11px]">
          <div className="text-purple-300">~/Library/Application Support/Invio/invio.db</div>
          <div className="text-slate-400">Zero Cloud Latency • Direct Disk I/O</div>
          <div className="text-emerald-400 font-semibold">Sub-millisecond query execution</div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Internet connection:</span>
          <span className="text-slate-200 font-medium">Not Required (Never locks you out)</span>
        </div>
      </div>
    );
  }

  // 6. WhatsApp & Email digital sharing illustration
  if (type === 'sharing') {
    return (
      <div className="w-full h-full min-h-[260px] sm:min-h-[300px] bg-emerald-950/90 border border-emerald-800/40 p-5 rounded-2xl flex flex-col justify-between text-white shadow-md relative overflow-hidden select-none">
        <div className="flex items-center justify-between pb-2 border-b border-emerald-800/50">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <MailIcon className="size-3.5" />
            </div>
            <span className="text-xs font-bold text-white">Digital Dispatch</span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
            Instant
          </span>
        </div>

        <div className="my-2 p-3 rounded-xl bg-white/10 border border-white/10 space-y-1 text-[11px]">
          <div className="font-semibold text-emerald-300">WhatsApp Notification:</div>
          <div className="text-slate-200 leading-relaxed">
            &quot;Hello Rajesh! Here is your bill #INV-084 from Invio Supermarket. Total: ₹3,540.00. Thank you for shopping with us!&quot;
          </div>
          <div className="text-[10px] text-emerald-400 pt-1 font-mono">Attached: Invoice-INV-084.pdf</div>
        </div>

        <div className="pt-2 border-t border-emerald-800/50 flex justify-between text-[11px] text-emerald-200">
          <span>Cost per dispatch:</span>
          <span className="font-bold text-white">₹0.00 (Zero Gateway Fee)</span>
        </div>
      </div>
    );
  }

  // 7. Customer Credit & Udhar ledger illustration
  if (type === 'ledger') {
    return (
      <div className="w-full h-full min-h-[260px] sm:min-h-[300px] bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between text-slate-900 shadow-xs relative overflow-hidden select-none">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-purple-100 text-[#7C3AED] flex items-center justify-center">
              <ReceiptIcon className="size-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-900">Credit (Udhar) Ledger</span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-[#7C3AED]">
            Active Diary
          </span>
        </div>

        <div className="space-y-2 py-2">
          <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
            <div>
              <span className="font-bold text-slate-900 block">Vikram Enterprises</span>
              <span className="text-[10px] text-slate-500">+91 98200 12345</span>
            </div>
            <span className="font-mono font-bold text-red-600">Due: ₹12,450</span>
          </div>
          <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
            <div>
              <span className="font-bold text-slate-900 block">Pooja Retail Store</span>
              <span className="text-[10px] text-slate-500">+91 97690 54321</span>
            </div>
            <span className="font-mono font-bold text-emerald-600">Settled (₹0)</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
          <span>Payment History Log:</span>
          <span className="font-semibold text-slate-900">Cash, UPI, Cheque, RTGS</span>
        </div>
      </div>
    );
  }

  // 8. Reports & Analytics illustration
  if (type === 'reports') {
    return (
      <div className="w-full h-full min-h-[260px] sm:min-h-[300px] bg-slate-900 p-5 rounded-2xl flex flex-col justify-between text-white shadow-md relative overflow-hidden select-none">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <SparklesIcon className="size-3.5" />
            </div>
            <span className="text-xs font-bold text-white">Daily Financial Analytics</span>
          </div>
          <span className="text-[10px] font-mono text-purple-300">Today&apos;s Close</span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block">Gross Sales</span>
            <span className="text-sm font-mono font-bold text-emerald-400">₹48,250.00</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block">UPI Receipts</span>
            <span className="text-sm font-mono font-bold text-purple-300">₹32,100.00</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block">Cash Collections</span>
            <span className="text-sm font-mono font-bold text-white">₹16,150.00</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-400 block">Tax Collected (GST)</span>
            <span className="text-sm font-mono font-bold text-amber-300">₹5,790.00</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex justify-between text-[11px] text-slate-400">
          <span>Export Options:</span>
          <span className="text-white font-medium">CSV • Excel • GSTR-1 Summary</span>
        </div>
      </div>
    );
  }

  // 9. Backup & Safety illustration (default fallback)
  return (
    <div className="w-full h-full min-h-[260px] sm:min-h-[300px] bg-slate-900 p-5 rounded-2xl flex flex-col justify-between text-white shadow-md relative overflow-hidden select-none">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center">
            <ShieldCheckIcon className="size-3.5" />
          </div>
          <span className="text-xs font-bold text-white">Database Backup &amp; Portability</span>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
          Encrypted &amp; Safe
        </span>
      </div>

      <div className="my-2 p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-[11px]">
        <div className="flex justify-between text-slate-300">
          <span>Latest Backup:</span>
          <span className="font-mono text-white">invio-backup-2026-10.db</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Destination:</span>
          <span className="text-purple-300">USB Drive (E:) / External SSD</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Restore Time:</span>
          <span className="font-mono text-emerald-400">&lt; 3 Seconds</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex justify-between text-[11px] text-slate-400">
        <span>Zero Cloud Lock-in:</span>
        <span className="text-white font-medium">100% Owned by Your Shop</span>
      </div>
    </div>
  );
}
