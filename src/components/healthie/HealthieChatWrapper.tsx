import React, { useMemo, useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import * as ActionCable from '@rails/actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';
import { HealthieProvider } from '@healthie/chat';
import { Loader2 } from 'lucide-react';

interface HealthieChatWrapperProps {
  userId?: string;
  children: React.ReactNode;
}

// Edge function URL for Healthie proxy
const HEALTHIE_PROXY_URL = 'https://snpcoicphiammfentdxl.supabase.co/functions/v1/healthie-proxy';

export function HealthieChatWrapper({ userId, children }: HealthieChatWrapperProps) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch API key from edge function on mount
  useEffect(() => {
    async function fetchApiKey() {
      try {
        const response = await fetch(HEALTHIE_PROXY_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch API configuration');
        }
        const data = await response.json();
        setApiKey(data.apiKey);
      } catch (err) {
        console.error('Failed to fetch Healthie config:', err);
        setError('Unable to connect to messaging service');
      } finally {
        setLoading(false);
      }
    }
    fetchApiKey();
  }, []);

  const client = useMemo(() => {
    if (!apiKey) return null;

    // HTTP link for queries and mutations - using edge function proxy to bypass CORS
    const httpLink = new HttpLink({
      uri: HEALTHIE_PROXY_URL,
      // No auth headers needed - the edge function handles Healthie authentication
    });

    // WebSocket link via ActionCable for subscriptions
    // WebSocket connections are not subject to CORS, so direct connection should work
    const cable = ActionCable.createConsumer(
      `wss://ws.gethealthie.com/subscriptions?token=${apiKey}`
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
  }, [apiKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <p>Connecting to messaging...</p>
      </div>
    );
  }

  if (error || !apiKey) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        <p>{error || 'Unable to connect to messaging service'}</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        <p>Chat requires a linked Healthie account.</p>
      </div>
    );
  }

  return (
    <ApolloProvider client={client}>
      <HealthieProvider userId={userId}>
        {children}
      </HealthieProvider>
    </ApolloProvider>
  );
}
