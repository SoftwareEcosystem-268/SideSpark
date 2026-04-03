# SideSpark - Project Documentation

## Project Overview
SideSpark is a side hustle management platform for Thai students. It helps users:
- Find side hustle ideas based on their skills
- Plan and track projects
- Monitor income and expenses
- Set and achieve milestones

## Tech Stack
- **Frontend:** Next.js 14 + shadcn/ui + Tailwind CSS
- **Backend:** Express.js + TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Deployment:** Render
- **Package Manager:** pnpm (monorepo with pnpm-workspace)

## Project Structure
```
SideSpark/
├── frontend/           # Next.js + shadcn/ui
│   ├── src/
│   │   ├── app/        # Next.js App Router pages
│   │   ├── components/ # React components (shadcn/ui)
│   │   └── lib/        # Utilities (cn function)
├── backend/            # Express + Prisma
│   ├── src/
│   │   ├── routes/     # API routes (index, skills, ideas, projects, transactions, users)
│   │   └── lib/        # Prisma client setup
│   ├── prisma/         # Database schema
│   └── seed.ts         # Database seeding script
├── package.json        # Root workspace
├── pnpm-workspace.yaml # pnpm workspace config
└── render.yaml         # Render deployment config
```

## Database Schema (Prisma)

### Models:
1. **User** - User accounts with authentication
2. **Skill** - Available skills for matching
3. **UserSkill** - Many-to-Many junction between users and skills
4. **Idea** - Predefined side hustle ideas with steps and requirements
5. **Project** - User-created projects with goals and status
6. **Task** - ToDo items for project planning
7. **Transaction** - Income/expense tracking
8. **Milestone** - Achievement tracking

## API Routes

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

## Environment Variables

### Backend (`backend/.env`):
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/sidespark?schema=public"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key
```

## Key Scripts

### Root:
```bash
pnpm install          # Install all dependencies
pnpm dev              # Run both frontend and backend
```

### Backend:
```bash
pnpm dev              # Start backend server
pnpm build            # Build backend
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Run database migrations
pnpm prisma:studio    # Open Prisma Studio
pnpm prisma:seed      # Seed database with data
```

### Frontend:
```bash
pnpm dev              # Start frontend dev server
pnpm build            # Build frontend
pnpm start            # Start production server
pnpm lint             # Run linter
```

## Frontend Components

UI components are from shadcn/ui:
- button.tsx
- card.tsx
- tabs.tsx
- (and more Radix UI components)

## Important Notes

- **Language:** The project uses Thai language for the UI
- **Database:** PostgreSQL is required
- **Monorepo:** Uses pnpm workspaces for dependency management
- **Security:** Backend includes JWT authentication (bcryptjs, jsonwebtoken)
- **API:** RESTful API with Express.js
- **ORM:** Prisma for database operations
- **Deployment:** Configured for Render with render.yaml

## Development Guidelines

1. Always use TypeScript
2. Follow the existing project structure
3. API routes should be RESTful
4. Database changes require Prisma migrations
5. Frontend uses App Router (Next.js 14)
6. UI components should use shadcn/ui patterns
7. Language of the application is Thai (both UI and database content)
