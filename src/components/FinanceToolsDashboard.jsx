import { useState, useMemo, useEffect } from 'react';
import { TOOL_CATEGORIES, ALL_TOOLS } from './tools/toolsData';
import { applySEO } from '../utils/seoHelper';
import {
  CalculatorIcon,
  ReceiptIcon,
  PercentIcon,
  LandmarkIcon,
  FileTextIcon,
  UserCheckIcon,
  CoinsIcon,
  AwardIcon,
  BriefcaseIcon,
  SearchIcon,
  ChevronDownIcon,
} from './tools/ToolIcons';
import {
  IndiaGstTool,
  IncomeTaxIndiaTool,
  UkVatTool,
  UaeVatTool,
  PayslipGeneratorTool,
  PaycheckTool,
  HraExemptionTool,
  GratuityTool,
  ProjectEstimateTool,
} from './tools/ToolPanels';

const ICON_MAP = {
  CalculatorIcon,
  ReceiptIcon,
  PercentIcon,
  LandmarkIcon,
  FileTextIcon,
  UserCheckIcon,
  CoinsIcon,
  AwardIcon,
  BriefcaseIcon,
};

export function FinanceToolsDashboard({ initialToolId = 'gst-calculator', onDirectDownload }) {
  const [selectedToolId, setSelectedToolId] = useState(initialToolId);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [prevInitialId, setPrevInitialId] = useState(initialToolId);
  if (initialToolId !== prevInitialId) {
    setPrevInitialId(initialToolId);
    if (ALL_TOOLS.some((t) => t.id === initialToolId)) {
      setSelectedToolId(initialToolId);
    }
  }

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return TOOL_CATEGORIES;
    const q = searchQuery.toLowerCase();
    return TOOL_CATEGORIES.map((cat) => ({
      ...cat,
      tools: cat.tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDesc.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.tools.length > 0);
  }, [searchQuery]);

  const activeTool = useMemo(() => {
    return ALL_TOOLS.find((t) => t.id === selectedToolId) || ALL_TOOLS[0];
  }, [selectedToolId]);

  useEffect(() => {
    if (activeTool) {
      applySEO(activeTool.id);
    }
  }, [activeTool]);

  const handleSelectTool = (toolId) => {
    setSelectedToolId(toolId);
    setMobileMenuOpen(false);
    window.history.pushState(null, '', `#tools/${encodeURIComponent(toolId)}`);
  };

  const renderActiveToolPanel = () => {
    switch (selectedToolId) {
      case 'gst-calculator':
        return <IndiaGstTool />;
      case 'income-tax-india':
        return <IncomeTaxIndiaTool />;
      case 'vat-uk':
        return <UkVatTool />;
      case 'vat-uae':
        return <UaeVatTool />;
      case 'payslip-generator':
        return <PayslipGeneratorTool />;
      case 'paycheck-calc':
        return <PaycheckTool />;
      case 'hra-exemption':
        return <HraExemptionTool />;
      case 'gratuity-calc':
        return <GratuityTool />;
      case 'project-estimate':
        return <ProjectEstimateTool />;
      default:
        return <IndiaGstTool />;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] mt-16 bg-[#f8fafc] flex overflow-hidden print:mt-0 print:h-auto print:overflow-visible print:block">
      {/* Mobile Tool Selector Header (< 1024px) */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-30 bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs no-print print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tool:</span>
          <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">{activeTool.name}</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="finance-tools-navigation"
          className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>{mobileMenuOpen ? 'Close Menu' : `All ${ALL_TOOLS.length} Tools`}</span>
          <ChevronDownIcon className={`size-3 text-slate-500 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Left Fixed Sidebar (Exact Full Height from y=64px to bottom) */}
      <aside
        id="finance-tools-navigation"
        className={`w-full lg:w-72 xl:w-80 lg:h-full border-r border-slate-200 bg-white flex flex-col shrink-0 z-20 transition-all duration-200 no-print print:hidden ${
          mobileMenuOpen ? 'fixed inset-x-0 top-[112px] bottom-0 h-[calc(100dvh-112px)] w-full bg-white block' : 'hidden lg:flex'
        }`}
      >
        {/* Search Header - Exact h-14 matching middle and right headers */}
        <div className="h-14 px-4 bg-white border-b border-slate-200 shrink-0 flex items-center">
          <label htmlFor="dashboard-tools-search" className="sr-only">Search Tools</label>
          <div className="flex items-center gap-2.5 w-full">
            <SearchIcon className="size-4 text-slate-400 shrink-0 pointer-events-none" />
            <input
              id="dashboard-tools-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search calculators..."
              className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 p-0 shadow-none"
            />
          </div>
        </div>

        {/* Tools Navigation List */}
        <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-3">
          {filteredCategories.length === 0 && (
            <p role="status" className="text-xs text-slate-500 text-center px-4 py-8">
              No tools found for “{searchQuery.trim()}”. Try a different search.
            </p>
          )}
          {filteredCategories.map((category) => (
            <div key={category.id}>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1 px-2">
                {category.name}
              </span>
              <div className="flex flex-col gap-0.5">
                {category.tools.map((tool) => {
                  const isSelected = selectedToolId === tool.id;
                  const IconComponent = ICON_MAP[tool.icon] || CalculatorIcon;

                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => handleSelectTool(tool.id)}
                      aria-current={isSelected ? 'page' : undefined}
                      className={`w-full text-left px-2.5 py-2 rounded-lg transition-all flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? 'bg-[#EDE9FE] text-[#8646F4] font-bold shadow-2xs'
                          : 'hover:bg-slate-100/80 text-slate-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <IconComponent
                          className={`size-4 shrink-0 transition-colors ${isSelected ? 'text-[#8646F4]' : 'text-slate-400 group-hover:text-slate-600'}`}
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs truncate leading-snug">
                            {tool.name}
                          </span>
                          <span className={`text-[10px] truncate ${isSelected ? 'text-purple-600 font-semibold' : 'text-slate-400'}`}>
                            {tool.region}
                          </span>
                        </div>
                      </div>

                      {tool.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                            isSelected ? 'bg-[#8646F4] text-white' : 'bg-purple-100 text-[#8646F4]'
                          }`}
                        >
                          {tool.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-semibold text-[11px]">Invio Offline App</span>
            <button
              type="button"
              onClick={() => onDirectDownload?.()}
              className="text-[#8646F4] hover:underline font-bold text-[11px] cursor-pointer"
            >
              Download →
            </button>
          </div>
        </div>
      </aside>

      {/* Center + Right Workspace Area (Exact full height from top to bottom) */}
      <main className="flex-1 h-full overflow-hidden bg-[#f8fafc] pt-12 lg:pt-0 print:pt-0 print:overflow-visible print:block print:w-full print:h-auto print:bg-white">
        {renderActiveToolPanel()}
      </main>
    </div>
  );
}

export default FinanceToolsDashboard;
