# Testing Quick Reference

## Running Tests

### Backend
```bash
cd backend
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
```

### Frontend
```bash
cd frontend
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
```

### E2E Tests
```bash
cd frontend
pnpm playwright test           # Run E2E tests
pnpm playwright test --headed  # With UI
```

### All Tests (from root)
```bash
pnpm test              # Run all tests
```

---

## Test Structure

```
SideSpark/
├── backend/src/__tests__/
│   ├── routes/              # API route tests
│   │   ├── skills.test.ts
│   │   ├── ideas.test.ts
│   │   ├── projects.test.ts
│   │   └── transactions.test.ts
│   └── lib/                 # Database tests
│       └── prisma.test.ts
│
├── frontend/src/__tests__/
│   ├── components/          # Component tests
│   │   ├── navbar.test.tsx
│   │   └── hero.test.tsx
│   └── app/                 # Page tests
│       └── page.test.tsx
│
└── frontend/e2e/            # E2E tests
    ├── user-flow.spec.ts
    └── auth-flow.spec.ts
```

---

## Writing a New Test

### Backend API Test
```bash
# Create file
touch backend/src/__tests__/routes/your-route.test.ts
```

```typescript
import request from 'supertest';
import app from '../../app';

describe('Your API Route', () => {
  it('should return expected data', async () => {
    const response = await request(app)
      .get('/api/your-route')
      .expect(200);

    expect(response.body).toHaveProperty('data');
  });
});
```

### Frontend Component Test
```bash
# Create file
touch frontend/src/__tests__/components/your-component.test.tsx
```

```typescript
import { render, screen } from '@testing-library/react';
import YourComponent from '@/components/your-component';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### E2E Test
```bash
# Create file
touch frontend/e2e/your-flow.spec.ts
```

```typescript
import { test, expect } from '@playwright/test';

test('your user flow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Your Button');
  await expect(page).toHaveURL('/expected-page');
});
```

---

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm test` | Run all tests |
| `pnpm test:watch` | Watch mode for development |
| `pnpm test:coverage` | Generate coverage report |
| `pnpm test filename` | Run specific test file |

---

## Checklist

- [ ] Tests run successfully: `pnpm test`
- [ ] Coverage meets thresholds (Backend 80%+, Frontend 70%+)
- [ ] All new features have tests
- [ ] E2E tests cover critical user flows

---
