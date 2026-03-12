

# Add Mental Health & Social Needs Metrics to Outcomes Report

## Overview
Add a new "Mental Health & Social Needs Outcomes" section to the Health Plan Outcomes page with fake pre/post data for PHQ-9 (Depression), GAD-7 (Anxiety), and Food Insecurity screening scores.

## Changes

### 1. `src/lib/mockData.ts`
- Add `phq9`, `gad7`, and `foodInsecurity` optional fields to `MemberClinicalData` interface
- Add savings constants: `PHQ9_PER_POINT` ($200), `GAD7_PER_POINT` ($180), `FOOD_INSECURITY_RESOLVED` ($1,500)
- Update `generateClinicalData()` to populate these fields with realistic fake data:
  - PHQ-9: baseline 12-20 (moderate-severe), current 5-12 (mild-moderate)
  - GAD-7: baseline 10-18, current 4-10
  - Food Insecurity: baseline 4-8 (high need), current 1-4 (reduced)

### 2. `src/pages/healthplan/HealthPlanOutcomes.tsx`
- Compute PHQ-9, GAD-7, and Food Insecurity metrics in `clinicalOutcomes` useMemo (same pre/post pattern as existing metrics)
- Add their savings to `totalValue`
- Add a new **"Mental Health & Social Needs Outcomes"** Card with a summary table (same format as the Clinical Outcomes Summary table) showing the three new metrics
- Add the new categories to the Value Realization bar chart
- Add PHQ-9 and GAD-7 columns to the Top Improving Members table

