

# Pre-populate Healthie Booking Form with Member Info

## Overview

This is fully supported! Healthie's embed iframe accepts URL parameters to pre-populate the "Share your information" step. We already have the member's info available, so we just need to add these parameters to the iframe URL.

## Healthie URL Parameters Available

Based on their documentation, these parameters can be appended to the embed URL:

| Parameter | Description | Member Field |
|-----------|-------------|--------------|
| `first_name` | Pre-fills first name field | `member.firstName` |
| `last_name` | Pre-fills last name field | `member.lastName` |
| `email` | Pre-fills email address | `member.email` |
| `phone_number` | Pre-fills phone number | `member.phone` |
| `read_only` | Makes pre-filled fields non-editable | Set to `true` |

## Implementation

Update the iframe src in `MemberHome.tsx` to dynamically include member information as URL parameters.

### Current URL

```
https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=11976136&provider_ids=%5B11976136%5D&appt_type_ids=%5B466786,466787,466788%5D
```

### Updated URL

```
https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=11976136&provider_ids=%5B11976136%5D&appt_type_ids=%5B466786,466787,466788%5D&first_name=Maria&last_name=Santos&email=maria.santos@email.com&phone_number=555-123-4567&read_only=true
```

## File to Modify

| File | Change |
|------|--------|
| `src/pages/member/MemberHome.tsx` | Build iframe URL dynamically with member info parameters |

## Code Changes

Create a helper function to build the URL with encoded parameters:

```typescript
// Build Healthie booking URL with pre-filled member info
const buildHealthieBookingUrl = () => {
  const baseUrl = 'https://secure.gethealthie.com/appointments/embed_appt';
  const params = new URLSearchParams({
    dietitian_id: '11976136',
    provider_ids: '[11976136]',
    appt_type_ids: '[466786,466787,466788]',
  });
  
  // Pre-populate member information
  if (member?.firstName) params.append('first_name', member.firstName);
  if (member?.lastName) params.append('last_name', member.lastName);
  if (member?.email) params.append('email', member.email);
  if (member?.phone) params.append('phone_number', member.phone);
  
  // Make pre-filled fields read-only (optional - remove if you want them editable)
  params.append('read_only', 'true');
  
  return `${baseUrl}?${params.toString()}`;
};
```

Then update the iframe:

```tsx
<iframe 
  src={buildHealthieBookingUrl()}
  style={{ width: '100%', height: '600px', border: 'none' }}
  title="Book Health Coach Appointment"
/>
```

## User Experience

When a member reaches the "Share your information" step:

1. First Name, Last Name, Email, and Phone Number will be pre-filled
2. With `read_only=true`, these fields cannot be edited (ensuring data consistency)
3. The member only needs to fill in the "Reason for Appointment" field
4. This reduces friction and prevents data entry errors

## Optional Enhancement

If you'd prefer members to be able to edit their info, simply remove the `read_only=true` parameter.

