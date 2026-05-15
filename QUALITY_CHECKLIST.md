# Quality Checklist

## Pre-Commit Checklist

### Code Quality
- [ ] Code follows existing patterns and conventions
- [ ] No `console.log` left in production code
- [ ] No commented-out code blocks
- [ ] Proper error handling implemented
- [ ] TypeScript `any` types avoided (define proper types)

### Testing
- [ ] Tests added for new features
- [ ] All tests pass: `pnpm test`
- [ ] Test coverage not decreased

### Security
- [ ] No hardcoded secrets or API keys
- [ ] User inputs are validated/sanitized
- [ ] Sensitive data not logged

### Language
- [ ] UI text in Thai (for user-facing features)
- [ ] Error messages consistent (Thai/English)

### Documentation
- [ ] CLAUDE.md updated if API/routes changed
- [ ] Complex code has comments explaining why

---

## Pre-Release Checklist

### Backend
- [ ] All API endpoints tested manually
- [ ] Database migrations run successfully
- [ ] Environment variables documented
- [ ] No TODO/FIXME in critical paths

### Frontend
- [ ] All pages load without errors
- [ ] Mobile responsive tested
- [ ] Cross-browser tested (Chrome, Safari, Edge)
- [ ] Loading states implemented
- [ ] Error boundaries catch errors

### Security
- [ ] Rate limiting configured
- [ ] CORS settings correct
- [ ] Auth middleware on protected routes
- [ ] SQL injection reviewed
- [ ] XSS vulnerabilities checked

### Performance
- [ ] No N+1 queries
- [ ] Images optimized
- [ ] Bundle size checked
- [ ] Large pages have pagination

### Data
- [ ] Database backed up before migration
- [ ] Seed data tested
- [ ] Cascade deletes verified

---

## Quick Commands

```bash
# Before committing
pnpm test              # Run all tests
pnpm lint              # Check code style
pnpm type-check        # Verify TypeScript types

# Before release
pnpm build             # Build production bundles
pnpm test:coverage     # Check coverage
pnpm prisma:migrate    # Run migrations
```

---

## Common Pitfalls

| Issue | Check |
|-------|-------|
| Hardcoded API URLs | Use `process.env.NEXT_PUBLIC_API_URL` |
| Missing error handling | Wrap async in try/catch |
| SQL injection | Use Prisma, not raw SQL |
| XSS in user input | Sanitize all user inputs |
| Token exposure | Don't store tokens in localStorage |
| Timezone issues | Use UTC for storage, local for display |
| Missing Thai translation | Check UI text language |

---

## Release Blockers

**DO NOT release if:**
- Tests are failing
- Unhandled exceptions in logs
- Security vulnerabilities unpatched
- Database not backed up
- No rollback plan

---

**Last Updated:** 2026-04-07