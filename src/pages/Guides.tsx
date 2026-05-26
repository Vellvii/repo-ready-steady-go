import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { GuideCard } from "@/components/guides/GuideCard";

const GUIDES = [
  {
    to: "/guides/what-is-a-rose-toy",
    category: "Buyer's Guide",
    title: "What Is a Rose Toy? A Premium Guide to Design, Storage, and Discretion",
    excerpt:
      "Learn what a rose toy is, why design and discretion matter, and how Vellvii is developing a rose-inspired product designed for the DOX ecosystem.",
    image: "/uploads/vellvii-rose-toy-lux-case.png",
    imageAlt: "Refined Vellvii storage piece styled in a modern bedroom, illustrating premium intimate wellness storage",
  },
  {
    to: "/guides/lux-vs-dox",
    category: "Storage Guide",
    title: "Lux vs DOX: Which Storage Piece Fits Your Lifestyle?",
    excerpt:
      "Compare portable fingerprint-lock storage with a larger bedroom-focused system to choose the right Vellvii piece.",
    image: "/uploads/lux-lifestyle-final-v5.jpg",
    imageAlt: "Vellvii Lux portable fingerprint-lock storage case in a refined lifestyle setting",
  },
  {
    to: "/guides/how-the-vellvii-dox-docking-system-works",
    category: "DOX Compatibility",
    title: "How the Vellvii DOX Docking System Works",
    excerpt:
      "Learn how VDS and DDS help organize the Vellvii Pleasure Collection inside the DOX ecosystem.",
    image: "/uploads/dox-interior-labeled.jpg",
    imageAlt: "Vellvii DOX interior showing the VDS and DDS suction-base mounting stations on top",
  },
  {
    to: "/guides/discreet-storage-for-intimate-wellness-products",
    category: "Storage & Privacy",
    title: "Discreet Storage for Intimate Wellness Products",
    excerpt:
      "Explore why discreet storage matters and how Lux and DOX support privacy, care, and organization.",
    image: "/uploads/lux-philosophy-lifestyle-v4.png",
    imageAlt: "Vellvii Lux on a refined surface, illustrating discreet everyday storage",
  },
  {
    to: "/guides/portable-vs-bedroom-storage",
    category: "Storage Guide",
    title: "Portable vs Bedroom Storage: Which Vellvii Option Fits You?",
    excerpt:
      "Compare portable private storage with a larger bedroom-focused system to choose the right Vellvii option for your lifestyle.",
    image: "/uploads/lux-travel-suitcase.png",
    imageAlt: "Vellvii Lux portable fingerprint-lock case packed for travel, illustrating portable storage",
  },
  {
    to: "/guides/how-to-choose-premium-products-for-couples",
    category: "Couples Guide",
    title: "How to Choose Premium Products for Couples",
    excerpt:
      "A refined guide for couples choosing products around privacy, connection, storage, and shared intention.",
    image: "/uploads/Lifestyle_img8.jpg",
    imageAlt: "Vellvii DOX on a bookshelf beside a shared bed, styled for couples",
  },
  {
    to: "/guides/how-to-care-for-your-vellvii-products",
    category: "Care Guide",
    title: "How to Care for Your Vellvii Products",
    excerpt:
      "Simple care and storage habits to help keep your Vellvii products organized, protected, and supported.",
    image: "/uploads/Dox_black_shelf_close_up.png",
    imageAlt: "Vellvii DOX shown on a refined shelf, illustrating considered everyday product care",
  },
  {
    to: "/guides/how-to-clean-and-store-sex-toys",
    category: "Care & Storage",
    title: "How to Clean and Store Sex Toys",
    excerpt:
      "General care and storage guidance for keeping products organized, protected, and stored with discretion.",
    image: "/uploads/dox_with_toys_1.jpg",
    imageAlt: "Vellvii DOX holding the Pleasure Collection, illustrating clean and discreet sex toy storage",
  },
  {
    to: "/guides/best-sex-toy-storage-box",
    category: "Buyer's Guide",
    title: "Best Sex Toy Storage Box",
    excerpt:
      "A refined buyer's guide to choosing a discreet storage box for privacy, organization, and everyday use.",
    image: "/uploads/Dox_white_lifestyle1.jpg",
    imageAlt: "Vellvii DOX styled as a refined sex toy storage box in a modern bedroom",
  },
  {
    to: "/guides/biometric-lock-box-for-sex-toys",
    category: "Privacy & Storage",
    title: "Biometric Lock Box for Sex Toys",
    excerpt:
      "Learn how biometric access can support private storage without compromising a refined home environment.",
    image: "/uploads/FP_lock_V_lock_close_ups.png",
    imageAlt: "Close-up of the Vellvii biometric fingerprint lock used on the DOX and Lux storage pieces",
  },
];

const Guides = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Vellvii Guides | Storage & Pleasure Collection"
        description="Vellvii Guides on discreet storage, the DOX docking system, Lux vs DOX, and choosing refined intimate wellness products for modern couples."
        canonical="/guides"
      />

      <ScrollHeader />

      <main className="pt-28 sm:pt-32 pb-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
          {/* Hero */}
          <header className="text-center mb-14 sm:mb-20 flex flex-col items-center">
            <span className="block w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-5" />
            <p className="font-baskerville italic text-xs sm:text-sm uppercase tracking-[0.32em] text-primary/80 mb-5">
              Editorial Knowledge Hub
            </p>
            <h1 className="font-baskerville text-4xl sm:text-5xl md:text-6xl text-light-primary mb-6">
              Vellvii Guides
            </h1>
            <p className="font-montserrat text-sm sm:text-base text-light-secondary max-w-2xl leading-relaxed">
              Explore refined guidance on Vellvii storage, product care, DOX compatibility, and choosing the right piece for your collection.
            </p>
            <span className="block w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-8" />
          </header>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {GUIDES.map((g) => (
              <GuideCard key={g.to} {...g} />
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-white/10 text-center">
            <p className="font-baskerville italic text-base sm:text-lg text-light-secondary/85 mb-6">
              Ready to explore the collection?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/shop"
                className="font-montserrat text-xs uppercase tracking-[0.2em] text-primary border border-primary/40 rounded-md px-6 py-3 hover:bg-primary/10 transition-colors"
              >
                Visit the Shop
              </Link>
              <Link
                to="/collections/pleasure-collection"
                className="font-montserrat text-xs uppercase tracking-[0.2em] text-light-secondary hover:text-primary transition-colors"
              >
                Browse Pleasure Collection
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PrelaunchFooter />
    </div>
  );
};

export default Guides;
