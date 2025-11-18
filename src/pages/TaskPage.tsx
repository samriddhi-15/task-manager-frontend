import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';

export function TaskPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Your tasks</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create, complete, and manage tasks. All interactions go through a mocked API.
          </p>
        </div>
      </div>
      <TaskForm />
      <TaskList />
    </div>
  );
}


