import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { crmApi } from '../services/crmApi';
import { useCrmAuth } from '../context/CrmAuthContext';
import { useCrmToast } from '../context/CrmToastContext';
import { useDebouncedValue, isRateLimitError } from '../hooks/useDebouncedValue';
import { RefreshCwIcon, AlertCircleIcon, PlusIcon, SearchIcon } from '../components/CrmIcons';
import { TableSkeleton } from '../../components/common/Skeleton';

export function CrmTicketsPage() {
  const { isManagerOrAdmin } = useCrmAuth();
  const { toast } = useCrmToast();
  const [tickets, setTickets] = useState([]);
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [priority, setPriority] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Create Ticket Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('general');
  const [ticketPriority, setTicketPriority] = useState('medium');
  const [ticketMessage, setTicketMessage] = useState('');
  const [createLoading, setCreateLoading] = useState(false);

  // Delete state
  const [deletingTicket, setDeletingTicket] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const debouncedSearch = useDebouncedValue(search, 600);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await crmApi.getTickets({ status, category, priority, search: debouncedSearch });
      setTickets(res.tickets || []);
    } catch (err) {
      if (isRateLimitError(err)) {
        toast.warning('Too many requests — pausing briefly, then try again.');
        return;
      }
      const msg = err.message || 'Failed to fetch tickets.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [status, category, priority, debouncedSearch, toast]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  async function handleCreateTicket(e) {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await crmApi.createTicket({
        customerEmail: ticketEmail,
        subject: ticketSubject,
        category: ticketCategory,
        priority: ticketPriority,
        initialMessage: ticketMessage,
      });
      setShowCreateModal(false);
      setTicketEmail('');
      setTicketSubject('');
      setTicketMessage('');
      toast.success('Support ticket opened successfully.');
      fetchTickets();
    } catch (err) {
      toast.error(err.message || 'Failed to create support ticket.');
    } finally {
      setCreateLoading(false);
    }
  }

  async function handleDeleteTicket() {
    if (!deletingTicket) return;
    setDeleteLoading(true);
    try {
      await crmApi.deleteTicket(deletingTicket.id);
      setDeletingTicket(null);
      toast.success(`Ticket ${deletingTicket.ticketNumber || ''} deleted.`);
      fetchTickets();
    } catch (err) {
      toast.error(err.message || 'Failed to delete ticket.');
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Support Tickets & Service Requests</h2>
          <p className="text-xs text-slate-500">
            Omnichannel ticket triage, internal escalation notes, and customer communication records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs transition flex items-center gap-1.5"
          >
            <PlusIcon className="size-4" />
            <span>Open Ticket</span>
          </button>
          <button
            onClick={fetchTickets}
            disabled={loading}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-xs transition disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCwIcon className={`size-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-center gap-2">
          <AlertCircleIcon className="size-4 text-red-500 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filters */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ticket #, subject, or customer email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="all">All Categories</option>
              <option value="billing">Billing & Invoices</option>
              <option value="technical">Technical Support</option>
              <option value="license">License Activation</option>
              <option value="discount">Discount Request</option>
              <option value="general">General Inquiry</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned To</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && !tickets.length ? (
                <TableSkeleton rows={6} cols={7} />
              ) : !tickets.length ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    No tickets found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-slate-900">{t.ticketNumber}</div>
                      <div className="text-[11px] text-slate-400">{t.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 max-w-sm truncate">{t.subject}</div>
                    </td>
                    <td className="py-3.5 px-4 capitalize text-slate-600 font-medium">
                      {t.category}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        t.priority === 'urgent'
                          ? 'bg-red-100 text-red-800'
                          : t.priority === 'high'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        t.status === 'open'
                          ? 'bg-blue-100 text-blue-800'
                          : t.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : t.status === 'closed'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {t.assignedStaffName || <span className="text-slate-400 italic">Unassigned</span>}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/crm/tickets/${encodeURIComponent(t.id)}`}
                          className="inline-flex px-3 py-1 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold transition"
                        >
                          Discussion →
                        </Link>
                        {isManagerOrAdmin && (
                          <button
                            onClick={() => setDeletingTicket(t)}
                            className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-md transition cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Open Support Ticket</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Email *</label>
                <input
                  type="email"
                  value={ticketEmail}
                  onChange={(e) => setTicketEmail(e.target.value)}
                  placeholder="customer@domain.com"
                  required
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject *</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief summary of the inquiry or issue"
                  required
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="billing">Billing & Invoices</option>
                    <option value="technical">Technical Support</option>
                    <option value="license">License Activation</option>
                    <option value="discount">Discount Request</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Initial Message / Context *</label>
                <textarea
                  rows="3"
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe the issue, reproduction steps, or request details..."
                  required
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition disabled:opacity-50"
                >
                  {createLoading ? 'Submitting...' : 'Open Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Ticket Confirm */}
      {deletingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-red-100 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Delete Ticket {deletingTicket.ticketNumber}?</h3>
            <p className="text-xs text-slate-600">This permanently removes the ticket thread. This action cannot be undone.</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() => setDeletingTicket(null)}
                className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteTicket}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
