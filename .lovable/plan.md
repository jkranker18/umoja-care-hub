
# Dynamic Next Shipment Card

## Overview
Update the "Next Shipment" status card to dynamically display the next upcoming or in-transit shipment based on actual delivery dates. The card will automatically transition from showing an "in transit" shipment to the next scheduled delivery once the current one is delivered.

## Current Behavior
- The "Next Shipment" card shows a static date calculated as 2 weeks from today
- It doesn't reflect actual shipment statuses or delivery dates

## New Behavior
- The card will display the **next shipment that hasn't been delivered yet**
- Priority order: show "in transit" shipments first, then "processing" shipments
- Include both the delivery date and the current status (e.g., "In Transit" or "Scheduled")
- Automatically updates: once Jan 27 passes, Feb 3 becomes the "next" shipment

## Implementation Details

### File to Modify
**`src/pages/member/MemberHome.tsx`**

### Changes

1. **Update demo orders to use fixed dates** (instead of relative)
   - Change the "in transit" order to have estimated delivery of Jan 27, 2025
   - Change the first "processing" order to Feb 3, 2025
   - This ensures consistent demo behavior regardless of when the app is viewed

2. **Add logic to determine the next shipment**
   - Find the first order that is "in_transit" with a delivery date >= today
   - If none in transit, find the first "processing" order with earliest delivery date
   - If the in-transit delivery date has passed, treat it as "delivered" and skip to next

3. **Update the KPICard display**
   - Show the estimated delivery date from the actual order
   - Update subtitle to reflect status: "In Transit" or "Scheduled"

### Technical Approach
```typescript
// Find next shipment: prioritize in-transit, then processing
const today = new Date();
const nextShipment = demoOrders.find(order => {
  const deliveryDate = new Date(order.estimatedDelivery);
  if (order.shipmentStatus === 'in_transit') {
    return deliveryDate >= today;
  }
  return false;
}) || demoOrders.find(order => order.shipmentStatus === 'processing');

// Display in KPICard
const nextShipmentDate = nextShipment?.estimatedDelivery;
const nextShipmentStatus = nextShipment?.shipmentStatus === 'in_transit' 
  ? 'In Transit' 
  : 'Scheduled';
```

### Demo Order Dates (Fixed)
| Order | Status | Delivery Date |
|-------|--------|---------------|
| ORD-004 | In Transit | Jan 27, 2025 |
| ORD-005 | Processing | Feb 3, 2025 |
| ORD-006 | Processing | Feb 10, 2025 |
| (etc.) | Processing | Weekly thereafter |

## User Experience
- **Today (Jan 27)**: Shows "Jan 27" with subtitle "In Transit"
- **Tomorrow (Jan 28)**: Shows "Feb 3" with subtitle "Scheduled" (since Jan 27 delivery is now in the past)
- The card dynamically reflects the most relevant upcoming delivery
