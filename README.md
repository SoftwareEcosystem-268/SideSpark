# SideSpark
แอปที่ช่วยให้นักศึกษาไทยหาไอเดีย side hustle วางแผนเล็กๆ ทดลองโปรเจกต์ และติดตามรายได้เสริมอย่างเป็นระบบ

## Tech Stack

- **Frontend:** Next.js 14 + shadcn/ui + Tailwind CSS
- **Backend:** Express.js + TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Deployment:** Render

## Project Structure

```
SideSpark/
├── frontend/           # Next.js + shadcn/ui
│   ├── src/
│   │   ├── app/        # Next.js App Router
│   │   ├── components/ # React components
│   │   └── lib/        # Utilities
│   ├── package.json
│   └── ...
├── backend/            # Express + Prisma
│   ├── src/
│   │   ├── routes/     # API routes
│   │   └── lib/        # Prisma client
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── ...
├── package.json        # Root workspace
├── pnpm-workspace.yaml
└── render.yaml         # Render deployment config
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database (local or cloud)

### Installation

1. **Install dependencies:**
```bash
pnpm install
```

2. **Set up environment variables:**

   Backend ([`backend/.env`](backend/.env)):
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/sidespark?schema=public"
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   JWT_SECRET=your-secret-key
   ```

3. **Initialize database:**
```bash
# Generate Prisma client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate

# (Optional) Seed database with initial data
cd backend && pnpm prisma:seed
```

4. **Run development servers:**
```bash
# Run both frontend and backend
pnpm dev

# Or run separately:
cd frontend && pnpm dev      # Frontend on http://localhost:3000
cd backend && pnpm dev       # Backend on http://localhost:5000
```

## API Endpoints

### Health
- `GET /health` - Health check
- `GET /` - API info

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID

### Ideas
- `GET /api/ideas` - Get side hustle ideas (filter by skills)
- `GET /api/ideas/:id` - Get idea by ID with steps

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/summary/stats` - Get summary statistics

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/skills` - Add skill to user
- `DELETE /api/users/:id/skills/:skillId` - Remove skill from user

## Deployment to Render

1. **Push your code to GitHub**

2. **Create a Render account:** https://render.com

3. **Create services:**
   - Create a new "Web Service" for frontend
   - Create a new "Web Service" for backend
   - Create a new "PostgreSQL" database

4. **Configure environment variables in Render:**
   - Set `DATABASE_URL` from the database connection
   - Set other required env vars from `.env.example`

5. **Deploy:** Render will automatically deploy when you push to GitHub

## Development

### Adding new API endpoints:

1. Create route file in [`backend/src/routes/`](backend/src/routes/)
2. Register in [`backend/src/routes/index.ts`](backend/src/routes/index.ts)

### Adding new Prisma models:

1. Update [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma)
2. Run migration: `pnpm prisma:migrate`
3. Regenerate client: `pnpm prisma:generate`

### Frontend development:

- Pages: Add to [`frontend/src/app/`](frontend/src/app/)
- Components: Add to [`frontend/src/components/`](frontend/src/components/)

## License

MIT
