import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface WarrantyRegistrationRequest {
  registration_id: string;
  product_type: "dox" | "lux";
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  order_number: string;
  purchase_date: string;
  receipt_url: string;
  purchase_source: "shopify" | "retailer";
}

interface ShopifyOrder {
  id: number;
  name: string;
  email: string;
  created_at: string;
  line_items: Array<{
    title: string;
    product_id: number;
  }>;
}

interface ReceiptVerificationResult {
  is_valid: boolean;
  confidence: number;
  extracted_data: {
    vendor?: string;
    product_name?: string;
    date?: string;
    amount?: string;
  };
  flags: string[];
}

// Verify order against Shopify Admin API
async function verifyShopifyOrder(
  orderNumber: string, 
  customerEmail: string,
  productType: string
): Promise<{ verified: boolean; reason?: string; order?: ShopifyOrder }> {
  const shopifyAccessToken = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
  const shopifyStoreDomain = "vellvii-site-2h1iu.myshopify.com";
  
  if (!shopifyAccessToken) {
    console.warn("SHOPIFY_ACCESS_TOKEN not configured, skipping Shopify verification");
    return { verified: false, reason: "Shopify verification unavailable" };
  }

  try {
    // Clean up order number (remove # if present)
    const cleanOrderNumber = orderNumber.replace(/^#/, "").trim();
    
    // Search for order by name/number
    const searchUrl = `https://${shopifyStoreDomain}/admin/api/2025-01/orders.json?name=${encodeURIComponent(cleanOrderNumber)}&status=any`;
    
    console.log("Searching Shopify for order:", cleanOrderNumber);
    
    const response = await fetch(searchUrl, {
      headers: {
        "X-Shopify-Access-Token": shopifyAccessToken,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Shopify API error:", response.status, await response.text());
      return { verified: false, reason: "Failed to verify with Shopify" };
    }

    const data = await response.json();
    const orders: ShopifyOrder[] = data.orders || [];
    
    if (orders.length === 0) {
      // Try searching by order number directly
      const altSearchUrl = `https://${shopifyStoreDomain}/admin/api/2025-01/orders.json?status=any`;
      const altResponse = await fetch(altSearchUrl, {
        headers: {
          "X-Shopify-Access-Token": shopifyAccessToken,
          "Content-Type": "application/json",
        },
      });
      
      if (altResponse.ok) {
        const altData = await altResponse.json();
        const matchingOrder = (altData.orders || []).find((o: ShopifyOrder) => 
          o.name.replace(/^#/, "").toLowerCase() === cleanOrderNumber.toLowerCase() ||
          o.id.toString() === cleanOrderNumber
        );
        
        if (matchingOrder) {
          orders.push(matchingOrder);
        }
      }
    }
    
    if (orders.length === 0) {
      return { verified: false, reason: "Order not found in Shopify" };
    }

    const order = orders[0];
    
    // Verify email matches
    if (order.email.toLowerCase() !== customerEmail.toLowerCase()) {
      return { 
        verified: false, 
        reason: "Email does not match order",
        order 
      };
    }

    // Check if order contains the product type
    const productNames = order.line_items.map(item => item.title.toLowerCase());
    const hasProduct = productNames.some(name => 
      name.includes(productType.toLowerCase()) || 
      name.includes("vellvii")
    );

    if (!hasProduct) {
      console.log("Order found but product type mismatch. Products:", productNames);
      // Still allow but flag it
    }

    return { verified: true, order };
    
  } catch (error) {
    console.error("Error verifying Shopify order:", error);
    return { verified: false, reason: "Verification error occurred" };
  }
}

// Analyze receipt image using AI
async function analyzeReceipt(
  receiptUrl: string,
  supabaseUrl: string,
  supabaseServiceKey: string
): Promise<ReceiptVerificationResult> {
  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
  
  if (!lovableApiKey) {
    console.warn("LOVABLE_API_KEY not configured, skipping receipt analysis");
    return {
      is_valid: true,
      confidence: 0.5,
      extracted_data: {},
      flags: ["AI analysis unavailable"],
    };
  }

  try {
    // Get signed URL for the receipt
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from("warranty-receipts")
      .createSignedUrl(receiptUrl, 300); // 5 minute expiry

    if (signedUrlError || !signedUrlData?.signedUrl) {
      console.error("Failed to get signed URL for receipt:", signedUrlError);
      return {
        is_valid: true,
        confidence: 0.5,
        extracted_data: {},
        flags: ["Could not access receipt image"],
      };
    }

    const imageUrl = signedUrlData.signedUrl;
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a receipt verification assistant. Analyze the receipt/order confirmation image and extract key information. 
            
Determine if this appears to be a legitimate purchase receipt or order confirmation for a Vellvii product (DOX storage box or LUX travel bag).

Look for:
- Vendor/store name (should be Vellvii or an authorized retailer)
- Product name (DOX or LUX)
- Purchase date
- Price/amount
- Order number

Flag suspicious items like:
- Generic or stock images
- Digitally altered receipts
- Inconsistent formatting
- Missing key details
- Non-Vellvii products

Respond with a JSON object only, no other text:
{
  "is_valid": boolean,
  "confidence": number between 0 and 1,
  "extracted_data": {
    "vendor": "store name or null",
    "product_name": "product name or null",
    "date": "date string or null",
    "amount": "price/amount or null"
  },
  "flags": ["array of concerns if any"]
}`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please analyze this receipt/order confirmation image and verify if it appears legitimate:"
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      console.error("AI Gateway error:", response.status, await response.text());
      return {
        is_valid: true,
        confidence: 0.5,
        extracted_data: {},
        flags: ["AI analysis failed"],
      };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse JSON from response
    try {
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return {
          is_valid: result.is_valid ?? true,
          confidence: result.confidence ?? 0.5,
          extracted_data: result.extracted_data || {},
          flags: result.flags || [],
        };
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, content);
    }

    return {
      is_valid: true,
      confidence: 0.5,
      extracted_data: {},
      flags: ["Could not parse AI analysis"],
    };

  } catch (error) {
    console.error("Error analyzing receipt:", error);
    return {
      is_valid: true,
      confidence: 0.5,
      extracted_data: {},
      flags: ["Analysis error occurred"],
    };
  }
}

const generateCustomerEmail = (data: WarrantyRegistrationRequest): string => {
  const productName = data.product_type.toUpperCase();
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #141414; border-radius: 16px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <img src="https://mawaqjqifmvijolucrlp.supabase.co/storage/v1/object/public/email-assets/vellvii-logo.png" alt="Vellvii" width="120" style="display: inline-block;">
            </td>
          </tr>
          
          <!-- Success Icon -->
          <tr>
            <td style="padding: 20px 40px; text-align: center;">
              <div style="width: 80px; height: 80px; background-color: rgba(212, 175, 55, 0.15); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                <span style="font-size: 40px;">✓</span>
              </div>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td style="padding: 0 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; font-family: Georgia, 'Times New Roman', serif;">
                Warranty Registered
              </h1>
            </td>
          </tr>
          
          <!-- Registration ID Box -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <table role="presentation" width="100%" style="background-color: #1a1a1a; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #888888; font-size: 14px;">Your Registration ID</p>
                    <p style="margin: 0; color: #d4af37; font-size: 28px; font-weight: 700; font-family: 'Courier New', monospace; letter-spacing: 2px;">
                      ${data.registration_id}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Product Info -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="margin: 0 0 16px 0; color: #cccccc; font-size: 16px; line-height: 1.6; text-align: center;">
                Your <strong style="color: #ffffff;">${productName}</strong> is now covered by our lifetime warranty.
              </p>
            </td>
          </tr>
          
          <!-- What's Covered -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <table role="presentation" width="100%" style="background-color: #1a1a1a; border-radius: 12px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                      What's Covered
                    </h3>
                    <ul style="margin: 0; padding-left: 20px; color: #cccccc; font-size: 14px; line-height: 1.8;">
                      <li>Manufacturing defects</li>
                      <li>Electronic component failures</li>
                      <li>Mechanical malfunctions</li>
                      <li>Lock mechanism issues</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Important Note -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="margin: 0; color: #888888; font-size: 14px; line-height: 1.6; text-align: center;">
                <strong style="color: #d4af37;">Save this email</strong> — You'll need your Registration ID when contacting support for warranty claims.
              </p>
            </td>
          </tr>
          
          <!-- Contact Section -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table role="presentation" width="100%" style="border-top: 1px solid #333333;">
                <tr>
                  <td style="padding-top: 24px; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #888888; font-size: 14px;">Need to file a claim?</p>
                    <a href="mailto:warranties@vellvii.com" style="color: #d4af37; text-decoration: none; font-size: 16px; font-weight: 500;">
                      warranties@vellvii.com
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0a0a0a; text-align: center;">
              <p style="margin: 0; color: #666666; font-size: 12px;">
                © ${new Date().getFullYear()} Vellvii. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const generateAdminEmail = (
  data: WarrantyRegistrationRequest, 
  shopifyVerification: { verified: boolean; reason?: string },
  receiptAnalysis: ReceiptVerificationResult
): string => {
  const productName = data.product_type.toUpperCase();
  const supabaseProjectId = Deno.env.get("SUPABASE_URL")?.match(/https:\/\/(.+)\.supabase\.co/)?.[1] || "mawaqjqifmvijolucrlp";
  const receiptLink = `https://supabase.com/dashboard/project/${supabaseProjectId}/storage/buckets/warranty-receipts`;
  
  // Determine verification status
  const isFullyVerified = data.purchase_source === "shopify" && shopifyVerification.verified;
  const verificationBadge = isFullyVerified 
    ? '<span style="display: inline-block; padding: 4px 10px; background-color: #16a34a; color: #ffffff; border-radius: 4px; font-size: 12px; font-weight: 600;">✓ VERIFIED</span>'
    : data.purchase_source === "retailer"
    ? '<span style="display: inline-block; padding: 4px 10px; background-color: #f59e0b; color: #000000; border-radius: 4px; font-size: 12px; font-weight: 600;">RETAILER PURCHASE</span>'
    : '<span style="display: inline-block; padding: 4px 10px; background-color: #ef4444; color: #ffffff; border-radius: 4px; font-size: 12px; font-weight: 600;">⚠ NOT VERIFIED</span>';
  
  // Receipt analysis section
  const receiptFlags = receiptAnalysis.flags.length > 0 
    ? receiptAnalysis.flags.map(f => `<li style="color: #f59e0b;">${f}</li>`).join("")
    : '<li style="color: #16a34a;">No issues detected</li>';
  
  const extractedDataRows = Object.entries(receiptAnalysis.extracted_data)
    .filter(([_, value]) => value)
    .map(([key, value]) => `
      <tr>
        <td style="padding: 4px 0; color: #888888; font-size: 13px;">${key.charAt(0).toUpperCase() + key.slice(1)}</td>
        <td style="padding: 4px 0; text-align: right; color: #333333; font-size: 13px;">${value}</td>
      </tr>
    `).join("");
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 24px; background-color: #0a0a0a; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                🛡️ New Warranty Registration
              </h1>
            </td>
          </tr>
          
          <!-- Summary -->
          <tr>
            <td style="padding: 24px;">
              <table role="presentation" width="100%" style="background-color: #f8f8f8; border-radius: 8px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 4px 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Registration ID</p>
                    <p style="margin: 0; color: #000000; font-size: 20px; font-weight: 700; font-family: 'Courier New', monospace;">
                      ${data.registration_id}
                    </p>
                  </td>
                  <td style="padding: 16px; text-align: right;">
                    <span style="display: inline-block; padding: 6px 12px; background-color: ${data.product_type === 'dox' ? '#1a365d' : '#553c9a'}; color: #ffffff; border-radius: 6px; font-size: 14px; font-weight: 600;">
                      ${productName}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Verification Status -->
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <table role="presentation" width="100%" style="background-color: ${isFullyVerified ? '#f0fdf4' : data.purchase_source === 'retailer' ? '#fffbeb' : '#fef2f2'}; border-radius: 8px; border: 1px solid ${isFullyVerified ? '#bbf7d0' : data.purchase_source === 'retailer' ? '#fde68a' : '#fecaca'};">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 8px 0; color: #333333; font-size: 14px; font-weight: 600;">
                      Verification Status
                    </p>
                    <p style="margin: 0;">
                      ${verificationBadge}
                    </p>
                    ${!isFullyVerified && data.purchase_source === 'shopify' ? `<p style="margin: 8px 0 0 0; color: #666666; font-size: 13px;">${shopifyVerification.reason || 'Could not verify order'}</p>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Receipt Analysis -->
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <h3 style="margin: 0 0 12px 0; color: #333333; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                AI Receipt Analysis
              </h3>
              <table role="presentation" width="100%" style="background-color: #f8f8f8; border-radius: 8px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 8px 0; color: #666666; font-size: 13px;">
                      Confidence: <strong style="color: #333333;">${Math.round(receiptAnalysis.confidence * 100)}%</strong>
                    </p>
                    ${extractedDataRows ? `
                    <table role="presentation" width="100%" style="margin-bottom: 12px;">
                      ${extractedDataRows}
                    </table>
                    ` : ''}
                    <p style="margin: 0 0 4px 0; color: #666666; font-size: 12px; font-weight: 600;">Flags:</p>
                    <ul style="margin: 0; padding-left: 16px; font-size: 13px;">
                      ${receiptFlags}
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Customer Details -->
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <h3 style="margin: 0 0 16px 0; color: #333333; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Customer Details
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee;">
                    <span style="color: #888888; font-size: 14px;">Name</span>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; text-align: right;">
                    <span style="color: #333333; font-size: 14px; font-weight: 500;">${data.customer_name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee;">
                    <span style="color: #888888; font-size: 14px;">Email</span>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; text-align: right;">
                    <a href="mailto:${data.customer_email}" style="color: #0066cc; font-size: 14px; text-decoration: none;">${data.customer_email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee;">
                    <span style="color: #888888; font-size: 14px;">Phone</span>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; text-align: right;">
                    <span style="color: #333333; font-size: 14px;">${data.customer_phone || "Not provided"}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee;">
                    <span style="color: #888888; font-size: 14px;">Purchase Source</span>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; text-align: right;">
                    <span style="color: #333333; font-size: 14px; font-weight: 500;">${data.purchase_source === 'shopify' ? 'Vellvii.com (Shopify)' : 'Retail Partner'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Order Details -->
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <h3 style="margin: 0 0 16px 0; color: #333333; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Order Details
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee;">
                    <span style="color: #888888; font-size: 14px;">Order Number</span>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; text-align: right;">
                    <span style="color: #333333; font-size: 14px; font-weight: 500;">${data.order_number}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee;">
                    <span style="color: #888888; font-size: 14px;">Purchase Date</span>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; text-align: right;">
                    <span style="color: #333333; font-size: 14px;">${data.purchase_date}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee;">
                    <span style="color: #888888; font-size: 14px;">Receipt File</span>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; text-align: right;">
                    <span style="color: #333333; font-size: 14px; font-family: 'Courier New', monospace;">${data.receipt_url}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- View Receipt Button -->
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <a href="${receiptLink}" style="display: block; padding: 14px 24px; background-color: #0a0a0a; color: #ffffff; text-decoration: none; text-align: center; border-radius: 8px; font-size: 14px; font-weight: 500;">
                View Receipt in Storage →
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 16px 24px; background-color: #f8f8f8; text-align: center;">
              <p style="margin: 0; color: #888888; font-size: 12px;">
                Registered at ${new Date().toISOString()}
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const data: WarrantyRegistrationRequest = await req.json();
    
    // Default to shopify if not specified (backward compatibility)
    if (!data.purchase_source) {
      data.purchase_source = "shopify";
    }
    
    console.log("Received warranty registration request:", {
      registration_id: data.registration_id,
      product_type: data.product_type,
      customer_email: data.customer_email,
      purchase_source: data.purchase_source,
    });

    // Validate required fields
    if (!data.registration_id || !data.product_type || !data.customer_name || 
        !data.customer_email || !data.order_number || !data.purchase_date || !data.receipt_url) {
      throw new Error("Missing required fields");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Verify Shopify order if purchased from Shopify
    let shopifyVerification = { verified: false, reason: "Not applicable for retailer purchases" };
    if (data.purchase_source === "shopify") {
      console.log("Verifying Shopify order...");
      shopifyVerification = await verifyShopifyOrder(
        data.order_number,
        data.customer_email,
        data.product_type
      );
      console.log("Shopify verification result:", shopifyVerification);
      
      // For Shopify orders, if order is not found, reject the registration
      if (!shopifyVerification.verified) {
        return new Response(
          JSON.stringify({ 
            error: "Order verification failed",
            reason: shopifyVerification.reason,
            code: "ORDER_NOT_VERIFIED"
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
    }
    
    // Analyze receipt using AI
    console.log("Analyzing receipt...");
    const receiptAnalysis = await analyzeReceipt(
      data.receipt_url,
      supabaseUrl,
      supabaseServiceKey
    );
    console.log("Receipt analysis result:", receiptAnalysis);

    // Create Supabase client with service role for DB insert
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert registration record
    const { error: insertError } = await supabase
      .from("warranty_registrations")
      .insert({
        registration_id: data.registration_id,
        product_type: data.product_type,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone || null,
        order_number: data.order_number,
        purchase_date: data.purchase_date,
        receipt_url: data.receipt_url,
      });

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error("Failed to register warranty: " + insertError.message);
    }

    console.log("Warranty registration inserted successfully");

    // Send customer confirmation email
    const customerEmailResult = await resend.emails.send({
      from: "Vellvii <noreply@vellvii.com>",
      to: [data.customer_email],
      subject: "Your Vellvii Warranty is Registered ✓",
      html: generateCustomerEmail(data),
    });

    console.log("Customer email sent:", customerEmailResult);

    // Send admin notification email with verification details
    const adminEmailResult = await resend.emails.send({
      from: "Vellvii Warranty System <noreply@vellvii.com>",
      to: ["warranties@vellvii.com"],
      subject: `🛡️ New Warranty Registration - ${data.product_type.toUpperCase()} - ${data.customer_name}${!shopifyVerification.verified && data.purchase_source === 'shopify' ? ' ⚠️ UNVERIFIED' : ''}`,
      html: generateAdminEmail(data, shopifyVerification, receiptAnalysis),
    });

    console.log("Admin email sent:", adminEmailResult);

    return new Response(
      JSON.stringify({
        success: true,
        registration_id: data.registration_id,
        verification: {
          shopify: shopifyVerification,
          receipt: receiptAnalysis,
        },
        emails_sent: {
          customer: customerEmailResult,
          admin: adminEmailResult,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in warranty-register function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
