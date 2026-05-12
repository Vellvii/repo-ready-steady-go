import { CollectionLayout } from "@/components/products/CollectionLayout";

const CollectionPleasureCollection = () => (
  <CollectionLayout
    eyebrow="The Vellvii Pleasure Collection"
    h1="Vellvii Pleasure Collection"
    intro="The Vellvii Pleasure Collection brings together refined storage, discreet design, and premium products created for modern couples. Explore the full collection, from the DOX ecosystem to portable personal storage."
    seoTitle="Vellvii Pleasure Collection | Luxury Intimate Wellness"
    seoDescription="Explore the Vellvii Pleasure Collection, a refined range of discreet, premium products designed for modern couples and thoughtful private storage."
    canonical="/collections/pleasure-collection"
    productHandles={[
      "vellvii-dox",
      "vellvii-lux",
      "vellvii-g-vibe",
      "vellvii-evolve",
      "vellvii-pulse",
    ]}
    whyHeading="A refined collection, designed with intention"
    whyItems={[
      {
        title: "Discreet by design",
        copy: "Every piece is shaped around privacy, refinement, and the quiet rituals of modern life.",
      },
      {
        title: "Designed for modern couples",
        copy: "An ecosystem built around connection, intentional moments, and shared discretion.",
      },
      {
        title: "Refined organization",
        copy: "From the DOX bedroom storage system to the portable Lux case, storage feels considered, not utilitarian.",
      },
    ]}
    faqs={[
      {
        question: "What is the Vellvii Pleasure Collection?",
        answer:
          "It is the full Vellvii product range - a curated set of discreet storage and refined products designed for modern couples and a premium experience.",
      },
      {
        question: "Which products are included in the collection?",
        answer:
          "The current collection includes Vellvii DOX, Vellvii Lux, Vellvii G-Vibe, Vellvii Evolve, and Vellvii Pulse.",
      },
      {
        question: "Which products work with the Vellvii DOX?",
        answer:
          "Vellvii G-Vibe, Evolve, and Pulse are DOX-compatible through the VDS docking insert. The DDS insert supports compatible suction-base products up to 90mm (approximately 3.5 inches) in diameter.",
      },
      {
        question: "Is Vellvii Lux part of the DOX docking system?",
        answer:
          "No. Vellvii Lux is a separate portable fingerprint-lock storage case designed for travel-friendly and everyday personal storage.",
      },
      {
        question: "Where can I find warranty information?",
        answer:
          "Full warranty details and registration are available on the warranty page at /warranty.",
      },
    ]}
    relatedLinks={[
      { label: "DOX-Compatible Products", href: "/collections/dox-compatible-products" },
      { label: "Discreet Storage", href: "/collections/discreet-storage" },
      { label: "Products for Couples", href: "/collections/products-for-couples" },
    ]}
  />
);

export default CollectionPleasureCollection;
