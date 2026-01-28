

# Add Support Button to CBO and Health Plan Profile Pages

## Overview
Add a "Contact Support" button and modal to the bottom of both the CBO Organization page and Health Plan Profile page, following the same pattern used in the Member portal. The reason/subject selector will have context-appropriate options for each portal type.

---

## Changes Summary

| Page | Support Reasons |
|------|-----------------|
| CBO Organization | Member enrollment, Portal access, Referral tracking, Reporting issue, Technical support, Other |
| Health Plan Profile | Member data inquiry, Outcomes reporting, Contract/billing, Portal access, Technical support, Other |

---

## 1. Create Reusable Support Dialog Component

**File:** `src/components/shared/SupportDialog.tsx` (new file)

Create a reusable support dialog component that:
- Accepts a `subjectOptions` prop for context-specific reasons
- Handles all modal state internally (open, submitting, submitted)
- Uses the existing `useSupportCases` hook to persist cases
- Follows the same visual pattern as the member support modal

```tsx
interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjectOptions: { value: string; label: string }[];
  portalContext: string; // e.g., "CBO" or "Health Plan"
}
```

---

## 2. Update CBO Organization Page

**File:** `src/pages/cbo/CBOOrganization.tsx`

Add:
- Import `SupportDialog` component
- Import necessary icons (`MessageSquare`)
- Add state for support modal: `supportModalOpen`
- Add support card at the bottom (after Authorized Users)
- Add `SupportDialog` with CBO-specific subject options

**CBO Subject Options:**
- `member_enrollment` - Member Enrollment
- `portal_access` - Portal Access
- `referral_tracking` - Referral Tracking
- `reporting_issue` - Reporting Issue
- `technical_support` - Technical Support
- `other` - Other

---

## 3. Update Health Plan Profile Page

**File:** `src/pages/healthplan/HealthPlanProfile.tsx`

Add:
- Import `SupportDialog` component
- Import necessary icons (`MessageSquare`)
- Add state for support modal: `supportModalOpen`
- Add support card at the bottom (after Authorized Users)
- Add `SupportDialog` with Health Plan-specific subject options

**Health Plan Subject Options:**
- `member_data` - Member Data Inquiry
- `outcomes_reporting` - Outcomes Reporting
- `contract_billing` - Contract / Billing
- `portal_access` - Portal Access
- `technical_support` - Technical Support
- `other` - Other

---

## 4. Visual Design

### Support Card (bottom of page)
```text
┌─────────────────────────────────────────────────────────────┐
│  Need Help?                                    [Contact Support]
│  Our support team is here to assist you.                    │
└─────────────────────────────────────────────────────────────┘
```

The card will have:
- Light primary background (`bg-primary/5`)
- Primary border (`border-primary/20`)
- "Need Help?" heading with description
- "Contact Support" button with MessageSquare icon

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/shared/SupportDialog.tsx` | Create - reusable support modal component |
| `src/pages/cbo/CBOOrganization.tsx` | Modify - add support card and dialog |
| `src/pages/healthplan/HealthPlanProfile.tsx` | Modify - add support card and dialog |

---

## Technical Notes

- The `SupportDialog` component encapsulates all modal state and logic, making it easy to add to any page
- Uses the shared `useSupportCases` hook so all support cases appear in the member's "My Cases" section (for demo purposes, all portals share the same case storage)
- Subject options are passed as props, allowing context-specific customization
- The component follows the existing visual patterns (loading spinner, success checkmark, case number display)
- Both pages will show the same styled support card at the bottom for visual consistency

