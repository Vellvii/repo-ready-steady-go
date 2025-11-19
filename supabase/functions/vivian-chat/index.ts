import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Vivian chat function called');
    
    const { messages } = await req.json();
    console.log('Received messages:', messages?.length, 'messages');

    const ABACUS_API_KEY = Deno.env.get("ABACUS_API_KEY");
    const ABACUS_URL = Deno.env.get("ABACUS_PREDICTIONS_URL");
    const DEPLOYMENT_TOKEN = Deno.env.get("ABACUS_DEPLOYMENT_TOKEN");
    const DEPLOYMENT_ID = Deno.env.get("ABACUS_DEPLOYMENT_ID");

    if (!ABACUS_API_KEY || !ABACUS_URL || !DEPLOYMENT_TOKEN || !DEPLOYMENT_ID) {
      console.error('Missing environment variables');
      throw new Error('Missing required environment variables');
    }

    console.log('Calling Abacus API with:', {
      url: ABACUS_URL,
      deploymentId: DEPLOYMENT_ID,
      messageCount: messages?.length
    });

    const abacusRes = await fetch(ABACUS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ABACUS_API_KEY}`,
      },
      body: JSON.stringify({
        deploymentToken: DEPLOYMENT_TOKEN,
        deploymentId: DEPLOYMENT_ID,
        messages: messages, // Send full conversation history
        temperature: 0.3,
      }),
    });

    console.log('Abacus API response status:', abacusRes.status);

    if (!abacusRes.ok) {
      const errorText = await abacusRes.text();
      console.error('Abacus API error:', errorText);
      throw new Error(`Abacus API error: ${abacusRes.status}`);
    }

    const data = await abacusRes.json();
    console.log('Abacus API response data:', data);

    // Extract Vivien's reply from the correct path in Abacus response
    const reply = 
      data?.result?.messages?.[1]?.text ||
      data?.result?.messages?.find(msg => !msg.is_user)?.text ||
      "I'm having trouble responding right now.";

    console.log('Sending reply:', reply);

    return new Response(JSON.stringify({ reply }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Vivian chat error:", error);
    return new Response(
      JSON.stringify({ reply: "I'm having trouble connecting right now." }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});