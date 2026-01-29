import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version, x-healthie-user-token',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

const HEALTHIE_GRAPHQL_URL = 'https://api.gethealthie.com/graphql';

// GraphQL mutation to sign in and get per-user API token
const SIGN_IN_MUTATION = `
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
`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const HEALTHIE_API_KEY = Deno.env.get('HEALTHIE_API_KEY');
  
  if (!HEALTHIE_API_KEY) {
    console.error('HEALTHIE_API_KEY not configured');
    return new Response(
      JSON.stringify({ error: 'API key not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // GET request - return API key for WebSocket connection (admin key for now, will be replaced by per-user flow)
  if (req.method === 'GET') {
    return new Response(
      JSON.stringify({ apiKey: HEALTHIE_API_KEY }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    
    // Check if this is an authentication request
    if (body.path === 'auth') {
      console.log('Processing Healthie authentication request');
      
      const { email, password } = body;
      
      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: 'Email and password are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Call Healthie signIn mutation to get per-user API token
      const authResponse = await fetch(HEALTHIE_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Basic ${HEALTHIE_API_KEY}`,
          'authorizationsource': 'API',
        },
        body: JSON.stringify({
          query: SIGN_IN_MUTATION,
          variables: {
            input: {
              email,
              password,
              generate_api_token: true,
            },
          },
        }),
      });

      const authData = await authResponse.json();
      console.log('Healthie auth response status:', authResponse.status);
      
      if (authData.errors) {
        console.error('Healthie auth GraphQL errors:', JSON.stringify(authData.errors));
        return new Response(
          JSON.stringify({ error: 'Authentication failed', details: authData.errors }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const signInResult = authData.data?.signIn;
      
      if (signInResult?.messages && signInResult.messages.length > 0) {
        console.error('Healthie signIn messages:', JSON.stringify(signInResult.messages));
        return new Response(
          JSON.stringify({ error: 'Authentication failed', messages: signInResult.messages }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const user = signInResult?.user;
      
      if (!user?.id || !user?.api_key) {
        console.error('No user data returned from Healthie signIn');
        return new Response(
          JSON.stringify({ error: 'Authentication failed - no user data returned' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Healthie auth successful for user:', user.id);
      
      return new Response(
        JSON.stringify({
          userId: user.id,
          apiToken: user.api_key,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Regular GraphQL proxy request
    console.log('Proxying GraphQL request to Healthie:', JSON.stringify(body.operationName || 'unknown'));
    
    // Check for per-user token in header, fall back to admin key
    const userToken = req.headers.get('x-healthie-user-token');
    const authToken = userToken || HEALTHIE_API_KEY;
    
    if (userToken) {
      console.log('Using per-user token for request');
    } else {
      console.log('Using admin API key for request');
    }
    
    const response = await fetch(HEALTHIE_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Basic ${authToken}`,
        'authorizationsource': 'API',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('Healthie response status:', response.status);
    
    if (data.errors) {
      console.error('Healthie GraphQL errors:', JSON.stringify(data.errors));
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Healthie proxy error:', errorMessage);
    return new Response(
      JSON.stringify({ error: 'Proxy error', message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
