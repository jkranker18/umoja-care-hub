

# Option C: Single Conversation View for Healthie Chat

## Overview

Simplify the Healthie chat to show only the `Chat` component without the `ConversationList`, providing members with a focused interface to message their health coach.

---

## What Will Change

The chat widget will go from showing all provider conversations (confusing) to showing just the chat interface for messaging. Since the SDK's `Chat` component works with context-selected conversations, we'll remove the sidebar and let the user interact with their coach directly.

---

## Architecture

```text
BEFORE:
┌─────────────────────────────────────────────┐
│  ConversationList  │      Chat              │
│  (shows ALL        │  (shows selected       │
│   provider chats)  │   conversation)        │
│                    │                        │
│  - Mike Capozzi    │                        │
│  - Marlene Ortega  │                        │
│  - Chris Woods     │                        │
│  - Test BWoods     │                        │
│  ...               │                        │
└─────────────────────────────────────────────┘

AFTER:
┌─────────────────────────────────────────────┐
│                   Chat                      │
│  (Full-width, focused messaging)            │
│                                             │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Implementation

### File: `src/components/healthie/HealthieChat.tsx`

**Changes:**
1. Remove the `ConversationList` component import and usage
2. Remove the split layout (sidebar + main content)
3. Make the `Chat` component full-width with improved height

```typescript
import { Chat } from '@healthie/chat';
import '@healthie/chat/dist/styles/index.css';

export function HealthieChat() {
  return (
    <div className="h-[500px] border rounded-lg overflow-hidden bg-background">
      <Chat />
    </div>
  );
}
```

---

## Important Notes

### What This Fixes
- Members no longer see all provider conversations
- Cleaner, focused interface for messaging their coach

### What This Doesn't Fix (Limitation of Shared API Key)
- The underlying auth model still uses a shared admin key
- Real-time message updates may still not work perfectly
- If the member has multiple conversations in Healthie, the Chat component may show the most recent one

### Future Improvement
For proper per-member filtering and real-time updates, you would need to implement per-user authentication with Healthie (generating individual API tokens for each member).

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/healthie/HealthieChat.tsx` | Remove ConversationList, simplify to Chat-only layout |

---

## Testing After Implementation

1. Navigate to Member Home > Health Coach tab
2. Verify the chat interface loads without the conversation sidebar
3. Send a test message and check if it appears
4. Send a reply from Healthie dashboard and check if it appears (may require refresh due to WebSocket limitations)

