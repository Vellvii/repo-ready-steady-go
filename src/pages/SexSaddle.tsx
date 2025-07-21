import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserMenu from "@/components/UserMenu";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Dock } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { cn } from "@/lib/utils";

const SexSaddle = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <nav className="flex justify-between items-center p-4 sm:p-6 min-h-[80px]">
        <Link to="/home">
          <Button variant="ghost" className="text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <UserMenu />
      </nav>

      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
            The Sex Saddle
          </h1>
          <p className="text-secondary italic text-lg sm:text-xl mb-6">
            Straddle something built for the art of “O.”
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-4">
            This isn’t just support. It’s seduction beneath you.
            <br />
            <br />Ergonomically sculpted to fit your natural straddle, the Dox becomes your intimate stage.
            <br />Whether you ride slow and teasing or wild and unrelenting, it responds—balanced, grounded, and ready for every pulse of pleasure.
            <br />Pair it with any Vellvii toy, and the climax is only the beginning.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <Card className="glass-luxury p-6 text-center apple-hover">
            <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-2">
              <Package className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-lg font-playfair font-semibold text-white">Luxury Toy Storage</h3>
            <p className="text-sm text-white/80 mb-2">Because your pleasure deserves a throne.</p>
            <Link to="/luxury-storage">
              <MagneticButton as="div" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "cursor-pointer")}>Explore</MagneticButton>
            </Link>
          </Card>

          <Card className="glass-luxury p-6 text-center apple-hover">
            <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-2">
              <Dock className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-lg font-playfair font-semibold text-white">The Docking Station</h3>
            <p className="text-sm text-white/80 mb-2">Mount. Ride. Release.</p>
            <Link to="/docking-station">
              <MagneticButton as="div" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "cursor-pointer")}>Explore</MagneticButton>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SexSaddle;
