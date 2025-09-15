import { normalizeLLMText } from "@/lib/utils";

export async function sendVivianMessage(message: string): Promise<string> {
  try {
    const res = await fetch(
      "https://mawaqjqifmvijolucrlp.supabase.co/functions/v1/vivian-chat",
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
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