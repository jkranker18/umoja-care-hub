
# CBO Member Intake Form with AHC-HRSN Screening

## Overview
Create a new dedicated intake form for CBO staff to enroll members, replacing the current redirect to MemberSignup. This form will include the AHC-HRSN (Accountable Health Communities - Health-Related Social Needs) screening questions from the uploaded PDF.

---

## Questions Summary from PDF

The AHC-HRSN screening tool contains 24 questions organized into these domains:

| Domain | Questions | Type |
|--------|-----------|------|
| Living Situation | Q1-Q2 | Single + Multi select |
| Food | Q3-Q4 | Single select (Often/Sometimes/Never) |
| Transportation | Q5 | Yes/No |
| Utilities | Q6 | Yes/No/Already shut off |
| Safety | Q7-Q10 | Frequency scale (Never to Frequently) |
| Financial Strain | Q11 | Difficulty scale |
| Employment | Q12 | Single select |
| Family & Community Support | Q13-Q14 | Single select |
| Education | Q15-Q16 | Yes/No |
| Physical Activity | Q17-Q18 | Numeric select |
| Substance Use | Q19-Q22 | Frequency scale |
| Mental Health (PHQ-2) | Q23-Q24 | 4-point scale |

---

## Implementation Plan

### 1. Create New CBO Intake Form Component

**File:** `src/pages/cbo/CBOMemberIntake.tsx` (new file)

Structure:
- Multi-step wizard form similar to MemberSignup
- 6 steps for better UX grouping:

```text
Step 1: Member Information
  - First Name, Last Name
  - Date of Birth
  - Phone, Email
  - Preferred Language

Step 2: Address
  - Street Address, City, State, ZIP, County

Step 3: Living Situation & Food Security
  - Q1: Living situation (single select)
  - Q2: Housing problems (multi select)
  - Q3: Food worry (single select)
  - Q4: Food didn't last (single select)

Step 4: Transportation, Utilities & Safety
  - Q5: Transportation issues (yes/no)
  - Q6: Utility shutoff threat (yes/no/already)
  - Q7-Q10: Safety questions (frequency scale)

Step 5: Support & Wellness
  - Q11: Financial strain (difficulty scale)
  - Q12: Employment help (single select)
  - Q13: Daily activities help (single select)
  - Q14: Loneliness (frequency scale)
  - Q15-Q16: Language/Education (yes/no)
  - Q17-Q18: Physical activity (numeric)
  - Q19-Q22: Substance use (frequency)
  - Q23-Q24: Mental health PHQ-2 (4-point)

Step 6: Review & Submit
  - Summary of key screening results
  - Risk flags identified
  - Submit button
```

### 2. Form Data Interface

```typescript
interface CBOIntakeFormData {
  // Member info
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  preferredLanguage: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  
  // Living Situation (Q1-Q2)
  livingSituation: string;
  housingProblems: string[];
  
  // Food (Q3-Q4)
  foodWorry: string;
  foodDidntLast: string;
  
  // Transportation (Q5)
  transportationIssues: string;
  
  // Utilities (Q6)
  utilityThreat: string;
  
  // Safety (Q7-Q10)
  physicalHurt: string;
  insultTalkDown: string;
  threatenHarm: string;
  screamCurse: string;
  
  // Financial (Q11)
  financialStrain: string;
  
  // Employment (Q12)
  employmentHelp: string;
  
  // Support (Q13-Q14)
  dailyActivitiesHelp: string;
  loneliness: string;
  
  // Education (Q15-Q16)
  speaksOtherLanguage: string;
  wantsEducationHelp: string;
  
  // Physical Activity (Q17-Q18)
  exerciseDaysPerWeek: string;
  exerciseMinutesPerDay: string;
  
  // Substance Use (Q19-Q22)
  alcoholUse: string;
  tobaccoUse: string;
  prescriptionMisuse: string;
  illegalDrugUse: string;
  
  // Mental Health PHQ-2 (Q23-Q24)
  littleInterest: string;
  feelingDown: string;
}
```

### 3. Update Routing

**File:** `src/App.tsx`

Change:
```tsx
// Before
<Route path="/cbo/add-member" element={<MemberSignup />} />

// After
<Route path="/cbo/add-member" element={<CBOMemberIntake />} />
```

Add import:
```tsx
import CBOMemberIntake from "./pages/cbo/CBOMemberIntake";
```

---

## UI Design

### Question Components

Each screening section will use appropriate input types:

**Single Select Questions:**
```text
+------------------------------------------+
| 1. What is your living situation today?  |
+------------------------------------------+
| ( ) I have a steady place to live        |
| ( ) I have a place to live today, but... |
| ( ) I do not have a steady place to live |
+------------------------------------------+
```

**Multi Select Questions:**
```text
+------------------------------------------+
| 2. Do you have problems with any of the  |
|    following? (select all that apply)    |
+------------------------------------------+
| [ ] Pests such as bugs, ants, or mice    |
| [ ] Mold                                 |
| [ ] Lead paint or pipes                  |
| [ ] Lack of heat                         |
| [ ] None of the above                    |
+------------------------------------------+
```

**Frequency Scale Questions:**
```text
+------------------------------------------+
| 7. How often does anyone physically      |
|    hurt you?                             |
+------------------------------------------+
| ( ) Never                                |
| ( ) Rarely                               |
| ( ) Sometimes                            |
| ( ) Fairly often                         |
| ( ) Frequently                           |
+------------------------------------------+
```

### Progress Indicator
```text
Step 3 of 6: Living & Food Security
[====================----------] 50%
```

### Risk Flags Summary (Step 6)
Based on responses, display identified needs:
- Housing instability
- Food insecurity  
- Transportation needs
- Utility assistance needed
- Safety concerns
- Financial strain
- Employment support
- Social isolation
- Substance use concerns
- Mental health follow-up recommended

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/pages/cbo/CBOMemberIntake.tsx` | Create - new intake form with AHC-HRSN questions |
| `src/App.tsx` | Modify - update route to use new component |

---

## Technical Notes

- The form follows the same patterns as MemberSignup (multi-step wizard, progress bar, card layout)
- Uses existing UI components: Card, RadioGroup, Checkbox, Input, Select, Button, Progress
- On submit, creates a new member record and navigates back to CBO Dashboard
- Risk flags can be calculated based on responses (e.g., food insecurity if Q3 or Q4 = "Often true")
- The form sets the enrollment source to the current CBO's partner ID
- All questions from the PDF are included and properly organized
