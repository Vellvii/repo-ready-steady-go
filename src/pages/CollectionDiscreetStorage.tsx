import { CollectionLayout } from "@/components/products/CollectionLayout";

const CollectionDiscreetStorage = () => (
  <CollectionLayout
    eyebrow="Discreet By Design"
    h1="Discreet Storage"
    intro="Vellvii storage is designed for privacy without compromise. From portable fingerprint-lock storage to larger bedroom-focused organization, each piece is created to feel refined, intentional, and discreet."
    seoTitle="Discreet Sex Toy Storage | Vellvii Storage Collection"
    seoDescription="Discreet sex toy storage by Vellvii - the Lux portable fingerprint-lock case and the DOX bedroom storage hub, designed for privacy and refined organization."
    canonical="/collections/discreet-storage"
    seoParagraph="Vellvii approaches discreet sex toy storage as a design problem first. Each piece - from the portable Lux sex toy storage box to the larger DOX adult toy storage hub - is created to live quietly in a refined home, supporting privacy, organization, and everyday use without drawing attention to itself."
    productHandles={["vellvii-dox", "vellvii-lux"]}
    whyHeading="Storage that disappears into your space"
    whyItems={[
      {
        title: "Privacy first",
        copy: "Each storage piece is built around discretion, from silhouette to access.",
      },
      {
        title: "Refined organization",
        copy: "Considered interiors keep the collection calm, private, and intentional.",
      },
      {
        title: "Two formats, one approach",
        copy: "DOX is the larger bedroom storage system. Lux is the portable fingerprint-lock case for everyday use.",
      },
    ]}
    faqs={[
      {
        question: "What does discreet storage mean for Vellvii?",
        answer:
          "It means storage designed to feel refined and intentional, with quiet exteriors and thoughtful interiors that protect privacy.",
      },
      {
        question: "Which products are included in this collection?",
        answer:
          "Vellvii DOX (the larger bedroom storage system) and Vellvii Lux (the portable fingerprint-lock storage case).",
      },
      {
        question: "How do I choose between DOX and Lux?",
        answer:
          "Choose DOX for a larger, sturdier piece designed for the bedroom and the Vellvii docking system. Choose Lux for portable, travel-friendly, fingerprint-secured personal storage.",
      },
      {
        question: "Is Lux part of the DOX docking system?",
        answer:
          "No. Vellvii Lux is a separate portable storage case and is not a DOX-docking product.",
      },
      {
        question: "Where can I find warranty information?",
        answer: "Full warranty terms are available at /warranty.",
      },
    ]}
    relatedLinks={[
      { label: "Portable Storage", href: "/collections/portable-storage" },
      { label: "Bedroom Storage", href: "/collections/bedroom-storage" },
      { label: "DOX-Compatible Products", href: "/collections/dox-compatible-products" },
    ]}
  />
);

export default CollectionDiscreetStorage;
