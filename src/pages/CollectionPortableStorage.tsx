import { CollectionLayout } from "@/components/products/CollectionLayout";

const CollectionPortableStorage = () => (
  <CollectionLayout
    eyebrow="Designed To Travel With You"
    h1="Portable Storage"
    intro="Portable storage should feel discreet, refined, and easy to keep close. Vellvii Lux is designed as a fingerprint-lock storage case for everyday personal use and travel-friendly privacy."
    seoTitle="Portable Storage | Vellvii Lux"
    seoDescription="Discover portable Vellvii storage designed for everyday privacy, travel-friendly discretion, and refined personal organization."
    canonical="/collections/portable-storage"
    productHandles={["vellvii-lux"]}
    whyHeading="Refined, portable, and personal"
    whyItems={[
      {
        title: "Travel-friendly format",
        copy: "Designed with the feel of a refined toiletries-style case for everyday use and travel.",
      },
      {
        title: "Fingerprint access",
        copy: "Biometric access keeps personal storage private without keys or codes.",
      },
      {
        title: "Discreet silhouette",
        copy: "A clean, considered case designed to live naturally alongside the rest of your essentials.",
      },
    ]}
    faqs={[
      {
        question: "What is portable storage at Vellvii?",
        answer:
          "Portable storage is designed for personal use and travel - compact, discreet, and easy to keep close.",
      },
      {
        question: "Which Vellvii product is part of this collection?",
        answer: "Vellvii Lux, the portable fingerprint-lock storage case.",
      },
      {
        question: "Is Vellvii Lux part of the DOX docking system?",
        answer:
          "No. Vellvii Lux is a separate portable storage case and is not a DOX-docking product.",
      },
      {
        question: "When does the Vellvii Lux ship?",
        answer:
          "Pre-orders ship the first week of June 2026. Reserve now to secure your unit from the current first-run offer.",
      },
      {
        question: "Where can I find warranty information?",
        answer: "Full warranty terms are available at /warranty.",
      },
    ]}
    relatedLinks={[
      { label: "Vellvii Lux", href: "/products/vellvii-lux" },
      { label: "Discreet Storage", href: "/collections/discreet-storage" },
      { label: "Bedroom Storage", href: "/collections/bedroom-storage" },
    ]}
  />
);

export default CollectionPortableStorage;
