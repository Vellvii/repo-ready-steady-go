import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MailingListRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  gender: 'male' | 'female';
  country: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      countryCode, 
      gender, 
      country 
    }: MailingListRequest = await req.json();

    console.log("Processing mailing list signup for:", email);

    // Validate all required fields
    if (!firstName || !lastName || !email || !phone || !countryCode || !gender || !country) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate phone number (10-15 digits)
    if (phone.length < 10 || phone.length > 15 || !/^\d+$/.test(phone)) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate gender
    if (gender !== 'male' && gender !== 'female') {
      return new Response(
        JSON.stringify({ error: "Invalid gender" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert into database
    const { error: dbError } = await supabase
      .from('mailing_list_signups')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        country_code: countryCode,
        gender: gender,
        country: country,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      if (dbError.code === '23505') { // Unique constraint violation
        return new Response(
          JSON.stringify({ error: "This email is already registered" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      throw dbError;
    }

    // Send personalized welcome email to user
    const emailResponse = await resend.emails.send({
      from: "Vellvii <noreply@vellvii.com>",
      to: [email],
      subject: `Welcome to Vellvii, ${firstName}!`,
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
                    <td style="background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%); padding: 48px 40px; text-align: center;">
                      <img src="https://mawaqjqifmvijolucrlp.supabase.co/storage/v1/object/public/email-assets/Vellvii-full-logo-transparent.png" alt="Vellvii" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 48px 40px;">
                      <h1 style="color: #2C2C2C; font-size: 32px; font-weight: 600; margin: 0 0 16px 0; text-align: center; font-family: Georgia, serif;">Welcome, ${firstName}!</h1>
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
                      <!-- Support Section -->
                      <div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #E9E9E9;">
                        <p style="color: #6A6A6A; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0; text-align: center;">
                          Have questions? We're here to help.
                        </p>
                        <p style="text-align: center; margin: 0;">
                          <a href="mailto:support@vellvii.com" style="color: #E9967A; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;">
                            <span style="display: inline-block; width: 20px; height: 20px; line-height: 20px; font-size: 16px;">✉️</span>
                            support@vellvii.com
                          </a>
                        </p>
                      </div>
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

    // Notify Stefan about the new signup with all demographic data
    await resend.emails.send({
      from: "Vellvii <noreply@vellvii.com>",
      to: ["stefan@vellvii.com"],
      subject: `New Signup: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
          <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #2C2C2C; margin-bottom: 24px; font-size: 24px; font-weight: 600;">New Mailing List Signup 🎉</h2>
            <div style="background: #FAF3E0; border-left: 4px solid #E9967A; padding: 20px; border-radius: 4px; margin-bottom: 16px;">
              <p style="margin: 0 0 12px 0; color: #2C2C2C;"><strong style="color: #E9967A;">Name:</strong> ${firstName} ${lastName}</p>
              <p style="margin: 0 0 12px 0; color: #2C2C2C;"><strong style="color: #E9967A;">Email:</strong> ${email}</p>
              <p style="margin: 0 0 12px 0; color: #2C2C2C;"><strong style="color: #E9967A;">Phone:</strong> ${countryCode} ${phone}</p>
              <p style="margin: 0 0 12px 0; color: #2C2C2C;"><strong style="color: #E9967A;">Gender:</strong> ${gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
              <p style="margin: 0 0 12px 0; color: #2C2C2C;"><strong style="color: #E9967A;">Country:</strong> ${country}</p>
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
