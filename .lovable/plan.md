

# Update Shipment Dates to Match March 11

## Problem
The shipment status logic is frozen at a February baseline. With today being March 11, the statuses need to reflect that we're in week 10 of the 12-week program.

## Changes — `src/pages/member/MemberHome.tsx`

### 1. Update `getOrderStatus` (line 202-207)
Shift the cutoffs so that:
- Weeks 1-10 (through Mar 10) → `delivered`
- Week 11 (Mar 17) → `in_transit`
- Week 12 (Mar 24) → `upcoming`

### 2. Update `getProduceBoxStatus` (line 209-214)
Shift so that:
- Index 0-4 (Jan 6 through Mar 3) → `delivered`
- Index 5 (Mar 17) → `in_transit`

This will automatically fix:
- The "Next Shipment" KPI card (picks first in_transit or upcoming order → Mar 17)
- The "Next Delivery" on the My Orders tab
- All order status pills in the order history list

One file modified.

