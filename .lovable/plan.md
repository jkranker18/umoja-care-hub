
# Add Healthie Credentials for John TestSmith

## Summary

A quick update to add the Healthie login credentials for the test member so the per-user authentication flow can work.

## Change Required

Update `src/lib/mockData.ts` lines 406-407 to add the provided credentials:

**Before:**
```typescript
healthieEmail: '', // e.g., 'johntestsmith@example.com'
healthiePassword: '', // e.g., 'password123'
```

**After:**
```typescript
healthieEmail: 'jason@wellchemy.ai',
healthiePassword: 'Tightlines2026..',
```

## What Happens Next

Once the credentials are added:
1. Navigate to the Member Home page and click the "Health Coach" tab
2. The system will authenticate with Healthie using these credentials
3. The chat should load showing John TestSmith's conversation (ID: 17976028)
4. Messages sent will appear as from the member, not the admin

## File to Modify

| File | Change |
|------|--------|
| `src/lib/mockData.ts` | Add email and password on lines 406-407 |
