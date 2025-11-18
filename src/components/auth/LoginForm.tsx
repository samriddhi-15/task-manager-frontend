import { FormEvent, useId, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function LoginForm() {
  const { login } = useAuth();
  const formId = useId();
  const usernameId = `${formId}-username`;
  const passwordId = `${formId}-password`;
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      console.error(err);
      setError('Invalid credentials (mocked). Try the default demo user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <h1 className="mb-1 text-xl font-semibold">Welcome back</h1>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        Sign in to manage your tasks. This app uses a mocked authentication API.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor={usernameId}
            className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300"
          >
            Username
          </label>
          <input
            id={usernameId}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary-500/0 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40 dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div>
          <label
            htmlFor={passwordId}
            className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300"
          >
            Password
          </label>
          <input
            id={passwordId}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary-500/0 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40 dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        {error && (
          <p role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <div className="mt-2 space-y-1 text-xs text-slate-400">
          <p>
            Demo user: <span className="font-mono">demo / password</span>
          </p>
          <p>
            Test user: <span className="font-mono">test / test123</span>
          </p>
        </div>
      </form>
    </div>
  );
}


