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
  /** Toys that fit the DOX through the VDS insert */
  doxCompatible?: boolean;
  /** Lux-only: subtle related-storage note linking to DOX */
  relatedStorageNote?: { copy: string; href: string; label: string };
}

/** Shared docking system content - reused by DOX PDP and the collection page. */
export const DOCKING_INFO: DockingInfo = {
  heading: "Designed Around the Vellvii Docking System",
  intro:
    "The Vellvii DOX is designed as the home of the Vellvii Pleasure Collection, with dedicated docking spaces that keep compatible products organized, discreet, and ready for storage.",
  vds: {
    title: "VDS",
    subtitle: "Vellvii Docking Station",
    copy: "The VDS is shaped specifically for current Vellvii products, allowing the Vellvii G-Vibe, Evolve, and Pulse to fit securely into the DOX ecosystem.",
  },
  dds: {
    title: "DDS",
    subtitle: "Dildo Docking Station",
    copy: "The DDS is a round docking insert designed for compatible suction-base products up to 90mm in diameter.",
  },
};

export const DOX_COMPATIBLE_HANDLES: CanonicalHandle[] = [
  "vellvii-dox",
  "vellvii-g-vibe",
  "vellvii-evolve",
  "vellvii-pulse",
];

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
      { icon: "Package", label: "Discreet bedroom integration", copy: "A refined form designed to sit naturally within a modern bedroom." },
      { icon: "ShieldCheck", label: "Larger storage presence", copy: "Built as a more substantial home for the Vellvii collection." },
      { icon: "Lock", label: "Refined organization", copy: "Designed to keep the collection calm, private, and intentional." },
      { icon: "Sparkles", label: "Premium experience", copy: "A fixed storage piece built around discretion and design." },
    ],
    docking: DOCKING_INFO,
  },
  "vellvii-lux": {
    tagline:
      "A portable fingerprint-lock storage case designed for refined discretion at home or on the move.",
    keyBenefits: [
      { icon: "Package", label: "Portable discretion", copy: "A compact storage companion designed for travel and everyday privacy." },
      { icon: "Lock", label: "Fingerprint access", copy: "Secured with biometric access for a more personal storage experience." },
      { icon: "Gem", label: "Refined case design", copy: "Inspired by premium toiletries-style storage with a clean, discreet silhouette." },
      { icon: "Sparkles", label: "Easy to keep close", copy: "Designed to fit naturally into daily routines without drawing attention." },
    ],
    productDetails: [
      { label: "Security", value: "Fingerprint lock" },
      { label: "Format", value: "Portable storage case" },
      { label: "Use Case", value: "Travel-friendly and everyday personal storage" },
    ],
    relatedStorageNote: {
      copy: "Looking for a larger bedroom storage system? Explore the Vellvii DOX.",
      href: "/products/vellvii-dox",
      label: "Explore Vellvii DOX",
    },
    faqs: [
      { question: "What is the Vellvii Lux?", answer: "Vellvii Lux is a portable fingerprint-lock storage case - a compact, discreet companion designed with the feel of a refined toiletries-style case for travel and everyday personal storage." },
      { question: "How is the Lux different from the Vellvii DOX?", answer: "Vellvii Lux is the more portable storage companion, designed with the feel of a refined toiletries-style case and secured with fingerprint access. Vellvii DOX is the larger, sturdier storage system, designed as a more substantial piece for the bedroom." },
      { question: "When does the Vellvii Lux ship?", answer: "Pre-orders ship the first week of June 2026. Reserve now to secure your unit from the current first-run offer." },
      { question: "Is the Vellvii Nova included with Lux?", answer: "The complimentary Vellvii Nova is included with the current Lux first-run offer. Future Lux runs are planned, but the Nova gift will not be included after this first run." },
      { question: "What is the Vellvii Lux warranty?", answer: "All Vellvii products are covered by our authorized retailer warranty when registered within 7 days of receipt. Repair or replacement only - no refunds on final sales." },
      { question: "Where can I find warranty information?", answer: "Full warranty terms and registration details are available at /warranty." },
    ],
  },
  "vellvii-g-vibe": {
    tagline: "A refined addition to the Vellvii Pleasure Collection.",
    keyBenefits: [
      { icon: "Heart", label: "Designed for modern couples", copy: "Considered ergonomics for shared, intentional moments." },
      { icon: "Sparkles", label: "Premium experience", copy: "A refined object you will actually want to keep on display." },
      { icon: "ShieldCheck", label: "Body-safe materials", copy: "Selected with comfort and quality at the center." },
    ],
    doxCompatible: true,
    productDetails: [
      { label: "DOX Compatibility", value: "Fits the Vellvii DOX through the VDS insert" },
    ],
  },
  "vellvii-evolve": {
    tagline: "Discreet design, refined for everyday intimacy.",
    keyBenefits: [
      { icon: "Heart", label: "Designed for modern couples", copy: "An object built around connection, not novelty." },
      { icon: "Sparkles", label: "Premium experience", copy: "Quiet luxury in every detail." },
      { icon: "ShieldCheck", label: "Body-safe materials", copy: "Selected with comfort and quality at the center." },
    ],
    doxCompatible: true,
    productDetails: [
      { label: "DOX Compatibility", value: "Fits the Vellvii DOX through the VDS insert" },
    ],
  },
  "vellvii-pulse": {
    tagline: "Part of the Vellvii Pleasure Collection - designed with intention.",
    keyBenefits: [
      { icon: "Sparkles", label: "Premium experience", copy: "A considered object with a refined silhouette." },
      { icon: "Heart", label: "Designed for modern couples", copy: "Built around intimacy and shared discretion." },
      { icon: "ShieldCheck", label: "Body-safe materials", copy: "Selected with comfort and quality at the center." },
    ],
    doxCompatible: true,
    productDetails: [
      { label: "DOX Compatibility", value: "Fits the Vellvii DOX through the VDS insert" },
    ],
  },
};

export const getPdpContent = (handle: string | undefined): PdpContent => {
  if (!handle) return {};
  return PDP_CONTENT[handle as CanonicalHandle] ?? {};
};
