import { Link } from "react-router-dom";
import { GuideLayout } from "@/components/guides/GuideLayout";

const FAQ = [
  {
    question: "How should I care for my Vellvii product?",
    answer:
      "Always follow the care instructions included with your product, store it in a clean, dry place, and avoid extreme heat, direct sunlight, and unnecessary exposure. If you are unsure, contact Vellvii support.",
  },
  {
    question: "Where can I learn how to clean and store sex toys?",
    answer:
      "Our general guide to how to clean and store sex toys covers safe everyday care habits and the right storage options for your collection.",
  },
  {
    question: "Where should I store my Vellvii products?",
    answer:
      "Use the storage option that fits your routine. Vellvii Lux is designed for portable personal storage, while Vellvii DOX is designed as a biometric lock box for refined bedroom storage.",
  },
  {
    question: "Where can I get warranty support?",
    answer:
      "You can visit the Vellvii warranty page or register your product through the warranty registration page for support.",
  },
];

const H2 = "font-baskerville text-2xl sm:text-3xl text-light-primary mt-12 mb-4";

const GuideProductCare = () => {
  return (
    <GuideLayout
      seoTitle="How to Care for Your Vellvii Products | Ownership & Support Guide"
      seoDescription="Vellvii ownership and support guide covering general care habits, sex toy storage options, warranty registration, and how to contact support."
      canonical="/guides/how-to-care-for-your-vellvii-products"
      category="Ownership & Support"
      title="How to Care for Your Vellvii Products"
      intro="A few simple habits help keep Vellvii pieces feeling considered over time. This Vellvii ownership guide covers general care, storage, and how to access warranty support when you need it."
      heroImage="/uploads/lux-philosophy-lifestyle-v4.png"
      heroImageAlt="Vellvii Lux on a refined surface, illustrating considered everyday product care"
      faq={FAQ}
    >
      <h2 className={H2}>Introduction</h2>
      <p>
        Caring for refined pieces is mostly about consistency. A handful of small, considered habits - returning each piece to its place, keeping it clean and dry, avoiding harsh conditions - quietly extends the life and feel of your Vellvii collection.
      </p>

      <h2 className={H2}>Always start with the included care instructions</h2>
      <p>
        Each Vellvii product ships with its own care instructions. Those instructions are the most accurate guidance for that specific piece - always begin there, and treat the points below as general companion habits rather than replacements.
      </p>

      <h2 className={H2}>General care habits</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Follow the care instructions included with your product.</li>
        <li>Clean according to the specific product's instructions.</li>
        <li>Store products in a clean, dry place after care.</li>
        <li>Avoid extreme heat, direct sunlight, and unnecessary exposure.</li>
        <li>Contact Vellvii support if you are unsure.</li>
      </ul>
      <p>
        For a wider, general guide on cleaning and storage habits, see our{" "}
        <Link to="/guides/how-to-clean-and-store-sex-toys" className="text-primary hover:underline">how to clean and store sex toys guide</Link>.
      </p>

      <h2 className={H2}>Use the right storage option</h2>
      <p>
        The right storage piece supports the rest of your care routine. Vellvii offers two distinct options designed around different parts of life.{" "}
        <Link to="/collections/discreet-storage" className="text-primary hover:underline">Browse Discreet Storage</Link>.
      </p>

      <h2 className={H2}>When to use Lux</h2>
      <p>
        Vellvii Lux is the portable fingerprint-lock storage case. Use Lux when you need privacy on the move - travel, day bags, or simply a personal piece that lives in a drawer.{" "}
        <Link to="/products/vellvii-lux" className="text-primary hover:underline">Explore Vellvii Lux</Link>{" "}
        or{" "}
        <Link to="/collections/portable-storage" className="text-primary hover:underline">browse Portable Storage</Link>.
      </p>

      <h2 className={H2}>When to use DOX</h2>
      <p>
        Vellvii DOX is the larger biometric lock box and bedroom storage hub. Use DOX when you want a refined, dedicated home for the Vellvii Pleasure Collection inside the bedroom.{" "}
        <Link to="/products/vellvii-dox" className="text-primary hover:underline">View Vellvii DOX</Link>{" "}
        or{" "}
        <Link to="/collections/bedroom-storage" className="text-primary hover:underline">browse Bedroom Storage</Link>.
      </p>

      <h2 className={H2}>Warranty and registration</h2>
      <p>
        Vellvii products are supported through warranty registration. Registering your product helps us provide care, support, and any future assistance you may need.{" "}
        <Link to="/warranty/register" className="text-primary hover:underline">Register your warranty</Link>{" "}
        or read the full{" "}
        <Link to="/warranty" className="text-primary hover:underline">Vellvii warranty information</Link>.
      </p>

      <h2 className={H2}>When to contact Vellvii support</h2>
      <p>
        If something feels unusual, or if you have a question that the included care instructions do not answer, our team is here to help.{" "}
        <Link to="/contact" className="text-primary hover:underline">Contact Vellvii</Link>.
      </p>

      <h2 className={H2}>Final Recommendation</h2>
      <p>
        Keep it simple: follow the included care instructions, store each piece in a clean, dry place, avoid extreme heat and direct sunlight, and use the Vellvii storage option that fits your routine. A little consistency goes a long way.
      </p>
    </GuideLayout>
  );
};

export default GuideProductCare;
