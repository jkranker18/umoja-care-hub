

# Replace Blue Cross Branding with HCSC

## Overview
Replace all Blue Cross Blue Shield of Illinois branding with HCSC (Health Care Service Corporation) across the health plan portal -- logo and text references.

## Changes

### 1. Add HCSC Logo Asset
- Copy the uploaded HCSC logo to `src/assets/hcsc-logo.png`

### 2. Update Sidebar Logo (src/components/layout/Sidebar.tsx)
- Replace the `bcbs-illinois-logo` import with the new `hcsc-logo.png`
- Update the alt text from "Blue Cross Blue Shield of Illinois" to "HCSC"

### 3. Update Text References

**src/pages/healthplan/HealthPlanDashboard.tsx**
- "Blue Cross Dashboard" → "HCSC Dashboard"

**src/pages/healthplan/HealthPlanProfile.tsx**
- "Staff members with access to the Blue Cross portal" → "Staff members with access to the HCSC portal"

**src/lib/mockData.ts**
- `name: 'Blue Cross of Illinois'` → `name: 'HCSC'`

## Files Modified
- `src/assets/hcsc-logo.png` (new)
- `src/components/layout/Sidebar.tsx`
- `src/pages/healthplan/HealthPlanDashboard.tsx`
- `src/pages/healthplan/HealthPlanProfile.tsx`
- `src/lib/mockData.ts`

