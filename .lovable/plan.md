

# Implementation Plan: Pivot Demo for External Health Plan Audience

This plan converts the member portal demo from an internal C-suite demo to a cleaner, external health plan demo by removing internal controls and updating content to match your specified benefit details.

---

## Summary of Changes

| Area | Change |
|------|--------|
| Header | Remove demo controls and role switcher |
| Header | Add clickable bell notification with content progress modal |
| Top 4 Cards | Update Next Shipment to 2 weeks from today |
| Top 4 Cards | Update Benefit Level to show "12 weeks, 14 meals/week, weekly" |
| Overview - Current Program | Remove Source badges, update frequency to weekly, duration to 12 weeks |
| Latest Assessment | Replace Diet Score with Allergens + Chronic Conditions |
| Recent Orders | Show 1 delivered, 1 in transit, 1 pending shipment |
| Recent Orders | "View All" navigates to My Orders tab |

---

## Phase 1: Header Cleanup and Notification Modal

### 1.1 Remove Demo Controls from Header

**File:** `src/components/layout/Header.tsx`

Remove the following elements:
- "Start Demo" / "Demo Active" button
- "Reset Data" button
- Role switcher dropdown (Member Portal / CBO Portal / etc.)

Keep:
- Logo
- Mobile menu button
- Bell notification icon
- Help icon

### 1.2 Add Notification Modal

**File:** `src/components/layout/Header.tsx`

Create a dialog/modal triggered by clicking the bell icon:
- Uses existing `Dialog` component from `@/components/ui/dialog`
- Modal title: "Complete Your Progress"
- Modal content: Message encouraging user to complete their education content modules
- Shows current progress (e.g., "You've completed 2 of 6 modules")
- Call-to-action button to navigate to the Education tab

---

## Phase 2: Top 4 KPI Cards Updates

**File:** `src/pages/member/MemberHome.tsx`

### 2.1 Next Shipment Card
- Calculate date as 2 weeks from today using `date-fns`
- Display format: "Feb 10" (or appropriate date)
- Update subtitle to "Estimated delivery"

### 2.2 Benefit Level Card
- Value: "12 weeks"
- Subtitle: "Weekly | 14 meals/week"
- This provides clear benefit structure at a glance

---

## Phase 3: Overview - Current Program Section

**File:** `src/pages/member/MemberHome.tsx`

### 3.1 Remove Source References
- Remove the `<SourceOfTruth source="NetSuite" .../>` component from the Current Program card
- Remove the "Source" field from the details grid

### 3.2 Update Program Details
- Hardcode or override `Frequency` to show "Weekly"
- Hardcode or override `Duration` to show "12 weeks"

---

## Phase 4: Latest Assessment Section Redesign

**File:** `src/pages/member/MemberHome.tsx`

### 4.1 Remove Healthie References
- Remove `<IntegrationBadge type="Healthie" />` from the card header
- Remove `<SourceOfTruth source="Healthie" .../>` at the bottom

### 4.2 Replace Diet Score with Health Profile
Instead of showing diet score progress bar, display:

**Allergens Section:**
- Label: "Allergens"
- Display as tags/badges: Eggs, Soy, Shellfish

**Chronic Conditions Section:**
- Label: "Tailored For"
- Display as tags/badges: Hypertension

This shows what the member reported and what their meals are customized for.

---

## Phase 5: Recent Orders Section Updates

**File:** `src/pages/member/MemberHome.tsx`

### 5.1 Update Order Display Logic
Currently shows first 3 orders randomly. Change to show exactly:
1. One order with status "delivered" (last completed)
2. One order with status "in_transit" (current shipment)
3. One order with status "processing" or "shipped" (next to ship)

This will require filtering/sorting the `memberOrders` array to find one of each status type.

### 5.2 Fix "View All" Navigation
Currently navigates to `/member/orders` which may not exist. Change to:
- Use React state to control the active tab
- Set the tab to "orders" when "View All" is clicked
- This keeps the user on the same page but switches to the My Orders tab

**Implementation approach:**
- Add `useState` for `activeTab` with default value "overview"
- Pass `activeTab` to `<Tabs value={activeTab}>`
- Update `onValueChange` to sync state
- "View All" button calls `setActiveTab("orders")`

---

## Technical Details

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/layout/Header.tsx` | Remove demo controls, add notification modal |
| `src/pages/member/MemberHome.tsx` | Update cards, program section, assessment, orders |
| `src/lib/mockData.ts` | Optionally add allergen/condition fields to Member or Assessment type |

### New Component Structure for Assessment Card

```text
Latest Assessment
├── Type: Initial Intake Assessment
├── Allergens
│   ├── [Eggs] [Soy] [Shellfish]
├── Tailored For
│   └── [Hypertension]
└── (SDOH Needs section remains if needed)
```

### Date Calculation for Next Shipment

```text
Using date-fns:
- addWeeks(new Date(), 2) 
- format(date, 'MMM d')
- Result example: "Feb 10"
```

---

## Implementation Order

1. **Header changes** - Quick win, removes internal controls
2. **Notification modal** - Adds interactivity to bell icon
3. **KPI cards** - Update values and subtitles
4. **Current Program** - Remove sources, update frequency/duration
5. **Latest Assessment** - Redesign with allergens and conditions
6. **Recent Orders** - Fix filtering logic and View All navigation

---

## Notes

- All changes are scoped to the Member Portal (`/member` route)
- No changes needed to other portals (CBO, Health Plan, Internal Ops)
- Mock data can be enhanced to include allergen/condition data, or we can hardcode it for demo purposes
- The notification modal is a nice touch for demo interactivity

