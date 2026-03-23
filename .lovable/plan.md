

# Add Admin Management Page to CBO Portal

## Overview
Add an "Admin" page to the CBO sidebar that manages staff users for the white-labeled CBO (LA Food Bank). It includes an admin roster with roles (Admin / Registered Dietitian), an invite flow, a training checklist, and an RD Portal login button for RD users.

## Changes

### 1. Sidebar Navigation (`src/components/layout/Sidebar.tsx`)
- Add `{ label: 'Admin', path: '/cbo/admin', icon: Users }` to the `cboNav` array

### 2. New Route (`src/App.tsx`)
- Import and add route: `<Route path="/cbo/admin" element={<CBOAdmin />} />`

### 3. New Page (`src/pages/cbo/CBOAdmin.tsx`)
This is the main new file. It contains:

**Admin Roster Table** — lists all CBO staff with columns:
- Name, Email, Role (Admin / Registered Dietitian), Training Status, Status (Active / Pending / Training), Last Login
- Each person shows green checkmarks or pending indicators for their two required trainings

**Invite New Admin Dialog** — button opens a dialog with:
- Email input field
- Role selector (Admin or Registered Dietitian)
- "Send Invite" button (demo: adds user to table with "Pending" status)

**Training Checklist** — when a pending user "accepts" the invite (demo: click a "Complete Setup" button on their row), they see a training panel with two items styled like the uploaded screenshot:
- "Complete Security Awareness Training" — click to mark complete (green checkmark)
- "Complete HIPAA Training" — click to mark complete (green checkmark)
- Subtitle text: "This is done annually here in Drata"
- Once both are complete, status changes to "Active"

**RD Portal Login** — for users with the "Registered Dietitian" role:
- An "RD Portal" button appears on their profile row
- Clicking it opens a dialog showing a mock Salesforce-style queue view (based on the second screenshot) with:
  - Header: "RD Portal — Program Enrollments — Jason's Queue"
  - Table with columns: Priority Score, Contact, FFH Program, Enrollment Status, Attempt Count, Days Until Auth, Days Since Enrollment, Assigned RD, Outcome Status, Program Enrollment ID
  - Two mock rows: John TestSmith (Appointment Complete, ENR-48691) and Tester HCSC Update Flow (Termed, ENR-50127)

**Mock Data** — hardcoded in the component:
- 3-4 existing admin users (e.g., Maria Garcia - Admin/Active, Jason Kranker - RD/Active, Sarah Chen - Admin/Active, pending invite user)
- Training completion states tracked via local useState

### 4. CBO Home Page Update (`src/pages/cbo/CBODashboard.tsx`)
- For RD users: add an "RD Portal Login" button card at the bottom that links to the same mock RD portal dialog/view

## Technical Details
- All state is local (useState) — no database needed for this demo
- Training checkmarks use simple boolean state toggling
- The RD Portal mock uses a Dialog with a styled Table mimicking the Salesforce screenshot
- Role force-set via `setCurrentRole('cbo')` in useEffect (existing pattern)

