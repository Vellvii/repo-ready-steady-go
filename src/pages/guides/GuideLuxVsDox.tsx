import { Link } from "react-router-dom";
import { GuideLayout } from "@/components/guides/GuideLayout";

const FAQ = [
  {
    question: "Is Vellvii Lux the same as Vellvii DOX?",
    answer:
      "No. Vellvii Lux is a portable fingerprint-lock storage case, while Vellvii DOX is the larger bedroom storage and docking hub.",
  },
  {
    question: "Is Lux DOX-compatible?",
    answer:
      "No. Lux is a separate portable storage case and does not dock into the DOX system.",
  },
  {
    question: "Which should I choose first?",
    answer:
      "Choose Lux if you want portable, everyday private storage. Choose DOX if you want a larger bedroom-focused storage system built around the Vellvii Pleasure Collection.",
  },
];

const H2 = "font-baskerville text-2xl sm:text-3xl text-light-primary mt-12 mb-4";

const GuideLuxVsDox = () => {
  return (
    <GuideLayout
      seoTitle="Vellvii Lux vs DOX | Portable vs Bedroom Storage"
      seoDescription="Compare Vellvii Lux and Vellvii DOX to choose between portable fingerprint-lock storage and a larger bedroom-focused storage system."
      canonical="/guides/lux-vs-dox"
      category="Storage Guide"
      title="Vellvii Lux vs DOX: Which Storage Piece Fits Your Lifestyle?"
      intro="Vellvii Lux and Vellvii DOX are two different approaches to discreet storage. This guide breaks down what each one is for, who each one fits, and how to decide between them."
      faq={FAQ}
    >
      <h2 className={H2}>Introduction</h2>
      <p>
        Vellvii offers two distinct storage pieces designed for different parts of life. Lux is built for portable, everyday privacy. DOX is built for refined bedroom organization. Both are part of the same design language, but they serve different purposes.
      </p>

      <h2 className={H2}>Quick Comparison</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.28em] text-primary/80 mb-2">Portable</p>
          <h3 className="font-baskerville text-xl text-light-primary mb-3">Vellvii Lux</h3>
          <p className="font-montserrat text-sm text-light-secondary leading-relaxed">
            A portable fingerprint-lock storage case for everyday personal use and travel-friendly privacy.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.28em] text-primary/80 mb-2">Bedroom</p>
          <h3 className="font-baskerville text-xl text-light-primary mb-3">Vellvii DOX</h3>
          <p className="font-montserrat text-sm text-light-secondary leading-relaxed">
            A larger, sturdier bedroom storage and docking hub built around the Vellvii Pleasure Collection.
          </p>
        </div>
      </div>

      <h2 className={H2}>What is Vellvii Lux?</h2>
      <p>
        Vellvii Lux is a portable fingerprint-lock storage case. It is designed for the moments when discretion needs to travel with you - in a bag, on a trip, or simply tucked into a drawer. Lux is its own self-contained piece and is not part of the DOX docking system.{" "}
        <Link to="/products/vellvii-lux" className="text-primary hover:underline">Explore Vellvii Lux</Link>.
      </p>

      <h2 className={H2}>What is Vellvii DOX?</h2>
      <p>
        Vellvii DOX is the larger bedroom storage and docking hub. It is the central piece of the Vellvii ecosystem, with shaped inserts that hold compatible Vellvii products in place. DOX is a bedroom-focused storage piece, not a portable one.{" "}
        <Link to="/products/vellvii-dox" className="text-primary hover:underline">View Vellvii DOX</Link>.
      </p>

      <h2 className={H2}>Choose Lux if...</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>You want a portable, on-the-move privacy solution.</li>
        <li>You prefer a fingerprint-locked case that lives in a bag or drawer.</li>
        <li>You are not building around a larger bedroom storage system.</li>
      </ul>
      <p>
        <Link to="/collections/portable-storage" className="text-primary hover:underline">Explore Portable Storage</Link>.
      </p>

      <h2 className={H2}>Choose DOX if...</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>You want a refined, bedroom-focused storage piece.</li>
        <li>You are collecting or planning to collect DOX-compatible Vellvii products.</li>
        <li>You want shaped docking inserts rather than a single open compartment.</li>
      </ul>
      <p>
        <Link to="/collections/bedroom-storage" className="text-primary hover:underline">Explore Bedroom Storage</Link>.
      </p>

      <h2 className={H2}>Can Lux and DOX work together?</h2>
      <p>
        Lux and DOX are independent pieces. Lux does not dock into the DOX system, and DOX is not designed to travel. Many people use both - DOX as a refined bedroom anchor, Lux for everyday portable privacy.
      </p>

      <h2 className={H2}>Final Recommendation</h2>
      <p>
        If you want one piece that travels with you, choose Lux. If you want a bedroom-focused storage system that grows with the Vellvii Pleasure Collection, choose DOX.{" "}
        <Link to="/collections/discreet-storage" className="text-primary hover:underline">Explore Discreet Storage</Link> to see both alongside the wider range.
      </p>
    </GuideLayout>
  );
};

export default GuideLuxVsDox;
