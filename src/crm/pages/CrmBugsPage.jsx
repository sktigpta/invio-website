import { useState, useEffect, useCallback } from 'react';
import { crmApi } from '../services/crmApi';
import { useCrmAuth } from '../context/CrmAuthContext';
import { RefreshCwIcon, AlertCircleIcon, SearchIcon, CheckCircleIcon } from '../components/CrmIcons';

const STATUS_STYLES = {
  open: 'bg-blue-100 text-blue-800 border-blue-200',
  investigating: 'bg-amber-100 text-amber-800 border-amber-200',
  resolved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export function CrmBugsPage() {
  const { isManagerOrAdmin } = useCrmAuth();
  const [bugs, setBugs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [selected, setSelected] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [unconfigured, setUnconfigured] = useState(false);

  const fetchBugs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await crmApi.getBugs({ status, search, page, limit: 20 });
      setBugs(res.bugs || []);
      setTotalPages(res.totalPages || 1);
      setUnconfigured(Boolean(res.unconfigured));
    } catch (err) {
      setError(err.message || 'Failed to fetch bug reports.');
    } finally {
      setLoading(false);
    }
  }, [status, search, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBugs();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchBugs]);

  async function handleStatusChange(ticketId, nextStatus) {
    setStatusLoading(true);
    setFeedback('');
    try {
      await crmApi.updateBugStatus(ticketId, nextStatus);
      setFeedback(`Bug ${ticketId} marked as ${nextStatus}.`);
      setSelected((s) => (s ? { ...s, status: nextStatus } : s));
      fetchBugs();
    } catch (err) {
      setError(err.message || 'Failed to update bug status.');
    } finally {
      setStatusLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Bug Reports & Issues</h2>
          <p className="text-xs text-slate-500">
            Reports submitted from Invio Desktop app and public website.
          </p>
        </div>
        <button
          onClick={fetchBugs}
          disabled={loading}
          className="p-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg shadow-xs transition disabled:opacity-50 cursor-pointer"
          title="Refresh"
        >
          <RefreshCwIcon className={`size-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="size-4 text-emerald-600" />
            <span>{feedback}</span>
          </div>
          <button onClick={() => setFeedback('')} className="text-emerald-700 hover:text-emerald-900 text-sm">✕</button>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-xs font-medium text-red-700 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircleIcon className="size-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="text-red-700 hover:text-red-900 text-sm">✕</button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search ticket number, title, reporter email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-600 text-xs"
          />
          <SearchIcon className="size-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-600"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4 whitespace-nowrap">Ticket</th>
                <th className="py-2.5 px-4 whitespace-nowrap">Title</th>
                <th className="py-2.5 px-4 whitespace-nowrap">Category</th>
                <th className="py-2.5 px-4 whitespace-nowrap">Severity</th>
                <th className="py-2.5 px-4 whitespace-nowrap">Reporter</th>
                <th className="py-2.5 px-4 whitespace-nowrap">Status</th>
                <th className="py-2.5 px-4 whitespace-nowrap">Reported</th>
                <th className="py-2.5 px-4 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    <div className="size-6 border-2 border-slate-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-2" />
                    Loading bug reports...
                  </td>
                </tr>
              ) : bugs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    {unconfigured ? 'Bug storage is unconfigured (Google Sheets key missing).' : 'No bug reports found.'}
                  </td>
                </tr>
              ) : (
                bugs.map((b) => (
                  <tr key={b.ticketId} className="hover:bg-slate-50/70 transition">
                    <td className="py-2 px-4 font-mono font-bold text-purple-700 whitespace-nowrap">{b.ticketId}</td>
                    <td className="py-2 px-4 font-semibold text-slate-900 max-w-xs truncate" title={b.title}>{b.title}</td>
                    <td className="py-2 px-4 capitalize whitespace-nowrap text-slate-600">{b.category || 'general'}</td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        b.severity === 'critical' ? 'bg-red-100 text-red-700' :
                        b.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                        b.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {b.severity || 'medium'}
                      </span>
                    </td>
                    <td className="py-2 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap">{b.email || 'Anonymous'}</td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${STATUS_STYLES[b.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-slate-500 whitespace-nowrap">
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-2 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelected(b)}
                        className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs rounded-md transition cursor-pointer"
                      >
                        View &rarr;
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div>Page {page} of {totalPages}</div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-slate-200 rounded-md disabled:opacity-40 hover:bg-slate-50 transition cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border border-slate-200 rounded-md disabled:opacity-40 hover:bg-slate-50 transition cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{selected.title}</h3>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                  {selected.ticketId} · {selected.category} · {selected.os} · v{selected.appVersion}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 text-lg leading-none cursor-pointer">✕</button>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</p>
              <div className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                {selected.description}
              </div>
            </div>

            {selected.steps && (
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Steps to Reproduce</p>
                <div className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {selected.steps}
                </div>
              </div>
            )}

            {isManagerOrAdmin && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Update Status:</span>
                <div className="flex items-center gap-1.5">
                  {['open', 'investigating', 'resolved'].map((st) => (
                    <button
                      key={st}
                      disabled={statusLoading}
                      onClick={() => handleStatusChange(selected.ticketId, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition disabled:opacity-50 cursor-pointer ${
                        selected.status === st ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
