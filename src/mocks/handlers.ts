import { http, HttpResponse } from 'msw';
import {
  authenticate,
  createTask,
  listTasks,
  removeTask,
  updateTask,
  verifyToken,
} from './data';

async function requireAuth(request: Request) {
  const header = request.headers.get('authorization');
  const token = header?.replace('Bearer ', '') ?? null;
  const user = verifyToken(token);
  if (!user) {
    throw HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return user;
}

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { username: string; password: string };
    const result = authenticate(body.username, body.password);
    if (!result) {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    const { user, token } = result;
    const { id, name, username } = user;
    return HttpResponse.json({ token, user: { id, name, username } });
  }),

  http.get('/api/tasks', async ({ request }) => {
    await requireAuth(request);
    return HttpResponse.json(listTasks());
  }),

  http.post('/api/tasks', async ({ request }) => {
    await requireAuth(request);
    const body = (await request.json()) as { title: string; description?: string; completed: boolean };
    const newTask = createTask({
      title: body.title,
      description: body.description,
      completed: body.completed ?? false,
    });
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.put('/api/tasks/:id', async ({ request, params }) => {
    await requireAuth(request);
    const body = (await request.json()) as { title?: string; description?: string; completed?: boolean };
    const updated = updateTask(params.id as string, body);
    if (!updated) {
      return HttpResponse.json({ message: 'Task not found' }, { status: 404 });
    }
    return HttpResponse.json(updated);
  }),

  http.delete('/api/tasks/:id', async ({ request, params }) => {
    await requireAuth(request);
    const removed = removeTask(params.id as string);
    if (!removed) {
      return HttpResponse.json({ message: 'Task not found' }, { status: 404 });
    }
    return HttpResponse.json({ success: true });
  }),
];


