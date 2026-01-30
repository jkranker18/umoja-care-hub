
# Revamp Health Plan Outcomes Report

## Overview

Transform the Outcomes Report from a generic dashboard into a value-focused report highlighting the four key clinical metrics from the HCSC proposal (A1c, Hospital Readmissions, Blood Pressure, BMI) with pre/post data and calculated financial savings.

## Data Model Changes

### New Interface: MemberClinicalData

Add a new interface to `src/lib/mockData.ts` to track pre/post clinical measurements:

```typescript
export interface MemberClinicalData {
  id: string;
  memberId: string;
  measurementDate: string;
  measurementType: 'baseline' | 'current';
  a1c?: number;              // e.g., 8.5 -> 7.2
  systolicBP?: number;       // e.g., 148 -> 126
  diastolicBP?: number;      // e.g., 92 -> 78
  bmi?: number;              // e.g., 32.5 -> 30.1
  hospitalAdmissions?: number; // Count in past 12 months
}
```

### Generate Clinical Data

Create baseline and current measurements for members with active/complete enrollments (simulating members with pre/post data):

- A1c: Baseline 7.5-10.5, Current shows 0.5-2.0 point reduction
- Blood Pressure: Baseline 140-160/85-100, Current shows improvement
- BMI: Baseline 28-38, Current shows 1-4 point reduction
- Hospital Admissions: Baseline 1-3, Current 0-1

## Financial Value Constants

Based on HCSC proposal (using higher values in ranges):

| Metric | Savings Per Unit | Description |
|--------|-----------------|-------------|
| A1c | $736 | Per 1% reduction per member |
| Hospital Readmission | $13,000 | Per avoided readmission |
| Blood Pressure | $500 | Per member achieving control |
| BMI | $250 | Per point reduction per member |

## Outcomes Report Redesign

### Section 1: Executive Summary KPIs (4 cards)

| KPI | Example Value | Calculation |
|-----|--------------|-------------|
| Total Value Realized | $847,520 | Sum of all savings |
| Members with Clinical Data | 42 | Members with pre/post measurements |
| Avg Clinical Improvement | 3.2 metrics | Avg metrics improved per member |
| Program Completion Rate | 68% | Completed / Total enrolled |

### Section 2: Clinical Outcomes Table

A prominent table showing each metric with:

| Metric | Members Measured | Avg Baseline | Avg Current | Avg Reduction | Savings/Unit | Total Savings |
|--------|-----------------|--------------|-------------|---------------|--------------|---------------|
| A1c (%) | 38 | 8.4% | 7.2% | 1.2% | $736 | $33,580 |
| Systolic BP (mmHg) | 42 | 148 | 128 | 20 | $500 | $21,000 |
| BMI (kg/m2) | 35 | 32.8 | 30.6 | 2.2 | $250 | $19,250 |
| Hospital Readmissions | 28 | 1.8 | 0.4 | 1.4 | $13,000 | $509,600 |

### Section 3: Charts Row

1. **Clinical Improvements Over Time** (Line Chart)
   - Show A1c and BP trends from baseline through program months
   
2. **Value Realization by Category** (Bar Chart)
   - Horizontal bars showing savings contribution by each metric

### Section 4: Member-Level Impact

A collapsible section showing individual member improvements for drill-down (top 10 most improved members).

## Files to Modify

| File | Change |
|------|--------|
| `src/lib/mockData.ts` | Add MemberClinicalData interface and generate mock clinical data |
| `src/pages/healthplan/HealthPlanOutcomes.tsx` | Complete redesign with new layout, calculations, and visualizations |

## Visual Layout

```text
+--------------------------------------------------+
|  Outcomes Report                    [Export PDF]  |
+--------------------------------------------------+

+----------+ +----------+ +----------+ +----------+
| Total    | | Members  | | Avg      | | Program  |
| Value    | | Measured | | Metrics  | | Complete |
| $847,520 | | 42       | | 3.2      | | 68%      |
+----------+ +----------+ +----------+ +----------+

+--------------------------------------------------+
|  Clinical Outcomes Summary                        |
+--------------------------------------------------+
| Metric          | N  | Base | Curr | Δ   | $Save |
|-----------------|----+------+------+-----+-------|
| A1c (%)         | 38 | 8.4  | 7.2  |-1.2 |$33.5K |
| Systolic BP     | 42 | 148  | 128  |-20  |$21.0K |
| BMI             | 35 | 32.8 | 30.6 |-2.2 |$19.3K |
| Hosp. Readmit.  | 28 | 1.8  | 0.4  |-1.4 |$509K  |
+--------------------------------------------------+

+------------------------+ +------------------------+
| Clinical Trends        | | Value by Category      |
| (Line: A1c, BP over    | | (Bar: stacked savings) |
| program months)        | |                        |
+------------------------+ +------------------------+

+--------------------------------------------------+
|  Top Improving Members (expandable)              |
+--------------------------------------------------+
```

## Technical Implementation

1. **Mock Data Generation**: Create realistic baseline/current pairs ensuring all reductions are positive (members improved during program)

2. **Calculations in Component**: Use useMemo to compute aggregations from clinical data

3. **Financial Formulas**:
   - A1c Savings = Sum of (baseline - current) × $736 for each member
   - BP Savings = Count of members achieving <130/80 × $500
   - BMI Savings = Sum of (baseline - current) × $250 for each member  
   - Readmission Savings = Sum of (baseline - current admissions) × $13,000

4. **Export Functionality**: Existing export button will trigger PDF/CSV download of the report
