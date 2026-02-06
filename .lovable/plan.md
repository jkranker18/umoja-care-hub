
# Rename "Nudge" to "Nudj" on the Landing Page

## Overview
The integration name on the `/` landing page currently reads "Nudge" but should be spelled **"Nudj"**.

## Change

### `src/pages/Landing.tsx`
- Line 281: Change the text `Nudge` to `Nudj`

This is a single text change on the landing page. The internal type names, CSS classes, and other references throughout the codebase will remain as-is since they are code identifiers, not user-facing labels. Only the visible display text on the landing page will be updated.
