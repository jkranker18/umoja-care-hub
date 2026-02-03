

# Replace Shipment Performance with Utilization Cohort Graph

## Overview

Replace the "Shipment Performance" bar chart on the Health Plan Dashboard with a new "Utilization Trends by Cohort" line chart. This chart will visualize healthcare cost reduction across monthly cohorts, demonstrating the value of the food-is-medicine intervention.

## Data Model

### Cohort Logic
- **Cohort**: A group of members who enrolled in the same month (e.g., "October 2024")
- **Baseline Cost**: Average monthly healthcare utilization cost when the cohort started
- **Month 1, 2, 3...**: Subsequent monthly cost measurements showing reduction over time

### Cost Ranges by Tier (from user requirements)
| Tier | Baseline Cost Range | Target Reduction |
|------|---------------------|------------------|
| Tier 1 (High Risk) | $15,000 - $19,000 | Steepest decline |
| Tier 2 (Medium Risk) | $5,000 - $15,000 | Moderate decline |
| Tier 3 (Preventive) | $3,000 - $5,000 | Gradual decline |

### Mock Data Strategy
Show 4-5 cohorts with staggered data points to visualize:
1. Each cohort starts at a high utilization cost
2. Costs trend downward month-over-month
3. Older cohorts have more data points (showing sustained reduction)
4. Newer cohorts have fewer data points

---

## Chart Design

### Visualization Type
**Multi-series Line Chart** - Each cohort as a separate line with its own color

### X-Axis
Time periods: Baseline, Month 1, Month 2, Month 3, Month 4

### Y-Axis
Cost in dollars ($0 - $20,000)

### Data Structure

```typescript
interface CohortUtilizationData {
  cohort: string;       // e.g., "Oct 2024"
  tier: 1 | 2 | 3;
  memberCount: number;
  data: {
    period: string;     // "Baseline", "Month 1", etc.
    cost: number;       // Average cost per member
  }[];
}
```

### Mock Data Example

| Period | Oct '24 Cohort (T1) | Nov '24 Cohort (T1) | Dec '24 Cohort (T2) | Jan '25 Cohort (T2) |
|--------|---------------------|---------------------|---------------------|---------------------|
| Baseline | $17,200 | $16,800 | $12,400 | $9,800 |
| Month 1 | $15,100 | $14,900 | $10,800 | $8,900 |
| Month 2 | $13,400 | $13,200 | $9,600 | - |
| Month 3 | $11,800 | $11,900 | - | - |
| Month 4 | $10,500 | - | - | - |

---

## UI Changes

### Replace Shipment Performance Card
Remove lines 307-332 in `HealthPlanDashboard.tsx` and replace with:

```text
+-----------------------------------------------+
|  Utilization Trends by Cohort                 |
|  Average monthly cost per member              |
+-----------------------------------------------+
|                                               |
|  $20k ┤                                       |
|       │                                       |
|  $15k ┤──●───────●                            |
|       │    ╲       ╲                          |
|  $10k ┤     ●──────●────●                     |
|       │       ╲      ╲                        |
|   $5k ┤        ●──────●───●                   |
|       │                                       |
|    $0 ┼────┬────┬────┬────┬────               |
|       Base  M1   M2   M3   M4                 |
|                                               |
|  ● Oct '24  ● Nov '24  ● Dec '24  ● Jan '25   |
+-----------------------------------------------+
```

### Legend
Show cohort name with tier indicator and member count

---

## Implementation

### File Changes

| File | Change |
|------|--------|
| `src/lib/mockData.ts` | Add `cohortUtilizationData` export with mock utilization data |
| `src/pages/healthplan/HealthPlanDashboard.tsx` | Replace Shipment Performance chart with Utilization Cohort chart |

### Code Changes in mockData.ts

Add new type and data:

```typescript
export interface CohortUtilization {
  id: string;
  cohortName: string;    // "Oct 2024"
  cohortMonth: string;   // "2024-10"
  tier: 1 | 2 | 3;
  memberCount: number;
  utilizationData: {
    period: string;      // "Baseline", "Month 1", etc.
    cost: number;        // Average PMPM cost
  }[];
}

export const cohortUtilizationData: CohortUtilization[] = [
  {
    id: 'cohort-oct-24',
    cohortName: 'Oct 2024',
    cohortMonth: '2024-10',
    tier: 1,
    memberCount: 12,
    utilizationData: [
      { period: 'Baseline', cost: 17200 },
      { period: 'Month 1', cost: 15100 },
      { period: 'Month 2', cost: 13400 },
      { period: 'Month 3', cost: 11800 },
      { period: 'Month 4', cost: 10500 },
    ],
  },
  // ... additional cohorts
];
```

### Code Changes in HealthPlanDashboard.tsx

1. Import `LineChart, Line, Legend` from recharts
2. Import `cohortUtilizationData` from mockData
3. Replace shipmentData useMemo with utilizationChartData useMemo
4. Transform cohort data into format suitable for Recharts
5. Replace BarChart with LineChart showing multiple cohort lines

---

## Chart Data Transformation

Transform the cohort data into a format Recharts can use with multiple lines:

```typescript
// Transform to: [
//   { period: 'Baseline', 'Oct 2024': 17200, 'Nov 2024': 16800, ... },
//   { period: 'Month 1', 'Oct 2024': 15100, 'Nov 2024': 14900, ... },
//   ...
// ]
const utilizationChartData = useMemo(() => {
  const periods = ['Baseline', 'Month 1', 'Month 2', 'Month 3', 'Month 4'];
  return periods.map(period => {
    const dataPoint: Record<string, string | number> = { period };
    cohortUtilizationData.forEach(cohort => {
      const periodData = cohort.utilizationData.find(d => d.period === period);
      if (periodData) {
        dataPoint[cohort.cohortName] = periodData.cost;
      }
    });
    return dataPoint;
  });
}, []);
```

---

## Color Scheme

Use distinct colors for each cohort line:

| Cohort | Color | HSL Variable |
|--------|-------|--------------|
| Oct 2024 | Teal | `hsl(var(--primary))` |
| Nov 2024 | Orange | `hsl(var(--accent))` |
| Dec 2024 | Green | `hsl(var(--success))` |
| Jan 2025 | Blue | `hsl(var(--info))` |

---

## Tooltip Enhancement

Show cohort details on hover:
- Cohort name and tier
- Member count
- Cost value with dollar formatting
- Reduction percentage from baseline

---

## Summary

This visualization tells the story that:
1. Higher-risk members (T1) start with higher costs but show significant reduction
2. Each cohort shows a consistent downward trend
3. The program delivers measurable financial value month-over-month
4. Newer cohorts are on track to follow the same improvement pattern

