

# Integrate Healthie Chat SDK into Health Coach Section

## Overview
Add the Healthie Chat React SDK below the existing booking component in the Health Coach tab, enabling real-time messaging between members and their health coaches. The chat will use secure API credentials stored in Lovable secrets.

---

## Prerequisites: API Keys Storage

The following secrets need to be added via Lovable's secrets management:

| Secret Name | Description |
|-------------|-------------|
| `HEALTHIE_API_KEY` | Your Healthie API key for authentication |
| `HEALTHIE_ORGANIZATION_ID` | Your Healthie organization ID (optional, for organization-scoped operations) |

The member's `healthie_user_id` will be stored in the mock data and eventually come from your database.

---

## Dependencies to Install

```json
{
  "@healthie/chat": "^1.1.14",
  "@apollo/client": "^3.8.0",
  "@rails/actioncable": "^7.1.0",
  "graphql": "^16.8.0",
  "graphql-ruby-client": "^1.12.0"
}
```

---

## Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                         MemberHome.tsx                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Health Coach Tab                        │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │           Booking Iframe (existing)                 │  │  │
│  │  │    Book appointments with Healthie calendar         │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              HealthieChatWrapper                    │  │  │
│  │  │  ┌─────────────────────────────────────────────┐   │  │  │
│  │  │  │  ApolloProvider (HTTP + WebSocket links)    │   │  │  │
│  │  │  │  ┌─────────────────────────────────────┐   │   │  │  │
│  │  │  │  │        HealthieProvider              │   │   │  │  │
│  │  │  │  │  ┌─────────┐    ┌───────────────┐   │   │   │  │  │
│  │  │  │  │  │ConvList │    │     Chat      │   │   │   │  │  │
│  │  │  │  │  │(hidden) │    │  (main view)  │   │   │   │  │  │
│  │  │  │  │  └─────────┘    └───────────────┘   │   │   │  │  │
│  │  │  │  └─────────────────────────────────────┘   │   │  │  │
│  │  │  └─────────────────────────────────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/components/healthie/HealthieChatWrapper.tsx` | Create | Apollo Client setup with HTTP + WebSocket links, HealthieProvider wrapper |
| `src/components/healthie/HealthieChat.tsx` | Create | Chat UI component using ConversationList and Chat components |
| `src/lib/mockData.ts` | Modify | Add `healthieUserId` field to Member interface |
| `src/pages/member/MemberHome.tsx` | Modify | Add HealthieChatWrapper below the booking iframe |
| `package.json` | Modify | Add new dependencies |

---

## Implementation Details

### 1. Create HealthieChatWrapper Component

**File: `src/components/healthie/HealthieChatWrapper.tsx`**

This component sets up Apollo Client with:
- HTTP link to `https://api.gethealthie.com/graphql` with auth headers
- WebSocket link via ActionCable for real-time subscriptions
- Split link to route subscriptions to WebSocket, queries/mutations to HTTP

```typescript
// Key configuration
const httpLink = new HttpLink({
  uri: 'https://api.gethealthie.com/graphql',
  headers: {
    authorization: `Basic ${apiKey}`,
    authorizationsource: 'API',
  },
});

const cable = ActionCable.createConsumer(
  `wss://ws.gethealthie.com/subscriptions?token=${apiKey}`
);
```

### 2. Create HealthieChat Component

**File: `src/components/healthie/HealthieChat.tsx`**

Clean chat interface with:
- ConversationList for conversation selection (sidebar)
- Chat component for messaging
- Loading and error states
- Styling that matches existing UI

```typescript
import { ConversationList, Chat } from '@healthie/chat';
import '@healthie/chat/dist/styles/index.css';

export function HealthieChat() {
  return (
    <div className="flex h-[500px] border rounded-lg overflow-hidden">
      <div className="w-1/3 border-r">
        <ConversationList />
      </div>
      <div className="flex-1">
        <Chat />
      </div>
    </div>
  );
}
```

### 3. Update Member Data

**File: `src/lib/mockData.ts`**

Add Healthie user ID to the Member interface to link members to their Healthie accounts:

```typescript
export interface Member {
  // ... existing fields
  healthieUserId?: string; // Healthie user ID for chat integration
}
```

### 4. Update Health Coach Tab

**File: `src/pages/member/MemberHome.tsx`**

Add the chat component below the booking iframe:

```tsx
<TabsContent value="coach">
  <Card>
    {/* Existing booking section */}
    <CardHeader>
      <CardTitle>Health Coach</CardTitle>
      <CardDescription>Book a session with one of our certified health coaches.</CardDescription>
    </CardHeader>
    <CardContent>
      {/* Existing booking iframe */}
      <div className="w-full min-h-[600px] rounded-lg overflow-hidden border">
        <iframe src="..." />
      </div>
    </CardContent>
  </Card>
  
  {/* NEW: Chat section */}
  <Card className="mt-6">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Message Your Coach
      </CardTitle>
      <CardDescription>Chat directly with your health coach.</CardDescription>
    </CardHeader>
    <CardContent>
      <HealthieChatWrapper 
        apiKey={healthieApiKey} 
        userId={member?.healthieUserId}
      >
        <HealthieChat />
      </HealthieChatWrapper>
    </CardContent>
  </Card>
</TabsContent>
```

---

## Security Considerations

1. **API Key Handling**: The Healthie API key should be stored in Lovable secrets and accessed securely
2. **User Authentication**: In production, the `healthieUserId` should come from your authenticated user's profile in the database, linked to their Healthie account
3. **Edge Function Option**: For production, consider creating an edge function to proxy Healthie API calls and keep the API key server-side

---

## Demo Mode

For the demo, we'll:
- Use a placeholder Healthie user ID in the mock data
- Show a loading/placeholder state if no API key is configured
- Display the chat interface once credentials are provided

---

## UI Design

The chat section will appear below the booking component:

```text
┌─────────────────────────────────────────────────────────────────┐
│ Health Coach                                        [Book Now]  │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │              Healthie Booking Calendar                    │  │
│  │                   (existing iframe)                       │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│  Booking provided by Healthie                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 💬 Message Your Coach                                           │
│ Chat directly with your health coach.                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┬───────────────────────────────────────┐   │
│  │  Conversations  │  Chat with Coach Sarah                │   │
│  │  ─────────────  │  ───────────────────────              │   │
│  │  ● Coach Sarah  │  [Coach Sarah] 10:30 AM               │   │
│  │    Last msg...  │  "How are you feeling today?"         │   │
│  │                 │                                       │   │
│  │                 │  [You] 10:35 AM                       │   │
│  │                 │  "Much better, thank you!"            │   │
│  │                 │                                       │   │
│  │                 │  ┌───────────────────────────────┐   │   │
│  │                 │  │ Type a message...         [→] │   │   │
│  │                 │  └───────────────────────────────┘   │   │
│  └─────────────────┴───────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Next Steps After Implementation

1. Add your Healthie API key when prompted
2. Configure the member's Healthie user ID (will be prompted)
3. Test the chat functionality with a real Healthie account
4. Consider moving API key to edge function for production security

