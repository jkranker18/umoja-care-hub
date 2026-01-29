import React, { useMemo } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import * as ActionCable from '@rails/actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';
import { HealthieProvider } from '@healthie/chat';

interface HealthieChatWrapperProps {
  apiKey: string;
  userId?: string;
  children: React.ReactNode;
}

export function HealthieChatWrapper({ apiKey, userId, children }: HealthieChatWrapperProps) {
  const client = useMemo(() => {
    // HTTP link for queries and mutations
    const httpLink = new HttpLink({
      uri: 'https://api.gethealthie.com/graphql',
      headers: {
        authorization: `Basic ${apiKey}`,
        authorizationsource: 'API',
      },
    });

    // WebSocket link via ActionCable for subscriptions
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
