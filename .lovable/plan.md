

# Make Contact Support Loading Modal More User-Friendly

## Overview
Update the loading state message in the Contact Support modal to remove the Salesforce reference and replace it with warmer, more member-friendly language.

## Current State
When a member submits a support request, they see:
- **Title:** "Creating case in Salesforce..."
- **Subtitle:** "Please wait while we submit your request"

This exposes internal system details that members don't need to know about.

## Proposed Changes

**File:** `src/pages/member/MemberHome.tsx` (lines 703-706)

Replace the technical language with friendly, reassuring messaging:

| Current | New |
|---------|-----|
| "Creating case in Salesforce..." | "Submitting your request..." |
| "Please wait while we submit your request" | "We're connecting you with our support team" |

## Updated Code

```tsx
{supportSubmitting && (
  <div className="flex flex-col items-center justify-center py-12 space-y-4">
    <Loader2 className="h-12 w-12 text-primary animate-spin" />
    <div className="text-center">
      <p className="font-semibold text-lg">Submitting your request...</p>
      <p className="text-sm text-muted-foreground">We're connecting you with our support team</p>
    </div>
  </div>
)}
```

## Summary
A small but impactful change that:
- Removes technical/internal system references
- Uses warmer, people-focused language
- Maintains the same visual structure and animation

