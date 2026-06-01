/**
 * Postbuild: write per-route static HTML files into dist/ so non-JS crawlers
 * (Semrush Site Audit, LinkedIn, Slack, Facebook, AI crawlers without JS)
 * see unique title / description / canonical / og:* per route.
 *
 * Each output clones dist/index.html with the head tags rewritten.
 * SPA hydration still takes over on load, so user behavior is unchanged.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const SITE_URL = "https://vellvii.com";
const DIST = resolve("dist");
const TEMPLATE_PATH = resolve(DIST, "index.html");

interface RouteSeo {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
}

const routes: RouteSeo[] = [
  // Home and primary
  { path: "/", title: "Vellvii | Luxury Biometric Sex Toy Storage & Intimate Wellness", description: "Vellvii designs luxury biometric sex toy storage with fingerprint-lock security, genuine leather, and velvet-lined interiors. Discreet. Refined. Built for those who know the difference." },
  { path: "/showcase", title: "Vellvii | Luxury Wellness & Intimate Storage", description: "Discover Vellvii - luxury wellness products and the DOX docking station featuring biometric security, integrated charging, and premium design. The Art of 'O'." },
  { path: "/landing", title: "Vellvii | Luxury Intimate Wellness Products", description: "Vellvii - luxury intimate wellness, designed for modern couples who value elegance, discretion, and premium design." },
  { path: "/shop", title: "Shop Vellvii | Luxury Intimate Wellness Collection", description: "Explore the Vellvii collection, including DOX, Lux, G-Vibe, Evolve, and Pulse. Premium intimate wellness products designed with elegance and discretion." },

  // Collections
  { path: "/collections/dox-compatible-products", title: "DOX-Compatible Products | Vellvii", description: "DOX-compatible storage system - explore Vellvii products designed to work with the VDS and DDS suction-base mounting stations atop the Vellvii DOX." },
  { path: "/collections/pleasure-collection", title: "Luxury Intimate Wellness Collection - Vibrators & Storage | Vellvii", description: "The Vellvii Pleasure Collection - refined products and discreet sex toy storage designed for modern couples and a premium private experience." },
  { path: "/collections/discreet-storage", title: "Discreet Sex Toy Storage | Biometric Intimate Storage Cases - Vellvii", description: "Explore Vellvii's range of discreet biometric sex toy storage - leather cases, fingerprint-lock vaults, and portable intimate storage designed for refined living." },
  { path: "/collections/portable-storage", title: "Portable Sex Toy Storage | Vellvii Lux", description: "Portable sex toy storage by Vellvii Lux - a refined fingerprint-lock case that doubles as a discreet sex toy bag for travel and everyday privacy." },
  { path: "/collections/bedroom-storage", title: "Bedroom Sex Toy Storage | Vellvii DOX", description: "Bedroom sex toy storage by Vellvii DOX - a refined sex toy storage box and adult toy storage hub built around the VDS and DDS docking system." },
  { path: "/collections/products-for-couples", title: "Sex Toy Storage for Couples | Vellvii Pleasure Collection", description: "Refined sex toy storage for couples - the Vellvii Pleasure Collection brings together DOX, Lux, and DOX-compatible products designed for shared discretion." },

  // Prelaunch pages
  { path: "/prelaunch", title: "Pre-Order Luxury Pleasure Collection Storage | Vellvii Dox", description: "Reserve the Vellvii Dox - premium docking station with fingerprint lock, charging dock, and designer storage. Exclusive prelaunch access." },
  { path: "/Vellvii-Lux", title: "Luxury Pleasure Storage System | Vellvii Lux", description: "Discover the Vellvii Lux - premium adult storage furniture for the discerning collector. Designer intimacy storage with privacy-focused design." },

  // QR video landings
  { path: "/v/1", title: "Vellvii DOX | Biometric Lock Box Overview", description: "Watch the Vellvii DOX in motion - a biometric sex toy lock box and bedroom storage hub for the Vellvii Pleasure Collection." },
  { path: "/v/2", title: "Vellvii DOX | Velvet Interior Walkthrough", description: "Inside the Vellvii DOX - velvet-lined interior and movable velvet tray designed for discreet, considered storage." },
  { path: "/v/3", title: "Vellvii DOX | Internal USB-A Charging", description: "See how the Vellvii DOX organizes 3 internal USB-A charging ports powered by an external USB-C input for everyday care." },
  { path: "/v/4", title: "Vellvii DOX | VDS Docking Station in Use", description: "The Vellvii Docking Station (VDS) in action - a top-mounted suction station that turns the DOX into a refined stand for compatible Vellvii pieces." },
  { path: "/v/5", title: "Vellvii DOX | DDS Dildo Docking Station", description: "Inside the Dildo Docking Station (DDS) - a round top-mounted suction station that supports compatible suction-base pieces up to 90mm." },
  { path: "/v/6", title: "Vellvii Lux | Portable Fingerprint-Lock Case", description: "The Vellvii Lux - a portable fingerprint-lock storage case with a genuine leather exterior and velvet interior, refined for travel." },
  { path: "/v/7", title: "Vellvii G-Vibe | DOX-Compatible Piece", description: "A closer look at the Vellvii G-Vibe - designed to dock atop the Vellvii DOX through the VDS suction mount." },
  { path: "/v/8", title: "Vellvii Pleasure Collection | At a Glance", description: "A short look at the Vellvii Pleasure Collection - DOX, Lux, and the DOX-compatible pieces designed around quiet, refined intimate wellness." },

  // Legal & support
  { path: "/privacy-policy", title: "Privacy Policy | Vellvii", description: "Vellvii's privacy policy outlines how we collect, use, and protect your personal information." },
  { path: "/terms-of-service", title: "Terms of Service | Vellvii", description: "Read Vellvii's terms of service governing the use of our website and products." },
  { path: "/warranty", title: "Lifetime Warranty | Vellvii", description: "Vellvii offers a lifetime warranty on DOX and LUX luxury storage products. All sales are final with no refunds. Coverage includes manufacturing defects." },
  { path: "/warranty/register", title: "Register Your Warranty | Vellvii", description: "Register your Vellvii DOX or LUX product warranty. Required for warranty service." },
  { path: "/contact", title: "Contact Vellvii | Luxury Intimate Wellness", description: "Get in touch with the Vellvii team. Questions about orders, pre-orders, or the Vellvii DOX waitlist - we are here." },
  { path: "/socials", title: "Follow Vellvii - Socials & Community", description: "Follow Vellvii across Instagram, TikTok, YouTube, Reddit and more. Behind the design, launch updates and the r/Vellvii community." },

  // Guides
  { path: "/guides", title: "Intimate Wellness Guides | Vellvii", description: "Guides on discreet storage, sex toy care, travel with personal items, and luxury intimate wellness - from the team at Vellvii." },
  { path: "/guides/lux-vs-dox", title: "Vellvii Lux vs DOX | Sex Toy Bag vs Biometric Lock Box", description: "Compare Vellvii Lux portable sex toy storage with the Vellvii DOX biometric sex toy lock box. See which refined storage piece fits your lifestyle." },
  { path: "/guides/how-the-vellvii-dox-docking-system-works", title: "How the Vellvii DOX Docking System Works | Sex Toy Storage with VDS & DDS", description: "How the Vellvii DOX storage and docking system works, including VDS for Vellvii G-Vibe, Evolve and Pulse, and DDS for compatible suction-base products up to 90mm." },
  { path: "/guides/discreet-storage-for-intimate-wellness-products", title: "Sex Toy Storage Guide | Discreet Storage by Vellvii", description: "A guide to discreet sex toy storage at home and on the move. Compare a portable sex toy bag with a refined biometric lock box for the bedroom." },
  { path: "/guides/portable-vs-bedroom-storage", title: "Portable Sex Toy Storage vs Bedroom Sex Toy Storage | Vellvii Guide", description: "Compare portable sex toy storage with bedroom-focused biometric lock box options to choose the right Vellvii piece for privacy and everyday use." },
  { path: "/guides/how-to-choose-premium-products-for-couples", title: "Sex Toy Storage for Couples: How to Choose Premium Products | Vellvii", description: "A refined guide for couples choosing premium products and discreet sex toy storage built around privacy, connection, and shared intention." },
  { path: "/guides/how-to-care-for-your-vellvii-products", title: "How to Care for Your Vellvii Products | Ownership & Support Guide", description: "Vellvii ownership and support guide covering general care habits, sex toy storage options, warranty registration, and how to contact support." },
  { path: "/guides/how-to-clean-and-store-sex-toys", title: "How to Clean and Store Sex Toys: A General Care Guide | Vellvii", description: "A general guide to how to clean and store sex toys: follow the included care instructions, keep things in a clean dry place, and use a refined sex toy storage option that fits your routine." },
  { path: "/guides/best-sex-toy-storage-box", title: "Best Sex Toy Storage Box | Vellvii Buyer's Guide", description: "What to look for in the best sex toy storage box: privacy, lockable design, size, organization, and portable vs bedroom storage. A Vellvii buyer's guide." },
  { path: "/guides/biometric-lock-box-for-sex-toys", title: "Biometric Lock Box for Sex Toy Storage | Vellvii", description: "A guide to the biometric lock box for sex toy storage. How fingerprint access supports a private sex toy lock box, with Vellvii DOX and Lux." },
  { path: "/guides/what-is-a-rose-toy", title: "What Is a Rose Toy? | Vellvii Guide", description: "A clear, refined guide to what a rose toy is, how it differs from traditional pleasure pieces, and how it fits alongside the Vellvii Pleasure Collection." },
  { path: "/available-now", title: "Available Now | Vellvii", description: "Vellvii products available to order today. Refined intimate wellness pieces ready for dispatch." },

  // Static product pages (mirrors Helmet titles so non-JS crawlers see them)
  { path: "/products/vellvii-dox", title: "Vellvii DOX | Biometric Sex Toy Storage Vault with Docking Stations", description: "The Vellvii DOX is a luxury biometric sex toy vault with integrated docking stations, fingerprint-lock security, and velvet-lined compartments. Join the waitlist." },
  { path: "/products/vellvii-lux", title: "Vellvii Lux | Biometric Sex Toy Storage Bag - Leather, Fingerprint Lock", description: "A genuine leather biometric sex toy storage bag with fingerprint lock and USB charging. Portable, discreet, and designed for those who refuse to compromise. Ships end of June." },
  { path: "/products/vellvii-g-vibe", title: "Vellvii G-Vibe | Luxury G-Spot Vibrator", description: "Vellvii G-Vibe - a luxury G-spot vibrator designed for the Vellvii ecosystem. Pairs with the Vellvii DOX biometric storage vault. Join the waitlist for availability." },
  { path: "/products/vellvii-evolve", title: "Vellvii Evolve | Luxury Wearable Vibrator", description: "Vellvii Evolve - a luxury wearable vibrator designed for the Vellvii ecosystem. Pairs with the Vellvii DOX biometric storage vault. Join the waitlist for availability." },
  { path: "/products/vellvii-pulse", title: "Vellvii Pulse | Luxury Couples Vibrator", description: "Vellvii Pulse - a luxury couples vibrator designed for the Vellvii ecosystem. Pairs with the Vellvii DOX biometric storage vault. Join the waitlist for availability." },
  { path: "/pages/the-lux", title: "Vellvii Lux | Biometric Leather Travel Case - Fingerprint Locked", description: "A genuine leather biometric travel case with fingerprint-lock security and USB charging. Discreet. Designed for those who value what they protect." },
];

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function rewriteHead(template: string, r: RouteSeo): string {
  const url = `${SITE_URL}${r.path}`;
  const title = esc(r.title);
  const desc = esc(r.description);
  const og = esc(r.ogImage || `${SITE_URL}/uploads/Vellvii-full-logo-transparent.png`);

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(/<meta\s+name="description"[^>]*>/, `<meta name="description" content="${desc}">`);
  html = html.replace(/<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${title}">`);
  html = html.replace(/<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${desc}">`);
  html = html.replace(/<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${url}">`);
  html = html.replace(/<meta\s+property="og:image"[^>]*>/, `<meta property="og:image" content="${og}">`);
  html = html.replace(/<meta\s+name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${title}">`);
  html = html.replace(/<meta\s+name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${desc}">`);
  html = html.replace(/<meta\s+name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${og}">`);
  // Strip any existing canonical/hreflang from the template, then inject the per-route ones.
  html = html.replace(/\s*<link\s+rel="canonical"[^>]*>/gi, "");
  html = html.replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>/gi, "");
  const linkTags = `    <link rel="canonical" href="${url}">\n    <link rel="alternate" hreflang="en" href="${url}">\n    <link rel="alternate" hreflang="x-default" href="${url}">\n`;
  html = html.replace(/<\/head>/, `${linkTags}</head>`);
  return html;
}

function run() {
  if (!existsSync(TEMPLATE_PATH)) {
    console.warn(`[prerender-seo] dist/index.html not found - skipping (run after vite build).`);
    return;
  }
  const template = readFileSync(TEMPLATE_PATH, "utf8");
  let count = 0;
  for (const r of routes) {
    const html = rewriteHead(template, r);
    if (r.path === "/") {
      writeFileSync(TEMPLATE_PATH, html, "utf8");
    } else {
      const outDir = resolve(DIST, r.path.replace(/^\//, ""));
      mkdirSync(outDir, { recursive: true });
      writeFileSync(resolve(outDir, "index.html"), html, "utf8");
    }
    count++;
  }
  console.log(`[prerender-seo] wrote ${count} prerendered HTML files`);
}

run();
