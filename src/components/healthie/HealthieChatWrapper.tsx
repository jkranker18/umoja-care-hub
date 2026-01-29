import React, { useMemo, useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import * as ActionCable from '@rails/actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';
import { HealthieProvider } from '@healthie/chat';
import { Loader2, AlertCircle } from 'lucide-react';

interface HealthieChatWrapperProps {
  userId?: string;
  email?: string;
  password?: string;
  children: React.ReactNode;
}

// Edge function URL for Healthie proxy
const HEALTHIE_PROXY_URL = 'https://snpcoicphiammfentdxl.supabase.co/functions/v1/healthie-proxy';

interface AuthState {
  userId: string;
  apiToken: string;
}

export function HealthieChatWrapper({ userId, email, password, children }: HealthieChatWrapperProps) {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Authenticate with Healthie on mount
  useEffect(() => {
    async function authenticateUser() {
      // If credentials provided, authenticate to get per-user token
      if (email && password) {
        try {
          console.log('Authenticating with Healthie...');
          const response = await fetch(HEALTHIE_PROXY_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              path: 'auth',
              email,
              password,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Authentication failed');
          }

          const data = await response.json();
          console.log('Healthie auth successful, userId:', data.userId);
          
          setAuthState({
            userId: data.userId,
            apiToken: data.apiToken,
          });
        } catch (err) {
          console.error('Failed to authenticate with Healthie:', err);
          setError(err instanceof Error ? err.message : 'Authentication failed');
        } finally {
          setLoading(false);
        }
      } else {
        // No credentials - fall back to legacy flow (admin key)
        console.log('No credentials provided, using legacy admin key flow');
        try {
          const response = await fetch(HEALTHIE_PROXY_URL);
          if (!response.ok) {
            throw new Error('Failed to fetch API configuration');
          }
          const data = await response.json();
          setAuthState({
            userId: userId || '',
            apiToken: data.apiKey,
          });
        } catch (err) {
          console.error('Failed to fetch Healthie config:', err);
          setError('Unable to connect to messaging service');
        } finally {
          setLoading(false);
        }
      }
    }
    
    authenticateUser();
  }, [email, password, userId]);

  const client = useMemo(() => {
    if (!authState?.apiToken) return null;

    // HTTP link for queries and mutations - using edge function proxy
    // Pass the user's token in a custom header
    const httpLink = new HttpLink({
      uri: HEALTHIE_PROXY_URL,
      headers: {
        'x-healthie-user-token': authState.apiToken,
      },
    });

    // WebSocket link via ActionCable for subscriptions
    // Use the per-user token for WebSocket connection
    const cable = ActionCable.createConsumer(
      `wss://ws.gethealthie.com/subscriptions?token=${authState.apiToken}`
    );

    const actionCableLink = new ActionCableLink({ cable });

    // Split link to route subscriptions to WebSocket, queries/mutations to HTTP
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      actionCableLink,
      httpLink
    );

    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });
  }, [authState]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <p>Connecting to messaging...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground gap-2">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p className="font-medium">Unable to connect</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!authState?.apiToken) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        <p>Unable to connect to messaging service</p>
      </div>
    );
  }

  if (!authState.userId) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        <p>Chat requires a linked Healthie account.</p>
      </div>
    );
  }

  return (
    <ApolloProvider client={client}>
      <HealthieProvider userId={authState.userId}>
        {children}
      </HealthieProvider>
    </ApolloProvider>
  );
}
