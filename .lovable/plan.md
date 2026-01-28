

# Update Member Intake Form - Health Information Fields

## Overview
Modify Step 3 (Health Goals) of the member intake form to collect more clinically relevant information: health insurance provider, chronic conditions, and food allergens.

## Changes Summary

| Current Field | New Field |
|--------------|-----------|
| Select Program (dropdown) | Health Insurance Provider (text input) |
| Health Goals (4 checkboxes) | Chronic Conditions (15 checkboxes + Other with text input) |
| Barriers to Healthy Eating (4 checkboxes) | Allergens (FDA Big 9 checkboxes) |

---

## 1. Health Insurance Provider

Replace the program dropdown with a simple text input for the member's health insurance provider.

**New Field:**
- Label: "Health Insurance Provider"
- Type: Text input
- Placeholder: "e.g., Kaiser Permanente, Blue Shield, Medi-Cal"

---

## 2. Chronic Conditions (Top 15)

Replace the 4 health goals with the top 15 chronic conditions as checkboxes, plus an "Other" option with a text field.

**Chronic Conditions List:**
1. Type 2 Diabetes
2. Hypertension (High Blood Pressure)
3. Heart Disease
4. Chronic Kidney Disease
5. COPD (Chronic Obstructive Pulmonary Disease)
6. Asthma
7. Cancer
8. Stroke
9. Arthritis
10. Obesity
11. Depression
12. Anxiety
13. Alzheimer's/Dementia
14. Osteoporosis
15. Liver Disease
16. Other (with text input)

---

## 3. FDA Major Food Allergens (Big 9)

Replace "Barriers to Healthy Eating" with the FDA-recognized major allergens.

**FDA Big 9 Allergens:**
1. Milk
2. Eggs
3. Fish
4. Shellfish (e.g., crab, lobster, shrimp)
5. Tree Nuts (e.g., almonds, walnuts, pecans)
6. Peanuts
7. Wheat
8. Soybeans
9. Sesame

---

## Technical Implementation

### File: `src/pages/member/MemberSignup.tsx`

**Form State Updates (line 29-46):**
- Add `healthInsuranceProvider: ''` field
- Rename `healthGoals` to `chronicConditions`
- Add `chronicConditionsOther: ''` for the "Other" text input
- Rename `barriers` to `allergens`
- Remove `programId` (no longer selecting a program here)

**Step 3 Content Updates (lines 274-346):**
- Replace program dropdown with text input
- Replace health goals with chronic conditions checkboxes (3-column grid for better layout)
- Add "Other" checkbox with conditional text input
- Replace barriers with allergens checkboxes

**Toggle Function Update (line 110):**
- Update field names from `healthGoals` and `barriers` to `chronicConditions` and `allergens`

### Updated Step Name
- Rename step from "Health Goals" to "Health Information" to better reflect the content

---

## Visual Layout

The form will use a responsive grid:
- Chronic Conditions: 3 columns on desktop, 2 on tablet, 1 on mobile
- Allergens: 3 columns on desktop, 2 on tablet, 1 on mobile
- "Other" text input appears below checkboxes when "Other" is selected

