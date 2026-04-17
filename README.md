## SideSpark
ระบบสำรวจไอเดีย side hustle สำหรับนักศึกษา

**SideSpark** ช่วยนักศึกษาค้นหาไอเดียหารายได้เสริมจากทักษะของตนเอง 
วางแผนโปรเจกต์ และติดตามรายได้อย่างเป็นระบบ

## Features
- Idea Explorer — ค้นหาไอเดีย side hustle ตามทักษะ
- Mini Business Plan — วางแผนธุรกิจขนาดเล็กอย่างเป็นขั้นตอน
- Income Tracker — ติดตามรายได้จากแต่ละโปรเจกต์
- Progress Dashboard — ดูความคืบหน้าและวิเคราะห์รายได้

## Vision & Goals

### Problem Statement
นักศึกษาหลายคนอยากหารายได้เสริมแต่:
1.ไม่รู้ว่ามีทางเลือกอะไรบ้างที่เหมาะกับตัวเอง
2.ไม่รู้จะเริ่มต้นอย่างไร
3.ไม่มีระบบติดตามรายได้และความคืบหน้า

### Solution
แอป SideSpark ช่วยสำรวจไอเดีย side hustle ตามทักษะ วางแผนโปรเจกต์ และติดตามรายได้อย่างเป็นระบบ

### Target Users
- Primary: นักศึกษาที่อยากหารายได้เสริม
- Secondary: คนรุ่นใหม่ที่สนใจเริ่มต้นธุรกิจเล็กๆ

### Success Metrics
| Metric                   | Target              | Current |
|--------------------------|---------------------|---------|
| จำนวนผู้ใช้ต่อเดือน (MAU)     | 300 users           | -       |
| อัตรา retention (7 วัน)    | 40%                 | -       |
| อัตรา Idea → Project (%)  | 30%                 | -       |
| จำนวนโปรเจกต์เฉลี่ยต่อผู้ใช้    | 2 projects/user     | -       |
| รายได้เฉลี่ยต่อผู้ใช้           | 1,000 บาท/เดือน      | -       |

## Roadmap

### Current Sprint (Sprint 2)
| Task                         | Assignee | Status        |
|------------------------------|----------|--------------|
| พัฒนาหน้าสำรวจ                 | thatphong saikham (@thatphongsaikham)| In Progress  |
| พัฒนาหน้าจัดการโปรเจกต์           |thatphong saikham (@thatphongsaikham)| In Progress  |
| พัฒนาหน้าความสำเร็จ              | thatphong saikham (@thatphongsaikham)| In Progress  |
| พัฒนาหน้าแพ็กเกจ + ชำระเงิน       | thatphong saikham (@thatphongsaikham)| In Progress  |
| พัฒนาหน้าโปรไฟล์                | thatphong saikham (@thatphongsaikham)| In Progress  |
| ออกแบบโครงสร้างฐานข้อมูล          | thatphong saikham (@thatphongsaikham)| In Progress  |
| เชื่อมหน้า UI กับข้อมูลจริง          | thatphong saikham (@thatphongsaikham)| In Progress  |
| ตั้งค่า CD                       | Premch Phaosatheanthanon (@Premch504)| In Progress  |
| ทำ Code Review                | Premch Phaosatheanthanon (@Premch504)| In Progress  |
| ตรวจสอบการทำงานของ CI/CD       | Premch Phaosatheanthanon (@Premch504)| In Progress  |

### Milestones
- [x] Sprint 1: Idea Explorer + Basic UI + Project Setup
- [x] Sprint 2: Mini Business Plan + Income Tracker (Core Features)
- [ ] Sprint 3: Progress Dashboard + UX Improvements + Documentation

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

## Team

| Name | Role | Responsibilities |
| Natkritta Thanatnan | PM | วางแผนจัดการโปรเจกต์, จัดตารางงานใน Notion และติดตามความคืบหน้า |
| Porntawa Jindathum | SM | ดูแลภาพรวม Sprint, ประสานงานในทีม, และแก้ไขปัญหาอุปสรรค (Blockers) |
| Thatphong Saikham | Developer | พัฒนาหน้าเว็บ (Frontend), ออกแบบฐานข้อมูล และเชื่อมต่อ API (Full-Stack) |
| Panaphat Chankhiri | QA | ทดสอบการใช้งานแต่ละหน้าเว็บ, ทดสอบ Flow ของระบบ และแจ้ง Bug |
| Premch Phaosatheanthanon | DevOps | ตั้งค่า GitHub, Branch protection, ทำ CI/CD, Review Code และ Deploy เว็บ |
| Wannapa Dongngam | UX/UI | ออกแบบ Wireframe, UI Design, กำหนด Color System และปรับแก้หน้าจอคอม |

## Communication
- **ประชุม**: อัปเดตงานและประชุมออนไลน์ผ่านแชแนลใน Microsoft Teams (นัดหมายตามวันเวลาที่ทีมสะดวก เช่น วันอังคาร)
- **Chat**: พูดคุย, ตามงาน และแจ้งเตือนปัญหาต่างๆ ผ่านทางแชทกลุ่มใน Microsoft Teams
- **Code Review**: Developer ทำการ Push โค้ดและเปิด Pull Request (PR) บน GitHub จากนั้นให้ DevOps เป็นคนตรวจสอบ (Review) โค้ดก่อนกด Merge เข้าสู่ main branch

## Sprint History

### Sprint 1: Project Setup & Initial Design
**Period**: 09 Mar 2026 – 23 Mar 2026

| Planned | Actual | Status |
| :--- | :--- | :--- |
| อธิบายโปรเจกต์และแบ่งงาน | แบ่งงานเสร็จสิ้น แต่อาจจะยังมีความสับสนเรื่องขอบเขตงาน Backend/DevOps | ✅ |
| Setup GitHub, Branch, CI พื้นฐาน | DevOps ตั้งค่า Repository และ CI เรียบร้อย | ✅ |
| ออกแบบ UI & Wireframe ทั้งระบบ | UX/UI ออกแบบเสร็จ แต่วางสัดส่วนหน้าจอมาเป็นแบบมือถือ ไม่ใช่ Desktop | ❌ |
| ขึ้นโครงสร้างหน้าเว็บ (Frontend) | Dev ต้องแก้ปัญหาเฉพาะหน้าโดยการจัด Layout หน้าจอคอมใหม่ด้วยตัวเอง | ✅ |

**Retrospective**:
- **สิ่งที่ทำได้ดี**: Dev มีไหวพริบ สามารถแก้ปัญหาเฉพาะหน้าและขึ้นโครง Layout สำหรับจอ Desktop ออกมาได้สวยงาม
- **สิ่งที่ต้องปรับปรุง**: การบรีฟงานเรื่องขนาดหน้าจอ (Screen Resolution) ไม่ชัดเจนตั้งแต่แรก ทำให้ UX/UI ทำสัดส่วนมาผิด และมีความสับสนเรื่อง Role
- **Action items**: ประชุมเคลียร์ Role ใหม่ให้ชัดเจน (Dev เหมา Full-Stack, DevOps เน้น CI/CD) และให้ UX/UI อิง Layout จอคอมจาก Dev

### Sprint 2: Core Features & Code Integration
**Period**: 24 Mar 2026 – 06 Apr 2026

| Planned | Actual | Status |
| :--- | :--- | :--- |
| พัฒนาหน้าเว็บหลัก (หน้าสำรวจ, จัดการโปรเจกต์ ฯลฯ) | Dev พัฒนาหน้าหลักเสร็จเกือบครบแล้ว และนำขึ้นทดสอบบนเว็บจำลอง (codefasting.com) | ✅ |
| ตั้งค่า Flow การ Review Code และ Branch Protection | DevOps กำหนด Flow (Feature -> Dev -> Main) และเชิญ QA เข้าร่วมตรวจ PR บน GitHub เรียบร้อย | ✅ |
| จัดการเอกสาร Project และงาน Lab | PM อัปเดตไฟล์ fp-analysis.md เข้า docs และตามงาน Lab 11 เสร็จสิ้น | ✅ |
| พัฒนาฟีเจอร์ Login ด้วย Google/Apple | Dev ขอข้ามไปก่อนเนื่องจากมีความซับซ้อน เพื่อโฟกัส MVP ให้ทันเดดไลน์ | ❌ |

**Retrospective**:
- **สิ่งที่ทำได้ดี**: ทีมมีสปีดการทำงานช่วงเสาร์อาทิตย์ที่ยอดเยี่ยมมาก มีการอัปเดตงานในแชทตลอดเวลา Dev สามารถปั่นหน้าเว็บหลักและ Deploy ให้ทีมเทสได้ไวมาก ส่วน DevOps และ QA ก็เริ่มกระบวนการ Review Code (PR) ได้อย่างเป็นระบบ
- **สิ่งที่ต้องปรับปรุง**: การประเมินความยากของบางฟีเจอร์ (เช่น 3rd Party Login) อาจจะยังคลาดเคลื่อน ทำให้ต้องตัดฟีเจอร์ออกชั่วคราวเพื่อรักษาเวลา
- **Action items**: ให้ทีม QA เร่งทดสอบ Flow การใช้งานบนเว็บจำลองที่ Dev สร้างไว้ และทุกคนโฟกัสเคลียร์งาน Lab 13 ให้เสร็จภายใน 19 เม.ย. ตามที่ PM กำหนด

## Development Workflow

### Branch Strategy
- `main` - production-ready code (โค้ดที่สมบูรณ์และพร้อม Deploy ขึ้นเว็บจริง)
- `dev` - integration branch (กิ่งหลักสำหรับรวมโค้ด Feature ต่างๆ เพื่อใช้ทดสอบ)
- `feature/*` - individual features (กิ่งย่อยสำหรับแยกพัฒนาฟีเจอร์ของแต่ละคน)

### Pull Request Process
1. สร้าง branch จาก `dev` เพื่อพัฒนาฟีเจอร์ใหม่
2. เขียน code + tests
3. สร้าง PR -> assign reviewer (แท็กเรียก DevOps และ QA เข้ามาช่วยตรวจ)
4. Review + approve (รีวิวโค้ดและทดสอบการทำงาน)
5. Merge to `dev` (เมื่อระบบนิ่งแล้ว DevOps จะทำการ Merge จาก `dev` เข้าสู่ `main` เพื่อ Deploy)

### Definition of Done
- [x] Code reviewed by at least 1 person (DevOps หรือ QA ตรวจสอบแล้ว)
- [x] Tests pass (ทดสอบ Flow การใช้งานบนเว็บจำลองผ่าน)
- [x] Documentation updated (อัปเดตสถานะงานในตาราง Notion เรียบร้อย)
- [x] No merge conflicts (ไม่มีโค้ดชนกัน)
