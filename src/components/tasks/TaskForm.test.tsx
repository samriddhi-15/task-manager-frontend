import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { TaskForm } from './TaskForm';

const addTaskMock = vi.fn();

vi.mock('../../contexts/TaskContext', () => ({
  useTasks: () => ({
    addTask: addTaskMock,
  }),
}));

describe('TaskForm', () => {
  beforeEach(() => {
    addTaskMock.mockReset();
  });

  it('disables submit when the title is empty', () => {
    render(<TaskForm />);
    expect(screen.getByRole('button', { name: /add task/i })).toBeDisabled();
  });

  it('submits trimmed task values and clears the form', async () => {
    const user = userEvent.setup();
    render(<TaskForm />);

    const titleInput = screen.getByLabelText(/task title/i);
    await user.type(titleInput, '  New task  ');
    const descriptionInput = screen.getByLabelText(/description/i);
    await user.type(descriptionInput, ' details ');

    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(addTaskMock).toHaveBeenCalledWith({ title: 'New task', description: 'details' });
    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
  });
});


