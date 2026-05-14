import { Link } from "react-router-dom";
import { GuideLayout } from "@/components/guides/GuideLayout";

const FAQ = [
  {
    question: "What does DOX-compatible mean?",
    answer:
      "DOX-compatible products work with the suction-base mounting stations that sit atop the Vellvii DOX - the VDS for current Vellvii products, and the DDS for compatible suction-base pieces up to 90mm in diameter.",
  },
  {
    question: "What is the VDS?",
    answer:
      "VDS stands for Vellvii Docking Station. It is a suction-base mounting station that sits atop the Vellvii DOX and is shaped for current Vellvii products with suction bases.",
  },
  {
    question: "What is the DDS?",
    answer:
      "DDS stands for Dildo Docking Station. It is a round suction-base mounting station that sits atop the Vellvii DOX, supporting compatible suction-base products up to 90mm, approximately 3.5 inches, in diameter.",
  },
];

const H2 = "font-baskerville text-2xl sm:text-3xl text-light-primary mt-12 mb-4";

const GuideDoxDockingSystem = () => {
  return (
    <GuideLayout
      seoTitle="How the Vellvii DOX Docking System Works | VDS & DDS"
      seoDescription="How the Vellvii DOX docking system works, including VDS for Vellvii G-Vibe, Evolve and Pulse, and DDS for compatible suction-base products up to 90mm."
      canonical="/guides/how-the-vellvii-dox-docking-system-works"
      category="DOX Compatibility"
      title="How the Vellvii DOX Docking System Works"
      intro="The Vellvii DOX uses two distinct top-mounted suction stations - the VDS and the DDS - turning the DOX itself into a refined stand for compatible suction-base pieces. Here is how each one works."
      heroImage="/uploads/dox-interior-labeled.jpg"
      heroImageAlt="Vellvii DOX shown with the VDS and DDS suction-base mounting stations on top"
      faq={FAQ}
    >
      <h2 className={H2}>Introduction</h2>
      <p>
        The Vellvii DOX is more than a storage box. On top of the DOX, two suction-base mounting stations - the VDS for current Vellvii products and the DDS for compatible suction-base pieces - turn the DOX itself into a refined stand. Inside, the DOX is velvet-lined with a movable velvet-lined tray for smaller items, and a USB-C input on the exterior powers 3 internal USB-A ports for charging while stored.
      </p>

      <h2 className={H2}>What is the Vellvii DOX?</h2>
      <p>
        The Vellvii DOX is the larger bedroom storage and docking hub at the centre of the Vellvii ecosystem. It is built for refined, discreet, bedroom-focused organization.{" "}
        <Link to="/products/vellvii-dox" className="text-primary hover:underline">View Vellvii DOX</Link>.
      </p>

      <h2 className={H2}>What is the VDS?</h2>
      <figure className="my-6 overflow-hidden rounded-lg border border-white/10">
        <img
          src="/uploads/BeigeVDS.png"
          alt="Vellvii VDS suction-base mounting station for compatible Vellvii pieces"
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </figure>
      <p>
        VDS stands for Vellvii Docking Station. It is a suction-base mounting station that sits atop the DOX, designed to hold compatible Vellvii products with suction bases. With the VDS in place, the DOX itself becomes the mount.
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
        DDS stands for Dildo Docking Station. It is a round suction-base mounting station that sits atop the DOX, supporting compatible suction-base products up to 90mm, approximately 3.5 inches, in diameter. The DDS lets owners mount pieces from their wider collection on the same refined storage hub.
      </p>

      <h2 className={H2}>How to understand the 90mm / 3.5 inch DDS size</h2>
      <p>
        The DDS is a round suction mount with a fixed diameter. Compatible suction-base products up to 90mm, approximately 3.5 inches, in diameter will fit on the DDS. Anything larger than that diameter will not. The DDS is not a universal mount, and not every third-party product will be compatible.
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
