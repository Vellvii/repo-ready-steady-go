import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedCollectionsProps {
  links: { label: string; href: string }[];
}

/**
 * Subtle PDP chip strip linking to relevant collection landing pages.
 * Renders nothing when no links are provided.
 */
export const RelatedCollections = ({ links }: RelatedCollectionsProps) => {
  if (!links?.length) return null;

  return (
    <section className="py-8 sm:py-10 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-primary font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-3 sm:mb-4">
          Explore Collections
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-primary/50 hover:bg-primary/5 transition-all font-montserrat text-xs sm:text-sm text-light-primary"
            >
              {link.label}
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedCollections;
