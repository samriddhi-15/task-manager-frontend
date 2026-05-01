import { useId, useState } from 'react';
import type { FormEvent } from 'react';

import { useTasks } from '../../contexts/TaskContext';

export function TaskForm() {
  const { addTask } = useTasks();
  const formId = useId();
  const titleId = `${formId}-title`;
  const descriptionId = `${formId}-description`;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask({ title: title.trim(), description: description.trim() || undefined });
    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
    >
      <div>
        <label
          htmlFor={titleId}
          className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300"
        >
          Task title
        </label>
        <input
          id={titleId}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Finish UI polish"
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary-500/0 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40 dark:border-slate-700 dark:bg-slate-900"
        />
      </div>
      <div>
        <label
          htmlFor={descriptionId}
          className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300"
        >
          Description (optional)
        </label>
        <textarea
          id={descriptionId}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary-500/0 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40 dark:border-slate-700 dark:bg-slate-900"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-primary-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!title.trim()}
        >
          Add task
        </button>
      </div>
    </form>
  );
}


