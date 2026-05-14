import { Link } from "react-router-dom";
import { GuideLayout } from "@/components/guides/GuideLayout";

const FAQ = [
  {
    question: "Is Vellvii Lux the same as Vellvii DOX?",
    answer:
      "No. Vellvii Lux is a portable fingerprint-lock storage case - designed as a refined sex toy bag - while Vellvii DOX is the larger biometric sex toy lock box and bedroom storage system.",
  },
  {
    question: "Is Vellvii DOX a sex toy lock box?",
    answer:
      "Yes. Vellvii DOX is a refined biometric lock box and bedroom storage hub for the Vellvii Pleasure Collection.",
  },
  {
    question: "Is Lux DOX-compatible?",
    answer:
      "No. Lux is a separate portable storage case and does not dock into the DOX system.",
  },
  {
    question: "Which should I choose first?",
    answer:
      "Choose Lux if you want portable, travel-friendly sex toy storage. Choose DOX if you want a larger biometric lock box for the bedroom built around the Vellvii Pleasure Collection.",
  },
];

const H2 = "font-baskerville text-2xl sm:text-3xl text-light-primary mt-12 mb-4";

const GuideLuxVsDox = () => {
  return (
    <GuideLayout
      seoTitle="Vellvii Lux vs DOX | Sex Toy Bag vs Biometric Lock Box"
      seoDescription="Compare Vellvii Lux portable sex toy storage with the Vellvii DOX biometric sex toy lock box. See which refined storage piece fits your lifestyle."
      canonical="/guides/lux-vs-dox"
      category="Storage Guide"
      title="Vellvii Lux vs DOX: Sex Toy Bag or Biometric Lock Box?"
      intro="Vellvii Lux and Vellvii DOX are two different approaches to discreet sex toy storage. This guide breaks down what each one is for, who each one fits, and how to decide between them."
      heroImage="/uploads/lux-lifestyle-final-v5.jpg"
      heroImageAlt="Vellvii Lux portable sex toy storage case shown in a refined lifestyle setting"
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
            A portable fingerprint-lock storage case - a refined sex toy bag for everyday personal use and travel-friendly privacy.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <p className="font-montserrat text-[0.65rem] uppercase tracking-[0.28em] text-primary/80 mb-2">Bedroom</p>
          <h3 className="font-baskerville text-xl text-light-primary mb-3">Vellvii DOX</h3>
          <p className="font-montserrat text-sm text-light-secondary leading-relaxed">
            A larger, sturdier biometric sex toy lock box and storage hub built around the Vellvii Pleasure Collection.
          </p>
        </div>
      </div>

      <h2 className={H2}>What is Vellvii Lux?</h2>
      <figure className="my-6 overflow-hidden rounded-lg border border-white/10">
        <img
          src="/uploads/lux-bag-lifestyle.jpg"
          alt="Vellvii Lux portable sex toy storage case in a travel-friendly bag setting"
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </figure>
      <p>
        Vellvii Lux is a portable fingerprint-lock storage case - sized like a refined toiletries-style bag and secured with biometric access. It is designed as a discreet sex toy bag for the moments when privacy needs to travel with you, and is its own self-contained piece - not part of the DOX docking system.{" "}
        <Link to="/products/vellvii-lux" className="text-primary hover:underline">Explore Vellvii Lux</Link>.
      </p>

      <h2 className={H2}>What is Vellvii DOX?</h2>
      <figure className="my-6 overflow-hidden rounded-lg border border-white/10">
        <img
          src="/uploads/Dox_white_lifestyle1.jpg"
          alt="Vellvii DOX biometric sex toy lock box in a refined bedroom interior"
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </figure>
      <p>
        Vellvii DOX is the larger biometric sex toy lock box and storage hub. It is the central piece of the Vellvii ecosystem - velvet-lined inside with a movable velvet-lined tray for smaller pieces, and a biometric fingerprint lock for fast, private access. On top, the VDS and DDS act as suction-base mounting stations, turning the DOX itself into a refined stand. DOX is a bedroom-focused storage piece, not a portable one.{" "}
        <Link to="/products/vellvii-dox" className="text-primary hover:underline">View Vellvii DOX</Link>.
      </p>

      <h2 className={H2}>Choose Lux if...</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>You want portable, travel-friendly sex toy storage.</li>
        <li>You prefer a fingerprint-locked case that lives in a bag or drawer.</li>
        <li>You are not building around a larger bedroom storage system.</li>
      </ul>
      <p>
        <Link to="/collections/portable-storage" className="text-primary hover:underline">Explore Portable Storage</Link>.
      </p>

      <h2 className={H2}>Choose DOX if...</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>You want a refined biometric lock box for the bedroom.</li>
        <li>You are collecting or planning to collect DOX-compatible Vellvii products.</li>
        <li>You want a velvet-lined storage hub with top-mounted VDS and DDS suction stations.</li>
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
        If you want one piece that travels with you, choose Lux. If you want a biometric lock box and bedroom-focused storage system that grows with the Vellvii Pleasure Collection, choose DOX.{" "}
        <Link to="/collections/discreet-storage" className="text-primary hover:underline">Explore Discreet Storage</Link> to see both alongside the wider range.
      </p>
    </GuideLayout>
  );
};

export default GuideLuxVsDox;
