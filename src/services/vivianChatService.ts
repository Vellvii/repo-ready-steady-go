import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = "https://mawaqjqifmvijolucrlp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hd2FxanFpZm12aWpvbHVjcmxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NTYxMDUsImV4cCI6MjA2NzUzMjEwNX0.QrHerqd8iRD-RoBbZVAtkiSzE3DowV1m5O9mefnt1Gs";

export function extractVivianText(data: any): string {
  // Try the usual suspects, in order - focusing on Abacus-specific keys
  return (
    data?.output_text ??
    data?.choices?.[0]?.text ??
    data?.choices?.[0]?.message?.content ??
    data?.response ??
    data?.answer ??
    data?.message ??
    data?.text ??
    ""
  );
}

export class VivianChatService {
  static async getChatResponse(userMessage: string, pageContext: string, onToken?: (token: string) => void): Promise<string> {
    try {
      console.log('Calling vivian-chat edge function with:', { userMessage, pageContext });
      
      const response = await fetch(`${SUPABASE_URL}/functions/v1/vivian-chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: userMessage }
          ],
          max_tokens: 600,
          sessionId: crypto.randomUUID()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const ct = response.headers.get("content-type") || "";
      const raw = await response.text();
      console.log("VIVIAN raw response (first 400):", raw.slice(0, 400));

      if (!ct.includes("application/json")) {
        throw new Error(`Unexpected content-type: ${ct}`);
      }

      const json = JSON.parse(raw);
      const text = extractVivianText(json);
      
      if (!text) {
        console.warn("No text extracted; JSON shape:", json);
        throw new Error("No text in Vivian response");
      }
      
      return text;
    } catch (error) {
      console.error('VivianChatService error:', error);
      return "I'm here to help you with any questions about our luxury collection.";
    }
  }

  static async getGreeting(pageContext: string): Promise<string> {
    return this.getChatResponse("Hello! I'd like to learn more about your products.", pageContext);
  }

  static async getProductRecommendation(pageContext: string): Promise<string> {
    return this.getChatResponse("Can you recommend something for me based on this page?", pageContext);
  }
}