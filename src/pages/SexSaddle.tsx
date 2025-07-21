import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
          <p className="text-base sm:text-lg text-muted-foreground">
            Placeholder content coming soon.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SexSaddle;
