# SideSpark — Backend Documentation

> Stack: Express.js + TypeScript · PostgreSQL + Prisma ORM · JWT Auth

---

## Server

- Runs on **Express.js + TypeScript**, default port `5000`
- All API routes are prefixed with `/api`
- JWT-based authentication: **Access Token** (1 hour) + **Refresh Token** (7 days, stored in DB)
- Passwords are hashed with **bcryptjs** (salt rounds: 10)
- Routes that require a logged-in user use the `authMiddleware` (validates `Authorization: Bearer <token>`)
- Some routes (Skills, Ideas) support `optionalAuthMiddleware` — login not required but enriches response if provided

---

## Database Models (Prisma / PostgreSQL)

- **User** — account record (`id`, `username`, `email`, `name`, `password`)
- **Skill** — predefined skill catalog (`name`, `nameEn`, `category`)
- **UserSkill** — many-to-many junction linking `User` ↔ `Skill`
- **Idea** — predefined side hustle suggestions (`title`, `description`, `skills[]`, `difficulty`, income range, `steps[]`, `requiredTools[]`, `resources[]`)
- **Project** — user-created hustle project (`name`, `description`, `initialCost`, `monthlyGoal`, `status`)
  - Status values: `active` | `paused` | `completed`
- **Task** — to-do item inside a project (`text`, `completed`, `order`)
- **Transaction** — income/expense record (`type`, `amount`, `description`, `date`, optional `projectId`)
- **Milestone** — achievement tracker (`title`, `target`, `achieved`, `achievedAt`)
- **RefreshToken** — persisted refresh tokens with expiry

---

## API Endpoints

### Health

- `GET /` — API info response
- `GET /health` — Health check (returns `{ status: "ok" }`)

---

### Auth — `/api/auth`

- `POST /api/auth/register` — Register a new user
  - Body: `{ username, email, password, confirmPassword }`
  - Validations: username 3–20 chars, valid email format, password ≥ 8 chars, passwords must match, unique username & email
  - Creates user with account active immediately (no email verification step)
  - Returns: `{ message, email, username }`

- `POST /api/auth/login` — Log in with email + password
  - Body: `{ email, password }`
  - Returns: `{ accessToken, refreshToken, user: { id, email, username, name } }`

- `POST /api/auth/refresh` — Exchange a refresh token for a new access token
  - Body: `{ refreshToken }`
  - Returns: `{ accessToken }`

- `POST /api/auth/logout` — Invalidate a refresh token
  - Body: `{ refreshToken }`
  - Deletes the token from the DB

- `GET /api/auth/me` — Get authenticated user's info *(requires auth)*
  - Returns: `{ user: { id, username, email, name, createdAt } }`

---

### Skills — `/api/skills`

- `GET /api/skills` — Get all skills *(public, optional auth)*
  - Query: `?category=creative|tech|business|education|language`
  - Returns: `{ skills: [...], userSkills: [...] }` — `userSkills` populated only if authenticated

- `GET /api/skills/:id` — Get a skill by ID *(public)*

- `POST /api/skills/:id/add` — Add a skill to authenticated user's profile *(requires auth)*
  - Returns the created `UserSkill` record (201)

- `DELETE /api/skills/:id/remove` — Remove a skill from authenticated user's profile *(requires auth)*
  - Returns 204 No Content

---

### Ideas — `/api/ideas`

- `GET /api/ideas` — Get all side hustle ideas *(public, optional auth)*
  - Query: `?skills=<name>&difficulty=easy|medium|hard`
  - Sorted by difficulty (asc) then estimated income (desc)
  - Returns formatted idea list with `estimatedIncome: { min, max, unit }`

- `GET /api/ideas/:id` — Get idea detail by ID *(public)*
  - Returns full idea including `steps[]`

---

### Projects — `/api/projects` *(all routes require auth)*

- `GET /api/projects` — List all projects for the logged-in user
  - Query: `?status=active|paused|completed`
  - Returns projects with embedded `tasks`, last 5 `transactions`, task counts, and computed `progress: { totalTasks, completedTasks, percentage }`

- `GET /api/projects/:id` — Get a single project with all tasks and transactions
  - Returns full project detail including `progress`

- `POST /api/projects` — Create a new project
  - Body: `{ name, description?, initialCost?, monthlyGoal?, tasks?: string[] }`
  - Tasks can be seeded inline at creation time

- `PUT /api/projects/:id` — Update a project
  - Body: `{ name?, description?, initialCost?, monthlyGoal?, status? }`
  - Validates status value

- `DELETE /api/projects/:id` — Delete a project (cascades to tasks and transactions)
  - Returns 204 No Content

#### Task Sub-routes inside Projects

- `POST /api/projects/:id/tasks` — Add a task to a project
  - Body: `{ text, order? }`
  - Auto-assigns order after the last existing task if `order` omitted

- `PUT /api/projects/:id/tasks/:taskId` — Update a task
  - Body: `{ completed?, text?, order? }`

- `DELETE /api/projects/:id/tasks/:taskId` — Delete a task
  - Returns 204 No Content

---

### Transactions — `/api/transactions` *(all routes require auth)*

- `GET /api/transactions` — List transactions for the logged-in user
  - Query: `?projectId=&type=income|expense&startDate=&endDate=&limit=`
  - Returns transactions with associated `project: { id, name }`

- `GET /api/transactions/:id` — Get a single transaction

- `POST /api/transactions` — Create a transaction
  - Body: `{ type: "income"|"expense", amount, projectId?, description?, date? }`
  - Amount is stored as integer (THB)

- `PUT /api/transactions/:id` — Update a transaction
  - Body: `{ type?, amount?, projectId?, description?, date? }`

- `DELETE /api/transactions/:id` — Delete a transaction
  - Returns 204 No Content

- `GET /api/transactions/summary/stats` — Aggregated financial statistics *(requires auth)*
  - Query: `?startDate=&endDate=`
  - Returns:
    - `totalIncome`, `totalExpense`, `netProfit`
    - `incomeByProject[]` — income totals grouped by project
    - `monthlyData[]` — last 6 months of `{ month, income, expense, profit }`
    - `goalsProgress[]` — current-month income vs. monthly goal per active project
    - `milestonesCompleted` — count of achieved milestones

---

### Users — `/api/users` *(all routes require auth)*

- `GET /api/users/me` — Get full profile of the authenticated user
  - Returns: `{ id, username, email, name, createdAt, skills[], _count: { projects, transactions, milestones } }`

- `PUT /api/users/me` — Update authenticated user's display name
  - Body: `{ name? }`

- `GET /api/users/:id` — Get a user's public profile by ID
  - Returns: `{ id, username, name, createdAt, skills[], projects[] (last 10), _count }`
