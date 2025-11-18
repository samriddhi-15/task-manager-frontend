import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { api, setAuthToken } from '../services/api';

type User = {
  id: string;
  name: string;
  username: string;
};

type PersistedUser = {
  id: string;
  name: string;
  username?: string;
  email?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

type AuthContextValue = AuthState & {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'tm_auth';

function normalizeUser(user: PersistedUser | null): User | null {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    username: user.username ?? user.email ?? 'user',
  };
}

function readPersistedState(): AuthState {
  if (typeof window === 'undefined') {
    return { user: null, token: null, loading: true };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { user: PersistedUser | null; token: string | null };
      return { user: normalizeUser(parsed.user), token: parsed.token, loading: false };
    } catch {
      return { user: null, token: null, loading: false };
    }
  }

  return { user: null, token: null, loading: false };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => readPersistedState());

  useEffect(() => {
    if (state.loading) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user: state.user,
        token: state.token,
      }),
    );
  }, [state]);

  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  const login = useCallback(async (username: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const res = await api.post('/auth/login', { username, password });
      const data = res.data as { token: string; user: User };
      setState({ user: data.user, token: data.token, loading: false });
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, token: null, loading: false });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}


