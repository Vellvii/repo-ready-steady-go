import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MailingListRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: MailingListRequest = await req.json();

    console.log("Processing mailing list signup for:", email);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Add to Resend audience (you'll need to create an audience in Resend dashboard)
    // For now, we'll send a confirmation email
    const emailResponse = await resend.emails.send({
      from: "Vellvii <noreply@vellvii.com>",
      to: [email],
      subject: "Welcome to Vellvii Mailing List",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Welcome to Vellvii!</h1>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Thank you for joining our mailing list. You'll be the first to know about our updates and releases.
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            We're excited to have you on board!
          </p>
          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            The Vellvii Team
          </p>
        </div>
      `,
    });

    // Also notify Stefan about the new signup
    await resend.emails.send({
      from: "Vellvii <noreply@vellvii.com>",
      to: ["stefan@vellvii.com"],
      subject: "New Mailing List Signup",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>New Mailing List Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        </div>
      `,
    });

    console.log("Mailing list signup successful:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Successfully joined mailing list" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in join-mailing-list function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to join mailing list" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
