

# Add Referrals Page to CBO Portal

## Overview
Add a "Referrals" nav item to the CBO sidebar linking to a new page that lists inbound referrals from Unite US and FindHelp. Each referral represents a person the food bank needs to contact and run through the AHC-HRSN member intake screener.

## Changes

### 1. Sidebar (`src/components/layout/Sidebar.tsx`)
- Add `{ label: 'Referrals', path: '/cbo/referrals', icon: UserPlus }` to `cboNav` (between Home and Organization)

### 2. Route (`src/App.tsx`)
- Add route: `/cbo/referrals` → new `CBOReferrals` component

### 3. New Page (`src/pages/cbo/CBOReferrals.tsx`)

**KPI Cards** at top:
- New Referrals (pending outreach count)
- Contacted (in-progress count)
- Enrolled (completed screener count)

**Referral Table** with mock data (~6-8 rows):
- Columns: Name, Source (Unite US / FindHelp badge), Referred Date, Reason/Need (e.g. "Food Insecurity", "Nutrition Support"), Contact Info (phone/email), Status (New / Contacted / Scheduled / Enrolled / Unable to Reach), Actions
- Source shown as a colored badge distinguishing Unite US vs FindHelp
- Status shown via StatusPill component

**Actions per row:**
- "Start Screener" button → navigates to `/cbo/intake` (existing AHC-HRSN intake form)
- "Mark Contacted" → updates status to Contacted
- "Unable to Reach" → updates status accordingly

**Filters:** Search by name, filter by source (All/Unite US/FindHelp), filter by status

All data is local mock state via useState.

