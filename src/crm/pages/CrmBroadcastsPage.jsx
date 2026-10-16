import React, { useState, useEffect, useRef } from 'react';
import { crmApi } from '../services/crmApi';
import { useCrmAuth } from '../context/CrmAuthContext';
import { sanitizeHtml } from '../../utils/sanitizeHtml';
import { BroadcastIcon, RefreshCwIcon, CheckCircleIcon, AlertCircleIcon } from '../components/CrmIcons';

export function CrmBroadcastsPage() {
  const { isManagerOrAdmin } = useCrmAuth();

  const [activeTab, setActiveTab] = useState('middle'); // 'middle' | 'notification'
  const [previewTheme, setPreviewTheme] = useState('light'); // 'light' | 'dark'
  const [editorView, setEditorView] = useState('html'); // 'html' | 'body'
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Center Modal Card state
  const [middleCard, setMiddleCard] = useState({
    id: '',
    title: 'Happy Diwali from Invio & Timrio!',
    subtitle: 'Wishing your business brilliant prosperity, boundless growth, and joyful success this festive season.',
    badge: 'Festive Greeting',
    plan: 'all',
    ctaLabel: 'Visit Website',
    actionUrl: 'https://invio.timrio.com',
    htmlContent: `<h2>✨ Wishing You a Joyous &amp; Prosperous Diwali!</h2>
<p>As festival lights illuminate homes and shops across the country, the entire team at Invio extends our warmest blessings to you and your family.</p>
<blockquote>May this auspicious season bring boundless growth, smooth operations, and higher profits to your business!</blockquote>
<p><strong>Special Festive Notice:</strong></p>
<ul>
  <li>Our servers and automatic backups operate 24/7 uninterrupted.</li>
  <li>Priority support desk remains open throughout the holidays.</li>
  <li>Share invoices with festive greetings via WhatsApp in 1-tap.</li>
</ul>
<p>Thank you for letting Invio be a part of your daily billing journey. Have a sparkling celebration!</p>`,
    active: true,
  });

  // Notification Card state
  const [noticeCard, setNoticeCard] = useState({
    id: '',
    title: 'Happy Festive Season!',
    message: 'Wishing you and your business immense joy, growth, and prosperity from the Invio team! ✨',
    actionType: 'info', // 'info' | 'success' | 'warning' | 'danger'
    actionLabel: 'Learn more',
    actionUrl: 'https://invio.timrio.com',
    active: true,
  });

  const textareaRef = useRef(null);

  // Load existing broadcasts from backend
  const loadBroadcasts = async () => {
    try {
      setLoading(true);
      const res = await crmApi.getBroadcasts();
      if (res && res.success && res.broadcasts) {
        if (res.broadcasts.currentCampaign) {
          const c = res.broadcasts.currentCampaign;
          setMiddleCard({
            id: c.id || '',
            title: c.title || '',
            subtitle: c.subtitle || '',
            badge: c.badge || '',
            plan: c.plan || 'all',
            ctaLabel: c.ctaLabel || 'Check on Website',
            actionUrl: c.actionUrl || '',
            htmlContent: c.htmlContent || '',
            active: c.active !== false,
          });
        }
        if (res.broadcasts.currentNotice) {
          const n = res.broadcasts.currentNotice;
          setNoticeCard({
            id: n.id || '',
            title: n.title || '',
            message: n.message || '',
            actionType: n.actionType || 'info',
            actionLabel: n.actionLabel || '',
            actionUrl: n.actionUrl || '',
            active: n.active !== false,
          });
        }
      }
    } catch (err) {
      showToast(err?.message || 'Failed to load broadcasts', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBroadcasts();
  }, []);

  // HTML Toolbar helper
  const insertHtmlTag = (openTag, closeTag = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = activeTab === 'middle' ? middleCard.htmlContent : noticeCard.message;
    const selected = text.substring(start, end);

    const replacement = selected
      ? `${openTag}${selected}${closeTag}`
      : `${openTag}${closeTag}`;

    const newText = text.substring(0, start) + replacement + text.substring(end);

    if (activeTab === 'middle') {
      setMiddleCard((prev) => ({ ...prev, htmlContent: newText }));
    } else {
      setNoticeCard((prev) => ({ ...prev, message: newText }));
    }

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, start + openTag.length + selected.length);
    }, 0);
  };

  // Save handler
  const handleSave = async () => {
    try {
      setSaving(true);
      if (activeTab === 'middle') {
        const payload = {
          id: middleCard.id || undefined,
          title: middleCard.title,
          subtitle: middleCard.subtitle,
          badge: middleCard.badge,
          plan: middleCard.plan,
          ctaLabel: middleCard.ctaLabel,
          actionUrl: middleCard.actionUrl,
          htmlContent: middleCard.htmlContent,
          active: middleCard.active,
          createNewVersion: true,
        };
        const res = await crmApi.updateMiddleCard(payload);
        if (res && res.success) {
          showToast(res.message || 'Center Modal Card broadcast updated & activated!', 'success');
          if (res.campaign?.id) {
            setMiddleCard((prev) => ({ ...prev, id: res.campaign.id }));
          }
        }
      } else {
        const payload = {
          id: noticeCard.id || undefined,
          title: noticeCard.title,
          message: noticeCard.message,
          actionType: noticeCard.actionType,
          actionLabel: noticeCard.actionLabel,
          actionUrl: noticeCard.actionUrl,
          active: noticeCard.active,
          createNewVersion: true,
        };
        const res = await crmApi.updateNotificationCard(payload);
        if (res && res.success) {
          showToast(res.message || 'Notification Card notice updated & activated!', 'success');
          if (res.notice?.id) {
            setNoticeCard((prev) => ({ ...prev, id: res.notice.id }));
          }
        }
      }
    } catch (err) {
      showToast(err?.message || 'Failed to save broadcast', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 font-sans -m-6 p-6 min-h-[calc(100vh-80px)]">
      {/* Toast Notice */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold ${
          toastMessage.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-800'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {toastMessage.type === 'error' ? <AlertCircleIcon className="size-4 text-red-600" /> : <CheckCircleIcon className="size-4 text-emerald-600" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white rounded-xl border border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C3AED]">
            <BroadcastIcon className="size-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">In-App Cards &amp; Broadcasts</h1>
            <p className="text-xs text-slate-500 leading-tight">
              Manage multi-purpose announcements, festival wishes, release alerts, and promos live in desktop app
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadBroadcasts}
            disabled={loading}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 flex items-center gap-1.5 transition cursor-pointer"
            title="Refresh current broadcast data"
          >
            <RefreshCwIcon className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          {isManagerOrAdmin && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg shadow-xs flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
            >
              {saving ? <RefreshCwIcon className="size-3.5 animate-spin" /> : <CheckCircleIcon className="size-3.5" />}
              <span>Publish &amp; Activate</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Switcher & Theme Selector */}
      <div className="bg-white rounded-xl border border-slate-200 px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 mb-4 shadow-xs">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('middle')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'middle'
                ? 'bg-purple-50 text-[#7C3AED] border border-purple-200 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Center Modal Card (Middle Dialog / Wishes &amp; Updates)</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                middleCard.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {middleCard.active ? 'Active' : 'Disabled'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notification')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'notification'
                ? 'bg-purple-50 text-[#7C3AED] border border-purple-200 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Notification Card (Bottom-Right Floating Alert)</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                noticeCard.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {noticeCard.active ? 'Active' : 'Disabled'}
            </span>
          </button>
        </div>

        {/* Preview Theme Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setPreviewTheme('light')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
              previewTheme === 'light' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            ☀️ Light Preview
          </button>
          <button
            onClick={() => setPreviewTheme('dark')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
              previewTheme === 'dark' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            🌙 Dark Preview
          </button>
        </div>
      </div>

      {/* Main Grid: Left Editor & Right Live Desktop Preview */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[500px]">
        {/* Left Column: Form & Editor */}
        <div className="space-y-4">
          {activeTab === 'middle' ? (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Center Card Metadata &amp; Audience
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs font-semibold text-slate-600">Active Broadcast:</span>
                  <input
                    type="checkbox"
                    checked={middleCard.active}
                    onChange={(e) => setMiddleCard({ ...middleCard, active: e.target.checked })}
                    className="size-4 accent-[#7C3AED] rounded cursor-pointer"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Title Header</label>
                  <input
                    type="text"
                    value={middleCard.title}
                    onChange={(e) => setMiddleCard({ ...middleCard, title: e.target.value })}
                    placeholder="e.g. Happy Diwali from Invio & Timrio!"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Pill Text</label>
                  <input
                    type="text"
                    value={middleCard.badge}
                    onChange={(e) => setMiddleCard({ ...middleCard, badge: e.target.value })}
                    placeholder="e.g. Festive Greeting or Release v1.0.2"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-white text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle / Summary</label>
                <textarea
                  rows={2}
                  value={middleCard.subtitle}
                  onChange={(e) => setMiddleCard({ ...middleCard, subtitle: e.target.value })}
                  placeholder="Short engaging subtitle shown below the title..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-white text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={middleCard.plan}
                    onChange={(e) => setMiddleCard({ ...middleCard, plan: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-white text-slate-800"
                  >
                    <option value="all">🌟 All Users (Free, Plus, Pro)</option>
                    <option value="free">Free Users Only</option>
                    <option value="plus">Plus Users Only</option>
                    <option value="pro">Pro Users Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Button CTA</label>
                  <input
                    type="text"
                    value={middleCard.ctaLabel}
                    onChange={(e) => setMiddleCard({ ...middleCard, ctaLabel: e.target.value })}
                    placeholder="e.g. Check on Website"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CTA Action URL</label>
                  <input
                    type="url"
                    value={middleCard.actionUrl}
                    onChange={(e) => setMiddleCard({ ...middleCard, actionUrl: e.target.value })}
                    placeholder="https://invio.timrio.com"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-white text-slate-800"
                  />
                </div>
              </div>

              {/* HTML Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Card HTML Content (Formatted Body)
                  </label>
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                    <button
                      type="button"
                      onClick={() => setEditorView('html')}
                      className={`px-2 py-0.5 rounded font-semibold transition cursor-pointer ${
                        editorView === 'html' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      &lt;/&gt; HTML Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorView('body')}
                      className={`px-2 py-0.5 rounded font-semibold transition cursor-pointer ${
                        editorView === 'body' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      👁 Rendered
                    </button>
                  </div>
                </div>

                {editorView === 'html' ? (
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-2 rounded-t-lg border border-slate-200 border-b-0 text-xs">
                      <button type="button" onClick={() => insertHtmlTag('<h2>', '</h2>')} className="px-2 py-0.5 rounded hover:bg-slate-200 font-bold bg-white border border-slate-200">H2</button>
                      <button type="button" onClick={() => insertHtmlTag('<h3>', '</h3>')} className="px-2 py-0.5 rounded hover:bg-slate-200 font-bold bg-white border border-slate-200">H3</button>
                      <button type="button" onClick={() => insertHtmlTag('<p>', '</p>')} className="px-2 py-0.5 rounded hover:bg-slate-200 font-medium bg-white border border-slate-200">P</button>
                      <button type="button" onClick={() => insertHtmlTag('<blockquote>', '</blockquote>')} className="px-2 py-0.5 rounded hover:bg-slate-200 italic bg-white border border-slate-200">Quote</button>
                      <button type="button" onClick={() => insertHtmlTag('<strong>', '</strong>')} className="px-2 py-0.5 rounded hover:bg-slate-200 font-bold bg-white border border-slate-200">B</button>
                      <button type="button" onClick={() => insertHtmlTag('<em>', '</em>')} className="px-2 py-0.5 rounded hover:bg-slate-200 italic bg-white border border-slate-200">I</button>
                      <button type="button" onClick={() => insertHtmlTag('<ul>\n  <li>', '</li>\n</ul>')} className="px-2 py-0.5 rounded hover:bg-slate-200 bg-white border border-slate-200">• List</button>
                      <button type="button" onClick={() => insertHtmlTag('<a href="https://invio.timrio.com">', '</a>')} className="px-2 py-0.5 rounded hover:bg-slate-200 bg-white border border-slate-200 underline">Link</button>
                    </div>
                    <textarea
                      ref={textareaRef}
                      rows={8}
                      value={middleCard.htmlContent}
                      onChange={(e) => setMiddleCard({ ...middleCard, htmlContent: e.target.value })}
                      placeholder="Write HTML content here..."
                      className="w-full text-xs font-mono p-3 rounded-b-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-slate-900 text-emerald-400 selection:bg-purple-800 leading-relaxed"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full min-h-[180px] p-4 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs leading-relaxed overflow-y-auto"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(middleCard.htmlContent || '<p>No content entered yet.</p>'),
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            /* Notification Notice Card Form */
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Notification Properties
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs font-semibold text-slate-600">Active Notice:</span>
                  <input
                    type="checkbox"
                    checked={noticeCard.active}
                    onChange={(e) => setNoticeCard({ ...noticeCard, active: e.target.checked })}
                    className="size-4 accent-[#7C3AED] rounded cursor-pointer"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Title Header</label>
                  <input
                    type="text"
                    value={noticeCard.title}
                    onChange={(e) => setNoticeCard({ ...noticeCard, title: e.target.value })}
                    placeholder="e.g. Cloud Maintenance"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Severity / Style</label>
                  <select
                    value={noticeCard.actionType}
                    onChange={(e) => setNoticeCard({ ...noticeCard, actionType: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-white text-slate-800"
                  >
                    <option value="info">🔵 Info (Blue)</option>
                    <option value="success">🟢 Success / Festive (Green)</option>
                    <option value="warning">🟡 Warning / Advisory (Amber)</option>
                    <option value="danger">🔴 Danger / Critical (Red)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Action Button Text</label>
                  <input
                    type="text"
                    value={noticeCard.actionLabel}
                    onChange={(e) => setNoticeCard({ ...noticeCard, actionLabel: e.target.value })}
                    placeholder="e.g. Learn more"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Action Button URL</label>
                  <input
                    type="url"
                    value={noticeCard.actionUrl}
                    onChange={(e) => setNoticeCard({ ...noticeCard, actionUrl: e.target.value })}
                    placeholder="https://invio.timrio.com"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-white text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message Content</label>
                <textarea
                  rows={4}
                  value={noticeCard.message}
                  onChange={(e) => setNoticeCard({ ...noticeCard, message: e.target.value })}
                  placeholder="Enter notification message here..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#7C3AED] bg-white text-slate-800"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Desktop App Preview */}
        <div className={`rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center relative min-h-[460px] ${
          previewTheme === 'dark' ? 'bg-[#0f172a]' : 'bg-slate-100'
        }`}>
          {/* Preview Badge */}
          <div className="w-full max-w-[500px] flex items-center justify-between mb-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Desktop Preview ({previewTheme === 'dark' ? 'Dark' : 'Light'})</span>
            </span>
            <span className="font-mono text-[11px] bg-slate-200/80 px-2 py-0.5 rounded text-slate-700">
              {activeTab === 'middle' ? 'Center Modal · 500px' : 'Notice Card · 320px'}
            </span>
          </div>

          {activeTab === 'middle' ? (
            /* Center Modal Card Live Preview */
            <div className={`w-full max-w-[480px] rounded-2xl overflow-hidden shadow-2xl border transition-all ${
              previewTheme === 'dark' ? 'bg-[#151928] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              {/* Header Fluid Art */}
              <div className="h-32 bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-800 flex flex-col items-center justify-center p-4 text-center relative text-white">
                <button type="button" className="absolute top-3 right-3 size-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xs">✕</button>
                {middleCard.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 border border-white/30 px-2.5 py-0.5 rounded-full mb-1.5">
                    {middleCard.badge}
                  </span>
                )}
                <h3 className="text-lg font-bold leading-snug">{middleCard.title}</h3>
                {middleCard.subtitle && <p className="text-xs text-white/90 line-clamp-2 mt-0.5 max-w-sm">{middleCard.subtitle}</p>}
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <div
                  className={`text-xs leading-relaxed max-h-52 overflow-y-auto p-3.5 rounded-xl border ${
                    previewTheme === 'dark' ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-100 text-slate-700'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(middleCard.htmlContent || '<p>No content provided</p>'),
                  }}
                />

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs rounded-xl shadow-xs transition"
                  >
                    {middleCard.ctaLabel || 'Check on Website'}
                  </button>
                  <button
                    type="button"
                    className="text-xs text-slate-400 hover:text-slate-600 transition"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Notification Notice Card Live Preview (320px) */
            <div className={`w-80 rounded-xl p-4 shadow-xl border relative transition-all ${
              previewTheme === 'dark' ? 'bg-[#181920] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`size-2.5 rounded-full ${
                    noticeCard.actionType === 'danger'
                      ? 'bg-red-500'
                      : noticeCard.actionType === 'warning'
                      ? 'bg-amber-500'
                      : noticeCard.actionType === 'success'
                      ? 'bg-emerald-500'
                      : 'bg-blue-500'
                  }`} />
                  <h4 className="text-xs font-bold truncate">{noticeCard.title || 'System Notification'}</h4>
                </div>
                <button type="button" className="text-slate-400 hover:text-slate-600 text-xs">✕</button>
              </div>

              <div
                className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mb-2.5"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(noticeCard.message || 'Notification content...'),
                }}
              />

              {noticeCard.actionLabel && (
                <button type="button" className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1">
                  <span>{noticeCard.actionLabel}</span>
                  <span>→</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
