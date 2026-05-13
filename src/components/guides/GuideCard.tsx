import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface GuideCardProps {
  to: string;
  category: string;
  title: string;
  excerpt: string;
}

export const GuideCard = ({ to, category, title, excerpt }: GuideCardProps) => {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 transition-colors hover:border-primary/30"
    >
      <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.28em] text-primary/80 mb-4">
        {category}
      </span>
      <h2 className="font-baskerville text-xl sm:text-2xl text-light-primary mb-3 leading-snug">
        {title}
      </h2>
      <p className="font-montserrat text-sm text-light-secondary leading-relaxed mb-6 flex-1">
        {excerpt}
      </p>
      <span className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.18em] text-primary group-hover:gap-3 transition-all">
        Read Guide
        <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
      </span>
    </Link>
  );
};

export default GuideCard;
