import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NotifyRequest {
  email: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, source = "dox_video_landing" }: NotifyRequest = await req.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into database
    const { error: dbError } = await supabase
      .from("usa_launch_notifications")
      .insert({ email, source });

    if (dbError) {
      // Handle duplicate email gracefully
      if (dbError.code === "23505") {
        return new Response(
          JSON.stringify({ success: true, message: "You're already on the list!" }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      console.error("Database error:", dbError);
      throw new Error("Failed to save notification");
    }

    console.log("USA notification email saved:", email);

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: "Vellvii <noreply@vellvii.com>",
        to: [email],
        subject: "You're on the Vellvii USA Launch List! 🇺🇸",
        html: `
          <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #1a1a1a; color: #fff;">
            <img src="https://vellvii-site.lovable.app/uploads/Vellvii-full-logo-transparent.png" alt="Vellvii" style="height: 40px; margin-bottom: 30px;" />
            <h1 style="font-size: 28px; color: #d4a574; margin-bottom: 20px;">You're on the List!</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #ccc; margin-bottom: 20px;">
              Thank you for your interest in the Vellvii DOX. We'll notify you as soon as it becomes available in the USA.
            </p>
            <p style="font-size: 14px; color: #888;">
              With elegance,<br/>
              The Vellvii Team
            </p>
          </div>
        `,
      });
      console.log("Confirmation email sent to:", email);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't fail the request if email fails
    }

    // Notify Stefan of new signup
    try {
      await resend.emails.send({
        from: "Vellvii Notifications <noreply@vellvii.com>",
        to: ["hello@vellvii.com"],
        subject: "🇺🇸 New USA Launch Notification Signup",
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>New USA Launch Interest</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source:</strong> ${source}</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          </div>
        `,
      });
      console.log("Admin notification sent for:", email);
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError);
      // Don't fail the request if email fails
    }

    return new Response(
      JSON.stringify({ success: true, message: "You've been added to the USA launch list!" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in usa-launch-notify:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Something went wrong" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
