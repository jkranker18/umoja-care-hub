

# Mobile-Friendliness Audit & Fixes

## Overview
A comprehensive review of all pages and components identified several mobile responsiveness issues, primarily in the /member section but also across other dashboards. This plan addresses layout, touch target, table overflow, and tab navigation issues.

## Audit Summary

### What's Already Working Well
- DashboardLayout and Sidebar have proper mobile overlay behavior
- Header uses `lg:hidden` hamburger menu pattern correctly
- Most Card components are inherently responsive
- Dialog/Modal components have proper `sm:` breakpoint handling
- KPICard grids use responsive `md:grid-cols-2 lg:grid-cols-4` patterns

### Issues Found

| Location | Issue | Severity |
|----------|-------|----------|
| MemberHome TabsList | Tabs overflow horizontally on small screens, no scrolling | High |
| MemberHome Order History | Order rows have cramped layout with buttons on mobile | High |
| MemberProfile Address Form | `grid-cols-6` layout breaks on mobile | Medium |
| MemberSignup Step 3 | `grid-cols-2` checkboxes too cramped on very small screens | Low |
| InternalOpsDashboard TabsList | Tab triggers with icons overflow on mobile | High |
| CBODashboard Table | Table has horizontal scroll but may be difficult to use | Medium |
| HealthPlanDashboard | Filter controls bunch up on mobile | Medium |
| Landing Page Portal Buttons | `grid-cols-2 lg:grid-cols-4` works but touch targets could be larger | Low |
| ProgramPipelineDashboard | Pipeline flow indicator text is cramped on mobile | Medium |

## Implementation Details

### 1. MemberHome TabsList - Add Horizontal Scroll
**File:** `src/pages/member/MemberHome.tsx`

The TabsList component wraps but doesn't scroll, causing text overflow on narrow screens.

**Fix:** Wrap TabsList in a scrollable container and add `flex-nowrap`:
```
<div className="overflow-x-auto -mx-4 px-4">
  <TabsList className="w-full min-w-max">
    ...
  </TabsList>
</div>
```

### 2. MemberHome Order History - Stack on Mobile
**File:** `src/pages/member/MemberHome.tsx` (lines 466-509)

The order row uses `flex items-center justify-between` which squishes content on mobile.

**Fix:** Stack elements vertically on mobile, horizontal on larger screens:
```
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border rounded-lg">
  <div className="flex items-center gap-4">
    <!-- Order info -->
  </div>
  <div className="flex items-center justify-between sm:justify-end gap-3">
    <!-- Report button + status -->
  </div>
</div>
```

### 3. MemberProfile Address Form - Responsive Grid
**File:** `src/pages/member/MemberProfile.tsx` (lines 181-210)

Current `grid-cols-6` doesn't adapt to mobile.

**Fix:** Use responsive grid classes:
```
<div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
  <div className="sm:col-span-3 space-y-2">City</div>
  <div className="sm:col-span-1 space-y-2">State</div>
  <div className="sm:col-span-2 space-y-2">ZIP</div>
</div>
```

### 4. InternalOpsDashboard TabsList - Scrollable Tabs
**File:** `src/pages/internal/InternalOpsDashboard.tsx` (lines 66-84)

Tabs with icons overflow on mobile.

**Fix:** Similar to MemberHome - wrap in scrollable container:
```
<div className="overflow-x-auto -mx-4 px-4 pb-2">
  <TabsList className="w-full min-w-max">
    ...
  </TabsList>
</div>
```

### 5. HealthPlanDashboard Filters - Stack on Mobile
**File:** `src/pages/healthplan/HealthPlanDashboard.tsx` (lines 66-94)

Filter controls bunch up.

**Fix:** Wrap in responsive flex container:
```
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
  <Select>...</Select>
  <Select>...</Select>
  <Button>...</Button>
</div>
```

### 6. ProgramPipelineDashboard Flow Indicator - Wrap on Mobile
**File:** `src/components/internal/ProgramPipelineDashboard.tsx` (lines 163-171)

Pipeline flow indicator is cramped on mobile.

**Fix:** Allow wrapping and center alignment:
```
<div className="flex flex-wrap items-center justify-center gap-2 py-3 px-4 bg-muted/50 rounded-lg text-center">
  ...
</div>
```

### 7. MemberSignup Checkbox Grids - Single Column on XS
**File:** `src/pages/member/MemberSignup.tsx`

Checkbox grids are cramped on very small screens.

**Fix:** Use `grid-cols-1 sm:grid-cols-2`:
```
<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
  ...
</div>
```

### 8. Tabs Component Enhancement (Optional Global Fix)
**File:** `src/components/ui/tabs.tsx`

Add overflow handling to TabsList by default:
```
<TabsPrimitive.List
  className={cn(
    "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground overflow-x-auto",
    className,
  )}
/>
```

## Files to Modify

1. `src/pages/member/MemberHome.tsx` - TabsList scroll + Order history stacking
2. `src/pages/member/MemberProfile.tsx` - Address form responsive grid
3. `src/pages/member/MemberSignup.tsx` - Checkbox grid responsiveness
4. `src/pages/internal/InternalOpsDashboard.tsx` - TabsList scroll
5. `src/pages/healthplan/HealthPlanDashboard.tsx` - Filter controls stacking
6. `src/components/internal/ProgramPipelineDashboard.tsx` - Flow indicator wrapping
7. `src/components/ui/tabs.tsx` - (Optional) Default overflow handling

## Testing Checklist
After implementation, verify at these viewport widths:
- 320px (iPhone SE)
- 375px (iPhone 12/13)
- 414px (iPhone Plus sizes)
- 768px (iPad portrait)
- 1024px (iPad landscape / small desktop)

## Summary
The fixes focus on:
1. Making tab navigation scrollable instead of overflowing
2. Stacking flex layouts vertically on mobile
3. Adjusting grid columns with responsive breakpoints
4. Ensuring touch targets remain accessible

All changes use existing Tailwind CSS utility classes and follow the patterns already established in the codebase.

