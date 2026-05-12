import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const BackToShopCTA = () => (
  <section className="py-10 sm:py-14 px-3 sm:px-4 lg:px-8 border-t border-white/10">
    <div className="max-w-3xl mx-auto text-center">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 hover:border-primary/50 hover:bg-primary/5 transition-all font-montserrat text-sm text-light-primary"
      >
        <ArrowLeft className="w-4 h-4 text-primary" />
        Back to the collection
      </Link>
    </div>
  </section>
);

export default BackToShopCTA;
