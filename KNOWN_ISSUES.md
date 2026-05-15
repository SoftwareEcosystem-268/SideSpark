# Known Issues (Quick Reference)

## Critical

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 1 | Streak calculation returns 0 | `transactions.ts:364` | Implement calculateStreak() |
| 2 | SQL injection risk | `transactions.ts:301-315` | Use Prisma groupBy or validate userId |

## High Priority

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 3 | Hard redirect on 401 loses data | `api.ts:35-40` | Implement token refresh flow |
| 4 | Error messages expose internals | All routes | Add structured logging |

## Medium Priority

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 5 | Using console.error | All routes | Add Winston/Pino logger |
| 6 | Missing input sanitization | POST/PUT endpoints | Add Zod validation |
| 7 | SessionStorage security | `AuthContext.tsx:28-30` | Use httpOnly cookies |

## Low Priority

| # | Issue | Fix |
|---|-------|-----|
| 8 | TypeScript `any` types | Define proper interfaces |
| 9 | No rate limiting | Add express-rate-limit |
| 10 | Manual validation | Use Zod schemas |

## Feature Gaps

| # | Missing | Priority |
|---|---------|----------|
| 11 | Email verification flow | Medium |
| 12 | Password reset flow | High |

## Performance

| # | Issue | Location |
|---|-------|----------|
| 13 | N+1 query | `transactions.ts:278-293` |

## Quick Fix Commands

```bash
# Add logging library
cd backend && pnpm add winston

# Add validation library
cd backend && pnpm add zod

# Add rate limiting
cd backend && pnpm add express-rate-limit
```

---

**See [KNOWN_ISSUES.md](KNOWN_ISSUES.md) for detailed documentation.**

**To report new issues, use [BUG_REPORT_TEMPLATE.md](BUG_REPORT_TEMPLATE.md)**
