import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ABACUS_PREDICTIONS_URL = Deno.env.get("ABACUS_PREDICTIONS_URL");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type UiMsg = { role: "system" | "user" | "assistant"; content: string };
type AbacusMsg = { is_user: boolean; text: string };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  try {
    const { messages = [], temperature = 0.3, max_tokens = 600 } = await req.json();
    
    console.log('Received request:', { messages: messages?.length, temperature, max_tokens });
    console.log('ABACUS_PREDICTIONS_URL check:', ABACUS_PREDICTIONS_URL ? `Present (${ABACUS_PREDICTIONS_URL.substring(0, 50)}...)` : 'Missing');
    
    if (!ABACUS_PREDICTIONS_URL) {
      console.error('ABACUS_PREDICTIONS_URL is not set');
      return new Response(JSON.stringify({ error: "Predictions URL not configured" }), {
        status: 500,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    // Convert UI messages to Abacus format
    const abacusMessages: AbacusMsg[] = (messages as UiMsg[])
      .filter(m => m.role === "user" || m.role === "assistant")
      .map(m => ({ is_user: m.role === "user", text: m.content }));

    // Add system message as first message if no messages exist
    if (abacusMessages.length === 0) {
      abacusMessages.push({ 
        is_user: true, 
        text: "Hello, I'd like to learn about your products." 
      });
    }

    const body = {
      messages: abacusMessages,
      numCompletionTokens: max_tokens,
      temperature,
    };

    console.log('Request payload:', { 
      messages_count: body.messages.length,
      numCompletionTokens: body.numCompletionTokens,
      temperature: body.temperature,
      firstMessage: body.messages[0],
      lastMessage: body.messages[body.messages.length - 1]
    });

    console.log('Making request to Abacus Predictions API...');
    
    const upstream = await fetch(ABACUS_PREDICTIONS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const txt = await upstream.text();
    console.log("ABACUS status:", upstream.status);
    console.log("ABACUS raw response (first 400):", txt.slice(0, 400));

    if (!upstream.ok) {
      console.error("ABACUS error response:", { status: upstream.status, body: txt.slice(0, 1000) });
      return new Response(JSON.stringify({ error: "abacus_error", status: upstream.status, body: txt }), {
        status: 502, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    // Parse and log the JSON structure for debugging
    try {
      const jsonData = JSON.parse(txt);
      console.log("ABACUS JSON structure - top level keys:", Object.keys(jsonData));
      if (jsonData.choices && jsonData.choices[0]) {
        console.log("choices[0] keys:", Object.keys(jsonData.choices[0]));
      }
      if (jsonData.output_text) {
        console.log("output_text found:", jsonData.output_text.substring(0, 100));
      }
    } catch (e) {
      console.log("Could not parse JSON for inspection:", e);
    }

    // Return JSON to the client
    return new Response(txt, { 
      status: 200, 
      headers: { ...CORS, "Content-Type": "application/json" } 
    });

  } catch (e) {
    console.error('Error in vivian-chat function:', e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 400, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});