

# Healthie Per-User Authentication via Edge Function

## Overview

Add a new endpoint to the `healthie-proxy` edge function that authenticates a member using their Healthie credentials and returns a per-user API token. This token will then be used for all chat operations, ensuring messages are sent as the member (not admin) and only the member's conversations are visible.

---

## How It Works

```text
┌───────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│     Frontend      │     │   healthie-proxy    │     │   Healthie GraphQL  │
│   (MemberHome)    │     │   Edge Function     │     │        API          │
└─────────┬─────────┘     └──────────┬──────────┘     └──────────┬──────────┘
          │                          │                           │
          │  POST /healthie-proxy    │                           │
          │  path: "auth"            │                           │
          │  email + password        │                           │
          ├─────────────────────────►│                           │
          │                          │  signIn mutation          │
          │                          │  generate_api_token: true │
          │                          ├──────────────────────────►│
          │                          │                           │
          │                          │  { user.id, user.api_key }│
          │                          │◄──────────────────────────┤
          │                          │                           │
          │  { userId, apiToken }    │                           │
          │◄─────────────────────────┤                           │
          │                          │                           │
          │  Use apiToken for        │                           │
          │  Apollo + WebSocket      │                           │
          ▼                          ▼                           ▼
```

---

## Implementation Details

### 1. Update Edge Function (`supabase/functions/healthie-proxy/index.ts`)

Add a new route that handles member authentication:

**Request Format:**
```json
POST /healthie-proxy
{
  "path": "auth",
  "email": "member@example.com",
  "password": "memberPassword123"
}
```

**Response Format:**
```json
{
  "userId": "13159857",
  "apiToken": "user_specific_api_key_here",
  "conversationId": "17976028"  // Optional: if we can fetch it
}
```

**Implementation Logic:**
- Check if request body has `path: "auth"`
- Call Healthie's `signIn` mutation with `generate_api_token: true`
- Return the user's `id` and `api_key` to the frontend
- Optionally fetch the member's conversation with their coach

**GraphQL Mutation:**
```graphql
mutation signIn($input: signInInput!) {
  signIn(input: $input) {
    user {
      id
      api_key
    }
    messages {
      field
      message
    }
  }
}
```

---

### 2. Update Member Data Model (`src/lib/mockData.ts`)

Add Healthie credentials for the test member. For demo purposes, we'll store these in the mock data. In production, this would come from a secure credential store or the member would log in.

```typescript
export interface Member {
  // ... existing fields ...
  healthieUserId?: string;
  healthieEmail?: string;     // NEW: For authentication
  healthiePassword?: string;  // NEW: For authentication (demo only)
}
```

---

### 3. Update HealthieChatWrapper (`src/components/healthie/HealthieChatWrapper.tsx`)

Refactor to:
1. Accept member credentials or use stored credentials
2. Call the new auth endpoint on mount
3. Store the per-user API token
4. Use that token for both Apollo HTTP link and WebSocket connection

**New Props:**
```typescript
interface HealthieChatWrapperProps {
  userId?: string;
  email?: string;        // Healthie email for authentication
  password?: string;     // Healthie password for authentication
  children: React.ReactNode;
}
```

**Key Changes:**
- Replace the GET request (which returns admin key) with POST to `/healthie-proxy` with `path: "auth"`
- Store the returned `apiToken` in state
- Pass user's API token to WebSocket connection
- Add custom header to Apollo HTTP link for per-user auth

---

### 4. Update Edge Function for Per-User GraphQL Requests

Modify the GraphQL proxy to accept a user's API token in a custom header:

```typescript
// Check for user token in request header
const userToken = req.headers.get('x-healthie-user-token');
const authToken = userToken || HEALTHIE_API_KEY;

const response = await fetch('https://api.gethealthie.com/graphql', {
  headers: {
    'authorization': `Basic ${authToken}`,
    // ...
  },
});
```

---

### 5. Update HealthieChat Component

Pass the conversation ID to ensure the correct conversation is displayed:

```typescript
// src/components/healthie/HealthieChat.tsx
interface HealthieChatProps {
  conversationId?: string;
}

export function HealthieChat({ conversationId }: HealthieChatProps) {
  return (
    <div className="h-[500px] border rounded-lg overflow-hidden bg-background">
      <Chat conversationId={conversationId} />
    </div>
  );
}
```

---

### 6. Update MemberHome to Pass Credentials

```tsx
<HealthieChatWrapper 
  userId={member?.healthieUserId}
  email={member?.healthieEmail}
  password={member?.healthiePassword}
>
  <HealthieChat conversationId="17976028" />
</HealthieChatWrapper>
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `supabase/functions/healthie-proxy/index.ts` | Add auth endpoint with signIn mutation, support per-user tokens |
| `src/lib/mockData.ts` | Add `healthieEmail` and `healthiePassword` to Member interface |
| `src/components/healthie/HealthieChatWrapper.tsx` | Authenticate member and use their API token |
| `src/components/healthie/HealthieChat.tsx` | Accept and pass `conversationId` prop |
| `src/pages/member/MemberHome.tsx` | Pass member credentials to wrapper |

---

## Security Considerations

For this demo/prototype, credentials are stored in mock data. In production:
- Never store passwords in frontend code
- Use a login flow where the member enters credentials
- Store tokens securely (e.g., in Supabase database with encryption)
- Tokens should be refreshed periodically

---

## Information Needed From You

Before implementing, please provide:

1. **Healthie credentials for John TestSmith** - email and password for the test member so we can authenticate via the edge function

2. **Conversation ID confirmation** - from your URL, we extracted `17976028`. Is this the correct conversation between John TestSmith and his health coach?

---

## Testing After Implementation

1. Navigate to Member Home > Health Coach tab
2. Verify the chat loads without showing all provider conversations
3. Send a message and verify it appears as "John TestSmith" (not Admin)
4. Have the health coach reply from Healthie dashboard and verify it appears in real-time

