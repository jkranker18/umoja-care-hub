

# Update Internal Ops Section

## Overview
Clean up the Internal Ops dashboard by removing external system references (Healthie/NetSuite), adding an admin creation page, removing unused features, and updating the sidebar navigation.

---

## Changes Summary

| Area | Current | Action |
|------|---------|--------|
| Pipeline Cards | Show Healthie/NetSuite badges | Remove integration badges |
| Eligibility Queue | Shows NetSuite badge & source | Remove all NetSuite references |
| Delivery Queue | Shows NetSuite badge & source | Remove all NetSuite references |
| Consents Queue | Shows Healthie badge & source | Remove all Healthie references |
| Bottom Buttons | Rules Engine, Campaigns, Integration Status | Remove entire section |
| Admin Management | Does not exist | Add new page |
| Left Rail Nav | 7 items including Rules/Campaigns | Simplify to 4 items |

---

## 1. Remove Integration Badges from Pipeline Cards

**File:** `src/components/internal/ProgramPipelineDashboard.tsx`

Changes:
- Remove `IntegrationBadge` import
- Remove `source` property from `PillarData` interface
- Remove `source` from each pillar definition
- Remove `<IntegrationBadge>` component from pillar card headers

Before:
```tsx
<div className="flex items-center justify-between">
  <div className="flex items-center gap-2">
    ...
  </div>
  <IntegrationBadge type={pillar.source} />
</div>
```

After:
```tsx
<div className="flex items-center gap-2">
  ...
</div>
```

---

## 2. Remove NetSuite/Healthie from Exception Queues

**File:** `src/pages/internal/InternalOpsDashboard.tsx`

Remove from **Eligibility Exceptions** tab:
- Line 99: `<IntegrationBadge type="NetSuite" />`
- Line 168: `<SourceOfTruth source="NetSuite" description="Rules Engine & Eligibility" />`

Remove from **Delivery Exceptions** tab:
- Line 182: `<IntegrationBadge type="NetSuite" />`
- Line 237: `<SourceOfTruth source="NetSuite" description="Order Fulfillment" />`

Remove from **Missing Consents** tab:
- Line 326: `<IntegrationBadge type="Healthie" />`
- Line 370: `<SourceOfTruth source="Healthie" description="Consent Management" />`

Also remove unused imports:
- `IntegrationBadge`
- `SourceOfTruth`

---

## 3. Remove Bottom Quick Links Section

**File:** `src/pages/internal/InternalOpsDashboard.tsx`

Remove the entire "Quick Links" section (lines 376-390):
```tsx
{/* Quick Links */}
<div className="flex flex-wrap gap-3">
  <Button variant="outline" onClick={() => navigate('/internal/rules')}>...</Button>
  <Button variant="outline" onClick={() => navigate('/internal/campaigns')}>...</Button>
  <Button variant="outline" onClick={() => navigate('/internal/integrations')}>...</Button>
</div>
```

---

## 4. Create Admin Management Page

**File:** `src/pages/internal/AdminManagement.tsx` (new file)

Create a page for internal admins to manage CBO and Health Plan administrators:

Features:
- Tab interface: "CBO Admins" and "Health Plan Admins"
- Table showing existing admins (name, email, organization, role, status, last login)
- "Add Admin" button that opens a dialog
- Form fields: Name, Email, Organization (dropdown), Role (dropdown)
- Uses mock data for organizations (CBOs and Health Plans)

```tsx
interface AdminUser {
  id: string;
  name: string;
  email: string;
  organizationType: 'cbo' | 'healthplan';
  organizationId: string;
  organizationName: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
}
```

Page layout:
```text
+----------------------------------------------------------+
|  Admin Management                                         |
|  Manage administrator access for CBOs and Health Plans    |
+----------------------------------------------------------+
|  [CBO Admins]  [Health Plan Admins]         [+ Add Admin] |
+----------------------------------------------------------+
|  Name          | Email        | Org    | Role  | Status  |
|  Maria Garcia  | m@lafb.org   | LA FB  | Admin | Active  |
|  John Smith    | j@lafb.org   | LA FB  | Staff | Active  |
|  ...                                                      |
+----------------------------------------------------------+
```

Add Admin Dialog:
```text
+----------------------------------+
|  Add New Administrator       [X] |
+----------------------------------+
|  Organization Type               |
|  [CBO / Health Plan]             |
|                                  |
|  Organization                    |
|  [Select organization v]         |
|                                  |
|  Name                            |
|  [________________]              |
|                                  |
|  Email                           |
|  [________________]              |
|                                  |
|  Role                            |
|  [Admin / Staff / Viewer v]      |
|                                  |
|  [Cancel]           [Add Admin]  |
+----------------------------------+
```

---

## 5. Update Sidebar Navigation

**File:** `src/components/layout/Sidebar.tsx`

Update `internalNav` array:

Before:
```tsx
const internalNav: NavItem[] = [
  { label: 'Ops Cockpit', path: '/internal', icon: LayoutDashboard },
  { label: 'Workflows', path: '/internal/workflows', icon: GitBranch },
  { label: 'Rules Engine', path: '/internal/rules', icon: Shield },
  { label: 'Campaigns', path: '/internal/campaigns', icon: MessageSquare },
  { label: 'Service Cases', path: '/internal/cases', icon: AlertTriangle },
  { label: 'Integrations', path: '/internal/integrations', icon: Zap },
  { label: 'Data Explorer', path: '/internal/data', icon: Database },
];
```

After:
```tsx
const internalNav: NavItem[] = [
  { label: 'Ops Cockpit', path: '/internal', icon: LayoutDashboard },
  { label: 'Admin Management', path: '/internal/admins', icon: Users },
  { label: 'Service Cases', path: '/internal/cases', icon: AlertTriangle },
];
```

Removed items:
- Workflows (placeholder)
- Rules Engine (per request)
- Campaigns (per request)
- Integrations (per request - Integration Status)
- Data Explorer (placeholder)

---

## 6. Update Routes

**File:** `src/App.tsx`

Update internal routes:

Before:
```tsx
<Route path="/internal" element={<InternalOpsDashboard />} />
<Route path="/internal/workflows" element={<InternalOpsDashboard />} />
<Route path="/internal/rules" element={<InternalOpsDashboard />} />
<Route path="/internal/campaigns" element={<InternalOpsDashboard />} />
<Route path="/internal/cases" element={<InternalOpsDashboard />} />
<Route path="/internal/integrations" element={<Integrations />} />
<Route path="/internal/data" element={<InternalOpsDashboard />} />
```

After:
```tsx
<Route path="/internal" element={<InternalOpsDashboard />} />
<Route path="/internal/admins" element={<AdminManagement />} />
<Route path="/internal/cases" element={<InternalOpsDashboard />} />
```

---

## 7. Add Mock Admin Data

**File:** `src/lib/mockData.ts`

Add admin users data structure combining CBO and Health Plan users for the admin management page:

```typescript
export interface PortalAdmin {
  id: string;
  name: string;
  email: string;
  organizationType: 'cbo' | 'healthplan';
  organizationId: string;
  organizationName: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
}

export const portalAdmins: PortalAdmin[] = [
  // CBO admins from cboUsers
  ...cboUsers.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    organizationType: 'cbo' as const,
    organizationId: u.cboId,
    organizationName: cbos.find(c => c.id === u.cboId)?.name || '',
    role: u.role,
    status: u.status,
    lastLogin: u.lastLogin,
  })),
  // Health Plan admins from healthPlanUsers
  ...healthPlanUsers.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    organizationType: 'healthplan' as const,
    organizationId: u.healthPlanId,
    organizationName: healthPlans.find(h => h.id === u.healthPlanId)?.name || '',
    role: u.role,
    status: u.status,
    lastLogin: u.lastLogin,
  })),
];
```

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/internal/ProgramPipelineDashboard.tsx` | Modify - remove integration badges |
| `src/pages/internal/InternalOpsDashboard.tsx` | Modify - remove NetSuite/Healthie refs and bottom buttons |
| `src/pages/internal/AdminManagement.tsx` | Create - admin management page |
| `src/components/layout/Sidebar.tsx` | Modify - update internal nav |
| `src/App.tsx` | Modify - update routes |
| `src/lib/mockData.ts` | Modify - add portal admin data |

---

## Technical Notes

- The Admin Management page follows the same table pattern used in CBO Organization and Health Plan Profile pages
- Form validation will use the same patterns as MemberSignup
- The page uses existing mock data (cboUsers, healthPlanUsers, cbos, healthPlans) to populate the combined admin list
- Status changes are demo-only (localStorage could be added if persistence is needed)

