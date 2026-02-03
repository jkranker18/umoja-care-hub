

# Move Tooltip Below the Utilization Chart

## Problem

The tooltip appears directly on top of the data points when hovering, making it difficult to see which dot is being hovered over (as shown in the screenshot).

## Solution

Configure the Recharts Tooltip to display at a fixed position below the chart instead of following the cursor. This keeps the tooltip information visible while allowing clear view of the hovered data point.

## Technical Changes

| File | Change |
|------|--------|
| `src/pages/healthplan/HealthPlanDashboard.tsx` | Update Tooltip component with position and offset props |

## Implementation

Update the Tooltip component (lines 330-344) with these properties:

```tsx
<Tooltip 
  position={{ y: 280 }}  // Fixed Y position near bottom of chart
  wrapperStyle={{ 
    left: '50%', 
    transform: 'translateX(-50%)',
    pointerEvents: 'none'
  }}
  contentStyle={{ 
    backgroundColor: 'hsl(var(--card))', 
    border: '1px solid hsl(var(--border))',
    borderRadius: '6px',
    padding: '8px 12px'
  }}
  // ... formatter stays the same
/>
```

This approach:
- Fixes the tooltip Y position at 280px (near the bottom of the 300px chart container)
- Centers the tooltip horizontally
- Ensures the data points remain visible while hovering

