# SideSpark

SideSpark คือเว็บแอปสำหรับช่วยนักศึกษาไทยสำรวจไอเดีย side hustle, วางแผนโปรเจกต์, และติดตามรายรับรายจ่ายจากงานเสริมในที่เดียว

Repository นี้เป็น `pnpm` workspace ที่แยก `frontend` และ `backend` ออกจากกันชัดเจน พร้อมชุดทดสอบในโฟลเดอร์ `tests/`

## สถานะปัจจุบัน

- Backend API สำหรับ auth, skills, ideas, projects, transactions และ users ใช้งานได้
- Frontend flow สมัครสมาชิกและเข้าสู่ระบบเชื่อมกับ backend ผ่าน NextAuth แล้ว
- หน้าในส่วน product เช่น `/main`, `/main/projects`, `/main/success` และ `/upgrade` ยังเน้นงาน UI prototype และ mock data เป็นหลัก
- ชุดทดสอบใช้ Vitest และแยก frontend/backend ออกจากกันที่ระดับ workspace

## Tech Stack

- Frontend: Next.js 14, React 18, Tailwind CSS, shadcn/ui, NextAuth v4
- Backend: Express.js, TypeScript, Prisma ORM, PostgreSQL, JWT
- Tooling: pnpm workspace, Vitest, concurrently
- Deployment: Render (`render.yaml`)

## โครงสร้างโปรเจกต์

```text
SideSpark/
|-- backend/               # Express API + Prisma schema + seed
|-- frontend/              # Next.js App Router frontend
|-- docs/                  # เอกสารแยกตาม frontend/backend
|-- tests/                 # Vitest suites แยก frontend/backend
|-- package.json           # Root workspace scripts
|-- pnpm-workspace.yaml
|-- render.yaml            # Base deployment config สำหรับ Render
`-- vitest.config.ts       # Root Vitest projects config
```

## เริ่มต้นใช้งาน

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL

### 1. ติดตั้ง dependencies

```bash
pnpm install
```

### 2. ตั้งค่า environment variables

สร้างไฟล์ต่อไปนี้จาก example ที่มีอยู่ใน repo:

- `backend/.env` จาก `backend/.env.example`
- `frontend/.env.local` จาก `frontend/.env.local.example`

ค่าที่ควรตั้งอย่างน้อยมีดังนี้

Backend:

- `DATABASE_URL`
- `PORT`
- `NODE_ENV`
- `FRONTEND_URL`
- `JWT_SECRET`
- `REFRESH_TOKEN_SECRET`
- `REFRESH_TOKEN_EXPIRES_IN`

Frontend:

- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_API_URL`

หมายเหตุ:

- `backend/.env.example` ยังมีตัวแปรเกี่ยวกับ email และ `JWT_EXPIRES_IN` อยู่ แต่ใน implementation ปัจจุบันยังไม่มี route สำหรับ email verification, resend verification หรือ forgot password

### 3. เตรียมฐานข้อมูล

```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm --filter backend run prisma:seed
```

### 4. รันโปรเจกต์ในโหมดพัฒนา

```bash
pnpm dev
```

บริการที่จะรัน:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## คำสั่งที่ใช้บ่อย

```bash
pnpm dev
pnpm build
pnpm start
pnpm test
pnpm test:frontend
pnpm test:backend
pnpm test:coverage
```

## API Overview

Health:

- `GET /`
- `GET /health`

Resource groups:

- `/api/auth`
- `/api/skills`
- `/api/ideas`
- `/api/projects`
- `/api/transactions`
- `/api/users`

รายละเอียดเพิ่มเติมดูที่:

- [`docs/backend.md`](docs/backend.md)
- [`docs/frontend.md`](docs/frontend.md)

## Known Gaps

- `frontend/src/lib/api.ts` ยังมี helper `verifyEmail` และ `resendVerification` แต่ backend ไม่มี route เหล่านี้แล้ว
- NextAuth runtime config ใน `frontend/src/app/api/auth/[...nextauth]/route.ts` ยังไม่ใช้ config ชุดเดียวกับ `options.ts` ทำให้ session fields อย่าง `accessToken` อาจไม่ถูกส่งต่อครบตามที่ API wrapper คาดหวัง
- `/login` ยังลิงก์ไป `/forgot-password` แต่ยังไม่มี page หรือ backend flow สำหรับ reset password
- `GET /api/ideas` รับ query `category` ในบางชั้นของระบบ แต่ route backend ยังไม่ได้ใช้ค่าดังกล่าวในการ filter จริง
- `GET /api/transactions/summary/stats` ส่งค่า `streak: 0` เป็น placeholder
- หน้า upgrade และ checkout เป็น UI prototype ยังไม่มีระบบ subscription หรือ payment backend จริง

## Deployment

ไฟล์ `render.yaml` มี base configuration สำหรับ frontend, backend และ PostgreSQL บน Render แล้ว แต่ก่อน deploy จริงควรตรวจค่าต่อไปนี้อีกครั้ง:

- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_API_URL`
- `FRONTEND_URL`
- `JWT_SECRET`
- `REFRESH_TOKEN_SECRET`

ให้แน่ใจว่า frontend ชี้ไป backend จริง และ backend อนุญาต CORS จาก frontend domain จริง

## License

MIT
