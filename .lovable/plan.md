
# Fix: CBO Sidebar Showing Member Navigation

## Problem
When navigating to `/cbo`, the sidebar still shows member navigation items (Home, My Program, My Orders, Education, Profile) instead of the CBO navigation items (Home, Organization).

## Root Cause
The sidebar relies on `currentRole` from `AppContext` to determine which navigation items to display. However, when the page is accessed directly (via URL or refresh), the role isn't being set because:
1. The role is only set when clicking the portal buttons on the Landing page
2. The `CBODashboard` component doesn't call `setCurrentRole('cbo')` when it mounts

## Solution
Add a `useEffect` hook to each dashboard page (`CBODashboard`, `CBOOrganization`, etc.) that sets the appropriate role when the component mounts. This ensures the correct navigation is shown regardless of how the user arrived at the page.

---

## Files to Modify

### 1. `src/pages/cbo/CBODashboard.tsx`
Add `useEffect` to set role on mount:
- Import `useApp` and `useEffect`
- Add: `const { setCurrentRole } = useApp();`
- Add: `useEffect(() => { setCurrentRole('cbo'); }, [setCurrentRole]);`

### 2. `src/pages/cbo/CBOOrganization.tsx`
Add the same `useEffect` pattern to set role to `'cbo'` on mount.

---

## Technical Notes
- The `useEffect` will run once when the component mounts
- Including `setCurrentRole` in the dependency array follows React best practices
- This pattern should be applied consistently across all portal pages for robustness
