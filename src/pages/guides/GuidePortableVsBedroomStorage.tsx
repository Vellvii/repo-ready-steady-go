import { Link } from "react-router-dom";
import { GuideLayout } from "@/components/guides/GuideLayout";

const FAQ = [
  {
    question: "What is the difference between portable and bedroom storage?",
    answer:
      "Portable storage is designed to move with your routine, while bedroom storage is designed as a more permanent, organized space for your collection.",
  },
  {
    question: "Which Vellvii product is best for portable storage?",
    answer:
      "Vellvii Lux is the portable fingerprint-lock storage case designed for everyday personal use and travel-friendly privacy.",
  },
  {
    question: "Which Vellvii product is best for bedroom storage?",
    answer:
      "Vellvii DOX is the larger, sturdier storage system designed for discreet bedroom organization and the Vellvii Pleasure Collection.",
  },
];

const H2 = "font-baskerville text-2xl sm:text-3xl text-light-primary mt-12 mb-4";

const GuidePortableVsBedroomStorage = () => {
  return (
    <GuideLayout
      seoTitle="Portable vs Bedroom Storage | Vellvii Guide"
      seoDescription="Compare portable and bedroom-focused storage options to choose the right Vellvii piece for privacy, organization, and everyday use."
      canonical="/guides/portable-vs-bedroom-storage"
      category="Storage Guide"
      title="Portable vs Bedroom Storage: Which Vellvii Option Fits You?"
      intro="Portable and bedroom storage solve different problems. This guide explains where each one fits, and how Vellvii Lux and Vellvii DOX support both approaches."
      heroImage="/uploads/lux-lifestyle-final-v5.jpg"
      heroImageAlt="Vellvii Lux portable fingerprint-lock storage case beside a refined bedroom setting"
      faq={FAQ}
    >
      <h2 className={H2}>Introduction</h2>
      <p>
        Choosing a storage piece is rarely about size alone. It is about how the piece fits your routine - whether it travels with you, stays beside the bed, or quietly anchors a wider collection. Vellvii offers two distinct answers: a portable fingerprint-lock case and a refined bedroom storage hub.
      </p>

      <h2 className={H2}>What is portable storage?</h2>
      <p>
        Portable storage is designed to move. It lives in a bag, a drawer, or a suitcase, and is built around discretion in motion. The priority is privacy on the go - the ability to bring personal items along without drawing attention.
      </p>

      <h2 className={H2}>What is bedroom storage?</h2>
      <p>
        Bedroom storage is designed to stay. It sits beside the bed, on a shelf, or inside a wardrobe, and is built to organize a growing collection in one considered place. The priority is refined, everyday access at home.
      </p>

      <h2 className={H2}>When portable storage makes sense</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>You travel often and want privacy in your luggage.</li>
        <li>You prefer a single, self-contained case rather than a larger system.</li>
        <li>You want a piece that lives in a drawer or bag, not on display.</li>
      </ul>
      <p>
        <Link to="/collections/portable-storage" className="text-primary hover:underline">Browse Portable Storage</Link>.
      </p>

      <h2 className={H2}>When bedroom storage makes sense</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>You want a refined home for the Vellvii Pleasure Collection.</li>
        <li>You want a velvet-lined hub with a movable interior tray and top-mounted VDS / DDS suction stations.</li>
        <li>You want a piece that stays in place, not one that moves with you.</li>
      </ul>
      <p>
        <Link to="/collections/bedroom-storage" className="text-primary hover:underline">Browse Bedroom Storage</Link>.
      </p>

      <h2 className={H2}>How Vellvii Lux fits into portable storage</h2>
      <figure className="my-6 overflow-hidden rounded-lg border border-white/10">
        <img
          src="/uploads/lux-bag-lifestyle.jpg"
          alt="Vellvii Lux portable fingerprint-lock storage case in a travel-friendly bag setting"
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </figure>
      <p>
        Vellvii Lux is a portable fingerprint-lock storage case - a soft bag the size of a refined toiletries bag, with a genuine leather exterior and velvet-lined interior. A USB-C input on the outside feeds 2 internal USB-A ports for charging personal pieces while stored. Lux is the piece designed to travel with you, and is its own self-contained piece - not part of the DOX docking system.{" "}
        <Link to="/products/vellvii-lux" className="text-primary hover:underline">Explore Vellvii Lux</Link>.
      </p>

      <h2 className={H2}>How Vellvii DOX fits into bedroom storage</h2>
      <figure className="my-6 overflow-hidden rounded-lg border border-white/10">
        <img
          src="/uploads/Dox_white_lifestyle1.jpg"
          alt="Vellvii DOX bedroom storage and docking hub in a refined interior"
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </figure>
      <p>
        Vellvii DOX is the larger, sturdier bedroom storage and docking hub. Faux leather outside with rose gold accents, velvet-lined inside, with a movable velvet-lined tray for smaller pieces. A biometric fingerprint lock stores up to 10 fingerprints, and a USB-C input on the exterior powers 3 internal USB-A ports for charging toys securely inside. On top, the VDS and DDS sit as suction-base mounting stations, turning the DOX itself into a refined stand.{" "}
        <Link to="/products/vellvii-dox" className="text-primary hover:underline">View Vellvii DOX</Link>.
      </p>

      <h2 className={H2}>Can you use both?</h2>
      <p>
        Yes. Many owners pair both pieces - DOX as a refined bedroom anchor for the wider collection, and Lux as the portable case that travels with everyday routines. The two are independent: Lux does not dock into DOX, and DOX is not built to move.
      </p>

      <h2 className={H2}>Final Recommendation</h2>
      <p>
        If your priority is travel-friendly privacy, choose Lux. If your priority is a refined bedroom-focused storage system, choose DOX. For a side-by-side breakdown, see our{" "}
        <Link to="/guides/lux-vs-dox" className="text-primary hover:underline">Lux vs DOX guide</Link>, or{" "}
        <Link to="/collections/discreet-storage" className="text-primary hover:underline">browse Discreet Storage</Link> to see both alongside the wider range.
      </p>
    </GuideLayout>
  );
};

export default GuidePortableVsBedroomStorage;
