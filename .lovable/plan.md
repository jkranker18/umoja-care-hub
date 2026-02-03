

# Update "Health Coach" to "My Care Team"

## Overview

Update the navigation label from "Health Coach" to "My Care Team" across all relevant UI locations. This creates a more inclusive title that can represent health coaches, registered dietitians, or other clinical care providers.

---

## File Changes Summary

| File | Change |
|------|--------|
| `src/components/layout/Sidebar.tsx` | Update nav item label from "Health Coach" to "My Care Team" |
| `src/pages/member/MemberHome.tsx` | Update TabsTrigger label from "Health Coach" to "My Care Team" |

---

## Technical Details

### 1. Sidebar.tsx

Update the `memberNav` array:

```typescript
// Change:
{ label: 'Health Coach', path: '/member', icon: CalendarCheck, tabId: 'coach' }

// To:
{ label: 'My Care Team', path: '/member', icon: CalendarCheck, tabId: 'coach' }
```

Note: The `tabId: 'coach'` remains unchanged as it's an internal identifier.

### 2. MemberHome.tsx

Update the TabsTrigger component:

```tsx
// Change:
<TabsTrigger value="coach">Health Coach</TabsTrigger>

// To:
<TabsTrigger value="coach">My Care Team</TabsTrigger>
```

---

## What Stays the Same

- Tab value (`coach`) - internal identifier, no user-facing impact
- Icon (`CalendarCheck`) - still appropriate for care team appointments
- All functionality remains identical

---

## Acceptance Criteria

After implementation:
- Sidebar shows "My Care Team" instead of "Health Coach"
- Tab bar shows "My Care Team" instead of "Health Coach"
- Clicking the nav item or tab still navigates to the same content

