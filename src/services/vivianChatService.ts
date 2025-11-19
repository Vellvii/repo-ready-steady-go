import { normalizeLLMText } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

export async function sendVivianMessage(messages: Message[], currentMessage: string): Promise<string> {
  try {
    // Transform messages to backend format
    const formattedMessages = messages.map(m => ({
      is_user: m.role === "user",
      text: m.content
    }));

    const res = await fetch(
      "https://mawaqjqifmvijolucrlp.supabase.co/functions/v1/vivian-chat",
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: formattedMessages }),
      }
    );

    if (!res.ok) {
      console.error(`Supabase function error: ${res.status}`);
      throw new Error(`Supabase error: ${res.status}`);
    }

    const data = await res.json();
    const reply = data.reply || "Vivien had trouble replying.";
    return normalizeLLMText(reply);
  } catch (err) {
    console.error("sendVivianMessage error:", err);
    return "Vivien is offline right now.";
  }
}