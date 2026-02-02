
# Fix: Update Demo Orders to Reflect Current Date (Feb 2, 2025)

## Problem

The current order logic hardcodes Week 4 as "in transit" with an estimated delivery of Jan 27, 2025. Since today is February 2nd, that delivery date has already passed, making the demo data inconsistent.

## Current State
| Week | Status | Est. Delivery |
|------|--------|---------------|
| 1-3 | Delivered | Jan 6, 13, 20 |
| 4 | In Transit | Jan 27 (already passed!) |
| 5-12 | Processing | Feb 3 onwards |

## Proposed State
| Week | Status | Est. Delivery |
|------|--------|---------------|
| 1-4 | Delivered | Jan 6, 13, 20, 27 |
| 5 | In Transit | Feb 3 (tomorrow) |
| 6-12 | Processing | Feb 10 onwards |

## Solution

Update the order generation logic in `src/pages/member/MemberHome.tsx` to reflect the current date:

### File: `src/pages/member/MemberHome.tsx`

Change lines 101-104 from:
```typescript
const isDelivered = weekNumber <= 3;
const isInTransit = weekNumber === 4;
```

To:
```typescript
const isDelivered = weekNumber <= 4;  // Weeks 1-4 delivered
const isInTransit = weekNumber === 5;  // Week 5 in transit (Feb 3)
```

## Result

- **Week 4** (Jan 27): Now shows as **Delivered**
- **Week 5** (Feb 3): Shows as **In Transit** - delivery tomorrow
- **Next Shipment card**: Will display "Feb 3, 2025" with "In Transit" status

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/member/MemberHome.tsx` | Update `isDelivered` to include week 4, update `isInTransit` to week 5 |
