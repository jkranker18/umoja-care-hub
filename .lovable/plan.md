

# Update Health Plan Portal - Blue Cross

## Overview
Restructure the Health Plan portal with "Blue Cross" branding, fix sidebar navigation, create dedicated pages for outcomes and member drill-down, and add a Profile page for managing authorized users.

## Changes Summary

| Current Nav Item | New Nav Item | Action |
|-----------------|--------------|--------|
| Overview | Home | Rename, keep pointing to dashboard |
| Outcomes | Outcomes Report | Keep, create dedicated page |
| Members | Member Drill Down | Keep, create dedicated page |
| Reports | Remove | Not needed |
| - | Profile | Add new - authorized users management |

---

## 1. Sidebar Navigation Update

**File:** `src/components/layout/Sidebar.tsx`

Update `healthplanNav` array:
```tsx
const healthplanNav: NavItem[] = [
  { label: 'Home', path: '/healthplan', icon: Home },
  { label: 'Outcomes Report', path: '/healthplan/outcomes', icon: BarChart3 },
  { label: 'Member Drill Down', path: '/healthplan/members', icon: Users },
  { label: 'Profile', path: '/healthplan/profile', icon: Building2 },
];
```

Update sidebar logo area to show "Blue Cross" text when role is `healthplan`:
- Display "Blue Cross" as styled text instead of an image (no logo asset available)

---

## 2. Dashboard Branding Update

**File:** `src/pages/healthplan/HealthPlanDashboard.tsx`

- Add `useEffect` to set `currentRole` to `'healthplan'` on mount (fix sidebar issue)
- Update header title from "Health Plan Overview" to "Blue Cross Dashboard"
- Remove "View Outcomes Report" and "Member Drilldown" quick action buttons (now in sidebar)

---

## 3. New Outcomes Report Page

**File:** `src/pages/healthplan/HealthPlanOutcomes.tsx` (new file)

Create a dedicated outcomes report page with:
- Clinical outcomes metrics (HbA1c improvements, blood pressure changes)
- Program completion rates
- Cost savings analysis
- Member satisfaction scores
- Exportable report functionality
- Add `useEffect` to set `currentRole` to `'healthplan'`

---

## 4. New Member Drill Down Page

**File:** `src/pages/healthplan/HealthPlanMembers.tsx` (new file)

Create a member drill-down page with:
- Searchable/filterable member table
- Member demographics and program status
- Risk stratification view
- Click-through to member detail
- Add `useEffect` to set `currentRole` to `'healthplan'`

---

## 5. New Profile Page (Authorized Users)

**File:** `src/pages/healthplan/HealthPlanProfile.tsx` (new file)

Create a profile page similar to CBO Organization page:
- **Organization Card**: Blue Cross name, Plan ID, contact information
- **Authorized Users Table**: Staff with portal access (name, email, role, status, last login)

---

## 6. Mock Data Update

**File:** `src/lib/mockData.ts`

Add health plan organization and authorized users:

```typescript
export interface HealthPlan {
  id: string;
  name: string;
  planId: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  address: string;
  memberCount: number;
}

export interface HealthPlanUser {
  id: string;
  healthPlanId: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin?: string;
}

export const healthPlans: HealthPlan[] = [
  {
    id: 'hp-001',
    name: 'Blue Cross of California',
    planId: 'BCCA-2024',
    contactName: 'Jennifer Adams',
    contactEmail: 'jadams@bluecross.com',
    phone: '(800) 555-BLUE',
    address: '21555 Oxnard St, Woodland Hills, CA 91367',
    memberCount: 50,
  },
];

export const healthPlanUsers: HealthPlanUser[] = [
  {
    id: 'hp-user-001',
    healthPlanId: 'hp-001',
    name: 'Jennifer Adams',
    email: 'jadams@bluecross.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-28',
  },
  // ... more users
];
```

---

## 7. Route Updates

**File:** `src/App.tsx`

Update health plan routes:
```tsx
{/* Health Plan Portal */}
<Route path="/healthplan" element={<HealthPlanDashboard />} />
<Route path="/healthplan/outcomes" element={<HealthPlanOutcomes />} />
<Route path="/healthplan/members" element={<HealthPlanMembers />} />
<Route path="/healthplan/profile" element={<HealthPlanProfile />} />
```

---

## Visual Design

### Sidebar Logo for Health Plan
```text
┌─────────────────────────────┐
│  🏥 Blue Cross              │
│  of California              │
└─────────────────────────────┘
```

### Profile Page Layout
```text
┌─────────────────────────────────────────────────────────────┐
│  Organization Profile                                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Blue Cross of California                            │   │
│  │  Plan ID: BCCA-2024                                  │   │
│  │                                                       │   │
│  │  Contact: Jennifer Adams                              │   │
│  │  Email: jadams@bluecross.com                         │   │
│  │  Phone: (800) 555-BLUE                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Authorized Users                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Name            │ Email          │ Role    │ Status │   │
│  │  Jennifer Adams  │ jadams@...     │ Admin   │ Active │   │
│  │  Michael Torres  │ mtorres@...    │ Analyst │ Active │   │
│  │  Sarah Kim       │ skim@...       │ Viewer  │ Active │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/layout/Sidebar.tsx` | Modify - update nav and logo |
| `src/pages/healthplan/HealthPlanDashboard.tsx` | Modify - add role fix, update branding |
| `src/pages/healthplan/HealthPlanOutcomes.tsx` | Create - outcomes report page |
| `src/pages/healthplan/HealthPlanMembers.tsx` | Create - member drill-down page |
| `src/pages/healthplan/HealthPlanProfile.tsx` | Create - authorized users page |
| `src/lib/mockData.ts` | Modify - add health plan data |
| `src/App.tsx` | Modify - update routes |

---

## Technical Notes

- Each health plan page will include `useEffect` to set `currentRole('healthplan')` ensuring correct sidebar navigation
- Profile page follows the same pattern as CBO Organization for consistency
- Member drill-down uses existing mock member data
- Outcomes report uses mock metrics for demo purposes

