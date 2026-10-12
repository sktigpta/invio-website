import { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable React class-based error boundary.
 * Catches render errors (including lazy-load chunk failures) and shows
 * a user-friendly fallback page that matches the site's visual design.
 * Wrap around <Suspense> blocks in App.jsx to prevent blank screens on
 * code-split chunk load failures.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught render error:', error, info);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-6 py-16 text-center">
        <div className="size-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-slate-900 mb-3">Something went wrong</h1>
        <p className="text-sm text-slate-500 max-w-sm mb-8 leading-relaxed">
          This page failed to load. This is usually a temporary issue — try refreshing the page.
          If the problem persists, please contact support.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="py-2.5 px-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold text-xs transition-colors shadow-sm cursor-pointer"
          >
            Reload page
          </button>
          <Link
            to="/"
            className="py-2.5 px-6 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-semibold text-xs transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }
}

export default ErrorBoundary;
