

# Update Demo Programs to Reflect HCSC SOW Tiers

## Overview
Update all mock data and UI surfaces to reflect the real-world HCSC program structure with three tiers based on the SOW document. This will replace generic program names with specific tier-based programs that accurately reflect the food protocols, clinical support, and timing from the proposal.

---

## Tier Structure from SOW

Based on the parsed PDF document, here are the three program tiers:

| Tier | Name | Risk Level | Duration | Food Protocol | Clinical Support |
|------|------|------------|----------|---------------|------------------|
| **Tier 1** | High Risk & Comorbidity | High Risk | 12 weeks | Weeks 1-8: MTM (14 meals/week), Weeks 9-12: MTG (14 meals/week) | 3 months |
| **Tier 2** | Medium Risk | Medium Risk | 12 weeks | Weeks 1-4: MTM (14 meals/week), Weeks 5-12: MTG (14 meals/week) | 3 months |
| **Tier 3** | Diet Quality & Preventive | Preventive | 12 weeks | Produce Box: Bi-weekly (6 distributions), 15lbs fresh produce | 3 months |

**Key Terms:**
- **MTM** = Medically Tailored Meals (prepared, heat & eat)
- **MTG** = Medically Tailored Groceries (cooking & preparation)

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/lib/mockData.ts` | Update `programs` array with 3 tiers, update `Program` interface, update enrollment benefit levels |
| `src/pages/member/MemberHome.tsx` | Update program display to show tier info, phase progress (MTM vs MTG), meal counts |
| `src/pages/healthplan/HealthPlanDashboard.tsx` | Update to display tier-based programs in dropdowns and breakdowns |
| `src/pages/cbo/CBODashboard.tsx` | Update program filter to show tier names |
| `src/pages/internal/InternalOpsDashboard.tsx` | Update program references in exception queues |
| `src/components/internal/ProgramPipelineDashboard.tsx` | Update program selector with tier names |

---

## Detailed Changes

### 1. Update Mock Data (`src/lib/mockData.ts`)

**Update Program Interface:**
```typescript
export interface Program {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  riskLevel: 'high' | 'medium' | 'preventive';
  description: string;
  startDate: string;
  endDate: string;
  eligibilityRules: string;
  duration: string; // "12 weeks"
  mealsPerWeek: number;
  mtmWeeks: number; // Medically Tailored Meals phase
  mtgWeeks: number; // Medically Tailored Groceries phase
  clinicalSupport: string; // "3 months"
  status: 'active' | 'inactive' | 'planning';
}
```

**Replace programs array:**
```typescript
export const programs: Program[] = [
  {
    id: 'prog-tier1',
    name: 'Tier 1: High Risk & Comorbidity',
    tier: 1,
    riskLevel: 'high',
    description: 'Intensive 12-week program for high-acuity members requiring immediate nutritional and behavioral stabilization',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    eligibilityRules: 'High risk score, multiple chronic conditions, comorbidity present',
    duration: '12 weeks',
    mealsPerWeek: 14,
    mtmWeeks: 8, // Weeks 1-8: Medically Tailored Meals
    mtgWeeks: 4, // Weeks 9-12: Medically Tailored Groceries
    clinicalSupport: '3 months',
    status: 'active',
  },
  {
    id: 'prog-tier2',
    name: 'Tier 2: Medium Risk',
    tier: 2,
    riskLevel: 'medium',
    description: '12-week step-down program for members with chronic conditions who have some capacity for self-preparation',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    eligibilityRules: 'Medium risk score, chronic condition diagnosis, capacity for meal preparation',
    duration: '12 weeks',
    mealsPerWeek: 14,
    mtmWeeks: 4, // Weeks 1-4: Medically Tailored Meals
    mtgWeeks: 8, // Weeks 5-12: Medically Tailored Groceries
    clinicalSupport: '3 months',
    status: 'active',
  },
  {
    id: 'prog-tier3',
    name: 'Tier 3: Diet Quality & Preventive',
    tier: 3,
    riskLevel: 'preventive',
    description: 'Preventive program for diet quality improvement and inflammation reduction via increased plant-based intake',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    eligibilityRules: 'Preventive care, diet quality improvement, inflammation reduction goals',
    duration: '12 weeks',
    mealsPerWeek: 0, // Uses produce boxes instead
    mtmWeeks: 0,
    mtgWeeks: 0,
    clinicalSupport: '3 months',
    status: 'active',
  },
];
```

**Update Enrollment interface to include phase tracking:**
```typescript
export interface Enrollment {
  id: string;
  memberId: string;
  programId: string;
  status: EnrollmentStatus;
  enrollmentSource: EnrollmentSource;
  sourceId?: string;
  enrollmentDate: string;
  currentWeek: number; // 1-12
  currentPhase: 'MTM' | 'MTG' | 'Produce'; // Current food protocol phase
  benefitLevel: string; // e.g., "Tier 1 - Week 4"
  nextShipmentDate?: string;
}
```

**Update enrollment generation to assign tiers and phases:**
- Distribute members across 3 tiers (40% Tier 1, 40% Tier 2, 20% Tier 3)
- Calculate currentWeek (1-12) and currentPhase based on tier and week
- Update benefitLevel to show tier and phase info

---

### 2. Update Member Home (`src/pages/member/MemberHome.tsx`)

**Changes to Overview tab:**
- Display tier name and phase prominently
- Show "Phase: MTM (Weeks 1-8)" or "Phase: MTG (Weeks 9-12)" 
- Update Benefit Level card to show phase progress
- Update demo orders to reflect MTM vs MTG meal types

**Update the KPI cards section:**
```
Current values:
- "Benefit Level: 12 weeks"
- "Weekly | 14 meals/week"

New values for Tier 1 member in Week 3:
- "Benefit Level: Tier 1"  
- "MTM Phase (Week 3 of 8) | 14 meals/week"
```

**Update the "Current Program" card:**
- Show tier name
- Show phase timeline with MTM → MTG progression
- Display current week in program

**Update demo orders:**
- Change meal plan from "Cardiac Friendly" to reflect phase:
  - Weeks 1-8: "Medically Tailored Meals (MTM)"
  - Weeks 9-12: "Medically Tailored Groceries (MTG)"

---

### 3. Update Health Plan Dashboard (`src/pages/healthplan/HealthPlanDashboard.tsx`)

**Changes:**
- Update program dropdown to show tier names
- Update "By Program" breakdown to show tier enrollment counts
- Show phase distribution within each tier

---

### 4. Update CBO Dashboard (`src/pages/cbo/CBODashboard.tsx`)

**Changes:**
- Update program filter dropdown with tier names
- Update member table to show tier assignment
- Show phase info in member rows

---

### 5. Update Internal Ops Dashboard (`src/pages/internal/InternalOpsDashboard.tsx`)

**Changes:**
- Update program references in exception queues
- Show tier in member exception rows

---

### 6. Update Pipeline Dashboard (`src/components/internal/ProgramPipelineDashboard.tsx`)

**Changes:**
- Update program selector with tier names
- Optionally add phase breakdown view

---

## Member Portal - Visual Design

**Program Status Card (Overview tab):**
```
┌─────────────────────────────────────────────────────┐
│ Current Program                         [Active]    │
├─────────────────────────────────────────────────────┤
│ Tier 1: High Risk & Comorbidity                    │
│                                                     │
│ Phase Progress                                      │
│ ┌─────────────────────────────────────────────────┐ │
│ │ MTM (Weeks 1-8)              MTG (Weeks 9-12)   │ │
│ │ ████████████████░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░  │ │
│ │      Week 3 of 12                               │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐          │
│ │ Enrolled  │ │ Frequency │ │ Duration  │          │
│ │ Jan 6     │ │ Weekly    │ │ 12 weeks  │          │
│ └───────────┘ └───────────┘ └───────────┘          │
└─────────────────────────────────────────────────────┘
```

**Updated Benefit Level KPI Card:**
```
┌────────────────────────┐
│ 🍽️  Current Phase       │
│                        │
│ MTM                    │
│ Week 3 of 8            │
│ 14 meals/week          │
└────────────────────────┘
```

---

## Technical Notes

- The `Program` interface is extended but remains backward compatible
- Existing program IDs are changed from `prog-001`/`prog-002` to `prog-tier1`/`prog-tier2`/`prog-tier3`
- Enrollment objects get new fields (`currentWeek`, `currentPhase`) to track progression
- Demo member (first member) will be assigned to Tier 1, Week 3 for demonstration
- Orders will be labeled with MTM or MTG based on the member's current phase
- All portal views (member, CBO, health plan, internal) will display consistent tier information

---

## Affected Interfaces

The following TypeScript interfaces will be updated:
1. `Program` - Add tier, riskLevel, mtmWeeks, mtgWeeks, clinicalSupport fields
2. `Enrollment` - Add currentWeek, currentPhase fields

All components importing from `mockData.ts` will automatically pick up the new program structure.

