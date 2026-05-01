import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { Layout } from './Layout';

const useAuthMock = vi.fn();
const logoutMock = vi.fn();

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock('./auth/LoginForm', () => ({
  LoginForm: () => <div data-testid="login-form" />,
}));

beforeAll(() => {
  
  window.matchMedia = window.matchMedia ?? (() => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

describe('Layout', () => {
  beforeEach(() => {
    useAuthMock.mockReset();
    logoutMock.mockReset();
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('shows a loading placeholder while auth state is loading', () => {
    useAuthMock.mockReturnValue({ user: null, loading: true, logout: logoutMock });
    render(
      <Layout>
        <div>App</div>
      </Layout>,
    );
    expect(screen.getByText(/loading session/i)).toBeInTheDocument();
  });

  it('renders the login form when the user is not authenticated', () => {
    useAuthMock.mockReturnValue({ user: null, loading: false, logout: logoutMock });
    render(
      <Layout>
        <div>App</div>
      </Layout>,
    );
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it('renders children and allows logging out when the user is authenticated', async () => {
    const user = userEvent.setup();
    useAuthMock.mockReturnValue({
      user: { id: '1', name: 'Test', username: 'tester' },
      loading: false,
      logout: logoutMock,
    });

    render(
      <Layout>
        <div>Dashboard</div>
      </Layout>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /logout/i }));
    expect(logoutMock).toHaveBeenCalled();
  });

  it('toggles dark mode classes', async () => {
    const user = userEvent.setup();
    useAuthMock.mockReturnValue({
      user: { id: '1', name: 'Test', username: 'tester' },
      loading: false,
      logout: logoutMock,
    });

    render(
      <Layout>
        <div>Dashboard</div>
      </Layout>,
    );

    const toggleButton = screen.getByRole('button', { name: /dark mode/i });
    await user.click(toggleButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});


