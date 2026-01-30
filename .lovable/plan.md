

# Fix: Re-authenticate on Token Expiration

## Root Cause

The Healthie per-user API token obtained during initial authentication has expired. When the "My Appointments" component tries to refetch data, it uses the stale token stored in `authState`, resulting in "API Key is Invalid" error.

## Solution

Detect token expiration errors and trigger re-authentication.

### Changes to `src/components/healthie/HealthieChatWrapper.tsx`

Add a method to re-authenticate that can be called when API errors occur, and pass it down through context:

1. **Create a context** to expose the `reauthenticate` function to child components
2. **Wrap the error handling** to detect "API Key is Invalid" and trigger re-auth

### Changes to `src/components/healthie/MyAppointments.tsx`

1. **Detect the specific error** "API Key is Invalid"
2. **Show a "Session Expired" message** with a "Reconnect" button that triggers re-authentication

## Implementation Details

### 1. Create Healthie Auth Context

```typescript
// New context to expose re-auth capability
const HealthieAuthContext = React.createContext<{
  userId: string;
  reauthenticate: () => Promise<void>;
} | null>(null);

export function useHealthieAuth() {
  return useContext(HealthieAuthContext);
}
```

### 2. Add Re-authenticate Function in Wrapper

```typescript
const reauthenticate = useCallback(async () => {
  setLoading(true);
  setError(null);
  await authenticateUser(); // Re-run the auth flow
}, [email, password]);
```

### 3. Update Error Display in MyAppointments

When the error contains "API Key is Invalid" or "Invalid", show a specific reconnect option:

```typescript
if (error?.toLowerCase().includes('invalid')) {
  return (
    <Card>
      <CardContent>
        <p>Session expired</p>
        <Button onClick={onReconnect}>Reconnect</Button>
      </CardContent>
    </Card>
  );
}
```

## Files to Modify

| File | Change |
|------|--------|
| `src/components/healthie/HealthieChatWrapper.tsx` | Add context provider with `reauthenticate` function |
| `src/components/healthie/MyAppointments.tsx` | Consume context and handle token expiration errors |

## Quick Alternative

For the demo, a simpler approach: **refresh the entire page** when the token expires. This forces a complete re-authentication.

```typescript
// In MyAppointments error handling
if (error?.toLowerCase().includes('invalid')) {
  return (
    <Button onClick={() => window.location.reload()}>
      Session Expired - Click to Reconnect
    </Button>
  );
}
```

This is less elegant but works immediately without needing to refactor the context architecture.

