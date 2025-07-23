import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserMenu from "@/components/UserMenu";
import { Link } from "react-router-dom";
import { ArrowLeft, Dock, Armchair } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { cn } from "@/lib/utils";

const LuxuryStorage = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <nav className="flex justify-end items-center p-4 sm:p-6 min-h-[80px]">
        <UserMenu />
      </nav>

      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto md:grid md:grid-cols-3 md:gap-8">
          <div className="md:col-span-2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
              Luxury Toy Storage
            </h1>
            <p className="text-secondary italic text-lg sm:text-xl mb-6">
              Because your pleasure deserves a throne.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-4">
              This isn’t a drawer. This is a sanctuary.
              <br />
              <br />Velvet-lined. Lockable. Whisper-quiet charging for up to five toys.
              <br />Every inch designed to protect your most intimate treasures—until you're ready to awaken them.
              <br />Unbox your desires with the reverence they deserve.
            </p>
          </div>
          <div className="space-y-6 mt-8 md:mt-0">
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
          <Card className="glass-luxury p-6 text-center apple-hover">
            <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-2">
              <Armchair className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-lg font-playfair font-semibold text-white">The Sex Saddle</h3>
            <p className="text-sm text-white/80 mb-2">Straddle something built for the art of “O.”</p>
            <Link to="/sex-saddle">
              <MagneticButton as="div" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "cursor-pointer")}>Explore</MagneticButton>
            </Link>
          </Card>
          <div className="pt-4 flex justify-center md:justify-start">
            <Link to="/home" className="w-full md:w-auto">
              <Button variant="ghost" className="text-white w-full md:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default LuxuryStorage;
