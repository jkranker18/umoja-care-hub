
# Multi-Member Demo Switcher with Per-Tier Personas

## Overview
Add a member switcher to the sidebar bottom rail and create three distinct demo personas (one per tier), each with tailored data that cascades through all `/member` pages. Also add a "Recent Appointments" section to the overview, update order statuses, add a "Change Order" modal for upcoming orders, and expand the "Tailored For" conditions for John.

## What Changes

### 1. Member Switcher in Sidebar
A dropdown/selector at the bottom of the sidebar (only visible when `currentRole === 'member'`) showing:
- **John T.** (Tier 1 - High Risk)
- **Suzie M.** (Tier 2 - Medium Risk)
- **Olivia W.** (Tier 3 - Preventive)

Selecting a member updates a new `activeDemoMember` state in AppContext, which all member pages read from.

### 2. AppContext Changes
Add `activeDemoMember` state (index or ID) so switching cascades to MemberHome, MemberProfile, and all sub-tabs. Each persona will have its own member data, enrollment, program, conditions, allergens, appointments, and orders.

### 3. Per-Member Demo Data Configuration
Rather than complex mock data generation, define a config object per demo member directly in MemberHome (or a shared file) that provides:

**John (Tier 1 - High Risk)**
- Conditions (Tailored For): Hypertension, Depression, Overweight, Chronic Back Pain
- Allergens: Eggs, Soy, Shellfish
- Orders: Feb 10 = Delivered, Feb 17 = In Transit, Feb 24 = Upcoming. All later weeks = Upcoming. "Upcoming" replaces "Processing". Upcoming orders get a "Change Order" button.
- Appointments: Jan = Complete, Feb = To Be Scheduled (clickable to My Care Team), Mar = Upcoming
- Healthie integration stays connected (existing credentials)

**Suzie (Tier 2 - Medium Risk)**
- New member entry: Suzie Martinez, enrolled in Tier 2, week 6 (past the MTM phase, now in MTG-only)
- Conditions: Type 2 Diabetes
- Allergens: Gluten
- Orders: MTG only (no MTM at current week). Same date cadence but adjusted for Tier 2 phase logic. Feb 10 = Delivered, Feb 17 = In Transit, Feb 24 = Upcoming.
- Appointments: Jan = Complete, Feb = Scheduled, Mar = Upcoming
- No Healthie integration (no real credentials)

**Olivia (Tier 3 - Preventive)**
- New member entry: Olivia Williams, enrolled in Tier 3
- No meal orders (Tier 3 gets produce boxes bi-weekly only)
- Conditions: none specific
- Allergens: none
- Appointments: Monthly only (Jan = Complete, Feb = Scheduled, Mar = Upcoming)
- Orders section shows produce box deliveries (bi-weekly)
- No Healthie integration

### 4. Recent Appointments Section (Overview Tab)
Add a "Recent Appointments" card above "Recent Orders" on the overview tab, with the same card/list layout. Shows 3 appointments:
- **January**: Health Coach Check-in -- status: Complete
- **February**: Health Coach Check-in -- status: varies by member (To Be Scheduled for John, Scheduled for Suzie, Scheduled for Olivia). For John, the Feb entry is clickable and navigates to the "coach" tab.
- **March**: Health Coach Check-in -- status: Upcoming

### 5. Order Status Updates
- Replace "processing" label with "Upcoming" throughout the UI
- Feb 10 = Delivered, Feb 17 = In Transit, Feb 24 = Upcoming (shift from current week 5/6 cutoff)
- Upcoming orders show a "Change Order" button
- Clicking "Change Order" opens a simple modal: "A Dietitian will be in contact with you shortly." with a close/OK button

### 6. Tailored For Expansion (John)
Update John's chronic conditions from `['Hypertension']` to `['Hypertension', 'Depression', 'Overweight', 'Chronic Back Pain']`

## Technical Details

### Files to Create
- None (all changes fit in existing files)

### Files to Modify

**`src/contexts/AppContext.tsx`**
- Add `activeDemoMemberId` state and setter
- Default to `'mem-001'` (John)
- Expose in context

**`src/components/layout/Sidebar.tsx`**
- Add a member switcher component at the bottom of the sidebar nav (only for `member` role)
- Shows avatar icon + name + tier badge
- Dropdown with all 3 personas
- Calls `setActiveDemoMemberId` on change

**`src/lib/mockData.ts`**
- Add Suzie and Olivia as new members (`mem-suzie`, `mem-olivia`)
- Add corresponding enrollments for them (Suzie = Tier 2, week 6; Olivia = Tier 3, week 4)
- Update `Order['shipmentStatus']` type to include `'upcoming'`

**`src/pages/member/MemberHome.tsx`**
- Read `activeDemoMemberId` from context instead of hardcoding `members[0]`
- Define per-member config (allergens, conditions, appointment data) based on active member
- Add "Recent Appointments" card above "Recent Orders" in overview tab
- Update order generation: Feb 10 = delivered, Feb 17 = in_transit, Feb 24+ = upcoming
- Add "Change Order" button on upcoming orders
- Add "Change Order" modal dialog
- For Olivia (Tier 3), show produce box schedule instead of meal orders
- Conditionally show/hide Healthie chat based on whether member has credentials

**`src/pages/member/MemberProfile.tsx`**
- Read `activeDemoMemberId` from context instead of hardcoding `members[0]`

**`src/components/shared/StatusPill.tsx`**
- Add handling for `'upcoming'` status (new pill style)

### User Flow
1. User navigates to `/member`
2. Bottom of sidebar shows current demo member (e.g., "John T. - Tier 1")
3. Clicking opens a selector to switch between John, Suzie, Olivia
4. Switching updates all data on the page immediately
5. Overview shows appointments section, updated orders, expanded conditions
6. Clicking "Change Order" on upcoming orders shows dietitian contact modal
7. Feb appointment for John links to My Care Team tab
