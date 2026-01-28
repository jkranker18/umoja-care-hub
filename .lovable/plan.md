

# Make Program Dropdown and Date Selector Functional

## Overview
The Health Plan Dashboard has program and date range dropdowns that update state but don't actually filter the displayed data. This plan will make these filters functional across all KPIs, charts, and breakdowns.

## Current State
- `programFilter` state exists but is not used to filter data
- `dateRange` state exists but is not used to filter data
- All metrics show unfiltered totals regardless of dropdown selection

## Changes Summary

**File:** `src/pages/healthplan/HealthPlanDashboard.tsx`

### 1. Add Filtering Logic for Program Selection

Filter all data based on the selected program:

```tsx
// Filter enrollments by program
const filteredEnrollments = programFilter === 'all' 
  ? enrollments 
  : enrollments.filter(e => e.programId === programFilter);

// Get member IDs for filtered enrollments
const filteredMemberIds = new Set(filteredEnrollments.map(e => e.memberId));

// Filter related data
const filteredMembers = members.filter(m => filteredMemberIds.has(m.id));
const filteredOrders = orders.filter(o => filteredMemberIds.has(o.memberId));
const filteredContentPlans = contentPlans.filter(cp => filteredMemberIds.has(cp.memberId));
```

### 2. Update KPIs to Use Filtered Data

Update all KPI calculations to use filtered data:

| KPI | Current | Updated |
|-----|---------|---------|
| Eligible Members | `members.length` | `filteredMembers.length` or total eligible count |
| Enrolled | `enrollments.length` | `filteredEnrollments.length` |
| Active | Count from all enrollments | Count from `filteredEnrollments` |
| On-time Shipments | From all orders | From `filteredOrders` |
| Engagement Rate | From all content plans | From `filteredContentPlans` |

### 3. Update Charts to Use Filtered Data

The chart data is currently static mock data. Update to reflect program selection:
- Enrollment Over Time: Generate data based on filtered enrollments
- Shipment Performance: Generate data based on filtered orders
- Content Engagement: Generate data based on filtered content plans

### 4. Update Program Breakdown Cards

- "By Program" card: When a specific program is selected, only show that program's stats
- "By CBO Partner" card: Filter by members in the selected program
- "Content Engagement" card: Filter by members in the selected program

### 5. Add Date Range Filtering (Mock Implementation)

Since the mock data doesn't have sufficient date granularity for real filtering, we'll:
- Add visual feedback showing the selected range
- Prepare the filtering structure for future real data integration
- Adjust displayed trend values based on range selection

### 6. Add useMemo for Performance

Wrap filtering logic in `useMemo` to prevent unnecessary recalculations:

```tsx
const filteredData = useMemo(() => {
  const filteredEnrollments = programFilter === 'all'
    ? enrollments
    : enrollments.filter(e => e.programId === programFilter);
  
  const memberIds = new Set(filteredEnrollments.map(e => e.memberId));
  
  return {
    enrollments: filteredEnrollments,
    members: members.filter(m => memberIds.has(m.id)),
    orders: orders.filter(o => memberIds.has(o.memberId)),
    contentPlans: contentPlans.filter(cp => memberIds.has(cp.memberId)),
  };
}, [programFilter]);
```

---

## File to Modify

| File | Action |
|------|--------|
| `src/pages/healthplan/HealthPlanDashboard.tsx` | Modify - add filtering logic |

---

## Technical Notes

- Uses `useMemo` for efficient recalculation only when filter changes
- Maintains cascade filtering: program selection filters enrollments, which filters orders, content, etc.
- Date range filtering is prepared structurally but uses mock adjustment since underlying data lacks timestamps
- The "By Program" breakdown will conditionally render only the selected program when filtered
- All existing chart components remain unchanged, only their data inputs are filtered

