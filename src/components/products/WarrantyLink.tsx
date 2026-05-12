import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight } from "lucide-react";

interface WarrantyLinkProps {
  variant?: "inline" | "block";
}

export const WarrantyLink = ({ variant = "block" }: WarrantyLinkProps) => {
  if (variant === "inline") {
    return (
      <Link
        to="/warranty"
        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-montserrat text-sm underline-offset-4 hover:underline"
      >
        View warranty information
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    );
  }

  return (
    <Link
      to="/warranty"
      className="group inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all font-montserrat text-sm text-light-primary"
    >
      <ShieldCheck className="w-4 h-4 text-primary" strokeWidth={1.5} />
      <span>View warranty information</span>
      <ArrowRight className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
};

export default WarrantyLink;
