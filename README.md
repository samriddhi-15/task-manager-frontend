# Task Manager

A React + TypeScript task management experience that simulates authentication and task CRUD flows entirely in the browser. Mock Service Worker (MSW) provides an in-memory API so the UI behaves like it is backed by a real service. Styling is handled with Tailwind CSS, global state lives in Context, and common surfaces are unit-tested with Vitest + React Testing Library.

## Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **State**: Context API (`AuthContext`, `TaskContext`)
- **Styling**: Tailwind CSS with light/dark theme toggle
- **HTTP**: Axios (auto-injects mock auth token)
- **Mock API**: MSW (browser worker + server for tests)
- **Testing**: Vitest, @testing-library/react, user-event, jest-dom

## Getting started

## Installation

```sh
git clone https://github.com/samriddhi-15/task-manager-frontend.git
cd task-manager-frontend
npm install
npm run dev

```

- The MSW worker boots automatically in dev/preview builds.
- Sign in with either `demo / password` or `test / test123`.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server with MSW worker |
| `npm run build` | Type-check and build production assets |
| `npm run preview` | Preview the production build |
| `npm run test` | Run Vitest unit tests (jsdom environment) |
| `npm run lint` | Run ESLint |

## Architecture highlights

- `src/contexts/AuthContext.tsx` – handles mock login/logout, persists session, injects the fake token into Axios, and exposes auth state.
- `src/contexts/TaskContext.tsx` – fetches tasks from the mock API and exposes CRUD helpers.
- `src/mocks/*` – MSW handlers + shared in-memory data store for users/tasks. `browser.ts` is used in the app, `server.ts` powers the tests.
- `src/components` – wrapped in a responsive layout with dark-mode toggle. Includes auth and task components with Tailwind styling.
- `src/pages/TaskPage.tsx` – wires together the task form/list for authenticated users.
- `src/setupTests.ts` – shared Vitest setup registering jest-dom, RTL cleanup, and the MSW server.

## Testing

```bash
npm run test
```

Coverage:

- `LoginForm` – credential submission + error surface
- `TaskForm` – validation, trimming, and reset behavior
- `TaskList` – loading, empty, error, and populated states
- `Layout` – auth-gated rendering, logout button, and dark-mode toggle

## Extending the mock API

- Edit `src/mocks/data.ts` to tweak seeded data or extend the in-memory store.
- Update `src/mocks/handlers.ts` to add new endpoints, latency, or error cases.
- Because MSW runs in both dev builds and tests, no backend changes are required to prototype new flows.

