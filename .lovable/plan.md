
# Update CBO Intake Form Step 6: Remove Risk Flags, Add Consent

## Overview
Modify Step 6 (Review & Submit) of the CBO Member Intake form to remove the automated risk flags display and add the consent section from the member signup flow instead.

---

## Current Step 6 Structure
```
- Member Information summary
- Address summary  
- Identified Risk Flags (with AlertTriangle icon) ← REMOVE
- Brief text about confirming consent
```

## New Step 6 Structure
```
- Member Information summary
- Address summary
- Program Participation Agreement box ← ADD
- Consent checkbox ← ADD
```

---

## Changes

**File:** `src/pages/cbo/CBOMemberIntake.tsx`

### 1. Add consent field to form data interface and initial state

Add to `CBOIntakeFormData` interface:
```typescript
consent: boolean;
```

Add to `initialFormData`:
```typescript
consent: false,
```

### 2. Update renderStep6() function

Replace the risk flags section with the consent section from MemberSignup:

| Remove | Add |
|--------|-----|
| Risk flags calculation display | Program Participation Agreement box |
| AlertTriangle icon section | Consent checkbox with label |
| "No Risk Flags Identified" section | — |

The consent section will include:
- A muted background box with the Program Participation Agreement
- Bullet points explaining what the member agrees to
- A checkbox for "I consent to participate"

### 3. Update handleSubmit() to validate consent

Add check to ensure consent is given before enrolling:
```typescript
if (!formData.consent) {
  toast({
    title: "Consent Required",
    description: "Please confirm member consent before enrolling.",
    variant: "destructive",
  });
  return;
}
```

---

## Visual Preview

**Step 6 will now look like:**

```
┌─────────────────────────────────────────────┐
│ Member Information                          │
│ Name: John Smith    DOB: 01/15/1960        │
│ Phone: (555) 123-4567  Email: john@...     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Address                                     │
│ 123 Main St                                │
│ Los Angeles, CA 90001                      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Program Participation Agreement             │
│                                             │
│ By enrolling in the Umoja Health nutrition  │
│ program, I understand and agree to:         │
│                                             │
│ • Receive medically tailored meals and      │
│   nutrition education                       │
│ • Share my health information with program  │
│   partners for care coordination            │
│ • Participate in assessments and surveys    │
│   to measure outcomes                       │
│ • Be contacted by phone, email, or text     │
│   about my program                          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ [✓] I consent to participate                │
│     I have read and agree to the terms      │
│     above.                                  │
└─────────────────────────────────────────────┘
```

---

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/cbo/CBOMemberIntake.tsx` | Add consent field, replace risk flags with consent UI, add validation |

---

## Technical Notes

- The `calculateRiskFlags()` function can remain in the code (risk data is still captured in form responses) but will no longer be displayed to the CBO staff on the review screen
- The consent checkbox uses the same styling as MemberSignup for consistency
- Validation ensures consent is required before enrollment can proceed
