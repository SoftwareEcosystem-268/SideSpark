# SideSpark — Frontend Documentation

> Stack: Next.js 14 (App Router) · shadcn/ui · Tailwind CSS · NextAuth.js

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** shadcn/ui (Radix UI components)
- **Styling:** Tailwind CSS
- **Auth:** NextAuth.js v5 — `CredentialsProvider` (email + password)
- **State:** React `useState` / Context API (`AuthContext`)
- **API Client:** `src/lib/api.ts` — typed wrapper around `fetch` with automatic JWT header injection

---

## Pages

- `/` — **Landing page** (`app/page.tsx`)
  - Full marketing page — hero section, features overview, call-to-action buttons

- `/login` — **Login page** (`app/login/page.tsx`)
  - Email + password form
  - Shows green success banner when redirected from registration (`?registered=1`)
  - Delegates to NextAuth `signIn('credentials', ...)`, redirects to `/dashboard` on success
  - Links to `/register` and `/forgot-password`

- `/register` — **Register page** (`app/register/page.tsx`)
  - Fields: username, email, password, confirm password
  - Calls `POST /api/auth/register` via `api.register()`
  - On success, redirects to `/login?registered=1` immediately (no email confirmation step)

- `/dashboard` — **Main dashboard** (`app/dashboard/page.tsx`)
  - Protected route — requires active NextAuth session
  - Tabs / sections:
    - **Overview** — financial summary cards, monthly income/expense charts, goals progress
    - **Projects** — list/create/manage user's hustle projects with task checklists and status controls
    - **Transactions** — income/expense log with filters, add/delete entries
    - **Ideas** — browse predefined side hustle ideas filtered by skills and difficulty
    - **Skills** — view skill catalog, add/remove skills from personal profile

---

## Auth Context (`src/context/AuthContext.tsx`)

- `AuthProvider` — wraps the app; reads session from NextAuth `useSession()`
- Exposes via `useAuth()`:
  - `user` — current user object (from NextAuth session)
  - `accessToken` — JWT access token stored in state and `sessionStorage`
  - `loading` — combined loading state (NextAuth + local)
  - `login(email, password)` — calls `signIn('credentials', ...)`
  - `logout()` — calls `signOut()` and clears `sessionStorage`

---

## API Client (`src/lib/api.ts`)

Typed methods grouped by resource. Automatically attaches `Authorization: Bearer <token>` from the NextAuth session. Redirects to `/login` on `401 Unauthorized`.

- **`api.register(data)`** — `POST /api/auth/register`
- **`api.getMe()`** — `GET /api/auth/me`
- **`api.projects.getAll(filters?)`** — `GET /api/projects`
- **`api.projects.getById(id)`** — `GET /api/projects/:id`
- **`api.projects.create(data)`** — `POST /api/projects`
- **`api.projects.update(id, data)`** — `PUT /api/projects/:id`
- **`api.projects.delete(id)`** — `DELETE /api/projects/:id`
- **`api.projects.addTask(projectId, text, order?)`** — `POST /api/projects/:id/tasks`
- **`api.projects.updateTask(projectId, taskId, data)`** — `PUT /api/projects/:id/tasks/:taskId`
- **`api.projects.deleteTask(projectId, taskId)`** — `DELETE /api/projects/:id/tasks/:taskId`
- **`api.transactions.getAll(filters?)`** — `GET /api/transactions`
- **`api.transactions.getById(id)`** — `GET /api/transactions/:id`
- **`api.transactions.create(data)`** — `POST /api/transactions`
- **`api.transactions.update(id, data)`** — `PUT /api/transactions/:id`
- **`api.transactions.delete(id)`** — `DELETE /api/transactions/:id`
- **`api.transactions.getSummary(filters?)`** — `GET /api/transactions/summary/stats`
- **`api.skills.getAll(filters?)`** — `GET /api/skills`
- **`api.skills.getById(id)`** — `GET /api/skills/:id`
- **`api.skills.add(skillId)`** — `POST /api/skills/:id/add`
- **`api.skills.remove(skillId)`** — `DELETE /api/skills/:id/remove`
- **`api.users.getMe()`** — `GET /api/users/me`
- **`api.users.updateMe(data)`** — `PUT /api/users/me`
- **`api.users.getById(id)`** — `GET /api/users/:id`
- **`api.ideas.getAll(filters?)`** — `GET /api/ideas`
- **`api.ideas.getById(id)`** — `GET /api/ideas/:id`

---

## NextAuth Configuration (`src/app/api/auth/[...nextauth]/options.ts`)

- Provider: `CredentialsProvider` — proxies login to `POST /api/auth/login`
- On success, stores `accessToken` and `refreshToken` in the JWT token
- Session strategy: `jwt` (30-day max age)
- `jwt` callback — copies `id`, `email`, `name`, `username`, `accessToken`, `refreshToken` into the token
- `session` callback — exposes `user.id`, `user.username`, `session.accessToken` to the client
