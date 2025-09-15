import { normalizeLLMText } from "@/lib/utils";

interface N8nRequest {
  userMessage?: string;
  pageContext: string;
  requestType: 'chat' | 'recommendation' | 'greeting';
}

interface N8nResponse {
  message: string;
  error?: string;
}

const N8N_WEBHOOK_URL = 'https://dylumaro.app.n8n.cloud/webhook/03c8b0e1-c9df-459e-b9f6-49b57156af28';

export class N8nService {
  static async sendRequest(data: N8nRequest): Promise<string> {
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: N8nResponse = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      const message = result.message || "I'm here to help you with any questions about our luxury collection.";
      return normalizeLLMText(message);
    } catch (error) {
      console.error('N8n service error:', error);
      // Fallback responses based on request type
      let fallbackMessage: string;
      if (data.requestType === 'greeting') {
        fallbackMessage = "Hello! I'm Vivian, and I'm here to help you discover your perfect match.";
      } else if (data.requestType === 'recommendation') {
        fallbackMessage = "This product is beautifully crafted and perfect for exploring new experiences with comfort and elegance.";
      } else {
        fallbackMessage = "I'm here to help you with any questions about our luxury collection. Please feel free to ask anything!";
      }
      return normalizeLLMText(fallbackMessage);
    }
  }

  static async getChatResponse(userMessage: string, pageContext: string): Promise<string> {
    return this.sendRequest({
      userMessage,
      pageContext,
      requestType: 'chat'
    });
  }

  static async getProductRecommendation(pageContext: string): Promise<string> {
    return this.sendRequest({
      pageContext,
      requestType: 'recommendation'
    });
  }

  static async getGreeting(pageContext: string): Promise<string> {
    return this.sendRequest({
      pageContext,
      requestType: 'greeting'
    });
  }
}