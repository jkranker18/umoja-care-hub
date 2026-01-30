

# Fix Appointments Loading Error

## Problem

The GraphQL query is failing because `order_by: "DATE_ASC"` is not a valid value for the `AppointmentOrderKeys` enum in the Healthie API.

**Error**: `Argument 'order_by' on Field 'appointments' has an invalid value ("DATE_ASC"). Expected type 'AppointmentOrderKeys'.`

## Solution

Remove the `order_by` parameter from the GraphQL query. The API will return appointments in its default order, and since we're filtering with `is_upcoming: true`, they should come back in chronological order. If needed, we can add client-side sorting as a fallback.

## File to Modify

| File | Change |
|------|--------|
| `src/hooks/useHealthieAppointments.ts` | Remove `order_by: "DATE_ASC"` from the query, add client-side sorting |

## Updated Query

```graphql
query GetUserAppointments($user_id: ID!, $is_upcoming: Boolean) {
  appointments(user_id: $user_id, is_upcoming: $is_upcoming) {
    id
    date
    start
    end
    length
    appointment_type {
      name
    }
    appointment_label
    contact_type
    provider {
      id
      name
    }
    zoom_join_url
    external_videochat_url
    zoom_dial_in_info
    pm_status
    can_client_cancel
    can_client_reschedule
  }
}
```

## Additional Change

Add client-side sorting to ensure appointments display in chronological order:

```typescript
const appointments = (data?.appointments || [])
  .map((apt) => ({
    ...apt,
    appointment_type: apt.appointment_type?.name || apt.appointment_label || 'Appointment',
    provider_name: apt.provider?.name || 'Health Coach',
  }))
  .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
```

This ensures appointments are always displayed soonest-first regardless of API return order.

