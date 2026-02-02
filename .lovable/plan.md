
# Fix: Sync Demo Member Details with Healthie Account

## Problem

The booking iframe is pre-populating form fields from mock data (`jsmith@email.com`, John Smith) but the authenticated Healthie account uses different details (`jason@wellchemy.ai`, John TestSmith). This causes:

1. Appointments booked through the iframe to create a new Healthie patient record
2. Those appointments don't appear in "My Appointments" because they query the original authenticated user ID

## Solution

Update the demo member (member[0]) in `src/lib/mockData.ts` to match the Healthie account credentials exactly.

### File: `src/lib/mockData.ts`

Update the first member entry around line 408:

| Field | Current Value | New Value |
|-------|---------------|-----------|
| `name` | `John Smith` | `John TestSmith` |
| `firstName` | `John` | `John` |
| `lastName` | `Smith` | `TestSmith` |
| `email` | `jsmith@email.com` | `jason@wellchemy.ai` |
| `phone` | `(213) 555-0001` | `303829837` |

```typescript
{
  id: 'mem-001',
  name: 'John TestSmith',
  firstName: 'John',
  lastName: 'TestSmith',
  dob: '1958-03-15',
  address: '123 Main St',
  city: 'Los Angeles',
  state: 'CA',
  zip: '90001',
  county: 'Los Angeles',
  phone: '303829837',
  email: 'jason@wellchemy.ai',
  // ... rest unchanged
}
```

## Result

After this change:
1. The booking iframe will pre-fill with `jason@wellchemy.ai` and `John TestSmith`
2. When you book an appointment, it will be associated with the same Healthie patient ID used for authentication
3. The "My Appointments" section will show the newly booked appointment

## Files to Modify

| File | Change |
|------|--------|
| `src/lib/mockData.ts` | Update member[0] details to match Healthie account |
