

# Fix Healthie Chat - Create Edge Function Proxy

## The Problem

The Healthie Chat SDK is failing with a **CORS error** ("Failed to fetch"). When the browser tries to call `https://api.gethealthie.com/graphql` directly, the request is blocked because Healthie's API doesn't include the necessary CORS headers to allow requests from your app's domain.

**From the network logs:**
```
Request: POST https://api.gethealthie.com/graphql
Error: Failed to fetch
```

---

## The Solution

Create a **Supabase Edge Function** that acts as a proxy between your frontend and Healthie's API. This:

1. Keeps the API key secure on the server side
2. Bypasses CORS since the request comes from a server, not a browser
3. Allows real-time WebSocket connections for chat subscriptions

---

## Architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                              CURRENT (Broken)                           │
│  Browser ──────X──────> api.gethealthie.com                            │
│           (CORS blocked)                                                │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                              FIXED (With Proxy)                          │
│  Browser ────────> Edge Function ────────> api.gethealthie.com         │
│                    (adds CORS headers)    (server-to-server, no CORS)  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

Before implementation, we need to:
1. **Connect to Supabase Cloud** (if not already connected) - Required for Edge Functions
2. **Move HEALTHIE_API_KEY to Supabase Secrets** - The edge function will read it from there

---

## Implementation Steps

### Step 1: Create Healthie Proxy Edge Function

**File: `supabase/functions/healthie-proxy/index.ts`**

This edge function will:
- Accept GraphQL requests from the frontend
- Forward them to Healthie's API with proper authentication
- Return the response with CORS headers

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const HEALTHIE_API_KEY = Deno.env.get('HEALTHIE_API_KEY');
  
  // Forward request to Healthie
  const body = await req.json();
  
  const response = await fetch('https://api.gethealthie.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Basic ${HEALTHIE_API_KEY}`,
      'authorizationsource': 'API',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
```

---

### Step 2: Update HealthieChatWrapper

**File: `src/components/healthie/HealthieChatWrapper.tsx`**

Modify the Apollo Client to use the edge function proxy instead of calling Healthie directly:

```typescript
// Before (broken)
const httpLink = new HttpLink({
  uri: 'https://api.gethealthie.com/graphql',
  headers: {
    authorization: `Basic ${apiKey}`,
    authorizationsource: 'API',
  },
});

// After (fixed)
const httpLink = new HttpLink({
  uri: 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/healthie-proxy',
  // No auth headers needed - the edge function handles authentication
});
```

---

### Step 3: Handle WebSocket Subscriptions

For real-time messaging, we have two options:

**Option A: Direct WebSocket Connection (Simpler)**
WebSocket connections may work directly since they're not subject to the same CORS restrictions. We'll try this first:

```typescript
const cable = ActionCable.createConsumer(
  `wss://ws.gethealthie.com/subscriptions?token=${apiKey}`
);
```

**Option B: Edge Function WebSocket Proxy (If needed)**
If WebSocket also fails, we'll need a more complex solution with a WebSocket relay.

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `supabase/functions/healthie-proxy/index.ts` | Create | Edge function to proxy Healthie API calls |
| `src/components/healthie/HealthieChatWrapper.tsx` | Modify | Point Apollo Client to edge function |

---

## Environment Configuration

The `HEALTHIE_API_KEY` secret must be available in Supabase Edge Functions:

1. Go to your Supabase Dashboard > Project Settings > Edge Functions
2. Add `HEALTHIE_API_KEY` as a secret
3. The edge function will access it via `Deno.env.get('HEALTHIE_API_KEY')`

---

## Testing Plan

After implementation:
1. Navigate to the Health Coach tab
2. The chat interface should load conversations
3. Try sending a message to verify real-time messaging works
4. Check console for any remaining errors

---

## Alternative: Check if Healthie Supports CORS

Before implementing the proxy, we could also check if:
- Healthie has a CORS configuration option in their dashboard
- There's a specific domain whitelist setting
- The SDK has a different recommended setup for browser-based apps

However, based on the error, a proxy is the most reliable solution.

