

# Update Internal Section Left Rail Navigation

## Overview
Simplify the internal navigation to show only "Home" and "Admins" as requested.

## Current State
```
- Ops Cockpit     → /internal
- Admin Management → /internal/admins  
- Service Cases   → /internal/cases
```

## Updated Navigation
```
- Home   → /internal
- Admins → /internal/admins
```

## Changes

**File:** `src/components/layout/Sidebar.tsx`

Update the `internalNav` array (lines 56-60):

| Before | After |
|--------|-------|
| `Ops Cockpit` | `Home` |
| `Admin Management` | `Admins` |
| `Service Cases` | *(removed)* |

The icons will be updated accordingly:
- Home → `Home` icon
- Admins → `Users` icon

