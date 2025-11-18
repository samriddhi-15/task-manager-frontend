import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { Task } from '../../contexts/TaskContext';
import { TaskList } from './TaskList';

const useTasksMock = vi.fn();

vi.mock('../../contexts/TaskContext', () => ({
  useTasks: () => useTasksMock(),
}));

describe('TaskList', () => {
  beforeEach(() => {
    useTasksMock.mockReset();
  });

  it('renders loading state', () => {
    useTasksMock.mockReturnValue({ tasks: [], loading: true, error: null });
    render(<TaskList />);
    expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    useTasksMock.mockReturnValue({
      tasks: [],
      loading: false,
      error: 'Failed to load tasks',
    });
    render(<TaskList />);
    expect(screen.getByText(/failed to load tasks/i)).toBeInTheDocument();
  });

  it('renders empty state', () => {
    useTasksMock.mockReturnValue({
      tasks: [],
      loading: false,
      error: null,
    });
    render(<TaskList />);
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('renders tasks when data is available', () => {
    const tasks: Task[] = [
      { id: '1', title: 'First', completed: false },
      { id: '2', title: 'Second', description: 'details', completed: true },
    ];
    useTasksMock.mockReturnValue({
      tasks,
      loading: false,
      error: null,
    });
    render(<TaskList />);

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});


