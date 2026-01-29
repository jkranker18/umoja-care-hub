

# Link Healthie User ID for Chat Integration

## Overview
Update the mock data to use the provided Healthie user ID (13159857) so the chat integration will connect to the correct account.

---

## Change Required

**File: `src/lib/mockData.ts`**

Update line 401 to set the Healthie user ID:

```typescript
// Before
healthieUserId: '', // Set this to the member's Healthie user ID for chat

// After  
healthieUserId: '13159857', // Linked Healthie user ID for chat
```

---

## What This Enables

Once updated, when you navigate to the Health Coach tab:
1. The HealthieChatWrapper will receive the user ID `13159857`
2. The HealthieProvider will authenticate with this user
3. You'll see the chat conversations for this Healthie account

---

## Files Modified

| File | Change |
|------|--------|
| `src/lib/mockData.ts` | Set `healthieUserId` to `'13159857'` on line 401 |

