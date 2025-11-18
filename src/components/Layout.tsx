import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from './auth/LoginForm';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { user, logout, loading } = useAuth();
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem('tm_theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add('dark');
      window.localStorage.setItem('tm_theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('tm_theme', 'light');
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/70 dark:bg-slate-900/70 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-300">
              ✓
            </span>
            <div>
              <p className="text-sm font-semibold">Task Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDark((prev) => !prev)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              {dark ? 'Light mode' : 'Dark mode'}
            </button>
            {user && !loading && (
              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-slate-600 dark:text-slate-300 sm:inline">
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-1 px-4 pb-10 pt-6">
        {loading ? (
          <div className="mx-auto w-full max-w-md rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60">
            Loading session…
          </div>
        ) : !user ? (
          <div className="mx-auto w-full max-w-md">
            <LoginForm />
          </div>
        ) : (
          <div className="w-full">{children}</div>
        )}
      </main>
    </div>
  );
}


