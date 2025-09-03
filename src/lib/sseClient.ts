async function postSSEWithRetry<T extends object>(
  url: string,
  body: T,
  onToken: (t: string) => void,
  onDone: (final: string) => void,
  retryCount: number = 0,
  maxRetries: number = 3
): Promise<void> {
  console.log('SSE request:', { url, body, retryCount });
  
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log('SSE response status:', resp.status, resp.statusText);

    // Handle rate limiting with exponential backoff
    if (resp.status === 429 && retryCount < maxRetries) {
      const errorText = await resp.text();
      console.warn(`Rate limited (429), retrying in ${Math.pow(2, retryCount)} seconds...`, errorText);
      
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
      return postSSEWithRetry(url, body, onToken, onDone, retryCount + 1, maxRetries);
    }

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('SSE error response:', errorText);
      
      if (resp.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
      }
      
      throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
    }

  // fallback: no stream
  const ct = resp.headers.get("content-type") || "";
  console.log('Response content-type:', ct);
  
  if (!ct.includes("text/event-stream")) {
    const data = await resp.json().catch(() => ({}));
    console.log('Non-streaming response:', data);
    const text =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.delta?.content ??
      data?.output_text ?? 
      data?.message ??
      data?.content ?? "";
    if (text) onToken(text);
    onDone(text || "");
    return;
  }

  const reader = resp.body!.getReader();
  const decoder = new TextDecoder("utf-8");
  let buf = "", all = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let cut;
    while ((cut = buf.indexOf("\n\n")) !== -1) {
      const frame = buf.slice(0, cut).trim();
      buf = buf.slice(cut + 2);

      if (!frame.startsWith("data:")) continue;
      const data = frame.slice(5).trim();
      if (data === "[DONE]") { onDone(all); return; }

      try {
        const json = JSON.parse(data);
        const tok =
          json?.choices?.[0]?.delta?.content ??
          json?.choices?.[0]?.message?.content ??
          json?.output_text ??
          json?.message ??
          json?.content ?? "";
        if (tok) { all += tok; onToken(tok); }
      } catch { /* ignore keep-alives */ }
    }
  }
  onDone(all);
  } catch (error) {
    console.error('SSE stream error:', error);
    throw error;
  }
}

export async function postSSE<T extends object>(
  url: string,
  body: T,
  onToken: (t: string) => void,
  onDone: (final: string) => void
): Promise<void> {
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const ct = resp.headers.get("content-type") || "";
  if (!ct.includes("text/event-stream")) {
    const data = await resp.json().catch(() => ({}));
    const text = data?.choices?.[0]?.message?.content ?? data?.output_text ?? "";
    onToken(text);
    onDone(text);
    return;
  }

  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "", final = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop()!;
    for (const part of parts) {
      if (!part.startsWith("data: ")) continue;
      const data = part.slice(6);
      if (data === "[DONE]") {
        onDone(final.trim());
        return;
      }
      try {
        const json = JSON.parse(data);
        const delta = json.choices?.[0]?.delta?.content;
        if (delta) {
          final += delta;
          onToken(delta);
        }
      } catch {}
    }
  }
}