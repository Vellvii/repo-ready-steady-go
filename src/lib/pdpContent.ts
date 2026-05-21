/**
 * Per-PDP content map for the five canonical Vellvii products.
 *
 * RULE: Only confirmed data lives here. Unknown spec rows are omitted entirely
 * (no placeholder/speculative values). Fallbacks below are used when a product
 * has no product-specific entry yet.
 */

export type CanonicalHandle =
  | "vellvii-dox"
  | "vellvii-lux"
  | "vellvii-g-vibe"
  | "vellvii-evolve"
  | "vellvii-pulse";

export const CANONICAL_HANDLES: CanonicalHandle[] = [
  "vellvii-dox",
  "vellvii-lux",
  "vellvii-g-vibe",
  "vellvii-evolve",
  "vellvii-pulse",
];

export interface KeyBenefit {
  /** Lucide icon name as a string - resolved in the component */
  icon: "ShieldCheck" | "Sparkles" | "Lock" | "Heart" | "Gem" | "Leaf" | "Wand2" | "Package";
  label: string;
  copy: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DockingCard {
  title: string;
  subtitle: string;
  copy: string;
}

export interface DockingInfo {
  heading: string;
  intro: string;
  vds: DockingCard;
  dds: DockingCard;
}

export interface PdpContent {
  /** Short premium one-liner shown above benefits */
  tagline?: string;
  keyBenefits?: KeyBenefit[];
  /** Only confirmed spec rows. Omit unknowns. */
  productDetails?: SpecRow[];
  /** Product-specific care - falls back to FALLBACK_CARE if undefined */
  careStorage?: string[];
  /** Product-specific FAQs - falls back to FALLBACK_FAQS if undefined */
  faqs?: FaqItem[];
  /** DOX-only: docking system (VDS / DDS) section content */
  docking?: DockingInfo;
  /** Toys that work with the VDS suction mount atop the DOX */
  doxCompatible?: boolean;
  /** Lux-only: subtle related-storage note linking to DOX */
  relatedStorageNote?: { copy: string; href: string; label: string };
}

/** Shared docking system content - reused by DOX PDP and the collection page. */
export const DOCKING_INFO: DockingInfo = {
  heading: "Designed Around the Vellvii Docking System",
  intro:
    "The VDS and DDS are external suction-base mounting stations that sit atop the Vellvii DOX, turning the DOX itself into a refined stand for compatible suction-base pieces. Inside, the DOX stays open and velvet-lined, with a movable velvet-lined tray for smaller items.",
  vds: {
    title: "VDS",
    subtitle: "Vellvii Docking Station",
    copy: "The VDS is a suction-base mounting station that sits atop the DOX, designed to hold compatible Vellvii products with suction bases - including the Vellvii G-Vibe, Evolve, and Pulse - so the DOX itself becomes the mount.",
  },
  dds: {
    title: "DDS",
    subtitle: "Dildo Docking Station",
    copy: "The DDS is a round suction-base mounting station that sits atop the DOX, supporting compatible suction-base products up to 90mm (approximately 3.5 inches) in diameter.",
  },
};

export const DOX_COMPATIBLE_HANDLES: CanonicalHandle[] = [
  "vellvii-dox",
  "vellvii-g-vibe",
  "vellvii-evolve",
  "vellvii-pulse",
];

/** PDP -> related collection chips. Subtle internal links per canonical handle. */
export const PDP_RELATED_COLLECTIONS: Record<CanonicalHandle, { label: string; href: string }[]> = {
  "vellvii-dox": [
    { label: "Bedroom Storage", href: "/collections/bedroom-storage" },
    { label: "DOX-Compatible Products", href: "/collections/dox-compatible-products" },
  ],
  "vellvii-lux": [
    { label: "Portable Storage", href: "/collections/portable-storage" },
    { label: "Discreet Storage", href: "/collections/discreet-storage" },
  ],
  "vellvii-g-vibe": [
    { label: "DOX-Compatible Products", href: "/collections/dox-compatible-products" },
    { label: "Products for Couples", href: "/collections/products-for-couples" },
  ],
  "vellvii-evolve": [
    { label: "DOX-Compatible Products", href: "/collections/dox-compatible-products" },
    { label: "Products for Couples", href: "/collections/products-for-couples" },
  ],
  "vellvii-pulse": [
    { label: "DOX-Compatible Products", href: "/collections/dox-compatible-products" },
    { label: "Products for Couples", href: "/collections/products-for-couples" },
  ],
};

export const getRelatedCollections = (handle: string | undefined) => {
  if (!handle) return [];
  return PDP_RELATED_COLLECTIONS[handle as CanonicalHandle] ?? [];
};

/** Safe, non-promissory fallback FAQs. */
export const FALLBACK_FAQS: FaqItem[] = [
  {
    question: "What is this product designed for?",
    answer:
      "Each Vellvii product is part of the Pleasure Collection - a refined ecosystem designed for modern couples and individuals who value discreet design and premium experience.",
  },
  {
    question: "How should I care for this product?",
    answer:
      "Follow the care instructions included with your product. Store in a clean, dry place and keep away from extreme heat and direct sunlight.",
  },
  {
    question: "Where can I find warranty information?",
    answer:
      "Full warranty details, registration, and coverage terms are available on our warranty page at /warranty.",
  },
  {
    question: "How do I choose the right Vellvii product?",
    answer:
      "Browse the full Pleasure Collection on the shop page to compare products and find the right fit for your space and lifestyle.",
  },
  {
    question: "Where can I get support?",
    answer:
      "Reach out to the Vellvii team through the contact details on our site - we are always available to help.",
  },
];

/** Safe, non-promissory fallback Care & Storage guidance. */
export const FALLBACK_CARE: string[] = [
  "Follow the care instructions included with your product.",
  "Store in a clean, dry place.",
  "Keep away from extreme heat and direct sunlight.",
  "Use only compatible accessories and storage solutions.",
  "Visit /warranty for coverage details.",
];

export const PDP_CONTENT: Record<CanonicalHandle, PdpContent> = {
  "vellvii-dox": {
    tagline:
      "A larger, sturdier storage system designed for discreet bedroom integration.",
    keyBenefits: [
      { icon: "Package", label: "Velvet-lined interior", copy: "Fully velvet-lined inside, with a movable velvet-lined tray that helps keep smaller pieces organized and in place." },
      { icon: "Lock", label: "Biometric fingerprint lock", copy: "Biometric access for fast, private entry, with no keys or codes to keep track of." },
      { icon: "Sparkles", label: "VDS and DDS mounts on top", copy: "The VDS and DDS sit atop the DOX as suction-base mounting stations, turning the DOX itself into a refined stand." },
      { icon: "Gem", label: "Integrated internal charging", copy: "3 internal USB-A charging ports powered through a single external USB-C input - so devices stay organized and ready inside the DOX." },
    ],
    productDetails: [
      { label: "Exterior", value: "Faux leather with rose-gold accents" },
      { label: "Interior", value: "Velvet-lined, with a movable velvet-lined tray for smaller items" },
      { label: "Security", value: "Biometric fingerprint lock" },
      { label: "Charging", value: "3 internal USB-A charging ports powered by an external USB-C input" },
      { label: "Top Mounts", value: "VDS and DDS suction-base mounting stations" },
    ],
    docking: DOCKING_INFO,
    faqs: [
      { question: "Is Vellvii DOX a sex toy lock box?", answer: "Yes. Vellvii DOX is a refined biometric lock box designed as discreet sex toy storage and a quiet bedroom anchor for the Vellvii Pleasure Collection." },
      { question: "Is Vellvii DOX a biometric lock box?", answer: "Yes. The DOX uses biometric fingerprint access, designed for fast, private entry without keys or codes." },
      { question: "What makes DOX different from a standard sex toy storage box?", answer: "DOX is designed as a storage and docking system rather than a basic box. It pairs a velvet-lined interior with a movable tray and the top-mounted VDS and DDS suction stations - so the DOX itself becomes a refined stand for compatible Vellvii pieces." },
      { question: "How does biometric access support private storage?", answer: "Biometric access keeps the DOX private by tying entry to a registered fingerprint, so personal storage stays discreet without relying on keys, codes, or visible locks." },
      { question: "Does Vellvii DOX include charging ports?", answer: "Yes. Vellvii DOX includes 3 internal USB-A charging ports powered through an external USB-C input." },
      { question: "What materials are used on Vellvii DOX?", answer: "Vellvii DOX uses a faux leather exterior with a velvet interior." },
      { question: "Where can I find warranty information?", answer: "Full warranty terms and registration details are available at /warranty." },
    ],
  },
  "vellvii-lux": {
    tagline:
      "A portable fingerprint-lock storage case designed for refined discretion at home or on the move.",
    keyBenefits: [
      { icon: "Package", label: "Portable discretion", copy: "A compact storage companion designed for travel and everyday privacy." },
      { icon: "Lock", label: "Fingerprint access", copy: "Secured with biometric access for a more personal storage experience." },
      { icon: "Gem", label: "Genuine leather case", copy: "Genuine leather exterior with a velvet-lined interior - a refined, toiletries-style silhouette." },
      { icon: "Sparkles", label: "Integrated internal charging", copy: "2 internal USB-A charging ports powered through a single external USB-C input - keep devices ready inside the case." },
    ],
    productDetails: [
      { label: "Exterior", value: "Genuine leather" },
      { label: "Interior", value: "Velvet-lined" },
      { label: "Format", value: "Portable storage case, sized like a refined toiletries bag" },
      { label: "Security", value: "Biometric fingerprint lock" },
      { label: "Charging", value: "2 internal USB-A charging ports powered by an external USB-C input" },
    ],
    relatedStorageNote: {
      copy: "Looking for a larger bedroom storage system? Explore the Vellvii DOX.",
      href: "/products/vellvii-dox",
      label: "Explore Vellvii DOX",
    },
    faqs: [
      { question: "Is Vellvii Lux a portable sex toy bag?", answer: "Yes. Vellvii Lux is a portable fingerprint-lock storage case designed for discreet sex toy storage at home and on the move - a refined alternative to a standard sex toy bag." },
      { question: "Does Lux work as a travel-friendly sex toy storage case?", answer: "Yes. Lux is designed as a travel-friendly sex toy storage case, sized like a refined toiletries-style bag and secured with biometric access." },
      { question: "Is Vellvii Lux a portable biometric storage case?", answer: "Yes. Lux is a portable biometric storage case - a compact, fingerprint-lock companion built for everyday personal storage and travel." },
      { question: "How is the Lux different from the Vellvii DOX?", answer: "Vellvii Lux is the more portable storage companion, designed with the feel of a refined toiletries-style case and secured with fingerprint access. Vellvii DOX is the larger, sturdier storage system, designed as a more substantial piece for the bedroom." },
      { question: "How should I care for Vellvii Lux?", answer: "Follow the care instructions included with your product, store the case in a clean, dry place, and avoid extreme heat, direct sunlight, and unnecessary exposure. If you are unsure, contact Vellvii support." },
      { question: "When does the Vellvii Lux ship?", answer: "Pre-orders ship by the end of June 2026. Reserve now to secure your unit from the current first-run offer." },
      { question: "Is the Vellvii Nova included with Lux?", answer: "The complimentary Vellvii Nova is included with the current Lux first-run offer. Future Lux runs are planned, but the Nova gift will not be included after this first run." },
      { question: "What is the Vellvii Lux warranty?", answer: "All Vellvii products are covered by our authorized retailer warranty when registered within 7 days of receipt. Repair or replacement only - no refunds on final sales." },
      { question: "Does Vellvii Lux include charging ports?", answer: "Yes. Vellvii Lux includes 2 internal USB-A charging ports powered through an external USB-C input." },
      { question: "What materials are used on Vellvii Lux?", answer: "Vellvii Lux uses a genuine leather exterior with a velvet interior." },
      { question: "Where can I find warranty information?", answer: "Full warranty terms and registration details are available at /warranty." },
    ],
  },
  "vellvii-g-vibe": {
    tagline: "A refined addition to the Vellvii Pleasure Collection.",
    keyBenefits: [
      { icon: "Heart", label: "Designed for modern couples", copy: "Considered ergonomics for shared, intentional moments." },
      { icon: "Sparkles", label: "Premium experience", copy: "A refined object you will actually want to keep on display." },
      { icon: "ShieldCheck", label: "Considered materials", copy: "Selected for refinement and a premium feel." },
    ],
    doxCompatible: true,
    productDetails: [
      { label: "DOX Compatibility", value: "Compatible with the VDS suction mount that sits atop the Vellvii DOX" },
    ],
  },
  "vellvii-evolve": {
    tagline: "Discreet design, refined for everyday intimacy.",
    keyBenefits: [
      { icon: "Heart", label: "Designed for modern couples", copy: "An object built around connection, not novelty." },
      { icon: "Sparkles", label: "Premium experience", copy: "Quiet luxury in every detail." },
      { icon: "ShieldCheck", label: "Considered materials", copy: "Selected for refinement and a premium feel." },
    ],
    doxCompatible: true,
    productDetails: [
      { label: "DOX Compatibility", value: "Compatible with the VDS suction mount that sits atop the Vellvii DOX" },
    ],
  },
  "vellvii-pulse": {
    tagline: "Part of the Vellvii Pleasure Collection - designed with intention.",
    keyBenefits: [
      { icon: "Sparkles", label: "Premium experience", copy: "A considered object with a refined silhouette." },
      { icon: "Heart", label: "Designed for modern couples", copy: "Built around intimacy and shared discretion." },
      { icon: "ShieldCheck", label: "Considered materials", copy: "Selected for refinement and a premium feel." },
    ],
    doxCompatible: true,
    productDetails: [
      { label: "DOX Compatibility", value: "Compatible with the VDS suction mount that sits atop the Vellvii DOX" },
    ],
  },
};

export const getPdpContent = (handle: string | undefined): PdpContent => {
  if (!handle) return {};
  return PDP_CONTENT[handle as CanonicalHandle] ?? {};
};
