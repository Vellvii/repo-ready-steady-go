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
      subject: "Welcome to Vellvii",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Vellvii</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #FAF3E0 0%, #FFF 100%);">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); overflow: hidden;">
                  <!-- Header with gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #E9967A 0%, #FF7F50 100%); padding: 48px 40px; text-align: center;">
                      <img src="https://mawaqjqifmvijolucrlp.supabase.co/storage/v1/object/public/chat-images/Vellvii-full-logo-transparent.png" alt="Vellvii" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 48px 40px;">
                      <h1 style="color: #2C2C2C; font-size: 32px; font-weight: 600; margin: 0 0 24px 0; text-align: center; font-family: Georgia, serif;">Welcome to Vellvii</h1>
                      <div style="height: 2px; width: 60px; background: linear-gradient(90deg, #E9967A, #FF7F50); margin: 0 auto 32px; border-radius: 2px;"></div>
                      <p style="color: #4A4A4A; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0; text-align: center;">
                        Thank you for joining our exclusive mailing list. You'll be the first to discover our latest innovations in luxury wellness.
                      </p>
                      <p style="color: #4A4A4A; font-size: 16px; line-height: 1.7; margin: 0 0 32px 0; text-align: center;">
                        We're thrilled to have you on this journey with us.
                      </p>
                      <!-- CTA Button -->
                      <table role="presentation" style="margin: 0 auto;">
                        <tr>
                          <td style="border-radius: 8px; background: linear-gradient(135deg, #E9967A 0%, #FF7F50 100%); padding: 0;">
                            <a href="https://vellvii.com" style="display: inline-block; padding: 14px 32px; color: #FFFFFF; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                              Explore Vellvii
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background: #FAF3E0; padding: 32px 40px; text-align: center; border-top: 1px solid #E9E9E9;">
                      <p style="color: #8A8A8A; font-size: 14px; line-height: 1.6; margin: 0 0 8px 0; font-style: italic;">
                        Elevating intimate wellness through innovation
                      </p>
                      <p style="color: #8A8A8A; font-size: 14px; line-height: 1.6; margin: 0;">
                        Best regards,<br>
                        <strong style="color: #E9967A;">The Vellvii Team</strong>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // Also notify Stefan about the new signup
    await resend.emails.send({
      from: "Vellvii <noreply@vellvii.com>",
      to: ["stefan@vellvii.com"],
      subject: "New Mailing List Signup",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #2C2C2C; margin-bottom: 24px; font-size: 24px; font-weight: 600;">New Mailing List Signup 🎉</h2>
            <div style="background: #FAF3E0; border-left: 4px solid #E9967A; padding: 16px; border-radius: 4px; margin-bottom: 16px;">
              <p style="margin: 0 0 8px 0; color: #2C2C2C;"><strong style="color: #E9967A;">Email:</strong> ${email}</p>
              <p style="margin: 0; color: #666; font-size: 14px;"><strong>Time:</strong> ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
            </div>
          </div>
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
