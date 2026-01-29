

# Update My Orders to Show MTM vs MTG by Week

## Overview
Update the "My Orders" tab to display the correct food protocol (MTM vs MTG) for each order based on which week of the program it represents, rather than showing the same label for all orders.

---

## Current Behavior
All 12 orders display the same meal plan label based on the member's current phase:
- Orders 1-12 all show "Medically Tailored Meals (MTM)" if member is in weeks 1-8
- Or all show "Medically Tailored Groceries (MTG)" if member is in weeks 9-12

## New Behavior
Each order will show the correct label based on its position in the 12-week program:

**For Tier 1 (MTM weeks 1-8, MTG weeks 9-12):**
- Orders 1-8: "Medically Tailored Meals (MTM)"
- Orders 9-12: "Medically Tailored Groceries (MTG)"

**For Tier 2 (MTM weeks 1-4, MTG weeks 5-12):**
- Orders 1-4: "Medically Tailored Meals (MTM)"
- Orders 5-12: "Medically Tailored Groceries (MTG)"

**For Tier 3:**
- All orders: "Produce Box (15 lbs)"

---

## Implementation

### File: `src/pages/member/MemberHome.tsx`

**Change 1: Create helper function to get meal plan label by week**

Add a function that takes the week number and returns the appropriate label:

```typescript
const getMealPlanLabelForWeek = (weekNumber: number): string => {
  if (!program) return 'Medically Tailored Meals';
  if (program.tier === 3) return 'Produce Box (15 lbs)';
  
  // For Tier 1: MTM weeks 1-8, MTG weeks 9-12
  // For Tier 2: MTM weeks 1-4, MTG weeks 5-12
  const mtmWeeks = program.mtmWeeks;
  
  if (weekNumber <= mtmWeeks) {
    return 'Medically Tailored Meals (MTM)';
  } else {
    return 'Medically Tailored Groceries (MTG)';
  }
};
```

**Change 2: Update demo orders array to use week-specific labels**

Instead of using the same `mealPlanLabel` for all orders, assign each order its week number and calculate the label:

```typescript
const demoOrders = Array.from({ length: 12 }, (_, index) => {
  const weekNumber = index + 1;
  const isDelivered = weekNumber <= 3;
  const isInTransit = weekNumber === 4;
  
  return {
    id: `ORD-${String(weekNumber).padStart(3, '0')}`,
    memberId: member?.id,
    weekNumber,
    mealPlan: getMealPlanLabelForWeek(weekNumber),
    mealsCount: program?.tier === 3 ? 0 : 14,
    shipmentStatus: isDelivered ? 'delivered' : isInTransit ? 'in_transit' : 'processing',
    trackingNumber: `TRK-883452${weekNumber}`,
    estimatedDelivery: // calculated date based on week
  };
});
```

**Change 3: Update order display in "My Orders" tab**

Add week number to the order display:
```
Week 3 • Medically Tailored Meals (MTM)
14 meals • Order #ORD-003
```

---

## Visual Preview

**My Orders tab (Tier 1 member):**

```
┌──────────────────────────────────────────────────────────────┐
│ Order History                                                │
│ Track all your meal shipments. 12 total orders.              │
├──────────────────────────────────────────────────────────────┤
│ [📦] Week 1 • Medically Tailored Meals (MTM)     [Delivered] │
│      14 meals • Order #ORD-001                   Jan 6, 2025 │
├──────────────────────────────────────────────────────────────┤
│ [📦] Week 2 • Medically Tailored Meals (MTM)     [Delivered] │
│      14 meals • Order #ORD-002                   Jan 13, 2025│
├──────────────────────────────────────────────────────────────┤
│ ... (weeks 3-8 all MTM) ...                                  │
├──────────────────────────────────────────────────────────────┤
│ [📦] Week 9 • Medically Tailored Groceries (MTG) [Processing]│
│      14 meals • Order #ORD-009                   Mar 3, 2025 │
├──────────────────────────────────────────────────────────────┤
│ [📦] Week 10 • Medically Tailored Groceries (MTG)[Processing]│
│      14 meals • Order #ORD-010                   Mar 10, 2025│
├──────────────────────────────────────────────────────────────┤
│ ... (weeks 11-12 all MTG) ...                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/member/MemberHome.tsx` | Add `getMealPlanLabelForWeek()` helper, refactor `demoOrders` array to assign week numbers and week-specific labels, update order rendering to show week number |

---

## Technical Notes

- The transition point (MTM to MTG) uses `program.mtmWeeks` which is 8 for Tier 1 and 4 for Tier 2
- Tier 3 members see "Produce Box (15 lbs)" for all orders
- Order dates remain sequential (weekly) starting from Jan 6, 2025
- The order display now includes "Week X" prefix for clarity
- This change only affects the demo orders; the actual `orders` from mockData are not modified

