import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach, afterAll } from 'vitest';
import { LoginForm } from './LoginForm';

const loginMock = vi.fn();
const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: loginMock,
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    loginMock.mockReset();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('pre-fills the demo credentials', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/username/i)).toHaveValue('demo');
    expect(screen.getByLabelText(/password/i)).toHaveValue('password');
  });

  it('submits user-entered credentials', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    await user.clear(usernameInput);
    await user.type(usernameInput, 'user1');
    await user.clear(passwordInput);
    await user.type(passwordInput, 'secret123');

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(loginMock).toHaveBeenCalledWith('user1', 'secret123');
  });

  it('shows an error when login fails', async () => {
    const user = userEvent.setup();
    loginMock.mockRejectedValueOnce(new Error('Invalid'));
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});


