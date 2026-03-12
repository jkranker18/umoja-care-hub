
# Update Suzie (Tier 2) to MTG-Only

## Summary
Suzie should not receive any Medically Tailored Meals (MTM). Her entire 12-week program should be Medically Tailored Groceries (MTG) only.

## Changes

### 1. `src/lib/mockData.ts` - Update Tier 2 Program Definition
Change `prog-tier2` from `mtmWeeks: 4, mtgWeeks: 8` to `mtmWeeks: 0, mtgWeeks: 12` so all 12 weeks are MTG.

### 2. `src/pages/member/MemberHome.tsx` - Handle MTG-Only Display
Update the Phase Progress bar section so that when `program.mtmWeeks === 0`, it shows only the MTG progress bar (no MTM bar). Also update the "Current Phase" KPI card and the meal plan description text to reflect MTG-only when there are no MTM weeks.

Two files modified. No new files.
