

# Add Filter Dropdown to Clinical Outcomes Summary Card

## Overview
Add a Select dropdown in the top-right of the Clinical Outcomes Summary card header with three options: **All**, **Diabetes** (A1c, BMI, Readmissions), **Cardiovascular** (BP, BMI, Hospital Readmissions).

## Changes

### `src/pages/healthplan/HealthPlanOutcomes.tsx`

1. **Add state**: `const [clinicalFilter, setClinicalFilter] = useState('all');`

2. **Update CardHeader** to use a flex layout with the title/description on the left and a `Select` dropdown on the right:
   - Options: `all` → "All Metrics", `diabetes` → "Diabetes", `cardiovascular` → "Cardiovascular"

3. **Conditionally render table rows** based on filter:
   - `all`: show A1c, BP, BMI, Readmissions (all 4 rows)
   - `diabetes`: show A1c, BMI, Readmissions
   - `cardiovascular`: show BP, BMI, Readmissions

4. **Add imports** for `Select, SelectContent, SelectItem, SelectTrigger, SelectValue` from UI components.

