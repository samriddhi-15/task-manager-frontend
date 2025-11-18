import type { Task } from '../contexts/TaskContext';

export type UserRecord = {
  id: string;
  name: string;
  username: string;
  password: string;
};

export const DEMO_TOKEN = 'mock-demo-token';

export const users: UserRecord[] = [
  {
    id: 'u1',
    name: 'Demo User',
    username: 'demo',
    password: 'password',
  },
  {
    id: 'u2',
    name: 'Test User',
    username: 'test',
    password: 'test123',
  },
];

let tasks: Task[] = [
  {
    id: 'seed-breakfast',
    title: 'Breakfast',
    description: 'Prepare your breakfast.',
    completed: false,
  },
  {
    id: 'seed-lunch',
    title: 'Lunch',
    description: 'Have lunch on time.',
    completed: false,
  },
];

function nextId() {
  return `t${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export function authenticate(username: string, password: string) {
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return null;
  return { user, token: DEMO_TOKEN };
}

export function verifyToken(token: string | null) {
  if (token === DEMO_TOKEN) {
    const primaryUser = users[0];
    const { id, name, username } = primaryUser;
    return { id, name, username };
  }
  return null;
}

export function listTasks() {
  return [...tasks];
}

export function createTask(input: Omit<Task, 'id'>) {
  const newTask: Task = { ...input, id: nextId() };
  tasks = [...tasks, newTask];
  return newTask;
}

export function updateTask(id: string, updates: Partial<Omit<Task, 'id'>>) {
  let updated: Task | null = null;
  tasks = tasks.map((task) => {
    if (task.id === id) {
      updated = { ...task, ...updates };
      return updated;
    }
    return task;
  });
  return updated;
}

export function removeTask(id: string) {
  const existing = tasks.find((task) => task.id === id);
  tasks = tasks.filter((task) => task.id !== id);
  return existing;
}


