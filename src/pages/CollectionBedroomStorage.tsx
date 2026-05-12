import { CollectionLayout } from "@/components/products/CollectionLayout";

const CollectionBedroomStorage = () => (
  <CollectionLayout
    eyebrow="The Vellvii Bedroom System"
    h1="Bedroom Storage"
    intro="Vellvii DOX is the larger, sturdier storage system designed for discreet bedroom integration. Built around the VDS and DDS docking system, DOX becomes the central storage hub for the Vellvii Pleasure Collection."
    seoTitle="Bedroom Storage | Vellvii DOX"
    seoDescription="Explore Vellvii bedroom storage built around refined organization, discretion, and the DOX-compatible product ecosystem."
    canonical="/collections/bedroom-storage"
    productHandles={[
      "vellvii-dox",
      "vellvii-g-vibe",
      "vellvii-evolve",
      "vellvii-pulse",
    ]}
    whyHeading="A refined hub for the Pleasure Collection"
    whyItems={[
      {
        title: "Designed for the bedroom",
        copy: "A larger, sturdier storage piece intended to live discreetly within a modern bedroom.",
      },
      {
        title: "VDS docking system",
        copy: "The Vellvii Docking Station is shaped specifically for Vellvii G-Vibe, Evolve, and Pulse.",
      },
      {
        title: "DDS for compatible products",
        copy: "The Dildo Docking Station supports compatible suction-base products up to 90mm (approximately 3.5 inches) in diameter.",
      },
    ]}
    faqs={[
      {
        question: "What is the Vellvii DOX?",
        answer:
          "Vellvii DOX is the larger, sturdier storage system designed for discreet bedroom integration and built around the Vellvii docking system.",
      },
      {
        question: "What is the difference between VDS and DDS?",
        answer:
          "VDS is the Vellvii Docking Station, shaped specifically for current Vellvii products. DDS is the Dildo Docking Station, designed for compatible suction-base products up to 90mm (approximately 3.5 inches) in diameter.",
      },
      {
        question: "Which Vellvii products are DOX-compatible?",
        answer:
          "Vellvii G-Vibe, Evolve, and Pulse are DOX-compatible through the VDS insert.",
      },
      {
        question: "Is Vellvii Lux part of the DOX docking system?",
        answer:
          "No. Vellvii Lux is a separate portable fingerprint-lock storage case and is not a DOX-docking product.",
      },
      {
        question: "Where can I find warranty information?",
        answer: "Full warranty terms are available at /warranty.",
      },
    ]}
    relatedLinks={[
      { label: "Vellvii DOX", href: "/products/vellvii-dox" },
      { label: "DOX-Compatible Products", href: "/collections/dox-compatible-products" },
      { label: "Discreet Storage", href: "/collections/discreet-storage" },
    ]}
  />
);

export default CollectionBedroomStorage;
