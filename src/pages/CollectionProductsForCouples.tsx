import { CollectionLayout } from "@/components/products/CollectionLayout";

const CollectionProductsForCouples = () => (
  <CollectionLayout
    eyebrow="Designed For Modern Couples"
    h1="Products for Couples"
    intro="Vellvii products are designed for modern couples who value privacy, intention, and refinement. Explore the collection built around discreet storage, shared organization, and a premium experience."
    seoTitle="Products for Couples | Vellvii Pleasure Collection"
    seoDescription="Explore refined Vellvii products designed for modern couples who value discretion, connection, and premium private storage."
    canonical="/collections/products-for-couples"
    productHandles={[
      "vellvii-dox",
      "vellvii-g-vibe",
      "vellvii-evolve",
      "vellvii-pulse",
      "vellvii-lux",
    ]}
    whyHeading="A premium experience, designed for two"
    whyItems={[
      {
        title: "Built around connection",
        copy: "Considered objects that support intentional moments and shared discretion.",
      },
      {
        title: "Refined storage, together",
        copy: "From the DOX bedroom system to the portable Lux case, storage feels shared and elegant.",
      },
      {
        title: "Discreet from start to finish",
        copy: "Quiet exteriors, considered interiors, and a checkout designed for privacy.",
      },
    ]}
    faqs={[
      {
        question: "What makes Vellvii products suited to couples?",
        answer:
          "Each product is designed around discretion, shared use, and a premium experience - from refined storage to thoughtfully shaped objects within the Pleasure Collection.",
      },
      {
        question: "Which Vellvii products are part of this collection?",
        answer:
          "Vellvii DOX, G-Vibe, Evolve, Pulse, and Lux. Together they form the current Pleasure Collection.",
      },
      {
        question: "How do I choose the right Vellvii product?",
        answer:
          "Start with how you want to store and use the collection. DOX anchors the bedroom, Lux travels with you, and the G-Vibe, Evolve, and Pulse extend the Pleasure Collection.",
      },
      {
        question: "Are Vellvii products app-connected?",
        answer:
          "Vellvii is building toward a connected product ecosystem, but app-connected functionality should only be considered available once officially released.",
      },
      {
        question: "Where can I find warranty information?",
        answer: "Full warranty terms are available at /warranty.",
      },
    ]}
    relatedLinks={[
      { label: "Pleasure Collection", href: "/collections/pleasure-collection" },
      { label: "DOX-Compatible Products", href: "/collections/dox-compatible-products" },
      { label: "Discreet Storage", href: "/collections/discreet-storage" },
    ]}
  />
);

export default CollectionProductsForCouples;
