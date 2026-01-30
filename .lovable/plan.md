

# Make Video Call Button Clickable with Zoom Link

## Current State

The MyAppointments component already has logic to handle video calls, but there's a potential issue with how it detects video appointments.

The current code checks:
```typescript
const isVideo = appointment.contact_type?.toLowerCase().includes('video');
const hasVideoLink = appointment.zoom_join_url || appointment.external_videochat_url;
```

And only shows the button if both are true:
```typescript
{isVideo && hasVideoLink && (
  <Button onClick={() => handleJoinCall(appointment)}>Join Call</Button>
)}
```

## The Issue

Looking at the UI, the contact type shows as "Healthie Video Call" in the appointment info row, but the "Join Call" button may not be appearing because:

1. The `zoom_join_url` or `external_videochat_url` fields might not be populated in the API response (API not returning them, or the GraphQL query doesn't include them)
2. The button shows but is disabled because `canJoin` is false (appointment is more than 15 min away)

## Solution

Make the contact type badge itself clickable when there's a video link, so users have a clear visual cue that they can join.

### Changes to `src/components/healthie/MyAppointments.tsx`

1. **Make the contact type badge clickable** when it's a video appointment with a link:

```typescript
{/* Contact Type - clickable for video calls */}
{isVideo && hasVideoLink ? (
  <button 
    onClick={() => handleJoinCall(appointment)}
    className="flex items-center gap-1.5 text-primary hover:underline cursor-pointer"
  >
    <Video className="h-3.5 w-3.5" />
    {appointment.contact_type}
    <ExternalLink className="h-3 w-3" />
  </button>
) : (
  <span className="flex items-center gap-1.5">
    {getContactIcon(appointment.contact_type)}
    {appointment.contact_type}
  </span>
)}
```

2. **Also update the Join Call button** to always show (not just when joinable), but indicate timing:

```typescript
{isVideo && hasVideoLink && (
  <Button 
    size="sm" 
    onClick={() => handleJoinCall(appointment)}
    className="gap-1.5"
  >
    <Video className="h-4 w-4" />
    Join Call
    <ExternalLink className="h-3.5 w-3.5" />
  </Button>
)}
```

This removes the `disabled` state so users can always click to join (Zoom/video platforms handle early joins gracefully).

## Summary of Changes

| Element | Before | After |
|---------|--------|-------|
| Contact type text | Static text | Clickable link for video calls |
| Join Call button | Disabled if > 15 min before start | Always clickable |
| Visual feedback | None | External link icon, hover underline |

