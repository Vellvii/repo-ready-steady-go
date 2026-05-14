import { Link } from "react-router-dom";
import { GuideLayout } from "@/components/guides/GuideLayout";

const FAQ = [
  {
    question: "What should couples consider when choosing a Vellvii product?",
    answer:
      "Couples should consider privacy, comfort, storage, lifestyle, and whether they want a shared bedroom-focused system or a more portable personal storage option.",
  },
  {
    question: "Which Vellvii product is best for couples?",
    answer:
      "Vellvii DOX is a strong starting point for couples who want a larger storage and docking hub for the Vellvii Pleasure Collection.",
  },
  {
    question: "Can Lux still be useful for couples?",
    answer:
      "Yes. Vellvii Lux can be useful as a portable fingerprint-lock storage case for personal, travel-friendly, or secondary storage.",
  },
];

const H2 = "font-baskerville text-2xl sm:text-3xl text-light-primary mt-12 mb-4";

const GuideProductsForCouples = () => {
  return (
    <GuideLayout
      seoTitle="How to Choose Premium Products for Couples | Vellvii"
      seoDescription="Learn how modern couples can choose refined, discreet products built around privacy, connection, storage, and shared intention."
      canonical="/guides/how-to-choose-premium-products-for-couples"
      category="Couples Guide"
      title="How to Choose Premium Products for Couples"
      intro="Choosing well as a couple is less about novelty and more about intention. This guide outlines how to think about privacy, storage, and shared lifestyle when selecting your first Vellvii piece."
      heroImage="/uploads/Dox_white_lifestyle1.jpg"
      heroImageAlt="Vellvii DOX bedroom storage and docking hub styled in a refined shared interior"
      faq={FAQ}
    >
      <h2 className={H2}>Introduction</h2>
      <p>
        For couples, the right product is one that respects both people - their comfort, their routines, and the way they share a space. Vellvii is designed for that quiet, considered approach: refined pieces that fit into a shared life rather than disrupt it.
      </p>

      <h2 className={H2}>Start with privacy and comfort</h2>
      <p>
        Privacy comes first. Before considering any specific product, think about how it will be stored, who has access, and how it fits into the rhythm of a shared bedroom. Comfort follows - both people should feel at ease with the piece, its design, and where it lives.
      </p>

      <h2 className={H2}>Choose products that fit your lifestyle</h2>
      <p>
        Lifestyle shapes the right choice. A couple that travels often may prioritize a portable case. A couple building a more grounded home routine may prefer a refined bedroom-focused system. Neither is more correct - they are simply different starting points.{" "}
        <Link to="/collections/products-for-couples" className="text-primary hover:underline">Browse Products for Couples</Link>.
      </p>

      <h2 className={H2}>Think about storage, not only the product</h2>
      <p>
        Storage is often overlooked, yet it shapes the everyday experience as much as the product itself. A considered storage piece keeps a collection organized, private, and easy to return to its place - which makes the whole routine feel more intentional.
      </p>

      <h2 className={H2}>Why shared organization matters</h2>
      <p>
        For couples, shared organization quietly supports trust and ease. Knowing where each piece lives, that it is private, and that it is cared for removes small frictions from the everyday. Vellvii storage is designed to support that kind of calm, refined order.
      </p>

      <h2 className={H2}>How the Vellvii DOX supports couples</h2>
      <figure className="my-6 overflow-hidden rounded-lg border border-white/10">
        <img
          src="/uploads/dox_with_toys_1.jpg"
          alt="Vellvii DOX bedroom storage and docking hub holding the Vellvii Pleasure Collection"
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </figure>
      <p>
        Vellvii DOX is the larger, sturdier bedroom storage and docking hub. For couples, it offers a refined shared home for the Vellvii Pleasure Collection - faux leather outside with rose gold accents, fully velvet-lined inside with a movable velvet-lined tray for smaller pieces like a bullet, rose, condoms, or lubricants. A biometric fingerprint lock stores up to 10 fingerprints, and a USB-C input on the exterior powers 3 internal USB-A ports so toys can charge securely inside. On top, the VDS and DDS sit as suction-base mounting stations, turning the DOX itself into a refined stand.{" "}
        <Link to="/products/vellvii-dox" className="text-primary hover:underline">View Vellvii DOX</Link>.
      </p>

      <h2 className={H2}>Where Lux fits for personal or travel-friendly storage</h2>
      <p>
        Vellvii Lux is the portable fingerprint-lock storage case - a soft bag roughly the size of a refined toiletries bag, with a genuine leather exterior and velvet-lined interior. It uses the same biometric lock system, with a USB-C input on the exterior feeding 2 internal USB-A ports so personal pieces can charge while stored. For couples, Lux sits alongside DOX as a personal or travel-friendly piece - useful for trips, secondary storage, or simply for moments away from home.{" "}
        <Link to="/products/vellvii-lux" className="text-primary hover:underline">Explore Vellvii Lux</Link>.
      </p>

      <h2 className={H2}>Choosing your first Vellvii piece</h2>
      <p>
        For couples building toward a wider collection, Vellvii DOX is a natural starting point - a refined bedroom anchor that grows with the Pleasure Collection. From there, individual pieces can be added at your own pace.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><Link to="/products/vellvii-g-vibe" className="text-primary hover:underline">Vellvii G-Vibe</Link></li>
        <li><Link to="/products/vellvii-evolve" className="text-primary hover:underline">Vellvii Evolve</Link></li>
        <li><Link to="/products/vellvii-pulse" className="text-primary hover:underline">Vellvii Pulse</Link></li>
      </ul>
      <p>
        These three are part of the{" "}
        <Link to="/collections/pleasure-collection" className="text-primary hover:underline">Vellvii Pleasure Collection</Link> and are compatible with the VDS suction mount that sits atop the DOX.
      </p>

      <h2 className={H2}>Final Recommendation</h2>
      <p>
        Start with the storage piece that fits how you actually live - DOX as a refined bedroom anchor, Lux as a portable companion - and let the collection grow from there. For more personal guidance, you can always{" "}
        <Link to="/contact" className="text-primary hover:underline">contact Vellvii</Link>.
      </p>
    </GuideLayout>
  );
};

export default GuideProductsForCouples;
