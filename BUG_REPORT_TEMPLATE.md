# Bug Report Template

Use this template when reporting bugs in the SideSpark project. Copy this content and fill in the relevant sections.

---

## Bug Title
[Short, descriptive title of the bug]

## Type
- [ ] Bug
- [ ] Feature Request
- [ ] Performance Issue
- [ ] Security Issue
- [ ] UI/UX Issue

## Priority
- [ ] Critical - Blocks functionality, data loss, security breach
- [ ] High - Major functionality broken
- [ ] Medium - Minor functionality affected, workaround available
- [ ] Low - Cosmetic issue, nice to have

## Status
- [ ] New
- [ ] Confirmed
- [ ] In Progress
- [ ] In Review
- [ ] Closed

---

## Description
[Clear and concise description of what the bug is]

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior:**
[What you expected to happen]

**Actual Behavior:**
[What actually happened - include screenshots/videos if applicable]

---

## Environment

### Frontend
- **Browser:** [Chrome / Firefox / Safari / Edge - include version]
- **OS:** [Windows / macOS / Linux / iOS / Android]
- **Screen Size:** [Desktop / Tablet / Mobile]
- **Language:** [Thai / English]

### Backend
- **Node.js Version:** [Run `node --version`]
- **Database:** [PostgreSQL version]

### Project
- **Branch:** [dev / main / other]
- **Commit Hash:** [Run `git log -1 --pretty=format:"%H"`]
- **Last Updated:** [Date]

---

## Screenshots / Videos
[If applicable, add screenshots or screen recordings to help explain the problem]

## Error Messages / Logs
```
[Paste any error messages, console logs, or server logs here]

Example:
Error: Failed to fetch transactions
    at apiRequest (api.ts:42)
    at async TransactionList.tsx:25
```

---

## Code Sample
[If the bug is related to specific code, include the relevant code snippet]

```typescript
// Paste code here
```

---

## Checklist
- [ ] I have searched for similar issues in [KNOWN_ISSUES.md](KNOWN_ISSUES.md)
- [ ] I have provided steps to reproduce
- [ ] I have provided environment details
- [ ] I have included relevant error messages/logs
- [ ] I have tested on the latest version

---

## Additional Context
[Any other context, workarounds, or related issues]

---

## Reproduction Repository (Optional)
[If possible, provide a link to a minimal reproduction repository or code sandbox]

---

## Assignment
- **Assigned To:** [@username]
- **Estimated Effort:** [1h / 2h / 4h / 1d / 2d+]
- **Target Release:** [v1.0 / v1.1 / etc.]

---

## Related Issues
- [Related Issue #1](link)
- [Related Issue #2](link)

---

## Resolution
**Resolution Date:** [DD/MM/YYYY]
**Fixed By:** [@username]
**Pull Request:** #[PR number]
**Resolution Notes:** [Brief description of how the issue was resolved]

---

## Example Bug Report (Filled)

### Bug Title
User cannot delete project after adding transactions

### Type
- [x] Bug

### Priority
- [x] High

### Description
When a user tries to delete a project that has associated transactions, the delete operation silently fails. The project remains in the list with no error message shown to the user.

### Steps to Reproduce
1. Create a new project "Test Project"
2. Add an income transaction to the project
3. Click delete on the project
4. Confirm deletion
5. Project still appears in the list

**Expected Behavior:**
Project should be deleted along with all associated transactions (cascade delete).

**Actual Behavior:**
Project is not deleted, no error message is shown.

### Environment
- **Browser:** Chrome 120
- **OS:** Windows 11
- **Branch:** dev
- **Commit:** 214cb84

### Error Messages / Logs
```
Backend:
Delete project error: PrismaClientKnownRequestError:
Foreign key constraint failed on the field: transactions
```

### Checklist
- [x] I have searched for similar issues
- [x] I have provided steps to reproduce
- [x] I have provided environment details
- [x] I have included relevant error messages/logs

### Additional Context
This is related to the missing cascade delete configuration in the Prisma schema.

---

## Quick Bug Report Format (For Minor Issues)

**Title:** [One-line summary]

**What:** [Brief description]

**Where:** [File path or URL]

**Priority:** [Low/Medium/High]

**Steps:** [Quick reproduction steps]

---

**For critical security issues, please do NOT create a public issue. Instead, contact the maintainers directly via email or private message.**