
# Update CBO Portal Navigation & Organization Page

## Overview
Simplify the CBO sidebar navigation and create a dedicated Organization page that displays the CBO's identity and authorized users.

## Changes Summary

| Current Nav Item | Action |
|-----------------|--------|
| Dashboard | Keep (rename to "Home") |
| Member Roster | Remove from nav (content stays on Dashboard) |
| Add Member | Remove from nav |
| Organization | Keep - but create proper dedicated page |

## 1. Sidebar Navigation Update

**File:** `src/components/layout/Sidebar.tsx`

Update `cboNav` array from:
```tsx
const cboNav: NavItem[] = [
  { label: 'Dashboard', path: '/cbo', icon: LayoutDashboard },
  { label: 'Member Roster', path: '/cbo/members', icon: Users },
  { label: 'Add Member', path: '/cbo/add-member', icon: PlusCircle },
  { label: 'Organization', path: '/cbo/organization', icon: Building2 },
];
```

To:
```tsx
const cboNav: NavItem[] = [
  { label: 'Home', path: '/cbo', icon: Home },
  { label: 'Organization', path: '/cbo/organization', icon: Building2 },
];
```

## 2. New CBO Organization Page

**File:** `src/pages/cbo/CBOOrganization.tsx` (new file)

Create a dedicated page displaying:

### Partner Information Card
- **Partner ID**: The CBO's unique partner identifier (e.g., PRTN-LA001)
- **Organization Name**: Full organization name
- **Contact Information**: Primary contact, email, phone
- **Service Area**: Counties/cities served
- **Referral Link**: Copy-able enrollment link

### Authorized Users Table
Display a list of users authorized to log in on behalf of the CBO:
- Name
- Email
- Role (Admin, Staff, Viewer)
- Status (Active/Inactive)
- Last Login

For the POC, this will use mock data for authorized users.

## 3. Mock Data Update

**File:** `src/lib/mockData.ts`

Add `CBOUser` interface and sample authorized users:

```typescript
export interface CBOUser {
  id: string;
  cboId: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin?: string;
}

export const cboUsers: CBOUser[] = [
  {
    id: 'cbo-user-001',
    cboId: 'cbo-001',
    name: 'Maria Garcia',
    email: 'mgarcia@laregionalfoodbank.org',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-28',
  },
  // ... more users
];
```

## 4. Route Update

**File:** `src/App.tsx`

Update CBO routes:
- Keep `/cbo` pointing to `CBODashboard`
- Update `/cbo/organization` to point to new `CBOOrganization` component
- Remove or keep `/cbo/members` and `/cbo/add-member` routes (they can stay for direct access but won't be in nav)

## Visual Design

The Organization page will follow the existing card-based layout:

```text
┌─────────────────────────────────────────────────────────────┐
│  Organization Profile                                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │  LA Regional Food Bank                               │   │
│  │  Partner ID: PRTN-LA001                              │   │
│  │                                                       │   │
│  │  Primary Contact: Maria Garcia                        │   │
│  │  Email: mgarcia@laregionalfoodbank.org               │   │
│  │  Phone: (323) 555-0101                               │   │
│  │                                                       │   │
│  │  Service Area: Los Angeles, Long Beach, Pasadena     │   │
│  │                                                       │   │
│  │  Referral Link: https://umoja.health/enroll?partner= │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Authorized Users                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Name          │ Email         │ Role   │ Status    │   │
│  │  Maria Garcia  │ mgarcia@...   │ Admin  │ Active    │   │
│  │  Jose Martinez │ jmartinez@... │ Staff  │ Active    │   │
│  │  Sarah Johnson │ sjohnson@...  │ Viewer │ Inactive  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Files to Modify/Create

1. **`src/components/layout/Sidebar.tsx`** - Simplify CBO navigation
2. **`src/pages/cbo/CBOOrganization.tsx`** - New organization page (create)
3. **`src/lib/mockData.ts`** - Add CBOUser interface and mock users
4. **`src/App.tsx`** - Update route for `/cbo/organization`

## Technical Notes

- The Dashboard will still contain the member roster and "Add Member" button for quick access
- Routes for `/cbo/members` and `/cbo/add-member` will remain functional for bookmarks/direct links
- Organization page uses existing mock CBO data plus new authorized users data
- Follows mobile-first responsive design with card stacking on smaller screens
