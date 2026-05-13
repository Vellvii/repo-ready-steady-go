import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ScrollHeader } from "@/components/ScrollHeader";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { GuideCard } from "@/components/guides/GuideCard";

const GUIDES = [
  {
    to: "/guides/lux-vs-dox",
    category: "Storage Guide",
    title: "Lux vs DOX: Which Storage Piece Fits Your Lifestyle?",
    excerpt:
      "Compare portable fingerprint-lock storage with a larger bedroom-focused system to choose the right Vellvii piece.",
  },
  {
    to: "/guides/how-the-vellvii-dox-docking-system-works",
    category: "DOX Compatibility",
    title: "How the Vellvii DOX Docking System Works",
    excerpt:
      "Learn how VDS and DDS help organize the Vellvii Pleasure Collection inside the DOX ecosystem.",
  },
  {
    to: "/guides/discreet-storage-for-intimate-wellness-products",
    category: "Storage & Privacy",
    title: "Discreet Storage for Intimate Wellness Products",
    excerpt:
      "Explore why discreet storage matters and how Lux and DOX support privacy, care, and organization.",
  },
];

const Guides = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Vellvii Guides | Intimate Wellness, Storage & Product Care"
        description="Explore Vellvii guides on discreet storage, product care, DOX compatibility, and choosing the right refined wellness products for modern couples."
        canonical="/guides"
        organizationData
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
