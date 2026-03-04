import { supabase } from "@/integrations/supabase/client";

export const trackKickstarterClick = (buttonLabel?: string) => {
  // Fire-and-forget — don't block the user's navigation
  supabase
    .from("kickstarter_clicks" as any)
    .insert({
      page: window.location.pathname,
      button_label: buttonLabel || "unknown",
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
    })
    .then(({ error }) => {
      if (error) console.warn("Click tracking failed:", error.message);
    });
};
