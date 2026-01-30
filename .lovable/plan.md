
# Add My Appointments Section to Health Coach

## Overview

Add a "My Appointments" section to the Health Coach tab that displays the member's booked appointments and allows them to join calls directly from the application. This leverages the existing Healthie authentication flow and GraphQL proxy infrastructure.

## API Feasibility

Based on the Healthie GraphQL API documentation, this is fully supported:

| Requirement | API Support | Field(s) |
|-------------|-------------|----------|
| Fetch user appointments | `appointments` query with `user_id` filter | - |
| Appointment details | Yes | `id`, `date`, `start`, `end`, `length`, `appointment_type` |
| Provider info | Yes | `provider_name`, `provider` |
| Video call join link | Yes | `zoom_join_url`, `external_videochat_url` |
| Phone dial-in | Yes | `zoom_dial_in_info`, `zoom_dial_in_numbers_json` |
| Appointment status | Yes | `pm_status`, `contact_type` |
| Cancelable/Reschedulable | Yes | `can_client_cancel`, `can_client_reschedule` |

## Implementation Plan

### 1. Create Appointment Types

Add TypeScript interfaces in a new file for type safety:

```text
src/types/healthie.ts

- HealthieAppointment interface with:
  - id, date, start, end, length
  - appointment_type, appointment_label
  - contact_type (Phone/Video)
  - provider_name
  - zoom_join_url, external_videochat_url
  - zoom_dial_in_info
  - pm_status
  - can_client_cancel, can_client_reschedule
```

### 2. Create useHealthieAppointments Hook

Create a custom hook that:
- Uses the Apollo Client from HealthieChatWrapper context
- Queries the `appointments` GraphQL endpoint
- Filters for the current user's upcoming appointments
- Returns loading state, error state, and appointments list
- Auto-refreshes when the component mounts

GraphQL Query:
```text
query GetUserAppointments($user_id: ID!, $is_upcoming: Boolean) {
  appointments(user_id: $user_id, is_upcoming: $is_upcoming) {
    id
    date
    start
    end
    length
    appointment_type
    appointment_label
    contact_type
    provider_name
    zoom_join_url
    external_videochat_url
    zoom_dial_in_info
    pm_status
    can_client_cancel
    can_client_reschedule
  }
}
```

### 3. Create MyAppointments Component

New component displaying appointments in a list/card format:

| Element | Description |
|---------|-------------|
| Header | "My Appointments" with refresh button |
| Empty State | "No upcoming appointments" message |
| Appointment Card | Shows date, time, provider, type |
| Join Button | "Join Video Call" or "View Dial-In" based on contact_type |
| Status Badge | Confirmed, Pending, etc. |
| Actions | Cancel/Reschedule links if allowed |

Visual layout:
```text
+--------------------------------------------------+
| My Appointments                      [Refresh]   |
+--------------------------------------------------+
| +----------------------------------------------+ |
| | Tue, Feb 4 at 2:00 PM                        | |
| | Initial Nutrition Consultation (30 min)     | |
| | with Dr. Sarah Johnson                       | |
| | [Video Call]          [Join Call] [Cancel]   | |
| +----------------------------------------------+ |
| +----------------------------------------------+ |
| | Thu, Feb 13 at 10:00 AM                      | |
| | Follow-up Session (15 min)                   | |
| | with Dr. Sarah Johnson                       | |
| | [Phone Call]         [View Dial-In]          | |
| +----------------------------------------------+ |
+--------------------------------------------------+
```

### 4. Update Health Coach Tab

Modify the Health Coach tab in MemberHome.tsx to include the new section:

```text
Health Coach Tab Layout:
1. [NEW] My Appointments Card - Shows booked appointments with join buttons
2. [EXISTING] Book Appointment Card - Healthie embed iframe
3. [EXISTING] Message Your Coach Card - Chat component
```

### 5. Handle Join Call Actions

| Contact Type | Action |
|--------------|--------|
| Video (Zoom) | Open `zoom_join_url` in new tab |
| Video (Other) | Open `external_videochat_url` in new tab |
| Phone | Show dialog with dial-in number and meeting ID |

## Files to Create/Modify

| File | Change |
|------|--------|
| `src/types/healthie.ts` | New file - TypeScript interfaces for Healthie appointment data |
| `src/hooks/useHealthieAppointments.ts` | New file - Custom hook for fetching appointments via GraphQL |
| `src/components/healthie/MyAppointments.tsx` | New file - Component to display and manage appointments |
| `src/pages/member/MemberHome.tsx` | Add MyAppointments component to Health Coach tab |

## Technical Considerations

1. **Authentication**: Reuse the existing per-user token flow from HealthieChatWrapper
2. **Apollo Client**: The MyAppointments component must be rendered inside HealthieChatWrapper to access the authenticated Apollo client
3. **Refresh Strategy**: Provide manual refresh button; optionally poll every 60 seconds
4. **Time Zones**: Display times in user's local timezone using the `start` ISO timestamp
5. **Join Window**: Only show "Join Call" button within 15 minutes of appointment start time

## Edge Cases

- No appointments booked - Show friendly empty state
- Past appointments - Filter out or show in separate "Past" section
- Canceled appointments - Either exclude or show with strikethrough
- Loading state - Show skeleton cards
- Error state - Show error message with retry button
