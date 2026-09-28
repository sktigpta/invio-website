import { useState, useMemo } from 'react';
import { CopyIcon, PrinterIcon, CheckIcon } from './ToolIcons';
import { formatINR, formatGBP, formatAED, formatUSD, copyText } from './toolFormatters';

export function SlipPrintHeader({ title, refPrefix = 'INV', subtitle = '' }) {
  const [stamp] = useState(() => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return {
      date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      ref: `${refPrefix}-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`,
    };
  });

  return (
    <div className="hidden print:block pb-2 mb-2 text-center font-mono">
      {/* Centered Business Header */}
      <div className="text-base font-black tracking-widest uppercase text-slate-900 leading-tight">INVIO</div>
      <div className="text-[9px] text-slate-600 font-medium tracking-wide">100% Free Offline Invoicing &amp; Billing</div>
      
      {/* Title */}
      <div className="text-[11px] font-black uppercase tracking-wider text-slate-900 mt-2 py-1 px-2 border-y border-dashed border-slate-900 inline-block w-full">
        {title}
      </div>
      {subtitle && <div className="text-[9.5px] text-slate-700 font-bold mt-1 uppercase">{subtitle}</div>}
      
      {/* Columnar Meta Info */}
      <div className="flex flex-col gap-1 text-[9.5px] text-slate-800 mt-2 pt-2 border-t border-dashed border-slate-400 font-mono text-left">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">SLIP NO:</span>
          <span className="font-bold text-slate-900">#{stamp.ref}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">DATE:</span>
          <span className="font-bold text-slate-900">{stamp.date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">TIME:</span>
          <span className="font-bold text-slate-900">{stamp.time}</span>
        </div>
      </div>
      <div className="border-b border-dashed border-slate-900 my-2" />
    </div>
  );
}

export function SlipPrintFooter() {
  return (
    <div className="hidden print:block text-center text-[9px] text-slate-700 pt-2 border-t border-dashed border-slate-900 mt-2 font-mono">
      <div className="font-black text-slate-900 uppercase tracking-widest mb-0.5 text-[9.5px]">*** THANK YOU ***</div>
      <div className="text-slate-700">Generated with <strong>Invio</strong> by Timrio</div>
      <div className="text-[8.5px] text-slate-500 mt-0.5">https://invio.timrio.com</div>
    </div>
  );
}

/* =========================================================
   1. INDIA GST CALCULATOR
========================================================= */
export function IndiaGstTool() {
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState('exclusive');
  const [amount, setAmount] = useState('');
  const [supply, setSupply] = useState('intra');
  const [copied, setCopied] = useState(false);

  const parsed = Math.max(0, parseFloat(amount) || 0);
  const gstRate = (parseFloat(rate) || 0) / 100;

  const results = useMemo(() => {
    if (mode === 'exclusive') {
      const base = parsed;
      const tax = base * gstRate;
      const gross = base + tax;
      const cgst = supply === 'intra' || supply === 'utgst' ? tax / 2 : 0;
      const sgst = supply === 'intra' ? tax / 2 : 0;
      const utgst = supply === 'utgst' ? tax / 2 : 0;
      const igst = supply === 'inter' ? tax : 0;
      return { base, tax, gross, cgst, sgst, utgst, igst };
    } else {
      const gross = parsed;
      const base = gstRate > 0 ? gross / (1 + gstRate) : gross;
      const tax = gross - base;
      const cgst = supply === 'intra' || supply === 'utgst' ? tax / 2 : 0;
      const sgst = supply === 'intra' ? tax / 2 : 0;
      const utgst = supply === 'utgst' ? tax / 2 : 0;
      const igst = supply === 'inter' ? tax : 0;
      return { base, tax, gross, cgst, sgst, utgst, igst };
    }
  }, [parsed, gstRate, mode, supply]);

  const copyBreakdown = async () => {
    const text = `GST Invoice Breakdown:\nBase Amount: ${formatINR(results.base)}\nGST (${rate}%): ${formatINR(results.tax)}\nTotal Invoice: ${formatINR(results.gross)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard write failed */
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden print:block print:h-auto print:overflow-visible print:w-full">
      {/* Center Column */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-[#f8fafc] no-print print:hidden">
        {/* Fixed End-to-End Tool Header (Column Layout) */}
        <div className="w-full h-14 bg-white border-b border-slate-200 px-5 sm:px-6 shrink-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">India GST Calculator</h1>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-50 text-[#8646F4] border border-purple-200">
              GSTIN
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
            Calculate intra-state CGST &amp; SGST, inter-state IGST, and reverse inclusive tax with live math.
          </p>
        </div>

        {/* Scrollable Center Form Section */}
        <div className="flex-1 h-full overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4 form-section-input">
            {/* Step 1: Rate Slab on Top */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">1. GST Rate Slab (%)</label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                {[0, 3, 5, 12, 18, 28, 40].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRate(s)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      rate === s ? 'bg-[#8646F4] text-white border-[#8646F4]' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {s}%
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Calculation Method */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">2. Calculation Method</label>
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setMode('exclusive')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    mode === 'exclusive' ? 'bg-white text-[#8646F4] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  + Exclusive (Add GST on Base)
                </button>
                <button
                  type="button"
                  onClick={() => setMode('inclusive')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    mode === 'inclusive' ? 'bg-white text-[#8646F4] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  − Inclusive (Extract GST from MRP)
                </button>
              </div>
            </div>

            {/* Step 3: Amount Input */}
            <div>
              <label htmlFor="in-gst-amount" className="block text-xs font-semibold text-slate-700 mb-1.5">
                3. {mode === 'exclusive' ? 'Net Base Amount (₹)' : 'Gross MRP Amount (₹)'}
              </label>
              <input
                id="in-gst-amount"
                type="number"
                min="0"
                placeholder="Enter amount (e.g. 10000)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4] transition-all"
              />
            </div>

            {/* Step 4: Supply Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">4. Supply Type &amp; Tax Split</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSupply('intra')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    supply === 'intra' ? 'border-[#8646F4] bg-purple-50 text-[#8646F4] font-semibold' : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold text-xs">Intra-State</span>
                  <span className="text-[11px] opacity-80">CGST (50%) + SGST (50%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSupply('inter')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    supply === 'inter' ? 'border-[#8646F4] bg-purple-50 text-[#8646F4] font-semibold' : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold text-xs">Inter-State</span>
                  <span className="text-[11px] opacity-80">IGST (100%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSupply('utgst')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    supply === 'utgst' ? 'border-[#8646F4] bg-purple-50 text-[#8646F4] font-semibold' : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold text-xs">Union Territory</span>
                  <span className="text-[11px] opacity-80">CGST + UTGST</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Fixed Summary Sidebar (Printable Slip Target) */}
      <aside className="w-full lg:w-80 xl:w-96 h-full border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col justify-between shrink-0 overflow-hidden printable-slip-target">
        {/* Fixed Right Summary Header (Screen only) */}
        <div className="w-full h-14 px-5 border-b border-slate-200 shrink-0 flex items-center justify-between bg-white no-print">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">GST Invoice Summary</h3>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">{rate}% GST</span>
        </div>

        {/* Scrollable Summary Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
          <div>
            <SlipPrintHeader title="GST TAX INVOICE STATEMENT" refPrefix="GST" subtitle={`${rate}% GST Calculation (${supply.toUpperCase()})`} />

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Net Subtotal:</span>
                <strong className="text-slate-900 font-bold">{formatINR(results.base)}</strong>
              </div>

            {supply === 'intra' ? (
              <>
                <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                  <span className="font-medium text-slate-500">CGST ({(rate / 2).toFixed(1)}%):</span>
                  <strong className="text-slate-900 font-bold">{formatINR(results.cgst)}</strong>
                </div>
                <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                  <span className="font-medium text-slate-500">SGST ({(rate / 2).toFixed(1)}%):</span>
                  <strong className="text-slate-900 font-bold">{formatINR(results.sgst)}</strong>
                </div>
              </>
            ) : supply === 'utgst' ? (
              <>
                <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                  <span className="font-medium text-slate-500">CGST ({(rate / 2).toFixed(1)}%):</span>
                  <strong className="text-slate-900 font-bold">{formatINR(results.cgst)}</strong>
                </div>
                <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                  <span className="font-medium text-slate-500">UTGST ({(rate / 2).toFixed(1)}%):</span>
                  <strong className="text-slate-900 font-bold">{formatINR(results.utgst)}</strong>
                </div>
              </>
            ) : (
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">IGST ({rate}%):</span>
                <strong className="text-slate-900 font-bold">{formatINR(results.igst)}</strong>
              </div>
            )}

            <div className="flex justify-between text-purple-700 font-bold pt-1.5">
              <span>Total Tax Amount:</span>
              <span>{formatINR(results.tax)}</span>
            </div>
          </div>
          </div>

          <div className="pt-4 mt-auto">
            <div className="p-4 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl flex items-center justify-between mb-3 print:bg-transparent print:border-y-2 print:border-x-0 print:border-slate-900 print:rounded-none print:p-2 print:my-2 print:shadow-none">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 print:text-slate-900 block font-mono">Gross Total</span>
                <span className="text-2xl font-black text-[#8646F4] print:text-slate-900 font-heading leading-tight print:font-mono print:text-base">{formatINR(results.gross)}</span>
              </div>
            </div>

            <SlipPrintFooter />

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                type="button"
                onClick={copyBreakdown}
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-3 bg-[#8646F4] hover:bg-[#7234de] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PrinterIcon />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   2. INCOME TAX CALCULATOR (INDIA FY 25-26)
========================================================= */
export function IncomeTaxIndiaTool() {
  const [assessmentYear, setAssessmentYear] = useState('2025-26');
  const [income, setIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [copied, setCopied] = useState(false);

  const parsedIncome = Math.max(0, parseFloat(income) || 0);
  const parsedDeductions = Math.max(0, parseFloat(deductions) || 0);

  const newRegimeTax = useMemo(() => {
    if (parsedIncome <= 0) return 0;
    const stdDed = assessmentYear === '2025-26' ? 75000 : 50000;
    const taxable = Math.max(0, parsedIncome - stdDed);
    if (taxable <= 700000) return 0;

    let tax = 0;
    if (taxable > 1500000) tax += (taxable - 1500000) * 0.3;
    if (taxable > 1200000) tax += (Math.min(taxable, 1500000) - 1200000) * 0.2;
    if (taxable > 1000000) tax += (Math.min(taxable, 1200000) - 1000000) * 0.15;
    if (taxable > 700000) tax += (Math.min(taxable, 1000000) - 700000) * 0.1;
    if (taxable > 300000) tax += (Math.min(taxable, 700000) - 300000) * 0.05;

    // Section 87A Marginal Relief: tax cannot exceed income exceeding ₹7,00,000
    const excessIncome = taxable - 700000;
    if (tax > excessIncome) {
      tax = excessIncome;
    }

    return tax * 1.04;
  }, [parsedIncome, assessmentYear]);

  const oldRegimeTax = useMemo(() => {
    if (parsedIncome <= 0) return 0;
    const stdDed = 50000;
    const taxable = Math.max(0, parsedIncome - stdDed - parsedDeductions);
    if (taxable <= 500000) return 0;

    let tax = 0;
    if (taxable > 1000000) tax += (taxable - 1000000) * 0.3;
    if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.2;
    if (taxable > 250000) tax += (Math.min(taxable, 500000) - 250000) * 0.05;

    // Section 87A Marginal Relief: tax cannot exceed income exceeding ₹5,00,000
    const excessIncome = taxable - 500000;
    if (tax > excessIncome) {
      tax = excessIncome;
    }

    return tax * 1.04;
  }, [parsedIncome, parsedDeductions]);

  const betterRegime = newRegimeTax <= oldRegimeTax ? 'New Tax Regime' : 'Old Tax Regime';
  const savings = Math.abs(oldRegimeTax - newRegimeTax);
  const bestTax = Math.min(newRegimeTax, oldRegimeTax);

  const copyBreakdown = async () => {
    const text = `Income Tax Comparison (${assessmentYear}):\nGross CTC: ${formatINR(parsedIncome)}\nNew Regime Tax: ${formatINR(newRegimeTax)}\nOld Regime Tax: ${formatINR(oldRegimeTax)}\nRecommended (${betterRegime}): ${formatINR(bestTax)}`;
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden print:block print:h-auto print:overflow-visible print:w-full">
      {/* Center Column */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-[#f8fafc] no-print print:hidden">
        {/* Fixed End-to-End Tool Header (Column Layout) */}
        <div className="w-full h-14 bg-white border-b border-slate-200 px-5 sm:px-6 shrink-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">Income Tax Calculator</h1>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-50 text-[#8646F4] border border-purple-200">
              FY {assessmentYear}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
            Compare New vs Old Tax Regime slabs with standard deduction &amp; 4% cess.
          </p>
        </div>

        {/* Scrollable Center Form Section */}
        <div className="flex-1 h-full overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4 form-section-input">
            {/* Step 1: Financial Year Slabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">1. Financial Year / Budget Slabs</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAssessmentYear('2025-26')}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    assessmentYear === '2025-26' ? 'bg-[#8646F4] text-white border-[#8646F4]' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  FY 2025–26 (Latest Budget Slabs)
                </button>
                <button
                  type="button"
                  onClick={() => setAssessmentYear('2024-25')}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    assessmentYear === '2024-25' ? 'bg-[#8646F4] text-white border-[#8646F4]' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  FY 2024–25 (Previous FY)
                </button>
              </div>
            </div>

            {/* Step 2: Amount Inputs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">2. Annual Gross CTC Salary (₹)</label>
              <input
                type="number"
                min="0"
                placeholder="Enter gross CTC (e.g. 1200000)"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                3. Old Regime Deductions (80C, 80D, HRA, NPS) (₹)
              </label>
              <input
                type="number"
                min="0"
                placeholder="Enter total deductions (e.g. 150000)"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
              <span className="text-[11px] text-slate-400 block mt-1">Includes ₹1.5L Sec 80C + Medical Insurance + HRA exemption.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Fixed Summary Sidebar */}
      <aside className="w-full lg:w-80 xl:w-96 h-full border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col justify-between shrink-0 overflow-hidden printable-slip-target">
        <div className="w-full h-14 px-5 border-b border-slate-200 shrink-0 flex items-center justify-between bg-white no-print">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Tax Comparison</h3>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">ANNUAL</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
          <div>
            <SlipPrintHeader title="INCOME TAX ASSESSMENT STATEMENT" refPrefix="TAX" subtitle={`FY ${assessmentYear} Comparison`} />

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Gross Income:</span>
                <strong className="text-slate-900 font-bold">{formatINR(parsedIncome)}</strong>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">New Regime ({assessmentYear === '2025-26' ? '₹75k' : '₹50k'} Std Ded):</span>
                <strong className="text-slate-900 font-bold">{formatINR(newRegimeTax)}</strong>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Old Regime (₹50k + Ded):</span>
                <strong className="text-slate-900 font-bold">{formatINR(oldRegimeTax)}</strong>
              </div>
            {parsedIncome > 0 ? (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mt-1">
                {savings > 0 ? `${betterRegime} saves you ${formatINR(savings)} annually.` : 'Both regimes result in equal tax payable.'}
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-500 mt-1">
                Enter salary to calculate optimal tax liability.
              </div>
            )}
          </div>
          </div>

          <div className="pt-4 mt-auto">
            <div className="p-4 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl mb-3 print:bg-transparent print:border-y-2 print:border-x-0 print:border-slate-900 print:rounded-none print:p-2 print:my-2 print:shadow-none flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 print:text-slate-900 block font-mono">Lowest Tax Payable</span>
                <span className="text-2xl font-black text-[#8646F4] print:text-slate-900 font-heading leading-tight print:font-mono print:text-base">{formatINR(bestTax)}</span>
              </div>
            </div>

            <SlipPrintFooter />

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                type="button"
                onClick={copyBreakdown}
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-3 bg-[#8646F4] hover:bg-[#7234de] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PrinterIcon />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   3. UK VAT CALCULATOR
========================================================= */
export function UkVatTool() {
  const [rate, setRate] = useState(20);
  const [mode, setMode] = useState('exclusive');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);

  const parsed = Math.max(0, parseFloat(amount) || 0);
  const vatRate = (parseFloat(rate) || 0) / 100;

  const results = useMemo(() => {
    if (mode === 'exclusive') {
      const net = parsed;
      const vat = net * vatRate;
      const gross = net + vat;
      return { net, vat, gross };
    } else {
      const gross = parsed;
      const net = vatRate > 0 ? gross / (1 + vatRate) : gross;
      const vat = gross - net;
      return { net, vat, gross };
    }
  }, [parsed, vatRate, mode]);

  const copyBreakdown = async () => {
    const text = `HMRC UK VAT Breakdown:\nNet Price: ${formatGBP(results.net)}\nVAT (${rate}%): ${formatGBP(results.vat)}\nTotal Payable: ${formatGBP(results.gross)}`;
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden print:block print:h-auto print:overflow-visible print:w-full">
      {/* Center Column */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-[#f8fafc] no-print print:hidden">
        {/* Fixed End-to-End Tool Header (Column Layout) */}
        <div className="w-full h-14 bg-white border-b border-slate-200 px-5 sm:px-6 shrink-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">UK VAT Calculator</h1>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-50 text-[#8646F4] border border-purple-200">
              HMRC UK
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
            Calculate HMRC Standard 20%, Reduced 5%, and Zero-rated VAT.
          </p>
        </div>

        {/* Scrollable Center Form Section */}
        <div className="flex-1 h-full overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4 form-section-input">
            {/* Step 1: VAT Rate Slab */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">1. HMRC VAT Rate Slab</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { r: 20, l: '20% Standard' },
                  { r: 5, l: '5% Reduced' },
                  { r: 0, l: '0% Zero-Rated' },
                ].map((s) => (
                  <button
                    key={s.r}
                    type="button"
                    onClick={() => setRate(s.r)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      rate === s.r ? 'bg-[#8646F4] text-white border-[#8646F4]' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {s.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Method */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">2. VAT Method</label>
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setMode('exclusive')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    mode === 'exclusive' ? 'bg-white text-[#8646F4] shadow-xs' : 'text-slate-600'
                  }`}
                >
                  + Add VAT (Net to Gross)
                </button>
                <button
                  type="button"
                  onClick={() => setMode('inclusive')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    mode === 'inclusive' ? 'bg-white text-[#8646F4] shadow-xs' : 'text-slate-600'
                  }`}
                >
                  − Extract VAT (Gross to Net)
                </button>
              </div>
            </div>

            {/* Step 3: Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                3. {mode === 'exclusive' ? 'Net Amount (£)' : 'Gross Amount with VAT (£)'}
              </label>
              <input
                type="number"
                min="0"
                placeholder="Enter amount (e.g. 1000)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Fixed Summary Sidebar */}
      <aside className="w-full lg:w-80 xl:w-96 h-full border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col justify-between shrink-0 overflow-hidden printable-slip-target">
        <div className="w-full h-14 px-5 border-b border-slate-200 shrink-0 flex items-center justify-between bg-white no-print">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">HMRC Summary</h3>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">VAT {rate}%</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
          <div>
            <SlipPrintHeader title="HMRC UK VAT STATEMENT" refPrefix="VAT-UK" subtitle={`HMRC VAT Rate: ${rate}% (${mode.toUpperCase()})`} />

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Net Price:</span>
                <strong className="text-slate-900 font-bold">{formatGBP(results.net)}</strong>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">VAT ({rate}%):</span>
                <strong className="text-slate-900 font-bold">{formatGBP(results.vat)}</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-auto">
            <div className="p-4 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl mb-3 print:bg-transparent print:border-y-2 print:border-x-0 print:border-slate-900 print:rounded-none print:p-2 print:my-2 print:shadow-none flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 print:text-slate-900 block font-mono">Total Payable (£)</span>
                <span className="text-2xl font-black text-[#8646F4] print:text-slate-900 font-heading leading-tight print:font-mono print:text-base">{formatGBP(results.gross)}</span>
              </div>
            </div>

            <SlipPrintFooter />

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                type="button"
                onClick={copyBreakdown}
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-3 bg-[#8646F4] hover:bg-[#7234de] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PrinterIcon />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   4. UAE VAT CALCULATOR
========================================================= */
export function UaeVatTool() {
  const [mode, setMode] = useState('exclusive');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);

  const parsed = Math.max(0, parseFloat(amount) || 0);

  const results = useMemo(() => {
    if (mode === 'exclusive') {
      const net = parsed;
      const vat = net * 0.05;
      const gross = net + vat;
      return { net, vat, gross };
    } else {
      const gross = parsed;
      const net = gross / 1.05;
      const vat = gross - net;
      return { net, vat, gross };
    }
  }, [parsed, mode]);

  const copyBreakdown = async () => {
    const text = `UAE FTA 5% VAT Breakdown:\nNet Amount: ${formatAED(results.net)}\nVAT (5%): ${formatAED(results.vat)}\nTotal in AED: ${formatAED(results.gross)}`;
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden print:block print:h-auto print:overflow-visible print:w-full">
      {/* Center Column */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-[#f8fafc] no-print print:hidden">
        {/* Fixed End-to-End Tool Header (Column Layout) */}
        <div className="w-full h-14 bg-white border-b border-slate-200 px-5 sm:px-6 shrink-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">UAE VAT Calculator</h1>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-50 text-[#8646F4] border border-purple-200">
              UAE FTA 5%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
            Calculate 5% UAE Federal Tax Authority VAT and net amounts.
          </p>
        </div>

        {/* Scrollable Center Form Section */}
        <div className="flex-1 h-full overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4 form-section-input">
            {/* Step 1: VAT Rate Slab */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">1. UAE Federal Tax Authority Rate</label>
              <div className="p-2.5 rounded-lg bg-purple-50 text-[#8646F4] font-bold text-xs border border-purple-200">
                Standard Rate: 5.0% VAT (Federal Decree-Law No. 8)
              </div>
            </div>

            {/* Step 2: Method */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">2. Calculation Method</label>
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setMode('exclusive')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    mode === 'exclusive' ? 'bg-white text-[#8646F4] shadow-xs' : 'text-slate-600'
                  }`}
                >
                  + Add 5% VAT
                </button>
                <button
                  type="button"
                  onClick={() => setMode('inclusive')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    mode === 'inclusive' ? 'bg-white text-[#8646F4] shadow-xs' : 'text-slate-600'
                  }`}
                >
                  − Extract 5% VAT
                </button>
              </div>
            </div>

            {/* Step 3: Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                3. {mode === 'exclusive' ? 'Base Amount (AED)' : 'Gross Inclusive Amount (AED)'}
              </label>
              <input
                type="number"
                min="0"
                placeholder="Enter amount (e.g. 5000)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Fixed Summary Sidebar */}
      <aside className="w-full lg:w-80 xl:w-96 h-full border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col justify-between shrink-0 overflow-hidden printable-slip-target">
        <div className="w-full h-14 px-5 border-b border-slate-200 shrink-0 flex items-center justify-between bg-white no-print">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">UAE FTA Summary</h3>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">5% VAT</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
          <div>
            <SlipPrintHeader title="UAE FTA 5% VAT STATEMENT" refPrefix="VAT-UAE" subtitle={`UAE FTA Standard Rate: 5.0% (${mode.toUpperCase()})`} />

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Net Amount:</span>
                <strong className="text-slate-900 font-bold">{formatAED(results.net)}</strong>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">VAT (5%):</span>
                <strong className="text-slate-900 font-bold">{formatAED(results.vat)}</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-auto">
            <div className="p-4 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl mb-3 print:bg-transparent print:border-y-2 print:border-x-0 print:border-slate-900 print:rounded-none print:p-2 print:my-2 print:shadow-none flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 print:text-slate-900 block font-mono">Total in AED</span>
                <span className="text-2xl font-black text-[#8646F4] print:text-slate-900 font-heading leading-tight print:font-mono print:text-base">{formatAED(results.gross)}</span>
              </div>
            </div>

            <SlipPrintFooter />

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                type="button"
                onClick={copyBreakdown}
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-3 bg-[#8646F4] hover:bg-[#7234de] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PrinterIcon />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   5. FREE PAYSLIP GENERATOR
========================================================= */
export function PayslipGeneratorTool() {
  const [empName, setEmpName] = useState('');
  const [empId, setEmpId] = useState('');
  const [month, setMonth] = useState('');
  const [basic, setBasic] = useState('');
  const [hra, setHra] = useState('');
  const [allowance, setAllowance] = useState('');
  const [pf, setPf] = useState('');
  const [tds, setTds] = useState('');
  const [copied, setCopied] = useState(false);

  const b = Math.max(0, parseFloat(basic) || 0);
  const h = Math.max(0, parseFloat(hra) || 0);
  const a = Math.max(0, parseFloat(allowance) || 0);
  const totalEarnings = b + h + a;

  const p = Math.max(0, parseFloat(pf) || 0);
  const t = Math.max(0, parseFloat(tds) || 0);
  const totalDeductions = p + t;

  const netPay = totalEarnings - totalDeductions;

  const copyBreakdown = async () => {
    const text = `Salary Slip Breakdown (${month || 'Monthly'}):\nEmployee: ${empName || 'N/A'} (${empId || 'ID: N/A'})\nGross Earnings: ${formatINR(totalEarnings)}\nTotal Deductions: ${formatINR(totalDeductions)}\nNet Take-Home: ${formatINR(netPay)}`;
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden print:block print:h-auto print:overflow-visible print:w-full">
      {/* Center Column */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-[#f8fafc] no-print print:hidden">
        {/* Fixed End-to-End Tool Header (Column Layout) */}
        <div className="w-full h-14 bg-white border-b border-slate-200 px-5 sm:px-6 shrink-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">Free Payslip Generator</h1>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-50 text-[#8646F4] border border-purple-200">
              Salary Slip
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
            Generate, customize, and print formal monthly employee salary pay slips.
          </p>
        </div>

        {/* Scrollable Center Form Section */}
        <div className="flex-1 h-full overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4 form-section-input">
            {/* Employee Meta Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Employee Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-bold text-slate-900 focus:outline-none focus:border-[#8646F4]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Employee ID</label>
                <input
                  type="text"
                  placeholder="e.g. EMP-1042"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-bold text-slate-900 focus:outline-none focus:border-[#8646F4]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pay Period / Month</label>
                <input
                  type="text"
                  placeholder="e.g. October 2026"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-bold text-slate-900 focus:outline-none focus:border-[#8646F4]"
                />
              </div>
            </div>

            {/* Balanced Earnings & Deductions Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              {/* Earnings Card */}
              <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col gap-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <strong className="text-xs font-bold text-slate-800 uppercase tracking-wider">Earnings (₹)</strong>
                  <span className="text-xs font-bold text-purple-700">{formatINR(totalEarnings)}</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Basic Salary</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={basic}
                    onChange={(e) => setBasic(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-lg border border-slate-200 bg-white font-semibold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">House Rent Allowance (HRA)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={hra}
                    onChange={(e) => setHra(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-lg border border-slate-200 bg-white font-semibold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Special / Other Allowances</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={allowance}
                    onChange={(e) => setAllowance(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-lg border border-slate-200 bg-white font-semibold text-xs"
                  />
                </div>
              </div>

              {/* Deductions Card */}
              <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col gap-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <strong className="text-xs font-bold text-slate-800 uppercase tracking-wider">Deductions (₹)</strong>
                  <span className="text-xs font-bold text-rose-600">−{formatINR(totalDeductions)}</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Provident Fund (PF)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={pf}
                    onChange={(e) => setPf(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-lg border border-slate-200 bg-white font-semibold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tax Withheld (TDS)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={tds}
                    onChange={(e) => setTds(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-lg border border-slate-200 bg-white font-semibold text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Payslip Aside */}
      <aside className="w-full lg:w-80 xl:w-96 h-full border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col justify-between shrink-0 overflow-hidden printable-slip-target text-xs">
        <div className="w-full h-14 px-5 border-b border-slate-200 shrink-0 flex items-center justify-between bg-white no-print">
          <div>
            <h3 className="font-bold text-xs text-slate-900 tracking-tight">SALARY SLIP</h3>
            <span className="text-[10px] text-slate-500">{month || 'Monthly Statement'}</span>
          </div>
          <div className="text-right">
            <strong className="text-purple-700 block text-xs">{empName || 'Employee Name'}</strong>
            <span className="text-[10px] text-slate-400">{empId || 'ID: —'}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
          <div>
            <SlipPrintHeader
              title="EMPLOYEE SALARY SLIP"
              refPrefix="PAYSLIP"
              subtitle={empName ? `${empName} (${empId || 'ID: —'}) • ${month || 'Monthly'}` : (month || 'Monthly Statement')}
            />

            <div className="grid grid-cols-2 print:flex print:flex-col gap-2 mb-3">
              <div className="bg-slate-50 print:bg-transparent p-2.5 print:p-2 rounded-lg print:rounded-none border border-slate-100 print:border-slate-300">
                <strong className="block text-slate-700 text-[10px] uppercase mb-1 font-mono">Earnings</strong>
                <div className="flex justify-between py-0.5 text-slate-600">
                  <span>Basic Salary:</span>
                  <strong className="text-slate-900">{formatINR(b)}</strong>
                </div>
                <div className="flex justify-between py-0.5 text-slate-600">
                  <span>HRA Allowance:</span>
                  <strong className="text-slate-900">{formatINR(h)}</strong>
                </div>
                <div className="flex justify-between py-0.5 text-slate-600">
                  <span>Special Allowance:</span>
                  <strong className="text-slate-900">{formatINR(a)}</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 mt-1 font-bold text-slate-900 font-mono">
                  <span>Gross Earnings:</span>
                  <span>{formatINR(totalEarnings)}</span>
                </div>
              </div>

              <div className="bg-slate-50 print:bg-transparent p-2.5 print:p-2 rounded-lg print:rounded-none border border-slate-100 print:border-slate-300">
                <strong className="block text-slate-700 text-[10px] uppercase mb-1 font-mono">Deductions</strong>
                <div className="flex justify-between py-0.5 text-slate-600">
                  <span>Provident Fund (PF):</span>
                  <strong className="text-slate-900">{formatINR(p)}</strong>
                </div>
                <div className="flex justify-between py-0.5 text-slate-600">
                  <span>Tax Withheld (TDS):</span>
                  <strong className="text-slate-900">{formatINR(t)}</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 mt-1 font-bold text-rose-600 print:text-slate-900 font-mono">
                  <span>Total Deductions:</span>
                  <span>{formatINR(totalDeductions)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-auto">
            <div className="p-3.5 bg-purple-50 print:bg-transparent rounded-xl print:rounded-none border border-purple-100 print:border-y-2 print:border-x-0 print:border-slate-900 flex justify-between items-center mb-3 print:p-2 print:my-2">
              <span className="font-semibold text-purple-900 print:text-slate-900 font-mono">Net Take-Home:</span>
              <strong className="text-xl font-bold text-[#8646F4] print:text-slate-900 font-heading print:font-mono print:text-base">{formatINR(netPay)}</strong>
            </div>

            <SlipPrintFooter />

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                type="button"
                onClick={copyBreakdown}
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-3 bg-[#8646F4] hover:bg-[#7234de] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PrinterIcon />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   6. PAYCHECK CALCULATOR
========================================================= */
export function PaycheckTool() {
  const [taxRate, setTaxRate] = useState(20);
  const [grossSalary, setGrossSalary] = useState('');
  const [deductions, setDeductions] = useState('');
  const [copied, setCopied] = useState(false);

  const parsedGross = Math.max(0, parseFloat(grossSalary) || 0);
  const parsedTax = parsedGross * ((parseFloat(taxRate) || 0) / 100);
  const parsedDed = Math.max(0, parseFloat(deductions) || 0);
  const netTakeHome = Math.max(0, parsedGross - parsedTax - parsedDed);

  const copyBreakdown = async () => {
    const text = `Paycheck Breakdown:\nGross Salary: ${formatUSD(parsedGross)}\nTaxes (${taxRate}%): -${formatUSD(parsedTax)}\nDeductions: -${formatUSD(parsedDed)}\nNet Take-Home: ${formatUSD(netTakeHome)}`;
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden print:block print:h-auto print:overflow-visible print:w-full">
      {/* Center Column */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-[#f8fafc] no-print print:hidden">
        {/* Fixed End-to-End Tool Header (Column Layout) */}
        <div className="w-full h-14 bg-white border-b border-slate-200 px-5 sm:px-6 shrink-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">Take-Home Paycheck Calculator</h1>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-50 text-[#8646F4] border border-purple-200">
              Salary
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
            Calculate net take-home salary after taxes, social security, and deductions.
          </p>
        </div>

        {/* Scrollable Center Form Section */}
        <div className="flex-1 h-full overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4 form-section-input">
            {/* Step 1: Tax Rate Slab */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">1. Estimated Tax Withholding Rate (%)</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[10, 15, 20, 25].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTaxRate(t)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      taxRate === t ? 'bg-[#8646F4] text-white border-[#8646F4]' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {t}%
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Gross Paycheck */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">2. Gross Paycheck ($)</label>
              <input
                type="number"
                min="0"
                placeholder="Enter gross paycheck (e.g. 5000)"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
            </div>

            {/* Step 3: Deductions */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">3. Benefits &amp; Pre-Tax Deductions ($)</label>
              <input
                type="number"
                min="0"
                placeholder="Enter benefits/deductions (e.g. 350)"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Fixed Summary Sidebar */}
      <aside className="w-full lg:w-80 xl:w-96 h-full border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col justify-between shrink-0 overflow-hidden printable-slip-target">
        <div className="w-full h-14 px-5 border-b border-slate-200 shrink-0 flex items-center justify-between bg-white no-print">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Paycheck Breakdown</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">NET</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
          <div>
            <SlipPrintHeader title="TAKE-HOME PAYCHECK BREAKDOWN" refPrefix="PAYCHECK" subtitle={`Tax Withholding: ${taxRate}%`} />

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Gross Salary:</span>
                <strong className="text-slate-900 font-bold">{formatUSD(parsedGross)}</strong>
              </div>
              <div className="flex justify-between py-1.5 text-rose-600 border-b border-slate-100">
                <span className="font-medium text-rose-600">Taxes Withheld ({taxRate}%):</span>
                <strong className="font-bold">−{formatUSD(parsedTax)}</strong>
              </div>
              <div className="flex justify-between py-1.5 text-rose-600 border-b border-slate-100">
                <span className="font-medium text-rose-600">Other Deductions:</span>
                <strong className="font-bold">−{formatUSD(parsedDed)}</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-auto">
            <div className="p-4 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl mb-3 print:bg-transparent print:border-y-2 print:border-x-0 print:border-slate-900 print:rounded-none print:p-2 print:my-2 print:shadow-none flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 print:text-slate-900 block font-mono">Net Take-Home Pay</span>
                <span className="text-2xl font-black text-[#8646F4] print:text-slate-900 font-heading leading-tight print:font-mono print:text-base">{formatUSD(netTakeHome)}</span>
              </div>
            </div>

            <SlipPrintFooter />

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                type="button"
                onClick={copyBreakdown}
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-3 bg-[#8646F4] hover:bg-[#7234de] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PrinterIcon />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   7. HRA EXEMPTION CALCULATOR
========================================================= */
export function HraExemptionTool() {
  const [isMetro, setIsMetro] = useState(true);
  const [basicSalary, setBasicSalary] = useState('');
  const [hraReceived, setHraReceived] = useState('');
  const [rentPaid, setRentPaid] = useState('');
  const [copied, setCopied] = useState(false);

  const basic = Math.max(0, parseFloat(basicSalary) || 0);
  const hra = Math.max(0, parseFloat(hraReceived) || 0);
  const rent = Math.max(0, parseFloat(rentPaid) || 0);

  const limit1 = hra;
  const limit2 = Math.max(0, rent - 0.1 * basic);
  const limit3 = isMetro ? 0.5 * basic : 0.4 * basic;

  const exemptedHra = basic === 0 && rent === 0 && hra === 0 ? 0 : Math.min(limit1, limit2, limit3);
  const taxableHra = Math.max(0, hra - exemptedHra);

  const copyBreakdown = async () => {
    const text = `HRA Exemption Breakdown (Sec 10(13A)):\nBasic Salary: ${formatINR(basic)}\nHRA Received: ${formatINR(hra)}\nRent Paid: ${formatINR(rent)}\nTax-Exempt HRA: ${formatINR(exemptedHra)}\nTaxable HRA: ${formatINR(taxableHra)}`;
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden print:block print:h-auto print:overflow-visible print:w-full">
      {/* Center Column */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-[#f8fafc] no-print print:hidden">
        {/* Fixed End-to-End Tool Header (Column Layout) */}
        <div className="w-full h-14 bg-white border-b border-slate-200 px-5 sm:px-6 shrink-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">HRA Exemption Calculator</h1>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-50 text-[#8646F4] border border-purple-200">
              Sec 10(13A)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
            Calculate tax-exempt House Rent Allowance under the Income Tax Act.
          </p>
        </div>

        {/* Scrollable Center Form Section */}
        <div className="flex-1 h-full overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4 form-section-input">
            {/* Step 1: City Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">1. City Category (Exemption Slab)</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsMetro(true)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    isMetro ? 'bg-[#8646F4] text-white border-[#8646F4]' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Metro City (50% Basic)
                </button>
                <button
                  type="button"
                  onClick={() => setIsMetro(false)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    !isMetro ? 'bg-[#8646F4] text-white border-[#8646F4]' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Non-Metro City (40% Basic)
                </button>
              </div>
            </div>

            {/* Step 2: Basic Salary */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">2. Annual Basic Salary + DA (₹)</label>
              <input
                type="number"
                min="0"
                placeholder="Enter annual basic (e.g. 500000)"
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
            </div>

            {/* Step 3: HRA Received */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">3. Total Annual HRA Received from Employer (₹)</label>
              <input
                type="number"
                min="0"
                placeholder="Enter HRA received (e.g. 200000)"
                value={hraReceived}
                onChange={(e) => setHraReceived(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
            </div>

            {/* Step 4: Rent Paid */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">4. Total Annual Rent Paid (₹)</label>
              <input
                type="number"
                min="0"
                placeholder="Enter annual rent paid (e.g. 240000)"
                value={rentPaid}
                onChange={(e) => setRentPaid(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Fixed Summary Sidebar */}
      <aside className="w-full lg:w-80 xl:w-96 h-full border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col justify-between shrink-0 overflow-hidden printable-slip-target">
        <div className="w-full h-14 px-5 border-b border-slate-200 shrink-0 flex items-center justify-between bg-white no-print">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Exemption 3-Rules</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">SEC 10(13A)</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
          <div>
            <SlipPrintHeader title="HRA EXEMPTION STATEMENT (SEC 10(13A))" refPrefix="HRA" subtitle={isMetro ? 'Metro City (50% Basic)' : 'Non-Metro City (40% Basic)'} />

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">1. HRA Received:</span>
                <strong className="text-slate-900 font-bold">{formatINR(hra)}</strong>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">2. Rent − 10% Basic:</span>
                <strong className="text-slate-900 font-bold">{formatINR(limit2)}</strong>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">3. {isMetro ? '50%' : '40%'} of Basic:</span>
                <strong className="text-slate-900 font-bold">{formatINR(limit3)}</strong>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold pt-1.5">
                <span>Tax-Exempt HRA (Lowest):</span>
                <span>{formatINR(exemptedHra)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-auto">
            <div className="p-4 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl mb-3 print:bg-transparent print:border-y-2 print:border-x-0 print:border-slate-900 print:rounded-none print:p-2 print:my-2 print:shadow-none flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 print:text-slate-900 block font-mono">Taxable HRA Amount</span>
                <span className="text-2xl font-black text-slate-900 font-heading leading-tight print:font-mono print:text-base">{formatINR(taxableHra)}</span>
              </div>
            </div>

            <SlipPrintFooter />

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                type="button"
                onClick={copyBreakdown}
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-3 bg-[#8646F4] hover:bg-[#7234de] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PrinterIcon />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   8. GRATUITY CALCULATOR
========================================================= */
export function GratuityTool() {
  const [lastSalary, setLastSalary] = useState('');
  const [tenure, setTenure] = useState('');
  const [copied, setCopied] = useState(false);

  const salary = Math.max(0, parseFloat(lastSalary) || 0);
  const years = Math.max(0, parseFloat(tenure) || 0);

  const rawGratuity = (15 * salary * years) / 26;
  const gratuityPayout = Math.min(2000000, rawGratuity);

  const copyBreakdown = async () => {
    const text = `Gratuity Payout Summary:\nLast Salary (Basic+DA): ${formatINR(salary)}\nYears of Service: ${years} Years\nGratuity Benefit: ${formatINR(gratuityPayout)}`;
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden print:block print:h-auto print:overflow-visible print:w-full">
      {/* Center Column */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-[#f8fafc] no-print print:hidden">
        {/* Fixed End-to-End Tool Header (Column Layout) */}
        <div className="w-full h-14 bg-white border-b border-slate-200 px-5 sm:px-6 shrink-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">Gratuity Calculator</h1>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-50 text-[#8646F4] border border-purple-200">
              Gratuity Act
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
            Calculate employee gratuity payout under Payment of Gratuity Act.
          </p>
        </div>

        {/* Scrollable Center Form Section */}
        <div className="flex-1 h-full overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4 form-section-input">
            {/* Step 1: Formula Standard */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">1. Statutory Gratuity Formula</label>
              <div className="p-2.5 rounded-lg bg-purple-50 text-[#8646F4] font-bold text-xs border border-purple-200">
                15 × (Monthly Basic + DA) × Completed Years / 26 Working Days
              </div>
            </div>

            {/* Step 2: Last Salary */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">2. Last Drawn Monthly Basic + DA (₹)</label>
              <input
                type="number"
                min="0"
                placeholder="Enter monthly basic + DA (e.g. 50000)"
                value={lastSalary}
                onChange={(e) => setLastSalary(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
            </div>

            {/* Step 3: Tenure */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">3. Completed Years of Service</label>
              <input
                type="number"
                min="1"
                max="50"
                placeholder="Enter years of service (e.g. 5)"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
              <span className="text-[11px] text-slate-400 block mt-1">Requires minimum 5 continuous years of employment for statutory claim.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Fixed Summary Sidebar */}
      <aside className="w-full lg:w-80 xl:w-96 h-full border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col justify-between shrink-0 overflow-hidden printable-slip-target">
        <div className="w-full h-14 px-5 border-b border-slate-200 shrink-0 flex items-center justify-between bg-white no-print">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Payout Summary</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">15/26</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
          <div>
            <SlipPrintHeader title="GRATUITY BENEFIT STATEMENT" refPrefix="GRATUITY" subtitle={`Service Tenure: ${years} Years`} />

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Last Salary:</span>
                <strong className="text-slate-900 font-bold">{formatINR(salary)}</strong>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Tenure:</span>
                <strong className="text-slate-900 font-bold">{years} Years</strong>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Statutory Cap:</span>
                <strong className="text-slate-900 font-bold">₹20,00,000</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-auto">
            <div className="p-4 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl mb-3 print:bg-transparent print:border-y-2 print:border-x-0 print:border-slate-900 print:rounded-none print:p-2 print:my-2 print:shadow-none flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 print:text-slate-900 block font-mono">Total Gratuity Payout</span>
                <span className="text-2xl font-black text-[#8646F4] print:text-slate-900 font-heading leading-tight print:font-mono print:text-base">{formatINR(gratuityPayout)}</span>
              </div>
            </div>

            <SlipPrintFooter />

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                type="button"
                onClick={copyBreakdown}
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-3 bg-[#8646F4] hover:bg-[#7234de] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PrinterIcon />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   9. PROJECT COST ESTIMATE CALCULATOR
========================================================= */
export function ProjectEstimateTool() {
  const [contingency, setContingency] = useState(15);
  const [hours, setHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [fixedExpenses, setFixedExpenses] = useState('');
  const [copied, setCopied] = useState(false);

  const h = Math.max(0, parseFloat(hours) || 0);
  const r = Math.max(0, parseFloat(hourlyRate) || 0);
  const totalLabor = h * r;
  const expenses = Math.max(0, parseFloat(fixedExpenses) || 0);
  const subtotal = totalLabor + expenses;
  const contingencyBuffer = subtotal * ((parseFloat(contingency) || 0) / 100);
  const totalEstimate = subtotal + contingencyBuffer;

  const copyBreakdown = async () => {
    const text = `Project Estimate Breakdown:\nLabor (${h}h @ $${r}/h): ${formatUSD(totalLabor)}\nDirect Costs: ${formatUSD(expenses)}\nContingency (${contingency}%): ${formatUSD(contingencyBuffer)}\nTotal Quote: ${formatUSD(totalEstimate)}`;
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden print:block print:h-auto print:overflow-visible print:w-full">
      {/* Center Column */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-[#f8fafc] no-print print:hidden">
        {/* Fixed End-to-End Tool Header (Column Layout) */}
        <div className="w-full h-14 bg-white border-b border-slate-200 px-5 sm:px-6 shrink-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">Project Cost Estimator</h1>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-50 text-[#8646F4] border border-purple-200">
              Agency &amp; Freelance
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
            Estimate client quotes, labor hours, direct costs, and contingency risk buffer.
          </p>
        </div>

        {/* Scrollable Center Form Section */}
        <div className="flex-1 h-full overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4 form-section-input">
            {/* Step 1: Contingency Buffer */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">1. Risk Contingency Buffer Slab (%)</label>
              <div className="grid grid-cols-5 gap-1.5">
                {[0, 10, 15, 20, 25].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setContingency(c)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      contingency === c ? 'bg-[#8646F4] text-white border-[#8646F4]' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {c}%
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Hours & Rate */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">2. Estimated Labor Hours</label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 100"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">3. Hourly Rate ($)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 50"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
                />
              </div>
            </div>

            {/* Step 3: Fixed Expenses */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">4. Fixed Materials &amp; Third-Party Costs ($)</label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 500"
                value={fixedExpenses}
                onChange={(e) => setFixedExpenses(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8646F4] focus:ring-1 focus:ring-[#8646F4]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Fixed Summary Sidebar */}
      <aside className="w-full lg:w-80 xl:w-96 h-full border-t lg:border-t-0 lg:border-l border-slate-200 bg-white flex flex-col justify-between shrink-0 overflow-hidden printable-slip-target">
        <div className="w-full h-14 px-5 border-b border-slate-200 shrink-0 flex items-center justify-between bg-white no-print">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Quote Breakdown</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">{contingency}% BUFFER</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
          <div>
            <SlipPrintHeader title="PROJECT COST ESTIMATE QUOTE" refPrefix="ESTIMATE" subtitle={`Contingency Buffer: ${contingency}%`} />

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Labor ({h}h @ ${r}/h):</span>
                <strong className="text-slate-900 font-bold">{formatUSD(totalLabor)}</strong>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Fixed Expenses:</span>
                <strong className="text-slate-900 font-bold">{formatUSD(expenses)}</strong>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600 border-b border-slate-100">
                <span className="font-medium text-slate-500">Contingency ({contingency}%):</span>
                <strong className="text-slate-900 font-bold">{formatUSD(contingencyBuffer)}</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-auto">
            <div className="p-4 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl mb-3 print:bg-transparent print:border-y-2 print:border-x-0 print:border-slate-900 print:rounded-none print:p-2 print:my-2 print:shadow-none flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 print:text-slate-900 block font-mono">Recommended Quote</span>
                <span className="text-2xl font-black text-[#8646F4] print:text-slate-900 font-heading leading-tight print:font-mono print:text-base">{formatUSD(totalEstimate)}</span>
              </div>
            </div>

            <SlipPrintFooter />

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                type="button"
                onClick={copyBreakdown}
                className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-3 bg-[#8646F4] hover:bg-[#7234de] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PrinterIcon />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
