import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = "https://mawaqjqifmvijolucrlp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hd2FxanFpZm12aWpvbHVjcmxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NTYxMDUsImV4cCI6MjA2NzUzMjEwNX0.QrHerqd8iRD-RoBbZVAtkiSzE3DowV1m5O9mefnt1Gs";

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
          numCompletionTokens: 600,
          sessionId: crypto.randomUUID()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      if (response.headers.get('content-type')?.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        let fullResponse = '';
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;
                
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || '';
                  if (content) {
                    fullResponse += content;
                    onToken?.(content);
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
        }

        return fullResponse || "I'm here to help you with any questions about our luxury collection.";
      } else {
        // Handle non-streaming response
        const data = await response.json();
        if (data?.error) {
          console.error('API error response:', data);
          throw new Error(`API error: ${data.error}`);
        }
        return data?.message || "I'm here to help you with any questions about our luxury collection.";
      }
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