import { useState, useEffect, useCallback } from 'react';
import { crmApi } from '../services/crmApi';
import { useCrmAuth } from '../context/CrmAuthContext';
import { RefreshCwIcon, AlertCircleIcon, SearchIcon, CheckCircleIcon } from '../components/CrmIcons';

const STATUS_STYLES = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  read: 'bg-slate-100 text-slate-700 border-slate-200',
  replied: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  archived: 'bg-purple-100 text-purple-800 border-purple-200',
};

export function CrmContactsPage() {
  const { isManagerOrAdmin } = useCrmAuth();
  const [contacts, setContacts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [breachedOnly, setBreachedOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [selected, setSelected] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [unconfigured, setUnconfigured] = useState(false);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await crmApi.getContacts({ status, breached: breachedOnly, search, page, limit: 20 });
      setContacts(res.contacts || []);
      setTotalPages(res.totalPages || 1);
      setUnconfigured(Boolean(res.unconfigured));
    } catch (err) {
      setError(err.message || 'Failed to fetch contact messages.');
    } finally {
      setLoading(false);
    }
  }, [status, breachedOnly, search, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchContacts();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchContacts]);

  async function handleStatusChange(id, nextStatus) {
    setStatusLoading(true);
    setFeedback('');
    try {
      await crmApi.updateContactStatus(id, nextStatus);
      setFeedback(`Message marked ${nextStatus}.`);
      setSelected((s) => (s ? { ...s, status: nextStatus } : s));
      fetchContacts();
    } catch (err) {
      setError(err.message || 'Failed to update status.');
    } finally {
      setStatusLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Contact Messages</h2>
          <p className="text-xs text-slate-500">
            Website contact-form submissions, stored in Google Sheets with automatic visitor acknowledgment.
          </p>
        </div>
        <button
          onClick={fetchContacts}
          disabled={loading}
          className="p-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg shadow-sm transition disabled:opacity-50 cursor-pointer self-start sm:self-auto"
          title="Refresh"
        >
          <RefreshCwIcon className={`size-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircleIcon className="size-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700 flex items-center gap-2">
          <AlertCircleIcon className="size-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search name, email, subject..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-600 text-slate-800 text-xs"
          />
          <SearchIcon className="size-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-600"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
          <button
            onClick={() => { setBreachedOnly((v) => !v); setPage(1); }}
            title="Unreplied over 20h"
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition cursor-pointer ${
              breachedOnly ? 'bg-red-600 text-white shadow-sm' : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
            }`}
          >
            ⚠ Action required
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4 whitespace-nowrap">Received</th>
                <th className="py-2.5 px-4 whitespace-nowrap">Name</th>
                <th className="py-2.5 px-4 whitespace-nowrap">Email</th>
                <th className="py-2.5 px-4 whitespace-nowrap">Subject</th>
                <th className="py-2.5 px-4 whitespace-nowrap">Status</th>
                <th className="py-2.5 px-4 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <div className="size-6 border-2 border-slate-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-2" />
                    Loading messages...
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    {unconfigured
                      ? 'Contact store is not configured yet (Google Sheets credentials missing) — nothing to show.'
                      : 'No contact messages found.'}
                  </td>
                </tr>
              ) : (
                contacts.map((c) => (
                  <tr key={c.id || c.createdAt} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-4 text-slate-500 whitespace-nowrap">
                      {c.createdAt ? new Date(c.createdAt).toLocaleString() : '—'}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 whitespace-nowrap">{c.name}</td>
                    <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap">{c.email}</td>
                    <td className="py-2.5 px-4 text-slate-700 max-w-xs truncate" title={c.message}>{c.subject}</td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${STATUS_STYLES[c.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                        {c.status}
                      </span>
                      {c.actionRequired && (
                        <span className="ml-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-red-600 text-white" title={`Waiting ${c.hoursOpen}h — SLA is 20h`}>
                          ⚠ Action required · {c.hoursOpen}h
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelected(c)}
                        className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs rounded-lg transition cursor-pointer"
                      >
                        Read →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div>Page {page} of {totalPages}</div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{selected.subject}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selected.name} · <span className="font-mono text-purple-600">{selected.email}</span> · {selected.createdAt ? new Date(selected.createdAt).toLocaleString() : ''}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 text-xl font-semibold leading-none cursor-pointer">✕</button>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">{selected.message}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="font-semibold text-slate-700 mr-1">Update Status:</span>
              {['new', 'read', 'replied', 'archived'].map((st) => (
                <button
                  key={st}
                  disabled={statusLoading}
                  onClick={() => handleStatusChange(selected.id, st)}
                  className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition disabled:opacity-50 cursor-pointer ${
                    selected.status === st ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
            <a
              href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`}
              className="block text-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition"
            >
              Reply via Email Client →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
