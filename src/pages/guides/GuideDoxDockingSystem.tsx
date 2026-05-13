import { Link } from "react-router-dom";
import { GuideLayout } from "@/components/guides/GuideLayout";

const FAQ = [
  {
    question: "What does DOX-compatible mean?",
    answer:
      "DOX-compatible products are designed to fit within the Vellvii DOX ecosystem, either through the VDS insert for Vellvii products or through the DDS insert for compatible suction-base products.",
  },
  {
    question: "What is the VDS?",
    answer:
      "VDS stands for Vellvii Docking Station. It is the shaped insert on the Vellvii DOX designed specifically for current Vellvii products.",
  },
  {
    question: "What is the DDS?",
    answer:
      "DDS stands for Dildo Docking Station. It is the round insert on the Vellvii DOX designed for compatible suction-base products up to 90mm, approximately 3.5 inches, in diameter.",
  },
];

const H2 = "font-baskerville text-2xl sm:text-3xl text-light-primary mt-12 mb-4";

const GuideDoxDockingSystem = () => {
  return (
    <GuideLayout
      seoTitle="How the Vellvii DOX Docking System Works | VDS & DDS"
      seoDescription="Learn how the Vellvii DOX docking system works, including VDS for Vellvii products and DDS for compatible suction-base products up to 90mm, approximately 3.5 inches, in diameter."
      canonical="/guides/how-the-vellvii-dox-docking-system-works"
      category="DOX Compatibility"
      title="How the Vellvii DOX Docking System Works"
      intro="The Vellvii DOX uses two distinct docking inserts - the VDS and the DDS - to keep the Pleasure Collection organized and refined. Here is how each one works."
      faq={FAQ}
    >
      <h2 className={H2}>Introduction</h2>
      <p>
        The Vellvii DOX is more than a storage box. Inside, two shaped docking inserts hold compatible products in place: the VDS for Vellvii products, and the DDS for compatible suction-base products. Together they make the DOX a refined home for an evolving collection.
      </p>

      <h2 className={H2}>What is the Vellvii DOX?</h2>
      <p>
        The Vellvii DOX is the larger bedroom storage and docking hub at the centre of the Vellvii ecosystem. It is built for refined, discreet, bedroom-focused organization.{" "}
        <Link to="/products/vellvii-dox" className="text-primary hover:underline">View Vellvii DOX</Link>.
      </p>

      <h2 className={H2}>What is the VDS?</h2>
      <p>
        VDS stands for Vellvii Docking Station. It is the shaped insert built into the DOX for current Vellvii products. The VDS is sculpted to hold each compatible Vellvii piece securely in its intended position.
      </p>

      <h2 className={H2}>Which Vellvii products fit the VDS?</h2>
      <p>
        Three Vellvii products are DOX-compatible through the VDS:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><Link to="/products/vellvii-g-vibe" className="text-primary hover:underline">Vellvii G-Vibe</Link></li>
        <li><Link to="/products/vellvii-evolve" className="text-primary hover:underline">Vellvii Evolve</Link></li>
        <li><Link to="/products/vellvii-pulse" className="text-primary hover:underline">Vellvii Pulse</Link></li>
      </ul>

      <h2 className={H2}>What is the DDS?</h2>
      <p>
        DDS stands for Dildo Docking Station. It is the round insert on the Vellvii DOX, designed for compatible suction-base products up to 90mm, approximately 3.5 inches, in diameter. The DDS gives owners flexibility to dock pieces from their wider collection inside the same refined storage hub.
      </p>

      <h2 className={H2}>How to understand the 90mm / 3.5 inch DDS size</h2>
      <p>
        The DDS is a round dock with a fixed diameter. Compatible suction-base products up to 90mm, approximately 3.5 inches, in diameter will sit inside the DDS. Anything larger than that diameter will not fit. The DDS is not a universal mount, and not every third-party product will be compatible.
      </p>

      <h2 className={H2}>DOX-compatible products</h2>
      <p>
        The full set of products designed to live inside the DOX ecosystem is curated in one collection.{" "}
        <Link to="/collections/dox-compatible-products" className="text-primary hover:underline">Browse DOX-Compatible Products</Link>.
      </p>

      <h2 className={H2}>Final Recommendation</h2>
      <p>
        If you are building around the Vellvii Pleasure Collection, the DOX with its VDS gives you a refined, dedicated home for each piece. If you also own compatible suction-base products that fit within the 90mm / 3.5 inch diameter, the DDS extends that home further.{" "}
        <Link to="/collections/bedroom-storage" className="text-primary hover:underline">Explore Bedroom Storage</Link>.
      </p>
    </GuideLayout>
  );
};

export default GuideDoxDockingSystem;
