import type { Task } from '../../contexts/TaskContext';
import { useTasks } from '../../contexts/TaskContext';

type Props = {
  task: Task;
};

export function TaskItem({ task }: Props) {
  const { updateTask, deleteTask } = useTasks();

  const toggleComplete = () =>
    updateTask(task.id, {
      completed: !task.completed,
    });

  const handleDelete = () => deleteTask(task.id);

  return (
    <li className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex flex-1 items-start gap-3">
        <button
          type="button"
          onClick={toggleComplete}
          className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded border border-slate-300 bg-white text-xs text-primary-600 hover:border-primary-500 dark:border-slate-600 dark:bg-slate-900"
        >
          {task.completed ? '✓' : ''}
        </button>
        <div>
          <p
            className={`text-sm font-medium ${
              task.completed ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-slate-50'
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{task.description}</p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/50"
      >
        Delete
      </button>
    </li>
  );
}


