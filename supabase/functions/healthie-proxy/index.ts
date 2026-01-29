import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

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

  const url = new URL(req.url);
  
  // GET request - return API key for WebSocket connection
  if (req.method === 'GET') {
    return new Response(
      JSON.stringify({ apiKey: HEALTHIE_API_KEY }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // POST - Forward GraphQL request to Healthie
    const body = await req.json();
    console.log('Proxying GraphQL request to Healthie:', JSON.stringify(body.operationName || 'unknown'));
    
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
